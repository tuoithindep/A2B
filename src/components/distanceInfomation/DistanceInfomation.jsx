import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles";
import { ArrowUturnRightIcon } from "react-native-heroicons/solid";
import getDirections from 'react-native-google-maps-directions';

const DistanceInfomation = ({context}) => {
    const openGoogleMap = () => {
        const data = {
            source: {
                latitude: context.customerForm.coordinates.start.split(',')[0],
                longitude: context.customerForm.coordinates.start.split(',')[1]
            },
            destination: {
                latitude: parseFloat(context.customerForm.coordinates.end.split(',')[0]),
                longitude: parseFloat(context.customerForm.coordinates.end.split(',')[1])
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ]
        }
      
        getDirections(data)
    }

    return (
        <View
            style={[
                styles.mb24,
                styles.py15,
                styles.border1,
                styles.borderTop,
                styles.borderBot,
                styles.flexRow,
            ]}
        >
            <View
                style={[
                    styles.flexFull,
                    styles.justifyBetween,
                    styles.itemsCenter,
                    styles.borderRight,
                    styles.borderSolid,
                ]}
            >
                <Text
                    style={[
                        styles.fs16,
                        styles.textGray77,
                        styles.lh24,
                        styles.textCenter,
                    ]}
                >
                    Quãng đường
                </Text>
                <View
                    style={[
                        styles.flexRow,
                        styles.justifyCenter,
                        styles.itemsCenter,
                        styles.pt20,
                    ]}
                >
                    <Text style={[styles.fs42, styles.textWhite, { lineHeight: 42 }]}>
                        {context.customerForm.distance}
                    </Text>
                    <Text style={[styles.fs16, styles.textWhite, styles.pl5]}>km</Text>
                </View>
            </View>
            <View
                style={[
                    styles.flexFull,
                    styles.justifyBetween,
                    styles.itemsCenter,
                    styles.borderRight,
                    styles.borderSolid,
                ]}
            >
                <Text
                    style={[
                        styles.fs16,
                        styles.textGray77,
                        styles.lh24,
                        styles.textCenter,
                    ]}
                >
                    Thời gian
                </Text>
                <View
                    style={[
                        styles.flexRow,
                        styles.justifyCenter,
                        styles.itemsCenter,
                        styles.pt20,
                    ]}
                >
                    <Text
                        style={[
                            styles.fs42,
                            styles.textWhite,
                            { lineHeight: 42, includeFontPadding: false },
                        ]}
                    >
                        {context.customerForm.duration}
                    </Text>
                    <Text style={[styles.fs16, styles.textWhite, styles.pl5]}>ph</Text>
                </View>
            </View>
            <TouchableOpacity onPress={openGoogleMap} style={[styles.flexFull, styles.justifyBetween, styles.itemsCenter]}>
                <View >
                    <Text
                        style={[
                            styles.fs16,
                            styles.textGray77,
                            styles.lh24,
                            styles.textCenter,
                        ]}
                    >
                        Google map
                    </Text>
                    <View
                        style={[
                            styles.flexCenter,
                            styles.bgGray161,
                            styles.mt20,
                            { width: 73, height: 42 },
                        ]}
                    >
                        <ArrowUturnRightIcon size={25} color={'white'} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default DistanceInfomation;