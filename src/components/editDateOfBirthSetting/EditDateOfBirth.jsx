import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import styles from '../../styles';

const EditDateOfBirth = ({ label, initialValue, onDateChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [date, setDate] = useState(initialValue ? new Date(initialValue) : '');
    // console.log('date1'+date);

    useEffect(() => {
        setDate(initialValue ? new Date(initialValue) : '');
    }, [initialValue]);

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        handleToggleEdit(Platform.OS === 'ios');
        setDate(currentDate);

        // Gọi hàm callback để truyền giá trị mới lên component cha
        onDateChange(currentDate);
    };

    return (
        <View style={[styles.flexFull]}>
            {isEditing ? (
                <DateTimePicker
                    value={date !== '' ? date : undefined}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    {date !== '' && (
                        <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400,styles.textRight]}>
                            {format(date, 'dd/MM/yyyy')}
                        </Text>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EditDateOfBirth;
