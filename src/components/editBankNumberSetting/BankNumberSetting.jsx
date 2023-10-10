import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import styles from '../../styles';

const BankNumberSetting = ({ label, maxLength, value, onChangeText }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bankAccount, setBankAccount] = useState('');
    const textInputRef = useRef(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        setBankAccount(value ? value : '');
    }, [value]);

    const formatStringWithDash = (inputString) => {
        const numbersOnly = inputString.replace(/[^0-9]/g, '');
        const formattedString = numbersOnly.replace(/(.{4})/g, '$1-');
        return formattedString.endsWith('-') ? formattedString.slice(0, -1) : formattedString;
    };

    const handleBankAccountChange = (value) => {
        const formattedValue = formatStringWithDash(value);
        setBankAccount(formattedValue);
        onChangeText(formattedValue)
    };

    const handleToggleEdit = () => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
        setIsEditing(!isEditing);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <View style={[styles.flexFull]}>
            {isEditing || isFirstRender.current ? (
                <TextInput
                    ref={textInputRef}
                    value={formatStringWithDash(bankAccount)}
                    onChangeText={handleBankAccountChange}
                    keyboardType="numeric"
                    maxLength={maxLength}
                    onBlur={handleBlur} // Thêm hàm xử lý khi TextInput mất focus
                    style={[styles.textWhite, styles.fs16, styles.lh24, styles.textRight]}
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400, styles.textRight]}>
                        {bankAccount ? formatStringWithDash(bankAccount) : '...'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default BankNumberSetting;
