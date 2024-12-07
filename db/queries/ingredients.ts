import * as SQLite from 'expo-sqlite';

export async function getIngredients() {
  try {
    console.log('HIT METHOD')
    const db = await SQLite.openDatabaseAsync('cookbookData.db');

    const allRows = await db.getAllAsync('SELECT * FROM Ingredients ORDER BY name');
    console.log(allRows[0])
    return allRows;
  } catch (error) {
    console.log(error)
  }

}