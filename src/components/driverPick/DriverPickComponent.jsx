import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet, { BottomSheetScrollView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    ShieldCheckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
    ClockIcon,
    ArrowUturnRightIcon,
} from 'react-native-heroicons/outline';

import styles from '../../styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fallbackImage, fetchDetailCustomer, fetchDetailDriver, fetchDetailTrip, fetchOnAJourney, fetchPickUpCustomer, fetchReviewListEndpoint } from '../../api/DataFetching';
import SentFormBooking from '../sentFormBooking';
import { BookingFormContext } from '../../redux/bookingFormContext';
import MomentComponent from '../moment';
import ToggleSwipeable from '../toggleSwiperable';
import { CustomerFormContext } from '../../redux/customerFormContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormCustomer from '../formCustomer';
import Contact from '../contact';
import { MapContext } from '../../redux/mapContext';
import DistanceInfomation from '../distanceInfomation/DistanceInfomation';
import ReviewCustomer from '../reviewCustomer';
import { TokenContext } from '../../redux/tokenContext';

const DriverPickComponent = () => {
    const [toggleStateBtn, setToggleStateBtn] = useState(false);
    const handleToggleBtn = (value, item) => {
        return setToggleStateBtn(value);
    };

    const navigation = useNavigation();
    const context = useContext(CustomerFormContext);
    const contextMap = useContext(MapContext);
    const contextToken = useContext(TokenContext);
    const bottomSheetRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDriver, setIsLoadingDriver] = useState(false);
    const { params: item } = useRoute();
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    const detailOneCustomer = async (tripId) => {
        await fetchDetailTrip({
            trip_id: tripId
        },contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                context.setCustomerForm({
                    ...context.customerForm,
                    tripId: data.result.trip_id,
                    startPoint: {
                        start_name: data.result.start_name,
                        start: data.result.start_location
                    },
                    endPoint: {
                        end_name: data.result.end_name,
                        end: data.result.end_location
                    },
                    typeCar: data.result.vehicle_category_id,
                    nameCar: data.result.name_category,
                    startTime: data.result.start_time,
                    comment: data.result.comment,
                    duration: data.result.duration_all,
                    distance: data.result.distance_all,
                    coordinates: {
                        start: data.result.coordinates_start,
                        end: data.result.coordinates_end
                    },
                    price: data.result.price_report,
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(true);
        })
    } 

    const detailOneDriver = async (driverId) => {
        await fetchDetailDriver({
            driver_id: driverId
        })
        .then((data) => {
            if(data.res === 'success'){
                contextMap.setMap({
                    ...contextMap.map,
                    start: {
                        coordinates: {
                            lat: data.result.lat,
                            lng: data.result.lng
                        }
                    }
                    
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoadingDriver(true);
        })
    }

    useEffect(() => {
        if (toggleStateBtn) {
            fetchOnAJourney({
                trip_id: context.customerForm.tripId ? context.customerForm.tripId : item?.trip_id
            },contextToken.token)
            .then((data) => {
                if(data.res === 'success'){
                    navigation.navigate('DriverMovingScreen', item);
                }
            })
        }
        if((item?.is_notify || item?.isFlag || item?.isHome) && (item?.trip_id || item?.id)){
            detailOneCustomer(item?.trip_id ? item?.trip_id : item?.id);
            detailOneDriver(item?.driver_id);
        }else{
            setIsLoading(true);
            setIsLoadingDriver(true);
        }
    }, [toggleStateBtn, navigation]);

    const backgroundStyle = {
        backgroundColor: 'black',
    };
    const handleIndicatorStyle = {
        backgroundColor: 'gray',
    };


    return (
        <View style={[styles.flexFull, styles.bgBlack]}>
            <View style={[styles.flexFull]}>
                <View
                    style={[
                        styles.absolute,
                        styles.z30,
                        styles.bgBlue1A7,
                        styles.px10,
                        styles.py5,
                        Platform.OS === 'ios' && styles.mt24,
                        styles.flexCenter,
                        { top: 15, left: 15, borderRadius: 8 },
                    ]}
                >
                    <ClockIcon size={16} color={'white'} />
                    <Text
                        style={[
                            styles.ml5,
                            styles.fs16,
                            styles.textWhite,
                            styles.lh24,
                            styles.fw400,
                        ]}
                    >
                        14 Phút
                    </Text>
                </View>
                    <GestureHandlerRootView style={[styles.flexFull, styles.bgBlack]}>
                        {isLoading && isLoadingDriver && (
                            <MapView
                                style={[styles.flexFull]}
                                initialRegion={{
                                    latitude: parseFloat(contextMap.map.start.coordinates.lat),
                                    longitude: parseFloat(contextMap.map.start.coordinates.lng),
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{ 
                                        latitude: parseFloat(contextMap.map.start.coordinates.lat), 
                                        longitude: parseFloat(contextMap.map.start.coordinates.lng) 
                                    }}
                                    title="Tài xế"
                                    description="Đây là tọa độ của tài xế"
                                />
                                <Marker
                                    coordinate={{ 
                                        latitude: parseFloat(context.customerForm.coordinates.start.split(',')[0]), 
                                        longitude: parseFloat(context.customerForm.coordinates.start.split(',')[1])
                                    }}
                                    title="Khách hàng"
                                    description="Đây là tọa độ của khách hàng"
                                /> 
                            </MapView> 
                        )}

                        {/* Bottom Sheet Drawer */}
                        <BottomSheet
                            ref={bottomSheetRef}
                            snapPoints={snapPoints}
                            backgroundStyle={backgroundStyle}
                            handleIndicatorStyle={handleIndicatorStyle}
                        >
                            <BottomSheetScrollView style={[styles.bgBlack, styles.pt24]}>
                                {isLoading && (
                                    <FormCustomer context={context} title="Đi đón khách" />
                                )}

                                {/* khoang cach & thoi gian */}
                                {isLoading && (
                                    <DistanceInfomation context={context}/>
                                )}

                                {/* thông tin tài xế */}
                                <View style={[styles.pt10]}>
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
                                        Thông tin hành khách
                                    </Text>
                                    <View style={[styles.flexColumn, styles.itemsCenter, styles.mb20]}>
                                        {/* avatar */}
                                        <Image
                                            source={{ uri: item?.image || fallbackImage }}
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
                                            {item?.is_confirmed == 1 && (
                                                <View style={[styles.pl10]}>
                                                    <ShieldCheckIcon size={16} color={'white'} />
                                                </View>
                                            )}
                                        </View>

                                        {/* đánh sao*/}
                                        <View style={[styles.flexRow, styles.itemsCenter]}>
                                            <StarIcon size={'16'} color={'white'} />
                                            <Text
                                                style={[styles.textWhite, styles.fs16, styles.lh24]}
                                            >
                                                {item?.average_rates}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* contact */}
                                    <Contact item={item}/>

                                    {/* đánh giá */}
                                    <ReviewCustomer />

                                </View>
                            </BottomSheetScrollView>
                        </BottomSheet> 
                    </GestureHandlerRootView>
            </View>

            {/* buttom bắt đầu chuyến đi*/}
            <View style={[styles.flexRow, styles.bgBlack, styles.flexCenter]}>
                <ToggleSwipeable
                    onToggle={handleToggleBtn}
                    title={'Bắt đầu chuyến đi'}
                    primaryColor={'#06d6a0'}
                    secondaryColor={'#1b9aaa'}
                    tertiaryColor={'#fff'}
                    style={styles.mb30}
                />
            </View>
        </View>
    );
};

export default DriverPickComponent;