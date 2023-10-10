import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";

const Skenleton = ({width, height, style}) => {
    // const translateX = useRef(new Animated.Value(-width)).current;
    // useEffect(() => {
    //     Animated.loop(
    //         Animated.timing(translateX,{
    //             toValue: width,
    //             useNativeDriver: true,
    //             duration: 1500,
    //         })
    //     ).start();
    // },[width])
    // return (
    //     <View style={StyleSheet.flatten([
    //         {width: width, height: height, backgroundColor: "#777D92", overflow: "hidden"},
    //         style
    //     ])}>
    //         <Animated.View 
    //             style={{width: "100%", height: "100%", transform: [{translateX: translateX}]}}
    //         >
    //             <LinearGradient
    //                 style={{ width: '100%', height: '100%' }}
    //                 colors={['transparent', '#8493B4', 'transparent']} // Thay đổi mảng colors
    //                 start={{ x: 2, y: 1 }}
    //             />
    //         </Animated.View>
    //     </View>
    // )
}
export default Skenleton;