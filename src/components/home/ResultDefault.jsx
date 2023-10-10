import { View, Text, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import React from 'react';
import { MapPinIcon } from 'react-native-heroicons/outline';

import styles from '../../styles';

const ResultDefault = ({ data, navigation }) => {

    const handleScroll = () => {
        Keyboard.dismiss();
    };
    return (
        <View style={[styles.flexFull]}>
            <FlatList
                onScroll={handleScroll}
                keyboardShouldPersistTaps="always"
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.name.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Book', item);
                        }}
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

export default ResultDefault;
