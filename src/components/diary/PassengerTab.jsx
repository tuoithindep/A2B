import { View, Text, TouchableOpacity, SectionList } from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { StopCircleIcon, CheckCircleIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import { fetchListHistoryPassenger, fetchDetailDriver } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';
import moment from 'moment';
import { waiting } from '../../constants';
import { Dimensions } from 'react-native';
import Skenleton from '../skeleton/Skenleton';
import { useNavigation } from '@react-navigation/native';
import { debounce, throttle } from 'lodash';

const PassengerTab = () => {
    const navigation = useNavigation();

    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const startOfWeek = moment().startOf('isoWeek');
    const startOfLastWeek = moment().subtract(1, 'weeks').startOf('isoWeek');
    const startOfMonth = moment().startOf('month');
    const startOfLastMonth = moment().subtract(1, 'months').startOf('month');
    const [passengersSectionList, setPassengersSectionList] = useState({});
    const [passengers, setPassengers] = useState({});
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const contextToken = useContext(TokenContext);
    const cardWidth = Dimensions.get("window").width * 0.8;
    

    const listPassenger = (isLoading = 0) => {
        const params = {
            page: page,
        }
        fetchListHistoryPassenger(isLoading ? params : {}, contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                if(page >= 2){
                    setPassengers([...passengers, ...data.result])
                }else{
                    setPassengers(data.result);
                }
                if(isLoading){
                    setHistoryPassengers([...passengers, ...data.result]);
                    setPage(page + 1);
                    setLoading(false);
                }else{
                    setHistoryPassengers(data.result);
                    setPage(page + 1);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(true);
        })
    }

    const setHistoryPassengers = (passengers) => {
        const dateArr = passengers.flatMap((passenger, index) => {
            const dateFormat = moment(passenger.created_at);
            if (dateFormat.isSame(today, 'day')) {
                return [{ data: passenger, title: 'Hôm nay' }];
            }
            if (dateFormat.isSame(yesterday, 'day')) {
                return [{ data: passenger, title: 'Hôm qua' }];
            }
            if (dateFormat.isBetween(startOfWeek, today, 'day', '[]')) {
                return [{ data: passenger, title: 'Tuần này' }];
            }
            if (dateFormat.isBetween(startOfLastWeek, startOfWeek, 'day', '[]')) {
                return [{ data: passenger, title: 'Tuần trước' }];
            }
            if (dateFormat.isBetween(startOfMonth, today, 'day', '[]')) {
                return [{ data: passenger, title: 'Tháng này' }];
            }
            if (dateFormat.isBetween(startOfLastMonth, startOfMonth, 'day', '[]')) {
                return [{ data: passenger, title: 'Tháng trước' }];
            }else{
                return [{ data: passenger, title: 'Cũ hơn' }]
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
        setPassengersSectionList(convertArr);
    }

    const handleNavigation = async (item) => {
        if(item?.status_number == 0){
            navigation.navigate('FindScreen', {id:item?.trip_id, isFlag:1})
        }
        else if(item?.status_number == 1){
            getDetailDriver(item, 'ConfirmScreen');
        }
        else if(item?.status_number == 2){
            getDetailDriver(item, 'PickScreen');
        }
        else if(item?.status_number == 3){
            getDetailDriver(item, 'MovingScreen');
        }else if(item?.status_number == 4){
            getDetailDriver(item, 'CompleteScreen');
        }else{
            if(item?.driver_id != 0){
                getDetailDriver(item, 'CancelClientConfirmScreen');
            }else{
                const data = {
                    id: item?.trip_id,
                    cancel_reason: item?.cancel_reason,
                    isFlag: 1
                }
                // console.log(data);
                navigation.navigate('CancelClientConfirmScreen',data)
            }
        }
    }

    const getDetailDriver = async (item, screen) => {
        const params = {
            driver_id: item?.driver_id,
        }
        await fetchDetailDriver(params)
        .then((data) => {
            if(data.res === 'success'){
                let obj = data.result;
                obj.isFlag = 1;
                obj.id = item?.trip_id;
                obj.cancel_reason = item?.cancel_reason && item?.cancel_reason;
                navigation.navigate(screen,obj);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleScroll = ({distanceFromEnd}) => {
        if (distanceFromEnd > 150) {
            listPassenger(1);
        }
    };


    useEffect(() => {
        listPassenger();
        // return() => {
        //     console.log('clean up');
        // }
    },[])

    return (
        <View>
            {/* section */}
            {loading ? (
                <View>
                    <View style={[styles.pb50]}>
                        {passengersSectionList.length !== undefined && 
                            <SectionList
                                sections={passengersSectionList}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={handleScroll}
                                onEndReachedThreshold={0.5}
                                renderItem={({item}) => (
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
                                                <View style={[styles.flexStart]}>
                                                    <MapPinIcon size={22} color={'white'} style={{marginTop: -2}} />
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
                                renderSectionHeader={({section: {title}}) => (
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
                        }
                    </View>
                </View>
            ) : (
                <View>
                    {waiting.map((val) => (
                        <View key={val.id} style={[styles.card, {width: cardWidth + 80, marginBottom: 10}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <CheckCircleIcon 
                                size={20}
                                color={'#777D92'}
                                style={{marginTop: 5, marginRight: 10}}
                            />
                            <Skenleton height={16} width={cardWidth - 181} style={{marginTop: 10, alignItems: 'flex-end'}} />
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <StopCircleIcon 
                                size={20}
                                color={'#777D92'}
                                style={{marginTop: 10, marginRight: 10}}
                            />
                            <Skenleton height={16} width={cardWidth - 30} style={{marginTop: 10, alignItems: 'flex-end'}} />
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 5}}>
                            <MapPinIcon 
                                size={20}
                                color={'#777D92'}
                                style={{marginTop: 10, marginRight: 10}}
                            />
                            <Skenleton height={16} width={cardWidth - 30} s={{marginTop: 10, alignItems: 'flex-end'}} />
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default PassengerTab;