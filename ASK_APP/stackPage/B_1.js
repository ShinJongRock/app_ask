import React, { useState } from 'react';
import axios from "axios";
import search from '../img/search.png';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
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

    const [vactCategory, setvactCategory] = useState();
    // Modal을 표시하거나 숨기기 위한 변수
    const [visibleMoal, setVisibleModal] = useState(false);


    function vact() {
        if (vactStartDate.trim() === "") {
            Alert.alert("시작날짜를 입력해주세요");
        } else if (vactEndDate.trim() === "") {
            Alert.alert("종료날짜를 입력해주세요");
        } else if (vactPeriod.trim() === "") {
            Alert.alert("휴가기간을 입력해주세요")
        } else if (vactName.trim() === "") {
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
        axios.post("http://192.168.2.91:5000/create_VactDispose",
            { compCode: "admin01" }
        ).then(function (resp) {
            console.log(resp.data);
            setvactCategory = resp.data
        }).catch(function (err) {
            console.log(`Error Message: ${err}`);
        })
    }

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
                        onChangeText={(vactName) => setvactName(vactName)}></TextInput>
                    <Modal animationType="slide"
                        transparent={true}
                        visible={visibleMoal}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}>
                            <View style={{
                                flex: 0.5,
                                borderRadius: 5,
                                borderColor: '#cccccc',
                                borderWidth: 1,
                                backgroundColor: '#ffffff',
                                padding: 5,
                            }}>
                                <Text style={{ fontSize: 20 }}>휴가항목 선택</Text>
                                {/* Modal 다이얼로그 숨기기 */}
                                <Button title='닫기' onPress={() => setVisibleModal(false)} />
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
        flex: 1, backgroundColor: "white",
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
        backgroundColor: "#2C9EF5",
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
    }

});

export default B_1;