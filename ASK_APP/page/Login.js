
import React, {useState} from 'react';
import { StyleSheet, Text, View,
         SafeAreaView,
         TextInput ,
         Button,
         Alert ,
         Image,
         KeyboardAvoidingView,
         TouchableOpacity,
         TouchableHighlight,
         sessionStorage
        
        } from 'react-native';
import ask from '../img/ask.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const  Login= ({navigation}) => {
  const [id, setId] = React.useState(null);
  const [pw, setPw] = React.useState(null);
  const [name, setname] = React.useState(null);
  const [compCode, setCompCode] = React.useState(null);
  const [mbCode, setMbCode] = React.useState(null);

    //로그인 여부 확인
    React.useEffect(() => {
        AsyncStorage.clear();
      
    }, [])

    const isLogin = async () => {
    const userId = await AsyncStorage.getItem('mb_id')
    const userpw = await AsyncStorage.getItem('mb_pw')
    const username = await AsyncStorage.getItem('mb_name')
    const usercompCode = await AsyncStorage.getItem('compCode')
    const usercode= await AsyncStorage.getItem('mb_code')
    const firstCheck = await AsyncStorage.getItem('firstCheck')

    console.log("이름:"+username);
    console.log("코드:"+firstCheck);

    if (firstCheck==1) {
      Alert.alert(username+"님 반갑습니다.")
      navigation.navigate("main")
    }else if(username != null && firstCheck == 0){
        Alert.alert(username+"초기 비밀번호를 수정해주세요")
        navigation.navigate("Repw")

    }else{
        console.log("둘 다 안됨")
    }
  }





  //링크 이동
  const moveNavigate = (screen) => {
    navigation.navigate(screen)
  }

  const login = async () => {
    await axios
    .post("http://192.168.2.82:5000/mbLogin",
        {
            mb_id: id,
            mb_pw:pw
        }
      )
      .then((res) => {

        //   Alert.alert(id + "님 반갑습니다.")
        if(res.data != null){
            AsyncStorage.setItem('mb_id', res.data.mb_id);
            AsyncStorage.setItem('mb_pw', res.data.mb_pw);
            AsyncStorage.setItem('mb_name', res.data.mb_name);
            AsyncStorage.setItem('compCode', res.data.compCode);
            AsyncStorage.setItem('mb_code', res.data.mb_code);
            AsyncStorage.setItem('firstCheck', res.data.firstCheck);

          console.log(res.data.mb_id)
          console.log(res.data.firstCheck)

          isLogin();
        } else {
          // 1이라면 실패
          alert("로그인에 실패하셨습니다.");
        }
        console.log(res.data )
        




        return res;
      })
      
      .then((res) => {
        if (id === "") {
          alert("아이디를 입력해주세요.");
          return;
        } else if (pw === "") {
          alert("비밀번호를 입력해주세요.");
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


      



  return (
    <View style={styles.container}>
    
      
    <View style={styles.tm}>
        <View>
         
            <Image resizeMode="contain" style={styles.Image} source={ask}/>
          
        </View>

        <View>
          <Text style={styles.TextSize}>
            로그인
          </Text>
        </View>

    </View>




      <View style={styles.ip} >
        <SafeAreaView>
          <Text style={styles.text}>아이디</Text>
          <TextInput
          style={styles.input}
          onChangeText={setId}
          value={id}
          placeholder="아이디"
          keyboardType="email"
          />

          <Text style={styles.text}>비밀번호</Text>
          <TextInput
          style={styles.input}
          onChangeText={setPw}
          value={pw}
          placeholder="비밀번호"
          keyboardType="email"
          />
          <View      style={styles.button}>
  
          </View>
   
   
        </SafeAreaView>
      </View>
      <View style={styles.bm}>

          <TouchableHighlight
            style={styles.btu}

            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={(screen) => {login()}}>


            <View style={styles.loginBtn}>
              <Text style={styles.loginText}>로그인</Text>
            </View>
          </TouchableHighlight>
        </View>

    
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input: {

    width:300,
    height: 50,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    top:0,
    borderRadius: 10,
    
  },
  button:{
    width:200,
    top:100,
  
  
 

  },
  text:{
    width:200,
    margin: 5,
    top:0,
    fontSize:20
  },
  ip:{
   
  },
  bm:{
    top:70,
    width:'70%',
  },
  tm:{
    alignItems: 'center',
    justifyContent: 'center',
   
    bottom:50
    
  },
  Image:{
    width: 200,
    height:100,
  },
  TextSize:{
    fontSize:30
  },
  btu:{
    marginTop: 24 ,
    backgroundColor:'#005b9e',
    justifyContent:'center',
    alignItems:'center',
    height:40,
    borderRadius: 10,

  },
  loginText:{
    color:'white',
    justifyContent:'center',
    alignItems:'center'
  }
});
