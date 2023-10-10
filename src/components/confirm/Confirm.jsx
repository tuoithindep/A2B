
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar, Linking } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { CheckIcon, StarIcon } from 'react-native-heroicons/solid';
import {
    CurrencyDollarIcon,
    ShieldCheckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
} from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { fallbackImage } from '../../api/DataFetching';
import { BookingFormContext } from '../../redux/bookingFormContext';
import SentFormBooking from '../sentFormBooking';
import { DetailTripContext } from '../../redux/detailTripContext';
import { MapContext } from '../../redux/mapContext';
import Contact from '../contact';
import { TokenContext } from '../../redux/tokenContext';
import { fetchDetailTrip } from '../../api/DataFetching';


const Confirm = () => {
    const context = useContext(BookingFormContext);
    const contextToken = useContext(TokenContext);
    const contextMap = useContext(MapContext);
    const contextDetailTrip = useContext(DetailTripContext);
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false)
    const paramsTrip = {
        trip_id: item?.id ? item?.id : item?.trip_id
    }

    const detailTrip = async (paramsTrip, isFlag = 0, is_notify = 0, isHome = 0) => {
        await fetchDetailTrip(paramsTrip, contextToken.token)
        // await fetchDetailTrip(paramsTrip, 'e1358385819f12b01db7990c1')
            .then((data) => {
                if (data.res === 'success') {
                    // setDetail(data.result);
                    contextDetailTrip.setDetailTrip({
                        ...contextDetailTrip.detailTrip,
                        duration: data.result.duration_all,
                        distance: data.result.distance_all,
                        price_distance: data.result.price_report,
                    })
                    if (isFlag || is_notify || isHome) {
                        context.setBookingForm({
                            ...context.bookingForm,
                            eniqueId: data?.result.trip_id,
                            startPoint: {
                                start_name: data?.result.start_name,
                                start: data?.result.start_location,
                                coordinates: {
                                    lat: data?.result.coordinates_start.split(',')[0],
                                    lng: data?.result.coordinates_start.split(',')[1],
                                }
                            },
                            endPoint: {
                                name: data?.result.end_name,
                                address: data?.result.end_location,
                                coordinates: {
                                    lat: data?.result.coordinates_end.split(',')[0],
                                    lng: data?.result.coordinates_end.split(',')[1],
                                }
                            },
                            typeCar: data?.result.vehicle_category_id,
                            nameCar: data?.result.name_category,
                            departureTime: data?.result.start_time,
                            note: data?.result.comment,
                            isPunish: data?.result.is_punish
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
        .finally(() => {
            setIsLoading(true);
        })
    }

    useEffect(() => {
        detailTrip(paramsTrip, item?.isFlag, item?.is_notify, item?.isHome);
        // console.log('confirm',item?.isHome);
    }, [])


    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            {isLoading && (
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Thành công" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    {/* check */}
                    <View
                        style={[
                            styles.my24,
                            styles.pb50,
                            styles.border1,
                            styles.borderSolid,
                            styles.borderBot,
                        ]}
                    >
                        <View
                            style={[
                                styles.bgWhite,
                                styles.borderFull,
                                styles.flexCenter,
                                { width: 120, height: 120 },
                            ]}
                        >
                            <CheckIcon size={60} color={'black'} stroke={'black'} />
                        </View>
                        <Text
                            style={[
                                styles.textCenter,
                                styles.textWhite,
                                styles.mt24,
                                styles.fs27,
                                styles.fw300,
                            ]}
                        >
                            Đặt chuyến thành công!
                        </Text>
                    </View>

                    <SentFormBooking context={context} contextMap={contextMap} title="Tài xế đang đến" />

                    {/* thông tin tài xế */}

                    <View
                        style={[styles.border1, styles.borderTop, styles.borderSolid, styles.pt24]}
                    >
                        <Text
                            style={[
                                styles.fs27,
                                styles.textWhite,
                                styles.lh32,
                                styles.fw300,
                                styles.px15,
                                styles.mb24,
                            ]}
                        >
                            Thông tin tài xế
                        </Text>
                        <View style={[styles.flexColumn, styles.itemsCenter, styles.mb20]}>
                            {/* avatar */}
                            <Image
                                source={{ uri: item?.image_driver || fallbackImage }}
                                style={[
                                    styles.mb15,
                                    { width: 120, height: 120, borderRadius: 999 },
                                ]}
                                resizeMode="cover"
                            />
                            {/* name */}
                            <View style={[styles.flexRow, styles.itemsCenter]}>
                                <Text
                                    style={[
                                        styles.textWhite,
                                        styles.fs16,
                                        styles.fw700,
                                        styles.lh24,
                                    ]}
                                >
                                    {item?.fullname}
                                </Text>
                                {item?.is_confirmed == 2 && (
                                    <View style={[styles.pl10]}>
                                        <ShieldCheckIcon size={16} color={'white'} />
                                    </View>
                                )}
                            </View>

                            {/* đánh sao*/}
                            {item?.average_rates.toString() && (
                                <View style={[styles.flexRow, styles.itemsCenter]}>
                                    <StarIcon size={'16'} color={'white'} />
                                    <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                        {item?.average_rates.toString()}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* contact */}
                        <Contact
                            item={item}
                        />

                        {/* thông tin xe */}
                        <View
                            style={[
                                styles.px15,
                                styles.py10,
                                styles.bg161e,
                                styles.flexRow,
                                styles.flexFull,
                                styles.mb60,
                            ]}
                        >
                            <Image
                                source={{ uri: item?.image_car || fallbackImage }}
                                style={{ width: 133, height: 72 }}
                                resizeMode="cover"
                            />
                            <View style={[styles.pl15]}>
                                {/* name */}
                                <View style={[styles.flexRow, styles.itemsCenter]}>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.fw700,
                                            styles.lh24,
                                            styles.pr10,
                                        ]}
                                    >
                                        {item?.vehicle_name} - {item?.vehicle_life}
                                    </Text>
                                    {/* {item?.is_confirmed_vehicle == 1 && (
                                        <ShieldCheckIcon size={16} color={'white'} />
                                    )} */}
                                </View>

                                {/* tên xe */}
                                <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
                                    {item?.license_plates_color === 1 ? (
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.lh24,
                                                styles.bgWhite,
                                                styles.px10,
                                            ]}
                                        >
                                            {item?.license_plates}
                                        </Text>
                                    ) : (
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.lh24,
                                                styles.bgYellow,
                                                styles.px10,
                                                styles.textWhite
                                            ]}
                                        >
                                            {item?.license_plates}
                                        </Text>
                                    )}

                                </View>

                                {/* đánh sao & giá tiền */}
                                {contextDetailTrip?.detailTrip.price_distance.toString() && (
                                    <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
                                        <CurrencyDollarIcon size={'16'} color={'white'} />
                                        <Text
                                            style={[
                                                styles.textWhite,
                                                styles.fs16,
                                                styles.lh24,
                                                styles.ml5,
                                            ]}
                                        >
                                            {contextDetailTrip?.detailTrip.price_distance.toString()}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                    {/*  */}
                    <TouchableOpacity
                        style={[styles.pb60]}
                        onPress={() => navigation.navigate('PickScreen', item)}
                    >
                        <Text style={[styles.textWhite, styles.flexCenter, styles.fs27]}>
                            Go Pick
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* buttom  huy chuyen & tim tai xe*/}
                <View style={[styles.flexRow]}>
                    <TouchableOpacity
                        style={[
                            styles.h48,
                            styles.bgBlack,
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                            styles.border1,
                            styles.borderColorWhite,
                            styles.borderSolid,
                            styles.border4,
                            styles.mx15,
                        ]}
                        onPress={() => navigation.navigate('CancelBookClientScreen', item)}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Hủy chuyến</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )}
        </SafeAreaView>
    );
};

export default Confirm;
