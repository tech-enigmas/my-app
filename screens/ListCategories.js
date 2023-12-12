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
  Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

const ListCategories = ({ navigation }) => {
  return (
    <View style={style.categoryContainer}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Hiking')} 
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
        <View style={style.iconContainer}>
        <Icons name='hiking' size={28} color='ivory'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Camping')} 
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
        <View style={style.iconContainer}>
        <Icons name='tent' size={28} color='ivory'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Airbnb')} 
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
        <View style={style.iconContainer}>
        <Icon name='hotel' size={28} color='ivory'/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
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
    margin:10,
    marginTop:0
  },
})

export default ListCategories