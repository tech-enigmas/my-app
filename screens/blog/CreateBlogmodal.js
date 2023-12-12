import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';



const BlogScreen = ({ navigation }) => {

  const [blog, setBlog] = useState([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const saveBlog = async () => {
    if (title.trim() === '' || details.trim() === '') {
      Alert.alert('Error', 'Please fill in a Title and Blog');
      return;
    }

    const blogPost = {
      title: title,
      body: details,
      id: 1,
      status: true,
      userId: 100,
      keyWord: [],
      likes: 0,
      comments: [],
    };

    try {
      const response = await fetch('http://localhost:3001/posts'
, {    //  <------ put the server here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPost),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Blog saved successfully:', data);
      } else {
        console.error('Failed to save blog:', data.error);
      }
    } catch (error) {
      console.error('Error:', error)
    }

    setTitle('');
    setDetails('');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e4f6f8' }}>
      <StatusBar translucent backgroundColor='#e4f6f8' />
      <MenuProvider style={style.menuContainer}>
        <View style={style.heading}>
          <Menu>
            <MenuTrigger>
              <Icon name='menu' size={28} color='#0096c7' />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => navigation.navigate('Home')} text='Home' />
              <MenuOption onSelect={() => navigation.navigate('Discover')} text='Explore' />
              <MenuOption onSelect={() => navigation.navigate('Hiking')} text='Hiking' />
              <MenuOption onSelect={() => navigation.navigate('Camping')} text='Camping' />
              <MenuOption onSelect={() => navigation.navigate('Airbnb')} text='Airbnb' />
            </MenuOptions>
          </Menu>
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
            <Icon name='person' size={28} color='#0096c7' />
          </Pressable>
        </View>

        <View>
          <TextInput
            style={style.input}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="Blog Title"
          />

          <TextInput
            editable
            multiline
            numberOfLines={16}
            maxLength={2500}
            onChangeText={(text) => setDetails(text)}
            value={details}
            style={style.blogDetails}
            placeholder="Blog about your trip..."
          />

          <TouchableOpacity
            style={style.button}
          onPress={saveBlog}
          >
            <Text style={style.buttonText}>Save Blog</Text>
          </TouchableOpacity>
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
    backgroundColor: '#e4f6f8',
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
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#f294f2',
    borderRadius: 8,
    padding: 10,
  },
  blogDetails: {
    height: 500,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#f294f2',
    borderRadius: 8,
    padding: 10,
  },
  button: {
    backgroundColor: '#409c9b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  backArrow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuContainer: {
    flex: 1,
    margin: 10,
  },
})

// export default BlogScreen