import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert, Dimensions } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import Header from '../header/Header';
import { BoltIcon, CurrencyDollarIcon, ViewfinderCircleIcon } from 'react-native-heroicons/outline';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchBecomeDriver, fetchGetAndUpdateGPSDriver, fetchListMyCar, fetchStartGPS, fetchUpdateRoad, fetchUpdateStatusPrice } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';
import { MapContext } from '../../redux/mapContext';
import Skenleton from '../skeleton/Skenleton';


const DriverComponent = () => {
    const navigation = useNavigation();
    const [timeRange, setTimeRange] = useState(5);
    const [priceRange, setPriceRange] = useState(5000);
    const [isEnabled, setIsEnabled] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [driver, setDriver] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState(null);
    const contextToken = useContext(TokenContext)
    const contextMap = useContext(MapContext);
    const cardWidth = Dimensions.get("window").width * 0.8;

    // console.log(contextMap);
    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState)
        if(isEnabled){
            setPriceRange(0);
        }
    };
    useEffect(() => {
        takeAddressFromGPS();
        infomationDriver();
    }, []);

    const takeAddressFromGPS = async () => {
        const latString = await AsyncStorage.getItem('lat');
        const lngString = await AsyncStorage.getItem('lng');
        lat = parseFloat(latString);
        lng = parseFloat(lngString);
        const coords = lat + ',' + lng;
        // setCoordStart(coords);
        fetchGetAndUpdateGPSDriver({
            coordinates: coords
        }, contextToken.token)
        .then((data) => {
            if (data.res == 'success') {
                const parts = data.result.start_location.split(', ');
                const country = parts.pop(); // "Việt Nam"
                // Tách phần "Đường Nguyễn Xiển, Phường Đại Kim, Quận Hoàng Mai, Hà Nội"
                const street = parts.join(', ');
                const title = street.substring(0, street.indexOf(","));
                const address = street.replace(title + ',', '').trim()
                setCurrentPosition({
                    title: title,
                    address: address
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(true);
        })
    }

    const infomationDriver = async () => {
        await fetchListMyCar(contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                setDriver(data.result);
                setTimeRange(data.result.distane_to_customer)
                setPriceRange(parseInt(data.result.price_per_km))
                if(data.result.end_location){
                    setIsEnabled(true)
                    setItem({
                        name: data.result.end_location,
                        coordinates: {
                            lat: data.result.end_lat,
                            lng: data.result.end_lng
                        }
                    })
                }
                if(data.result.is_confirmed != 1){
                    navigationScreenBackOrError('MyCarScreen');
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const navigationScreenBackOrError = (name = '', item = '') => {
        contextMap.setMap({
            start: '',
            end: ''
        });
        navigation.navigate(name,item);
    }

    const findCustomer =  async () => {
        const item = {
            radius: timeRange,
            price: priceRange,
            isEnabled: isEnabled,
            currentPosition: currentPosition,
        }
        
        if(!driver?.end_location){          
            Alert.alert(
                'Thông báo',
                'Yêu cầu bạn hãy chọn điểm kết thúc để bắt đầu tìm khách!',
                [
                    { text: 'Đồng ý' }
                ],
                { cancelable: false }
            )
        }else{
            if(driver?.end_location && !contextMap.map.end){
                createContextMap()
            }
            becomeDriver();
            updateStatusPrice(!isEnabled ? 0 : 1, priceRange)
            updateRoadDriver(timeRange,driver)
            navigation.navigate('DriverFindScreen', item)
        } 
    }

    const createContextMap = async () => {
        const nameEnd = driver?.end_location.substring(0,driver?.end_location.indexOf(','));
        const addressEnd = driver?.end_location.replace(nameEnd + ',','').trim();
        contextMap.setMap({
            end: {
                coordinates: {
                    lat: driver?.end_lat,
                    lng: driver?.end_lng
                },
                name: nameEnd,
                address: addressEnd
            },
            start: {
                coordinates: {
                    lat: await AsyncStorage.getItem('lat'),
                    lng: await AsyncStorage.getItem('lng'),
                },
                name: currentPosition.title,
                address: currentPosition.address
            }
        })
    }

    const updateStatusPrice = async (statusPrice, price) => {
        await fetchUpdateStatusPrice({
            status_report: statusPrice,
            price: price
        },contextToken.token)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const updateRoadDriver = async (radius) => {
        await fetchUpdateRoad({
            radius: radius,
            status: 2,
            end: contextMap.map.end.length == undefined ? contextMap.map.end.name+', '+contextMap.map.end.address : driver?.end_location,
            coordinates_end: contextMap.map.end.length == undefined ? contextMap.map.end.coordinates.lat+','+contextMap.map.end.coordinates.lng : driver?.end_lat+','+driver?.end_lng
        },contextToken.token)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const becomeDriver = async() => {
        await fetchBecomeDriver(contextToken.token)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Xe tìm khách" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15, styles.px15]}
                >
                    <Text
                        style={[
                            styles.fs27,
                            styles.textWhite,
                            styles.lh32,
                            styles.mb24,
                            styles.fw300,
                        ]}
                    >
                        Cung đường của bạn
                    </Text>

                    {/* location */}
                    <View>
                        {/* vị trí hiện tại */}
                        {/* <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}> */}
                            <View style={[styles.flexRow, styles.mb24]}>
                                <StopCircleIcon
                                    size={20}
                                    color={'rgba(119,125,146,0.8)'}
                                    style={{ marginTop: 2 }}
                                />
                                <View style={[styles.ml5, styles.flexFull]}>
                                    <Text
                                        style={[
                                            styles.fs16,
                                            styles.fw700,
                                            styles.textGray77,
                                            styles.mb5,
                                        ]}
                                    >
                                        Vị trí hiện tại: 
                                        {isLoading ? 
                                        ' '+currentPosition?.title : 
                                        (<Skenleton height={16} width={cardWidth - 170} style={{marginLeft: 10, alignItems: 'flex-end' }}/>)}
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        {isLoading ? currentPosition?.address : (<Skenleton height={16} width={cardWidth - 30} style={{ marginTop: 10, alignItems: 'flex-end' }}/>)}
                                    </Text>
                                </View>
                            </View>
                        {/* </TouchableOpacity> */}

                        {/* điểm đến */}
                        <TouchableOpacity onPress={() => navigation.navigate('MapScreen', contextMap.map.end ? contextMap.map.end : item)}>
                            <View style={[styles.flexRow, styles.mb24]}>
                                <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                                <View style={[styles.ml5, styles.flexFull]}>
                                    <Text
                                        style={[
                                            styles.fs16,
                                            styles.fw700,
                                            styles.textWhite,
                                            styles.mb5,
                                        ]}
                                    >
                                        {contextMap.map.end.name ? contextMap.map.end.name : (driver?.end_location ? driver?.end_location : 'Nhập để tìm trên bản đồ')} 

                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        {contextMap.map.end.address ? contextMap.map.end.address : (driver?.end_location ? driver?.end_location : 'Địa điểm chưa xác định')} 
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Phạm vi đón trả khách */}
                        <View style={[styles.flexRow, styles.mb15]}>
                            <ViewfinderCircleIcon
                                size={22}
                                color={'white'}
                                style={{ marginTop: 2 }}
                            />
                            <View style={[styles.ml5, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb5,
                                    ]}
                                >
                                    Phạm vi đón trả khách: {timeRange} km
                                </Text>
                                <Slider
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        marginLeft: -10,
                                    }}
                                    minimumValue={3}
                                    maximumValue={20}
                                    step={1}
                                    onValueChange={(newValue) => {
                                        setTimeRange(newValue);
                                    }}
                                    value={timeRange}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="rgba(255, 255, 255, 0.50)"
                                />
                            </View>
                        </View>

                        {/* Báo giá tự động */}
                        <View style={[styles.flexRow, styles.mb24]}>
                            <BoltIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                            <View style={[styles.ml5, styles.flexFull]}>
                                <View style={[styles.mb5, styles.flexBetween]}>
                                    <Text style={[styles.fs16, styles.fw700, styles.textWhite]}>
                                        Báo giá tự động
                                    </Text>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#808080' }}
                                        thumbColor={isEnabled ? '#2884EF' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={driver?.price_per_km ? isEnabled : ''}
                                    />
                                </View>
                                <Text style={[styles.textGray77, styles.fs15]}>
                                    Hệ thống sẽ gửi báo giá tự động khi có khách
                                </Text>
                            </View>
                        </View>

                        {/* Báo giá */}
                        {isEnabled && (
                            <View style={[styles.flexRow, styles.mb24]}>
                                <CurrencyDollarIcon
                                    size={22}
                                    color={'white'}
                                    style={{ marginTop: 2 }}
                                />
                                <View style={[styles.ml5, styles.flexFull]}>
                                    <Text
                                        style={[
                                            styles.fs16,
                                            styles.fw700,
                                            styles.textWhite,
                                            styles.mb5,
                                        ]}
                                    >
                                        Báo giá: {priceRange} VND/km
                                    </Text>
                                    <Slider
                                        style={{
                                            width: '100%',
                                            height: 40,
                                            marginLeft: -10,
                                        }}
                                        minimumValue={0}
                                        maximumValue={20000}
                                        step={1000}
                                        onValueChange={(newValue) => {
                                            setPriceRange(newValue);
                                        }}
                                        value={priceRange}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="rgba(255, 255, 255, 0.50)"
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
            {/* buttom  huy chuyen & tim tai xe*/}
            <View style={[styles.flexRow, styles.bgBlack]}>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgGray161,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                    onPress={() => navigationScreenBackOrError('HomeScreen')}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgRed,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                    onPress={findCustomer}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Tìm khách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DriverComponent;