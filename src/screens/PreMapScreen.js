import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { preMap } from '../assets/images';
import styles from '../styles';
import { useNavigation } from '@react-navigation/native';

const PreMapScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MapScreen');
    }, 2000);
  }, []);
  return (
    <View style={[styles.flexFull, styles.bgBlack, styles.itemsCenter, styles.justifyCenter]}>
      <Image 
      source={require('../assets/images/gif/map.gif')}
      style={{ width: 320, height: 320 }} resizeMode="cover" />
    </View>
  );
};

export default PreMapScreen;
