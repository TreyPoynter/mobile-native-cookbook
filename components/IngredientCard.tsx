import { View, StyleSheet } from "react-native";

type IngredientCardProps = {
  ingredientName: string,
  calories?: number
}

export default function IngredientCard({ingredientName, calories = 0}: IngredientCardProps) {
  return(
    <View>
      
    </View>
  );
}

