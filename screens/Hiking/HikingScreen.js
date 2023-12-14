import React from 'react'
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
  TouchableOpacity, 
  View, 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('screen');
import trails from '../../constants/trails';
import popTrails from '../../constants/popTrails';
import * as Haptics from 'expo-haptics';
import { MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,} from 'react-native-popup-menu';


const HikingScreen = ({navigation}) => {

const TrailCard = ({trail}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} 
      onPress={()=>navigation.navigate('TrailDetails', trail)}
      onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
      <ImageBackground source={trail.image} style={style.cardImage}>
          <Text style={{
            color: 'ivory',
            fontSize:20,
            fontWeight: 'bold',
          }}>{trail.name}
          </Text>
        <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row'}}>
            <Icon name='place' size={20} color='ivory'/>
            <Text style={{marginLeft: -1, color: 'ivory'}}>
              {trail.location}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
};
const PopularCard = ({popTrail}) => {
  return (
  <ImageBackground 
    style={style.popCardImage} 
    source={popTrail.image}>
    <Text 
      style={{
        color: 'ivory', 
        fontSize: 25, 
        fontWeight: 'bold', 
        marginTop: 10
        }}>
          {popTrail.name}
    </Text>
    <View 
      style={{
        flex:1, 
        justifyContent: 'space-between', 
        alignItems: 'flex-end'
      }}>
    <View style={{width:'100%', flexDirection:'column', marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Icon name='place' size={22} color= 'ivory'/>
        <Text style={{color:'ivory', fontWeight: 'bold', marginLeft:5}}>{popTrail.location}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Icon name='star' size={22} color= 'gold'/>
        <Text style={{color:'ivory', marginLeft:5}}>{popTrail.rating}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'column'}}>

      <Text style={{color:'ivory', fontWeight:'bold', fontSize:15, marginBottom:5}}>{popTrail.difficulty}</Text>
      <Text style={{color: 'ivory'}}>{popTrail.details}</Text>
      </View>
    </View>
  </ImageBackground>
)}
  return (
  <SafeAreaView style={{backgroundColor:'#e4f6f8'}}>
  <StatusBar translucent={false} backgroundColor='#e4f6f8'/>
  
  <MenuProvider style={style.menuContainer}>
    <View style={style.heading}>
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
  
    <Pressable 
      onPress={()=>navigation.navigate('Profile')}
      onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
      <Icon name='person' size={28} color='#0096c7'/>
    </Pressable>
  </View>
        </MenuProvider>

     <View style={style.backArrow}>
      <Icon 
        name='arrow-back-ios' 
        size={28}
        color='#0096c7'
        onPress={navigation.goBack}
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}/>
    </View>
  


<ScrollView showsVerticalScrollIndicator={false}>

<Text style={style.trailsStyle}>Trails</Text>

<View>
  <FlatList 
    contentContainerStyle={{paddingLeft:20}}
    horizontal
    showsHorizontalScrollIndicator={false}
    data={trails} 
    renderItem={({item})=> <TrailCard trail={item}/>}
    />
    <Text style={style.trailsStyle}>Most Popular</Text>
  <FlatList 
    contentContainerStyle={{paddingLeft:20, paddingBottom:20}}
    showsHorizontalScrollIndicator={false}
    horizontal
    data={popTrails} 
    renderItem={({item}) => <PopularCard popTrail={item}/>}
  />
</View>
</ScrollView>
</SafeAreaView>
  )
}

const style = StyleSheet.create({
  btn: {
    height: 40,
    width: 100,
    backgroundColor: 'ivory',
    margin:'auto',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    // fontFamily: 'AmaticSC_700Bold',
  },
  heading: {
    paddingVertical: 10, 
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e4f6f8',
  },
  headingTitle: {
    color: '#66BCD9',
    fontWeight: 'bold',
    // fontFamily: 'AmaticSC_700Bold',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign:'center',
    // margin: 10,
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
  trailsStyle:{
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 50,
    // fontFamily: 'AmaticSC_700Bold',
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
  backArrow: {
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
  },
  menuContainer: {
    flex:1,
    margin:10,
  },
});
export default HikingScreen