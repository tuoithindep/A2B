import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import {
    ClockIcon,
    CubeTransparentIcon,
    PencilIcon,
    RocketLaunchIcon,
    TruckIcon,
} from 'react-native-heroicons/outline';
import Slider from '@react-native-community/slider';
import Collapsible from 'react-native-collapsible';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import styles from '../../styles';
import { fetchListCategoryVehicle } from '../../api/DataFetching';
import { debounce } from 'lodash';

const BookSelects = ({ context }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isTimeDropdownVisible, setTimeDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Xe Sedan');
    const [vehicleId, setVehicleId] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeElement, setActiveElement] = useState('NOW_ELEMENT');
    const [note, setNote] = useState('');
    const [timeRange, setTimeRange] = useState(30);
    const [timeString, setTimeString] = useState('');
    const [timeUpdate, setTimeUpdate] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showPickerTime, setShowPickerTime] = useState(false);
    const [categoryVehicleList, setCategoryVehicleList] = useState([]);


    const getActiveText = useCallback(() => {
        // let obj = {};
        switch (activeElement) {
            case 'NOW_ELEMENT':
                // return 'Tôi cần đi luôn';
                return {
                    title: 'Tôi cần đi luôn',
                    time: format(date, 'yyyy-MM-dd HH:mm'),
                    isPunish: 0
                }
            case 'RANGE_ELEMENT':
                // return timeString;
                return {
                    title: timeString,
                    isPunish: 0,
                    time: timeUpdate,
                }
            case 'TIME_ELEMENT':
                // return `${format(date, 'dd-MM-yyyy')} ${format(time, 'HH:mm:ss')}`;
                return {
                    title: `${format(date, 'dd-MM-yyyy')} ${format(time, 'HH:mm')}`,
                    time: `${format(date, 'yyyy-MM-dd')} ${format(time, 'HH:mm')}`,
                    isPunish: 1,
                };
            default:
                // return 'Vui lòng lựa chọn';
                return {
                    title: 'Vui lòng lựa chọn',
                    isPunish: 0,
                    time: format(date, 'yyyy-MM-dd HH:mm')
                }
        }
    }, [activeElement, date, time, timeString]);

    const toggleDropdown = () => {
        setDropdownVisible((prevVisible) => !prevVisible);
    };

    const toggleTimeModal = () => {
        setTimeDropdownVisible((prevVisible) => !prevVisible);
    };

    const handleOptionPress = useCallback(
        (item, index) => () => {
            setSelectedOption(item.category_name);
            setVehicleId(item.vehicle_category_id);
            setActiveIndex(index);
            setDropdownVisible(false);
        },
        []
    );

    const handleElementPress = (element) => {
        setActiveElement(element);
        setTimeDropdownVisible(false);
    };

    const listCateVehicle = async () => {
        try {
          const data = await fetchListCategoryVehicle(1);
          if (data.res === 'success') {
            return data.result;
          }
        } catch (error) {
          console.error('Lỗi khi lấy danh sách danh mục:', error);
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await listCateVehicle();
            setCategoryVehicleList(result);
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        const hours = Math.floor(timeRange / 60);
        const minutes = timeRange % 60;

        const hoursString = hours > 0 ? ` ${hours} giờ` : '';
        const minutesString = minutes > 0 ? ` ${minutes} phút` : '';
        const newTimeString = `Sau${hoursString}${minutesString} nữa`;
        setTimeString(newTimeString);
        //set thoi gian
        const currentHour = date.getHours();
        const currentMinute = date.getMinutes();
    
        // Tính tổng số phút tính từ 00:00 AM
        const totalMinutes = currentHour * 60 + currentMinute;
        // Kiểm tra nếu thời gian đầu vào là ban đêm và thời gian sau đó vượt quá ngày hôm sau
        if (totalMinutes >= (24 * 60 - timeRange)) {
            const futureMinutes = (totalMinutes + timeRange) % (24 * 60);
        
            // Chuyển đổi thành giờ và phút
            const futureHour = Math.floor(futureMinutes / 60);
            const futureMinute = futureMinutes % 60;
        
            // Tạo đối tượng Date cho thời gian sau thời lượng định trước
            const futureDate = new Date();
            futureDate.setDate(date.getDate() + 1); // Tăng ngày lên 1
            futureDate.setHours(futureHour);
            futureDate.setMinutes(futureMinute);
    
            const formattedDateTime = format(futureDate,'yyyy-MM-dd HH:mm');
            setTimeUpdate(formattedDateTime)
        }else{
            const futureDate = new Date(date.getTime() + (timeRange * 60 * 1000));
            const formattedDateTime = format(futureDate,'yyyy-MM-dd HH:mm');
            setTimeUpdate(formattedDateTime)
            // console.log(format(futureDate,'yyyy-MM-dd HH:mm'));
        }
        
    }, [timeRange]);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        if (selectedTime !== undefined) {
            setShowPickerTime(Platform.OS === 'ios');
            setTime(selectedTime);
        } else {
            setShowPickerTime(false);
        }
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    const showTimePicker = () => {
        setShowPickerTime(true);
    };

    const handleChangeValue = useCallback(debounce((newVal) => {
        setTimeRange(newVal);
    },100), [])

    useEffect(() => {
        context.setBookingForm({
            ...context.bookingForm,
            typeCar: vehicleId,
            nameCar: selectedOption,
            departureTime: getActiveText().time,
            note: note,
            isPunish: getActiveText().isPunish
        });
    }, [selectedOption, getActiveText, note]);
    return (
        <View style={[styles.pt24]}>
            {/* type car */}
            <View style={[styles.mb24]}>
                <TouchableOpacity onPress={toggleDropdown}>
                    <View style={[styles.flexRow]}>
                        <TruckIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                                Loại hình xe
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>{selectedOption}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={!isDropdownVisible} duration={500}>
                    <View style={[{ backgroundColor: '#1B1B1B' }, styles.mt24]}>
                        {categoryVehicleList.map((item, index) => (
                            // console.log(item)
                            <TouchableOpacity
                                key={item.vehicle_category_id}
                                onPress={handleOptionPress(item, index)}
                                style={[
                                    styles.p15,
                                    index === activeIndex && { backgroundColor: '#343434' },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.textWhite,
                                        styles.fs15,
                                        styles.fw700,
                                        styles.mb15,
                                    ]}
                                >
                                    {item.category_name}
                                </Text>
                                <Text style={[styles.textWhite, styles.fs15, styles.fw400]}>
                                    {item.content}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Collapsible>
            </View>

            {/* lich trinh */}
            <View style={[styles.mb24]}>
                <TouchableOpacity onPress={toggleTimeModal}>
                    <View style={[styles.flexRow]}>
                        <ClockIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                        <View style={[styles.ml5, styles.flexFull]}>
                            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                                Thời gian khởi hành
                            </Text>
                            <Text style={[styles.textGray77, styles.fs15]}>{getActiveText().title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={!isTimeDropdownVisible} duration={500}>
                    <View style={[styles.bgBlack, styles.mt24]}>
                        {/* now */}
                        <TouchableOpacity
                            style={[
                                styles.flexRow,
                                styles.itemsCenter,
                                styles.border10,
                                styles.p12,
                                styles.border1,
                                styles.dashed,
                                styles.borderColor3e9,
                                styles.bgBlue212,
                                activeElement === 'NOW_ELEMENT'
                                    ? styles.borderColor3e9
                                    : styles.borderColor777,
                                activeElement === 'NOW_ELEMENT'
                                    ? styles.bgBlue212
                                    : styles.bgGray2727,
                            ]}
                            onPress={() => handleElementPress('NOW_ELEMENT')}
                        >
                            <RocketLaunchIcon size={50} color={'white'} />
                            <View style={[styles.ml10, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs15,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb10,
                                    ]}
                                >
                                    Tôi cần đi luôn
                                </Text>
                                <Text
                                    style={[
                                        styles.fs15,
                                        styles.fw400,
                                        styles.textWhite,
                                        styles.lh20,
                                    ]}
                                >
                                    Ưu tiên xe ở gần và đến sớm nhất có thể
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* range */}
                        <TouchableOpacity
                            style={[
                                styles.flexRow,
                                styles.itemsCenter,
                                styles.border10,
                                styles.mt15,
                                styles.p12,
                                styles.border1,
                                styles.dashed,
                                activeElement === 'RANGE_ELEMENT'
                                    ? styles.borderColor3e9
                                    : styles.borderColor777,
                                activeElement === 'RANGE_ELEMENT'
                                    ? styles.bgBlue212
                                    : styles.bgGray2727,
                            ]}
                            onPress={() => handleElementPress('RANGE_ELEMENT')}
                        >
                            <CubeTransparentIcon size={50} color={'white'} />
                            <View style={[styles.ml10, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs15,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb10,
                                    ]}
                                >
                                    {timeString}
                                </Text>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={10}
                                    maximumValue={120}
                                    step={10}
                                    onValueChange={handleChangeValue}
                                    value={timeRange}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="rgba(255, 255, 255, 0.50)"
                                />
                            </View>
                        </TouchableOpacity>

                        {/* time */}
                        <TouchableOpacity
                            style={[
                                styles.flexRow,
                                styles.itemsCenter,
                                styles.border10,
                                styles.mt15,
                                styles.p12,
                                styles.border1,
                                styles.dashed,
                                activeElement === 'TIME_ELEMENT'
                                    ? styles.borderColor3e9
                                    : styles.borderColor777,
                                activeElement === 'TIME_ELEMENT'
                                    ? styles.bgBlue212
                                    : styles.bgGray2727,
                            ]}
                            onPress={() => handleElementPress('TIME_ELEMENT')}
                        >
                            <ClockIcon size={50} color={'white'} />
                            <View style={[styles.ml10, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs15,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb10,
                                    ]}
                                >
                                    Lịch trình của tôi
                                </Text>
                                <View style={[styles.flexRow]}>
                                    <View>
                                        <TouchableOpacity onPress={showDatepicker}>
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs15,
                                                    styles.bgGray161,
                                                    styles.py5,
                                                    styles.px10,
                                                ]}
                                            >
                                                {format(date, 'dd-MM-yyyy')}
                                            </Text>
                                        </TouchableOpacity>
                                        {showPicker && (
                                            <DateTimePicker
                                                value={date}
                                                mode="date"
                                                display="default"
                                                onChange={onChangeDate}
                                            />
                                        )}
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={showTimePicker}>
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs15,
                                                    styles.bgGray161,
                                                    styles.py5,
                                                    styles.px10,
                                                    styles.ml12,
                                                ]}
                                            >
                                                {time.toLocaleTimeString()}
                                            </Text>
                                        </TouchableOpacity>
                                        {showPickerTime && (
                                            <DateTimePicker
                                                value={time}
                                                mode="time"
                                                display="default"
                                                onChange={onChangeTime}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Collapsible>
            </View>
            {/* note */}
            <View style={{ paddingBottom: 40 }}>
                <View style={[styles.flexRow, styles.mb10]}>
                    <PencilIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                    <View style={[styles.ml5, styles.flexFull]}>
                        <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                            Ghi chú cho tài xế
                        </Text>
                    </View>
                </View>
                <TextInput
                    style={[
                        styles.textGray77,
                        styles.bg161e,
                        styles.fs15,
                        styles.textArea,
                        styles.p15,
                    ]}
                    placeholder="VD: Gọi trước khi đến, không mang thú cưng"
                    placeholderTextColor={'rgba(119,125,146,0.8)'}
                    multiline
                    numberOfLines={4}
                    value={note}
                    onChangeText={(text) => setNote(text)}
                />
            </View>
        </View>
    );
};

export default BookSelects;
