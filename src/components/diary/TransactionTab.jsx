import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import styles from '../../styles';
import { fetchListHistoryTransfer } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';
import MomentComponent from '../moment';
import { useIsFocused } from '@react-navigation/native';

const TransactionTab = () => {
    const contextToken = useContext(TokenContext);
    const [transfers, setTransfers] = useState({});
    const [loading, setLoading] = useState(false);
    const [isUnmounted, setIsUnmounted] = useState(false);
    const isFocused = useIsFocused();

    const listTransfers = () => {
        fetchListHistoryTransfer(contextToken.token)
        .then((data) => {
            if (data.res === 'success') {
                // console.log(data.result);
                setTransfers(data.result);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(true);
        })
    }

    useEffect(() => {
        listTransfers();
        // console.log(isFocused);
        if (!isUnmounted) {
            // Gọi API hoặc tác vụ khác...
            listTransfers();

        }
        if (!isFocused) {
            // Màn hình bị blur, thực hiện unmount
            setIsUnmounted(true);
        } else {
        // Màn hình được focus lại, không cần unmount
            setIsUnmounted(false);
        }
    }, [loading, isFocused, isUnmounted])

    return (
        <View>
            {loading && transfers.length !== undefined ? (
                transfers.map((transfer, index) => (
                    <TouchableOpacity key={index} style={[styles.bg161e, styles.px15, styles.py10, styles.mb12]}>
                        <View style={[styles.flexBetween, styles.mb12]}>
                            <MomentComponent
                                style={[styles.textGray77, styles.fs16, styles.lh24, styles.fw300]}
                                timeString={transfer.created_at}
                            />
                            {transfer.coin_add > 0 ?
                                <View style={[styles.flexEnd]}>
                                    <Text style={[styles.textCyan2F, styles.fs16, styles.fw700, styles.lh24]}>
                                        {transfer.coin_add}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textCyan2F,
                                            styles.fs12,
                                            styles.fw700,
                                            styles.lh22,
                                            { marginLeft: 1 },
                                        ]}
                                    >
                                        k
                                    </Text>
                                </View>
                                :
                                <View style={[styles.flexEnd]}>
                                    <Text style={[styles.textRedE8, styles.fs16, styles.fw700, styles.lh24]}>
                                        {transfer.coin_add}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textRedE8,
                                            styles.fs12,
                                            styles.fw700,
                                            styles.lh22,
                                            { marginLeft: 1 },
                                        ]}
                                    >
                                        k
                                    </Text>
                                </View>
                            }
                        </View>
                        <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                            {transfer.content}
                        </Text>
                    </TouchableOpacity>
                ))
            ) : (
                <View style={[styles.px10, styles.py10, styles.mb12]}>
                    <Text
                        style={[
                            styles.textWhite,
                            styles.fs16,
                            styles.fw400,
                            styles.lh24,
                            styles.px15,
                            styles.mb15,
                        ]}
                    >
                        Không có giao dịch nào
                    </Text>
                </View>
            )}
        </View>
    );
};

export default TransactionTab;
