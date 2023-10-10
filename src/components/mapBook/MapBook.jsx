import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    StatusBar,
    SafeAreaView,
    Dimensions,
    Keyboard,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { debounce } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../../styles';
import { fetchSearchEndpoint, fetchStartGPS } from '../../api/DataFetching';
import Result from '../home/Result';
import { TokenContext } from '../../redux/tokenContext';
import { MapContext } from '../../redux/mapContext';

const MapBook = () => {
    const navigation = useNavigation();
    const { params: item } = useRoute();

    const contextToken = useContext(TokenContext);
    const contextMap = useContext(MapContext);
    const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(false);

    const [coordinates, setCoordinates] = useState({
        latitude: item?.coordinates.lat ? item?.coordinates.lat : 20.975120399813672,
        longitude: item?.coordinates.lng ? item?.coordinates.lng : 105.78747338684025
    });

    const handleRegionChange = (region) => {
        setCoordinates({
            latitude: region.latitude,
            longitude: region.longitude,
        })
        fetchStartGPS({
            start: region.latitude+','+region.longitude
        },contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                contextMap.setMap({
                    ...contextMap.map,
                    end: {
                        coordinates: data.result.coordinates,
                        name: data.result.start_name,
                        address: data.result.start
                    }
                })
            }
        })
        .finally(() => {
            setLoading(true);
        })

    }

    const handleSearch = async (payload) => {
        let lat = 0;
        let lng = 0;
        const latString = await AsyncStorage.getItem('lat');
        const lngString = await AsyncStorage.getItem('lng');
        if (latString === null && lngString === null) {
            lat = 20.975120399813672;
            lng = 105.78747338684025;
        } else {
            lat = parseFloat(latString);
            lng = parseFloat(lngString);
        }
        if (payload && payload.length > 0) {
            fetchSearchEndpoint({
                keyword: payload,
                lat: lat,
                lng: lng,
            }).then((data) => {
                if (data && data.result) setResults(data.result);
            });
        } else {
            setResults([]);
        }
    };
    const handleRegionChangeDebounce = useCallback(debounce(handleRegionChange,100), []);
    const handleSearchDebounce = useCallback(debounce(handleSearch, 400), []);
    const handleClearInput = () => {
        setInputValue('');
    };

    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            const screenHeight = Dimensions.get('window').height;
            const keyboardHeight = e.endCoordinates.height;
            const availableHeight = screenHeight - keyboardHeight;
            setKeyboardHeight(availableHeight);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(Dimensions.get('window').height);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={{ flex: 1 }}>
                {/* search */}
                <View
                    style={[
                        styles.absolute,
                        styles.t0,
                        styles.l0,
                        styles.r0,
                        styles.m15,
                        styles.z100,
                    ]}
                >
                    {/* search */}
                    <View
                        style={[
                            styles.relative,
                            styles.bg161e,
                            styles.h48,
                            styles.flexRow,
                            styles.itemsCenter,
                        ]}
                    >
                        <TextInput
                            onChangeText={(text) => {
                                setInputValue(text);
                                handleSearchDebounce(text);
                            }}
                            value={inputValue}
                            style={[
                                styles.flexFull,
                                styles.fs16,
                                styles.textWhite,
                                styles.pl24,
                                styles.pr50,
                            ]}
                            placeholder="Tìm kiếm"
                            placeholderTextColor={'white'}
                        />
                        <View style={[styles.absolute, styles.r0, styles.p12, styles.bg161e]}>
                            {inputValue.length > 0 ? (
                                <TouchableOpacity onPress={handleClearInput}>
                                    <XMarkIcon size={24} color={'white'} />
                                </TouchableOpacity>
                            ) : (
                                <MagnifyingGlassIcon size={24} color={'white'} />
                            )}
                        </View>
                    </View>

                    {/* result */}
                    {inputValue.length > 0 ? (
                        <Result
                            results={results}
                            navigation={navigation}
                            point={'end'}
                            style={[
                                styles.flexFull,
                                styles.p15,
                                styles.bg161e,
                                { maxHeight: keyboardHeight * 0.7 },
                            ]}
                            paddingBottom={0}
                        />
                    ) : null}
                </View>

                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: parseFloat(coordinates.latitude),
                        longitude: parseFloat(coordinates.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onRegionChange={handleRegionChangeDebounce}
                >
                    <Marker
                        coordinate={{
                            latitude: parseFloat(coordinates.latitude),
                            longitude: parseFloat(coordinates.longitude),
                        }}
                        title={item?.address}
                        description={item?.name}
                    />
                </MapView>
                {/* buttom  huy chuyen */}
                <View
                    style={[
                        styles.flexRow,
                        styles.bgTransparent,
                        styles.absolute,
                        styles.b0,
                        styles.l0,
                        styles.r0,
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.h48,
                            styles.bgRed,
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                            styles.border1,
                            styles.borderColorRedE8,
                            styles.borderSolid,
                            styles.border4,
                            styles.mx15,
                            styles.mb15,
                        ]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MapBook;