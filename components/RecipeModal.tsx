import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Animated, ScrollView } from 'react-native';
import { Recipe } from '@/app/(tabs)/explore';
import { getRecipeById } from '@/db/queries/recipes';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type RecipeModalProps = {
  modalVisible: boolean;
  recipeId: number;
  onClose: () => void;
};

export default function RecipeModal({ modalVisible, recipeId, onClose }: RecipeModalProps) {
  const [currRecipe, setCurrRecipe] = useState<Recipe>();
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    async function findRecipeById() {
      const foundRecipe = await getRecipeById(recipeId);
      setCurrRecipe(foundRecipe as Recipe);
    }

    if (recipeId) findRecipeById();
  }, [recipeId]);

  const imageHeight = scrollY.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['70%', '45%', '45%'],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [-50, 0, 0], // Move the image slightly upwards when scrolling up
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // Layout animations are not supported with native driver
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.container}>
        {/* Animated Image */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
          style={styles.gradient}
        />
        {currRecipe?.imageUri && (
          <Animated.Image
            source={{ uri: currRecipe.imageUri }}
            style={[
              styles.backgroundImage,
              { height: imageHeight, transform: [{ translateY: imageTranslateY }] },
            ]}
            resizeMode="cover"
          />
        )}

        {/* Close Button */}
        <Pressable style={styles.closeButton} onPress={onClose}>
          <FontAwesome6 name="xmark" size={24} color="white" />
        </Pressable>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          onScroll={handleScroll}
        >
          {/* Content with White Background */}
          <View style={styles.contentContainer}>
            <Text style={styles.recipeTitle}>
              {currRecipe?.name || 'No Recipe Selected'}
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: '50%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  recipeDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#70b9be',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});
