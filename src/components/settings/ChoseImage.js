import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Button, Alert, Modal, Text } from 'react-native';

import styles from '../../styles';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const ChoseImage = ({ aspect, avatar, width, height, borderFull, onChangeImage }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        includeBase64: true,
    };

    useEffect(() => {
        if (isImageChanged) {
            onChangeImage(selectedImage);
            setIsImageChanged(false);
        }
    }, [selectedImage, isImageChanged])

    const openModal = async () => {
        setModalVisible(true);
    }

    const handleCamera = async () => {
        launchCamera(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('Image picker error: ', res.error);
            } else {
                let imageUri = res.uri || res.assets?.[0]?.uri;
                let imageBase64 = res.assets?.[0]?.base64;
                onChangeImage(`data:image/jpeg;base64,${imageBase64}`)
                setSelectedImage(imageUri);
            }
        })
    };

    const handleImageLibrary = async () => {
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('Image picker error: ', res.error);
            } else {
                let imageUri = res.uri || res.assets?.[0]?.uri;
                let imageBase64 = res.assets?.[0]?.base64;
                onChangeImage(`data:image/jpeg;base64,${imageBase64}`)
                setSelectedImage(imageUri);
            }
        })
    }

    return (
        <View style={[styles.relative]}>
            {selectedImage ? (
                <Image
                    source={{ uri: selectedImage }}
                    style={[{ width: width, height: height }, borderFull]}
                />
            ) : (
                <Image
                    source={{
                        uri: avatar,
                    }}
                    style={[{ width: width, height: height }, borderFull]}
                />
            )}
            <TouchableOpacity
                onPress={openModal}
                style={[styles.absolute, styles.inset0]}
            ></TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                presentationStyle="overFullScreen" // Chỉnh style
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <TouchableOpacity
                    style={[styles.bgBlack50,styles.centeredView]}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)} // Đóng modal khi chạm vào vùng bên ngoài
                >
                    <View style={styles.modalView}>
                        <Text style={[styles.fs16, styles.textCenter, styles.mb10]}>
                            Chọn chức năng
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleCamera}
                            >
                                <Text style={styles.buttonText}>Chụp ảnh</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleImageLibrary}
                            >
                                <Text style={styles.buttonText}>Chọn ảnh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default ChoseImage;
