import { View, TouchableOpacity, Text, Alert } from "react-native";
import styles from "../../styles";
import { SvgUri } from "react-native-svg";
import { useEffect, useState } from "react";
import { Square2StackIcon } from "react-native-heroicons/outline";
import { fetchQrCode } from "../../api/DataFetching";
import Clipboard from '@react-native-community/clipboard';

const QrCode = ({item, contextDetailTrip, context}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const [imageQrCode, setImageQrCode] = useState('');
    useEffect(() => {
        drawQrCode();
    },[])
    
    const drawQrCode = () => {
        const params = {
            bank_bin: item?.bank_bin,
            bank_number: item?.bank_number,
            price_trip: contextDetailTrip?.detailTrip.price_distance.replace('.',''),
            code_trip: context.bookingForm.eniqueId
        }
        fetchQrCode(params)
        .then((data) => {
            if(data.res === 'success'){
                setImageQrCode(data.link);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(true);
        })
    }

    const copyBankNumber = async (bankNumber) => {
        Clipboard.setString(bankNumber);
        setIsCopy(true);
        Alert.alert(
            'Thành công',
            'Bạn đã sao chép số tài khoản ngân hàng thành công!',
            [
              { text: 'Đồng ý' }
            ],
            { cancelable: false }
          );
    }

    return (
        <View
            style={[
                styles.bgWhite,
                styles.py12,
                styles.px15,
                styles.mb24,
                styles.flexRow,
            ]}
        >
            {/* img */}
            {isLoading && (
                <SvgUri
                    width={116}
                    height={116}
                    uri={imageQrCode}
                />
            )}
            <View style={[styles.flexFull, styles.pl12]}>
                <View style={[styles.flexBetween, styles.mb5]}>
                    {item?.bank_name && (
                    <Text style={[styles.fw700, styles.lh24, styles.fs16]}>
                        {item?.bank_name ? item?.bank_name : ''}
                    </Text>
                    )}
                    {item?.bank_number && (
                        <TouchableOpacity style={[styles.p5]} onPress={() => copyBankNumber(item?.bank_number)}>
                            <Square2StackIcon size={20} color={'#000'} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={[styles.flexRow, styles.mb5]}>
                    {item?.bank_number && (
                    <Text style={[styles.fs16, styles.fw300, styles.mr24]}>
                        {item?.bank_number ? item?.bank_number : ''}
                    </Text>
                    )}
                    {isCopy && (
                        <Text style={[styles.textRedE8, styles.fs16]}>Đã copy</Text>
                    )}
                </View>
                <Text style={[styles.fs16, styles.fw300, styles.mb5, styles.textUpper]}>
                    {item?.bank_account ? item?.bank_account : item?.fullname}
                </Text>
                <Text style={[styles.fs16, styles.fw300, styles.mb5]}>
                    {contextDetailTrip.detailTrip.price_distance} - Chia sẻ xăng xe
                </Text>
            </View>
        </View>
    );
}

export default QrCode;