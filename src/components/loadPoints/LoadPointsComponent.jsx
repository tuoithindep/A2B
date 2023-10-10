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

const LoadPointsComponent = () => {
    const context = useContext(BookingFormContext);
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Nạp điểm" />

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
                                styles.fs14,
                                styles.fw400,
                                styles.lh20,
                                styles.mt5,
                                styles.textItalic,
                                styles.textCenter,
                                { maxWidth: width * 0.7 },
                            ]}
                        >
                            (Vui lòng quét QR hoặc chuyển khoản theo thông tin bên dưới)
                        </Text>
                    </View>

                    {/* content */}
                    <View style={[styles.mt24, styles.px15, styles.pb50]}>
                        {/* item */}
                        <View style={[styles.mb20]}>
                            <Text
                                style={[styles.fs15, styles.textWhite, styles.fw400, styles.mb15]}
                            >
                                Ngân hàng
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
                                        styles.flexFull,
                                        styles.fs15,
                                        styles.textWhite,
                                        styles.fw400,
                                    ]}
                                >
                                    Techcombank
                                </Text>
                                <TouchableOpacity style={[styles.p5]}>
                                    <Square2StackIcon size={20} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* item */}
                        <View style={[styles.mb20]}>
                            <Text
                                style={[styles.fs15, styles.textWhite, styles.fw400, styles.mb15]}
                            >
                                Số tài khoản
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
                                        styles.flexFull,
                                        styles.fs15,
                                        styles.textWhite,
                                        styles.fw400,
                                    ]}
                                >
                                    1111 2222 3333 4444
                                </Text>
                                <TouchableOpacity style={[styles.p5]}>
                                    <Square2StackIcon size={20} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* item */}
                        <View style={[styles.mb20]}>
                            <Text
                                style={[styles.fs15, styles.textWhite, styles.fw400, styles.mb15]}
                            >
                                Người thụ hưởng
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
                                        styles.flexFull,
                                        styles.fs15,
                                        styles.textWhite,
                                        styles.fw400,
                                    ]}
                                >
                                    NGUYEN VAN A
                                </Text>
                                <TouchableOpacity style={[styles.p5]}>
                                    <Square2StackIcon size={20} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* item */}
                        <View style={[styles.mb20]}>
                            <Text
                                style={[styles.fs15, styles.textWhite, styles.fw400, styles.mb15]}
                            >
                                Nội dung
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
                                        styles.flexFull,
                                        styles.fs15,
                                        styles.textWhite,
                                        styles.fw400,
                                    ]}
                                >
                                    A2B1234
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

export default LoadPointsComponent;
