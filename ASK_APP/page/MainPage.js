import React from 'react';
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



const mainstack = createNativeStackNavigator();





export default function MainPage({navigation, route}) {

//   const MinScreen = () => {
//     return (
       
            
//             <mainstack.Navigator>
//                 <mainstack.Screen name="APage"   options={{title:'카메라'}}  component={APage}/>
//                 <mainstack.Screen name='A_1'component={A_1} />
               
//             </mainstack.Navigator>
        
//     );
// };

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
              <TouchableOpacity>
               <View>
               <Image resizeMode="contain" style={styles.Image} source={inOut}/>
               </View>
                <Text style={styles.text1}>출근</Text>
              </TouchableOpacity>
              
              </View>

              <View style={styles.two_2}>
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