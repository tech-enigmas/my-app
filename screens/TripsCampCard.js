import React, { useContext } from 'react'
import { View, Dimensions, ImageBackground, StyleSheet, Text } from 'react-native';
import TripContext from '../context/ProfileContext';
import { trips } from './ProfileScreen';
const {width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/MaterialIcons';

const TripsCampCard = () => {
  const { trips } = useContext(TripContext);
  console.log(trips);
  // const campground = route.params;
 
  return (
    <View>
     {trips.map((campground, index)=>(
        <View>
          <View key={campground.site}>
            <ImageBackground source={campground?.image?.[0]?.URL ? campground.image[0].URL : 'https://openclipart.org/download/325701/tent-0032588nahxbh.svg'} style={style.cardImage}>
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
          </View>
      ))}
    </View>
  )
}
{/* TripsCampCard key={index} campground={campground.site} */}

const style = StyleSheet.create({
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
})

export default TripsCampCard