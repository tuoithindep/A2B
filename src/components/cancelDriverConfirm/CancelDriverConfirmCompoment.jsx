import { SafeAreaView, StatusBar, View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import Header from "../header";
import { StarIcon, XMarkIcon } from "react-native-heroicons/solid";
import { fallbackImage, fetchDetailCustomer, fetchDetailTrip } from "../../api/DataFetching";
import styles from "../../styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../redux/mapContext";
import SentFormBooking from "../sentFormBooking";
import { CustomerFormContext } from "../../redux/customerFormContext";
import FormCustomer from "../formCustomer";
import Contact from "../contact";
import ReviewCustomer from "../reviewCustomer";
import { TokenContext } from "../../redux/tokenContext";

const CancelDriverConfirmCompoment = () => {
    const navigation = useNavigation();
    const { params: item } = useRoute();
    const context = useContext(CustomerFormContext);
    const contextToken = useContext(TokenContext);
    const [isLoading, setIsLoading] = useState(false);

    const detailTrip = async () => {
        const params = {
            trip_id: item?.trip_id
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
            price: data.result.status_report == 1 ? parseFloat(data.result.price_report) : parseFloat(data.result.price_per_km * data.result.distance_price)
        })
    }

    const handleBackToHome = () => {
        // console.log(context.bookingForm.eniqueId);
        navigation.navigate('HomeScreen')
        context.setCustomerForm({
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
        })
    }

    useEffect(() => {
        if(item?.is_notify == 1 || item?.isFlag == 1){
            detailTrip();
        }else{
            setIsLoading(true);
        }
    },[])

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            {isLoading ? (
                <View style={[styles.flexFull, styles.bgBlack]}>
                    {/* header */}
                    <Header navigation={navigation} title="Hủy chuyến" />

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
                                <XMarkIcon size={60} color={'black'} stroke={'black'} />
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
                                Chuyến đi đã bị hủy!
                            </Text>
                            <Text
                                style={[
                                    styles.textCenter,
                                    styles.textWhite,
                                    styles.mt24,
                                    styles.mx24,
                                    styles.fs16,
                                    styles.fw300,
                                ]}
                            >
                                {item?.cancel_reason}
                            </Text>
                        </View>

                        <FormCustomer context={context} title="Thông tin về chuyến đi" />
                        {/* Thông tin khách hàng */}
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
                            <Contact item={item} />

                            {/* đánh giá */}
                            {/* <ReviewCustomer /> */}

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
                            onPress={handleBackToHome}
                        >
                            <Text style={[styles.fs16, styles.textWhite]}>Trang chủ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View></View>
            )}
        </SafeAreaView>
    );
}
export default CancelDriverConfirmCompoment;