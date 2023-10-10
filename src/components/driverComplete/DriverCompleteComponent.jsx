import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import { ShieldCheckIcon, PhoneIcon, ChatBubbleOvalLeftIcon } from 'react-native-heroicons/outline';
import { AirbnbRating } from 'react-native-ratings';

import styles from '../../styles';
import Header from '../header/Header';
import { Image } from 'react-native';
import { fallbackImage, fetchGetOneRate, fetchReviewCustomer, fetchDetailTrip } from '../../api/DataFetching';
import { reviewTextComplete } from '../../constants';
import { CustomerFormContext } from '../../redux/customerFormContext';
import FormCustomer from '../formCustomer';
import Contact from '../contact';
import SpreadSheet from '../spreadSheet';
import { TokenContext } from '../../redux/tokenContext';
import { Alert } from 'react-native';
import { MapContext } from '../../redux/mapContext';
import { format } from 'date-fns';
import { DetailTripContext } from '../../redux/detailTripContext';


const DriverCompleteComponent = () => {
    const context = useContext(CustomerFormContext);
    const contextDetailTrip = useContext(DetailTripContext);
    const contextMap = useContext(MapContext);
    const contextToken = useContext(TokenContext);
    const navigation = useNavigation();
    const {params: item} = useRoute();
    const [rating, setRating] = useState(3);
    const [reviewText, setReviewText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [statusReview, setStatusReview] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    //danh gia
    const handleSubmitRate = () => {
        const data = {
            trip_id: context?.customerForm.tripId,
            customer_id: item?.user_id,
            content: reviewText,
            star: rating
        }
        fetchReviewCustomer(data,contextToken.token)
        .then((data) => {
            // console.log(data);
            if(data.res === 'success'){
                Alert.alert(
                    'Thông báo',
                    data.status,
                    [
                        { text: 'Đồng ý' }
                    ],
                    { cancelable: false }
                )
                setStatusReview(1)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };
    //sua danh gia
    const handleUpdateRate = () => {
        const data = {
            trip_id: context?.customerForm.tripId,
            customer_id: item?.user_id,
            content: reviewText,
            star: rating,
            is_update: 1
        }
        fetchReviewCustomer(data,contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                // console.log(data);
                Alert.alert(
                    'Thông báo',
                    data.status,
                    [
                        { text: 'Đồng ý' }
                    ],
                    { cancelable: false }
                )
                setStatusReview(1)
            }else{
                console.log(data);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    //quay ve trang chu
    const handleBackToHome = () => {
        const dataCustomer = {
            tripId: '',
            startPoint: '',
            endPoint: '',
            typeCar: '',
            nameCar: '',
            startTime: '',
            comment: '',
            duration: '',
            distance: '',
            coordinates: '',
            price: '',
        }
        const dataMap = {
            start: '',
            end: ''
        }
        context.setCustomerForm(dataCustomer);
        contextMap.setMap(dataMap);
        navigation.navigate('HomeScreen');
    }

    const detailTrip = async () => {
        const params = {
            trip_id: item?.trip_id ? item?.trip_id : item?.id
        }
        await fetchDetailTrip(params,contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                createContext(data);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoadingDetail(true);
        })
    }

    const getOneRate = async () => {
        const params = {
            trip_id: context?.customerForm.tripId ? context?.customerForm.tripId : item?.user_id
        }
        // console.log(params);
        await fetchGetOneRate(params,contextToken.token)
        .then((data) => {
            // console.log(data);
            if(data.res === 'success'){
                setStatusReview(parseInt(data.result.status));
                setReviewText(data.result.content)
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(true);
        })
    }

    const createContext = (data) => {
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
            nameCar: data.result.name_category,
            startTime: data.result.start_time,
            comment: data.result.comment,
            duration: data?.result.duration_all,
            distance: data?.result.distance_all, 
            coordinates: {
                start: data.result.coordinates_start,
                end: data.result.coordinates_end,
            },
            price: parseFloat(data.result.price_report)
        })
    }

    useEffect(() => {
        // console.log(item);
        if(item?.isFlag == 1 || item?.is_notify == 1){
            detailTrip();
        }
        getOneRate();
    },[statusReview])

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            {isLoading && isLoadingDetail && (
                <View style={[styles.flexFull, styles.bgBlack]}>
                    {/* header */}
                    <Header navigation={navigation} title="Chi tiết chuyến đi" />
                    {/* body */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={[styles.flexFull, styles.pt15]}
                    >
                        {/* thông tin tài xế */}

                        <View style={[styles.border1, styles.borderSolid, styles.pt10]}>
                            <View style={[styles.flexColumn, styles.itemsCenter, styles.mb20]}>
                                {/* avatar */}
                                <Image
                                    source={{
                                        uri:
                                            item?.image||
                                            fallbackImage,
                                    }}
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
                                    <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                        {item?.average_rates.toString()}
                                    </Text>
                                </View>
                            </View>

                            {/* contact */}
                            <Contact item={item}/>

                            <Text
                                style={[
                                    styles.flexCenter,
                                    styles.textWhite,
                                    styles.fs27,
                                    styles.textCenter,
                                    styles.mx24,
                                    styles.fw300,
                                    styles.mb24,
                                ]}
                            >
                                Hoàn thành chuyến đi!
                            </Text>
                        </View>

                        {/* bang tinh */}
                        <SpreadSheet context={context}/>

                        <FormCustomer context={context} title="Thông tin chuyến đi" />


                        {/* rate */}
                        <View
                            style={[
                                styles.px15,
                                styles.mb50,
                                styles.borderTop,
                                styles.border1,
                                styles.pt24,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.textWhite,
                                    styles.fs16,
                                    styles.fw700,
                                    styles.lh24,
                                    styles.mb24,
                                ]}
                            >
                                Bạn hài lòng về chuyến đi?
                            </Text>
                            {/*  */}
                            <View style={[styles.flexRow, styles.mb24]}>
                                <Image
                                    source={{
                                        uri:
                                            'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80' ||
                                            fallbackImage,
                                    }}
                                    style={{ width: 52, height: 52, borderRadius: 999 }}
                                    resizeMode="cover"
                                />
                                <View style={[styles.pl10, styles.flexFull]}>
                                    <TextInput
                                        style={[
                                            styles.textGray77,
                                            styles.bg161e,
                                            styles.fs15,
                                            styles.textAreaRate,
                                            styles.p15,
                                        ]}
                                        placeholder="Đánh giá của bạn..."
                                        placeholderTextColor={'rgba(119,125,146,0.8)'}
                                        multiline
                                        numberOfLines={2}
                                        value={reviewText}
                                        onChangeText={setReviewText}
                                    />
                                    {/* btn */}
                                    <View style={[styles.flexBetween, styles.mt10]}>
                                        {reviewTextComplete.map((reviewText) => (
                                            <TouchableOpacity
                                                key={reviewText.id}
                                                onPress={() => setReviewText(reviewText.name)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.textWhite,
                                                        styles.fs16,
                                                        styles.fw300,
                                                        styles.bgGray161,
                                                        styles.py5,
                                                        styles.px12,
                                                    ]}
                                                >
                                                    {reviewText.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    {/* start */}

                                    <View style={[styles.flexBetween, styles.mt20]}>
                                        <AirbnbRating
                                            size={20}
                                            selectedColor={'white'}
                                            unSelectedColor={'#333'}
                                            showRating={false}
                                            startingValue={rating}
                                            onFinishRating={handleRatingChange}
                                        />
                                        {statusReview === 1 ? (
                                            <TouchableOpacity onPress={handleUpdateRate}>
                                                <Text
                                                    style={[
                                                        styles.textWhite,
                                                        styles.bgRed,
                                                        styles.px12,
                                                        styles.py5,
                                                        styles.border4,
                                                        styles.fs14,
                                                    ]}
                                                >
                                                    Sửa
                                                </Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={handleSubmitRate}>
                                                <Text
                                                    style={[
                                                        styles.textWhite,
                                                        styles.bgRed,
                                                        styles.px12,
                                                        styles.py5,
                                                        styles.border4,
                                                        styles.fs14,
                                                    ]}
                                                >
                                                    Đánh giá
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
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
                            onPress={() => handleBackToHome()}
                        >
                            <Text style={[styles.fs16, styles.textWhite]}>Trang chủ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default DriverCompleteComponent;