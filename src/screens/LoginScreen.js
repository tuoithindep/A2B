import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Login from '../components/login';
import styles from '../styles';

const LoginScreen = () => {
    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <Login />
        </SafeAreaView>
    );
};

export default LoginScreen;
