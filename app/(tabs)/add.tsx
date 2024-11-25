import React from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';

export default function Manage() {
  return (
    <View style={styles.container}>
      {/* Image and Gradient */}
      <View>
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
          style={styles.gradient}
        />
        <Image
          style={styles.image}
          source={require('../../assets/images/recipe-image-placehodler.png')}
        />
      </View>

      {/* Scrollable Module */}
      <View style={styles.scrollableModuleContainer}>
        <ScrollView contentContainerStyle={styles.scrollableContent}>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 300, // Adjust height as needed
  },
  scrollableModuleContainer: {
    position: 'absolute',
    top: 250, // Adjust to set the position of the scrollable content
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(255, 255, 255)', // Semi-transparent background
    zIndex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  scrollableContent: {
    padding: 20,
    flex: 1
  },
  textContent: {
    fontSize: 16,
    marginBottom: 10,
  },
});
