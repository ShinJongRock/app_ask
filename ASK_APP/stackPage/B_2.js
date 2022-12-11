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

const B_2 = () => {
    const [date, setDate] = useState("");
    const [empVact, setEmpVact] = useState("");


    function getVact() {
        console.log("getVact");
        axios.post("http://192.168.2.91:5000/read_empVact",
            {
                compCode: "admin01",
                empName: "최범근",
                empNum: "008"
            }
        ).then(function (resp) {
            console.log(resp.data);
            setDate(resp.data)
        }).catch(function (err) {
            console.log(`Error Message: ${err}`);
        })
    }

    function getempVact() {
        console.log("getVact");
        axios.post("http://192.168.2.91:5000/checkVactlist",
            {
                compCode: "admin01",
                empNum: "008"
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
            data.push( [empVact[i].vactStartDate+"~\n"+empVact[i].vactEndDate,+ empVact[i].vactPeriod,empVact[i].vactName, empVact[i].vactState, empVact[i].vactNote])
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
                    <Row textStyle={styles.TableText1} style={styles.t1} data={header} />
                    <Rows textStyle={styles.TableText} style={styles.t2} data={data} />
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
        flex: 0.7, backgroundColor: "#005b9e",
        justifyContent: "center",
        alignItems: "left",

    },
    titlename: {
        color :"white",
        fontSize: 25,
        fontWeight: "500",
        marginLeft: 20,
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
        color:"white"
    },
    TableText:{
       textAlign:'center',
       justifyContent:'center',
        fontSize:15,
        margin:10
       
    },
    t1:{
        backgroundColor:'#777777',
     
    },
    t2:{
        borderBottomWidth:1
    }
    

});