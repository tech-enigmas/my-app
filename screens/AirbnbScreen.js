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
  TextInput,
  View, 
  TouchableOpacity 
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width} = Dimensions.get('screen');
import airbnb from '../constants/airbnb';
import popAirbnb from '../constants/popAirbnb';
import * as Haptics from 'expo-haptics';
import { getAirbnb  } from '../api_Modules/airbnbModule';
// import Carousel from 'react-native-snap-carousel';


const AirbnbScreen = ({navigation}) => {
const [airbnb, setAirbnb] = useState([]);
const [searchAirbnb, setSearchAirbnb] = useState('');

const fetchAirbnbs = async () => {
  try {
    console.log('we made it!', searchAirbnb)
    const data = await getAirbnb(searchAirbnb);
    console.log(data);
    setAirbnb(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// const handleExplore = () => {
//   getAirbnb();
// }

// useEffect(() => {
//   const fetchAirbnb = async () => {
//     try {
//       const data = await getAirbnb();
//       setAirbnb(data.results);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   fetchAirbnb();
// }, []);

const AirbnbCard = ({airbnbItem}) => {
  if(!airbnb) return <></>
  return (
    <View>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={()=>navigation.navigate('BnbDetails', airbnbItem)}
      onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
      <View key={airbnbItem.name}>
     <ImageBackground source={airbnbItem?.images?.[0] ? {uri: airbnbItem.images[0]} : 'https://openclipart.org/download/325701/tent-0032588nahxbh.svg'} style={style.cardImage}> 
        <Text style={{
          color:'ivory',
          fontSize:20,
          fontWeight:'bold',
        }}>
        {airbnbItem.name}
      </Text>
      <View style={{
        flex: 1, 
        justifyContent:'space-between', 
        flexDirection:'row', 
        alignItems: 'flex-end'
        }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name='place' size={20} color='ivory'/>
            <Text style={{marginLeft: 5, color:'ivory'}}>
              {airbnbItem.name}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
    </TouchableOpacity>
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
    <SafeAreaView style={{
      flex: 1, 
      backgroundColor:'#e4f6f8'
      }}>
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
        size={28} 
        color='#0096c7' 
        onPress={navigation.goBack}
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          backgroundColor: 'e4f6f8', 
          // borderRadius: 7,  
          height:50, 
          paddingHorizontal: 10
          }}>
          <View style={{flex:1}}>
            <Text style={style.headingTitle}>Discover what's out there...</Text>
            <View style={style.inputContainer}>
              <Icon name='explore' size={28} margin={3}/>
              <TextInput
                  placeholder="Where are you going?"
                  style={{color: 'black'}}
                  onChangeText={(text) => setSearchAirbnb(text)}
                />
            </View>
          </View>
        </View>
      <View>
      <TouchableOpacity
        activeOpacity={0.2}
        style={style.goBtn}
        onPress={()=>  { Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)
        fetchAirbnbs()
        }}
        >

        <View>
        <Text
          style={{
            color:'ivory',
            fontSize: 30,
            fontWeight:'bold',
            // fontFamily: 'AmaticSC_700Bold',
            letterSpacing: 2,
          }}>Search this area
        </Text>
        </View>
      </TouchableOpacity>
      </View>
      </ScrollView>
    
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={style.bnbStyle}>Airbnb</Text>

      <View>
      <FlatList 
        contentContainerStyle={{paddingLeft:20}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={airbnb} 
        // keyExtractor={(item) => item.name}
        renderItem={({item})=> <AirbnbCard airbnbItem={item}/>}
        />
    
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
  headingTitle: {
    color: '#0096c7',
    fontWeight: 'bold',
    // fontFamily: 'AmaticSC_700Bold',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 7,
    textAlign:'center',
  },
  backArrow: {
  marginTop:30,
  flexDirection:'row',
  justifyContent:'space-between',
  paddingHorizontal:20,
  },
  bnbStyle:{
    marginHorizontal: 20,
    marginVertical: 120,
    fontWeight: 'bold',
    fontSize: 50,
    // fontFamily: 'AmaticSC_700Bold',
    marginTop:-5

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
  inputContainer: {
    height: 50,
    width: '100%',
    backgroundColor: 'ivory',
    borderWidth: 1,
    borderRadius: 7,
    position: 'absolute',
    top: 70,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
    marginBottom:10
  },
  goBtn: {
    flex: 1,
    height: 40,
    width: '100%',
    backgroundColor: '#0096c7',
    marginTop:90,
    marginBottom: -90,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    // fontFamily: 'AmaticSC_700Bold',
  },
})

export default AirbnbScreen