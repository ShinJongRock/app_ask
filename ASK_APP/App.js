import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text,Image,StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainPage from './page/MainPage';
import APage from './page/APage';
import BPage from './page/BPage';
import CPage from './page/CPage';
import DPage from './page/DPage';
import Login from './page/Login';
import ask from './img/ask.png';

import A_1 from './stackPage/A_1';
import A_2 from './stackPage/A_2';
import B_1 from './stackPage/B_1';
import B_2 from './stackPage/B_2';
import C_1 from './stackPage/C_1';
import C_2 from './stackPage/C_2'
const Tab = createBottomTabNavigator();
const Astack = createNativeStackNavigator();
const mainstack = createNativeStackNavigator();


const StackScreen = () => {
    return (
       
            
            <Astack.Navigator initialRouteName='main'> 
                {/* <Astack.Screen name="APage"   options={{title:'경비관리'}}  component={APage}/> */}
                <Astack.Screen name='main'  options={{title:'메인' ,headerShown:false }} component={MainPage} />
                <Astack.Screen name='A_1'  options={{title:'경비등록'}} component={A_1} />
                <Astack.Screen name='A_2'  options={{title:'경비목록'}}component={A_2} />
                <Astack.Screen name='B_1'  options={{title:'휴가신청'}} component={B_1} />
                <Astack.Screen name='B_2'  options={{title:'휴가조회'}}component={B_2} />
                <Astack.Screen name='C_1'  options={{title:'출근현황'}} component={C_1} />
                <Astack.Screen name='C_2'  options={{title:'급여현황'}}component={C_2} />

     
              
               
            </Astack.Navigator>
        
    );
};







//아이콘 함수
const TabIcon = ({ name, size, color }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

// const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator initialRouteName='메인'>
            
            <Tab.Screen name='출퇴근' component={APage} options={{  tabBarIcon: props => TabIcon({...props, name:'briefcase'})}}/>
           
            <Tab.Screen name="경비" component={BPage}  options={{tabBarIcon: props => TabIcon({...props, name:'calculator'})}}/>
            <Tab.Screen name="메인"   component={StackScreen} options={{headerShown:false  ,tabBarIcon: props => TabIcon({...props, name:'home'}) }}   />
            {/* <Tab.Screen name="ㅁ" style={styles.m} options={{headerShown:false  ,tabBarIcon: props => TabIcon({...props, name:'home'}) }}   component={MainPage} /> */}
            <Tab.Screen name="휴가" component={CPage} options={{tabBarIcon: props => TabIcon({...props, name:'car'})}}/>
            <Tab.Screen name="기타" component={DPage}  options={{tabBarIcon: props => TabIcon({...props, name:'menu'})}}/>
            {/* <Tab.Screen name="Login" component={Login} /> */}
      
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

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