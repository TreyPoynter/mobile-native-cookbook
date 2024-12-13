import { TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { NewIngredient } from "@/app/(tabs)/add";
import ThemedSearchDropdown from "../ThemedSearchDropdown";
import { getIngredientById } from "@/db/queries/ingredients";
import CenteredPickerModal from "../CenteredPickerModal";
import { ThemedText } from "../ThemedText";

type AddIngredientsPageProps = {
  ingredientsArr: NewIngredient[],
  setIngredientsArr: React.Dispatch<React.SetStateAction<NewIngredient[]>>,
  ingredientDropDownData: any,
  currCount: number,
  setCurrCount: React.Dispatch<React.SetStateAction<number>>,
}

export default function AddIngredients({ ingredientsArr, setIngredientsArr, ingredientDropDownData, currCount, setCurrCount }: AddIngredientsPageProps) {

  const emptyArrayWords = [
    'Looks like the pantry is empty! Add some ingredients to get cooking!',
    'Every great recipe starts with ingredients. Add yours to begin!',
    'If you ain\'t sneezin\' it ain\'t seasoned.',
    'An empty plate? Let\'s fill it with flavor—add your ingredients now!',
  ];

  function addIngredient() {
    const newIngredientCard: NewIngredient = {
      id: currCount,
      value: undefined,
      name: undefined,
      amount: 1,
      unit: 'milliliter'
    };
    setCurrCount(value => ++value);
    // create a new array reference
    setIngredientsArr([...ingredientsArr, newIngredientCard]);
  }

  function removeIngredient(id: number) {
    const newArr = ingredientsArr.filter(item => item.id !== id);
    setIngredientsArr(newArr);
  }

  async function changeIngredient(itemId: number, value: number) {
    // fetch the name asynchronously
    const ingName = await getIngredientById(value);

    // update the state with the new value and name
    setIngredientsArr(prevArr =>
      prevArr.map(ingredient =>
        ingredient.id === itemId
          ? { ...ingredient, value, name: (ingName as NewIngredient).name } // update both value and name
          : ingredient
      )
    );
  }

  function changeIngredientAmount(value: number, unit: string, id: number) {
    setIngredientsArr(prevArr =>
      prevArr.map(ingredient =>
        ingredient.id === id
          ? { ...ingredient, unit: unit, amount: value } // update both amt and unit
          : ingredient
      )
    );
  }


  const renderItem = ({ item }: any) => {

    const currItem = (item as NewIngredient)
    return (
      <View style={styles.ingredientCardContainer}>
        <TouchableOpacity onPress={() => removeIngredient(currItem.id)} activeOpacity={0.2} style={styles.removeButton}>
          <FontAwesome6 name="circle-xmark" size={23} color="#042628" />
        </TouchableOpacity>
        <ThemedSearchDropdown id={currItem.id} data={ingredientDropDownData} onChange={(value) => changeIngredient(currItem.id, value)} dropdownLabel={currItem.name} />
        <View style={styles.pickerModalContainer}>
          <CenteredPickerModal onChange={(v, u) => changeIngredientAmount(v, u, currItem.id)} value={currItem.amount} unit={currItem.unit} />
        </View>
      </View>
    );
  }


  return (
    <View style={styles.addIngredientContainer}>
      <View style={styles.listContainer}>
        {
          ingredientsArr.length > 0 ?
            <FlatList
              style={{ paddingTop: 20, paddingHorizontal: 13 }}
              data={ingredientsArr}
              renderItem={renderItem}
              keyExtractor={(i) => i.id.toString()}
            />
            :
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 60}}>
              <Ionicons name="sparkles" size={100} color="#ccc" />
              <ThemedText style={{color: '#ccc', textAlign: 'center'}}>{emptyArrayWords[Math.floor(Math.random() * emptyArrayWords.length)]}</ThemedText>
            </View>
        }

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
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'visible'
  },
  listContainer: {
    height: 300,
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
  },
  pickerModalContainer: {
    position: 'absolute',
    top: '10%',
    right: 10,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 4,
    zIndex: 2,
    overflow: 'visible'
  }
});
