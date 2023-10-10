import { Text, View, TouchableOpacity, ScrollView } from "react-native"
import { ClockIcon, MapPinIcon, PencilIcon, StopCircleIcon, TruckIcon } from "react-native-heroicons/outline"
import styles from '../../styles';
import { fetchDetailTrip } from '../../api/DataFetching';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const HomeBackPrimary = ({ profile, token }) => {
    const navigation = useNavigation();
    const [dataTrip, getDataTrip] = useState({});

    useEffect(() => {
        detailTrip();
    })

    const detailTrip = async () => {
        const paramsTrip = {
            trip_id: profile?.trip_id
        }
        await fetchDetailTrip(paramsTrip, token)
            .then((data) => {
                if (data.res === 'success') {
                    let obj = data.result;
                    obj.isHome = 1;
                    getDataTrip(obj);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <View style={[styles.px15, styles.flexFull]}>
            <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.mb12]}>
                Xin chào, {profile?.fullname}!
            </Text>
            <View style={[styles.flexBetween, styles.mb24, styles.mt24]}>
                <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                    Bạn đang đặt chuyến
                </Text>
                <Text style={[styles.fs14, styles.textGray77]}>#{profile?.trip_id}</Text>
            </View>
            {/*  */}
            <ScrollView style={[styles.flexFull]}>
                <View>
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
                                Từ: {dataTrip?.start_name}
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>
                                {dataTrip?.start_location}
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
                                Đến: {dataTrip?.end_name}
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>
                                {dataTrip?.end_location}
                            </Text>
                        </View>
                    </View>

                    {/* loại hình xe */}
                    <View style={[styles.flexRow, styles.mb24]}>
                        <TruckIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text
                                style={[
                                    styles.fs16,
                                    styles.fw700,
                                    styles.textWhite,
                                    styles.mb5,
                                ]}
                            >
                                Loại hình xe
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>{dataTrip?.name_category}</Text>
                        </View>
                    </View>

                    {/* thời gian khởi hành */}
                    <View style={[styles.flexRow, styles.mb24]}>
                        <ClockIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text
                                style={[
                                    styles.fs16,
                                    styles.fw700,
                                    styles.textWhite,
                                    styles.mb5,
                                ]}
                            >
                                Thời gian khởi hành
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>
                                {dataTrip?.start_time}
                            </Text>
                        </View>
                    </View>

                    {/* ghi chú */}
                    {dataTrip?.comment && (
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
                                    Ghi chú cho tài xế
                                </Text>
                                <Text style={[styles.textGray77, styles.fs15]}>
                                    {dataTrip?.comment}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                {/* btn */}
                <View style={[styles.flexRow]}>
                    <TouchableOpacity
                        style={[
                            styles.h48,
                            styles.bgRed,
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                            styles.mx15,
                        ]}
                        onPress={() => navigation.navigate('FindScreen', dataTrip)}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Xem chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
};

export default HomeBackPrimary;