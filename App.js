import { StyleSheet, Text, View, Alert, StatusBar,PermissionsAndroid } from 'react-native';
import AppNavigation from './src/navigation/appNavigation';
import { initializeApp } from "firebase/app";
import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';


export default function App() {
    // return <AppNavigation />;
    const firebaseConfig = {
        apiKey: "AIzaSyBcKhfb9JSZEXG1r7TamDACmF2ru5XJZJo",
        authDomain: "login-a2b.firebaseapp.com",
        projectId: "login-a2b",
        storageBucket: "login-a2b.appspot.com",
        messagingSenderId: "163795266938",
        appId: "1:163795266938:web:8c67888ef5a43326487ac3",
        measurementId: "G-QR23KZK0Y9"
      };
    
      const app = initializeApp(firebaseConfig);
      
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    
      const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      }
    
    //   messaging()
    //   .subscribeToTopic('weather')
    //   .then(() => console.log('Subscribed to topic!'));
    
      useEffect(() => {
        if (requestUserPermission()) {
          messaging().getToken().then(token => {
            console.log("1",token);
          })
        }
        else {
          console.log("Fail status token", authStatus);
        }
    //     // Check whether an initial notification is available
    //     messaging()
    //       .getInitialNotification()
    //       .then(async (remoteMessage) => {
    //         if (remoteMessage) {
    //           console.log(
    //             'Notification caused app to open from quit state :',
    //             remoteMessage.notification,
    //           );
    //         }
    //       });
    
    //     // Assume a message-notification contains a "type" property in the data payload of the screen to open
    
    //     messaging().onNotificationOpenedApp(async (remoteMessage) => {
    //       console.log(
    //         'Notification caused app to open from background state :',
    //         remoteMessage.notification,
    //       );
    //     });
    
    //     // Register background handler
    //     messaging().setBackgroundMessageHandler(async remoteMessage => {
    //       console.log('Message handled in the background! ', remoteMessage);
    //     });

    //     // onMessageSent(listener: (messageId: string) => any): () => void;
    
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //       Alert.alert('A new FCM message arrived! ', JSON.stringify(remoteMessage));
    //     });
    
    //     // return unsubscribe;
      }, [])
      
      return <AppNavigation />;
//       const styles = StyleSheet.create({
//         container: {
//           flex: 1,
//           backgroundColor: '#fff',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//       });
      
//     return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
}