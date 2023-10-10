import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useContext, useEffect, useId, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles';
import Header from '../header/Header';
import BookSelectes from './BookSelectes';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { fetchCreateOneTrip, fetchStartGPS } from '../../api/DataFetching';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenContext } from '../../redux/tokenContext';
import { format } from 'date-fns';
import { StatusBar } from 'react-native';
import LocationStart from './LocationStart';
import LocationEnd from './LocationEnd';
import { MapContext } from '../../redux/mapContext';

const Book = () => {
  const context = useContext(BookingFormContext);
  const contextToken = useContext(TokenContext);
  const contextMap = useContext(MapContext);
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState({});
  const [coordStart, setCoordStart] = useState('');

  useEffect(() => {
    takeAddressFromGPS();
  }, [item]);

  const takeAddressFromGPS = async () => {
    const coords = parseFloat(await AsyncStorage.getItem('lat')) + ',' + parseFloat(await AsyncStorage.getItem('lng'));
    setCoordStart(coords);
    fetchStartGPS({
      start: coords
    }, 1).then((data) => {
      if (data.res == 'success') {
        setCurrentPosition(data.result);
        context.setBookingForm({
          ...context.bookingForm,
          endPoint: item,
          startPoint: data.result,
        })
      }
    });
  }

  const cancelTrip = () => {
    navigation.goBack()
    contextMap.setMap({
      start: '',
      end: ''
    });
  }

  const createTrip = () => {
    let latEnd = '';
    let lngEnd = '';
    let coordinatesStart = '';
    let coordinatesEnd = '';
    let startName = '';
    let start = '';
    let endName = '';
    let end = '';
    if (Object.keys(contextMap.map.end).length !== 0 && Object.keys(contextMap.map.start).length !== 0) {
      latEnd = contextMap.map.end.coordinates.lat;
      lngEnd = contextMap.map.end.coordinates.lng;
      startName = contextMap.map.start.name;
      start = contextMap.map.start.address;
      endName = contextMap.map.end.name;
      end = contextMap.map.end.address;
      coordinatesStart = contextMap.map.start.coordinates.lat + ',' + contextMap.map.start.coordinates.lng
      coordinatesEnd = latEnd + ',' + lngEnd;
    } else if(Object.keys(contextMap.map.start).length !== 0){
      startName = contextMap.map.start.name;
      start = contextMap.map.start.address;
      coordinatesStart = contextMap.map.start.coordinates.lat + ',' + contextMap.map.start.coordinates.lng
      latEnd = context.bookingForm.endPoint.coordinates.lat;
      lngEnd = context.bookingForm.endPoint.coordinates.lng;
      endName = item.name,
      end = item.address,
      coordinatesEnd = latEnd + ',' + lngEnd;
    }else if(Object.keys(contextMap.map.end).length !== 0){
      latEnd = contextMap.map.end.coordinates.lat;
      lngEnd = contextMap.map.end.coordinates.lng;
      coordinatesEnd = latEnd + ',' + lngEnd;
      startName = currentPosition.start_name;
      start = currentPosition.start
      endName = contextMap.map.end.name;
      end = contextMap.map.end.address;
      coordinatesStart = coordStart;
    }else{
      latEnd = context.bookingForm.endPoint.coordinates.lat;
      lngEnd = context.bookingForm.endPoint.coordinates.lng;
      startName = currentPosition.start_name;
      start = currentPosition.start
      endName = item.name,
      end = item.address,
      coordinatesEnd = latEnd + ',' + lngEnd;
      coordinatesStart = coordStart;
    }
    // navigation.navigate('FindScreen');  
    // context.setBookingForm({
    //   ...context.bookingForm,
    //   eniqueId: 83,
    // })
    fetchCreateOneTrip({
      start_name: startName,
      start: start,
      end_name: endName,
      end: end,
      comment: context.bookingForm.note,
      is_punish: context.bookingForm.isPunish,
      start_time: context.bookingForm.departureTime,
      vehicle_category_id: context.bookingForm.typeCar,
      coordinates_start: coordinatesStart,
      coordinates_end: coordinatesEnd
    },contextToken.token).then((data) => {
      if(data.res === 'success'){
        navigation.navigate('FindScreen', {id: data.result});  
        context.setBookingForm({
          ...context.bookingForm,
          eniqueId: data.result,
        })
      }
    })
  }

  return (
    <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
      <KeyboardAvoidingView style={[styles.flexFull]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" animated={true} />
        <View style={[styles.flexFull, styles.bgBlack]}>
          {/* header */}
          <Header navigation={navigation} title="Đặt chuyến" />

          {/* body */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={true}
            style={[styles.flexFull, styles.pt15, styles.px15]}
          >
            <Text
              style={[
                styles.fs27,
                styles.textWhite,
                styles.lh32,
                styles.mb24,
                styles.fw300,
              ]}
            >
              Bạn đang đặt chuyến
            </Text>

            {/* location */}
            <View style={[styles.borderBot]}>
              {contextMap.map.start.length !== 0 ? (
                <LocationStart
                  navigation={navigation}
                  dataStart={contextMap}
                />
              ) : (
                <LocationStart
                  navigation={navigation}
                  currentPosition={currentPosition}
                />
              )}
              {contextMap.map.end.length !== 0 ? (
                <LocationEnd
                  navigation={navigation}
                  dataEnd={contextMap}
                />
              ) : (
                <LocationEnd
                  navigation={navigation}
                  data={item}
                />
              )}
            </View>

            {/* select */}
            <BookSelectes context={context} />
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
              onPress={cancelTrip}
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
              onPress={() => createTrip()}
            >
              <Text style={[styles.fs16, styles.textWhite]}>Tìm tài xế</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Book;