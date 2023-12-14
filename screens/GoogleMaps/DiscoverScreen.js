import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import GoogleMapsNative from './GoogleMapsNative';

const DiscoverScreen = ({ navigation }) => {
  // const categoryIcons = [
  //   <Icon name='directions-car' size={28} color='ivory'/>,
  //   <Icons name='hiking' size={28} color='ivory'/>,
  //   <Icons name='tent' size={28} color='ivory'/>,
  //   <Icon name='hotel' size={28} color='ivory'/>,

  // ]
  const ListCategories = () => {
    return (
      // <View style={style.categoryContainer}>
      //   {categoryIcons.map((icon, index)=>(
      //   <View key={index} style={style.iconContainer}>
      //     <TouchableOpacity onPress={()=> navigation.navigate('Hiking')}>
      //     {icon}
      //     </TouchableOpacity>
      //   </View>
      //   ))}
      // </View>
      <View style={style.categoryContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
          <View style={style.iconContainer}>
            <Icons name='home' size={28} color='ivory' />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Hiking')}
          onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
          <View style={style.iconContainer}>
            <Icons name='hiking' size={28} color='ivory' />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Camping')}
          onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
          <View style={style.iconContainer}>
            <Icons name='tent' size={28} color='ivory' />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Airbnb')}
          onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
          <View style={style.iconContainer}>
            <Icon name='hotel' size={28} color='ivory' />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e4f6f8' }}>
      <StatusBar translucent={false} backgroundColor='#e4f6f8' />
      <View style={style.heading}>
        <MenuProvider style={style.menuContainer}>
          <View >
            <Menu>
              <MenuTrigger>
                <Icon name='menu' size={28} color='#0096c7' />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => navigation.navigate('Discover')} text='Explore' />
                <MenuOption onSelect={() => navigation.navigate('Hiking')} text='Hiking' />
                <MenuOption onSelect={() => navigation.navigate('Camping')} text='Camping' />
              </MenuOptions>
            </Menu>
          </View>
        </MenuProvider>
        <Pressable
          onPress={() => navigation.navigate('Profile')}
          onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
          <Icon name='person' size={28} color='#0096c7' />
        </Pressable>
      </View>

      <View style={style.backArrow}>
        <Icon
          name='arrow-back-ios'
          size={28}
          color='#0096c7'
          onPress={navigation.goBack}
          onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        />
      </View>



      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#e4f6f8', height: 50, paddingHorizontal: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={style.headingTitle}>Discover what's out there...</Text>
            <View style={style.inputContainer}>
              <Icon name='explore' size={28} margin={3} />
              <TextInput
                placeholder="Where are you going?"
                style={{ color: 'black' }}
              />
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            activeOpacity={0.2}
            style={style.goBtn}
            onPress={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
            <View>
              <Text
                style={{
                  color: 'ivory',
                  fontSize: 30,
                  fontWeight: 'bold',
                  fontFamily: 'AmaticSC_700Bold',
                  letterSpacing: 2,
                }}>Search this area

              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView> */}
      <GoogleMapsNative />
      <ListCategories />

      
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  btn: {
    height: 40,
    width: 100,
    backgroundColor: 'ivory',
    margin: 'auto',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'AmaticSC_700Bold',
  },
  goBtn: {
    flex: 1,
    height: 40,
    width: '100%',
    backgroundColor: '#0096c7',
    marginTop: 90,
    marginBottom: -90,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'AmaticSC_700Bold',
  },
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
    fontFamily: 'AmaticSC_700Bold',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 7,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  map: {
    width: '100%',
    height: '100%',

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
  categoryContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: '#6db966',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    marginTop: 0
  },
  backArrow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  menuContainer: {
    flex: 1,
  },

})

export default DiscoverScreen