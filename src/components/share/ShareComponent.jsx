import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { qrCode } from '../../assets/images';
import { Dimensions } from 'react-native';
import { Square2StackIcon } from 'react-native-heroicons/outline';
const ShareComponent = () => {
    const context = useContext(BookingFormContext);
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Chia sẻ" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    {/* qr code */}
                    <View
                        style={[
                            styles.bgWhite,
                            styles.flexColumn,
                            styles.itemsCenter,
                            styles.justifyCenter,
                            styles.p15,
                        ]}
                    >
                        <Image
                            source={require('../../assets/images/qr.png')}
                            style={{ width: 174, height: 174 }}
                            resizeMode="cover"
                        />
                        <Text
                            style={[
                                styles.fs18,
                                styles.fw700,
                                styles.lh24,
                                styles.mt15,
                                styles.textItalic,
                                styles.textCenter,
                                { maxWidth: width * 0.95 },
                            ]}
                        >
                            A2B - App đặt chuyến mọi lúc, mọi nơi
                        </Text>
                    </View>

                    {/* content */}
                    <View style={[styles.mt24, styles.px15, styles.pb50]}>
                        {/* item */}
                        <View style={[styles.mb20]}>
                            <Text
                                style={[styles.fs15, styles.textWhite, styles.fw400, styles.mb15]}
                            >
                                Link giới thiệu
                            </Text>
                            <View
                                style={[
                                    styles.flexBetween,
                                    styles.bg161e,
                                    styles.py5,
                                    styles.pl15,
                                    styles.pr10,
                                    styles.mb5,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.fs15,
                                        styles.flexFull,
                                        styles.textWhite,
                                        styles.fw400,
                                    ]}
                                >
                                    https://book.a2b.vn/aff/otthanh
                                </Text>
                                <TouchableOpacity style={[styles.p5]}>
                                    <Square2StackIcon size={20} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

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
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ShareComponent;