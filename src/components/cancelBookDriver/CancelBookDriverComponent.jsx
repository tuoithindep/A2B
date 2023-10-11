import { View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { RadioButton } from 'react-native-paper';

import styles from '../../styles';
import { cancelBookDriver } from '../../constants';
// import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { fetchCancelTrip } from '../../api/DataFetching';
import { CustomerFormContext } from '../../redux/customerFormContext';
import { TokenContext } from '../../redux/tokenContext';
import { format } from 'date-fns';
const CancelBookDriverComponent = () => {
    const navigation = useNavigation();
    const {params: item} = useRoute();
    const context = useContext(CustomerFormContext);
    const contextToken = useContext(TokenContext);
    const [selectedName, setSelectedName] = useState('Có việc bận đột xuất');
    const handleRadioChange = (val) => {
        setSelectedName(val === selectedName ? '' : val);
    };

    const handleCancelTrip = () => {
        const reason = 'Tài xế hủy vì lý do: '+selectedName+' (Thời gian hủy: '+format(new Date(), 'HH:mm dd/MM/yyyy')+')';
        item.cancel_reason = reason;
        navigation.navigate('CancelDriverConfirmScreen', item);

        // fetchCancelTrip({
        //     trip_id: item?.id,
        //     reason: reason,
        //     is_driver: 1
        // },contextToken.token)
        // .then((data) => {
        //     if(data.res === 'success'){
        //         navigation.navigate('DriverScreen')
        //         context.setCustomerForm({
        //             tripId: '',
        //             startPoint: '',
        //             endPoint: '',
        //             typeCar: '',
        //             nameCar: '',
        //             startTime: '',
        //             comment: '',
        //             duration: '',
        //             distance: '',
        //             coordinates: '',
        //             price: '',
        //         })
        //     }
        // })
    }

    const renderItem = (item) => {
        return (
            <RadioButtonGroup
                containerStyle={{flexDirection: 'row',  marginBottom: 24}}
                selected={selectedName}
                onSelected={(value) => handleRadioChange(value)}
                radioBackground="white"
            >
                <RadioButtonItem value={item.title} label={
                    <View style={{marginLeft: 15}}>
                        <Text
                            style={[
                                styles.textWhite,
                                styles.fs16,
                                styles.fw700,
                                styles.lh24,
                                styles.mb5,
                            ]}
                        >
                            {item.title}
                        </Text>
                        <Text style={[styles.textGray77, styles.fs15, styles.fw400]}>{item.des}</Text>
                    </View>
                } />
            </RadioButtonGroup>
        );
    };

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* body */}
                <View style={[styles.flexFull, styles.p15]}>
                    <Text
                        style={[
                            styles.fs27,
                            styles.textWhite,
                            styles.lh32,
                            styles.mb5,
                            styles.fw300,
                        ]}
                    >
                        Xác nhận hủy chuyến
                    </Text>
                    <Text style={[styles.textWhite80, styles.fs15, styles.lh22, styles.fw400]}>
                        Tôi đồng ý chuyển <Text style={{ fontWeight: 'bold' }}>10%</Text> trị giá
                        chuyến đi dưới hình thức điểm cho khách hàng. Tương đương{' '}
                        <Text style={{ fontWeight: 'bold' }}>20K</Text>
                    </Text>

                    <View style={[styles.mt24]}>
                        <FlatList
                            data={cancelBookDriver}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => renderItem(item)}
                        />
                    </View>
                </View>

                {/* buttom  huy chuyen & tim tai xe*/}
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
                        <Text style={[styles.fs16, styles.textWhite]}>Đóng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.h48,
                            styles.bgRed,
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                        ]}
                        onPress={handleCancelTrip}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Hủy chuyến</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CancelBookDriverComponent;
