import { StyleSheet, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllRecipes, getRecipesByName } from '@/db/queries/recipes';
import { ThemedText } from '@/components/ThemedText';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ThemedTextbox from '@/components/ThemedTextbox';
import RecipeModal from '@/components/RecipeModal';

export type Recipe = {
  id: number
  name?: string
  recipeTime?: number
  timeUnits?: string
  baseServings?: number
  imageUri?: string
  ingredients: any[]
  instructions: any[]
}


export default function Explore() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recipeId, setRecipeId] = useState<number | null>(null);

  async function getRecipesOnLoad() {
    const rows = await getAllRecipes();
    setRecipes((rows as Recipe[]));
  }

  useEffect(() => {

    getRecipesOnLoad();

  }, []);

  useEffect(() => {
    if (!currentSearch || currentSearch == '')
      getRecipesOnLoad();

    async function getSearchedRecipes() {
      const searched = await getRecipesByName(currentSearch);
      setRecipes((searched as Recipe[]))
    }

    getSearchedRecipes();
  }, [currentSearch])

  function RecipeCard({ item, isLeft = false }: { item: any, isLeft?: boolean }) {
    const recipe = item as Recipe;

    switch (recipe.timeUnits) {
      case 'Minutes':
        recipe.timeUnits = 'Min'
        break;
    }

    function onCardPress(id: number) {
      setModalVisible(true);
      setRecipeId(id);
    }

    return (
      <TouchableOpacity onPress={() => onCardPress(recipe.id)} activeOpacity={0.7} style={[styles.recipeCard, isLeft && styles.leftColumnMargin]}>
        <Image
          source={recipe.imageUri ? { uri: recipe.imageUri } : require('../../assets/images/recipe-image-placehodler.png')}
          style={styles.recipeImage}
        />
        <View style={{ alignItems: 'flex-start' }}>
          <ThemedText style={styles.recipeName}>
            {recipe.name || 'Untitled Dish'}
          </ThemedText>
        </View>
        <View style={styles.timeContainer}>
          <FontAwesome6 name="clock" size={12} color="#7c8990" />
          <ThemedText style={styles.recipeTime}>
            {recipe.recipeTime} {recipe.timeUnits}
          </ThemedText>
        </View>
      </TouchableOpacity>

    );
  }


  function renderItem({ item, index }: { item: Recipe, index: number }) {
    const isLeftColumn = index % 2 === 0;
    return (
      <View style={{ flex: 1 / 2 }}>
        <RecipeCard item={item} isLeft={isLeftColumn} />
      </View>
    );
  }


  return (
    <View style={{ padding: 20, paddingTop: 30, flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.searchContainer}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <View style={styles.countContainer}>
            <FontAwesome6 name="utensils" size={18} color='#7c8990' />
            <ThemedText>{recipes.length}</ThemedText>
          </View>
          <ThemedTextbox onTextChange={setCurrentSearch} placeholder='Search Recipes...' styles={styles.text} />
        </View>
      </View>
      <View>
        {
          recipes.length > 0 ?
            <FlatList
              contentContainerStyle={{ paddingBottom: 160, paddingTop: 20 }}
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
      <RecipeModal
        recipeId={recipeId || 0}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
    padding: 10,
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
    borderRadius: 16,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  recipeTime: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7c8990'
  },
  recipeName: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  leftColumnMargin: {
    marginRight: 10,
  },
})
