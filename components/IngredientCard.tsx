import { View, StyleSheet, Text } from "react-native";
import ThemedSearchDropdown from "./ThemedSearchDropdown";

type IngredientCardProps = {
  ingredients: () => Promise<void>,
  ingredientName: string,
  calories?: number,
  onIngredientDelete: (id: number) => void
}

export default function IngredientCard({
  ingredients,
  ingredientName,
  calories = 0,
  onIngredientDelete,
}: IngredientCardProps) {
  if (!ingredientName) {
    return <ThemedSearchDropdown data={ingredients}/>;
  }

  return (
    <View style={styles.cardContainer}>
      <Text>{ingredientName}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    borderColor: '#E6EBF2',
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    marginBottom: 6
  }
})
