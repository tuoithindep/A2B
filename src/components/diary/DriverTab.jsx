import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { CheckCircleIcon, StopCircleIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import moment from 'moment';
import { fetchListHistoryDriver, fetchListMyCar, fetchDetailCustomer } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';
import { SectionList } from 'react-native';
import { Dimensions } from 'react-native';
import { waiting } from '../../constants';
import Skenleton from '../skeleton/Skenleton';
import { useNavigation } from '@react-navigation/native';

const DriverTab = () => {
    const navigation = useNavigation();

    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const startOfWeek = moment().startOf('isoWeek');
    const startOfLastWeek = moment().subtract(1, 'weeks').startOf('isoWeek');
    const startOfMonth = moment().startOf('month');
    const startOfLastMonth = moment().subtract(1, 'months').startOf('month');
    const [drivers, setDrivers] = useState({});
    const [loading, setLoading] = useState(false);
    const contextToken = useContext(TokenContext);
    const cardWidth = Dimensions.get("window").width * 0.8;

    const listDrivers = () => {
        fetchListHistoryDriver(contextToken.token)
            .then((data) => {
                // console.log('data',data);
                if (data.res === 'success') {
                    // console.log(data.result);
                    // // setDrivers(data.result);
                    setHistoryDriver(data.result);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(true);
            })
    }

    const setHistoryDriver = (drivers) => {
        const dateArr = drivers.flatMap((driver, index) => {
            const dateFormat = moment(driver.created_at);
            if (dateFormat.isSame(today, 'day')) {
                return [{ data: driver, title: 'Hôm nay' }];
            }
            if (dateFormat.isSame(yesterday, 'day')) {
                return [{ data: driver, title: 'Hôm qua' }];
            }
            if (dateFormat.isBetween(startOfWeek, today, 'day', '[]')) {
                return [{ data: driver, title: 'Tuần này' }];
            }
            if (dateFormat.isBetween(startOfLastWeek, startOfWeek, 'day', '[]')) {
                return [{ data: driver, title: 'Tuần trước' }];
            }
            if (dateFormat.isBetween(startOfMonth, today, 'day', '[]')) {
                return [{ data: driver, title: 'Tháng này' }];
            }
            if (dateFormat.isBetween(startOfLastMonth, startOfMonth, 'day', '[]')) {
                return [{ data: driver, title: 'Tháng trước' }];
            } else {
                return [{ data: driver, title: 'Cũ hơn' }];
            }

            // Hoặc trả về một mảng trống nếu không phù hợp với bất kỳ điều kiện nào
            return [];
        });

        const convertArr = dateArr.reduce((result, item) => {
            // Tìm kiếm trong mảng kết quả có tồn tại title đã có trong item không
            const existingItem = result.find((data) => data.title === item.title);
            // Nếu đã tồn tại title này trong mảng kết quả
            if (existingItem) {
                // Thêm data vào mảng con tương ứng
                existingItem.data.push(item.data);
            } else {
                // Nếu chưa tồn tại title này, thêm một entry mới vào mảng kết quả
                result.push({ title: item.title, data: [item.data] });
            }
            return result;
        }, []);

        setDrivers(convertArr);
    }

    const listMyCar = async (Screen, item) => {
        await fetchListMyCar(contextToken.token)
            .then((data) => {
                if (data.res === 'success') {
                    const parts = data.result.start_location.split(', ');
                    const country = parts.pop();
                    const street = parts.join(', ');;
                    const title = street.substring(0, street.indexOf(","));
                    const address = street.replace(title + ',', '').trim();
                    let obj = {};
                    obj.radius = data.result.distane_to_customer;
                    obj.price = data.result.price_per_km;
                    obj.isEnabled = data.result.price_per_km ? true : false;
                    obj.isFlag = 1;
                    obj.currentPosition = {
                        title: title,
                        address: address
                    }
                    obj.id = item?.trip_id
                    obj.driver_id = item?.id_driver
                    // console.log(item);
                    navigation.navigate(Screen, obj);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const detailCustomer = async (Screen, item) => {
        await fetchDetailCustomer({
            user_id: item?.id_user
        })
            .then((data) => {
                if (data.res === 'success') {
                    let obj = data.result;
                    obj.isFlag = 1;
                    obj.trip_id = item?.trip_id;
                    obj.cancel_reason = item?.cancel_reason;
                    obj.driver_id = item?.id_driver;
                    // console.log(obj);
                    navigation.navigate(Screen, obj);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleNavigation = async (item) => {
        // console.log(item?.id_user);
        if (item?.status_number == 0) {
            listMyCar('DriverFindScreen');
        }
        else if (item?.status_number == 1) {
            listMyCar('DriverFindDetailScreen', item);
        }
        else if (item?.status_number == 2) {
            detailCustomer('DriverPickScreen', item)
        }
        else if (item?.status_number == 3) {
            detailCustomer('DriverMovingScreen', item)
        }
        else if (item?.status_number == 4) {
            detailCustomer('DriverCompleteScreen', item)
        }
        else if (item?.status_number == 5) {
            detailCustomer('CancelDriverConfirmScreen', item)
        }
    }

    useEffect(() => {
        listDrivers();
    }, [])


    return (
        <View>
            {/* section */}
            {loading ? (
                <View>
                    <View style={[styles.pb50]}>
                        {drivers.length !== undefined ?
                            (
                                <SectionList
                                    sections={drivers}
                                    keyExtractor={(item, index) => item.trip_id}
                                    renderItem={({ item }) => (
                                        <View>
                                            <View style={[styles.bg161e, styles.p15, styles.mb15]}>
                                                <TouchableOpacity
                                                    key={item?.trip_id}
                                                    onPress={() => handleNavigation(item)}
                                                >
                                                    <View style={[styles.flexStart, styles.mb5]}>
                                                        <CheckCircleIcon
                                                            size={20}
                                                            color={
                                                                item?.color_status === 'status--danger' ? '#E8424A' : (item?.color_status === 'status--success' ? '#2F9881' : '#FFB848')
                                                            }

                                                        />
                                                        <Text
                                                            style={[
                                                                styles.fs16,
                                                                styles.fw700,
                                                                item?.color_status === 'status--danger' ? styles.textRedE8 :
                                                                    (item?.color_status === 'status--success' ? styles.textCyan2F : styles.textYellow),
                                                                styles.mb5,
                                                                styles.ml5,
                                                                styles.flexFull,
                                                            ]}
                                                        >
                                                            {item?.status}
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.flexStart, styles.mb5]}>
                                                        <StopCircleIcon
                                                            size={20}
                                                            color={'white'}
                                                        />
                                                        <Text
                                                            style={[
                                                                styles.fs16,
                                                                styles.fw700,
                                                                styles.textWhite,
                                                                styles.mb5,
                                                                styles.ml5,
                                                                styles.flexFull,
                                                            ]}
                                                        >
                                                            {item?.start_location}
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.flexRow]}>
                                                        <MapPinIcon size={22} color={'white'} style={{ marginTop: -2 }} />
                                                        <Text
                                                            style={[
                                                                styles.fs16,
                                                                styles.fw700,
                                                                styles.textWhite,
                                                                styles.mb5,
                                                                styles.ml5,
                                                                styles.flexFull,
                                                            ]}
                                                        >
                                                            {item?.end_location}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                    renderSectionHeader={({ section: { title } }) => (
                                        <Text
                                            style={[
                                                styles.textWhite,
                                                styles.fs16,
                                                styles.fw400,
                                                styles.lh24,
                                                styles.px15,
                                                styles.mb15,
                                            ]}
                                        >
                                            {title}
                                        </Text>
                                    )}
                                    stickySectionHeadersEnabled={false}
                                />
                            ) : (
                                <View style={[styles.px10, styles.py10, styles.mb12]}>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.fw400,
                                            styles.lh24,
                                            styles.px15,
                                            styles.mb15,
                                        ]}
                                    >
                                        Không có lịch sử nào
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            ) : (
                <View>
                    {waiting.map((val) => (
                        <View key={val.id} style={[styles.card, { width: cardWidth + 80, marginBottom: 10 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <CheckCircleIcon
                                    size={20}
                                    color={'#777D92'}
                                    style={{ marginTop: 5, marginRight: 10 }}
                                />
                                <Skenleton height={16} width={cardWidth - 181} style={{ marginTop: 10, alignItems: 'flex-end' }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <StopCircleIcon
                                    size={20}
                                    color={'#777D92'}
                                    style={{ marginTop: 10, marginRight: 10 }}
                                />
                                <Skenleton height={16} width={cardWidth - 30} style={{ marginTop: 10, alignItems: 'flex-end' }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 5 }}>
                                <MapPinIcon
                                    size={20}
                                    color={'#777D92'}
                                    style={{ marginTop: 10, marginRight: 10 }}
                                />
                                <Skenleton height={16} width={cardWidth - 30} s={{ marginTop: 10, alignItems: 'flex-end' }} />
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default DriverTab;
