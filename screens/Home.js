import { ImageBackground, 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  TouchableOpacity, 
  View, 
  StatusBar} from 'react-native';
// import { AmaticSC_700Bold } from "@expo-google-fonts/amatic-sc";
const image = { uri: "https://images.unsplash.com/photo-1548932134-3d7d765bece2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"};
// import { useFonts } from "expo-font";
// import { useRouter } from 'expo-router';
import DiscoverScreen from './DiscoverScreen.js';
// import MenuBtn from '../components/MenuBtn';
// import { icons } from '../constants/icons.js';
import { useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,} from 'react-native-popup-menu';

const Home = ({navigation})  => {
  // const [fontsLoaded] = useFonts({
  //   AmaticSC_700Bold,
  // });
  // console.log(fontsLoaded);
  // if(!fontsLoaded){
  //   return <Text>Loading...</Text>;
  // }

  const Stack = createNativeStackNavigator();
  // const router = useRouter();

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
      <ImageBackground source={image} style={styles.image}>
      <MenuProvider styles={styles.menuContainer}>
        <View style={styles.heading}>
          <Menu>
            <MenuTrigger>
              <Icon name='menu' size={28} color='#0096c7'/>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => navigation.navigate('Discover')} text='Explore'/>
              <MenuOption onSelect={() => navigation.navigate('Hiking')} text='Hiking'/>
              <MenuOption onSelect={() => navigation.navigate('Camping')} text='Camping'/>
              <MenuOption onSelect={() => navigation.navigate('Airbnb')} text='Airbnb'/>
              <MenuOption onSelect={() => navigation.navigate('Blog')} text='Travel Blog'/>

            </MenuOptions>
          </Menu>
        <Icon name='person' size={28} color='#0096c7'/>
      </View>
      </MenuProvider>
        <Text style={styles.titleText}>NOMAD</Text>
        <Text style={styles.subtitleText}>Your all in one travel planner</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Discover')} 
          onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
          <View styles={styles.btnContainer}> 
            <Text style={styles.btn}>Explore</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>

    {/* <Stack.Screen 
      options={{
        headerLeft: () => (
          <MenuBtn iconUrl={icons} dimension='60%' />
        )
      }}
      />
      <Stack.Screen name='Discover' component={DiscoverScreen}/> */}
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
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
  titleText: {
    flex: 1,
    color: 'ivory',
    fontSize: 102,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'AmaticSC_700Bold',
    marginBottom:-170
  },
  subtitleText: {
    flex:1,
    color: 'ivory',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'AmaticSC_700Bold',
  },
  btn: {
    flex:1,
    height: 50,
    width: 120,
    backgroundColor: '#e4f6f8',
    margin:'auto',
    marginLeft: 130,
    marginTop: -230,
    marginBottom:187,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'AmaticSC_700Bold',
  },
  heading: {
    paddingVertical: 20, 
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#e4f6f8',
  },
  menuContainer: {
    flex:1,
    margin:10,
  },
  menuOption:{
    fontFamily: 'AmaticSC_700Bold',
  }
});

export default Home;