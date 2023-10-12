import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from "react-native-svg";

import styles from '../../styles';
import Header from '../header/Header';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { qrCode } from '../../assets/images';
import { Dimensions } from 'react-native';
import { Square2StackIcon } from 'react-native-heroicons/outline';
import { fetchGetUserProfile } from '../../api/DataFetching'
import { TokenContext } from '../../redux/tokenContext';
import Clipboard from '@react-native-community/clipboard';

const AddCoinComponent = () => {
    useEffect(() => {
        getUserProfile();
    }, [])

    const [userProfile, setUserProfile] = useState([]);
    const [loading, setloading] = useState(true)

    const contextToken = useContext(TokenContext);
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const img = 'https://api.beta-a2b.work/bank/970416/194433359.svg?c=A2B-UID';
    const bank = 'Ngân hàng TMCP Á Châu - ACB';
    const bankNumber = '194433359';
    const bankName = 'ONG THE THANH';
    const content = 'A2B-UID';


    const copyBankToClipboard = async () => {
         Clipboard.setString(bank);
        Alert.alert(
            'Thành công',
            'Bạn đã sao chép thành công!',
            [
                { text: 'Đồng ý' }
            ],
        );
    };
    const copyBankNumberToClipboard = async () => {
         Clipboard.setString(bankNumber);
        Alert.alert(
            'Thành công',
            'Bạn đã sao chép thành công!',
            [
                { text: 'Đồng ý' }
            ],
        );
    };
    const copyBankNameToClipboard = async () => {
         Clipboard.setString(bankName);
        Alert.alert(
            'Thành công',
            'Bạn đã sao chép thành công!',
            [
                { text: 'Đồng ý' }
            ],
        );
    };
    const copyContentToClipboard = async () => {
        Clipboard.setString(content+userProfile?.user_id);
        Alert.alert(
            'Thành công',
            'Bạn đã sao chép thành công!',
            [
                { text: 'Đồng ý' }
            ],
        );
    };

    const getUserProfile = () => {
        // fetchGetUserProfile('79ee7846612b106c445826c19')
        fetchGetUserProfile(contextToken.token)
            .then((data) => {
                if (data.res == 'success') {
                    setUserProfile(data.result);
                }
            })
            .finally(() => setloading(false))
    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Nạp điểm" />

                {/* body */}
                {loading ? (<Text>Đang lấy dữ liệu...</Text>) : (
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
                                { maxWidth: width * 0.95 },
                            ]}
                        >
                            <SvgUri
                                // width={116}
                                // height={116}
                                uri={img + userProfile?.user_id}
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
                                            styles.fs15,
                                            styles.flexFull,
                                            styles.textWhite,
                                            styles.fw400,
                                        ]}
                                    >
                                        {bank}
                                    </Text>
                                    <TouchableOpacity style={[styles.p5]} onPress={copyBankToClipboard}>
                                        <Square2StackIcon size={20} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View>

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
                                            styles.fs15,
                                            styles.flexFull,
                                            styles.textWhite,
                                            styles.fw400,
                                        ]}
                                    >
                                        {bankNumber}
                                    </Text>
                                    <TouchableOpacity style={[styles.p5]} onPress={copyBankNumberToClipboard}>
                                        <Square2StackIcon size={20} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View>

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
                                            styles.fs15,
                                            styles.flexFull,
                                            styles.textWhite,
                                            styles.fw400,
                                        ]}
                                    >
                                        {bankName}
                                    </Text>
                                    <TouchableOpacity style={[styles.p5]} onPress={copyBankNameToClipboard}>
                                        <Square2StackIcon size={20} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View>

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
                                            styles.fs15,
                                            styles.flexFull,
                                            styles.textWhite,
                                            styles.fw400,
                                        ]}
                                    >
                                        {content + userProfile?.user_id}
                                    </Text>
                                    <TouchableOpacity style={[styles.p5]} onPress={copyContentToClipboard}>
                                        <Square2StackIcon size={20} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.mb20]}>
                                <Text
                                    style={[styles.fs15, styles.textWhite, styles.fw400, styles.mb15]}
                                >
                                    Chú ý: Cần nhập chính xác nội dung chuyển khoản.
                                </Text>
                                <Text style={[styles.fs15, styles.textWhite, styles.fw400, styles.mb15]}>
                                    Sau khi chuyển khoản, vui lòng chờ khoảng 1 phút để hệ thống ngân hàng xác thực tự động với A2B
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                )}

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

export default AddCoinComponent;