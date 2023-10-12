import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Button, Alert, Modal } from 'react-native';

import styles from '../../styles';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const ChoseImage = ({ aspect, avatar, width, height, borderFull, onChangeImage }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageChanged, setIsImageChanged] = useState(false);
    
    useEffect(() => {
        if (isImageChanged) {
            onChangeImage(selectedImage);
            setIsImageChanged(false);
        }
    }, [selectedImage, isImageChanged])

    const handleImagePicker = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            includeBase64: true,
        };

        launchCamera(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('Image picker error: ', res.error);
            } else {
                let imageUri = res.uri || res.assets?.[0]?.uri;
                let imageBase64 = res.assets?.[0]?.base64;
                // onChangeImage(imageBase64)
                setSelectedImage(imageUri);
            }
        })
        
        // launchImageLibrary(options, (res) => {
        //     if (res.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (res.error) {
        //         console.log('Image picker error: ', res.error);
        //     } else {
        //         let imageUri = res.uri || res.assets?.[0]?.uri;
        //         let imageBase64 = res.assets?.[0]?.base64;
        //         onChangeImage(imageBase64)
        //         setSelectedImage(imageUri);
        //     }
        // })
        // if (!result.canceled) {
        //     // const response = await fetch(result.assets[0].uri);
        //     // const blob = await response.blob();
        //     const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64'});
        //     // setSelectedImage(result.assets[0].uri);
        //     setSelectedImage(`data:image/jpeg;base64,${base64}`);
        //     onChangeImage(`data:image/jpeg;base64,${base64}`);
        //     // console.log(result);
        // }
    };

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
                onPress={handleImagePicker}
                style={[styles.absolute, styles.inset0]}
            ></TouchableOpacity>
        </View>
    );
};

export default ChoseImage;
