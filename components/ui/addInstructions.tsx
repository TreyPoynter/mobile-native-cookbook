import { TouchableOpacity, View, StyleSheet, FlatList, Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { NewInstruction } from "@/app/(tabs)/add";
import ThemedTextbox from "../ThemedTextbox";
import { ThemedText } from "../ThemedText";

const MAX_CHARACTERS = 200;

type AddIngredientsPageProps = {
  instructionsArr: NewInstruction[],
  setInstructionsArr: React.Dispatch<React.SetStateAction<NewInstruction[]>>,
  currCount: number,
  setCurrCount: React.Dispatch<React.SetStateAction<number>>,
}

export default function AddInstructions({ instructionsArr, setInstructionsArr, currCount, setCurrCount }: AddIngredientsPageProps) {

  const emptyArrayWords = [
    'The kitchen is quiet! Write your recipe\'s story one step at a time.',
    'No instructions yet? It\'s your time to shine as the head chef—guide the way!',
    'Cooking adventures start here! Add some instructions to lead the way.',
    'Missing the magic? Add step-by-step instructions to create your masterpiece!',
  ];

  function addInstruction() {
    const newIngredientCard: NewInstruction = {
      id: currCount,
      text: ''
    };
    console.log(newIngredientCard)
    setCurrCount(value => ++value);
    // create a new array reference
    setInstructionsArr([...instructionsArr, newIngredientCard]);
  }

  function removeInstruction(id: number) {
    const newArr = instructionsArr.filter(item => item.id !== id);
    console.log('rem')
    setInstructionsArr(newArr);
  }

  async function changeInstruction(itemId: number, text: string) {
    console.log(text)
    // remove any newline characters (Enter key effect) from the text
    const sanitizedText = text.replace(/\n/g, '');
    if (sanitizedText.length > MAX_CHARACTERS)
      return;

    // update the state with the new value and name
    setInstructionsArr(prevArr =>
      prevArr.map(instruction =>
        instruction.id === itemId
          ? { ...instruction, text: sanitizedText } // update both value and name
          : instruction
      )
    );
  }

  function onKeyPress(e: any) {
    if (e.nativeEvent.key === 'Enter') {
      Keyboard.dismiss(); // Dismiss the keyboard when "Enter" is pressed
      return true; // Prevent any further action on "Enter"
    }
    return false;
  }


  const renderItem = ({ item }: any) => {
    console.log(item)
    return (
      <View style={styles.instructionCardContainer}>
        <TouchableOpacity onPress={() => removeInstruction(item.id)} activeOpacity={0.2} style={styles.removeButton}>
          <FontAwesome6 name="circle-xmark" size={23} color="#042628" />
        </TouchableOpacity>
        <ThemedTextbox multiline={true} numLines={2} onKeyPress={(e) => {
          if (onKeyPress(e)) {
            // Prevent further processing of the key press if it's "Enter"
            e.preventDefault();
          }
        }} onTextChange={(e) => changeInstruction(item.id, e)}
          value={instructionsArr.find((instruction) => instruction.id === item.id)?.text || ''} />
        <ThemedText>{item.text.length} / {MAX_CHARACTERS}</ThemedText>
      </View>
    );
  }


  return (
    <View style={styles.addInstructionContainer} >
      <View style={styles.listContainer}>
        {
          instructionsArr.length > 0 ?
            <FlatList
              style={{ paddingTop: 20, paddingHorizontal: 13 }}
              data={instructionsArr}
              renderItem={renderItem}
              keyExtractor={(i) => i.id.toString()}
              keyboardShouldPersistTaps="handled"
            /> :
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>
              <Ionicons name="map" size={100} color="#ccc" />
              <ThemedText style={{ color: '#ccc', textAlign: 'center' }}>{emptyArrayWords[Math.floor(Math.random() * emptyArrayWords.length)]}</ThemedText>
            </View>
        }

      </View>
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
