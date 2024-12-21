import { StyleSheet, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllRecipes } from '@/db/queries/recipes';
import { ThemedText } from '@/components/ThemedText';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ThemedTextbox from '@/components/ThemedTextbox';

export type Recipe = {
  id: number
  name?: string
  image?: string
  recipeTime: number
  timeUnits: string
  baseServings: number
}

export default function Explore() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);



  useEffect(() => {
    async function getRecipesOnLoad() {
      const rows = await getAllRecipes();
      setRecipes((rows as Recipe[]));
    }

    getRecipesOnLoad();

  }, []);

  function RecipeCard({ item, isLeft = false, isLast = false }: { item: any, isLeft?: boolean, isLast?: boolean }) {
    const recipe = item as Recipe;

    return (
      <TouchableOpacity activeOpacity={0.7} style={[styles.recipeCard, isLeft && styles.leftColumnMargin, isLast && styles.lastItem]}>
        <Image
          source={recipe.image ? { uri: recipe.image } : require('../../assets/images/recipe-image-placehodler.png')}
          style={styles.recipeImage}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ThemedText style={styles.recipeName}>
            {recipe.name || 'Untitled Dish'}
          </ThemedText>
          <View style={styles.timeContainer}>
            <FontAwesome6 name="clock" size={12} color="#7c8990" />
            <ThemedText style={styles.recipeTime}>
              {recipe.recipeTime} {recipe.timeUnits}
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  function renderItem({ item, index }: { item: Recipe, index: number }) {
    const isLeftColumn = index % 2 === 0 && index+1 != recipes.length;
    return <RecipeCard item={item} isLeft={isLeftColumn} isLast={index+1 == recipes.length}/>;
  }


  return (
    <View style={{ padding: 20, paddingTop: 30, flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.searchContainer}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <View style={styles.countContainer}>
            <FontAwesome6 name="utensils" size={18} color='#7c8990' />
            <ThemedText>{recipes.length}</ThemedText>
          </View>
          <ThemedTextbox placeholder='Search Recipes...' styles={styles.text} />
        </View>
      </View>
      <View>
        {
          recipes.length > 0 ?
            <FlatList
              style={{ paddingTop: 20 }}
              data={recipes}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={(i) => i.id.toString()}
            />
            :
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>
              <ThemedText style={{ color: '#ccc', textAlign: 'center', marginTop: 4 }}>EMPTY</ThemedText>
            </View>
        }
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
    borderRadius: 16,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: 'flex-start', // Makes the border fit the content
  },
  text: {
    flex: 1,
  },
  recipeCard: {
    borderColor: '#E6EBF2',
    borderWidth: 1,
    borderRadius: 16,
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  recipeImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  recipeTime: {
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    gap: 8
  },
  recipeName: {
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  leftColumnMargin: {
    marginRight: 10,
  },
  lastItem: {
    marginBottom: 180
  }
})
