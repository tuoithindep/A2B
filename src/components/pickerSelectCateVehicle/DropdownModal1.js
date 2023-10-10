import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

import styles from '../../styles';
const DropdownModal1 = ({ style, data, selectedName, onChangeDropdown }) => {
    if (!Array.isArray(data)) {
        data = [];
    }

    const [selectedItem, setSelectedItem] = useState(
        () => selectedName.length > 0 ? selectedName : (data.length > 0 ? data[0].category_name : '')
    );

    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectItem = (itemLabel, itemId) => {
        setSelectedItem(itemLabel);
        setModalVisible(false);
        onChangeDropdown(itemId);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const maxHeight = Dimensions.get('window').height * 0.7;

    return (
        <View style={[styles.flexFull]}>
            {/* Button to open the modal */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={[styles.flexFull,styles.textWhite, styles.fs16, styles.lh24,styles.textRight]}>{selectedItem}</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <TouchableOpacity
                    style={[
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                        styles.bgBlack50,
                    ]}
                    onPress={handleCloseModal}
                >
                    <View
                        style={[
                            styles.bgWhite,
                            styles.border10,
                            styles.hidden,
                            { maxHeight: maxHeight, width: '80%' },
                        ]}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {data.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleSelectItem(item.category_name, item.vehicle_category_id)}
                                    style={[
                                        styles.py10,
                                        selectedItem === item?.category_name && styles.bg161e,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.fs18,
                                            styles.px10,

                                            selectedItem === item?.category_name
                                                ? styles.textWhite
                                                : styles.textGray77,
                                        ]}
                                    >
                                        {item.category_name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default DropdownModal1;
