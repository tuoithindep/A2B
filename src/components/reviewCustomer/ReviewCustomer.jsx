import { View, TouchableOpacity, Text, Alert, ScrollView, Image } from "react-native";
import styles from "../../styles";
import { useEffect, useState } from "react";
import { fetchListReviewCustomer } from "../../api/DataFetching";
import { filterReview } from "../../constants";
import { Modal } from "react-native";
import { Dimensions } from "react-native";
import MomentComponent from "../moment";
import { StarIcon } from "react-native-heroicons/solid";

const ReviewCustomer = () => {
    const [reviewCustomer, setReviewCustomer] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectItem, setSelectItem] = useState('Mới nhất');
    const maxHeight = Dimensions.get('window').height * 0.7;

    const getListReviewCustomer = async (customerId, name='', filter='') => {
        const params = {
            customer_id: 3,
            name: name,
            filter: filter,
        }
        await fetchListReviewCustomer(params)
            .then((data) => {
                if (data.res === 'success') {
                    setReviewCustomer(data.result.list);
                }
            })
    };

    useEffect(() => {
        getListReviewCustomer();
    },[])

    const handleSelectItem = (title, name, filter) => {
        setSelectItem(title);
        setModalVisible(false);
        getListReviewCustomer(title, name, filter);
    }

    const StarsDisplay = ({ value }) => {
        const starCount = 5;

        return (
            <View style={[styles.flexRow, styles.itemsCenter]}>
                {[...Array(starCount)].map((_, index) => (
                    <StarIcon
                        key={index}
                        size={12}
                        color={index < value ? 'white' : 'black'}
                        stroke={index < value ? undefined : 'white'}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={[styles.px15, styles.pb60]}>
            {/* header */}
            <View style={[styles.flexBetween, styles.mb24]}>
                <Text
                    style={[
                        styles.textWhite,
                        styles.fs16,
                        styles.fw700,
                        styles.lh24,
                    ]}
                >
                    Đánh giá ({reviewCustomer.length !== 0 ? reviewCustomer.length : 0})
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                        {selectItem}
                    </Text>
                </TouchableOpacity>
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent
                >
                    <TouchableOpacity
                        style={[
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                            styles.bgBlack50,
                        ]}
                        onPress={() => setModalVisible(false)}
                    >
                        <View
                            style={[
                                styles.bgWhite,
                                styles.border10,
                                styles.hidden,
                                { maxHeight: maxHeight, width: '60%' },
                            ]}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {filterReview.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleSelectItem(item?.title, item?.name, item?.filter)}
                                        style={[
                                            styles.py10,
                                            selectItem === item?.title && styles.bg161e,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.fs18,
                                                styles.px10,

                                                selectItem === item?.title
                                                    ? styles.textWhite
                                                    : styles.textGray77,
                                            ]}
                                        >
                                            {item?.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>

            {/* many reviews */}
            {reviewCustomer.length !== 0 ? reviewCustomer.map((item) => (
                <View key={item.rate_id} style={[styles.flexRow, styles.mb24]}>
                    <Image
                        source={{ uri: item?.image || fallbackImage }}
                        style={{ width: 52, height: 52, borderRadius: 999 }}
                        resizeMode="cover"
                    />
                    <View style={[styles.pl10, styles.flexFull]}>
                        <Text
                            style={[
                                styles.textWhite,
                                styles.fs16,
                                styles.lh24,
                                styles.fw400,
                            ]}
                        >
                            {item?.name}: {item?.comment}
                        </Text>
                        <View
                            style={[styles.flexRow, styles.itemsCenter, styles.mt5]}
                        >
                            <StarsDisplay value={item?.star} />
                            <MomentComponent
                                style={[
                                    styles.textGray77,
                                    styles.fs14,
                                    styles.lh24,
                                    styles.fw400,
                                    styles.ml15,
                                ]}
                                timeString={item?.created_at}
                            />
                        </View>
                    </View>
                </View>
            )) : (
                <View>
                    <Text
                        style={[
                            styles.textWhite,
                            styles.fs16,
                            styles.lh24,
                            styles.fw400,
                        ]}>
                        Chưa có bình luận nào cả
                    </Text>
                </View>
            )}
        </View>
    );
}

export default ReviewCustomer;