import { Text, TouchableOpacity, View, Platform } from 'react-native';
import React, {useEffect, useContext } from 'react';
import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import { TokenContext } from '../../redux/tokenContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
const ios = Platform.OS == 'ios';

const LoginBtn = () => {
  const navigation = useNavigation();
  const androidClientId = '187142393375-7bp1qk9479dibdaepdpj3ibeotm4pr3p.apps.googleusercontent.com';
  const webClientId = '187142393375-c2ai5ek3ap50qat3i710ucc9mirv4j2b.apps.googleusercontent.com';
  const iosClientId = '187142393375-7u10eperhdm3fih7dgss8c05gtha5shs.apps.googleusercontent.com'
  const context = useContext(TokenContext);
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId: androidClientId,
  //   webClientId: webClientId,
  //   expoClientId: webClientId,
  //   iosClientId: iosClientId,
  // });

  // Hành động được thực hiện sau khi component được render hoặc state thay đổi
  // Có thể là các hành động bất đồng bộ như gọi API
  // Đảm bảo rằng hành động không gây ra vòng lặp vô hạn
  // Trả về một hàm cleanup (nếu cần) để xử lý khi component unmount hoặc state thay đổi
  useEffect(() => {
    if (response?.type === 'success') {
      // Xử lý thành công
      getUserInfo(response.authentication.accessToken)
    }
    getLocalStorage();
    // removeItem();
  }, [response]) //truyen [] de goi useEffect 1 lan sau khi compoment mounted

  const getLocalStorage = async () => {
    const checkToken = await AsyncStorage.getItem('token');
    if(checkToken !== null){
      navigation.navigate('Home',context.setToken(checkToken));
    }
  }

  const removeItem = async () => {
    await AsyncStorage.removeItem('token');
  }

  const handleGoogleLogin = async () => {
    // Thực hiện các hành động mong muốn ở đây
    // await promptAsync();
  }

  // const handleAppleLogin = async () => {
  //   try {
  //     const credential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //       ],
  //     });
  //     // console.log('Apple login credential:', credential);
  //     const user = jwtDecode(credential.identityToken);
  //     user.name = user.email.split('@')[0];
  //     user.picture = '';
  //     await login(user);
  //   } catch (e) { 
  //     console.log(e);
  //   }
  // }

  const getUserInfo = async (token) => {
    try {
      const request = await fetch("https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        });
      const user = await request.json();
      await login(user);
    } catch (err) {

    }
  }

  const login = async (user) => {
    const url = 'https://api.beta-a2b.work/login?email=' + encodeURIComponent(user.email) + '&fullname=' + encodeURIComponent(user.name) + '&picture=' + encodeURIComponent(user.picture) + '&123';
    const responseUrl = await fetch(url);
    const result = await responseUrl.json();
    // console.log(1);
    if (result.res == 'success') {
      // console.log(result.token);
      setLocalStorage(result.token);
      navigation.navigate('Home', context.setToken(result.token));
    }
  }

  const setLocalStorage = async (token) => {
    await AsyncStorage.setItem('token',token);
  }

  return (
    <View style={styles.mt60}>
      <TouchableOpacity onPress={() => handleGoogleLogin()}>
        <View style={[styles.bgRed, styles.flexCenter, styles.w250, styles.h48, styles.border4]}>
          <FontAwesome name="google" style={[styles.textWhite, styles.fs28, styles.mr10]} />
          <Text style={[styles.fs16, styles.lh24, styles.textWhite]}>Đăng nhập qua Google</Text>
        </View>
      </TouchableOpacity>
      {ios ? (
        <TouchableOpacity onPress={() => handleAppleLogin()}>
          <View
            style={[
              styles.bgGray,
              styles.flexCenter,
              styles.w250,
              styles.h48,
              styles.border4,
              styles.mt20,
            ]}
          >
            <FontAwesome name={'apple'} style={[styles.textWhite, styles.fs28, styles.mr10]} />
            <Text style={[styles.fs16, styles.lh24, styles.textWhite]}>Đăng nhập qua Apple</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default LoginBtn;