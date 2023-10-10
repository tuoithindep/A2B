import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from '../../styles';

const PhoneNumberInput = ({ label, value, onValueChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);
    const textInputRef = useRef(null);

    useEffect(() => {
        setText(value);
    }, [value]);

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^[0]\d{9}$/;
        return phoneNumberRegex.test(phoneNumber);
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        if (text.trim() === '') {
            Alert.alert(`${label} không được để trống`);
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        } else if (!isValidPhoneNumber(text)) {
            Alert.alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số và chữ số đầu tiên là 0)');
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        } else {
            setIsEditing(false);
            if (onValueChange) {
                onValueChange(text);
            }
        }
    };

    return (
        <View style={[styles.flexFull]}>
            {isEditing ? (
                <TextInput
                    ref={textInputRef}
                    value={text}
                    maxLength={10}
                    onChangeText={(newText) => setText(newText)}
                    onBlur={handleSave}
                    autoFocus
                    style={[styles.textWhite, styles.fs16, styles.lh24, styles.textRight]}
                    keyboardType="numeric"
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400, styles.textRight]}>
                        {text ? text : '...'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default PhoneNumberInput;
