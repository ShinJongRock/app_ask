import React, { useEffect, useState } from 'react';
import { StyleSheet,
             Text,
             View,
             SafeAreaView,
             TextInput ,
             Button,
             Alert ,
             Image,
             TouchableOpacity 
            
            } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import inOut from '../img/inOut.png';
import inOut2 from '../img/inOut2.png';
import camera2 from '../img/camera2.png';
import salary from '../img/salary.png';
import vact from '../img/vact.png';
import list from '../img/list.png';
import money from '../img/money.png';
import search from '../img/search.png';
import ask from '../img/ask.png';
import APage from './APage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
const mainstack = createNativeStackNavigator();





export default function MainPage({navigation, route}) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      // gps();
   
      }, []);

//    위도 경도 값 받아옴  
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

      // const startgps = async () => {
        // const compCode = await AsyncStorage.getItem("compCode");
        // const empName  = await AsyncStorage.getItem("mb_name");
        // const empCode   = await AsyncStorage.getItem("mb_code");
        // // const empRank   = await AsyncStorage.getItem("mb_name");
        // // const depCode   = await AsyncStorage.getItem("depCode ");
        // const depName    = await AsyncStorage.getItem("mb_depName ");


      //   console.log("가나다라마바사아자차카타파하")
      //   axios.post("http://192.168.2.91:5000/start_inOutInfo",
      //       {
      //         compCode :compCode ,
      //         empCode :empCode,
      //         empName:empName,
      //         empRank:"왕",
      //         depCode :'002',
      //         depName :depName,
      //         y1:location.coords.latitude ,
      //         x1:location.coords.longitude   
      //       }
      //     )
      //     .then((res) => {
      //         console.log('asd')

      //     });
      // }



      const startgps = async () =>{
        const compCode = await AsyncStorage.getItem("compCode");
        const empName  = await AsyncStorage.getItem("mb_name");
        const empCode   = await AsyncStorage.getItem("mb_code");
        const empRank   = await AsyncStorage.getItem("mb_rank");
        const depCode   = await AsyncStorage.getItem("mb_depCode");
        const depName    = await AsyncStorage.getItem("mb_depName");
      
        // const  latitude = location.latitude;
        // const  longitude = location.longitude;
      
        axios.post("http://192.168.2.91:5000/start_inOutInfo",{
          compCode :compCode ,
          empCode :empCode,
          empName:empName,
          empRank:empRank,
          depCode :depCode,
          depName :depName,
          y1:'36.79911695845545' ,
          x1:'127.08272705033013 ' 

        }).then(function (response) {
          Alert.alert(empName+"출근 하셨습니다")
        }).catch(function (error) {
            console("readCompany error :", error);
        });

    }



    

      //location 값에 gps 정보가 들어있음 
      // console.log("location :", location)
      //console.log("att : " , location.coords.altitude);
      //console.log("long :" , location.coords.longitude);

      // let text = '로딩중..';
      // if (errorMsg) {
      //   text = errorMsg;
      // } else if (location) {
      //   text = JSON.stringify(location);
      //   console.log(text);
      // }


  



        //링크 이동
        const goApage = (screen) => {
          navigation.navigate(screen)
      }
          //링크 이동
          const goBpage = (screen) => {
            navigation.navigate(screen)
        }
             //링크 이동
             const goCpage = (screen) => {
              navigation.navigate(screen)
          }
  
          //출근 버튼 눌렀을때 axios 보내는 함수
          const input = async() =>{
            await getLocation();
            
            axios.post("Link" , {
              latitude : location.coords.latitude,    //위도
              longitude :  location.coords.longitude,  //경도
              compCode : '',

            }).then( function ( response ){
              if(response){
                console.log("출근처리 완료");

              }else{
                console.log("출근처리 실패");

              }

            }).catch ( function (error){
              console.log( "error 발생 : " , error);
            });  
          


          }
          
          //퇴근 버튼 눌렀을때 axios 보내는 함수
          const outPut = () =>{

          }

          const getLocation = ()=>{
            (async () => {
          
              let { status } = await Location.requestForegroundPermissionsAsync();
           
            
              if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
               
                return;
              }
            //   console.log(status.latitude);
              let loc = await Location.getCurrentPositionAsync({});
              setLocation(loc);
    
            //   const {coords: {latitude,longitude} } =await Location.getCurrentPositionAsync();
            })();
          }

    return (
      // <NavigationContainer>
        <View style={styles.container}>
        <View >
          <Image resizeMode="contain" style={styles.ask} source={ask} />
        </View>

            <View style={styles.one}>
            <View >
                <Text> 오늘날짜</Text>
    
              </View>
        
              <View style={styles.one_1}>
                <Text>출근</Text>
                <Text>퇴근 </Text>                  
                <Text>연장</Text>     
              </View>
              <View style={styles.one_1}>
                <Text></Text>
                <Text></Text>                  
                <Text></Text>     
              </View>
        
              <View style={styles.one_1}>
                <Text>asd</Text>
                <Text>asd</Text>                  
                <Text>asd</Text>     
              </View>
            </View>

            <View style={styles.two}>
              <View style={styles.toptext}><Text>출퇴근</Text></View>
              
            <View style={styles.two_1}>
              <TouchableOpacity 
                onPress={(screen) => {startgps()}}>

               <View>
               <Image resizeMode="contain" style={styles.Image} source={inOut}/>
               </View>
                <Text style={styles.text1}>출근</Text>
              </TouchableOpacity>
              
              </View>

              <View style={styles.two_2} onPress={ outPut}>
              <TouchableOpacity>
              <Image resizeMode="contain" style={styles.Image2} source={inOut2}/>
                <Text style={styles.text2}>퇴근</Text>
                </TouchableOpacity>
              </View>
            
            </View>

            <View style={styles.two}>
              <View style={styles.toptext}><Text>경비</Text></View>
              
            <View style={styles.two_1}>

              <TouchableOpacity    onPress={(screen) => goApage('A_1')}>
                <Image resizeMode="contain" style={styles.Image3} source={camera2}/>
                <Text  style={styles.text3}>경비등록</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.two_2}>
              <TouchableOpacity onPress={(screen) => goApage('A_2')}>
              <Image resizeMode="contain" style={styles.Image4} source={money}/>
                <Text  style={styles.text4}>경비목록</Text>
                </TouchableOpacity>
    
              </View>
            
            </View>


            <View style={styles.two}>
              <View style={styles.toptext}><Text>휴가</Text></View>
              
            <View style={styles.two_1}>
            <TouchableOpacity  onPress={(screen) => goBpage('B_1')}>
            <Image resizeMode="contain" style={styles.Image5} source={vact}/>
                <Text  style={styles.text5}>휴가신청</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.two_2}>
              <TouchableOpacity onPress={(screen) => goBpage('B_2')}>
              <Image resizeMode="contain" style={styles.Image6} source={search}/>
                <Text  style={styles.text6}>휴가조회</Text>
                </TouchableOpacity>
    
              </View>
            
            </View>

            <View style={styles.two}>
              <View style={styles.toptext}><Text>기타</Text></View>
              
            <View style={styles.two_1}>
            <TouchableOpacity onPress={(screen) => goCpage('C_1')}>
            <Image resizeMode="contain" style={styles.Image7} source={list}/>
                <Text  style={styles.text7}>출근현황</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.two_2}>
              <TouchableOpacity onPress={(screen) => goCpage('C_2')}>
              <Image resizeMode="contain" style={styles.Image8} source={salary}/>
                <Text  style={styles.text8}>급여현황</Text>
                </TouchableOpacity>
              </View>
            
            </View>

            

        </View>
        // </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
      
    },
    one_1:{
    
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent:'space-around',
      
    },

    one:{
        width: '95%',
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        


    },
    two:{
      width: '95%',
        flex: 1.2,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent:'center',
      
      


    },
    two_1:{
      width:'45%',
      borderWidth: 1,
      borderRadius: 10,
      margin: 19,
      justifyContent:'center',
      alignItems:'center',
      top:10,
      right:6,
      
     

    },
    two_2:{
      
      width:'45%',
      borderWidth: 1,
      borderRadius: 10,
      margin: 19,
      justifyContent:'center',
      alignItems:'center',
      top:10,
      right:33

    },
    text1:{
        left:10
    },
    text2:{
      left:10,
      bottom:2

    },
    text3:{
      left:10,
      bottom:2
    },
    text4:{
      left:13,
      top:4
    },
    text5:{
      left:5,
    },
    text6:{
      left:5,
    },
    text7:{
      left:13,
    },
    text8:{
      left:13,
    },


    toptext:{
      left:45
    },
    Image:{
      width: 50,
      height:40,
    },
    Image2:{
      width: 50,
      height:50,
    },
    Image3:{
      width: 80,
      height:50,
    },
    Image4:{
      width: 80,
      height:40,
    },
    Image5:{
      width: 60,
      height:50,
    },
    Image6:{
      width: 60,
      height:50,
    },
    Image7:{
      width: 80,
      height:45,
    },
    Image8:{
      width: 80,
      height:40,
    },
    ask:{
      top:20,
      width:150, 
       height:90
    },


  });
  

  


  // input: {
  
  //   width:300,
  //   height: 40,
  //   margin: 2,
  //   borderWidth: 1,
  //   padding: 10,
  //   top:0
    
  // },
  // button:{
  //   width:200,
  //   top:100,
  

  // },
  // text:{
  //   width:200,
  //   margin: 5,
  //   top:0
  // },
  // ip:{
   
  // },
  // bm:{
  //   top:80,
  //   width:'70%',
  // },
  // tm:{
  //   alignItems: 'center',
  //   justifyContent: 'center',
   
  //   bottom:50
    
  // },
  // Image:{
  //   width: 200,
  //   height:100,
  // },
  // TextSize:{
  //   fontSize:30
  // },