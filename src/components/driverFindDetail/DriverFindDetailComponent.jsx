import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import React, { useState, useEffect, useContext, useRef } from 'react';
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
import { fallbackImage, fetchCancelReport, fetchCheckReport, fetchDetailCustomer, fetchDetailTrip, fetchGetLocationDriver, fetchGetOneCategoryVehicle, fetchPickUpCustomer, fetchSendReport, fetchGetCoin } from '../../api/DataFetching';
import PayNumber from '../editPayNumber';
import { MapContext } from '../../redux/mapContext';
import FormCustomer from '../formCustomer';
import { TokenContext } from '../../redux/tokenContext';
import Contact from '../contact';
import { CustomerFormContext } from '../../redux/customerFormContext';
import DistanceInfomation from '../distanceInfomation/DistanceInfomation';
import ReviewCustomer from '../reviewCustomer/ReviewCustomer';
import ContentLoader from 'react-native-easy-content-loader';
import { statusDriver } from '../../constants';

const DriverFindDetailComponent = () => {
    const context = useContext(CustomerFormContext);
    const contextToken = useContext(TokenContext);
    const contextMap = useContext(MapContext);
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [price, setPrice] = useState(0);
    const [customer, setCustomer] = useState(null);
    const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
    const [shouldNavigateToCancel, setShouldNavigateToCancel] = useState(false);
    const [coords, setCoords] = useState(null);
    const [status, setStatus] = useState(null);
    const [coin, setCoin] = useState(null);
    const cancelObjRef = useRef(null);
    const screenRef = useRef(null);


    const handlePriceChange = (newPrice) => {
        setPrice(newPrice);
    };

    const detailTrip = async () => {
        const params = {
            trip_id: item?.id ? item?.id : item?.trip_id
        }
        await fetchDetailTrip(params,contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                oneCateVehicle(data);
                detailCustomer(data?.result)
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // if(item?.is_notify){
            //     setIsLoadingCustomer(false);
            // }
            // else{
                // setIsLoadingCustomer(true);
            // }
        })
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
                const coordStart = data.result.coordinates_start.split(',');
                const coordEnd = data.result.coordinates_end.split(',');
                setCoords({
                    latStart: coordStart[0],
                    lngStart: coordStart[1],
                    latEnd: coordEnd[0],
                    lngEnd: coordEnd[1]
                })
                if(data.result.status_report == 1){
                    setPrice(parseFloat(data.result.price_report));
                }else{
                    setPrice(parseFloat(data.result.price_per_km) * parseFloat(data.result.distance_price))
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
        // .finally(() => {
        //     setIsLoadingCustomer(true);
        // })
    }
    
    const detailCustomer = async (result) => {
        try {
            const data = await fetchDetailCustomer({
                user_id: result.user_id
            });
            const obj = data.result;
            if (result?.status != 0 && result?.status != 1) {
                obj.cancel_reason = result.cancel_reason;
                obj.is_notify = item?.is_notify ? item?.is_notify : ''
                cancelObjRef.current = obj;
                setShouldNavigateToCancel(true);
            let a = statusDriver.filter((status) => status.id == result?.status);
            screenRef.current = a[0].screen;
            // console.log(screenRef.current);
            }
            setCustomer(obj);
        } catch (err) {
            console.log(err);
        } finally {
            if(item?.is_notify && (result?.status != 0 && result?.status != 1) ){
                setIsLoadingCustomer(false);
            }else{
                setIsLoadingCustomer(true);
            }
        }
    }

    const checkReport = async () => {
        await fetchCheckReport({
            trip_id: item?.id ? item?.id : item?.trip_id
        },contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                setStatus(true);
            }else{
                setStatus(false);
            }
        })
    }

    const getLocationDriver = async (driverId) => {
        await fetchGetLocationDriver({
            driver_id: driverId,
        })
        .then((data) => {
            contextMap.setMap({
                ...contextMap.map,
                start: {
                    coordinates: {
                        lat: data.result.lat,
                        lng: data.result.lng,
                    }
                }
            })
        })
    }

    const handleReport = async (handle) => {
        // console.log(handle);
        if(handle == 'cancel'){
            const data = {
                trip_id: item?.id ? item?.id : item?.trip_id,
                user_id: customer?.user_id
            }
            await fetchCancelReport(data, contextToken.token)
            .then((data) => {
                if(data.res == 'success'){
                    setPrice(0);
                    setStatus(false)
                    Alert.alert(
                        'Thông báo',
                        data.status,
                        [
                            { text: 'Đồng ý' }
                        ],
                        { cancelable: false }
                    )
                }else{
                    Alert.alert(
                        'Thông báo',
                        data.status,
                        [
                            { text: 'Đồng ý' }
                        ],
                        { cancelable: false }
                    )
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }else if(handle == 'send'){
            const data = {
                trip_id: item?.id ? item?.id : item?.trip_id,
                trip_price: price,
                distance: context?.customerForm.distance,
                user_id: customer?.user_id
            }
            await fetchSendReport(data,contextToken.token)
            .then((data) => {
                Alert.alert(
                    'Thông báo',
                    data.status,
                    [
                        { text: 'Đồng ý' }
                    ],
                    { cancelable: false }
                )
                if(data.res === 'success'){
                    setStatus(true);
                }
            })
        }
    }

    const getCoin = async () => {
        fetchGetCoin(contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                setCoin(data.result.coin);
            }
        })
    }

    const handlePickUpCustomer = async () => {
        // navigation.navigate('DriverPickScreen', customer)
        fetchPickUpCustomer({
            trip_id: item?.id,
            user_id: customer?.user_id
        },contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                navigation.navigate('DriverPickScreen', customer)
            }
        })
    }
    
    useEffect(() => {
        detailTrip();
        checkReport();
        getCoin();
        if(item?.is_notify || item?.driver_id || item?.isFlag || item?.isHome){
            getLocationDriver(item?.driver_id);
        }
        if (shouldNavigateToCancel) {
            // console.log(screenRef.current);
            navigation.navigate(screenRef.current, cancelObjRef.current);
        }
    }, [item.id,shouldNavigateToCancel]);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            {isLoadingCustomer ? (
                <View style={[styles.flexFull, styles.bgBlack]}>
                    {/* header */}
                    <Header navigation={navigation} title="Tìm tài xế" />

                    {/* body */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={[styles.flexFull, styles.pt15]}
                    >

                        <FormCustomer context={context} tripId={item?.trip_id && item?.trip_id} title="Thông tin chuyến đi" />
                        {/* khoang cach & thoi gian */}

                        <DistanceInfomation context={context}/>
    

                        {/* bang tinh */}
                        <View style={[styles.bgWhite, styles.p15]}>
                            <Text style={[styles.fs27, styles.lh32, styles.fw400, styles.mb15]}>
                                Bảng tính
                            </Text>
                            {/* thoi gian du tinh */}
                            <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                    Thời gian dự tính
                                </Text>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>{context?.customerForm.duration} phút</Text>
                            </View>
                            {/* khoang cach */}
                            <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                    Khoảng cách
                                </Text>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>{context?.customerForm.distance} km</Text>
                            </View>
                            {/* bao gia */}
                            <View style={[styles.borderBot5, styles.py10]}>
                                <View style={[styles.flexBetween, styles.mb15]}>
                                    <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                        Báo giá (VNĐ)
                                    </Text>
                                    <View
                                        style={[
                                            styles.border1,
                                            styles.borderSolid,
                                            styles.borderColorCyan2F,
                                            styles.px10,
                                        ]}
                                    >
                                        <PayNumber
                                            value={price}
                                            label={'Báo giá'}
                                            onChange={handlePriceChange}
                                            style={[styles.fs16, styles.lh24, styles.fwBold]}
                                            maxLength={9}
                                            editable={!status}
                                        />
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={[!status ? styles.bgCyan2F : styles.bgRed, styles.h46, styles.flexCenter]}
                                    onPress={() => handleReport(!status ? 'send' : 'cancel')}
                                >
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.fw400,
                                            styles.lh24,
                                            styles.flexFull,
                                            styles.textCenter,
                                        ]}
                                    >
                                        {!status ? 'Gửi khách' : 'Hủy báo giá'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* so du diem */}
                            <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                                <View style={[styles.flexRow, styles.itemsCenter]}>
                                    <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                        Số dư điểm
                                    </Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.bg161e,
                                            styles.px10,
                                            styles.flexCenter,
                                            styles.ml10,
                                        ]}
                                    >
                                        <Text style={[styles.textWhite, styles.fs12, styles.lh20]}>
                                            Nạp điểm
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>{coin}K</Text>
                            </View>
                            {/* phi nen tang */}
                            <View style={[styles.py10]}>
                                <View style={[styles.flexBetween]}>
                                    <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                        Phí nền tảng (3%)
                                    </Text>
                                    <Text style={[styles.fs16, styles.lh24, styles.fw400]}>- {price * 0.03 / 1000}K</Text>
                                </View>
                                <Text style={[styles.fs12, styles.fw400, styles.textGray77]}>
                                    (Trừ sau khi kết thúc chuyến đi)
                                </Text>
                            </View>
                        </View>

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
                                    source={{ uri: customer?.image || fallbackImage }}
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
                                        {customer?.fullname}
                                    </Text>
                                    {customer?.is_confirmed == 2 && (
                                        <View style={[styles.pl10]}>
                                            <ShieldCheckIcon size={16} color={'white'} />
                                        </View>
                                    )}
                                </View>

                                {/* đánh sao*/}
                                {customer?.average_rates.toString() && (
                                    <View style={[styles.flexRow, styles.itemsCenter]}>
                                        <StarIcon size={'16'} color={'white'} />
                                        <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                            {customer?.average_rates.toString()}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* contact */}
                            <Contact item={customer}/>

                            {/* đánh giá */}
                            <ReviewCustomer />
                        </View>
                    </ScrollView>

                    {/* buttom  huy chuyen & tim tai xe*/}
                    <View style={[styles.flexRow]}>
                        <TouchableOpacity
                            style={[
                                styles.h48,
                                styles.bgGray161,
                                styles.flexFull,
                                styles.itemsCenter,
                                styles.justifyCenter,
                            ]}
                            onPress={() => navigation.navigate('CancelBookDriverScreen', customer)}
                        >
                            <Text style={[styles.fs16, styles.textWhite]}>Hủy chuyến</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.h48,
                                styles.bgRed,
                                styles.flexFull,
                                styles.itemsCenter,
                                styles.justifyCenter,
                            ]}
                            onPress={handlePickUpCustomer}
                        >
                            <Text style={[styles.fs16, styles.textWhite]}>Đón khách</Text>
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
        </SafeAreaView>
    );
};

export default DriverFindDetailComponent;
