import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedTextbox from '@/components/ThemedTextbox';
import TabSwitcher from '@/components/TabSwitcher';
import AddBasicInfo from '@/components/ui/addBasicInfo';
import AddIngredients from '../../components/ui/addIngredients';
import AddInstructions from '../../components/ui/addInstructions';
import { getIngredients } from '@/db/queries/ingredients';
import ProgressTracker from '@/components/ui/ProgressTracker';
import { ProgressTrackerPage } from '@/components/ui/ProgressTracker';
import { Text } from 'react-native';
import ConfirmRecipe from '@/components/ui/confirmRecipe';

export type NewIngredient = {
  id: number,
  value: number,
  name: string,
  amount: number,
  unit: string
}
export type NewInstruction = {
  id: number,
  text?: string | null,
}
export type NewRecipe = {
  recipeName: string | null,
  recipeTime: number,
  timeUnits: string
  baseServings: number,
  ingredients: NewIngredient[]
  instructions?: NewInstruction[]
}

export default function Add() {
  // all fields separated so it's easier for readability
  const [recipeName, setRecipeName] = useState('');
  const [recipeTime, setRecipeTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [recipeTimeUnits, setRecipeTimeUnits] = useState('');
  const [ingredients, setIngredients] = useState<NewIngredient[]>([]);
  const [instructions, setInstructions] = useState<NewInstruction[]>([]);
  const [ingredientDropdownData, setIngredientDropdownData] = useState<any>([]);
  const [currCount, setCurrCount] = useState(0);

  const pages: ProgressTrackerPage[] = [
    { component: <AddBasicInfo recipeTitle={recipeName} setRecipeTitle={setRecipeName} recipeTime={recipeTime} setRecipeTime={setRecipeTime} servings={servings} setServings={setServings} recipeTimeUnits={recipeTimeUnits} setRecipeTimeUnits={setRecipeTimeUnits}/>, pageId: 'basic', entypoIcon: 'info' },
    { component: <AddIngredients ingredientsArr={ingredients} setIngredientsArr={setIngredients} ingredientDropDownData={ingredientDropdownData} setCurrCount={setCurrCount} currCount={currCount}/>, pageId: 'ingredients', entypoIcon: 'bowl' },
    { component: <AddInstructions instructionsArr={instructions} setInstructionsArr={setInstructions} currCount={currCount} setCurrCount={setCurrCount}/>, pageId: 'instructions', entypoIcon: 'clipboard' },
    { component: <ConfirmRecipe newRecipe={{
      recipeName: recipeName || null,
      recipeTime: parseInt(recipeTime.toString()),
      timeUnits: recipeTimeUnits,
      baseServings: parseInt(servings.toString()) || 1,
      ingredients: ingredients.filter(i => i.name),  // make sure there's no empty added fields
      instructions: instructions.filter(i => i.text)
    }}/>, pageId: 'step4', entypoIcon: 'flag' },
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
    top: 200, // adjust to set the position
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(255, 255, 255)',
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
