// components/PersonalInfoItem.js
import React from 'react';
import { View, Text } from 'react-native';

import styles from '../../styles';
import EditTextComponent from '../editTextSetting';
import EditDateOfBirth from '../editDateOfBirthSetting';
import DropdownModal from '../pickerSelect/DropdownModal';
import DropdownModal1 from '../pickerSelectCateVehicle/DropdownModal1';
import DropdownModalBankData from '../bankData/DropdownModalBankData';
import PhoneNumberInput from '../editPhoneNumberSetting';
import BankNumberSetting from '../editBankNumberSetting';
import NumberSetting from '../editNumberSetting';
import LicensePlate from '../editLicensePlate';

const PersonalInfoItem = ({
    label,
    type,
    value,
    onChangeText,
    onDateChange,
    onChangeDropdown,
    data,
    onValueChange,
    linkFb,
    maxLength,
    selectedName,
    pay,
    suffixes,
}) => {
    const renderContent = () => {
        switch (type) {
            case 'text':
                return (
                    <EditTextComponent
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={20}
                    />
                );
            case 'number':
                return (
                    <NumberSetting
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={maxLength}
                        pay={pay}
                        suffixes={suffixes}
                    />
                );
            case 'license':
                return (
                    <LicensePlate
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={maxLength}
                    />
                );
            case 'date':
                return (
                    <EditDateOfBirth
                        label={label}
                        initialValue={value}
                        onDateChange={onDateChange}
                    />
                );
            case 'dropdown':
                return (
                    <DropdownModal
                        style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}
                        data={data}
                        selectedName={selectedName}
                        onChangeDropdown={onChangeDropdown}
                    />
                );
            case 'dropdown1':
                return (
                    <DropdownModal1
                        style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}
                        data={data}
                        selectedName={selectedName}
                        onChangeDropdown={onChangeDropdown}
                    />
                );
            case 'dropdownBankData':
                return (
                    <DropdownModalBankData
                        style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}
                        data={data}
                        selectedName={selectedName}
                        onChangeDropdown={onChangeDropdown}
                    />
                );
            case 'phoneNumber':
                return (
                    <PhoneNumberInput label={label} value={value} onValueChange={onValueChange} />
                );
            case 'Url_Fb':
                return (
                    <EditTextComponent
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={20}
                    />
                );
            case 'myCar':
                return (
                    <EditTextComponent
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={20}
                    />
                );
            case 'bankAccount':
                return (
                    <BankNumberSetting
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={maxLength}
                    />
                );
            default:
                return (
                    <Text style={[styles.flexFull,styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}>
                        {value}
                    </Text>
                );
        }
    };
    return (
        <View
            style={[styles.bg161e, styles.px15, styles.py12, styles.flexBetween, styles.borderBot]}
        >
            <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw300]}>{label}</Text>
            {renderContent()}
        </View>
    );
};

export default PersonalInfoItem;