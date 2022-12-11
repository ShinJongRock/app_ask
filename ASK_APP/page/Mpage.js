import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text,Image,StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MainPage from '../page/MainPage';
import APage from '../page/APage';
import BPage from '../page/BPage';
import CPage from '../page/CPage';
import DPage from '../page/DPage';
import Login from '../page/Login';

import Repw from '../page/Repw';

import A_1 from '../stackPage/A_1';
import A_2 from '../stackPage/A_2';
import B_1 from '../stackPage/B_1';
import B_2 from '../stackPage/B_2';
import C_1 from '../stackPage/C_1';
import C_2 from '../stackPage/C_2'



const Tab = createBottomTabNavigator();
const Astack = createNativeStackNavigator();
const mainstack = createNativeStackNavigator();







//아이콘 함수
const TabIcon = ({ name, size, color }) => {

  
    return <MaterialCommunityIcons name={name} size={size} color={color} /> ;
   
};

// const Stack = createNativeStackNavigator();



const Mpage = () => {
  return (

   
 
        <Tab.Navigator initialRouteName='메인'>
            
            <Tab.Screen name='출퇴근' component={APage} options={{headerShown:false ,  tabBarIcon: props => TabIcon({...props, name:'briefcase'})}}/>
           
            <Tab.Screen name="경비" component={BPage}  options={{headerShown:false , tabBarIcon: props => TabIcon({...props, name:'calculator'})}}/>
            <Tab.Screen name="메인"   component={MainPage} options={{headerShown:false  ,tabBarIcon: props => TabIcon({...props, name:'home'}) }}   />
            {/* <Tab.Screen name="ㅁ" style={styles.m} options={{headerShown:false  ,tabBarIcon: props => TabIcon({...props, name:'home'}) }}   component={MainPage} /> */}
            <Tab.Screen name="휴가" component={CPage} options={{headerShown:false ,tabBarIcon: props => TabIcon({...props, name:'car'})}}/>
            <Tab.Screen name="급여" component={DPage}  options={{headerShown:false ,tabBarIcon: props => TabIcon({...props, name:'database'})}}/>
            {/* <Tab.Screen name="Login" component={Login} /> */}

      
        </Tab.Navigator>

  
  );
};

export default Mpage;

const styles = StyleSheet.create({
    img:{
        height:100,
        width:150,
        justifyContent:'center',
        alignItems:'center',
        margin: 1,
        top:20
    },
    m:{
        backgroundColor:'red'
        
    }
});