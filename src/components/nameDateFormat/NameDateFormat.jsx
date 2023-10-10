import { Text } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { SectionList } from "react-native";
import { PassengerContext } from "../../redux/passengerContext";

const NameDateFormat = ({timeString, style, obj}) => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const startOfWeek = moment().startOf('isoWeek');
    const startOfLastWeek = moment().subtract(1, 'weeks').startOf('isoWeek');
    const startOfMonth = moment().startOf('month');
    const startOfLastMonth = moment().subtract(1, 'months').startOf('month');

    const dateArr = obj.flatMap((passenger, index) => {
        const dateFormat = moment(passenger.created_at);
        if (dateFormat.isSame(today, 'day')) {
          return [{ data: passenger, title: 'Hôm nay' }];
        }
        if (dateFormat.isSame(yesterday, 'day')) {
          return [{ data: passenger, title: 'Hôm qua' }];
        }
        if (dateFormat.isBetween(startOfWeek, today, 'day', '[]')) {
          return [{ data: passenger, title: 'Tuần này' }];
        }
        if (dateFormat.isBetween(startOfLastWeek, startOfWeek, 'day', '[]')) {
          return [{ data: passenger, title: 'Tuần trước' }];
        }
        if (dateFormat.isBetween(startOfMonth, today, 'day', '[]')) {
          return [{ data: passenger, title: 'Tháng này' }];
        }
        if (dateFormat.isBetween(startOfLastMonth, startOfMonth, 'day', '[]')) {
          return [{ data: passenger, title: 'Tháng trước' }];
        }
      
        // Hoặc trả về một mảng trống nếu không phù hợp với bất kỳ điều kiện nào
        return [];
    });

    const transformedData = dateArr.reduce((result, item) => {
        // Tìm kiếm trong mảng kết quả có tồn tại title đã có trong item không
        const existingItem = result.find((data) => data.title === item.title);
        // Nếu đã tồn tại title này trong mảng kết quả
        if (existingItem) {
          // Thêm data vào mảng con tương ứng
          existingItem.data.push(item.data);
        } else {
          // Nếu chưa tồn tại title này, thêm một entry mới vào mảng kết quả
          result.push({ title: item.title, data: [item.data] });
        }
      
        return result;
    }, []);
  //   console.log(transformedData);

  //   useEffect(() => {
  //   context.setPassenger({
  //       transformedData
  //   });
  // }, []);

    // return (
    //     // <Text
    //     //     style={style}
    //     // >
    //     //     {output}
    //     // </Text>
    //     <SectionList
    //         sections={transformedData}
    //     ></SectionList>
    // );
}

export default NameDateFormat;