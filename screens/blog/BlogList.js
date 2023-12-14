// BlogList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

const BlogList = ({ blogs, toggleExpand, expanded }) => {
  return (
    <View>
      <Text style={styles.header}>List of Blogs</Text>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.blogItem}>
            <TouchableOpacity onPress={() => toggleExpand(item._id)}>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!expanded[item._id]}>
              <Text style={styles.details}>{item.body}</Text>
            </Collapsible>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333333', // Dark gray text color
  },
  blogItem: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9', // Light gray background
    padding: 10,
    borderRadius: 8,
    borderWidth: 1, // Add border
    borderColor: '#f294f2', // Border color
    elevation: 2, // Shadow on Android
    shadowColor: '#000000', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333', // Dark gray text color
  },
  details: {
    fontSize: 16,
    color: '#666666', // Medium gray text color
  },
});

export default BlogList;