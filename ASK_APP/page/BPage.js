import React from 'react';
import { StyleSheet,
             Text,
             View,
             SafeAreaView,
             TextInput ,
             Button,
             Alert ,
             Image,
             TouchableOpacity
            
            } from 'react-native';
            import inOut from '../img/inOut.png';
import inOut2 from '../img/inOut2.png';
import camera2 from '../img/camera2.png';
import salary from '../img/salary.png';
import vact from '../img/vact.png';
import list from '../img/list.png';
import money from '../img/money.png';
import search from '../img/search.png';
import ask from '../img/ask.png';
const BPage = ({navigation}) => {

    const goApage = (screen) => {
        navigation.navigate(screen)
    }
    return (
        <View style={styles.cameraContainer}>
              <View style={styles.imgmain} >
                <Image resizeMode="contain" style={styles.ask} source={ask} />
            </View>
            <View style={styles.main}>
                <TouchableOpacity  style={styles.btu1}  onPress={(screen) => goApage('A_1')}>
                <Image resizeMode="contain" style={styles.Image3} source={camera2}/>
                        <Text style={styles.text1}>경비 등록</Text>
                </TouchableOpacity>


                <TouchableOpacity  style={styles.btu1}  onPress={(screen) => goApage('A_2')}>
                <Image resizeMode="contain" style={styles.Image4} source={money}/>
                    <Text style={styles.text1}> 경비 목록</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

export default BPage;

const styles = StyleSheet.create({
    cameraContainer: {
      backgroundColor:'white'
      
    },
    main:{
        height:'83%',
        margin:10,
        borderWidth: 1,
        borderRadius: 13,
    },
    btu1:{
       top:10,
       margin:10,
        height:'45%',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 13,
    },
    Image3:{
        width: 150,
        height:100,
      },
      Image4:{
        width: 120,
        height:80,
      },
      ask:{
        top:20,
        width:150, 
         height:90,
     

      },
      imgmain:{
        justifyContent:'center',
        alignItems:'center',
      },
    
      text1:{
        fontSize:30,
        color:'#005b9e',
        fontWeight:'bold'
      },
      

});