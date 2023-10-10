import React from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';

import styles from '../../styles';
import { logo } from '../../assets/images';
import LoginRules from './LoginRules';
import LoginBtn from './LoginBtn';

const Login = () => {
    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View
                style={[styles.flexFull, styles.bgBlack, styles.px20, styles.pt50, styles.relative]}
            >
                {/* logo */}
                <ResponsiveImage source={logo} style={styles.logoPrimary} resizeMode="stretch" />

                {/* text */}
                <Text
                    style={[
                        styles.fs22,
                        styles.lh32,
                        styles.textWhite,
                        styles.textCenter,
                        styles.pt50,
                    ]}
                >
                    Kết nối giữa tài xế và hành khách có cùng cung đường di chuyển, cùng chia sẻ chi
                    phí và phi lợi nhuận
                </Text>

                {/* btn group */}
                <LoginBtn />

                {/* rules */}
                <LoginRules />
            </View>
        </SafeAreaView>
    );
};

export default Login;
