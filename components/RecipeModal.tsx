import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Pressable, View, Animated, ScrollView } from 'react-native';
import { Recipe } from '@/app/(tabs)/explore';
import { getRecipeById } from '@/db/queries/recipes';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ThemedText } from './ThemedText';
import TabSwitcher from './TabSwitcher';
import NutritionalInfo from './NutritionalInfo';

type RecipeModalProps = {
  modalVisible: boolean;
  recipeId: number;
  onClose: () => void;
};

export default function RecipeModal({ modalVisible, recipeId, onClose }: RecipeModalProps) {
  const [currRecipe, setCurrRecipe] = useState<Recipe>();
  const [currTab, setCurrTab] = useState('Ingredients');
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    async function findRecipeById() {
      const foundRecipe = await getRecipeById(recipeId);
      setCurrRecipe(foundRecipe as Recipe);
    }

    if (recipeId)
      findRecipeById();

  }, [recipeId]);

  useEffect(() => {
    setCurrTab('Ingredients')
  }, [modalVisible])

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

  function renderTabContent() {
    if (currTab == "Ingredients") {
      return (
        currRecipe?.ingredients.map((ingredient, i) => (
          <View style={styles.listItem} key={ingredient.id}>
            <ThemedText>{ingredient.name}</ThemedText>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <ThemedText>{ingredient.amount}</ThemedText>
              <ThemedText>{ingredient?.unit}{(ingredient.amount || 1) > 1 ? 's' : ''}</ThemedText>
            </View>
          </View>
        ))
      );
    }
    return (
      currRecipe?.instructions?.map((instruct, i) => (
        <View key={instruct.id} style={[styles.listItem, { minHeight: 80 }]}>
          <ThemedText>{instruct.text}</ThemedText>
        </View>
      ))
    );
  }

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
        {currRecipe?.imageUri ?
          <Animated.Image
            source={{ uri: currRecipe.imageUri }}
            style={[
              styles.backgroundImage,
              { height: imageHeight, transform: [{ translateY: imageTranslateY }] },
            ]}
            resizeMode="cover"
          /> :
          <Animated.Image
            source={{ uri: require('../assets/images/recipe-image-placehodler.png') }}
            style={[
              styles.backgroundImage,
              { height: imageHeight, transform: [{ translateY: imageTranslateY }] },
            ]}
            resizeMode="cover"
          />
        }

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
            <View style={styles.titleContainer}>
              <ThemedText style={styles.recipeTitle}>
                {currRecipe?.name || 'Unnamed Dish'}
              </ThemedText>
              <View style={styles.timeContainer}>
                <FontAwesome6 name="clock" size={12} color="#7c8990" />
                <ThemedText style={styles.recipeTime}>
                  {currRecipe?.recipeTime} {currRecipe?.timeUnits}
                </ThemedText>
              </View>
            </View>
            <View style={styles.nutritionalContainer}>
              <View style={styles.nutritionalRow}>
                <View style={styles.nutritionalItem}>
                  <NutritionalInfo
                    icon={<FontAwesome6 name="bread-slice" size={24} color="#0A2533" />}
                    value={4}
                    nutritionalValue="carbs"
                  />
                </View>
                <View style={styles.nutritionalItem}>
                  <NutritionalInfo
                    icon={<FontAwesome6 name="egg" size={24} color="#0A2533" />}
                    value={4}
                    nutritionalValue="proteins"
                  />
                </View>
              </View>
              <View style={styles.nutritionalRow}>
                <View style={styles.nutritionalItem}>
                  <NutritionalInfo
                    icon={<FontAwesome6 name="fire" size={24} color="#0A2533" />}
                    value={4}
                    nutritionalValue="Kcal"
                  />
                </View>
                <View style={styles.nutritionalItem}>
                  <NutritionalInfo
                    icon={<FontAwesome6 name="pizza-slice" size={24} color="#0A2533" />}
                    value={4}
                    nutritionalValue="fats"
                  />
                </View>
              </View>
            </View>

            <TabSwitcher tab1='Ingredients' tab2='Instructions' onTab1Click={() => setCurrTab('Ingredients')} onTab2Click={() => setCurrTab('Instructions')} />
            {
              renderTabContent()
            }
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
    gap: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5
  },
  recipeTime: {
    textAlign: 'center',
    color: '#7c8990'
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  recipeDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
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
  listItem: {
    borderColor: '#E6EBF2',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nutritionalContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  nutritionalRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  nutritionalItem: {
    width: "65%", // Ensure consistent width for items
  },
});
