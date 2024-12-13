import * as SQLite from 'expo-sqlite';
import { dbName } from "./ingredients";
import { NewRecipe } from '@/app/(tabs)/add';

export async function addRecipe(recipe: NewRecipe) {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
  } catch (error) {
    
  }
}
