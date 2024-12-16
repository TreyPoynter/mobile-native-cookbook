import * as SQLite from 'expo-sqlite';
import { dbName } from "./ingredients";
import { NewRecipe } from '@/app/(tabs)/add';

export async function addRecipe(recipe: NewRecipe) {
  const db = await SQLite.openDatabaseAsync('cookbookData.db');
  
  try {
    // check to see if the tables exist
    await db.execAsync('BEGIN TRANSACTION');
    const creationDb = await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "Recipes" (
        "id"	INTEGER,
        "name"	TEXT,
        "recipeTime"	INTEGER NOT NULL,
        "timeUnits"	TEXT NOT NULL,
        "baseServings"	INTEGER DEFAULT 1,
        PRIMARY KEY("id" AUTOINCREMENT)
      );

      CREATE TABLE IF NOT EXISTS "Instructions" (
	      "id"	INTEGER,
	      "instruction"	TEXT NOT NULL,
	      PRIMARY KEY("id" AUTOINCREMENT)
      );

      CREATE TABLE IF NOT EXISTS "Recipe_Instructions" (
        "id"	INTEGER,
        "recipeId"	INTEGER NOT NULL,
        "instructionId"	INTEGER NOT NULL,
        "stepOrder"	INTEGER NOT NULL,
        PRIMARY KEY("id"),
        FOREIGN KEY("instructionId") REFERENCES "Instructions"("id"),
        FOREIGN KEY("recipeId") REFERENCES "Recipes"("id")
      );

      CREATE TABLE IF NOT EXISTS "Recipe_Ingredients" (
        "id"	INTEGER,
        "recipeId"	INTEGER NOT NULL,
        "ingredientId"	INTEGER NOT NULL,
        "quantity"	INTEGER NOT NULL,
        "unit"	TEXT,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("ingredientId") REFERENCES "Ingredients"("id"),
        FOREIGN KEY("recipeId") REFERENCES "Recipes"("id")
      );
    `);
    console.log('CREATE', creationDb)

    

    // Step 1: Insert the recipe into the `Recipes` table
    const recipeResult = await db.runAsync(
      'INSERT INTO Recipes (name, recipeTime, timeUnits, baseServings) VALUES (?, ?, ?, ?);',
      [
        recipe.recipeName,
        recipe.recipeTime,
        recipe.timeUnits,
        recipe.baseServings
      ]
    );
    const recipeId = recipeResult.lastInsertRowId;

    // Step 2: Insert instructions and their mapping into `Instructions` and `recipeInstructions` if there's anything
    if (recipe.instructions) {
      for (let i = 0; i < recipe.instructions.length; i++) {
        const instruction = recipe.instructions[i];

        // Insert the instruction
        const instructionResult = await db.runAsync(
          'INSERT INTO Instructions (instruction) VALUES (?);',
          [
            instruction.text || ''
          ]

        );
        console.log('INSTRUCT INSERT RESULT', instructionResult)
        const instructionId = instructionResult.lastInsertRowId;

        // Map the instruction to the recipe in the `recipeInstructions` join table
        await db.runAsync(
          'INSERT INTO Recipe_Instructions (recipeId, instructionId, stepOrder) VALUES (?, ?, ?);',
          [
            recipeId,
            instructionId,
            i + 1
          ]

        );
      }
    }


    // Step 3: Insert ingredient ids into the `recipeIngredients` table
    for (const ingredient of recipe.ingredients) {
      const foundIngredient = await db.getFirstAsync('SELECT id FROM Ingredients WHERE id = ?;', [ingredient.value]);

      if(!foundIngredient)  // data integrity
        break;

      console.log('FOUND INGREDIENT')

      const ingredientResult = await db.runAsync(
        'INSERT INTO Recipe_Ingredients (recipeId, ingredientId, quantity, unit) VALUES (?, ?, ?, ?);',
        [
          recipeId,
          ingredient.value,
          ingredient.amount,
          ingredient.unit
        ]
      );
      console.log('INGREDIENT INSERT RESULT', ingredientResult)
    }

    // Commit the transaction
    console.log('Committing transaction...');
    await db.execAsync('COMMIT');
    console.log(`Recipe "${recipe.recipeName || 'Undefined Recipe'}" added successfully`)
    return `Recipe "${recipe.recipeName || 'Undefined Recipe'}" added successfully`;

  } catch (error) {
    console.log(error)
    await db.execAsync('ROLLBACK');
    return 'Issue adding Recipe'
  }
}
