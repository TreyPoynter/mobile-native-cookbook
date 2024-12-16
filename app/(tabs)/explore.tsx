import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useEffect } from 'react';
import { getAllRecipes } from '@/db/queries/recipes';

export default function Explore() {

  useEffect(() => {
    async function getRowsTest() {
      const rows = await getAllRecipes();
      console.log(rows)
    }

    getRowsTest();

  });

  return (
    <View>
      <ThemedText>EXPLORE</ThemedText>
    </View>
  );
}
