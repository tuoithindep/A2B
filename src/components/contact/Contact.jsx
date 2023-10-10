import { Text, View, TouchableOpacity, Alert } from "react-native";
import {
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
} from 'react-native-heroicons/outline';
import styles from '../../styles';
import { Linking } from "react-native";


const Contact = ({item}) => {
    const handleMakeCall = () => {
        if(item?.phone !== '' && item?.phone !== undefined){
            Linking.openURL(`tel:${item?.phone}`);
        }else{
            Alert.alert(
                'Thông báo',
                'Người này chưa cập nhật số điện thoại',[
                    { text: 'Đồng ý' }
                ],
                { cancelable: false }
            )
        }   
    }

    const handleMakeCallZalo = () => {
        if(item?.phone !== '' && item?.phone !== undefined){
            Linking.openURL(`https://zalo.me/${item?.phone}`);
        }else{
            Alert.alert(
                'Thông báo',
                'Người này chưa cập nhật số điện thoại',[
                    { text: 'Đồng ý' }
                ],
                { cancelable: false }
            )
        }
    }
    return (

        <View style={[styles.flexCenter, styles.mb24]}>
            {/* phone */}
            <TouchableOpacity onPress={handleMakeCall}>
                <View
                    style={[
                        styles.flexCenter,
                        styles.px12,
                        styles.py5,
                        styles.bgCyan2F,
                        styles.borderLeftTop4,
                        styles.borderLeftBot4,
                    ]}
                >
                    <PhoneIcon size={16} color={'white'} />
                    <Text
                        style={[
                            styles.textWhite,
                            styles.fs16,
                            styles.lh24,
                            styles.fw400,
                            styles.ml5,
                        ]}
                    >
                        Gọi
                    </Text>
                </View>
            </TouchableOpacity>
            {/* facebook */}
            <View
                style={[
                    styles.flexCenter,
                    styles.px12,
                    styles.py5,
                    styles.bgBlue237,
                ]}
            >
                <ChatBubbleOvalLeftIcon size={16} color={'white'} />
                <Text
                    style={[
                        styles.textWhite,
                        styles.fs16,
                        styles.lh24,
                        styles.fw400,
                        styles.ml5,
                    ]}
                >
                    Facebook
                </Text>
            </View>
            {/* zalo */}
            <TouchableOpacity onPress={handleMakeCallZalo}>
                <View
                    style={[
                        styles.flexCenter,
                        styles.px12,
                        styles.py5,
                        styles.bgBlue009,
                        styles.borderRightTop4,
                        styles.borderRightBot4,
                    ]}
                >
                    <PhoneIcon size={16} color={'white'} />
                    <Text
                        style={[
                            styles.textWhite,
                            styles.fs16,
                            styles.lh24,
                            styles.fw400,
                            styles.ml5,
                        ]}
                    >
                        Zalo
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}   

export default Contact;