import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';

const LocationEnd = ({ navigation, dataEnd, data }) => {
    return (
        <View>
            {dataEnd !== undefined ? (
                <TouchableOpacity onPress={() => navigation.navigate('MapScreen', (item = dataEnd.map.end))}>
                    <View style={[styles.flexRow, styles.mb24]}>
                        <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                                {dataEnd?.map.end.name ? dataEnd?.map.end.name : dataEnd?.start_name}
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>{dataEnd?.map.end.address ? dataEnd?.map.end.address : dataEnd?.start}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => navigation.navigate('MapScreen', (item = data))}>
                    <View style={[styles.flexRow, styles.mb24]}>
                        <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                                {data?.name ? data?.name : data?.start_name}
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>{data?.address ? data?.address : data?.start}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default LocationEnd;
