import { View, Text, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import React, { useContext } from 'react';
import { MapPinIcon } from 'react-native-heroicons/outline';

import styles from '../../styles';
import { MapContext } from '../../redux/mapContext';

const Result = ({ results, navigation, style, paddingBottom }) => {
    const handleScroll = () => {
        Keyboard.dismiss();
    };
    const contextMap = useContext(MapContext);
    const chooseLocation = (item) => {
        // console.log(item);
        contextMap.setMap({
            ...contextMap.map,
            end: {
                name: item.name,
                address: item.address,
                coordinates: item.coordinates
            }
        })
        navigation.navigate('Book', item);
    }
    return (
        <View style={style}>
            <FlatList
                onScroll={handleScroll}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: paddingBottom }}
                data={results}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.name.toString()+Math.random()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => chooseLocation(item)}
                    >
                        <View style={[styles.flexRow, styles.mb24]}>
                            <MapPinIcon size={24} color={'white'} />
                            <View style={[styles.ml5, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb5,
                                    ]}
                                >
                                    {item?.name}
                                </Text>
                                <Text style={[styles.textGray77, styles.fs15]}>
                                    {item?.address}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Result;
