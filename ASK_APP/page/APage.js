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
            {/* <View><Text>??????</Text></View> */}
            <View>
            {/* <TouchableOpacity
                title="Go to profile"
                // onPress={goApage}
                onPress={(screen) => goApage('A_1')}
            >
              <View><Text>카메라</Text></View>
            </TouchableOpacity> */}
                <Text>asd</Text>
            </View>
          
            
        </View>
    );
};

export default APage;