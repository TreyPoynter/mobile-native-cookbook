import { TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { NewIngredient } from "@/app/(tabs)/add";
import ThemedSearchDropdown from "../ThemedSearchDropdown";

type AddIngredientsPageProps = {
  ingredientsArr: NewIngredient[],
  setIngredientsArr: React.Dispatch<React.SetStateAction<NewIngredient[]>>,
  ingredientDropDownData: any,
  currCount: number,
  setCurrCount: React.Dispatch<React.SetStateAction<number>>,
}

export default function AddIngredients({ ingredientsArr, setIngredientsArr,ingredientDropDownData, currCount, setCurrCount }: AddIngredientsPageProps) {

  

  function addIngredient() {
    const newIngredientCard: NewIngredient = {
      id: currCount,
      value: null
    };
    setCurrCount(value => ++value);
    // create a new array reference
    setIngredientsArr([...ingredientsArr, newIngredientCard]);
    console.log(currCount)
  }

  function removeIngredient(id: number) {
    const newArr = ingredientsArr.filter(item => item.id !== id);
    setIngredientsArr(newArr);
  }

  function changeIngredient(itemId: number, value: number) {
    setIngredientsArr(prevArr =>
      prevArr.map(ingredient =>
        ingredient.id === itemId
          ? { ...ingredient, value } // Update the value if IDs match
          : ingredient // Otherwise, keep the ingredient unchanged
      )
    );
  }

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.ingredientCardContainer}>
        <TouchableOpacity onPress={() => removeIngredient(item.id)} activeOpacity={0.2} style={styles.removeButton}>
          <FontAwesome6 name="circle-xmark" size={23} color="#042628" />
        </TouchableOpacity>
        <ThemedSearchDropdown id={item.id} data={ingredientDropDownData} onChange={(value) => changeIngredient(item.id, value)} />
      </View>
    );
  }


  return (
    <View style={styles.addIngredientContainer}>
      <View style={styles.listContainer}>
        <FlatList
        style={{paddingTop: 20, paddingHorizontal: 13}}
          data={ingredientsArr}
          renderItem={renderItem}
          keyExtractor={(i) => i.id.toString()}
        />
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={addIngredient} activeOpacity={0.8} style={styles.addButton}>
          <FontAwesome6 name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  addIngredientContainer: {
    marginTop: 8,
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'visible'
  },
  listContainer: {
    height: 180,
    overflow: 'visible'
  },
  ingredientCardContainer: {
    position: 'relative', // Ensure the container is relative for the absolute positioning to work
    padding: 0,
    overflow: 'visible'
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FFF',
    borderRadius: 24,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Add shadow (Android)
    shadowColor: '#000', // Add shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 2,
    overflow: 'visible'
  },
  addButtonContainer: {
    alignItems: 'center'
  },
  addButton: {
    padding: 10,
    width: 45,
    height: 45,
    backgroundColor: '#70b9be',
    borderRadius: 50,
    alignItems: 'center'
  }
});
