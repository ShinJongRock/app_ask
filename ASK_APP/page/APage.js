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
            import { NavigationContainer } from '@react-navigation/native';
            import { createNativeStackNavigator } from '@react-navigation/native-stack';
            import ask from '../img/ask.png';
const APage = ({navigation, route}) => {


    // const goApage =(e)=>{
    //    navigation.navigate("A_1");
    // };

       //링크 이동
       const goApage = (screen) => {
        navigation.navigate(screen)
    }
    return (
        <View>
               <View style={styles.imgmain} >
                <Image resizeMode="contain" style={styles.ask} source={ask} />
            </View>
      
                <Text>a페이지</Text>
    
          
            
        </View>
    );
};

export default APage;
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
    


});