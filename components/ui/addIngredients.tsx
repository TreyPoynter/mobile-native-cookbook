import { TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { NewIngredient } from "@/app/(tabs)/add";
import { getIngredients } from "@/db/queries/ingredients";
import ThemedSearchDropdown from "../ThemedSearchDropdown";

type AddIngredientsPageProps = {
  ingredientsArr: NewIngredient[],
  setIngredientsArr: React.Dispatch<React.SetStateAction<NewIngredient[]>>
}

export default function AddIngredients({ ingredientsArr, setIngredientsArr }: AddIngredientsPageProps) {

  const [ingredientDropdownData, setIngredientDropdownData] = useState<any>([]);

  useEffect(() => {
    async function setIngredientsHook() {
      const ingredients = await getIngredients() ?? [];
      const formattedData = ingredients.map((item : any) => ({  // so the themed dropdown can search it
        label: item.name,
        value: item.id,
      }));
      setIngredientDropdownData(formattedData);
    }


    setIngredientsHook();
  }, []);

  function addIngredient() {
    const newIngredientCard: NewIngredient = {
      id: ingredientsArr.length,
      name: '',
      calories: 0
    };
    // create a new array reference
    setIngredientsArr([...ingredientsArr, newIngredientCard]);
  }

  function removeIngredient(index: number) {
    ingredientsArr.splice(index, 1); // remove the ingredient at the specified index

    // reassign IDs to match the current index
    ingredientsArr.forEach((ingredient, i) => {
      ingredient.id = i;
    });
  }

  const renderItem = () => {
    return (
      <ThemedSearchDropdown data={ingredientDropdownData} onChange={() => console.log('CHANGE ME LATER PLEASE')}/>
    );
  }


  return (
    <View style={styles.addIngredientContainer}>
      <View style={styles.listContainer}>
        <FlatList
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
    justifyContent: 'flex-start'
  },
  listContainer: {
    height: 180,
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
