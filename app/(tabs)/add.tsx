import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedTextbox from '@/components/ThemedTextbox';
import TabSwitcher from '@/components/TabSwitcher';
import AddIngredients from '../../components/ui/addIngredients';
import AddInstructions from '../../components/ui/addInstructions';
import ThemedDropdown from '@/components/ThemedDropdown';

export type Ingredient = {
  name: string,
  calories: number
}
export type NewIngredient = Ingredient & {
  id: number
}

const timeSelections = [
  { label: 'Minutes', value: 'Minutes' },
  { label: 'Hours', value: 'Hours' },
  { label: 'Days', value: 'Days' },
];

export default function Add() {
  // all fields separated so it's easier for readability
  const [recipeName, setRecipeName] = useState('');
  const [recipeTime, setRecipeTime] = useState(0);
  const [recipeTimeUnits, setRecipeTimeUnits] = useState('');
  const [ingredients, setIngredients] = useState<NewIngredient[]>([]);

  const [selectedTab, setSelectedTab] = useState("Ingredients");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Ingredients":
        return <AddIngredients ingredientsArr={ingredients} setIngredientsArr={setIngredients} />;
      case "Instructions":
        return <AddInstructions />;
      default:  // in case the values get tampered with somehow
        setSelectedTab('Ingredients');
        return <AddIngredients ingredientsArr={ingredients} setIngredientsArr={setIngredients} />;
    }
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.scrollableModuleContainer}>
        <View style={styles.scrollableContent}>
          <ThemedTextbox placeholder='Recipe Title' onTextChange={setRecipeName} />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <ThemedDropdown data={Array.from({ length: 60 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))}
              fa6Icon={'clock'} style={{ width: '49%' }} onChange={setRecipeTime} />
            <ThemedDropdown data={timeSelections} fa6Icon={'ruler-horizontal'} style={{ width: '49%' }} onChange={setRecipeTimeUnits} />
          </View>

          <View>
            <TabSwitcher tab1='Ingredients' tab2='Instructions' onTab1Click={() => setSelectedTab('Ingredients')} onTab2Click={() => setSelectedTab('Instructions')} />
            {
              renderTabContent()
            }
          </View>
        </View>
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
    height: 300,
  },
  scrollableModuleContainer: {
    position: 'absolute',
    top: 250, // adjust to set the position of the scrollable content
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(255, 255, 255)', // semi-transparent background
    zIndex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  scrollableContent: {
    padding: 20,
    display: 'flex',
    gap: 8
  },
  textContent: {
    fontSize: 16,
    marginBottom: 10,
  }
});
