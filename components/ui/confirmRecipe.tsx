import { NewRecipe } from "@/app/(tabs)/add";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TabSwitcher from "../TabSwitcher";
import { useEffect, useState } from "react";
import { addRecipe } from "@/db/queries/recipes";

type ConfirmRecipeProps = {
  newRecipe: NewRecipe
}

export default function ConfirmRecipe({ newRecipe }: ConfirmRecipeProps) {

  const [currSelectedTab, setCurrSelectedTab] = useState('Ingredients');
  const [error, setError] = useState<React.JSX.Element | undefined>(undefined)

  async function onConfirmRecipe() {
    await addRecipe(newRecipe);
  }

  useEffect(() => {
    if (newRecipe.recipeTime == 0) {
      setError(<ThemedText style={{ color: '#fff' }} type="defaultSemiBold">Recipe must have a time</ThemedText>);
    }
    else if (!newRecipe.timeUnits) {
      setError(<ThemedText style={{ color: '#fff' }} type="defaultSemiBold">Recipe must have a time unit</ThemedText>);
    }
    else if (newRecipe.ingredients.length < 1) {
      setError(<ThemedText style={{ color: '#fff' }} type="defaultSemiBold">Must have an ingredient</ThemedText>);
    }
    else {
      setError(undefined)
    }



  }, [])

  function renderTabContent() {
    if (currSelectedTab == "Ingredients") {
      return (
        newRecipe.ingredients.map((ingredient, i) => (
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
      newRecipe.instructions?.map((instruct, i) => (
        <View key={instruct.id} style={[styles.listItem, { minHeight: 80 }]}>
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
            (newRecipe?.recipeTime && newRecipe?.timeUnits) ? <FontAwesome6 name="clock" size={24} color="#7c8990" /> : null
          }
          <ThemedText style={{ color: '#7c8990' }}>{newRecipe?.recipeTime != 0 ? newRecipe.recipeTime.toString() : ''}</ThemedText>
          <ThemedText style={{ color: '#7c8990' }}>{newRecipe?.timeUnits || ''}</ThemedText>
        </View>
      </View>
      <TabSwitcher tab1="Ingredients" tab2="Instructions" onTab1Click={() => setCurrSelectedTab('Ingredients')} onTab2Click={() => setCurrSelectedTab('Instructions')} />
      {
        renderTabContent()
      }
      <TouchableOpacity disabled={error != undefined} style={[
        styles.addButton,
        error && styles.errorAddStyle
      ]} activeOpacity={0.8} onPress={onConfirmRecipe}>
        <FontAwesome6 name="book" size={24} color="white" />
        {
          error ?
            error :
            <ThemedText style={{ color: '#fff' }} type="defaultSemiBold">Add to Cookbook</ThemedText>
        }
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
    paddingTop: 3,
    gap: 8
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
  addButton: {
    backgroundColor: '#70b9be',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    padding: 8,
    marginTop: 16
  },
  errorAddStyle: {
    backgroundColor: '#c25e5e',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    padding: 8,
    marginTop: 16
  }
})