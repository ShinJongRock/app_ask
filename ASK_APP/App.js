import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import MainPage from './page/MainPage';
import APage from './page/APage';
import BPage from './page/BPage';
import CPage from './page/CPage';
import DPage from './page/DPage';
import Login from './page/Login';

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>슈웃</Text>
        </View>
    );
};

const ProfileScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>집가즈아</Text>
        </View>
    );
};



const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="출퇴근" component={APage} />
            <Tab.Screen name="경비" component={BPage} />
            <Tab.Screen name="메인" component={MainPage} />
            <Tab.Screen name="휴가" component={CPage} />
            <Tab.Screen name="기타" component={DPage} />
            {/* <Tab.Screen name="Login" component={Login} /> */}
      
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;