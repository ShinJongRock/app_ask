
import React, { useEffect, useState ,Component } from 'react';
import {
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
    ScrollView,

} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";



const A_2 = () => {
  const [date, setDate] = useState("");
  const [empVact, setEmpVact] = useState("");





  const expenseSearch =async ()=>{
    const compCode = await AsyncStorage.getItem("compCode");
    const empName  = await AsyncStorage.getItem("mb_name");
    await axios
    .post("http://192.168.2.82:5000/expenseSearch",
      {
       
        compCode:  compCode,
        empName :empName

      })
      .then((res) => {
        setEmpVact(res.data)
        console.log(res.data);
    
      
      
      })
      .catch(function (error) {
        console.log(error);
      });
  }






  useEffect(() => {
      
      expenseSearch();
   
  }, [])
  

  const header = ['날짜', '부서명', '사원명','항목','승인' ,'금액']
  const data = []

  if(empVact != null){
    console.log("시발",empVact);
      for(let i=0; i<empVact.length; i++){
          data.push( [empVact[i].expenseDate, empVact[i].depCode, empVact[i].empName, empVact[i].expenseName, empVact[i].approval, empVact[i].price, ])
    }
  }
 

    return (
      <View style={styles.mom}>
       
      <ScrollView>
       <Table  borderStyle={{borderWidth: 1, borderColor: '#777777',alignItems:'center',justifyContent:'center', }}>
          <Row data={header}style={styles.head} textStyle={styles.text}/>
          <Rows data={data}textStyle={styles.text1}/>
        </Table>
      </ScrollView>
      </View>
    );
};

export default A_2;
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "white",
    },
    title: {
        flex: 0.7, backgroundColor: "white",
        justifyContent: "center",
        alignItems: "left",
        borderBottomWidth: 3,
        borderColor: "gray",

    },
    titlename: {
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 20,
        marginTop: 30,
    },
    layout: {
        flex: 0.7, backgroundColor: "white",
        justifyContent: "left",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "gray",
    },
    layout1: {
        flex: 5,
        backgroundColor: "white",
        justifyContent: "left",
        margin: 15,
    },
    font: {
        fontSize: 20,
        marginLeft: 30,
    },
    font1: {
        fontSize: 20,
        marginLeft: 5,
    },
    font2: {
        fontSize: 20,
        marginLeft: 60,
    },
    font3: {
        fontSize: 20,
        marginLeft: 15,
        marginTop: 20,
    },
    table1: {
        border: 2,
        borderColor: "black",
        textAlign:'center'
    },
    TableText1:{
       height:30,
       fontSize:15,
       textAlign:'center',
        top:5,
         color:'white'
    },
    TableText:{
       textAlign:'center',
        fontSize:10,
         
    },
    t1:{
        
    },
    text:{
      fontSize:20,
      textAlign:'center',
      color:'white'
      
     
    },
    text1:{
      fontSize:20,
      textAlign:'center',
     
    },



  head:{
  
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#005b9e',
    // fontcolor:'white',
 
  },
  mom:{ 

  }

});