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
import * as Haptics from 'expo-haptics';
import { getCampgrounds } from '../../api_Modules/campingdb';
// import CampingCard from './CampingCard';
import { 
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,} from 'react-native-popup-menu';

const CampingScreen = ({navigation}) => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [searchCity, setSearchCity] = useState('');

  const fetchCampgrounds = async () => {
    try {
      const data = await getCampgrounds(searchCity);
      console.log(data);
      setCampgrounds(data);
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleExplore = () => {
    getCampgrounds();
  }


const CampingCard = ({campground}) => {
  if(!campground) return <></>
  return (


    <View>
      <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={()=>navigation.navigate('CampingDetails', campground)}
      onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
        <View key={campground.site}>
          <ImageBackground source={campground?.image?.[0]?.URL ? { uri: campground.image[0].URL} : 'https://openclipart.org/download/325701/tent-0032588nahxbh.svg'} style={style.cardImage}>
          <Text style={{
            color: 'ivory',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
            {campground.site}
          </Text>
         
          <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='place' size={20} color='ivory' />
              <Text style={{ marginLeft: 5, color: 'ivory' }}>
                {campground.site}
              </Text>
            </View>
          </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      
    </View>
  )
}

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#e4f6f8'}}>
    <StatusBar translucent={false} backgroundColor='#e4f6f8'/>
    {/* PROFILE LINK! */}
    <View style={style.heading}>     
    <MenuProvider style={style.menuContainer}>
        <View >
          <Menu>
            <MenuTrigger>
              <Icon name='menu' size={28} color='#0096c7'/>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => navigation.navigate('Discover')} text='Explore'/>
              <MenuOption onSelect={() => navigation.navigate('Hiking')} text='Hiking'/>
              <MenuOption onSelect={() => navigation.navigate('Camping')} text='Camping'/>
            </MenuOptions>
          </Menu>
          </View>
          </MenuProvider>
      <Pressable 
        onPress={()=>navigation.navigate('Profile')}
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
        <Icon name='person' size={28} color='#0096c7'/>
      </Pressable>
    </View>

    {/* BACK ARROW! */}
    <View style={style.backArrow}>
      <Icon 
        name='arrow-back-ios' 
        size={28} 
        olor='#0096c7' 
        onPress={navigation.goBack}
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        />
    </View>

    {/* SEARCH BAR AREA! */}
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          backgroundColor: '#e4f6f8', 
          height:50, 
          paddingHorizontal: 10,
          }}>
          <View style={{flex:1}}>
            <Text style={style.headingTitle}>Discover what's out there...</Text>
            <View style={style.inputContainer}>
              <Icon name='explore' size={28} margin={3}/>
              <TextInput
              placeholder="Where are you going?"
              style={{color: 'black'}}
              onChangeText={(text) => setSearchCity(text)}
            />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity 
            activeOpacity={0.2} 
            style={style.goBtn} 
            onPress={()=> {
            Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy);
            fetchCampgrounds();
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

      {/* CAMPING CARD! */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={style.campingStyle}>Camping </Text>

        <View>
          <FlatList 
            contentContainerStyle={{paddingLeft:20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={campgrounds} 
            keyExtractor={(item) => item.site}
            renderItem={({item})=> <CampingCard campground={item}/>}
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
    marginVertical: 120,
    fontWeight: 'bold',
    fontSize: 50,
    // fontFamily: 'AmaticSC_700Bold',
    marginTop:-10
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
    // fontFamily: 'AmaticSC_700Bold',
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

export default CampingScreen
