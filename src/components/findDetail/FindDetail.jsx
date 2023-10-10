import { View, Text, TouchableOpacity, ScrollView, StatusBar, Modal } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import { CurrencyDollarIcon, ShieldCheckIcon } from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { Image } from 'react-native';
import { fallbackImage, fetchBookACar, fetchDetailDriver, fetchListReviewDriver } from '../../api/DataFetching';
import { BookingFormContext } from '../../redux/bookingFormContext';
import SentFormBooking from '../sentFormBooking';
import MomentComponent from '../moment';
import { TokenContext } from '../../redux/tokenContext';
import { DetailTripContext } from '../../redux/detailTripContext';
import { MapContext } from '../../redux/mapContext';
import { filterReview } from '../../constants';
import { Dimensions } from 'react-native';
import { Alert } from 'react-native';

const FindDetail = () => {
    const context = useContext(BookingFormContext);
    const contextToken = useContext(TokenContext);
    const contextMap = useContext(MapContext);
    const contextDetailDriver = useContext(DetailTripContext);
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [reviewDriver, setReviewDriver] = useState([]);
    const [detailDriver, setDetailDriver] = useState([]);
    const [rateCount, setRateCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingReview, setLoadingReview] = useState(false);
    const isFocused = useIsFocused();
    const [isUnmounted, setIsUnmounted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectItem, setSelectItem] = useState('Mới nhất');
    const maxHeight = Dimensions.get('window').height * 0.7;

    const getReviewList = (driverId, name='', filter='') => {
        const params = {
            driver_id: driverId,
            name: name,
            filter: filter,
        }
        fetchListReviewDriver(params)
        .then((data) => {
            if(data.res === 'success'){
                setReviewDriver(data.result.list);
                setRateCount(data.result.rates_count);
                // console.log(data.result);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoadingReview(true)
        })
        // if (data && data.result.list) setReviewDriver(data.result.list);
    };

    const getDetailDriver = (driverId) => {
        const params = {
            driver_id: driverId,
        }
        fetchDetailDriver(params)
        .then((data) => {
            if(data.res === 'success'){
                setDetailDriver(data.result);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(true)
        })
    }

    const StarsDisplay = ({ value }) => {
        const starCount = 5;

        return (
            <View style={[styles.flexRow, styles.itemsCenter]}>
                {[...Array(starCount)].map((_, index) => (
                    <StarIcon
                        key={index}
                        size={12}
                        color={index < value ? 'white' : 'black'}
                        stroke={index < value ? undefined : 'white'}
                    />
                ))}
            </View>
        );
    };

    const handleSelectItem = (title, name, filter) => {
        setSelectItem(title);
        setModalVisible(false);
        getReviewList(item?.driver_id,name,filter)
    }

    const handleBookACar = async () => {
        const data = {
            trip_id: context?.bookingForm.eniqueId,
            driver_id: item?.driver_id
        }
        await fetchBookACar(data,contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                navigation.navigate('ConfirmScreen', detailDriver)
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
    }
    
    useEffect(() => {
        if (!isFocused) {
            // Màn hình bị blur, thực hiện unmount
            setIsUnmounted(true);
        } else {
            // Màn hình được focus lại, không cần unmount
            setIsUnmounted(false);
        }
      }, [isFocused]);
    
    useEffect(() => {
    // Gọi API hoặc các tác vụ khác tại đây khi màn hình được render
    // Hãy chắc chắn kiểm tra isUnmounted trước khi thực hiện bất kỳ công việc nào tại đây
        if (!isUnmounted) {
            // Gọi API hoặc tác vụ khác...
            getReviewList(item.driver_id);
            getDetailDriver(item.driver_id);
            contextDetailDriver.setDetailTrip({
                ...contextDetailDriver.detailTrip,
                price_distance: item.price_distance
            })
        }
    }, [isUnmounted]); 

    useEffect(() => {
        getReviewList(item.driver_id);
        getDetailDriver(item.driver_id);
    }, [item.driver_id]);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Tìm tài xế" />

                {/* body */}
                {loading && 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={[styles.flexFull, styles.pt15]}
                    >
                        <SentFormBooking context={context} contextMap={contextMap} title="Bạn đang đặt chuyến" />

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
                                    source={{ uri: detailDriver?.image_driver || fallbackImage }}
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
                                        {detailDriver?.fullname}
                                    </Text>
                                    {detailDriver?.is_confirmed == 1 && (
                                        <View style={[styles.pl10]}>
                                            <ShieldCheckIcon size={16} color={'white'} />
                                        </View>
                                    )}
                                </View>

                                {/* đánh sao*/}
                                {detailDriver?.average_rates.toString() && (
                                    <View style={[styles.flexRow, styles.itemsCenter]}>
                                        <StarIcon size={'16'} color={'white'} />
                                        <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                            {detailDriver?.average_rates.toString()}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* thông tin xe */}
                            <View
                                style={[
                                    styles.px15,
                                    styles.py10,
                                    styles.bg161e,
                                    styles.flexRow,
                                    styles.flexFull,
                                    styles.mb20,
                                ]}
                            >
                                <Image
                                    source={{ uri: detailDriver?.image_car || fallbackImage }}
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
                                            {detailDriver?.vehicle_name} - {detailDriver?.vehicle_life}
                                        </Text>
                                        {detailDriver?.is_confirmed_vehicle == 1 && (
                                            <ShieldCheckIcon size={16} color={'white'} />
                                        )}
                                    </View>

                                    {/* tên xe */}
                                    {detailDriver?.license_plates_color == 1 ? (
                                        <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
                                            <Text
                                                style={[
                                                    styles.fs16,
                                                    styles.fw400,
                                                    styles.lh24,
                                                    styles.bgYellow,
                                                    styles.textWhite,
                                                    styles.px10,
                                                ]}
                                            >
                                                {detailDriver?.license_plates}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
                                            <Text
                                                style={[
                                                    styles.fs16,
                                                    styles.fw400,
                                                    styles.lh24,
                                                    styles.bgWhite,
                                                    styles.px10,
                                                ]}
                                            >
                                                {detailDriver?.license_plates}
                                            </Text>
                                        </View>
                                    )}
                                    

                                    {/* đánh sao & giá tiền */}
                                    {item?.price_distance.toString() && (
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
                                                {item?.price_distance.toString()}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>

                            {/* đánh giá */}
                            <View style={[styles.px15, styles.pb60]}>
                                {/* header */}
                                <View style={[styles.flexBetween, styles.mb24]}>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.fw700,
                                            styles.lh24,
                                        ]}
                                    >
                                        Đánh giá ({reviewDriver.length !== 0 ? rateCount : 0})
                                    </Text>
                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                        <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                            {selectItem}
                                        </Text>
                                    </TouchableOpacity>
                                    <Modal
                                        visible={modalVisible} 
                                        animationType="slide" 
                                        transparent
                                    >
                                        <TouchableOpacity
                                            style={[
                                                styles.flexFull,
                                                styles.itemsCenter,
                                                styles.justifyCenter,
                                                styles.bgBlack50,
                                            ]}
                                            onPress={() => setModalVisible(false)}
                                        >
                                            <View
                                                style={[
                                                    styles.bgWhite,
                                                    styles.border10,
                                                    styles.hidden,
                                                    { maxHeight: maxHeight, width: '60%' },
                                                ]}
                                            >
                                                <ScrollView showsVerticalScrollIndicator={false}>
                                                    {filterReview.map((item, index) => (
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => handleSelectItem(item?.title, item?.name, item?.filter)}
                                                            style={[
                                                                styles.py10,
                                                                selectItem === item?.title && styles.bg161e,
                                                            ]}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.fs18,
                                                                    styles.px10,

                                                                    selectItem === item?.title
                                                                        ? styles.textWhite
                                                                        : styles.textGray77,
                                                                ]}
                                                            >
                                                                {item?.title}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </ScrollView>
                                            </View>
                                        </TouchableOpacity>
                                    </Modal>
                                    
                                </View>
                                
                                {/* many reviews */}
                                {reviewDriver.length !== 0 ? reviewDriver.map((item) => (
                                    <View key={item.rate_id} style={[styles.flexRow, styles.mb24]}>
                                        <Image
                                            source={{ uri: item?.image || fallbackImage }}
                                            style={{ width: 52, height: 52, borderRadius: 999 }}
                                            resizeMode="cover"
                                        />
                                        <View style={[styles.pl10, styles.flexFull]}>
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs16,
                                                    styles.lh24,
                                                    styles.fw400,
                                                ]}
                                            >
                                                {item?.name}: {item?.comment}
                                            </Text>
                                            <View
                                                style={[styles.flexRow, styles.itemsCenter, styles.mt5]}
                                            >
                                                <StarsDisplay value={item?.star} />
                                                <MomentComponent
                                                    style={[
                                                        styles.textGray77,
                                                        styles.fs14,
                                                        styles.lh24,
                                                        styles.fw400,
                                                        styles.ml15,
                                                    ]}
                                                    timeString={item?.created_at}
                                                />
                                            </View>
                                        </View>
                                    </View>  
                                )) : (
                                    <View key={item.rate_id} style={[styles.flexRow, styles.mb24]}>
                                        <Text
                                            style={[
                                                styles.textWhite,
                                                styles.fs16,
                                                styles.lh24,
                                                styles.fw400,
                                            ]}
                                        >
                                            Chưa có đánh giá nào cả 
                                        </Text>
                                    </View>  
                                )} 
                            </View>
                        </View>
                    </ScrollView>
                }

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
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Chọn tài khác</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.h48,
                            styles.bgRed,
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                        ]}
                        onPress={handleBookACar}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Đặt chuyến</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FindDetail;
