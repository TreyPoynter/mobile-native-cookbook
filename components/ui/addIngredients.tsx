import { TouchableOpacity, View, StyleSheet } from "react-native";
import IngredientCard from "../IngredientCard";
import { FontAwesome6 } from "@expo/vector-icons";

type AddIngredientsPageProps = {
  setIngredients: any;
}

export default function AddIngredients({setIngredients}: AddIngredientsPageProps) {
  return(
    <View>
      <IngredientCard/>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity activeOpacity={0.8} style={styles.addButton}>
          <FontAwesome6 name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    alignItems: 'center'
  },
  addButton: {
    padding: 10,
    width: 45,
    backgroundColor: '#70b9be',
    borderRadius: 50,
    alignItems: 'center'
  }
})
