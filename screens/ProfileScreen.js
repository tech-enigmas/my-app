import React, { createContext, useEffect, useState, useContext } from 'react'
import {
  ImageBackground, 
  Dimensions, 
  SafeAreaView, 
  Text, 
  View, 
  StyleSheet, 
  ScrollView,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import TripContext from '../context/ProfileContext';
import TripsCampCard from './TripsCampCard';
const {width} = Dimensions.get('screen');
import axios from 'axios';
// const Favorites = createContext();

const ProfileScreen = ({navigation}) => {
  // const [trip, setTrip ] = useState({});
  // const [error, setError ] = useState('');
  const { trips } = useContext(TripContext);
  console.log(trips);
  const [error, setError] = useState(false);

  const deleteTrip = async (tripId) => {
    try {
      await axios.delete(`${process.env.EXPO_PUBLIC_SERVER}/travel-routes/${tripId}`);
      console.log(tripId);
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error('Error deleting trip:', error);
      setError('Could not delete trip');
    }
  };
 
  useEffect(() => {
    const getTrip = async ()=> {
      let requestURL = `${process.env.EXPO_PUBLIC_SERVER}/travel-routes}`;
      // if(response){
        axios.get(requestURL)
          .then(response => {
            setError('');
            setTrip(response.data);
          })
          .catch(error => {
            console.error(error);
            setError('Could not fetch trips');
          });
      // }
    }
    getTrip();

  },[]);

  const TripsCampCard = () => {
    const { trips } = useContext(TripContext);
    console.log(trips);
    // const campground = route.params;
   
    return (
      
      <View>
       {trips.map((campground, index)=>(
          <View>
            <View key={campground.site}>
              <ImageBackground source={campground?.image?.[0]?.URL ? {uri:campground.image[0].URL} : 'https://openclipart.org/download/325701/tent-0032588nahxbh.svg'} style={style.cardImage}>
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
                <View style={style.centeredView}>
              <View style={style.modalView}>
                <Icon name='delete' size={28} color='ivory' onPress={() => deleteTrip(campground.id)}/>
              </View>
            </View>
              </ImageBackground>
            </View>
          </View>
        ))}
      </View>
    )
  }
// const TripsCampCard = ({airbnbItem, campground}) => {
//   return
// }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e4f6f8'}}>
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style={style.heading}>
        <Icon name='menu' size={28} color='#0096c7'/>
        </View>
       <View style={style.imageHeading}>
          <Icon 
            name='arrow-back-ios' 
            size={28} color='#0096c7' 
            onPress={navigation.goBack}
            onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}/>
        </View>
      <View>
      <Text style={style.tripsStyle}>Your Trips</Text>
        <TripsCampCard/>
      </View>
      <View>
      <Text style={style.tripsStyle}>Your Favorites</Text>
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
  imageHeading: {
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
  },
  tripsStyle:{
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
})

export default ProfileScreen