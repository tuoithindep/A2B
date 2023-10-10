import { View, Text, TouchableOpacity } from "react-native"
import styles from "../../styles"

const SpreadSheet = ({context}) => {
    return (
        <View style={[styles.bgWhite, styles.p15, styles.mb24]}>
            <Text style={[styles.fs27, styles.lh32, styles.fw400, styles.mb15]}>
                Bảng tính
            </Text>
            {/* thoi gian du tinh */}
            <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                    Thời gian dự tính
                </Text>
                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>{context?.customerForm.duration} phút</Text>
            </View>
            {/* khoang cach */}
            <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                    Khoảng cách
                </Text>
                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>{context?.customerForm.distance} km</Text>
            </View>
            {/* bao gia */}
            <View style={[styles.borderBot5, styles.py10]}>
                <View style={[styles.flexBetween]}>
                    <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                        Báo giá (VNĐ)
                    </Text>
                    <Text style={[styles.fs16, styles.lh24, styles.fw700]}>{context?.customerForm.price.toLocaleString('vi-VN')}</Text>
                </View>
            </View>
            {/* so du diem */}
            <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                <View style={[styles.flexRow, styles.itemsCenter]}>
                    <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                        Số dư điểm
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.bg161e,
                            styles.px10,
                            styles.flexCenter,
                            styles.ml10,
                        ]}
                    >
                        <Text style={[styles.textWhite, styles.fs12, styles.lh20]}>
                            Nạp điểm
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>30K</Text>
            </View>
            {/* phi nen tang */}
            <View style={[styles.py10]}>
                <View style={[styles.flexBetween]}>
                    <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                        Phí nền tảng (3%)
                    </Text>
                    <Text style={[styles.fs16, styles.lh24, styles.fw400]}>- {context?.customerForm.price * 0.03 / 1000}K</Text>
                </View>
                <Text style={[styles.fs12, styles.fw400, styles.textGray77]}>
                    (Trừ sau khi kết thúc chuyến đi)
                </Text>
            </View>
        </View>
    )
}
export default SpreadSheet