import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet,  
  Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,} from 'react-native-popup-menu';

const BlogScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e4f6f8'}}>
      <StatusBar translucent backgroundColor='#e4f6f8'/>
      <MenuProvider style={style.menuContainer}>
        <View style={style.heading}>
            <Menu>
              <MenuTrigger>
                <Icon name='menu' size={28} color='#0096c7'/>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => navigation.navigate('Home')} text='Home'/>
                <MenuOption onSelect={() => navigation.navigate('Discover')} text='Explore'/>
                <MenuOption onSelect={() => navigation.navigate('Hiking')} text='Hiking'/>
                <MenuOption onSelect={() => navigation.navigate('Camping')} text='Camping'/>
                <MenuOption onSelect={() => navigation.navigate('Airbnb')} text='Airbnb'/>
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
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        />
      </View>
  
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#e4f6f8',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  heading: {
    paddingVertical: 10, 
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e4f6f8',
  },
  backArrow: {
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    marginBottom: 20,
  },
  menuContainer: {
    flex:1,
    margin:10,
  },
})

export default BlogScreen