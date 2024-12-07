import * as SQLite from 'expo-sqlite';

export async function getIngredients() {
  try {
    const db = await SQLite.openDatabaseAsync('ingredients.db');

    const allRows = await db.getAllAsync('SELECT * FROM Ingredients ORDER BY name');
    console.log(allRows);
    return allRows;
  } catch (error) {
    console.log(error)
  }

}