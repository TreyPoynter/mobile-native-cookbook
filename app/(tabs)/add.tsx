import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedTextbox from '@/components/ThemedTextbox';
import TabSwitcher from '@/components/TabSwitcher';
import AddBasicInfo from '@/components/ui/addBasicInfo';
import AddIngredients from '../../components/ui/addIngredients';
import AddInstructions from '../../components/ui/addInstructions';
import ThemedDropdown from '@/components/ThemedDropdown';
import { getIngredients } from '@/db/queries/ingredients';
import ProgressTracker from '@/components/ui/ProgressTracker';
import { ProgressTrackerPage } from '@/components/ui/ProgressTracker';
import { Text } from 'react-native';

export type Ingredient = {
  name: string,
  calories: number
}
export type NewIngredient = {
  id: number
  value?: number | null,
  name?: string | null,
}





export default function Add() {

  

  // all fields separated so it's easier for readability
  const [recipeName, setRecipeName] = useState('');
  const [recipeTime, setRecipeTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [recipeTimeUnits, setRecipeTimeUnits] = useState('');
  const [ingredients, setIngredients] = useState<NewIngredient[]>([]);

  const [selectedTab, setSelectedTab] = useState("Ingredients");
  const [ingredientDropdownData, setIngredientDropdownData] = useState<any>([]);
  const [currIngredientCount, setCurrIngredientCount] = useState(0);

  const pages: ProgressTrackerPage[] = [
    { component: <AddBasicInfo setRecipeTitle={setRecipeName} setRecipeTime={setRecipeTime} SetRecipeServings={setServings} setRecipeTimeUnits={setRecipeTimeUnits}/>, pageId: 'step1', entypoIcon: 'info' },
    { component: <AddIngredients ingredientsArr={ingredients} setIngredientsArr={setIngredients} ingredientDropDownData={ingredientDropdownData} setCurrCount={setCurrIngredientCount} currCount={currIngredientCount}/>, pageId: 'step2', entypoIcon: 'bowl' },
    { component: <Text>Step 3 Content</Text>, pageId: 'step3', entypoIcon: 'clipboard' },
  ];

  useEffect(() => {
    async function setIngredientsHook() {
      const ingredientsDbData = await getIngredients() ?? [];
      const formattedData = ingredientsDbData.map((item: any) => ({  // so the themed dropdown can render/search it
        label: item.name,
        value: item.id,
      }));
      setIngredientDropdownData(formattedData);
    }

    setIngredientsHook();
  }, []);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Ingredients":
        return <AddIngredients ingredientsArr={ingredients} setIngredientsArr={setIngredients}
          ingredientDropDownData={ingredientDropdownData} currCount={currIngredientCount} setCurrCount={setCurrIngredientCount} />;
      case "Instructions":
        return <AddInstructions />;
      default:  // in case the values get tampered with somehow
        setSelectedTab('Ingredients');
        return <AddIngredients ingredientsArr={ingredients} setIngredientsArr={setIngredients}
          ingredientDropDownData={ingredientDropdownData} currCount={currIngredientCount} setCurrCount={setCurrIngredientCount} />;
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

      <View style={styles.moduleContainer}>
        <ProgressTracker pages={pages} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
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
  moduleContainer: {
    position: 'absolute',
    top: 200, // adjust to set the position of the scrollable content
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(255, 255, 255)', // semi-transparent background
    zIndex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'visible',
    padding: 20,
  },
  textContent: {
    fontSize: 16,
    marginBottom: 10,
  }
});
