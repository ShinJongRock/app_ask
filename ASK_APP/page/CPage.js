import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Alert,
    Image,
    TouchableOpacity,
    Modal,
    Button
} from 'react-native';
import inOut2 from '../img/inOut2.png';
import camera2 from '../img/camera2.png';
import salary from '../img/salary.png';
import vact from '../img/vact.png';
import list from '../img/list.png';
import money from '../img/money.png';
import search from '../img/search.png';
import ask from '../img/ask.png';
const CPage = ({navigation}) => {

      //링크 이동
      const goApage = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View style={styles.cameraContainer}>
            <View style={styles.imgmain} >
                <Image resizeMode="contain" style={styles.ask} source={ask} />
            </View>
        <View style={styles.main}>
            <TouchableOpacity  style={styles.btu1} onPress={(screen) => goApage('B_1')}>
            <Image resizeMode="contain" style={styles.Image5} source={vact}  />
                    <Text style={styles.text1}>휴가 신청</Text>
            </TouchableOpacity>


            <TouchableOpacity  style={styles.btu1} onPress={(screen) => goApage('B_2')}>
            <Image resizeMode="contain" style={styles.Image6} source={search}/>
            <View>
                <Text style={styles.text1}>휴가 조회</Text>
            </View>
            </TouchableOpacity>
        </View>
        
    </View>
    );
};

export default CPage;

const styles = StyleSheet.create({
    cameraContainer: {
      backgroundColor:'white',
 
      
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
  
  
    main:{
        height:'83%',
        margin:10,
        borderWidth: 1,
        borderRadius: 13,
        // backgroundColor:'#005b9e'
        // borderColor:'#005b9e'
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
        // backgroundColor:'red'
        // borderColor:'#005b9e'
    },
    Image5:{
        width: 120,
        height:120,
      },
      Image6:{
        width: 120,
        height:120,
      },
      text1:{
        fontSize:30,
        color:'#005b9e',
        fontWeight:'bold'
      },
      
    


});