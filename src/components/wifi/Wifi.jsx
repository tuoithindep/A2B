import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, Alert } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import PersonalInfoItem from '../settings/PersonalInfoItem';
import { fallbackImage, fetchListMyCar, fetchGetOneCategoryVehicle, fetchListCategoryVehicle, fetchUpdateWifi } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';


// const sendNotificationToUser = async (userId, title, body) => {
//   try {
//     // Schedule a notification
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: title,
//         body: body,
//       },
//       trigger: null, // Gửi ngay lập tức, hoặc bạn có thể cấu hình trigger theo mong muốn
//       identifier: "456", // Đặt một thuộc tính tùy chỉnh để xác định người nhận
//     });
//   } catch (error) {
//     console.error('Lỗi khi gửi thông báo:', error);
//   }
// };

// const registerForPushNotificationsAsync = async () => {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }
//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;
//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }
//   if (finalStatus !== 'granted') {
//     alert('Failed to get push token for push notification!');
//     return;
//   }
//   token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log('token: ', token);

//   return token;
// }

const Wifi = () => {

  var { width } = Dimensions.get('window');
  const navigation = useNavigation();

  const [ListMyCar, setListMyCar] = useState([]);
  const [wifiName, setWifiName] = useState(null);
  const [wifiPass, setWifiPass] = useState(null);
  const [loading, setLoading] = useState(true);
  const contextToken = useContext(TokenContext);


  const HandleWifiNameChange = useCallback((newValue) => {
    setWifiName(newValue);
  }, []);
  const handleWifiPassChange = useCallback((newValue) => {
    setWifiPass(newValue);
  }, []);

  useEffect(() => {
    showMyCar();
    // sendNotificationToUser('123', 'Tiêu đề thông báo', 'Nội dung thông báo');
    // registerForPushNotificationsAsync()
  }, []);

  useEffect(() => {
    setWifiName(ListMyCar?.name_wifi)
    setWifiPass(ListMyCar?.pass_wifi);
  }, [ListMyCar])

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: true,
  //     shouldSetBadge: true,
  //   }),
  // });

  // Notifications.setNotificationChannelAsync('123', {
  //   title: '123',
  //   body: '456'
  // })

  // console.log(Notifications.getNotificationChannelAsync('123'));

  const showMyCar = () => {
    // fetchListMyCar('79ee7846612b106c445826c19')
    fetchListMyCar(contextToken.token)
      .then((data) => {
        if (data.res == 'success') {
          setListMyCar(data.result)
        }
      })
      .finally(() => setLoading(false))
  }

  const updateWifi = () => {
    fetchUpdateWifi({
      name: wifiName ? wifiName : '',
      pass: wifiPass ? wifiPass : '',
    // }, '79ee7846612b106c445826c19')
  }, contextToken.token)
      .then((data) => {
        if (data.res === 'success') {
          Alert.alert('Thành công', 'Cập nhật Wifi thành công!', [{ text: 'Đồng ý' }])
        }
      })
      .finally(() => setLoading(false))
    // console.log(CarType == 0 ? ListMyCar?.vehicle_category_id : CarType);
  }
  // console.log('1'+ new Date('2023-05-12'));

  return (
    <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
      <View style={[styles.flexFull, styles.bgBlack]}>
        {/* header */}
        <Header navigation={navigation} title="Wifi miễn phí" />
        {loading ? (<Text>Đang lấy dữ liệu...</Text>) : (
          /* body */
          <ScrollView showsVerticalScrollIndicator={false} style={[styles.flexFull]}>
            {/* list */}
            <View>
              {/* thông tin cá nhân */}
              <View keyboardShouldPersistTaps="handled" style={[styles.mb24]}>
                {/* Tên */}
                <PersonalInfoItem
                  label="Tên Wifi"
                  type="text"
                  value={wifiName}
                  onChangeText={HandleWifiNameChange}
                />
                <PersonalInfoItem
                  label="Mật khẩu"
                  type="text"
                  value={wifiPass}
                  onChangeText={handleWifiPassChange}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      {/* buttom  huy chuyen */}
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
          onPress={updateWifi}
        >
          <Text style={[styles.fs16, styles.textWhite]}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Wifi;
