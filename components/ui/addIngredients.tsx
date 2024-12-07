import { TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import IngredientCard from "../IngredientCard";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { NewIngredient } from "@/app/(tabs)/add";
import { getIngredients } from "@/db/queries/ingredients";

type AddIngredientsPageProps = {
  ingredientsArr: NewIngredient[],
  setIngredientsArr: React.Dispatch<React.SetStateAction<NewIngredient[]>>
}

export default function AddIngredients({ ingredientsArr, setIngredientsArr }: AddIngredientsPageProps) {

  const [ingredients, setIngredients] = useState<any>([]);

  useEffect(() => {
    async function setIngredientsHook() {
      const iArr = await getIngredients();
      setIngredients(iArr);
    }

    setIngredientsHook();
  }, [])

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

  const renderItem = (props: NewIngredient) => {
    return <IngredientCard ingredients={ingredients} ingredientName={props.name} onIngredientDelete={() => removeIngredient(props.id)} />;
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
