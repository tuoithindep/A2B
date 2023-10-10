import React, { useState } from 'react';
import { View, useWindowDimensions, TouchableOpacity, Text, Animated, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles';
import Header from '../header';
import TransactionTab from './TransactionTab';
import PassengerTab from './PassengerTab';
import DriverTab from './DriverTab';

const renderTabBar = (props) => {
    const { navigationState, position } = props;
    const inputRange = navigationState.routes.map((x, i) => i);
    const opacityValues = inputRange.map((inputIndex) => {
        const outputRange = inputRange.map((index) => (index === inputIndex ? 1 : 0.5));
        return position.interpolate({
            inputRange,
            outputRange,
        });
    });

    return (
        <View
            style={[
                styles.flexBetween,
                styles.bg161e,
                styles.mx15,
                styles.h46,
                styles.border10,
                styles.mb24,
                styles.p5,
            ]}
        >
            {navigationState.routes.map((route, i) => (
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.flexFull,
                        styles.border10,
                        i === navigationState.index ? styles.bgBlack : styles.bgTransparent,
                    ]}
                    onPress={() => props.jumpTo(route.key)}
                >
                    <Animated.Text
                        style={[
                            styles.textWhite,
                            styles.textCenter,
                            styles.fs16,
                            styles.lh24,
                            styles.fw400,
                            styles.py5,
                            { opacity: opacityValues[i] },
                        ]}
                    >
                        {route.title}
                    </Animated.Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const DiaryComponent = () => {
    const layout = useWindowDimensions();
    const navigation = useNavigation();
    const { params: item } = useRoute();

    const [index, setIndex] = useState(item !== undefined ? item.data : 1); // đặt tab đươc active mặc định ban đầu là 1
    const [routes] = useState([
        { key: 'first', title: 'Hành khách' },
        { key: 'second', title: 'Tài xế' },
        { key: 'third', title: 'Giao dịch' },
    ]);

    const renderScene = SceneMap({
        first: PassengerTab,
        second: DriverTab,
        third: TransactionTab,
    });

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Nhật ký" />

                {/* title */}
                <View style={[styles.flexBetween, styles.mb24, styles.px15]}>
                    <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                        Hoạt động gần đây
                    </Text>
                </View>

                {/* body */}
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </SafeAreaView>
    );
};

export default DiaryComponent;
