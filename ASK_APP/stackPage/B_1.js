import React, { useEffect, useState } from 'react';
import axios from "axios";
import search from '../img/search.png';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    Image,
    TouchableOpacity,
    Modal,
    Button
} from 'react-native';

const B_1 = () => {

    const [vactStartDate, setvactStartDate] = useState("");
    const [vactEndDate, setvactEndDate] = useState("");
    const [vactPeriod, setvactPeriod] = useState("");
    const [vactName, setvactName] = useState("");
    const [vactDetail, setvactDetail] = useState("");

    const [vactCategory, setvactCategory] = useState("");
    // Modal을 표시하거나 숨기기 위한 변수
    const [visibleMoal, setVisibleModal] = useState(false);
   

    function vact() {
        let check = /^[0-9]+$/; 
        if (vactStartDate.trim() === "") {
            Alert.alert("시작날짜를 입력해주세요");
        }else if(!check.test(vactStartDate)){
            Alert.alert("숫자만 입력해주세요!");
        } 
        else if(!check.test(vactEndDate)){
            Alert.alert("숫자만 입력해주세요!");
        } 
        else if (vactEndDate.trim() === "") {
            Alert.alert("종료날짜를 입력해주세요");
        } else if (vactPeriod.trim() === "") {
            Alert.alert("휴가기간을 입력해주세요")
        }else if(!check.test(vactPeriod)){
            Alert.alert("숫자만 입력해주세요!");
        }  
        else if (vactName.trim() === "") {
            Alert.alert("휴가항목을 선택해주세요")
        }
        else {

            axios.post("http://192.168.2.91:5000/create_VactDispose",
                {
                    vactStartDate: vactStartDate,
                    vactEndDate: vactEndDate,
                    vactPeriod: vactPeriod,
                    vactName: vactName,
                    vactDetail: vactDetail,
                    compCode: "admin01",
                    empName: "최범근",
                    depName: "개발부",
                    empNum: "008"
                }
            ).then(function (resp) {
                console.log(resp.data);

                if (resp.data !== null && resp.data != "") {
                    Alert.alert("휴가신청이 완료되었습니다")

                } else {

                }
            }).catch(function (err) {
                console.log(`Error Message: ${err}`);
            })
        }
    }

    function getVactName() {
        console.log("getVact");
        axios.post("http://192.168.2.91:5000/read_Vactcategory",
            { compCode: "admin01" }
        ).then(function (resp) {
            console.log(resp.data);
            setvactCategory(resp.data)
        }).catch(function (err) {
            console.log(`Error Message: ${err}`);
        })
    }

    useEffect(() => {
        getVactName();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titlename}>  휴가신청</Text>
            </View>
            <View style={styles.content}>

                <View style={styles.date}>
                    <Text style={styles.dateText}>날짜선택</Text>
                    <TextInput style={styles.input} placeholder='날짜입력' value={vactStartDate}
                        onChangeText={(vactStartDate) => setvactStartDate(vactStartDate)}></TextInput>
                </View>

                <View style={styles.date}>
                    <Text style={styles.dateText}>               </Text>
                    <TextInput style={styles.input} placeholder='날짜입력' value={vactEndDate}
                        onChangeText={(vactEndDate) => setvactEndDate(vactEndDate)}></TextInput>
                </View>

                <View style={styles.date1}>
                    <Text style={styles.dateText}>휴가기간</Text>
                    <TextInput style={styles.input} placeholder='휴가기간' value={vactPeriod}
                        onChangeText={(vactPeriod) => setvactPeriod(vactPeriod)}></TextInput>
                </View>

                <View style={styles.date1}>
                    <Text style={styles.dateText1}>휴가항목</Text>
                    <TextInput style={styles.input1} value={vactName} 
                        onChangeText={(vactName) => setvactName(vactName)}
                        >
                        </TextInput>
                    <Modal animationType="slide"
                        transparent={true}
                        visible={visibleMoal}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5
                        
                        }}>
                            <View style={{
                                alignItems: 'center',
                                flex: 0.7,
                                borderRadius: 20,
                                borderColor: '#cccccc',
                                borderWidth: 1,
                                backgroundColor: 'white',
                                padding: 5,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5
                             
                            }}>
                                <View style={styles.modalline}>
                                    <Text style={{ fontSize: 22 , marginTop :22 , marginBottom :15, fontWeight: "bold", color:"white"}}>휴가항목 선택</Text>
                                </View>
                                <View style={styles.modalline2}>
                                {
                                vactCategory && vactCategory.map((el) =>
                                    <Text style={styles.modalText} onPress={() => {setVisibleModal(false);setvactName(el.vactName)}}>{el.vactName}</Text>
                                )}
                                </View>
                                <View style={styles.btn}>
                                <TouchableOpacity onPress={() => setVisibleModal(false)} style={styles.modalText1}>
                                    <Text style={{color:"white"}}>닫기</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity onPress={() => setVisibleModal(true)}>
                        <Image resizeMode="contain" source={search} style={styles.imgStyle} />
                    </TouchableOpacity>
                </View>

                <View style={styles.dateBox2}>
                    <Text style={styles.datedetail}>휴가상세</Text>
                    <TextInput style={styles.inputBox} value={vactDetail}
                        onChangeText={(vactDetail) => setvactDetail(vactDetail)}></TextInput>
                </View>
            </View>

            <View style={styles.button}>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttonStyle} >
                        <Text style={{ color: "white" }} onPress={() => vact()}>신청</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle2}>
                        <Text style={{ color: "white" }}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "white",
    },
    title: {
        flex: 1, backgroundColor: "#005b9e",
        justifyContent: "center",
        alignItems: "left",
    },
    titlename: {
        color :"white",
        fontSize: 25,
        fontWeight: "500",
        marginLeft: 20,
    },
    content: {
        flex: 7, backgroundColor: "white",
        marginTop: 40,
    },
    button: {
        flex: 2, backgroundColor: "white",
        borderTopWidth: 3,
        borderColor: "gray",
    },
    input: {
        backgroundColor: "white",
        marginLeft: 30,
        borderBottomWidth: 1,
        borderColor: "black",
        width: "50%",
    },
    input1: {
        marginBottom: 10,
        backgroundColor: "white",
        marginLeft: 30,
        borderBottomWidth: 1,
        borderColor: "black",
        width: "50%",
    },
    inputBox: {
        backgroundColor: "white",
        marginLeft: 30,
        borderWidth: 1,
        borderColor: "black",
        width: "50%",
        height: "600%",

    },
    date: {
        backgroundColor: "white",
        justifyContent: "left",
        flexDirection: "row",
        marginTop: 20
    },
    date1: {
        backgroundColor: "white",
        justifyContent: "left",
        flexDirection: "row",
        marginTop: 30
    },
    dateBox: {
        backgroundColor: "white",
        justifyContent: "left",
        flexDirection: "row",
        marginTop: 70,
    },
    dateBox2: {
        backgroundColor: "white",
        // justifyContent :"left",
        flexDirection: "row",
        marginTop: 70,
    },
    dateText: {
        backgroundColor: "white",
        fontSize: 20,
        alignItems: "left",
        marginLeft: 30,
    },
    dateText1: {
        backgroundColor: "white",
        fontSize: 20,
        alignItems: "left",
        marginLeft: 30,
        marginTop: 10,
    },
    datedetail: {
        backgroundColor: "white",
        fontSize: 20,
        // alignItems : "left",
        marginLeft: 30,
        // marginTop: 30
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "center",
        justifyContent: 'space-around',
    },
    buttonStyle: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#005b9e",
        width: 150,
        height: 50,
        margin: 20,
        borderRadius: 10
    },
    buttonStyle2: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#A5B7C0",
        width: 150,
        height: 50,
        margin: 20,
        borderRadius: 10
    },
    imgStyle: {
        width: 40,
        height: 40,
    },
    modalText: {
        top:5,
        fontSize: 20,
        margin: 10
    },
    modalText1: {
        // marginBottom : 22,
        fontSize: 20,
        // marginTop: 20,
        color : "white",
        borderRadius: 10,
        padding: 10,
        margin: 4,
        elevation: 2,
        borderWidth: 1,
        backgroundColor : "#005b9e",
        borderColor: "#B3B3B3",
        width : 70,
        height : 40,
        alignItems:"center",
        justifyContent:"center"

    },modalline:{
        height:60,
        width:"100%",
        borderRadius: 10,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:"#005b9e",
        
        // fontWeight : "500"
    },
    modalline2:{
        backgroundColor:'white',

    },
    btn:{
        margin:15,
        
        width:'100%',
        height:30,
        alignItems:"center",
        borderTopWidth:1
    }

});

export default B_1; 