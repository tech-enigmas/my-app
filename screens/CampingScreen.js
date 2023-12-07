import React, { useEffect, useState } from 'react';
import { 
  Dimensions, 
  FlatList, 
  ImageBackground, 
  Pressable,
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput,
  TouchableOpacity, 
  View, 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width} = Dimensions.get('screen');
import camping from '../constants/camping';
import popCamping from '../constants/popCamping';
import * as Haptics from 'expo-haptics';
import { getCampgrounds } from '../api_Modules/campingdb';

const CampingScreen = ({navigation}) => {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const data = await getCampgrounds('Seattle');
        console.log(data);
        setCampgrounds(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCampgrounds();
  }, []);

const CampingCard = ({campsite}) => {
  return (
    // <TouchableOpacity 
    //   activeOpacity={0.8} 
    //   onPress={()=>navigation.navigate('CampingDetails', campsite)}
    //   onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
      // <ImageBackground source={campsite.image} style={style.cardImage}>
      //   <Text style={{
      //     color:'ivory',
      //     fontSize:20,
      //     fontWeight:'bold',
      //   }}>
      //     {campsite.name}
      //   </Text>
      //   <View style={{flex: 1, justifyContent:'space-between', flexDirection:'row', alignItems: 'flex-end'}}>
      //     <View style={{flexDirection: 'row'}}>
      //       <Icon name='place' size={20} color='ivory'/>
      //       <Text style={{marginLeft: 5, color:'ivory'}}>
      //         {campsite.location}
      //       </Text>
      //     </View>
      //   </View>
      // </ImageBackground>
    // </TouchableOpacity>
    <View>
      <Text>Campgrounds List</Text>
      {campgrounds.map(campground => (
        <Text key={campground.site}>{campground.site}</Text>
      ))}
    </View>
  )
}
const PopCampingCard = ({popCampsite}) => {
  return (
    <ImageBackground 
      style={style.popCardImage}
      source={popCampsite.image}>
      <Text
        style={{
          color: 'ivory',
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 10
        }}>
        {popCampsite.name}
      </Text>
      <View 
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
        <View style={{width:'100%', flexDirection:'column',marginTop:10}}>
          <View style={{flexDirection:'row'}}>
            <Icon name='place' size={22} color='ivory'/>
            <Text style={{color: 'ivory', fontWeight:'bold', marginLeft:5}}>{popCampsite.location}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name='star' size={22} color='gold'/>
            <Text style={{color:'ivory', marginLeft:5}}>{popCampsite.rating}</Text>
          </View>
        </View>
        <View style={{flexDirection:'column'}}>
          <Text style={{color:'ivory', fontWeight: 'bold', fontSize:20, marginBottom: 5}}>${popCampsite.price}</Text>
          <Text style={{color: 'ivory'}}>{popCampsite.details}</Text>
        </View>
      </View>
    </ImageBackground>
  )
  
}
// const handleExplore = (e) => {
//   e.preventDefault();
//   url = `https://ridb.recreation.gov/api/v1/facilities?query=${query}&limit=5&activity=6,CAMPING`;
//   const response = axios.get()
//   this.setState({ displayInfo: true })
// }
  return (
    <SafeAreaView style={{backgroundColor:'#e4f6f8'}}>
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

{/* SEARCH BAR AREA! */}
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: '#e4f6f8', height:50, paddingHorizontal: 10}}>
          <View style={{flex:1}}>
            <Text style={style.headingTitle}>Discover what's out there...</Text>
            <View style={style.inputContainer}>
              <Icon name='explore' size={28} margin={3}/>
              <TextInput
                  placeholder="Where are you going?"
                  style={{color: 'black'}}
                />
            </View>
          </View>
        </View>

      <View>
      <TouchableOpacity 
        activeOpacity={0.2} 
        style={style.goBtn} 
        onPress={()=> Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        // onPressIn={this.handleExplore}
        >
        <View>

        <Text 
          style={{
            color:'ivory', 
            fontSize: 30, 
            fontWeight:'bold',
            fontFamily: 'AmaticSC_700Bold',
            letterSpacing: 2,
          }}>Search this area

        </Text> 
        </View>
      </TouchableOpacity>
      </View>
      </ScrollView>


    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={style.campingStyle}>Camping</Text>

    <View>
      <FlatList 
        contentContainerStyle={{paddingLeft:20}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={camping} 
        renderItem={({item})=> <CampingCard campsite={item}/>}
        />
      <Text style={style.campingStyle}>Most Popular</Text>
      <FlatList
      contentContainerStyle={{paddingLeft:20, paddingBottom:20}}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={popCamping}
      renderItem={({item}) => <PopCampingCard popCampsite={item}/>}
      />
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  heading: {
    paddingVertical: 10, 
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e4f6f8',
  },
  campingStyle:{
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 50,
    fontFamily: 'AmaticSC_700Bold',
  },
  backArrow: {
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
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
  headingTitle: {
    color: '#0096c7',
    fontWeight: 'bold',
    fontFamily: 'AmaticSC_700Bold',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 7,
    textAlign:'center',
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
    fontFamily: 'AmaticSC_700Bold',
  },
})

export default CampingScreen