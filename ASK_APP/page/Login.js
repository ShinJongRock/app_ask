
import React, {useState} from 'react';
import { StyleSheet, Text, View,
         SafeAreaView,
         TextInput ,
         Button,
         Alert ,
         Image
        
        } from 'react-native';
import ask from '../img/ask.png';

const  Login= () => {
  const [id, setId] = useState(null);
  const [pw, setPw] = useState(null);
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
          keyboardType="numeric"
          />

          <Text style={styles.text}>비밀번호</Text>
          <TextInput
          style={styles.input}
          onChangeText={setPw}
          value={pw}
          placeholder="비밀번호"
          keyboardType="numeric"
          />
          <View      style={styles.button}>
  
          </View>
   
   
        </SafeAreaView>
      </View>
      <View style={styles.bm}>
        <Button
        style={styles.button}
        
        title="로그인"
        onPress={() => Alert.alert('로그인 되었습니다.')}
        color="#005b9e"
        top="200px"
    
      />
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
    height: 40,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    top:0
    
  },
  button:{
    width:200,
    top:100,
  
  
 

  },
  text:{
    width:200,
    margin: 5,
    top:0
  },
  ip:{
   
  },
  bm:{
    top:80,
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
  }
});
