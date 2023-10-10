import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from '../../styles';

const LicensePlate = ({ maxLength, value, label, onChangeText }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);
    const textInputRef = useRef(null);

    useEffect(() => {
        setText(value);
    }, [value]);

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        if (text.trim() === '') {
            Alert.alert(`${label} không được để trống`);
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        } else if (!isValidLicensePlate(text)) {
            Alert.alert('Định dạng biển số không hợp lệ,ví dụ: 30H-12345');
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        } else {
            setIsEditing(false);
        }
    };

    const isValidLicensePlate = (text) => {
        const pattern = /^[0-9]{2}[A-Z]{1}-[0-9]{4,5}$/;
        return pattern.test(text);
    };

    return (
        <View style={[styles.flexFull]}>
            {isEditing ? (
                <TextInput
                    ref={textInputRef}
                    value={text}
                    maxLength={maxLength}
                    onChangeText={onChangeText}
                    onBlur={handleSave}
                    autoFocus
                    style={[styles.textWhite, styles.fs16, styles.lh24,styles.textRight]}
                    keyboardType="default"
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400,styles.textRight]}>
                        {text ? text : '...'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default LicensePlate;
