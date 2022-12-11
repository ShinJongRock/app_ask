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
    TextInput,
    Keyboard,
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import cameraImg from '../img/camera.png';
import galary from '../img/galary.png';
import { createStackNavigator } from '@react-navigation/stack'; // Stack 네비게이션
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 카메라 import
import { Camera, CameraType } from 'expo-camera';

// 갤러리 import
import * as ImagePicker from 'expo-image-picker';

// stackNavigator 변수 설정
const Stack = createStackNavigator();



// MainBPage 경비등록 컴포넌트
function MainBPage({ navigation }) {
    // ------------------------ < 카메라 관련 설정 > ------------------------ 
    const [cameraModalVisible, setCameraModalVisible] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraOnModalVisible, setCameraOnModalVisible] = useState(false);
    const [scannedImage, setScannedImage] = useState();

    // const setA = async (value) =>{
    //     setImage(value);
    // }

    // ------------------------ < 갤러리 관련 설정 > ------------------------ 
    const [galaryModalVisible, setGalaryModalVisible] = useState(false);
    const [hasGalaryPermission, setHasGalaryPermission] = useState(null);
    const [image, setImage] = useState("");
    const [send, setSend] = useState("");
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const galaryFormData = new FormData();

    // ------------------------ < 카메라 기능 > ------------------------
    // 권한 허용 했는가 안했는가 체크
    const [check, setCheck] = useState(false);

    // 사진찍고 페이지 이동
    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            // await setA(data.uri);
            // navigation.navigate(screen, image);
            console.log(data.uri);
            // setCheckProps(true);
            navigation.navigate('CameraPage', {
                image: data.uri
            })
            setCameraOnModalVisible(false);

        } else {
            Alert.alert(
                '사진 등록에 실패하였습니다.'
            )
        }
    }

    // 모달창 띄우기
    const onModal = () => {
        // 첫 권한 신청 혹은 권한 없음
        if (hasCameraPermission === null) {
            setCameraModalVisible(true);
        } else {
            // 카메라 띄우기
            setCameraOnModalVisible(true);
            setCheck(true);
        }
    }

    // 권한 거절, 허용
    const checkPermission = async () => {
        // 카메라 권한 허용
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
        setCameraModalVisible(false);

        // 카메라 띄우기
        setCameraOnModalVisible(true);
        setCheck(true);
    }


    // ------------------------ < 갤러리 기능 > ------------------------
    const galarySetting = async () => {
        console.log(status.granted);


        if (!status.granted) { // status로 권한이 있는지 확인
            const permission = await requestPermission();
            console.log("permission", permission)
            if (!permission.granted) {
                return null;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1]
        });

        // if (result.canceled) {
        //     console.log("여기있어요5")
        //     return null;
        // }

        console.log(result);
        setImage(result.assets[0].uri);

        //  ------- 선택한 이미지를 서버에 저장하기 위한 과정  -------
        const localUri = result.assets[0].uri;

        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const galaryType = match ? `image/${match[1]}` : `image`;
        galaryFormData.append('image', { uri: localUri, name: filename, galaryType });
        setSend(galaryFormData);
        console.log("galaryFormData", galaryFormData);
        console.log("localUri", localUri);
        console.log("filename", filename);
        console.log("type", type);

        navigation.navigate('GalaryPage', {
            image: localUri,
            data: galaryFormData
        })
    }





    // 메인 return문
    return (
        <View style={{ height: "95%", margin: 20, backgroundColor: "white", borderWidth: 1, borderRadius: 10, borderColor: '#D3D5D7' }}>

            {/* {checkProps &&
                <CameraPage navigation={navigation} content={image}/>
            } */}




            {/* 카메라 관련 check 및 모달창(권한 허용 했을 때, 이 모달창이 올라온다.) */}
            {check &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={cameraOnModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setCameraOnModalVisible(!cameraOnModalVisible);
                    }}
                >
                    <View style={{ flex: 1, margin: 20, marginTop: 40, borderRadius: 30, backgroundColor: "red" }}>
                        <View style={styles.cameraContainer}>
                            <Camera
                                ref={ref => setCamera(ref)}
                                style={styles.fixedRatio}
                                type={type}
                                ratio={'16:9'} />
                        </View>
                        <View style={styles.cameraBtns}>
                            {/* 카메라 닫기 */}
                            <TouchableOpacity
                                style={styles.cameraClose}
                                onPress={() => setCameraOnModalVisible(!cameraOnModalVisible)}
                            >
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>닫기</Text>
                                </View>
                            </TouchableOpacity>


                            {/* 카메라 촬영 */}
                            <TouchableOpacity
                                style={styles.cameraTake}
                                onPress={() => { takePicture() }}>

                                <View style={styles.cameraTake}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>등록</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
            }

            {/* 카메라 모달 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={cameraModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setCameraModalVisible(!cameraModalVisible);
                }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>카메라 접근 권한 승인
                            {"\n"}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: "normal" }} >해당 서비스 이용을 위한 접근 권한을 허용합니다.</Text>

                        <View style={{ flexDirection: "row" }}>
                            <SimpleLineIcons name="camera" size={16} color="gray" />
                            <Text>  카메라 접근 권한을 허용합니다.{"\n"}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setCameraModalVisible(!cameraModalVisible)}
                            >
                                <Text style={{ color: "white" }}>닫기</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    console.log("카메라 권한 요청")
                                    checkPermission();
                                }}
                                style={[styles.button, styles.buttonClose]}
                            >
                                <Text style={{ color: "white" }}>
                                    권한 허용
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>



            {/* 갤러리 모달 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={galaryModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setGalaryModalVisible(!galaryModalVisible);
                }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>갤러리 접근 권한 승인
                            {"\n"}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: "normal" }} >해당 서비스 이용을 위한 접근 권한을 허용합니다.</Text>

                        <View style={{ flexDirection: "row" }}>
                            <SimpleLineIcons name="picture" size={16} color="gray" />
                            <Text>  갤러리 접근 권한을 허용합니다.{"\n"}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setGalaryModalVisible(!galaryModalVisible)}
                            >
                                <Text style={{ color: "white" }}>닫기</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    console.log("갤러리 권한 요청")
                                    galarySetting()
                                    setGalaryModalVisible(false);
                                }}

                                style={[styles.button, styles.buttonClose]}
                            >
                                <Text style={{ color: "white" }}>
                                    권한 허용
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>


            {/* 경비등록 메인 페이지 화면 구성 */}
            <View style={{ height: "7%", backgroundColor: "white", justifyContent: "flex-end", borderRadius: 10 }}>
                <Text style={{ margin: 5, fontSize: 20 }}>  경비 등록</Text>
            </View>

            <TouchableOpacity onPress={() => onModal()}>
                <View style={styles.SimpleLin}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                        <Image
                            style={styles.stretch}
                            source={cameraImg}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 27 }}> 사진찍기</Text>
                    </View>
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                console.log("galary click")
                setGalaryModalVisible(true)
            }}>
                <View style={styles.imges}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                        <Image
                            style={styles.stretch}
                            source={galary}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 27 }}> 이미지사용</Text>
                    </View>


                </View>
            </TouchableOpacity>

        </View>
    );
}


// CameraPage 카메라 기능 컴포넌트
function CameraPage(route, {navigation}) {
    const [scannedImage, setScannedImage] = useState(null);
    const [check, setCheck] = useState(false);
    const [cameraSend, setCameraSend] = useState("");
    // 결과값 세팅
    const [resultAddr, setResultAddr] = useState("");
    const [resultShopName, setResultShopName] = useState("");
    const [resultTotalPrice, setResultTotalPrice] = useState("");

    
    console.log("CameraPage");
    console.log("route: ", route);
    console.log("result: ", route.route.params.image);
    const imageUri = route.route.params.image;
    console.log("imageUri: ", imageUri);
    

    const cameraOCR = async () => {
        console.log("cameraOCR");
        if (imageUri != "") {
            const filename = imageUri.split('/').pop();
            console.log("filename:", filename);
            const match = /\.(\w+)$/.exec(filename ?? '');
            console.log("match:", match);
            const cameraType = match ? `image/${match[1]}` : `image`;
            console.log("cameraType:", cameraType);

            // formData 설정
            const cameraFormData = new FormData();

            cameraFormData.append('image', { uri: imageUri, name: filename, cameraType });
            // cameraFormData.append('upload', JSON.stringify(cData));

            console.log("cameraFormData: " + cameraFormData);
            // 객체 -> JSON 문자열로 변환
            const json = JSON.stringify(cameraFormData);
            // JSON 문자열 출력
            console.log("json: " + json);

            
            await axios.post('http://192.168.2.82:5000/cameraOCR', cameraFormData,{
                headers :{
                    'Content-Type': 'multipart/form-data'
                }
            }).then( async(res) => {
                console.log("res: ", res.data);
                console.log("resultAddress: ", res.data.resultAddress);
                console.log("resultShopName: ", res.data.resultShopName);
                console.log("resultTotalPrice: ", res.data.resultTotalPrice);

                setResultAddr(res.data.resultAddress);
                setResultShopName(res.data.resultShopName);
                setResultTotalPrice(res.data.resultTotalPrice);

                let rsDataAddr = res.data.resultAddress;
                let rsDataShopName = res.data.resultShopName;
                let rsDataTotalPrice = res.data.resultTotalPrice;

                if(rsDataAddr != null){
                    console.log("navigate 되기 전 resultAddr: " + rsDataAddr);
                    console.log("navigate 되기 전 resultShopName: " + rsDataShopName);
                    console.log("navigate 되기 전 resultTotalPrice: " + rsDataTotalPrice);
                    await route.navigation.navigate("OCRresult", {
                        image: imageUri,
                        resultAddress: rsDataAddr,
                        resultShopName: rsDataShopName,
                        resultTotalPrice: rsDataTotalPrice
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }


    return (
        
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} >
                {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
            </View>
            <View style={styles.cameraBtns}>
                <TouchableOpacity onPress={() => {
                    console.log("카메라 닫기");
                    route.navigation.goBack();
                }}
                     style={styles.galaryBase}>
                    <Text style={styles.galaryText}>닫기</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    console.log("카메라 axios 전송");
                    cameraOCR();
                }}
                    style={styles.galaryBase}>
                    <Text style={styles.galaryText}>전송</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


// GalaryPage 갤러리 기능 컴포넌트
function GalaryPage(route) {
    const [scannedImage, setScannedImage] = useState(null);
    const [check, setCheck] = useState(false);
    const [cameraSend, setCameraSend] = useState("");
    // 결과값 세팅
    const [resultAddr, setResultAddr] = useState("");
    const [resultShopName, setResultShopName] = useState("");
    const [resultTotalPrice, setResultTotalPrice] = useState("");


    console.log("GalaryPage");
    console.log("route:", route);
    console.log("result:", route.route.params.image);
    const imageUri = route.route.params.image;
    console.log("imageUri: ", imageUri);


    const galaryUpload = async () => {
        console.log("uploadGalary");
        if (imageUri != "") {
            const filename = imageUri.split('/').pop();
            console.log("filename:", filename);
            const match = /\.(\w+)$/.exec(filename ?? '');
            console.log("match:", match);
            const cameraType = match ? `image/${match[1]}` : `image`;
            console.log("cameraType:", cameraType);

            // formData 설정
            const cameraFormData = new FormData();

            cameraFormData.append('image', { uri: imageUri, name: filename, cameraType });
            // cameraFormData.append('upload', JSON.stringify(cData));

            console.log("cameraFormData: " + cameraFormData);
            // 객체 -> JSON 문자열로 변환
            const json = JSON.stringify(cameraFormData);
            // JSON 문자열 출력
            console.log("json: " + json);

            
            await axios.post('http://192.168.2.82:5000/cameraOCR', cameraFormData,{
                headers :{
                    'Content-Type': 'multipart/form-data'
                }
            }).then( async(res) => {
                console.log("res: ", res.data);
                console.log("resultAddress: ", res.data.resultAddress);
                console.log("resultShopName: ", res.data.resultShopName);
                console.log("resultTotalPrice: ", res.data.resultTotalPrice);

                setResultAddr(res.data.resultAddress);
                setResultShopName(res.data.resultShopName);
                setResultTotalPrice(res.data.resultTotalPrice);

                let rsDataAddr = res.data.resultAddress;
                let rsDataShopName = res.data.resultShopName;
                let rsDataTotalPrice = res.data.resultTotalPrice;

                if(rsDataAddr != null){
                    console.log("navigate 되기 전 resultAddr: " + rsDataAddr);
                    console.log("navigate 되기 전 resultShopName: " + rsDataShopName);
                    console.log("navigate 되기 전 resultTotalPrice: " + rsDataTotalPrice);
                    await route.navigation.navigate("OCRresult", {
                        image: imageUri,
                        resultAddress: rsDataAddr,
                        resultShopName: rsDataShopName,
                        resultTotalPrice: rsDataTotalPrice
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }




    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
            </View>
            <View style={styles.cameraBtns}>
                <TouchableOpacity onPress={() => {
                    console.log("갤러리 닫기");
                    route.navigation.goBack();
                }}
                     style={styles.galaryBase}>
                    <Text style={styles.galaryText}>닫기</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    console.log("갤러리 axios 전송")
                    galaryUpload();
                }}
                    style={styles.galaryBase}>
                    <Text style={styles.galaryText}>전송</Text>
                </TouchableOpacity>
            </View>
        </View>

        
    )
}



// Camera, Galary결과 컴포넌트
function OCRresult(route) {
    console.log("OCRresult");
    console.log("route:", route);
    console.log("result:", route.route.params.image);
    // 이미지
    let imageUri = route.route.params.image;
    console.log("imageUri: " + imageUri);
    // 주소
    let rsAddress = route.route.params.resultAddress;
    console.log("rsAddress: " + rsAddress);
    // 매장명
    let rsShopName = route.route.params.resultShopName;
    console.log("rsShopName: " + rsShopName);
    // 총 가격
    let rsTotalPrice = route.route.params.resultTotalPrice;
    console.log("rsTotalPrice: " + rsTotalPrice);

    // 현재 날짜 구하기
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let nowDate = String(year) + String(month) + String(day);
    console.log("현재날짜 : " + nowDate);

    // textInput의 value 세팅 값들
    const [dataDate, setDataDate] = useState(nowDate);              // 요청날짜
    const [dataPrice, setDataPrice] = useState(rsTotalPrice);       // 총 가격
    const [dataAddr, setDataAddr] = useState(rsAddress);            // 주소
    const [dataShopName, setDataShopName] = useState(rsShopName);   // 매장명
    const [dataItem, setDataItem] = useState("");                   // 항목(ex. 식비)



    
    const createExpense = async() => {
        const filename = imageUri.split('/').pop();
        console.log("filename:", filename);
        const match = /\.(\w+)$/.exec(filename ?? '');
        console.log("match:", match);
        const cameraType = match ? `image/${match[1]}` : `image`;
        console.log("cameraType:", cameraType);


        // formData 설정
        const cameraFormData = new FormData();
        // axios로 보낼 사원 데이터 값
        const cData =  {
            compCode: await AsyncStorage.getItem("compCode"),   // 회사코드
            requestDate: dataDate,                              // 요청날짜
            empNum: await AsyncStorage.getItem("empNum"),       // 사원코드
            empName: await AsyncStorage.getItem("empName"),     // 사원이름
            depCode: await AsyncStorage.getItem("depCode"),     // 부서코드
            depName: await AsyncStorage.getItem("depName"),     // 부서명
            shopName: dataShopName,                             // 매장명
            expenseName: dataItem,                              // 항목(ex. 식비)
            totalPrice: dataPrice,                              // 총 가격
            shopAddress: dataAddr                               // 주소
        }

        cameraFormData.append('image', { uri: imageUri, name: filename, cameraType });
        cameraFormData.append('upload', JSON.stringify(cData));

        console.log("cameraFormData: " + cameraFormData);
        // 객체 -> JSON 문자열로 변환
        const json = JSON.stringify(cameraFormData);
        // JSON 문자열 출력
        console.log("json: " + json);

        if(imageUri != null && dataDate != null && dataPrice != null && dataAddr != null && dataShopName != null && dataItem != null){
            await axios.post('http://192.168.2.82:5000/uploadCamera', cameraFormData,{
                headers :{
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log("경비추가 결과: " + res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return(
        <View style={styles.mom}>
            {/* 이미지 뷰 */}
            <View style={styles.topimg}>
                <Image source={{ uri: imageUri }} style={styles.asd} />
            </View>

            {/* 입력 뷰 */}
            <View style={styles.med}>
                <View style={styles.m1}>
                    <Text style={styles.tect1}>날짜</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setDataDate}
                        value={dataDate}
                        // placeholder={nowDate}
                        keyboardType="number-pad"
                    >
                        &nbsp;
                    </TextInput>
                </View>
                <View style={styles.m1}>
                    <Text style={styles.tect1}>금액</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setDataPrice}
                        value={dataPrice}
                        // placeholder={rsTotalPrice}
                        keyboardType="number-pad"
                    >
                        &nbsp;
                    </TextInput>
                </View >
                <View style={styles.m1}>
                    <Text style={styles.tect1}>주소</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setDataAddr}
                        value={dataAddr}
                        // placeholder={rsAddress}
                        keyboardType="email-address"
                    >
                        &nbsp;
                    </TextInput>
                </View>
                <View style={styles.m1}>
                    <Text style={styles.tect1}>매장명</Text>
                    <TextInput
                        style={styles.input1}
                        onChangeText={setDataShopName}
                        value={dataShopName}
                        // placeholder=" 매장명"
                        keyboardType="email-address"
                    >
                        &nbsp;
                    </TextInput>
                </View>
                <View style={styles.m1}>
                    <Text style={styles.tect1}>항목</Text>
                    <TextInput
                        style={styles.input2}
                        onChangeText={setDataItem}
                        value={dataItem}
                        placeholder="  ex) 식비, 차량유지비"
                        keyboardType="email-address"
                    />
                </View>
            </View>

            {/* 버튼 뷰 */}
            <View style={styles.butflex}>

                <TouchableOpacity style={styles.but1}
                    onPress={()=> {
                        createExpense();
                        route.navigation.navigate("MainBPage");
                    }}>
                    <Text style={styles.butText}>등록</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.but2}
                     onPress={()=> {
                        route.navigation.navigate("MainBPage");
                     }}
                >
                    <Text style={styles.butText}>취소</Text>
                </TouchableOpacity>

            </View>

        </View>

    )
}




// BPage메인 컴포넌트
export default function A_1() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainBPage" component={MainBPage} options={{ title: '경비등록', headerShown: false }} />
            <Stack.Screen name="CameraPage" component={CameraPage} options={({ route }) => ({ title: route.params.name })} />
            <Stack.Screen name="GalaryPage" component={GalaryPage} options={({ route }) => ({ title: route.params.name })} />
            <Stack.Screen name="OCRresult" component={OCRresult} options={({ route }) => ({ title: route.params.name })} />
        </Stack.Navigator>
    )
};



const styles = StyleSheet.create({
    cameraContainer: {
        flex: 0.85,
    },
    mom:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 이미지 뷰
    topimg:{
        flex: 2,
        marginTop: 10
    },
    asd:{
        height:300,
        width:210,
        backgroundColor:'red',

    },
    // 입력 뷰
    med:{
        flex:2,
    },
    // 버튼 뷰
    butflex:{
        flex:0.5,
        flexDirection: 'row',
    },
    tect1:{
        fontSize:20,
        padding:10,
    },
    m1:{
        margin: 7,
        flexDirection: 'row',
        // borderWidth: 1,
        height:'15%',
    },
    input:{
        borderWidth: 1,
        width:200,
        height:40,
        left: 50
    
    },
    input1:{
        borderWidth: 1,
        width:200,
        height:40,
        left: 33
    },
    input2:{
        borderWidth: 1,
        width:200,
        height:40,
        left: 50
    },
    but1:{
        backgroundColor:'#005b9e',
        width:100,
        height:40,
        margin:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    but2:{
        backgroundColor:'#005b9e',
        width:100,
        height:40,
        margin:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    butText:{
        color: 'white',
        fontSize: 15
    },


    fixedRatio: {
        flex: 1,
        // aspectRatio: 1
    },
    SimpleLin: {
        height: 300,
        margin: 10,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#B3B3B3'
    },
    stretch: {
        width: 100,
        height: 100,
    },
    imges: {
        height: 300,
        margin: 10,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#B3B3B3'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#B3B3B3",
    },
    buttonOpen: {
        backgroundColor: "skyblue",
    },
    buttonClose: {
        backgroundColor: "#005b9e",
    },
    cameraBtns: {
        flex: 0.15,
        flexDirection: "row",
        backgroundColor: "white"
    },
    cameraClose: {
        flex: 1,
        borderRadius: 10,
        marginVertical: 15,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#005b9e"
    },
    cameraTake: {
        flex: 1,
        borderRadius: 10,
        marginVertical: 15,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#005b9e"
    },
    galaryBase: {
        flex:1,
        margin: 10,
        borderRadius: 10,
        alignItems: "center", 
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#B3B3B3",
        backgroundColor: "#005b9e",
    },
    galaryText: {
        fontSize: 18,
        color: "white", 
        fontWeight: "bold",
    }
});