import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  PencilIcon,
  BoltIcon,
  ClockIcon,
  ViewfinderCircleIcon,
} from 'react-native-heroicons/outline';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import { ScrollView } from 'react-native';
import { fetchListMyCar } from '../../api/DataFetching';


const HomeBackSecondary = ({ profile, token }) => {
  const navigation = useNavigation();
  const [dataDriver, setDataDriver] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const regex = /^(.*?),\s*(.*)$/;

  useEffect(() => {
    getListMyCar();
  })


  const getListMyCar = async () => {
    await fetchListMyCar(token)
      .then((data) => {
        if (data.res === 'success') {
          setDataDriver(data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(true)
      })
  }

  const handlePress = async() => {
    const parts = dataDriver.start_location.split(', ');
    const street = parts.join(', ');;
    const title = street.substring(0, street.indexOf(","));
    const address = street.replace(title + ',', '').trim();

    const parts_end = dataDriver.start_location.split(', ');
    const street_end = parts_end.join(', ');;
    const title_end = street_end.substring(0, street.indexOf(","));
    const address_end = street_end.replace(title + ',', '').trim();
    const currentPosition = {
      title: title,
      address: address
  }
    const item = {
      radius: dataDriver.distane_to_customer,
      price: parseInt(dataDriver.price_per_km),
      isEnabled: dataDriver.price_per_km != 0 ? true : false,
      currentPosition: currentPosition,
      endName: title_end,
      endAddress: address_end,
  }
  navigation.navigate('DriverFindScreen', item)
  }

  return (
  
    <View style={[styles.px15, styles.flexFull]}>
      <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.mb12]}>
        Xin chào, {profile?.fullname}!
      </Text>
      <View style={[styles.flexBetween, styles.mb24, styles.mt24]}>
        <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
          Bạn đang tìm khách
        </Text>
      </View>    
      {/*  */}
      {isLoading && (
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
                Từ: {dataDriver.start_location.match(regex)[1]}
              </Text>
              <Text style={[styles.textGray77, styles.fs15]}>
              {dataDriver.start_location.match(regex)[2]}
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
                Đến: {dataDriver.end_location.match(regex)[1]}
              </Text>
              <Text style={[styles.textGray77, styles.fs15]}>
              {dataDriver.end_location.match(regex)[2]}
              </Text>
            </View>
          </View>

          {/* Báo giá tự động */}
          <View style={[styles.flexRow, styles.mb24]}>
            <BoltIcon size={22} color={'white'} style={{ marginTop: 2 }} />
            <View style={[styles.ml5, styles.flexFull]}>
              <Text
                style={[
                  styles.fs16,
                  styles.fw700,
                  styles.textWhite,
                  styles.mb5,
                ]}
              >
                Báo giá tự động
              </Text>
              <Text style={[styles.textGray77, styles.fs15]}>{dataDriver.price_per_km != 0 ? 'Bật' : 'Tắt'}</Text>
            </View>
          </View>

          {/* Phạm vi đón trả khách */}
          <View style={[styles.flexRow, styles.mb24]}>
            <ViewfinderCircleIcon
              size={22}
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
                Phạm vi đón trả khách
              </Text>
              <Text style={[styles.textGray77, styles.fs15]}>{dataDriver.distane_to_customer} km</Text>
            </View>
          </View>
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
      )}
    </View>
  );
};

export default HomeBackSecondary;