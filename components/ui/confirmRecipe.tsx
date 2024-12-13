import { NewRecipe } from "@/app/(tabs)/add";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TabSwitcher from "../TabSwitcher";
import { useState } from "react";

type ConfirmRecipeProps = {
  newRecipe: NewRecipe
}

export default function ConfirmRecipe({ newRecipe }: ConfirmRecipeProps) {

  const [currSelectedTab, setCurrSelectedTab] = useState('Ingredients');

  function renderTabContent() {
    if (currSelectedTab == "Ingredients") {
      return (
        newRecipe.ingredients.filter(i => i.name).map((ingredient, i) => (
          <View style={styles.listItem}>
            <ThemedText>{ingredient.name}</ThemedText>
            <View>
              <ThemedText>{ingredient.value}</ThemedText>
              <ThemedText>{ingredient?.unit}</ThemedText>
            </View>
          </View>
        ))
      );
    }
    return (
      newRecipe.instructions?.filter(i => i.text).map((instruct, i) => (
        <View style={[styles.listItem, { minHeight: 80 }]}>
          <ThemedText>{instruct.text}</ThemedText>
        </View>
      ))
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <ThemedText type="title" style={{ fontSize: 24 }}>{newRecipe?.recipeName || 'Untitled Dish'}</ThemedText>

        <View style={styles.timeContainer}>
          {
            (newRecipe?.recipeTime && newRecipe?.timeUnits) && <FontAwesome6 name="clock" size={24} color="#7c8990" />
          }
          <ThemedText style={{ color: '#7c8990' }}>{newRecipe?.recipeTime != 0 ? newRecipe.recipeTime.toString() : ''}</ThemedText>
          <ThemedText style={{ color: '#7c8990' }}>{newRecipe?.timeUnits || ''}</ThemedText>
        </View>
      </View>
      <TabSwitcher tab1="Ingredients" tab2="Instructions" onTab1Click={() => setCurrSelectedTab('Ingredients')} onTab2Click={() => setCurrSelectedTab('Instructions')} />
      {
        renderTabContent()
      }
      <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
        <FontAwesome6 name="book" size={24} color="white" />
        <ThemedText style={{color: '#fff'}} type="defaultSemiBold">Add to Cookbook</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 130
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    alignContent: 'center'
  },
  timeContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    gap: 8
  },
  listItem: {
    borderColor: '#E6EBF2',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 8
  },
  addButton: {
    backgroundColor: '#70b9be',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    padding: 8,
    marginTop: 16
  }
})