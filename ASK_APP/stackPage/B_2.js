import { Table, Row, Rows } from 'react-native-table-component';
import axios from "axios";
import React, { useEffect, useState } from 'react';
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
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const B_2 = () => {
    const [date, setDate] = useState("");
    const [empVact, setEmpVact] = useState("");


     const getVact= async() =>{

        const compCode = await AsyncStorage.getItem("compCode");
        const empName  = await AsyncStorage.getItem("mb_name");
        const empNum = await AsyncStorage.getItem("mb_code");

        console.log("나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨나 실행됨");
        axios.post("http://192.168.2.91:5000/read_empVact",
            {
                compCode: compCode,
                empName: empName,
                empNum: empNum
            }
        ).then(function (resp) {
            console.log(resp.data);
            setDate(resp.data)
        }).catch(function (err) {
            console.log(`Error Message: ${err}`);
        })
    }

     const getempVact= async() => {
        const compCode = await AsyncStorage.getItem("compCode");
        const empNum = await AsyncStorage.getItem("mb_code");

        console.log("gfdggfg",getVact);
        axios.post("http://192.168.2.91:5000/checkVactlist",
            {
                compCode: compCode,
                empNum: empNum
            }
        ).then(function (resp) {
            console.log("getempVact", resp.data);
            console.log("res", resp.data[0].depName)
            setEmpVact(resp.data)
        }).catch(function (err) {
            console.log(`Error Message: ${err}`);
        })
    }
    
    useEffect(() => {
        getVact();
        getempVact();
    }, [])
    
    console.log("사이즈",empVact.length);
    const header = [ '날짜', '휴가기간', '휴가항목','상태', ,'비고']
    const data = []

    if(empVact != null){
        for(let i=0; i<empVact.length; i++){
            data.push( [empVact[i].vactStartDate+"      \n~\n"+empVact[i].vactEndDate,+ empVact[i].vactPeriod,empVact[i].vactName, empVact[i].vactState, empVact[i].vactNote])
      }
    }


  
    return (
        <View style={styles.container}>

            <View style={styles.title}>
                <Text style={styles.titlename}>  휴가조회</Text>
            </View>

            <View style={styles.layout}>
                <Text style={styles.font}>총 휴가:</Text>
                {date && date.map((el) =>
                    <Text style={styles.font1}>{el.totalVacation}</Text>
                )}
                <Text style={styles.font2}>잔여휴가:</Text>
                {date && date.map((el) =>
                    <Text style={styles.font1}>{el.remindVacation}</Text>
                )}
            </View>

            <View style={styles.layout1}>

                <View>
                    <Text style={styles.font3}>신청 휴가 현황</Text>
                </View>
                
                <ScrollView style={{marginTop : 20}}>
                <Table borderStyle={{
                    // borderWidth:1,
                    
               
                }}>
                    <Row textStyle={styles.tableText1} style={styles.t1} data={header} />
                    <Rows textStyle={styles.tableText} style={styles.t2} data={data} />
                </Table>
                </ScrollView>
            </View>

        </View>
    );
};

export default B_2;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "white",
    },






    title: {
        flex: 0.3,
        backgroundColor: "#005b9e",
        justifyContent: "center",
        
       
    },
    titlename: {
        color :"white",
        fontSize: 25,
        fontWeight: "500",
        marginLeft: 5,
    },
    layout: {
        flex: 0.7, backgroundColor: "white",
       
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "gray",
    },
    layout1: {
        flex: 5,
        backgroundColor: "white",
        // justifyContent: "left",

     
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
    tableText1:{
       height:30,
       fontSize:15,
       textAlign:'center',
        top:5,
        color:"white"
    },
    tableText:{
       textAlign:'center',
       justifyContent:'center',
        fontSize:13,
        margin:10
       
    },
    t1:{
        backgroundColor:'#777777',
        height:45
     
    },
    t2:{
        borderBottomWidth:1
    }
    

});