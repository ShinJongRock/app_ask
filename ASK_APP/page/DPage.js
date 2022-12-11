import React from 'react';
import { StyleSheet,
             Text,
             View,
             SafeAreaView,
             TextInput ,
             Button,
             Alert ,
             Image
            
            } from 'react-native';
            import ask from '../img/ask.png';
const DPage = () => {
    return (
        <View>
                     <View style={styles.imgmain} >
                <Image resizeMode="contain" style={styles.ask} source={ask} />
            </View>
          <Text>급여 명세서</Text>
        </View>
    );
};

export default DPage;
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