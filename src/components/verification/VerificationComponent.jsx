import { View, Text, TouchableOpacity, ScrollView, Dimensions, StatusBar, Alert } from 'react-native';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { fallbackImage, fetchGetUserProfile, fetchUpdateImageIdentify } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';

const VerificationComponent = () => {
    const img = 'https://media.a2b.vn/user/2023/05/12/khanhhoang-093520.jpg';

    var { width } = Dimensions.get('window');
    const navigation = useNavigation();
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [profileData, setProfileData] = useState([]);
    const [loading, setloading] = useState(true);
    const base64Regex = /^data:image\/jpeg;base64/;
    const contextToken = useContext(TokenContext);

    const handleImageChange1 = useCallback((newValue) => {
        setImage1(newValue);
    }, []);

    const handleImageChange2 = useCallback((newValue) => {
        setImage2(newValue);
    }, []);

    useEffect(() => {
        getProfileData();
    }, [])

    useEffect(() => {
        setImage1(profileData?.cccd_image);
        setImage2(profileData?.cccd_image2);
    }, [profileData])

    const getProfileData = () => {
        // fetchGetUserProfile('79ee7846612b106c445826c19')
        //     .then((data) => {
        //         if (data.res == 'success') {
        //             setProfileData(data.result);
        //         }
        //     })
        //     .finally(() => setloading(false))

        fetchGetUserProfile(contextToken.token)
            .then((data) => {
                if (data.res == 'success') {
                    setProfileData(data.result);
                }
            })
            .finally(() => setloading(false))
    }

    const updateImage = () => {
        fetchUpdateImageIdentify({
            front_image: base64Regex.test(image1) ? image1 : '',
            behind_image: base64Regex.test(image2) ? image2 : ''
            // }, '79ee7846612b106c445826c19')
            //     .then((data) => {
            //         console.log(data);
            //         if (data.res === 'success') {
            //             console.log(data);
            //             Alert.alert('Thành công', 'Cập nhật thành công!', [{ text: 'OK', onPress: navigation.navigate('UserScreen') }])
            //             // navigation.navigate('MyCarScreen');
            //         } else {
            //             Alert.alert('Thất bại', 'Ảnh đã được cập nhật trước đó', [{ text: 'OK' }])
            //         }
            //     })
            //     .finally(() => setloading(false))
        }, contextToken.token)
            .then((data) => {
                console.log(data);
                if (data.res === 'success') {
                    console.log(data);
                    Alert.alert('Thành công', 'Cập nhật thành công!', [{ text: 'OK', onPress: navigation.navigate('UserScreen') }])
                    // navigation.navigate('MyCarScreen');
                } else {
                    Alert.alert('Thất bại', 'Ảnh đã được cập nhật trước đó', [{ text: 'OK' }])
                }
            })
            .finally(() => setloading(false))
    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Xác minh danh tính" />
                {loading ? (<Text>Đang lấy dữ liệu...</Text>) : (
                    /* body */
                    <ScrollView showsVerticalScrollIndicator={false} style={[styles.flexFull]}>
                        {/* image */}
                        <View style={[styles.flexCenter, styles.mb24]}>
                            {/* <ChoseImage
                                avatar={image1 != 0 ? image1 : fallbackImage}
                                width={width}
                                height={width / 2}
                                aspect={[2, 1]}
                                onChangeImage={handleImageChange1}
                            /> */}
                        </View>
                        {/* image */}
                        <View style={[styles.flexCenter, styles.mb24]}>
                            {/* <ChoseImage
                                avatar={image2 != 0 ? image2 : fallbackImage}
                                width={width}
                                height={width / 2}
                                aspect={[2, 1]}
                                onChangeImage={handleImageChange2}
                            /> */}
                        </View>
                    </ScrollView>
                )}

            </View>
            {/* buttom huy & xac minh*/}
            <View style={[styles.flexRow]}>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgGray161,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgRed,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                    onPress={updateImage}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Xác minh</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default VerificationComponent;