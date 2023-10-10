import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';

const LocationStart = ({ navigation, dataStart, currentPosition }) => {
    return (
        <View >
            {dataStart !== undefined ? (
                <TouchableOpacity onPress={() => navigation.navigate('MapScreenStart',dataStart.map.start)}>
                    <View style={[styles.flexRow, styles.mb24]}>
                        <StopCircleIcon size={20} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                                Vị trí hiện tại: {dataStart?.map.start.name ? dataStart?.map.start.name : dataStart?.end_name}
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>
                                {dataStart?.map.start.address}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                // <Text>1</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MapScreenStart',currentPosition)}>
                    <View style={[styles.flexRow, styles.mb24]}>
                        <StopCircleIcon size={20} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                                Vị trí hiện tại: {currentPosition.start_name} 
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>
                                {currentPosition.start} 
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        
        </View>
    );
};

export default LocationStart;
