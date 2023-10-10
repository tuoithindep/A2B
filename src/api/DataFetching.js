import axios from 'axios';

// endpoint
const baseUrl = 'https://api.beta-a2b.work';
// const searchEndpoint = `${baseUrl}/${api_key}/search/info?`;
const settingEndpoint = `${baseUrl}/e1358385819f12b01db7990c1/profile/get`;
// const bankNameEndpoint = `${baseUrl}/${api_key}/bank/list`;

// fallback Image
export const fallbackImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

// call api
const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('Error', error);
        return {};
    }
};

const postApi = async (endpoint, data) => {
    const options = {
        method: 'POST',
        url: endpoint,
        data: data ? data : {},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' //dữ liệu sẽ được mã hóa dưới dạng chuỗi query string và được gửi qua body của yêu cầu HTTP
        }
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('Error', error);
        return {};
    }
};
//api tim kiem
export const fetchSearchEndpoint = (params, token) => {
  const searchEndpoint = `${baseUrl}/${token}/search/info`;
  // return params
  return apiCall(searchEndpoint,params);
}
//lich su tim kiem
export const fetchHistorySearch = (token) => {
    const historySearch = `${baseUrl}/${token}/history/search?1`;
    return apiCall(historySearch)
}
//cai dat
export const fetchSettingEndpoint = (params) => {
    return apiCall(settingEndpoint, params);
};
// danh sách tên các ngân hàng
export const fetchBankNameEndpoint = (params) => {
    const bankNameEndpoint = `${baseUrl}/58289193774ccae754cd6506a/bank/list`;
    return apiCall(bankNameEndpoint, params);
};

//danh gia cua tai xe
export const fetchListReviewCustomer = (params) => {
    const listReviewCustomer = `${baseUrl}/rate/filterCustomer`;
    return apiCall(listReviewCustomer,params);
};
//api thong tin khach hang
export const fetchProfileUser = (token) => { // nhan tham so la params la 1 object
    const profileEndpoint = `${baseUrl}/${token}/profile/get`;
    return apiCall(profileEndpoint);
}
//lay gps ben khach
export const fetchStartGPS = (params, token) => {
    const updateGPS = `${baseUrl}/${token}/search/address`;
    // return params
    return apiCall(updateGPS,params);
}
//tao chuyen di
export const fetchCreateOneTrip = (data, token) => {
    // return data;
    const createTrip = `${baseUrl}/${token}/trip/create`;
    return postApi(createTrip,data);
}
//danh muc loai xe
export const fetchListCategoryVehicle = (token) => {
    const listCategoryVehicle = `${baseUrl}/${token}/category/list`;
    return apiCall(listCategoryVehicle);
}
//danh sach thong bao
export const fetchListNoti = (params={},token) => {
    const listNoti = `${baseUrl}/${token}/notification/list`;
    return apiCall(listNoti,params);
}
//doc tat ca thong bao
export const fetchReadAllNoti = (token) => {
    const readAllNoti = `${baseUrl}/${token}/notification/read`;
    return postApi(readAllNoti);
}
//doc 1 thong báo
export const fetchReadOneNoti = (params,token) => {
    const readOneNoti = `${baseUrl}/${token}/notification/one`;
    return apiCall(readOneNoti,params);
}
//thong tin chi tiet chuyen di 
export const fetchDetailTrip = (params,token) => {
    const detailTrip = `${baseUrl}/${token}/trip/detail`;
    return apiCall(detailTrip,params);
}
//danh sach bao gia
export const fetchListReport = (params,token) => {
    const listReport = `${baseUrl}/${token}/report/list`;
    return apiCall(listReport,params);
}
//lich su chuyen di khach hang 
export const fetchListHistoryPassenger = (params, token) => {
    const listHistoryPassenger = `${baseUrl}/${token}/history/customer`;
    return apiCall(listHistoryPassenger, params);
}
//lich su chuyen di tai xe
export const fetchListHistoryDriver = (token) => {
    const listHistoryDriver = `${baseUrl}/${token}/history/driver`;
    return apiCall(listHistoryDriver);
}
//lich su giao dich
export const fetchListHistoryTransfer = (token) => {
    const listHistoryTransfer = `${baseUrl}/${token}/history/payment`;
    return apiCall(listHistoryTransfer);
}
//danh sach danh gia cua tai xe
export const fetchListReviewDriver = (params) => {
    const listReviewDriver = `${baseUrl}/rate/filterDriver`;
    return apiCall(listReviewDriver, params);
}
//thong tin chi tiet ve tai xe
export const fetchDetailDriver = (params) => {
    const detailDriver = `${baseUrl}/1/vehicle/detail`;
    return apiCall(detailDriver, params);
}
//ve ma qr code
export const fetchQrCode = (data) => {
    const drawQrCode = `${baseUrl}/1/vehicle/qrcode`;
    // return params;
    return postApi(drawQrCode, data);
}
//danh gia tai xe
export const fetchReviewDriver = (data,token) => {
    const reviewDriver = `${baseUrl}/${token}/rate/evaluateDriver`;
    // return params;
    return postApi(reviewDriver, data);
}
//danh gia khach hang
export const fetchReviewCustomer = (data,token) => {
    const reviewCustomer = `${baseUrl}/${token}/rate/evaluateCustomer`;
    // return params;
    return postApi(reviewCustomer, data);
}
//lay thong tin danh gia
export const fetchGetOneRate = (params,token) => {
    const getOneRate = `${baseUrl}/${token}/rate/get`;
    return apiCall(getOneRate, params);
} 

//lấy 1 danh mục xe
export const fetchGetOneCategoryVehicle = (token,params) => {
    const listCategoryVehicle = `${baseUrl}/${token}/category/one`;
    return apiCall(listCategoryVehicle, params);
}
//cập nhật thông tin mycar
export const fetchUpdateMycar = (data, token) => {
    const UpdateMyCar = `${baseUrl}/${token}/vehicle/update`;
    return postApi(UpdateMyCar,data);
}
//lấy thông tin user
export const fetchGetUserProfile = (token) => {
    const listUserProfile = `${baseUrl}/${token}/profile/get`;
    return apiCall(listUserProfile);
}
//cập nhật thông tin profile
export const fetchUpdateProfile = (data, token) => {
    // return data;
    const UpdateProfile = `${baseUrl}/${token}/profile/update`;
    return postApi(UpdateProfile,data);
}
//cập nhật ảnh chứng minh thư nhân dân
export const fetchUpdateImageIdentify = (data, token) => {
    const UpdateImageIdentify = `${baseUrl}/${token}/profile/identification`;
    return postApi(UpdateImageIdentify,data);
}
//cập nhật Wifi
export const fetchUpdateWifi = (data, token) => {
    const UpdateWifi = `${baseUrl}/${token}/vehicle/wifi`;
    return postApi(UpdateWifi,data);
}
//lay va cap nhat GPS ben tai xe
export const fetchGetAndUpdateGPSDriver = (params,token) => {
    const getAndUpdateGPSDriver = `${baseUrl}/${token}/vehicle/updateGPS`;
    return postApi(getAndUpdateGPSDriver,params);
}
//cap nhat tinh trang bao gia (tu dong hoac thu cong)
export const fetchUpdateStatusPrice = (data,token) => {
    const updateStatusPrice = `${baseUrl}/${token}/vehicle/updateStatusPrice`;
    return postApi(updateStatusPrice,data);
}
//cap nhat cung duong cua tai xe
export const fetchUpdateRoad = (data,token) => {
    const updateRoad = `${baseUrl}/${token}/vehicle/updateRoad`;
    return postApi(updateRoad,data);
}
//tro thanh tai xe
export const fetchBecomeDriver = (token) => {
    const becomeDriver = `${baseUrl}/${token}/vehicle/find`;
    return postApi(becomeDriver);
}
//tim khach hang
export const fetchFindCustomer = (token) => {
    const findCustomer = `${baseUrl}/${token}/vehicle/reload`;
    return postApi(findCustomer);
}
//tat nhan chuyen
export const fetchTurnOffDriver = (token) => {
    const turnOffDriver = `${baseUrl}/${token}/vehicle/cancel`;
    return postApi(turnOffDriver);
}
//thong tin chi tiet khach hang
export const fetchDetailCustomer = (params) => {
    const detailCustomer = `${baseUrl}/1/profile/detail`;
    return apiCall(detailCustomer,params);
}
//lay thong tin xe 
export const fetchListMyCar = (token) => {
    const ListMyCar = `${baseUrl}/${token}/vehicle/get`;
    return apiCall(ListMyCar);
}
//huy bao gia 
export const fetchCancelReport = (data,token) => {
    const cancelReport = `${baseUrl}/${token}/report/cancel`;
    return postApi(cancelReport,data);
}
//kiem tra bao gia
export const fetchCheckReport = (params,token) => {
    const checkReport = `${baseUrl}/${token}/report/check`;
    return apiCall(checkReport,params);
}
//bao gia thu cong
export const fetchSendReport = (data,token) => {
    const sendReport = `${baseUrl}/${token}/report/send`;
    return postApi(sendReport,data);
}
//bao gia tu dong
export const fetchAutomaticQuote = (data,token) => {
    // return data;
    const automaticQuote = `${baseUrl}/${token}/report/automatic`;
    return postApi(automaticQuote,data);
}
//dat chuyen di cua tai xe
export const fetchBookACar = (data,token) => {
    // return data;
    const bookACar = `${baseUrl}/${token}/trip/book`;
    return postApi(bookACar,data);
}
//don khach 
export const fetchPickUpCustomer = (data,token) => {
    // return data;
    const pickUpCustomer = `${baseUrl}/${token}/vehicle/pickup`;
    return postApi(pickUpCustomer,data);
}
//bat dau chuyen di
export const fetchOnAJourney = (data,token) => {
    // return data;
    const onAJourney = `${baseUrl}/${token}/trip/journey`;
    return postApi(onAJourney,data);
}
//hoan thanh chuyen di
export const fetchSuccessTrip = (data,token) => {
    // return data;
    const successTrip = `${baseUrl}/${token}/trip/success`;
    return postApi(successTrip,data);
}
//huy chuyen di
export const fetchCancelTrip = (data,token) => {
    // return data;
    const cancelTrip = `${baseUrl}/${token}/trip/cancel`;
    return postApi(cancelTrip,data);
}
//lay vi tri cua tai xe
export const fetchGetLocationDriver = (params) => {
    const getLocationDriver = `${baseUrl}/1/vehicle/location`;
    return apiCall(getLocationDriver,params);
}
//lay số xu của người dùng
export const fetchGetCoin = (token) => {
    const getCoin = `${baseUrl}/${token}/profile/getCoin`;
    return apiCall(getCoin);
}