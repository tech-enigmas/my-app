import React, { useState, useContext, useEffect } from 'react'
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  StatusBar, 
  ImageBackground, 
  TouchableOpacity, 
  Pressable, 
  Modal 
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
// import airbnb from '../constants/airbnb';
import TripContext from '../context/ProfileContext';

const AirbnbDetailsScreen = ({ navigation, route }) => {
  const airbnbItem = route.params;
  const [isFav, setFav] = useState();
  const [modal, setModal] = useState(false);
  const [tripModal, setTripModal] = useState(false);
  const { trips, setTrips } = useContext(TripContext);

  
  const addToTrip = () => {
    setTrips((prevTrips) => [...prevTrips, airbnbItem]);
    setTripModal(true);
  };
 
  useEffect(() => {
    fetch('https://nomad-backend-ga8z.onrender.com/travel-routes')
    // fetch(`https://ridb.recreation.gov/api/v1/facilities/${campground.facilityId}?apikey=EXPO_PUBLIC_CAMPING_API_KEY`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTrips(data);
      })
      .catch((error) => {
        console.error('Error fetching trips', error);
      });
  }, []);


  const saveTrip = async () => {
    const tripDetails = {
      location: airbnbItem.site,
      campsite: {
        city: airbnbItem.city,
        price: airbnbItem.price,
        name: airbnbItem.name,
        rating: airbnbItem.rating
      },
    };

  try {
    const response = await fetch('https://nomad-backend-ga8z.onrender.com/travel-routes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify(tripDetails),
      });
    const data = await response.json();

    if(response.ok) {
      console.log('trip saved', data);
      // setTrips((prevTrips) => [...prevTrips, tripDetails])
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error(error)
  }
  setTrips(TripContext);
}

 return (
    <SafeAreaView style={{flex:1, backgroundColor:'#e4f6f8'}}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)'/>
        <View style={style.imageHeading}>
          <Icon 
            name='arrow-back-ios' 
            size={28} color='#0096c7' 
            onPress={navigation.goBack}
            onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}
            />
        </View>
        <View style={style.heading}>
      <Icon 
      name='menu' 
      size={28} 
      color='#0096c7'/>
      <Pressable 
        onPress={()=>navigation.navigate('Profile')}
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
        <Icon name='person' size={28} color='#0096c7'/>
      </Pressable>
    </View>
      <ImageBackground style={{flex:0.7}} source={airbnbItem.images[0].URL ? {uri: airbnbItem.images[0].URL} :  'https://openclipart.org/download/325701/tent-0032588nahxbh.svg'}>
      <View style={style.imageHeading}>
          <Icon 
            name='arrow-back-ios' 
            size={28} color='#0096c7' 
            onPress={navigation.goBack}
            onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}
            />
        </View>
        <View style={style.imageDetails}> 
          <Text style={{
            width: '70%',
            fontSize: 35,
            fontWeight: 'bold',
            color:'ivory',
            marginBottom: 20
          }}>
          {airbnbItem.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon name='star' size={30} color='gold'/>
            <Text style={{color:'ivory', fontWeight:'bold', fontSize: 20}}>5.0</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Added to your favorites!');
          setModal(!modal);
        }}>
          <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Added to your favorites!</Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setModal(!modal)}
              onPressIn={() => setFav(!isFav)}>
              <Icon name='thumb-up' color='ivory'/>
            </Pressable>
          </View>
        </View>
      </Modal>
        <Pressable onPress={() => setFav(!isFav)} onPressIn={()=>setModal(true)} style={style.iconContainer}>
          <Icon name='favorite' size={28} color={isFav ? 'red' : 'ivory'}/>
        </Pressable>

        <View style={{flexDirection:'row', marginTop:15}}>
          <Icon name='place' size={28} color='#0096c7' marginLeft={-8}/>
          <Text 
            style={{
              marginLeft:1,
              fontSize:25,
              fontWeight:'bold',
              color:'#0096c7',
            }}>
            {airbnbItem.name}
          </Text>
        </View>
        <Text style={{
          marginTop:20, 
          fontWeight:'bold', 
          fontSize:45, 
          // fontFamily: 'AmaticSC_700Bold' 
          }}>
          Airbnb Details
        </Text>
        <Text style={{marginTop: 5, marginBottom: -10, fontSize:15, fontWeight: 'bold'}}>$100</Text>
        <Text style={{marginTop: 20, lineHeight:22}}>{airbnbItem.city}</Text>
      </View>
      <View style={style.footer}>
      <View style={style.addToTripBtn}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={tripModal}
          onRequestClose={() => {
            Alert.alert('Added to your favorites!');
            setTripModal(!tripModal);
            }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Added to your trips!</Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setTripModal(!tripModal)}
              onPressIn={() => addToTrip()}>
              <Icon name='thumb-up' color='ivory'/>
            </Pressable>
          </View>
        </View>
        </Modal>
        <View>
             </View>
          <Pressable activeOpacity={0.2}
            onPress={saveTrip}
            onPressIn={()=>setTripModal(true)
          }>
            <Text 
              style={{
                color:'#0096c7', 
                fontSize: 15, 
                fontWeight:'bold'
              }}>Add to your Trip</Text> 
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  backArrow: {
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
  },
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
  imageDetails: {
    padding: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    position:'absolute',
    bottom:30,
  },
  detailsContainer:{
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 50,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#e4f6f8',
    flex: 0.3,
  },
  iconContainer:{
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    backgroundColor: 'rgba(0,150,199,0.2)',
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer:{
    flexDirection: 'row',
    backgroundColor: '#0096c7',
    height: 70,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
  },
  addToTripBtn: {
    height: 50,
    width: '100%',
    backgroundColor: 'ivory',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:25,
    fontWeight:'bold',
    // fontFamily: 'AmaticSC_700Bold'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#0096c7',
  },
  textStyle: {
    color: 'ivory',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
})
// }
export default AirbnbDetailsScreen