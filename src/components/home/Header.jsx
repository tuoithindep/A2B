import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import styles from '../../styles';

const Header = ({ navigation }) => {
  return (
    <View style={[styles.px15, styles.pt12, styles.pb20, styles.flexEnd, styles.flexBetween ]}>
      <TouchableOpacity onPress={() => navigation.navigate('DriverScreen')}>
        <Image
        source={require('../../assets/images/logo_tx.png')}
        style={{ width: 28, height: 39 }}
        resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image        
        source={require('../../assets/images/logo2.png')}
        style={{ width: 64, height: 32 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
        <Image 
        source={require('../../assets/images/user.png')}
        style={{ width: 32, height: 32 }} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
