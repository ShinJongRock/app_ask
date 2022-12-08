import React, { useEffect, useState, useRef } from 'react';
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
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import cameraImg from '../img/camera.png';
import galary from '../img/galary.png';

// 기본 카메라 import
import { Camera, CameraType } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';

// 갤러리 import
// import * as ImagePicker from 'expo-image-picker';


// BPage메인 컴포넌트
const A_1 = () => {
    const [cameraModalVisible, setCameraModalVisible] = useState(false);
    const [galaryModalVisible, setGalaryModalVisible] = useState(false);
    // const [status, requestPermission] = Camera.useCameraPermissions();

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);


    // useEffect(() => {

    // }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImage(data.uri);
        }
    }

    // const onModal = () => {
    //     console.log(hasCameraPermission);
    //     console.log(cameraModalVisible);
    //     if (hasCameraPermission === null && cameraModalVisible === true) {

    //         return (
    //             <Modal
    //                 animationType="slide"
    //                 transparent={true}
    //                 visible={cameraModalVisible}
    //                 onRequestClose={() => {
    //                     Alert.alert("Modal has been closed.");
    //                     setCameraModalVisible(!cameraModalVisible);
    //                 }}
    //             >

    //                 <View style={styles.centeredView}>
    //                     <View style={styles.modalView}>
    //                         <Text style={{ fontSize: 25, fontWeight: "bold" }}>카메라 접근 권한 승인
    //                             {"\n"}
    //                         </Text>
    //                         <Text style={{ fontSize: 16, fontWeight: "normal" }} >해당 서비스 이용을 위한 접근 권한을 허용합니다.</Text>

    //                         <View style={{ flexDirection: "row" }}>
    //                             <SimpleLineIcons name="camera" size={16} color="gray" />
    //                             <Text>  카메라 접근 권한을 허용합니다.{"\n"}</Text>
    //                         </View>
    //                         <View style={{ flexDirection: "row" }}>
    //                             <TouchableOpacity
    //                                 style={[styles.button, styles.buttonClose]}
    //                                 onPress={() => setCameraModalVisible(!cameraModalVisible)}
    //                             >
    //                                 <Text style={{ color: "white" }}>닫기</Text>
    //                             </TouchableOpacity>

    //                             <TouchableOpacity
    //                                 onPress={() => {
    //                                     console.log("카메라 권한 요청")
    //                                         (async () => {
    //                                             const cameraStatus = Camera.requestCameraPermissionsAsync();
    //                                             setHasCameraPermission(cameraStatus.status === 'granted');
    //                                         })();
    //                                     onModal();
    //                                 }}
    //                                 style={[styles.button, styles.buttonClose]}
    //                             >
    //                                 <Text style={{ color: "white" }}>
    //                                     권한 허용
    //                                 </Text>
    //                             </TouchableOpacity>
    //                         </View>
    //                     </View>
    //                 </View>

    //             </Modal>
    //         );
    //     }
    // }

    // 모달창 띄우기
    const onModal = () => {
        // 첫 권한 신청 혹은 권한 없음
        if(hasCameraPermission === null){
            setCameraModalVisible(true);
        }else{
            // 카메라 띄우기
            setCheck(true);
        }
    }


    // 권한 거절, 허용
    const checkPermission = () => {
        // 카메라 권한 허용
        const cameraStatus = Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
        setCameraModalVisible(false);
        setCheck(true);
    }


    const [check, setCheck] = useState(false);

    // 메인 return문
    return (
        <View style={{ height: "70%", margin: 20, backgroundColor: "white", borderWidth: 1, borderRadius: 10, borderColor: '#D3D5D7' }}>
            {check &&
                <View style={{ flex: 1 }}>
                    <View style={styles.cameraContainer}>
                        <Camera
                            ref={ref => setCamera(ref)}
                            style={styles.fixedRatio}
                            type={type}
                            ratio={'1:1'} />
                    </View>
                    <Button title="Take Picture" onPress={() => takePicture()} />
                    {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
                </View>
            }





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


            <View style={{ height: "10%", backgroundColor: "white", justifyContent: "flex-end", borderRadius: 10 }}>
                <Text style={{ margin: 5, fontSize: 18 }}>  경비 등록</Text>
            </View>

            <TouchableOpacity onPress={() => {onModal()}}>
                <View style={styles.SimpleLin}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                        {/* <SimpleLineIcons name="camera" size={55} color="black" /> */}
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
                        {/* <SimpleLineIcons name="picture" size={55} color="black" /> */}
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
};

export default A_1;


const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    SimpleLin: {
        height: 210,
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
        height: 210,
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
});