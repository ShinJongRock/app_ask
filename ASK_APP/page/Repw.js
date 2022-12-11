import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React,{  useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
  Image,
  titleText,
  Button
} from 'react-native';

import appLogo from '../img/ask.png';
import axios from 'axios';


const STORAGE_KEY = "@toDos";

export default function Repw({navigation}) {


  const [repw, setRepw]= React.useState(null);

  const idatat =() => {
    AsyncStorage.getItem('mb_id')
  }


    
  const isLogin = async () => {
    // const userId = await AsyncStorage.getItem('id')
    // if (userId) {
    //   Alert.alert(userId+"님 반갑습니다.")
    //   navigation.navigate("Home")
    // }
  }

  //링크 이동
  const moveNavigate = (screen) => {
    navigation.navigate(screen)
  }

  const Repw = async () => {
    console.log("mb_id", await AsyncStorage.getItem('mb_id'));
    console.log("mb_pw", await AsyncStorage.getItem("mb_pw"))
    console.log("updatePw", repw)

    const id = await AsyncStorage.getItem("mb_id");
    const pw = await AsyncStorage.getItem("mb_pw")

    await axios
    .post("http://192.168.2.82:5000/mbFirstUpdate",
      {
       
        mb_id:  id,
        mb_pw: pw,
        updatePw:  repw,


      })
      .then((res) => {
        console.log(res.data);
        if(res.data){
            alert("비밀번호 변경 되었습니다.");
            navigation.navigate("Loginpage")

        }else{
            alert("비밀번호 병경 실패하셨습니다");
        }
      
      
      })
      .catch(function (error) {
        console.log(error);
      });
  };





  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
    



                
    <View style={styles.tm}>
        <View>
         
            <Image resizeMode="contain" style={styles.Image} source={appLogo}/>
          
        </View>
{/* 
        <View>
          <Text style={styles.TextSize}>
          비밀번호 변경
          </Text>
        </View> */}

    </View>
    <View style={styles.ip} >
        <SafeAreaView>
          <Text style={styles.text}>기존 비밀번호</Text>
          <TextInput
          style={styles.input}
          onChangeText={setRepw}
         
          placeholder="기존 비밀번호"
          keyboardType="email"
          />

          <Text style={styles.text}>변경 비밀번호</Text>
          <TextInput
          style={styles.input}
        
          onChangeText={setRepw}
          placeholder="변경 비밀번호"
          keyboardType="email"
          />

          <Text style={styles.text}>비밀번호 확인</Text>
          <TextInput
          style={styles.input}
        
          onChangeText={setRepw}
          placeholder="비밀번호 확인"
          keyboardType="email"
          />
    
    
   
   
        </SafeAreaView>
      </View>
              <View style={styles.bm}>

                  <TouchableHighlight
                      style={styles.btu}

                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={(screen) =>{Repw()}}>


                      <View style={styles.loginBtn}>
                          <Text style={styles.loginText}>변경</Text>
                      </View>
                  </TouchableHighlight>
              </View>


          
          {/* <View style={{  width: '75%', height: '50%', backgroundColor: "white", alignItems: 'center' }}>
            <Text style={styles.baseText}>
              {"기존 비밀번호"}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setRepw}
            />

          </View>
          <View style={{ width: '75%', height: '50%', backgroundColor: "white", alignItems: 'center' }}>
            <Text style={styles.baseText}>
              {"변경 비밀번호"}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setRepw}
            />

          </View>
          <View style={{  width: '75%', height: '50%', backgroundColor: "white", alignItems: 'center' }}>
            <Text style={styles.baseText}>
              {"비밀번호 확인"}
            </Text>
            <TextInput
              style={styles.input}
           
              onChangeText={setRepw}
            />

          </View>
          <View style={{ width: '75%', height: '80%', alignItems: 'center', marginBottom: 10 }}>

            <Button
              title="변경"
              onPress={(screen) =>{Repw()}}
              buttonStyle={{
                backgroundColor: 'rgba(78, 116, 289, 1)',
                borderRadius: 3,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
          </View> */}
        </View>
   

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    alignItems: 'center',
    justifyContent: 'center',
  },
  test1: {
    flex: 8,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold"
  },
  baseText: {
    margin: 10,
    fontSize: 10,
    fontWeight: "bold",
  },
  input: {
    alignItems: 'center',
    height: 40,
    width: '80%',
    marginLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7
  },
  submitButton: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10
  },
  Image:{
    width: 200,
    height:100,
  },
  tm:{
    alignItems: 'center',
    justifyContent: 'center',
    margin:20,
    bottom:30
  
    
  },  text:{
    width:200,
    margin: 5,
    top:0,
    fontSize:20
  },
  input: {

    width:250,
    height: 50,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    top:0,
    borderRadius: 10,
    
  },
  TextSize:{
    fontSize:30,
    
  },  btu:{
    marginTop: 24 ,
    backgroundColor:'#005b9e',
    justifyContent:'center',
    alignItems:'center',
    height:40,
    width:250,
    borderRadius: 10,

  },
  loginText:{
    color:'white',
    justifyContent:'center',
    alignItems:'center'
  }

  // test2 : {
  //   flex : 1,
  //   width:'75%',
  //   margin: 30,
  //   height:'90%',
  //   backgroundColor:"blue",
  //   alignItems: 'center'
  // }
});                     