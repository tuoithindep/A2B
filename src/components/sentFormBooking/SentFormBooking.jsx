import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MapPinIcon, StopCircleIcon } from 'react-native-heroicons/solid';
import { ChevronDownIcon, ClockIcon, PencilIcon, TruckIcon } from 'react-native-heroicons/outline';
import Collapsible from 'react-native-collapsible';

import styles from '../../styles';

const SentFormBooking = ({ title, context, contextMap }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const rotationValue = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.timing(rotationValue, {
            toValue: isDropdownVisible ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [isDropdownVisible]);

    // const detailTrip = async() => {
    // }
    const toogleDropdown = () => {
        setDropdownVisible((isDropdownVisible) => !isDropdownVisible);
    };
    return (
        <View>
            <View style={[styles.flexBetween, styles.mb24, styles.px15]}>
                <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                    {title}
                </Text>
                <Text style={[styles.fs14, styles.textGray77]}>
                #{context.bookingForm?.eniqueId}
                </Text>
            </View>
            <View style={[styles.px15]}>
                {/* current position */}
                <View style={[styles.flexRow, styles.mb24]}>
                    <StopCircleIcon size={20} color={'white'} style={{ marginTop: 2 }} />
                    <View style={[styles.ml5, styles.flexFull]}>
                        <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                            Vị trí hiện tại: {contextMap.map.start.length !== 0 ? contextMap.map.start.name : context.bookingForm?.startPoint?.start_name}
                        </Text>
                        <Text style={[styles.textGray77, styles.fs15]}>
                            {contextMap.map.start.length !== 0 ? contextMap.map.start.address : context.bookingForm?.startPoint?.start}
                        </Text>
                    </View>
                </View>
                {/* destionation */}
                <View style={[styles.flexRow, styles.mb24]}>
                    <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                    <View style={[styles.ml5, styles.flexFull]}>
                        <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                            {contextMap.map.end.length !== 0 ? contextMap.map.end.name : context.bookingForm?.endPoint?.name}
                        </Text>
                        <Text style={[styles.textGray77, styles.fs15]}>
                            {contextMap.map.end.length !== 0 ? contextMap.map.end.address : context.bookingForm?.endPoint?.address}
                        </Text>
                    </View>
                </View>
                <Collapsible collapsed={!isDropdownVisible} duration={400}>
                    {/* type car */}
                    <View style={[styles.flexRow, styles.mb24]}>
                        <TruckIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                                Loại hình xe
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>
                                {context.bookingForm.nameCar}
                            </Text>
                        </View>
                    </View>

                    {/* lich trinh */}
                    <View style={[styles.flexRow, styles.mb24]}>
                        <ClockIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                                Thời gian khởi hành
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>
                                {context.bookingForm.departureTime}
                            </Text>
                        </View>
                    </View>

                    {/* note */}
                    {context.bookingForm.note && (
                        <View style={[styles.flexRow, styles.mb24]}>
                            <PencilIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                            <View style={[styles.ml5, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb5,
                                    ]}
                                >
                                    Ghi chú
                                </Text>
                                <Text style={[styles.textGray77, styles.fs15]}>
                                    {context.bookingForm.note}
                                </Text>
                            </View>
                        </View>
                    )}
                </Collapsible>

                <TouchableOpacity style={[styles.flexCenter, styles.mb24]} onPress={toogleDropdown}>
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    rotate: rotationValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '180deg'],
                                    }),
                                },
                            ],
                        }}
                    >
                        <ChevronDownIcon size={20} color={'white'} />
                    </Animated.View>
                    <Text style={[styles.textWhite]}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SentFormBooking;
