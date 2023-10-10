import React, { useState } from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BellIcon, CalendarIcon, HomeIcon } from 'react-native-heroicons/outline';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import BookScreen from '../screens/BookScreen';
import DiaryScreen from '../screens/DiaryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import DriverScreen from '../screens/DriverScreen';
import UserScreen from '../screens/UserScreen';
import MapScreen from '../screens/MapScreen';
import PreMapScreen from '../screens/PreMapScreen';
import TokenProvider from '../redux/tokenContext';
import { NotificationProvider, useNotification } from '../redux/notificationContext';
import FindSreen from '../screens/FindSreen';
import FindDetailScreen from '../screens/FindDetailScreen';
import BookingFormProvider from '../redux/bookingFormContext';
import ConfirmScreen from '../screens/ConfirmScreen';
import PickScreen from '../screens/PickScreen';
import MovingScreen from '../screens/MovingScreen';
import CompleteScreen from '../screens/CompleteScreen';
import MyCarScreen from '../screens/MyCarScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ShareScreen from '../screens/ShareScreen';
import AddCoinScreen from '../screens/AddCoinScreen';
import DriverFindScreen from '../screens/DriverFindScreen';
import DriverFindDetailComponent from '../components/driverFindDetail/DriverFindDetailComponent';
import DetailTripProvider from '../redux/detailTripContext';
import DriverPickScreen from '../screens/DriverPickScreen';
import DriverMovingScreen from '../screens/DriverMovingScreen';
import DriverCompleteScreen from '../screens/DriverCompleteScreen';
import LoadPointsScreen from '../screens/LoadPointsScreen';
import CancelBookClientScreen from '../screens/CancelBookClientScreen';
import CancelBookDriverScreen from '../screens/CancelBookDriverScreen';
import MapScreenStart from '../screens/MapScreenStart';
import CancelClientConfirmScreen from '../screens/CancelClientConfirmScreen';
import CancelDriverConfirmScreen from '../screens/CancelDriverConfirmScreen';
import MapProvider from '../redux/mapContext';
import WifiScreen from '../screens/WifiScreen';
import CustomerFormProvider from '../redux/customerFormContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigation = () => {
  const { countNoti, handleHiddenNoti } = useNotification();

  // console.log(hasUnreadNotification);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#161E28',
          borderTopColor: '#161E28',
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="DiaryScreen"
        component={DiaryScreen}
        options={{
          tabBarLabel: 'Nhật ký',
          tabBarIcon: ({ color, size }) => <CalendarIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => <BellIcon color={color} size={size} />,
          tabBarBadge: countNoti ? countNoti : null,
          tabBarBadgeStyle: { fontSize: 10 },
        }}
        initialParams={handleHiddenNoti}
      />
    </Tab.Navigator>
  );
}
const AppNavigation = () => {
  return (
    <TokenProvider>
      <MapProvider>
        <NotificationProvider>
          <DetailTripProvider>
            <CustomerFormProvider>
              <BookingFormProvider>
                <NavigationContainer>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="Home" component={HomeStackNavigation} />
                      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
                      <Stack.Screen name="DiaryScreen" component={DiaryScreen} />
                      <Stack.Screen name="FindScreen" component={FindSreen} />
                      <Stack.Screen name="Book" component={BookScreen} />
                      <Stack.Screen name="DriverScreen" component={DriverScreen} />
                      <Stack.Screen name="UserScreen" component={UserScreen} />
                      <Stack.Screen name="WifiScreen" component={WifiScreen} />
                      <Stack.Screen name="MapScreen" component={MapScreen} />
                      <Stack.Screen name="MapScreenStart" component={MapScreenStart} />
                      <Stack.Screen name="PreMapScreen" component={PreMapScreen} />
                      <Stack.Screen name="FindDetailScreen" component={FindDetailScreen} />
                      <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
                      <Stack.Screen name="PickScreen" component={PickScreen} />
                      <Stack.Screen name="MovingScreen" component={MovingScreen} />
                      <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
                      <Stack.Screen name="LoadPointsScreen" component={LoadPointsScreen} />
                      <Stack.Screen name="MyCarScreen" component={MyCarScreen} />
                      <Stack.Screen name="AddCoinScreen" component={AddCoinScreen} />
                      <Stack.Screen
                        name="VerificationScreen"
                        component={VerificationScreen}
                      />
                      <Stack.Screen name="ShareScreen" component={ShareScreen} />
                      <Stack.Screen name="DriverFindScreen" component={DriverFindScreen} />
                      <Stack.Screen
                        name="DriverFindDetailScreen"
                        component={DriverFindDetailComponent}
                      />
                      <Stack.Screen name="DriverPickScreen" component={DriverPickScreen} />
                      <Stack.Screen
                        name="DriverMovingScreen"
                        component={DriverMovingScreen}
                      />
                      <Stack.Screen
                        name="DriverCompleteScreen"
                        component={DriverCompleteScreen}
                      />
                      <Stack.Screen
                        name="CancelBookClientScreen"
                        component={CancelBookClientScreen}
                      />
                      <Stack.Screen
                        name="CancelBookDriverScreen"
                        component={CancelBookDriverScreen}
                      />
                      <Stack.Screen
                        name="CancelClientConfirmScreen"
                        component={CancelClientConfirmScreen}
                      />
                      <Stack.Screen
                        name="CancelDriverConfirmScreen"
                        component={CancelDriverConfirmScreen}
                      />
                  </Stack.Navigator>
                </NavigationContainer>
              </BookingFormProvider>
            </CustomerFormProvider>
          </DetailTripProvider>
        </NotificationProvider>
      </MapProvider>
    </TokenProvider>
  )
};

export default AppNavigation;