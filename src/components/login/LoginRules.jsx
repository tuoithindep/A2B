import { View, Text } from 'react-native';
import React, { useState } from 'react';

import styles from '../../styles';

const LoginRules = () => {
    const data = ['A2B', 'Liên hệ', 'Điều khoản', 'Từ chối trách nhiệm'];

    const [hiddenIndexes, setHiddenIndexes] = useState([0]);
    return (
        <View
            style={[
                styles.flexRow,
                styles.itemsCenter,
                styles.justifyCenter,
                styles.flexRow,
                styles.pt15,
                styles.px20,
                styles.absolute,
                styles.l0,
                styles.r0,
                styles.b0,
            ]}
        >
            {data.map((rule, index) => (
                <View style={[styles.flexRow, styles.itemsCenter]} key={index}>
                    {!hiddenIndexes.includes(index) && <View style={styles.rulesBefore} />}
                    <Text style={[styles.fs11, styles.textGray77]}>{rule}</Text>
                </View>
            ))}
        </View>
    );
};

export default LoginRules;
