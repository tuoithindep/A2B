import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const PayNumber = ({ maxLength, value, label, onChange, style, editable }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [number, setNumber] = useState(value.toString());
    const textInputRef = useRef(null);

    useEffect(() => {
        setNumber(value.toString());
    }, [value]);

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        if (number.trim() === '') {
            Alert.alert(`${label} không được để trống`);
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        } else {
            setIsEditing(false);
            onChange(Number(number));
        }
    };

    // Hàm để định dạng số thành chuỗi với hai chữ số thập phân cố định
    const formatNumber = (num) => {
        return Number(num).toLocaleString('vi-VN');
    };

    return (
        <View>
            {isEditing ? (
                <TextInput
                    ref={textInputRef}
                    value={number}
                    maxLength={maxLength}
                    onChangeText={(newText) => setNumber(newText)}
                    onBlur={handleSave}
                    autoFocus
                    style={style}
                    keyboardType="numeric"
                    editable={editable}
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    <Text style={style}>{formatNumber(number)}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default PayNumber;
