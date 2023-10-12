import { Text, TouchableOpacity, View, Platform } from 'react-native';
import React, {useEffect, useContext } from 'react';
import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
import { TokenContext } from '../../redux/tokenContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const ios = Platform.OS == 'ios';

const LoginBtn = () => {
  const navigation = useNavigation();
  const webClientId = '163795266938-trqmidf6j91271rnt4p9gr9n8c110rhn.apps.googleusercontent.com';
  const iosClientId = '187142393375-7u10eperhdm3fih7dgss8c05gtha5shs.apps.googleusercontent.com'
  const context = useContext(TokenContext);
  GoogleSignin.configure({
    scopes: ['profile','email'],
    webClientId: webClientId,
    iosClientId: iosClientId,
    offlineAccess: false
  });

  useEffect(() => {
    getLocalStorage();
    // removeItem();
  }, []) //truyen [] de goi useEffect 1 lan sau khi compoment mounted

  const getLocalStorage = async () => {
    const checkToken = await AsyncStorage.getItem('token');
    if(checkToken !== null){
      navigation.navigate('Home',context.setToken(checkToken));
    }
  }

  const handleGoogleLogin = async () => {
    // Thực hiện các hành động mong muốn ở đây
    loginGG();
  }

  const loginGG = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredentials);
      console.log(userInfo.user);
      await login(userInfo.user);
    } catch (error) {
      console.log('Fail');
      return false;
    }
  }

  const login = async (user) => {
    const url = 'https://api.beta-a2b.work/login?email=' + encodeURIComponent(user.email) + '&fullname=' + encodeURIComponent(user.name) + '&picture=' + encodeURIComponent(user.photo);
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
          <Icon name="google" style={[styles.textWhite, styles.fs28, styles.mr10]} />
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
            <Icon name={'apple'} style={[styles.textWhite, styles.fs28, styles.mr10]} />
            <Text style={[styles.fs16, styles.lh24, styles.textWhite]}>Đăng nhập qua Apple</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default LoginBtn;