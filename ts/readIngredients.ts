import Papa from 'papaparse';

const readIngredients = async () => {
  const csvFile = require('./ingredients.csv'); // Path to CSV
  const response = await fetch(csvFile);
  const csvData = await response.text();
  
  Papa.parse(csvData, {
    header: true,
    complete: (result) => {
      console.log(result.data); // Parsed CSV as JSON
    },
  });
};

export default readIngredients;
