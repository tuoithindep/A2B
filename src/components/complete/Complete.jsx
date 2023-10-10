import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    ShieldCheckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
    Square2StackIcon,
} from 'react-native-heroicons/outline';
import { AirbnbRating } from 'react-native-ratings';
import ContentLoader from 'react-native-easy-content-loader';

import styles from '../../styles';
import Header from '../header/Header';
import { Image } from 'react-native';
import { fallbackImage, fetchDetailTrip, fetchGetOneRate, fetchProfileUser, fetchReviewDriver } from '../../api/DataFetching';
import { reviewTextComplete } from '../../constants';
import Contact from '../contact';
import QrCode from '../qrCode/QrCode';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { DetailTripContext } from '../../redux/detailTripContext';
import { TokenContext } from '../../redux/tokenContext';
import { MapContext } from '../../redux/mapContext';

const Complete = () => {
    const navigation = useNavigation();
    const [rating, setRating] = useState(4);
    const [reviewText, setReviewText] = useState('');
    const { params: item } = useRoute();
    const context = useContext(BookingFormContext)
    const contextDetailTrip = useContext(DetailTripContext)
    const contextToken = useContext(TokenContext);
    const contextMap = useContext(MapContext);
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [statusReview, setStatusReview] = useState(0);

    // const handleScroll = () => {
    //     Keyboard.dismiss();
    // };

    const getProfile = () => {
        fetchProfileUser(contextToken.token)
            .then((data) => {
                if (data.res === 'success') {
                    setProfile(data.result);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const detailTrip = async (paramsTrip) => {
        await fetchDetailTrip(paramsTrip, contextToken.token)
            .then((data) => {
                // console.log(paramsTrip);
                if (data.res === 'success') {
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

    const createContext = async (data) => {
        await context.setBookingForm({
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

        await contextDetailTrip.setDetailTrip({
            ...contextDetailTrip.detailTrip,
            duration: data.result.duration_all,
            distance: data.result.distance_all,
            price_distance: parseInt(data.result.price_report).toLocaleString('vi-VN'),
        })
    }

    useEffect(() => {
        getProfile();
        if (item?.is_notify || item?.isFlag || item?.isHome) {
            const paramsTrip = {
                trip_id: item?.id ? item?.id : item?.trip_id
            }
            // console.log(item);
            detailTrip(paramsTrip);
        } else {
            setIsLoading(true);
        }
    }, [])
    
    useEffect(() => {
        const params = {
            trip_id: context.bookingForm.eniqueId ? context.bookingForm.eniqueId : item?.id
        }
        fetchGetOneRate(params, contextToken.token)
            .then((data) => {
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

    }, [statusReview])

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmitRate = () => {
        const data = {
            trip_id: 44,
            driver_id: item?.driver_id,
            content: reviewText,
            star: rating
        }
        fetchReviewDriver(data, contextToken.token)
            .then((data) => {
                // console.log(data);
                if (data.res === 'success') {
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

    const handleUpdateRate = () => {
        const data = {
            trip_id: 44,
            driver_id: item?.driver_id,
            content: reviewText,
            star: rating,
            is_update: 1
        }
        fetchReviewDriver(data, contextToken.token)
            .then((data) => {
                if (data.res === 'success') {
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
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleBackToHome = () => {
        const dataMap = {
            start: '',
            end: ''
        }
        const dataBookingForm = {
            eniqueId: '',
            startPoint: '',
            endPoint: '',
            typeCar: '',
            nameCar: '',
            departureTime: '',
            note: '',
            isPunish: 0
        }
        const dataDetailTrip = {
            duration: '',
            distance: '',
            price_distance: 0,
        }
        context.setBookingForm(dataBookingForm);
        contextDetailTrip.setDetailTrip(dataDetailTrip);
        contextMap.setMap(dataMap);
        navigation.navigate('HomeScreen');
    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <KeyboardAvoidingView style={[styles.flexFull]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <StatusBar barStyle="light-content" animated={true} />
                {(isLoading && isLoadingDetail) ? (
                    <View style={[styles.flexFull, styles.bgBlack]}>
                        {/* header */}
                        <Header navigation={navigation} title="Hoàn thành chuyến đi" />

                        {/* body */}
                        <ScrollView
                            automaticallyAdjustKeyboardInsets={true}
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
                                                item?.image_driver ||
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
                                            {item?.average_rates}
                                        </Text>
                                    </View>
                                </View>

                                {/* contact */}
                                <Contact
                                    item={item}
                                />

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
                                    Cảm ơn bạn đã lựa chọn chuyến đi này!
                                </Text>
                            </View>

                            {/* qr code */}
                            <QrCode
                                item={item}
                                contextDetailTrip={contextDetailTrip}
                                context={context}
                            />

                            {/* rate */}
                            <View style={[styles.px15, styles.mb50]}>
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
                                                profile.image ||
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
                                            {(statusReview === 1 ? (
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
                                            ))
                                            }
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
                ) : (
                    <ContentLoader
                        pRows={2} // Số dòng
                        listSize={2}
                        primaryColor='#999'
                        pWidth={['100%', '100%']} // Độ rộng của từng dòng, có thể điều chỉnh theo nhu cầu
                        pHeight={[60, 60]} // Chiều cao của từng dòng
                        pAnimate={true} // Tắt hiệu ứng loading, có thể bật lại theo nhu cầu
                    >
                    </ContentLoader>
                )}

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Complete;