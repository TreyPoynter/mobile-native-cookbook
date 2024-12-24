import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

type NutritionalInfoProps = {
  icon: any;
  value: number;
  nutritionalValue: "carbs" | "proteins" | "Kcal" | "fats" | "fiber" | "sugar";
};

export default function NutritionalInfo({ icon, value, nutritionalValue }: NutritionalInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <ThemedText style={styles.text}>
          {value} {nutritionalValue}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 50, // Ensures consistent alignment across rows
  },
  iconContainer: {
    backgroundColor: "#e6ebf2",
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  },
});
