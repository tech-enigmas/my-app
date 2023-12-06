import React, { createContext, useState } from 'react'
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

const Favorites = createContext();

const ProfileScreen = ({navigation}) => {


const TripsCampCard = ({trail, campsite}) => {
  return
}
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e4f6f8'}}>
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
      </View>
      <View>
      <Text style={style.tripsStyle}>Your Favorites</Text>
      </View>
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
    fontFamily: 'AmaticSC_700Bold',
  },
})

export default ProfileScreen