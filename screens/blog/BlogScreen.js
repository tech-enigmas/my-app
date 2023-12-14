import React, { useState, useEffect } from 'react';
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
  FlatList,
} from 'react-native';
import * as Haptics from 'expo-haptics';


import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import Collapsible from 'react-native-collapsible';




const BlogScreen = ({ navigation }) => {
  const [blog, setBlog] = useState([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://nomad-backend-ga8z.onrender.com/posts')
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs. Please try again.');
        setLoading(false);
      });
  }, []);

  const saveBlog = async () => {
    if (title.trim() === '' || details.trim() === '') {
      Alert.alert('Error', 'Please fill in a Title and Blog');
      return;
    }

    const blogPost = {
      title: title,
      body: details,
    };

    try {
      const response = await fetch('https://nomad-backend-ga8z.onrender.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPost),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Blog saved successfully:', data);
  
        // Optimistic UI update: Add the new blog to the state
        setBlog([...blog, data]);
  
        
        setTitle('');
        setDetails('');
      } else {
        console.error('Failed to save blog:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.headerContainer}>
        <Text style={style.header}>List of Blogs</Text>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={style.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={blog}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={style.blogItem}>
              <TouchableOpacity onPress={() => toggleExpand(item._id)}>
                <Text style={style.title}>{item.title}</Text>
              </TouchableOpacity>
              <Collapsible collapsed={!expanded[item._id]}>
                <Text style={style.details}>{item.body}</Text>
              </Collapsible>
            </View>
          )}
        />
      )}

      <View style={style.inputContainer}>

        <TextInput
          style={style.input}
          onChangeText={(text) => setTitle(text)}
          value={setTitle}
          placeholder="Blog Title"
        />

        <TextInput
          editable
          multiline
          numberOfLines={20}
          maxLength={5000}
          onChangeText={(text) => setDetails(text)}
          value={setDetails}
          style={style.blogDetails}
          placeholder="Blog about your trip..."
        />

        <TouchableOpacity style={style.button} onPress={saveBlog}>
          <Text style={style.buttonText}>Save Blog</Text>
        </TouchableOpacity>
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
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f6f8',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#409c9b',
  },
  header: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  blogItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0096c7',
  },
  details: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#409c9b',
    borderRadius: 8,
    padding: 10,
  },
  blogDetails: {
    height: 120,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#409c9b',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#409c9b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backArrow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default BlogScreen;