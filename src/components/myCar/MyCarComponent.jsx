import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { typeCar, licenseColor, bill, water } from '../../constants';
import PersonalInfoItem from '../settings/PersonalInfoItem';
import { bgCar } from '../../assets/images';
import { fallbackImage, fetchListMyCar, fetchGetOneCategoryVehicle, fetchListCategoryVehicle, fetchUpdateMycar } from '../../api/DataFetching';
import ChoseImage from '../settings/ChoseImage';
import NextPageSetting from '../settings/NextPageSetting';
import { TokenContext } from '../../redux/tokenContext';

const MyCarComponent = () => {

    var { width } = Dimensions.get('window');
    const navigation = useNavigation();

    const [image, setImage] = useState(null);
    const [ListMyCar, setListMyCar] = useState([]);
    const [CarName, setCarName] = useState(null);
    const [CarModel, setCarModel] = useState('');
    const [CarType, setCarType] = useState('');
    const [LicensePlate, setLicensePlate] = useState(null);
    const [LicensePlateColor, setLicensePlateColor] = useState([]);
    const [Bill, setBill] = useState('');
    const [Bottle, setBottle] = useState('');
    const [CateVehicle, setCateVehicle] = useState([]);
    const [loading, setloading] = useState(true);
    const base64Regex = /^data:image\/jpeg;base64/;
    const contextToken = useContext(TokenContext);

    const HandleImageChange = useCallback((newValue) => {
        setImage(newValue);
    }, []);
    const handleCarNameChange = useCallback((newValue) => {
        setCarName(newValue);
    }, []);
    const handleCarModelChange = useCallback((newValue) => {
        setCarModel(newValue);
    }, []);
    const handleCarTypeChange = useCallback((newValue) => {
        setCarType(newValue);
    }, []);
    const handleLicensePlateChange = useCallback((newValue) => {
        setLicensePlate(newValue);
    }, []);
    const handleLicensePlateColorChange = (newValue) => {
        setLicensePlateColor(newValue);
    };
    const handleBillChange = useCallback((newValue) => {
        setBill(newValue);
    }, []);
    const handleBottleChange = useCallback((newValue) => {
        setBottle(newValue);
    }, []);

    useEffect(() => {
        showMyCar();
        ListCategoryVehicle();
    }, []);

    useEffect(() => {
        setImage(ListMyCar?.image)
        setCarName(ListMyCar?.vehicle_name);
        setCarModel(ListMyCar?.vehicle_life);
        setCarType(ListMyCar?.vehicle_category_id);
        setLicensePlate(ListMyCar?.license_plates);
        setLicensePlateColor(ListMyCar?.license_plates_color);
        setBill(ListMyCar?.is_bill);
        setBottle(ListMyCar?.is_bottle);
    }, [ListMyCar])

    const showMyCar = () => {
        fetchListMyCar(contextToken.token)
            .then((data) => {
                if (data.res == 'success') {
                    setListMyCar(data.result)
                }
            })
            .finally(() => setloading(false))
    }

    const ListCategoryVehicle = () => {
        fetchListCategoryVehicle(contextToken.token)
            .then((data) => {
                if (data.res == 'success') {
                    setCateVehicle(data.result)
                }
            })
            .finally(() => setloading(false))
    }

    const updateMyCar = () => {
        fetchUpdateMycar({
            image: base64Regex.test(image) ? image : '',
            vehicleName: CarName == 0 ? ListMyCar?.vehicle_name : CarName,
            vehicleLife: CarModel == 0 ? ListMyCar?.vehicle_life : CarModel,
            vehicleCategory: CarType == 0 ? ListMyCar?.vehicle_category_id : CarType,
            licensePlates: LicensePlate == 0 ? ListMyCar?.license_plates : LicensePlate,
            platesColor: LicensePlateColor,
            isBottle: Bottle,
        }, contextToken.token)
            .then((data) => {
                if (data.res === 'success') {
                    // console.log(data);
                    navigation.navigate('DriverScreen');
                }
            })
            .finally(() => setloading(false))
        // console.log(CarType == 0 ? ListMyCar?.vehicle_category_id : CarType);
    }
    // console.log('1'+ new Date('2023-05-12'));

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Xe của tôi" />
                {loading ? (<Text>Đang lấy dữ liệu...</Text>) : (
                    /* body */
                    <ScrollView showsVerticalScrollIndicator={false} style={[styles.flexFull]}>
                        {/* image */}
                        <View style={[styles.flexCenter]}>
                            {/* <Image
                            source={{ uri: fallbackImage }}
                            style={[{ width: width, height: width / 2 }]}
                            resizeMode="cover"
                        /> */}
                            <ChoseImage
                                avatar={image != 0 ? image : fallbackImage}
                                width={width}
                                height={width / 2}
                                aspect={[2, 1]}
                                onChangeImage={HandleImageChange}
                            />
                        </View>

                        {/* list */}
                        <View>
                            {/* thông tin cá nhân */}
                            <View keyboardShouldPersistTaps="handled" style={[styles.mb24]}>
                                {/* Tên */}
                                <PersonalInfoItem
                                    label="Dòng xe"
                                    type="text"
                                    value={CarName}
                                    onChangeText={handleCarNameChange}
                                />
                                {/* Đời xe */}
                                <PersonalInfoItem
                                    label="Đời xe"
                                    type="number"
                                    value={CarModel}
                                    maxLength={4}
                                    onChangeText={handleCarModelChange}
                                />

                                {/* Loại xe */}
                                <PersonalInfoItem
                                    label="Loại hình xe"
                                    type="dropdown1"
                                    data={CateVehicle}
                                    selectedName={CarType == 1 ? 'Xe Sedan' : 'Xe SUV'}
                                    onChangeDropdown={handleCarTypeChange}
                                />

                                {/* Biển số xe */}
                                <PersonalInfoItem
                                    label="Biển số xe"
                                    type="license"
                                    value={LicensePlate}
                                    onChangeText={handleLicensePlateChange}
                                    maxLength={9}
                                />

                                {/* Màu biển */}
                                <PersonalInfoItem
                                    label="Màu biển"
                                    type="dropdown"
                                    data={licenseColor}
                                    selectedName={LicensePlateColor == 0 ? 'Trắng' : 'Vàng'}
                                    onChangeDropdown={handleLicensePlateColorChange}
                                />

                                <NextPageSetting
                                    onPress={() => navigation.navigate('WifiScreen')}
                                    title={'Wifi miễn phí'}
                                    value={<ChevronRightIcon size={20} color={'white'}/>}
                                />

                                {/* Nước uống */}
                                <PersonalInfoItem
                                    label="Nước uống đóng chai miễn phí"
                                    type="dropdown"
                                    data={water}
                                    selectedName={Bottle == 0 ? 'Không' : 'Có'}
                                    onChangeDropdown={handleBottleChange}
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
                    onPress={updateMyCar}
                // onPress={() => navigation.navigate('DriverScreen')}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Tìm khách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default MyCarComponent;