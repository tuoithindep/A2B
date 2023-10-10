import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import Header from '../header/Header';
import {
    BoltIcon,
    ClockIcon,
    PencilSquareIcon,
    ShieldCheckIcon,
    ViewfinderCircleIcon,
} from 'react-native-heroicons/outline';
import { Image } from 'react-native';
import { fallbackImage, fetchFindCustomer, fetchTurnOffDriver, fetchDetailTrip } from '../../api/DataFetching';
import { CircleFade } from 'react-native-animated-spinkit';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { MapContext } from '../../redux/mapContext';
import { TokenContext } from '../../redux/tokenContext';
import useInterval from '../../hooks/useInterval';
import { format } from 'date-fns';

const DriverFind = () => {
    const navigation = useNavigation();
    const { params: item } = useRoute();
    const contextToken = useContext(TokenContext);
    const contextMap = useContext(MapContext);
    const [customers, setCustomers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        findCustomer();
    }, [])

    useInterval(() => {
        findCustomer();
    }, 60000, true)

    const findCustomer = async () => {
        await fetchFindCustomer(contextToken.token)
            .then((data) => {
                // console.log('render');
                if (data.res === 'success') {
                    setCustomers(data.result)
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(true);
            })
    }

    const handleTurnOffDriver = async () => {
        fetchTurnOffDriver(contextToken.token)
            .then((data) => {
                if (data.res === 'success') {
                    navigation.goBack();
                }
            })
    }

    // const detailTrip = async (paramsTrip) => {
    //     await fetchDetailTrip(paramsTrip, contextToken.token)
    //     .then((data) => {
    //         console.log(data);
    //         if (data.res === 'success') {
    //             createContext(data); 
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    //     .finally(() => {
    //         setIsLoading(true);
    //     })
    // }

    const createContext = async (data) => {
        await contextMap.setMap({
            ...contextMap.map,
            start: {
                name: data?.result.start_name,
                address: data?.result.start_location,
                coordinates: {
                    lat: data?.result.coordinates_start.split(',')[0],
                    lng: data?.result.coordinates_start.split(',')[1],
                }
            },
            end: {
                name: data?.result.end_name,
                address: data?.result.end_location,
                coordinates: {
                    lat: data?.result.coordinates_end.split(',')[0],
                    lng: data?.result.coordinates_end.split(',')[1],
                }
            }
        })
    }


    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            {isLoading && (
                <View style={[styles.flexFull, styles.bgBlack]}>
                    {/* header */}
                    <Header navigation={navigation} title="Xe tìm khách" />

                    {/* body */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={[styles.flexFull, styles.pt15]}
                    >
                        <Text
                            style={[
                                styles.fs27,
                                styles.textWhite,
                                styles.lh32,
                                styles.mb24,
                                styles.fw300,
                                styles.px15,
                            ]}
                        >
                            Cung đường của bạn
                        </Text>

                        {/* location */}
                        <View style={[styles.borderBot, styles.px15]}>
                            {/* vị trí hiện tại */}
                            <View style={[styles.flexRow, styles.mb24]}>
                                <StopCircleIcon
                                    size={20}
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
                                        Vị trí hiện tại: {item?.currentPosition.title}
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        {item?.currentPosition.address}
                                    </Text>
                                </View>
                            </View>

                            {/* điểm đến */}
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
                                        {contextMap?.map.end.name ? contextMap?.map.end.name : (item?.endName && item?.endName)}
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        {contextMap?.map.end.address ? contextMap?.map.end.address : (item?.endAddress && item?.endAddress)}
                                    </Text>
                                </View>
                            </View>

                            {/* Báo giá tự động */}
                            <View style={[styles.flexRow, styles.mb24]}>
                                <BoltIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                                <View style={[styles.ml5, styles.flexFull]}>
                                    <Text
                                        style={[
                                            styles.fs16,
                                            styles.fw700,
                                            styles.textWhite,
                                            styles.mb5,
                                        ]}
                                    >
                                        Báo giá tự động
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>{item?.isEnabled ? 'Bật' : 'Tắt'}</Text>
                                </View>
                            </View>
                            {/* Phạm vi đón trả khách */}

                            <View style={[styles.flexRow, styles.mb24]}>
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
                                        Phạm vi đón trả khách
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>{item?.radius} km</Text>
                                </View>
                            </View>
                        </View>

                        {/* khách phù hợp */}
                        <View style={[styles.mt24]}>
                            <View style={[styles.flexBetween, styles.mb20, styles.px15]}>
                                <Text
                                    style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}
                                >
                                    Khách phù hợp
                                </Text>
                                <Text style={[styles.fs13, styles.textGray77]}>Sắp xếp</Text>
                            </View>
                            <View>
                                {customers && customers.map((customer) => (
                                    <TouchableOpacity
                                        style={[styles.p15, styles.bg161e, styles.mb20]}
                                        onPress={
                                            () => navigation.navigate('DriverFindDetailScreen', { id: customer?.trip_id }) //fake tam id
                                        }
                                        key={customer?.trip_id + Math.random()}
                                    >
                                        <View style={[styles.flexRow, styles.mb10]}>
                                            <Image
                                                source={{ uri: customer?.image }}
                                                style={[
                                                    styles.w42,
                                                    styles.h42,
                                                    styles.borderFull,
                                                    styles.cover,
                                                ]}
                                            />
                                            <View style={[styles.flexFull, styles.pl15]}>
                                                <View style={[styles.flexRow, styles.itemsCenter]}>
                                                    <Text
                                                        style={[
                                                            styles.textWhite,
                                                            styles.fs16,
                                                            styles.lh24,
                                                            styles.fw700,
                                                            styles.mr5,
                                                        ]}
                                                    >
                                                        {customer?.fullname}
                                                    </Text>
                                                    <ShieldCheckIcon size={16} color={'white'} />
                                                </View>
                                                <Text
                                                    style={[styles.textGray77, styles.fs13, styles.fw400]}
                                                >
                                                    {customer?.is_report ? 'Đã báo giá' : 'Chưa báo giá'}
                                                </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={[styles.flexRow, styles.mb10, styles.itemsEnd]}>
                                                <StopCircleIcon
                                                    size={20}
                                                    color={'white'}
                                                    style={{ marginTop: 2 }}
                                                />
                                                <Text
                                                    style={[
                                                        styles.fs16,
                                                        styles.fw400,
                                                        styles.textWhite,
                                                        styles.flexFull,
                                                        styles.ml10,
                                                    ]}
                                                >
                                                    {customer?.start_location}
                                                </Text>
                                            </View>
                                            <View style={[styles.flexRow, styles.mb10, styles.itemsEnd]}>
                                                <MapPinIcon
                                                    size={22}
                                                    color={'white'}
                                                    style={{ marginTop: 2 }}
                                                />
                                                <Text
                                                    style={[
                                                        styles.fs16,
                                                        styles.fw400,
                                                        styles.textWhite,
                                                        styles.flexFull,
                                                        styles.ml10,
                                                    ]}
                                                >
                                                    {customer?.end_location}
                                                </Text>
                                            </View>
                                            <View style={[styles.flexRow, styles.mb10, styles.itemsEnd]}>
                                                <ClockIcon
                                                    size={22}
                                                    color={'white'}
                                                    style={{ marginTop: 2 }}
                                                />
                                                <Text
                                                    style={[
                                                        styles.fs16,
                                                        styles.fw400,
                                                        styles.textWhite,
                                                        styles.flexFull,
                                                        styles.ml10,
                                                    ]}
                                                >
                                                    Khởi hành lúc: {format(new Date(customer?.start_time), 'dd-MM-yyyy HH:mm')}
                                                </Text>
                                            </View>
                                            <View style={[styles.flexRow, styles.mb10, styles.itemsEnd]}>
                                                <PencilSquareIcon
                                                    size={22}
                                                    color={'white'}
                                                    style={{ marginTop: 2 }}
                                                />
                                                <Text
                                                    style={[
                                                        styles.fs16,
                                                        styles.fw400,
                                                        styles.textWhite,
                                                        styles.flexFull,
                                                        styles.ml10,
                                                    ]}
                                                >
                                                    Lưu ý: {customer?.comment ? customer?.comment : 'Không có'}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* tắt thông báo */}
                        <View style={[styles.mt24, styles.pb50, styles.flexColumn, styles.itemsCenter]}>
                            <View style={[styles.mb20]}>
                                <CircleFade size={40} color="white" />
                            </View>
                            <Text style={[styles.fs11, styles.textWhite30, { marginBottom: 2 }]}>
                                Bạn có thể đóng ứng dụng
                            </Text>
                            <Text style={[styles.fs11, styles.textWhite30, { marginBottom: 2 }]}>
                                Hệ thống sẽ thông báo khi có tài xế
                            </Text>
                            <TouchableOpacity>
                                <Text style={[styles.fs16, styles.textWhite, styles.mt10]}>
                                    Tắt thông báo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )}         
            
            {/* buttom  huy chuyen & tim tai xe*/}
            {isLoading && (
            <View style={[styles.flexRow, styles.bgBlack]}>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgRed,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                    onPress={handleTurnOffDriver}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Tắt nhận chuyến</Text>
                </TouchableOpacity>
            </View>
            )}
   
        </SafeAreaView>
    );
};

export default DriverFind;
