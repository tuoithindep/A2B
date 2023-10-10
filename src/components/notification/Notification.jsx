import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header';
import MomentComponent from '../moment';
import { fetchListNoti, fetchReadAllNoti, fetchReadOneNoti, fetchDetailTrip, fetchDetailDriver, fetchDetailCustomer } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';
import { useNotification } from '../../redux/notificationContext';
import Skenleton from '../skeleton/Skenleton';
import { waiting, statusDriver, statusUser } from '../../constants';

const Notification = () => {
    const { handleHiddenNoti } = useNotification();
    const navigation = useNavigation();
    const context = useContext(TokenContext);
    const [notifications, setNotifications] = useState({});
    const [isUnmounted, setIsUnmounted] = useState(false);
    const [isDot, setIsDot] = useState(true);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(2);
    const [count, setCount] = useState(0);
    const cardWidth = Dimensions.get("window").width * 0.8;
    // useEffect này chỉ chạy một lần khi component mount
    useEffect(() => {
        listNotification();
    }, []);

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
        // console.log(isUnmounted);
        // Hãy chắc chắn kiểm tra isUnmounted trước khi thực hiện bất kỳ công việc nào tại đây
        if (!isUnmounted) {
            // Gọi API hoặc tác vụ khác...
            listNotification();
            // console.log(1);

        }
    }, [isUnmounted]);

    const listNotification = () => {
        let params = {}
        fetchListNoti(params, context.token)
            .then((data) => {
                if (data.res === 'success') {
                    setNotifications(data.result);
                    handleHiddenNoti(data.count);
                    setCount(data.count - 1);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(true);
            });
    };

    // Xử lý khi thông báo được ẩn
    const handleHideNotification = () => {
        const updatedNotifications = notifications.map((noti) => ({
            ...noti,
            isRead: true
        }));
        setNotifications(updatedNotifications);
        fetchReadAllNoti(context.token)
            .then((data) => {
                // console.log(data);
                if (data.res === 'success') {
                    handleHiddenNoti(0);
                    // handleHiddenNoti(context.token);
                }
            })
    };

    // Xử lý từng thông báo bị ẩn
    const handleClickOneNoti = (noti) => {
        const index = notifications.findIndex((n) => n.notify_id === noti.notify_id && n.status == 0); //tim vi tri key noti chon voi danh sach noti api
        if (index !== -1) {
            // Đánh dấu thông báo là đã đọc bằng cách đặt isRead thành true
            const updatedNotifications = [...notifications]; // lay danh sách noti của api kết hợp
            updatedNotifications[index] = { ...noti, isRead: true }; // kết hợp noti thứ i của api với noti được chọn và thêm key isRead = true
            setNotifications(updatedNotifications); // cập nhật lại noti
            setCount(prevCount => Math.max(0, prevCount - 1));
            handleHiddenNoti(count)
        }
        fetchReadOneNoti({
            notify_id: noti.notify_id
        }, context.token)
            .then((data) => {
                if (data.res === 'success') {
                    if(noti.data){
                      if (JSON.parse(noti.data).trip_id) {
                        getDetailTrip(JSON.parse(noti.data));
                        }  
                    }else {
                        navigation.navigate(noti.screen, noti.data && JSON.parse(noti.data));
                    }
                     
                }
            })
    }

    const getDetailTrip = async (notiData) => {
        await fetchDetailTrip({
            trip_id: notiData.trip_id
        }, context.token)
        .then((data) => {
                if (data.res === 'success') {
                    if (notiData.is_user) {
                        getDataDriver(data.result)
                    } else if (notiData.is_driver) {
                        getDataUser(data.result)
                    }
                }
            })
    }

    const getDataUser = async (dataTrip) => {
        await fetchDetailCustomer({
            user_id: dataTrip.user_id,
        })
            .then((data) => {
                if (data.res === 'success') {
                    let obj = {...dataTrip, ...data.result};
                    let a = statusDriver.filter((status) => status.id == dataTrip.status);
                    obj.is_notify = 1;
                    // console.log(a[0].screen);
                    navigation.navigate(a[0].screen, obj);
                }
            })
    }

    const getDataDriver = async (dataTrip) => {
        await fetchDetailDriver({
            driver_id: dataTrip.driver_id,
        })
            .then((data) => {
                if (data.res === 'success') {
                    let obj = {...data.result, ...dataTrip};
                    let a = statusUser.filter((status) => status.id == dataTrip.status);
                    obj.is_notify = 1;
                    // console.log(dataTrip);
                    navigation.navigate(a[0].screen, obj);
                }
            })
    }

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 80;
        if (isCloseToBottom) {
            loadMoreData();
        }

    };

    const loadMoreData = async () => {
        setLoading(true);
        const params = {
            page: page
        }
        fetchListNoti(params, context.token)
            .then((data) => {
                if (data.res === 'success') {
                    setNotifications([...notifications, ...data.result]);
                    setPage(page + 1);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(true);
                // console.log('render');
            });

    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Thông báo" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                    onScroll={handleScroll}
                    scrollEventThrottle={1600}
                >
                    {/* title */}
                    <View style={[styles.flexBetween, styles.mb24, styles.px15]}>
                        <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                            Thông báo
                        </Text>
                        {/* <Text onPress={() => handleClickAllNoti()} style={[styles.fs14, styles.textGray77]}>Đã đọc tất cả</Text> */}
                        <TouchableOpacity onPress={handleHideNotification}>
                            <Text style={[styles.fs14, styles.textGray77]}>Đã đọc tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    {/* list notification */}
                    {loading ? (
                        <View style={{ paddingBottom: 100 }}>
                            {notifications.length != undefined && notifications.map((noti, index) => (
                                <TouchableOpacity
                                    key={noti.notify_id + Math.random()}
                                    style={[
                                        styles.bg161e,
                                        styles.px15,
                                        styles.py10,
                                        { marginBottom: index < notifications.length ? 12 : 0 },
                                    ]}
                                    onPress={() => handleClickOneNoti(noti)}
                                >
                                    <View style={[styles.flexBetween, styles.mb12]}>
                                        <MomentComponent
                                            timeString={noti.created_at}
                                            style={[
                                                styles.textGray77,
                                                styles.fs16,
                                                styles.lh24,
                                                styles.fw300,
                                            ]}
                                        />


                                        {!noti.isRead && noti.status == 0 && (
                                            <Text
                                                style={[
                                                    styles.bgRed,
                                                    styles.borderFull,
                                                    { width: 10, height: 10 },
                                                ]}
                                            ></Text>
                                        )}

                                    </View>
                                    <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                        {noti.content}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <View>
                            {waiting.map((val) => (
                                <View key={val?.id} style={[styles.card, { width: cardWidth + 80, marginBottom: 10 }]}>
                                    <View>
                                        <Skenleton height={16} width={cardWidth - 216} style={{ marginTop: 10, alignItems: 'flex-end' }} />
                                        <Skenleton height={16} width={cardWidth - 80} style={{ marginTop: 10, marginBottom: 10, alignItems: 'flex-end' }} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Notification;
