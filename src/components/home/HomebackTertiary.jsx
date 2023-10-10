import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ClockIcon, PencilIcon, TruckIcon } from 'react-native-heroicons/outline';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import { ScrollView } from 'react-native';
import { fetchDetailCustomer, fetchDetailDriver, fetchDetailTrip, fetchListMyCar } from '../../api/DataFetching';
import { statusDriver, statusUser } from '../../constants';

const HomebackTertiary = ({profile, token}) => {
  const navigation = useNavigation();
  const [dataTrip, getDataTrip] = useState({});

  useEffect(() => {
    // detailTrip();
    showVehicle();
},[])
const showVehicle = async () => {
  await fetchListMyCar(token)
    .then((data) => {
      if (data.res === 'success') {
        detailTrip(data.result);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

  const detailTrip = async (data) => {
    const paramsTrip = {
        trip_id: profile?.trip_id != 0 ? profile?.trip_id : data?.trip_id
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

const handlePress = async() => {
  if(dataTrip?.user_id == profile?.user_id){
    getDataDriver();
  }else{
    getDataUser();
  }
}

const getDataUser = async () => {
  await fetchDetailCustomer({
      user_id: dataTrip.user_id,
  })
      .then((data) => {
          if (data.res === 'success') {
              let obj = {...dataTrip, ...data.result};
              let a = statusDriver.filter((status) => status.id == dataTrip.status);
              obj.isHome = 1;
              // console.log(a[0].screen);
              navigation.navigate(a[0].screen, obj);
          }
      })
}

const getDataDriver = async () => {
  await fetchDetailDriver({
      driver_id: dataTrip.driver_id,
  })
      .then((data) => {
          if (data.res === 'success') {
              let obj = {...dataTrip, ...data.result};
              let a = statusUser.filter((status) => status.id == dataTrip.status);
              obj.isHome = 1;
              // console.log(dataTrip);
              navigation.navigate(a[0].screen, obj);
          }
      })
}

  return (
      <View style={[styles.px15, styles.flexFull]}>
        <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.mb12]}>
          Xin chào, {profile?.fullname}!
        </Text>
        <View style={[styles.flexBetween, styles.mb24, styles.mt24]}>
          <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
            Bạn đang trong hành trình
          </Text>
          <Text style={[styles.fs14, styles.textGray77]}>#{dataTrip?.trip_id}</Text>
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
              onPress={(handlePress)}
            >
              <Text style={[styles.fs16, styles.textWhite]}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
  );
};

export default HomebackTertiary;