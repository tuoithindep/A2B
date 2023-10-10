import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    ArrowUturnRightIcon,
    ShieldCheckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
} from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { Image } from 'react-native';
import { fallbackImage, fetchReviewListEndpoint, fetchSuccessTrip, fetchDetailTrip, fetchGetOneCategoryVehicle } from '../../api/DataFetching';
import MomentComponent from '../moment';
import ToggleSwipeable from '../toggleSwiperable';
import FormCustomer from '../formCustomer';
import { CustomerFormContext } from '../../redux/customerFormContext';
import Contact from '../contact';
import SpreadSheet from '../spreadSheet';
import DistanceInfomation from '../distanceInfomation/DistanceInfomation';
import ReviewCustomer from '../reviewCustomer';
import { TokenContext } from '../../redux/tokenContext';
import { format } from 'date-fns';

const DriverMovingComponent = () => {
    const context = useContext(CustomerFormContext);
    const contextToken = useContext(TokenContext);
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [toggleStateBtn, setToggleStateBtn] = useState(false);
    const handleToggleBtn = (value, item) => {
        return setToggleStateBtn(value);
    };
    const [isLoading, setIsLoading] = useState(false);

    const detailTrip = async () => {
        const params = {
            trip_id: item?.id ? item?.id : item?.trip_id
        }
        await fetchDetailTrip(params,contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                oneCateVehicle(data);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        // .finally(() => {
        //     setIsLoading(true);
        // })
    }

    const createContext = (data, nameCar) => {
        context.setCustomerForm({
            ...context.customerForm,
            tripId: data.result.trip_id,
            startPoint: {
                start_name: data.result.start_name,
                start: data.result.start_location, 
            },
            endPoint: {
                end_name: data.result.end_name,
                end: data.result.end_location, 
            },
            typeCar: data.result.vehicle_category_id,
            nameCar: nameCar,
            startTime: data.result.start_time,
            comment: data.result.comment,
            duration: data?.result.duration_all,
            distance: data?.result.distance_all, 
            coordinates: {
                start: data.result.coordinates_start,
                end: data.result.coordinates_end,
            },
            price: data.result.status_report == 1 ? parseFloat(data.result.price_report) : parseFloat(data.result.price_per_km * data.result.distance_price)
        })
    }

    const oneCateVehicle = async (data) => {
        await fetchGetOneCategoryVehicle(contextToken.token,{
            vehicle_category_id: data?.result.vehicle_category_id
        })
        .then((res) => {
            if(res.res === 'success'){
                createContext(data,res.result.category_name)
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
        // console.log(isLoading);
        if(item?.isFlag || item?.is_notify || item?.isHome){
            detailTrip();
        }else{
            setIsLoading(true);
        }
        
        if (toggleStateBtn) {
            fetchSuccessTrip({
                trip_id: context.customerForm.tripId
            },contextToken.token)
            .then((data) => {
                if(data.res === 'success'){
                    navigation.navigate('DriverCompleteScreen', item);
                }
            })
        }
    }, [toggleStateBtn, navigation]);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Chi tiết chuyến đi" />

                {/* body */}
                {isLoading && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    <FormCustomer context={context} title="Thông tin chuyến đi"/>
                    {/* khoang cach & thoi gian */}
                    <DistanceInfomation context={context}/>

                    {/* bang tinh */}
                    <SpreadSheet context={context}/>

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
                        <Contact item={item}/>

                        {/* đánh giá */}
                        <ReviewCustomer />
                    </View>
                </ScrollView>
                )}

                {/* buttom  ket thuc chuyen di*/}
                <View style={[styles.flexRow, styles.bgBlack, styles.flexCenter]}>
                    <ToggleSwipeable
                        onToggle={handleToggleBtn}
                        title={'Kết thúc chuyến đi'}
                        primaryColor={'#E8424A'}
                        secondaryColor={'#cb356b'}
                        tertiaryColor={'#fff'}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DriverMovingComponent;
