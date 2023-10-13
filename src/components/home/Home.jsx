import { View, Text, TextInput, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
// import * as Location from 'expo-location';
import styles from '../../styles';
import Header from './Header';
import Result from './Result';
import ResultDefault from './ResultDefault';
import HomeBackPrimary from './HomeBackPrimary';
import HomeBackSecondary from './HomeBackSecondary';
import HomebackTertiary from './HomebackTertiary';
import { debounce } from 'lodash';
import { fetchHistorySearch, fetchListNoti, fetchProfileUser, fetchSearchEndpoint, fetchDetailCustomer, fetchDetailDriver, fetchDetailTrip, fetchListMyCar } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { useNotification } from '../../redux/notificationContext';
import { statusDriver, statusUser } from '../../constants';

import messaging from '@react-native-firebase/messaging';


const Home = () => {
  const { handleHiddenNoti } = useNotification();
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [profile, setProfile] = useState({});
  const [vehicle, setVehicle] = useState({})
  const [history, setHistory] = useState({});
  const isFocused = useIsFocused();
  const context = useContext(TokenContext);

  useEffect(() => {
    showProfile();
    historySearch();
    listNotification();
  }, [context.token]) // dependences: 1 trong cac biến trong mang thay doi thi se thực thi lại useEffect

  useEffect(() => {
    if (isFocused) {
      // Màn hình bị blur, thực hiện unmount
      showProfile();
      historySearch();
      listNotification();
    }
  }, [isFocused]);



  useEffect(() => {
    messaging()
      .subscribeToTopic('1')
      .then(() => console.log('Subscribed to topic!'));

    // Notification caused app to open from quit state
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          handleNavigation(remoteMessage)
        }
      });


    // Notification caused app to open from background state 
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      handleNavigation(remoteMessage)
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background! ', remoteMessage);
    });

    // Show notification
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A2B ', JSON.stringify(remoteMessage.notification.body), [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => (handleNavigation(remoteMessage)) },
      ]);
    });

  }, [])

  const handleNavigation = (remoteMessage) => {
    console.log(remoteMessage.data);
    const data = remoteMessage.data;
    // if (JSON.parse(data.data).trip_id) {
    //   // console.log(JSON.parse(data.data).trip_id);
    //   // navigation.navigate(data.screen);
    //   getDetailTrip(JSON.parse(data.data));
    // } else {
    //   navigation.navigate(data.screen, data.data && JSON.parse(data.data));
    // }
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
          let obj = { ...dataTrip, ...data.result };
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
          let obj = { ...data.result, ...dataTrip };
          let a = statusUser.filter((status) => status.id == dataTrip.status);
          obj.is_notify = 1;
          // console.log(dataTrip);
          navigation.navigate(a[0].screen, obj);
        }
      })
  }

  const listNotification = () => {
    let params = {}
    fetchListNoti(params, context.token)
      .then((data) => {
        if (data.res === 'success') {
          handleHiddenNoti(data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const historySearch = async () => {
    fetchHistorySearch(context.token)
      .then((data) => {
        if (data.res === 'success') {
          // console.log(data);
          setHistory(data.result);
        }
      })
  }

  const requestLocationService = async () => {
    try {
      if (Platform.OS === 'android' && !PermissionsAndroid.RESULTS.GRANTED) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Bật định vị',
            message: 'Chúng tôi có thể bật định vị không?',
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'Đồng ý',
          }
        );
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Đã bật GPS');
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } else if (Platform.OS === 'ios') {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Thông báo',
            'Điện thoại này không hỗ trợ định vị!',
            [
              { text: 'Đồng ý' }
            ],
            { cancelable: false }
          );
          return false;
        }
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      if (coords) {
        await AsyncStorage.setItem('lat', coords.latitude.toString());
        await AsyncStorage.setItem('lng', coords.longitude.toString());
      }

    } catch (error) {
      Alert.alert(
        'Thông báo',
        'Lỗi lấy vị trí!',
        [
          { text: 'Đồng ý' }
        ],
        { cancelable: false }
      );
      return false;
    }
  };

  useEffect(() => {
    // const interval = setInterval(requestLocationService, 120000);
    // requestLocationService()
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  const showProfile = async () => {
    await fetchProfileUser(context.token)
      .then((data) => {
        if (data.res == 'success') {
          setProfile(data.result);
        }
      })
  }

  const handleSearch = async (payload) => {

    if (payload && payload.length > 0) {
      let lat = 0;
      let lng = 0;
      const latString = await AsyncStorage.getItem('lat');
      const lngString = await AsyncStorage.getItem('lng');
      if (latString === null && lngString === null) {
        lat = 20.975120399813672;
        lng = 105.78747338684025;
      } else {
        lat = parseFloat(latString);
        lng = parseFloat(lngString);
      }
      fetchSearchEndpoint({
        keyword: payload,
        lat: lat,
        lng: lng,
      }, 1).then((data) => {
        // console.log(data);
        if (data && data.result) setResults(data.result);
      });
    } else {
      setResults([]);
    }
  };

  const handleClearInput = () => {
    setInputValue('');
  }

  const handleSearchDebounce = useCallback(debounce(handleSearch, 300), []);
  //debounce la sẽ tạo ra 1 phiên bản mới của hàm và ham co kha nang tri hoan việc thực thi và sẽ thực thi sau độ trễ đã xác định.
  //Trong TH nếu có thêm 1 hàm được gọi thì cái trước sẽ bị hủy và hàm mới sẽ chạy 
  return (
    <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
      <StatusBar barStyle="light-content" animated={true} />
      <View style={[styles.flexFull, styles.bgBlack]}>
        {/* header */}
        <Header navigation={navigation} />
        {/* body */}
        {/* <HomeBackPrimary profile = {profile}/> */}

        {(profile?.status == 0 && profile?.trip_id.toString() == 0) && (
          <View style={[styles.px15, styles.flexFull]}>
            <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.mb12]}>
              Xin chào, {profile?.fullname}
            </Text>
            <Text
              style={[
                styles.textWhite,
                styles.fs27,
                styles.lh40,
                styles.fw300,
                styles.mb10,
              ]}
            >
              Bạn cần đi đâu?
            </Text>

            {/* search */}
            <View
              style={[
                styles.relative,
                styles.bg161e,
                styles.h48,
                styles.flexRow,
                styles.itemsCenter,
                styles.mb24,
              ]}
            >
              <TextInput
                onChangeText={(text) => {
                  setInputValue(text);
                  handleSearchDebounce(text);
                }}
                value={inputValue}
                style={[styles.fs16, styles.textWhite, styles.flexFull, styles.pl24, styles.pr50]}
                placeholder="Tìm kiếm"
                placeholderTextColor={'white'}
              />
              <View style={[styles.absolute, styles.r0, styles.p12, styles.bg161e]}>
                {inputValue.length > 0 ? (
                  <TouchableOpacity onPress={handleClearInput}>
                    <XMarkIcon size={24} color={'white'} />
                  </TouchableOpacity>
                ) : (
                  <MagnifyingGlassIcon size={24} color={'white'} />
                )}
              </View>
            </View>

            {/* result */}
            {inputValue.length > 0 ? (
              <Result results={results} navigation={navigation} />
            ) : (
              <ResultDefault data={history} navigation={navigation} />
            )}
          </View>
        )}

        {/* HomeBackPrimary */}
        {(profile?.status == 0 && profile?.trip_id.toString() != 0) && (
          <HomeBackPrimary profile={profile} token={context.token} />
        )}

        {/* HomeBackSecondary */}
        {profile?.status == 1 && (
          <HomeBackSecondary profile={profile} token={context.token} />
        )}

        {/* HomebackTertiary */}
        {profile?.status == 2 && (
          <HomebackTertiary profile={profile} token={context.token} />
        )}

      </View>
    </SafeAreaView >
  );


};

export default Home;