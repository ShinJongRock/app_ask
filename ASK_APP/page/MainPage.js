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

export default function MainPage() {
    return (
        <View style={styles.container}>
            <View style={styles.one}>
                <Text>asd</Text>             
            </View>
            <View style={styles.two}>
                <Text>asd</Text>
            </View>
            <View style={styles.three}>
                <Text>asd</Text>
            </View>
            <View style={styles.four}>
                <Text>asd</Text>
            </View>
            <View style={styles.five}>
                <Text>asd</Text>
            </View>

           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    one:{
        flex: 1,
        backgroundColor:'red'

    },
    two:{
        flex: 1,
        backgroundColor:'blue'

    },
    three:{
        flex: 1,
        backgroundColor:'yellow'
    },
    four:{
        flex: 1,
        backgroundColor:'green'

    },
    five:{
        width:'auto',
        flex: 1,
        backgroundColor:'orange'
    },







    input: {
  
      width:300,
      height: 40,
      margin: 2,
      borderWidth: 1,
      padding: 10,
      top:0
      
    },
    button:{
      width:200,
      top:100,
    
    
   
  
    },
    text:{
      width:200,
      margin: 5,
      top:0
    },
    ip:{
     
    },
    bm:{
      top:80,
      width:'70%',
    },
    tm:{
      alignItems: 'center',
      justifyContent: 'center',
     
      bottom:50
      
    },
    Image:{
      width: 200,
      height:100,
    },
    TextSize:{
      fontSize:30
    }
  });
  