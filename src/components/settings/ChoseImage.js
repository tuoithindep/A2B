import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Button } from 'react-native';

import styles from '../../styles';

const ChoseImage = ({ aspect, avatar, width, height, borderFull, onChangeImage }) => {
    // const [selectedImage, setSelectedImage] = useState(null);
    // // const [isImageChanged, setIsImageChanged] = useState(false);
    
    // // useEffect(() => {
    // //     if (isImageChanged) {
    // //         onChangeImage(selectedImage);
    // //         setIsImageChanged(false);
    // //     }
    // // }, [selectedImage, isImageChanged])

    // const handleImagePicker = async () => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //         alert('Bạn cần cấp quyền truy cập thư viện ảnh');
    //         return;
    //     }

    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: aspect,
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         // const response = await fetch(result.assets[0].uri);
    //         // const blob = await response.blob();
    //         const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64'});
    //         // setSelectedImage(result.assets[0].uri);
    //         setSelectedImage(`data:image/jpeg;base64,${base64}`);
    //         onChangeImage(`data:image/jpeg;base64,${base64}`);
    //         // console.log(result);
    //     }
    // };

    // return (
    //     <View style={[styles.relative]}>
    //         {selectedImage ? (
    //             <Image
    //                 source={{ uri: selectedImage }}
    //                 style={[{ width: width, height: height }, borderFull]}
    //             />
    //         ) : (
    //             <Image
    //                 source={{
    //                     uri: avatar,
    //                 }}
    //                 style={[{ width: width, height: height }, borderFull]}
    //             />
    //         )}
    //         <TouchableOpacity
    //             onPress={handleImagePicker}
    //             style={[styles.absolute, styles.inset0]}
    //         ></TouchableOpacity>
    //     </View>
    // );
};

export default ChoseImage;
