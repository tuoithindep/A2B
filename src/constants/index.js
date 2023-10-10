export const searchData = [
    {
        name: 'Nhà riêng',
        address: '286 Nguyễn Xiển, Thanh Trì, Hà Nội',
        coordinates: {
            lat: 20.98354,
            lng: 105.80868,
        },
    },
    {
        name: 'Khu đô thị Royal City',
        address: '72 Nguyễn Trãi, Thanh Xuân, Hà Nội',
        coordinates: {
            lat: 21.0035,
            lng: 105.81575,
        },
    },
    {
        name: 'Cảng hàng không quốc tế Nội Bài',
        address: 'Phú Minh, Sóc Sơn, Hà Nội',
        coordinates: {
            lat: 21.23123,
            lng: 105.81404,
        },
    },
];

export const transportations = [
    {
        id: 1,
        name: 'Xe sedan',
        description: 'Yêu cầu sedan hạng B trở lên, xe sạch sẽ, tài xế lịch sự',
    },
    {
        id: 2,
        name: 'Xe SUV',
        description: 'Yêu cầu xe 7 chỗ rộng rãi',
    },
    {
        id: 3,
        name: 'Xe khách',
        description: 'Xe 16 chỗ đi tỉnh',
    },
];

export const currentPosition = {
    address: 'Xã Tân Triều, Huyện Thanh Trì, Hà Nội',
    coordinates: {
        lat: 20.98382,
        lng: 105.80779,
    },
    name: 'Ngõ 286 Nguyễn Xiển',
};

export const listDrivers = [
    {
        id: 0,
        image_driver: 'https://i.pinimg.com/236x/3b/a6/8d/3ba68dd05183a0233ea98974dd05a4d4.jpg',
        image_car: 'https://i.pinimg.com/236x/a2/35/3b/a2353b49029f0fade276cb0d8cea1f75.jpg',
        name_driver: 'Nguyễn Văn A',
        protected: true,
        name_car: 'Ferani',
        model: '2022',
        wifi: true,
        water: true,
        star: '3.0',
        bill: '500.000',
        license_plate: '29H-12345',
    },
    {
        id: 3,
        image_driver: 'https://i.pinimg.com/236x/8b/65/cf/8b65cfd21e7aed358a73b48ca5a7f3c2.jpg',
        image_car: 'https://i.pinimg.com/236x/fb/74/7f/fb747fe9878196d267c76d7b666bf5aa.jpg',
        name_driver: 'Nguyễn Văn B',
        protected: false,
        name_car: 'BMW X7',
        model: '2023',
        wifi: true,
        water: false,
        star: '4.0',
        bill: '400.000',
        license_plate: '29C-54321',
    },
];

export const reviewTextComplete = [
    {
        id: 1,
        name: 'Dịch vụ tốt',
    },
    {
        id: 2,
        name: 'Tài xế nhiệt tình',
    },
    {
        id: 3,
        name: 'Tốt',
    },
];

export const notis = [
    {
        notify_id: '43',
        user_id: '3',
        content: 'Trừ 8k (3%) phí nền tảng của chuyến đi #22',
        status: '1',
        created_at: '2023-05-26 14:10:43',
        screen: 'Login',
        telegram: '5536223873',
        is_telegram: '1',
    },
    {
        notify_id: '37',
        user_id: '3',
        content: 'Khách đã xác nhận đặt chuyến của bạn',
        status: '0',
        created_at: '2023-05-24 11:00:37',
        screen: 'ConfirmScreen',
        telegram: '5536223873',
        is_telegram: '1',
    },
    {
        notify_id: '21',
        user_id: '3',
        content:
            'Bạn đã được đánh giá 3 sao bởi tài xế Nguyễn Ngọc Lâm trong chuyến đi #6. Nội dung đánh giá: chán',
        status: '1',
        created_at: '2023-05-15 15:09:35',
        screen: 'CompleteScreen',
        telegram: '5536223873',
        is_telegram: '1',
    },
];

export const transaction = [
    {
        "payment_id": "11",
        "trip_id": "22",
        "user_id": "3",
        "coin_add": "-8",
        "coin": "290",
        "content": "Phí nền tảng. Số dư: 290k",
        "created_at": "2023-05-26 14:10:43"
    },
    {
        "payment_id": "8",
        "trip_id": "9",
        "user_id": "3",
        "coin_add": "-1",
        "coin": "298",
        "content": "Phí nền tảng. Số dư: 298k",
        "created_at": "2023-05-16 09:51:50"
    },
    {
        "payment_id": "7",
        "trip_id": "9",
        "user_id": "3",
        "coin_add": "-1",
        "coin": "299",
        "content": "Phí nền tảng. Số dư: 299k",
        "created_at": "2023-05-16 09:48:40"
    },
    {
        "payment_id": "3",
        "trip_id": "0",
        "user_id": "3",
        "coin_add": "300",
        "coin": "300",
        "content": "Bạn đã được tặng 300k khi đăng ký thông tin xe lần đầu. Số dư: 300k",
        "created_at": "2023-05-12 11:40:24"
    }
];

export const dataGender = [
    { id: 0, shortname: 'Nam' },
    { id: 1, shortname: 'Nữ' },
];

// export const typeCar = [
//     { id: 0, shortname: 'Sedan' },
//     { id: 1, shortname: 'SUV' },
//     { id: 2, shortname: '16 chỗ' },
// ];

export const licenseColor = [
    { id: 0, shortname: 'Trắng' },
    { id: 1, shortname: 'Vàng' },
];

export const bill = [
    { id: 0, shortname: 'Không' },
    { id: 1, shortname: 'Có' },
];

export const water = [
    { id: 0, shortname: 'Không' },
    { id: 1, shortname: 'Có' },
];
export const cancelBookDriver = [
    { id: 0, title: 'Có việc bận đột xuất', des: 'Không thể thực hiện chuyến đi này' },
    { id: 1, title: 'Do xe của tôi gặp sự cố bất khả kháng', des: 'Xe tôi hỏng, bị sự cố, va trạm trên đường...' },
    { id: 2, title: 'Lý do khác', des: 'Các lý do khác' },
];
export const cancelBookClient = [
    { id: 0, title: 'Có việc bận đột xuất', des: 'Không thể thực hiện chuyến đi này' },
    { id: 1, title: 'Do tôi thay đổi hành trình, thời gian', des: 'Tôi muốn hủy chuyến đi này' },
    { id: 2, title: 'Lý do khác', des: 'Các lý do khác' },
];
export const filterReview = [
    { id: 0, title: 'Mới nhất', name: 'rate_id', filter: 'DESC' },
    { id: 1, title: 'Cũ nhất', name: 'rate_id', filter: 'ASC' },
    { id: 2, title: 'Tốt nhất', name: 'star', filter: 'DESC' },
    { id: 3, title: 'Tệ nhất', name: 'star', filter: 'ASC' },
]
export const waiting = [
    {id: 0},
    {id: 1},
    {id: 2},
];
export const statusDriver = [
    { id: 0, screen: 'DriverFindDetailScreen' },
    { id: 1, screen: 'DriverFindDetailScreen' },
    { id: 2, screen: 'DriverPickScreen' },
    { id: 3, screen: 'DriverMovingScreen' },
    { id: 4, screen: 'DriverCompleteScreen' },
    { id: 5, screen: 'CancelDriverConfirmScreen' },
];
export const statusUser = [
    { id: 0, screen: 'FindScreen' },
    { id: 1, screen: 'ConfirmScreen' },
    { id: 2, screen: 'PickScreen' },
    { id: 3, screen: 'MovingScreen' },
    { id: 4, screen: 'CompleteScreen' },
    { id: 5, screen: 'CancelClientConfirmScreen' },
];
