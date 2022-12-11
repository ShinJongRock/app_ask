import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import search from '../img/search.png';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    Image,
    Style,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';


const C_1 = () => {
    
const [startDate, setStartDate] = useState();
const [endDate, setEndDate] = useState();

const [inOut1, setInOut1] = useState("");


useEffect(() => {
    search1();
}, [])


function search1() {
    let check = /^[0-9]+$/; 
    if(startDate != null || endDate != null){
        if (!check.test(startDate)) {
            Alert.alert("숫자만 입력해주세요!");
        }else if(!check.test(endDate)){
            Alert.alert("숫자만 입력해주세요!");
        } 
    }
    axios.post("http://192.168.2.91:5000/readMb_inOutInfoSearch",
        {
            compCode: "admin01",
            empCode: "008",
            startDate : startDate,
            endDate : endDate
        }
    ).then(function (resp) {
        console.log("inout1", resp.data);
        console.log("res", resp.data[0].depName)
        setInOut1(resp.data)
    }).catch(function (err) {
        console.log(`Error Message: ${err}`);
    })
}


const header = ['날짜', '출근시간', '퇴근시간','초과근무']
const data = []
if(inOut1 != null){
    for(let j=0; j<inOut1.length; j++){delete data[j]}
    for(let i=0; i<inOut1.length; i++){
        data.push([inOut1[i].inOutDate, inOut1[i].inOutStart, inOut1[i].inOutEnd, inOut1[i].inOutOver])
  }
}


    return (
        <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.titlename}>  출퇴근현황</Text>
        </View>
        <View style={styles.layout1}>
            <View style={styles.layout2}>
                <Text style={styles.font3}>날짜선택</Text>
                <TextInput style={styles.input} 
                placeholder='시작일'
                value={startDate}
                onChangeText={(startDate) => setStartDate(startDate)}>
                </TextInput>
                <TextInput style={styles.input} 
                placeholder='종료일'
                value={endDate}
                onChangeText={(endDate) => setEndDate(endDate)}></TextInput>
                <TouchableOpacity onPress={() => {search1();}}>
                        <Image resizeMode="contain" source={search} style={styles.imgStyle} />
                </TouchableOpacity>
            </View>

            <ScrollView style={{marginTop : 40}}>
            <Text style={styles.font3} onPress={() => {setStartDate(null); setEndDate(null); search1()}}>목록</Text>
            <Table borderStyle={{
             borderWidth:1,
             borderColor: 'black',
             borderTopColor:"red",
            }}>
                <Row textStyle={styles.TableText1} style={styles.t1} data={header} />
                <Rows textStyle={styles.TableText} data={data} />
            </Table>
            </ScrollView>
        </View>

  
    </View>
    );
};

export default C_1;

const styles = StyleSheet.create({
    imgStyle: {
        width: 40,
        height: 40,
        marginTop : 15,
        marginLeft : 10,
    },
    input: {
        backgroundColor: "white",
        marginLeft: 20,
        borderColor: 'black',
        borderBottomWidth: 1,
        width: "25%",
        height :35,
        marginTop : 10
    },
    container: {
        flex: 1, backgroundColor: "white",
    },
    title: {
        flex: 0.7,     backgroundColor: "#005b9e",
        justifyContent: "center",

    },
    titlename: {
        fontSize: 25,
        fontWeight: "500",
        marginLeft: 20,
        color :"white"
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
    },
    layout2: {
        flexDirection : 'row',
        backgroundColor: "white",
        justifyContent: "left",
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
        marginBottom :15
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
        color:"white"
    },
    TableText:{
       textAlign:'center',
        fontSize:18,
    },
    t1:{
        backgroundColor:'gray'
    },
    

});