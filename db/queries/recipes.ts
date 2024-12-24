import * as SQLite from 'expo-sqlite';
import { dbName } from "./ingredients";
import { NewRecipe } from '@/app/(tabs)/add';

const unitToGrams = {
  gram: 1, // Base unit
  kilogram: 1000, // 1 kilogram = 1000 grams
  milliliter: 1, // Approximate for water-based liquids
  liter: 1000, // Approximate for water-based liquids
  ounce: 28.3495, // 1 ounce = 28.3495 grams
  cup: 200, // General average for most ingredients
  tsp: 5, // Approximation for dry and liquid ingredients
  tbsp: 15, // 1 tbsp = 3 tsp
  piece: 50, // Assumed for medium-sized items (like fruits or vegetables)
  unit: 1, // Fallback for abstract units
};


export const convertToGrams = (quantity: number, unit: string) => {
  return quantity * (unitToGrams[unit] || 1); // Default to grams if unit is missing
};

export async function getAllRecipes() {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);

    const allRows = await db.getAllAsync('SELECT id, name, recipeTime, timeUnits, imageUri FROM Recipes');
    return allRows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getRecipeById(id: number) {
  if (!id) return null;

  try {
    const db = await SQLite.openDatabaseAsync(dbName);

    // Fetch the main recipe details
    const recipe = await db.getFirstAsync(`SELECT * FROM Recipes WHERE id = ${id}`);
    if (!recipe) return null;

    // Fetch the ingredients associated with the recipe
    const ingredients = await db.getAllAsync(`
      SELECT i.*, ri.unit, ri.quantity
      FROM Ingredients i
      JOIN Recipe_Ingredients ri ON i.id = ri.ingredientId
      WHERE ri.recipeId = ${id}
    `);


    // Convert each ingredient to grams and calculate total kCal
    let totalKCal = 0;
    let totalCarbs = 0;
    let totalProteins = 0;
    let totalFats = 0;
    const ingredientsWithGrams = ingredients.map((ingredient: any) => {
      console.log(`${ingredient.quantity}${ingredient.unit}`)
      // Convert quantity to grams
      const quantityInGrams = convertToGrams(ingredient.quantity, ingredient.unit);
      console.log(`QIG - ${quantityInGrams}`);

      const ingredientCarbs = (quantityInGrams / 100) * ingredient.carbs;
      const ingredientProteins = (quantityInGrams / 100) * ingredient.protein;
      const ingredientFats = (quantityInGrams / 100) * ingredient.fat;
      const ingredientKCal = (quantityInGrams / 100) * ingredient.kCal;

      // Accumulate totals
      totalCarbs += ingredientCarbs;
      totalProteins += ingredientProteins;
      totalFats += ingredientFats;
      totalKCal += ingredientKCal;

      // Return the updated ingredient object
      return {
        ...ingredient,
        quantityInGrams,
        ingredientCarbs: ingredientCarbs.toFixed(2),
        ingredientProteins: ingredientProteins.toFixed(2),
        ingredientFats: ingredientFats.toFixed(2),
        ingredientKCal: ingredientKCal.toFixed(2),
      };
    });

    // Fetch the instructions associated with the recipe
    const instructions = await db.getAllAsync(`
      SELECT instr.*
      FROM Instructions instr
      JOIN Recipe_Instructions ri ON instr.id = ri.instructionId
      WHERE ri.recipeId = ${id}
      ORDER BY ri.stepOrder
    `);

    console.log(totalProteins)

    return {
      ...recipe,
      ingredients: ingredients,
      instructions: instructions,
      carbs: totalCarbs.toFixed(0),
      proteins: totalProteins.toFixed(0),
      fats: totalFats.toFixed(0),
      kCal: totalKCal.toFixed(0),
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export async function getRecipesByName(name: string) {
  if (!name)
    return [];

  try {
    const db = await SQLite.openDatabaseAsync(dbName);

    const allRows = await db.getAllAsync(`SELECT id, name, recipeTime, timeUnits, imageUri FROM Recipes WHERE name LIKE \'%${name}%\'`);
    return allRows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

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
        "imageUri"	TEXT,
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
      'INSERT INTO Recipes (name, recipeTime, timeUnits, baseServings, imageUri) VALUES (?, ?, ?, ?, ?);',
      [
        recipe.recipeName,
        recipe.recipeTime,
        recipe.timeUnits,
        recipe.baseServings,
        recipe.imageUri || null
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

      if (!foundIngredient)  // data integrity
        break;

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
