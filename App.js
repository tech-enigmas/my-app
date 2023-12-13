import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import DiscoverScreen from './screens/GoogleMaps/DiscoverScreen';
import HikingScreen from './screens/HikingScreen';
import TrailDetailsScreen from './screens/TrailDetailsScreen';
import CampingScreen from './screens/CampingScreen';
import CampDetailsScreen from './screens/CampDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AirbnbScreen from './screens/AirbnbScreen';
import BlogScreen from './screens/blog/BlogScreen';
import TripContext from './context/ProfileContext';


const Stack = createNativeStackNavigator();

const App = () => {
  const [trips, setTrips] = useState([]);

  return (
    <TripContext.Provider value={{ trips, setTrips }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Discover" component={DiscoverScreen} />
        <Stack.Screen name='Hiking' component={HikingScreen}/>
        <Stack.Screen name="TrailDetails" component={TrailDetailsScreen}/>
        <Stack.Screen name="Camping" component={CampingScreen}/>
        <Stack.Screen name="CampingDetails" component={CampDetailsScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="Airbnb" component={AirbnbScreen}/>
        <Stack.Screen name="Blog" component={BlogScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </TripContext.Provider>
  );
};

export default App;

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Nomad</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
