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


const CampingCard = ({navigation, campground}) => {

  if(!campground) return <></>
  return (

    <View>
      <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={()=>navigation.navigate('CampingDetails', campground)}
      onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
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
      </TouchableOpacity>
      
    </View>
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
})

export default CampingCard