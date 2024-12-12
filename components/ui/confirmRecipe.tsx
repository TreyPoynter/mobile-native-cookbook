import { NewRecipe } from "@/app/(tabs)/add";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TabSwitcher from "../TabSwitcher";
import { useState } from "react";

type ConfirmRecipeProps = {
  newRecipe: NewRecipe
}

export default function ConfirmRecipe({ newRecipe }: ConfirmRecipeProps) {

  const [currSelectedTab, setCurrSelectedTab] = useState('Ingredients');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {
          newRecipe.recipeName && (
            <ThemedText type="title" style={{ fontSize: 24 }}>{newRecipe.recipeName ?? ''}</ThemedText>
          )
        }
        
        {
          newRecipe.recipeTime && (
            <View style={styles.timeContainer}>
              <FontAwesome6 name="clock" size={24} color="#7c8990" />
              <ThemedText style={{color: '#7c8990'}}>{newRecipe.recipeTime ?? ''}</ThemedText>
              <ThemedText style={{color: '#7c8990'}}>{newRecipe.timeUnits ?? ''}</ThemedText>
            </View>
          )
        }
      </View>
      <TabSwitcher tab1="Ingredients" tab2="Instructions" onTab1Click={() => setCurrSelectedTab('Ingredients')} onTab2Click={() => setCurrSelectedTab('Instructions')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    alignContent: 'center'
  },
  timeContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    gap: 8
  }
})