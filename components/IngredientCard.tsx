import { View, StyleSheet, Text } from "react-native";

type IngredientCardProps = {
  ingredientName: string,
  calories?: number,
  onIngredientDelete: (id: number) => void
}

export default function IngredientCard({ingredientName, calories = 0}: IngredientCardProps) {
  return(
    <View style={styles.cardContainer}>
      <Text>{'HI'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: '#E6EBF2',
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    marginBottom: 8
  }
})
