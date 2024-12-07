import * as SQLite from 'expo-sqlite';
import { NewIngredient } from '@/app/(tabs)/add';

export async function getIngredients() {
  try {
    const db = await SQLite.openDatabaseAsync('cookbookData.db');

    const allRows = await db.getAllAsync('SELECT * FROM Ingredients ORDER BY name');
    return allRows;
  } catch (error) {
    console.log(error)
  }

}