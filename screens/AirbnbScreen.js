import React, { useEffect, useState } from 'react'
import { 
  Dimensions, 
  FlatList, 
  ImageBackground, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Pressable, 
  Text, 
  View, 
  TouchableOpacity 
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width} = Dimensions.get('screen');
import airbnb from '../constants/airbnb';
import popAirbnb from '../constants/popAirbnb';
import * as Haptics from 'expo-haptics';
import { getAirbnb  } from '../api_Modules/airbnbModule';

const AirbnbScreen = ({navigation}) => {
const [airbnb, setAirbnb] = useState([]);

useEffect(() => {
  const fetchAirbnb = async () => {
    try {
      const data = await getAirbnb([]);
      setAirbnb(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchAirbnb();
}, []);

const AirbnbCard = ({bnb}) => {
  return (
    // <TouchableOpacity 
    //   activeOpacity={0.8}
    //   onPress={()=>navigation.navigate('BnbDetails', bnb)}
    //   onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
    // <ImageBackground source={bnb.image} style={style.cardImage}>
    //     <Text style={{
    //       color:'ivory',
    //       fontSize:20,
    //       fontWeight:'bold',
    //     }}>
    //     {bnb.name}
    //   </Text>
    //   <View style={{flex: 1, justifyContent:'space-between', flexDirection:'row', alignItems: 'flex-end'}}>
    //       <View style={{flexDirection: 'row'}}>
    //         <Icon name='place' size={20} color='ivory'/>
    //         <Text style={{marginLeft: 5, color:'ivory'}}>
    //           {bnb.location}
    //         </Text>
    //       </View>
    //     </View>
    //   </ImageBackground>
    // </TouchableOpacity>
    <View>
      <Text>Airbnb List</Text>
      {airbnb.map(airbnb => (
        <Text key={airbnb.name}>{airbnb.name}</Text>
      ))}
    </View>
  )
}

// const PopAirbnbCard = ({popAirbnb}) => {
//   return (
//     <ImageBackground
//     style={style.popCardImage}
//       source={popAirbnb.image}>
//       <Text
//         style={{
//           color: 'ivory',
//           fontSize: 25,
//           fontWeight: 'bold',
//           marginTop: 10
//         }}>
//           {popAirbnb.name}
//         </Text>
//         <View 
//         style={{
//           flex: 1,
//           justifyContent: 'space-between',
//           alignItems: 'flex-end'
//         }}>
//         <View style={{width:'100%', flexDirection:'column',marginTop:10}}>
//           <View style={{flexDirection:'row'}}>
//             <Icon name='place' size={22} color='ivory'/>
//             <Text style={{color: 'ivory', fontWeight:'bold', marginLeft:5}}>{popAirbnb.location}</Text>
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             <Icon name='star' size={22} color='gold'/>
//             <Text style={{color:'ivory', marginLeft:5}}>{popAirbnb.rating}</Text>
//           </View>
//         </View>
//         <View style={{flexDirection:'column'}}>
//           <Text style={{color:'ivory', fontWeight: 'bold', fontSize:20, marginBottom: 5}}>${popAirbnb.price}</Text>
//           <Text style={{color: 'ivory'}}>{popAirbnb.details}</Text>
//         </View>
//       </View>
//     </ImageBackground>
//   )
// }
  return (
    <SafeAreaView>
    <StatusBar translucent={false} backgroundColor='#e4f6f8'/>

      <View style={style.heading}>
      <Icon name='menu' size={28} color='#0096c7'/>
        <Pressable 
          onPress={()=>navigation.navigate('Profile')}
          onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
          <Icon name='person' size={28} color='#0096c7'/>
        </Pressable>
      </View>
      <View style={style.backArrow}>
      <Icon 
        name='arrow-back-ios' 
        size={28} color='#0096c7' 
        onPress={navigation.goBack}
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}/>
    </View>
    
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={style.bnbStyle}>Airbnb</Text>

      <View>
      <FlatList 
        contentContainerStyle={{paddingLeft:20}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={airbnb} 
        renderItem={({item})=> <AirbnbCard bnb={item}/>}
        />
      <Text style={style.bnbStyle}>Most Popular</Text>
      {/* <FlatList
      contentContainerStyle={{paddingLeft:20, paddingBottom:20}}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={popAirbnb}
      renderItem={({item}) => <PopAirbnbCard popAirbnb={item}/>}
      /> */}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  heading: {
    paddingVertical: 10, 
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e4f6f8',
  },
  backArrow: {
  marginTop:30,
  flexDirection:'row',
  justifyContent:'space-between',
  paddingHorizontal:20,
  },
  bnbStyle:{
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 50,
    fontFamily: 'AmaticSC_700Bold',
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  popCardImage:{
    width: width - 40,
    height: 500,
    marginRight: 20,
    marginBottom:150,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
})

export default AirbnbScreen