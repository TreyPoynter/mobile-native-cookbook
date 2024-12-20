import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllRecipes } from '@/db/queries/recipes';
import { ThemedText } from '@/components/ThemedText';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Explore() {

  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    async function getRowsTest() {
      const rows = await getAllRecipes();
      console.log(rows)
      setRecipes(rows);
    }

    getRowsTest();

  }, []);

  return (
    <View style={{ padding: 20, display: 'flex' }}>
      <View style={styles.searchContainer}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity>
            <ThemedText>Binders</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedText>Favorites</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex' }}>
          <View style={styles.countContainer}>
            <FontAwesome6 name="utensils" size={18} color='#7c8990' />
            <ThemedText>{recipes.length}</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    borderColor: '#E6EBF2',
    borderWidth: 1,
    borderRadius: 16,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%'
  },
  countContainer: {
    flexDirection: 'row',
    gap: 9,
    borderColor: '#E6EBF2',
    alignItems: 'center',
    borderWidth: 1,
    width: '20%',
    borderRadius: 16,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
})
