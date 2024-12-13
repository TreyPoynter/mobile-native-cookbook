import * as SQLite from 'expo-sqlite';
export const dbName = 'cookbookData.db';

export async function getIngredients() {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);

    const allRows = await db.getAllAsync('SELECT id, name FROM Ingredients ORDER BY name ');
    return allRows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getIngredientById(id: number) {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);

    const result = await db.getAllAsync(`SELECT id, name FROM Ingredients WHERE id = ${id}`);
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
