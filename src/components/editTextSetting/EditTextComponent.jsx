import React, { memo, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from '../../styles';

const EditTextComponent = ({ label, maxLength, value, onChangeText }) => {
    const [isEditing, setIsEditing] = useState(false);
    const textInputRef = useRef(null);

    // console.log('changed text',onChangeText);
    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        if (value.trim() === '') {
            Alert.alert(`${label} không được để trống`);
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        } else {
            setIsEditing(false);
        }
    };
    return (
        <View style={[styles.flexFull]}>
            {isEditing ? (
                <TextInput
                    ref={textInputRef}
                    value={value}
                    maxLength={maxLength}
                    onChangeText={onChangeText}
                    onBlur={handleSave}
                    autoFocus
                    style={[styles.flexFull,styles.textWhite, styles.fs16, styles.lh24,styles.textRight]}
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    <Text style={[styles.flexFull,styles.textWhite, styles.fs16, styles.lh24, styles.fw400,styles.textRight]}>
                        {value ? value : '...'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default memo(EditTextComponent);
