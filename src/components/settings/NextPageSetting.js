import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

import styles from '../../styles';

const NextPageSetting = ({ onPress, title, value }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.bg161e, styles.px15, styles.py12, styles.flexBetween, styles.borderBot]}
        >
            <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw300]}>{title}</Text>
            <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}>{value}</Text>
        </TouchableOpacity>
    );
};

export default NextPageSetting;
