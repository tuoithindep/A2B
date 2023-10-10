import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

import { user } from '../../assets/images';
import styles from '../../styles';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { MapContext } from '../../redux/mapContext';
import { CustomerFormContext } from '../../redux/customerFormContext';
import { format } from 'date-fns';

const Header = ({ navigation, title }) => {
    const context = useContext(BookingFormContext);
    const contextMap = useContext(MapContext);
    const contextCustomer = useContext(CustomerFormContext);
    const backToHome = async () => {
        navigation.navigate('HomeScreen');
        setContext();
    }


    const setContext = async () => {
        if(context.setBookingForm != undefined){
            await context.setBookingForm({
                eniqueId: '',
                startPoint: '',
                endPoint: '',
                typeCar: '' || 1,
                nameCar: '' || 'Xe Sedan',
                departureTime: '' || format(new Date(), 'yyyy-MM-dd HH:mm'),
                note: '',
                isPunish: 0
            })
        }
        if(contextMap.setMap != undefined){
            await contextMap.setMap({
                start: '',
                end:''
            })
        }
        if(contextCustomer.setCustomer != undefined){
            await contextCustomer.setCustomer({
                tripId: '',
                startPoint: '',
                endPoint: '',
                typeCar: '',
                nameCar: '',
                startTime: '',
                comment: '',
                duration: '',
                distance: '',
                coordinates: '',
                price: '',
            })
        }
    }

    return (
        <View style={[styles.px15, styles.pt12, styles.pb20, styles.flexBetween]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size={40} color={'white'} style={{ marginLeft: -10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={backToHome}>
                <View>
                    <Text style={[styles.textWhite, styles.fs16]}>{title}</Text>
                    <View style={[styles.underline, styles.mt10]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
                <Image
                    source={require('../../assets/images/user.png')}
                    style={{ width: 32, height: 32 }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default Header;