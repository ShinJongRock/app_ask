
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location'; 
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    Image,
    Style,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
const C_2 = () => {
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      gps();
      }, []);
      

      
      const gps =() =>{
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
           
            return;
          }
          let loc = await Location.getCurrentPositionAsync({});
          setLocation(loc);

       
        })();

      } 
    

      //location 값에 gps 정보가 들어있음 
      console.log("location :", location)
      //console.log("att : " , location.coords.altitude);
      //console.log("long :" , location.coords.longitude);

      let text = '로딩중..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
        console.log(text);
      }
    return (
        <View>
          
                <Text> 위도 : { location && location.coords.latitude }</Text>
                <Text> 경도 : { location && location.coords.longitude }</Text>
         
             
        </View>
    );
};

export default C_2;