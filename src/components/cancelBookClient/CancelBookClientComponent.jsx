import { View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from '../../styles';
import { cancelBookClient } from '../../constants';
import { fetchCancelTrip } from '../../api/DataFetching';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { TokenContext } from '../../redux/tokenContext';
// import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { format } from 'date-fns';


const CancelBookClientComponent = () => {
    const navigation = useNavigation();
    const {params: item} = useRoute();
    const [selectedName, setSelectedName] = useState('Có việc bận đột xuất');
    const context = useContext(BookingFormContext);
    const contextToken = useContext(TokenContext);
    const handleRadioChange = (val) => {
        setSelectedName(val === selectedName ? '' : val);
    };
    const handleCancelTrip = () => {
        const reason = 'Khách hàng hủy vì lý do: '+selectedName+' (Thời gian hủy: '+format(new Date(), 'HH:mm dd/MM/yyyy')+')';
        // if(item !== undefined){
        //     item.reason = reason;
        //     navigation.navigate('CancelClientConfirmScreen', item);
        // }else{
        //     navigation.navigate('CancelClientConfirmScreen', reason);
        // }
        fetchCancelTrip({
            trip_id: context.bookingForm.eniqueId,
            reason: 'Khách hàng hủy vì lý do: '+selectedName,
            is_driver: 0
        }, contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                // console.log(data);
                if(item !== undefined){
                    item.cancel_reason = reason;
                    navigation.navigate('CancelClientConfirmScreen', item);
                }else{
                    navigation.navigate('CancelClientConfirmScreen', reason);
                }
            }
        })
    }

    // const renderItem = (item) => {
    //     return (
    //         <RadioButtonGroup
    //             containerStyle={{flexDirection: 'row',  marginBottom: 24}}
    //             selected={selectedName}
    //             onSelected={(value) => handleRadioChange(value)}
    //             radioBackground="white"
    //         >
    //             <RadioButtonItem value={item.title} label={
    //                 <View style={{marginLeft: 15}}>
    //                     <Text
    //                         style={[
    //                             styles.textWhite,
    //                             styles.fs16,
    //                             styles.fw700,
    //                             styles.lh24,
    //                             styles.mb5,
    //                         ]}
    //                     >
    //                         {item.title}
    //                     </Text>
    //                     <Text style={[styles.textGray77, styles.fs15, styles.fw400]}>{item.des}</Text>
    //                 </View>
    //             } />
    //         </RadioButtonGroup>
    //     );
    // };

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
                    <View style={[styles.mt24]}>
                        <FlatList
                            data={cancelBookClient}
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

export default CancelBookClientComponent;
