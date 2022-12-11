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
            import AsyncStorage from '@react-native-async-storage/async-storage';

            import ask from '../img/ask.png';
const DPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imgmain} >
              <Image resizeMode="contain" style={styles.ask} source={ask} />
            </View>

            <View style={styles.title}>
                <Text style={styles.titlename}>  휴가조회</Text>
            </View>

            




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