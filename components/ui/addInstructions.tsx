import { TouchableOpacity, View, StyleSheet, FlatList, TextInput, Keyboard } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { NewInstruction } from "@/app/(tabs)/add";
import ThemedSearchDropdown from "../ThemedSearchDropdown";
import { getIngredientById } from "@/db/queries/ingredients";
import ThemedTextbox from "../ThemedTextbox";
import { TouchableWithoutFeedback, GestureHandlerRootView } from "react-native-gesture-handler";

const MAX_CHARACTERS = 200;

type AddIngredientsPageProps = {
  instructionsArr: NewInstruction[],
  setInstructionsArr: React.Dispatch<React.SetStateAction<NewInstruction[]>>,
  currCount: number,
  setCurrCount: React.Dispatch<React.SetStateAction<number>>,
}

export default function AddInstructions({ instructionsArr, setInstructionsArr, currCount, setCurrCount }: AddIngredientsPageProps) {
  function addInstruction() {
    const newIngredientCard: NewInstruction = {
      id: currCount,
      text: ''
    };
    setCurrCount(value => ++value);
    // create a new array reference
    setInstructionsArr([...instructionsArr, newIngredientCard]);
  }

  function removeInstruction(id: number) {
    const newArr = instructionsArr.filter(item => item.id !== id);
    setInstructionsArr(newArr);
  }

  async function changeIngredient(itemId: number, text: number) {
    // fetch the name asynchronously
    const ingName = await getIngredientById(text);

    // update the state with the new value and name
    setInstructionsArr(prevArr =>
      prevArr.map(ingredient =>
        ingredient.id === itemId
          ? { ...ingredient, value: text, name: (ingName as NewInstruction).text } // update both value and name
          : ingredient
      )
    );
  }


  const renderItem = ({ item }: any) => {
    console.log(item)
    return (
      <View style={styles.instructionCardContainer}>
        <TouchableOpacity onPress={() => removeInstruction(item.id)} activeOpacity={0.2} style={styles.removeButton}>
          <FontAwesome6 name="circle-xmark" size={23} color="#042628" />
        </TouchableOpacity>
        <ThemedTextbox multiline={true} numLines={2 }/>
      </View>
    );
  }


  return (
    <View style={styles.addInstructionContainer} >
      <GestureHandlerRootView style={styles.listContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            style={{ paddingTop: 20, paddingHorizontal: 13 }}
            data={instructionsArr}
            renderItem={renderItem}
            keyExtractor={(i) => i.id.toString()}
          />
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={addInstruction} activeOpacity={0.8} style={styles.addButton}>
          <FontAwesome6 name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addInstructionContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'visible'
  },
  listContainer: {
    height: 300,
    overflow: 'visible',
  },
  instructionCardContainer: {
    position: 'relative', // Ensure the container is relative for the absolute positioning to work
    padding: 0,
    overflow: 'visible',
    marginBottom: 8
  },
  textArea: {
    width: '100%'
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
