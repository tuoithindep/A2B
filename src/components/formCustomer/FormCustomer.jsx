import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MapPinIcon, StopCircleIcon } from 'react-native-heroicons/solid';
import { ChevronDownIcon, ClockIcon, PencilIcon, TruckIcon } from 'react-native-heroicons/outline';
import Collapsible from 'react-native-collapsible';

import styles from '../../styles';
import { format } from 'date-fns';

const FormCustomer = ({ title, context, tripId}) => {
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
                #{context.customerForm.tripId ? context.customerForm.tripId : tripId}
                </Text>
            </View>
            <View style={[styles.px15]}>
                {/* current position */}
                <View style={[styles.flexRow, styles.mb24]}>
                    <StopCircleIcon size={20} color={'white'} style={{ marginTop: 2 }} />
                    <View style={[styles.ml5, styles.flexFull]}>
                        <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                            Vị trí hiện tại: {context?.customerForm.startPoint.start_name}
                        </Text>
                        <Text style={[styles.textGray77, styles.fs15]}>
                            {context?.customerForm.startPoint.start}
                        </Text>
                    </View>
                </View>
                {/* destionation */}
                <View style={[styles.flexRow, styles.mb24]}>
                    <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                    <View style={[styles.ml5, styles.flexFull]}>
                        <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                           {context?.customerForm.endPoint.end_name}
                        </Text>
                        <Text style={[styles.textGray77, styles.fs15]}>
                            {context?.customerForm.endPoint.end}   
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
                                {context?.customerForm.nameCar}
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
                                {format(new Date(context?.customerForm.startTime), 'dd-MM-yyyy HH:mm')}
                            </Text>
                        </View>
                    </View>

                    {/* note */}
                    
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
                                {context?.customerForm.comment ? context?.customerForm.comment : 'Không có'}
                            </Text>
                        </View>
                    </View>

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

export default FormCustomer;
