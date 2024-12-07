import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export default async function loadDb() {
  const dbName = 'cookbookData.db';
  const dbAsset = require('../assets/cookbookData.db');
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  if(!fileInfo.exists) {  // create db if one doesn't exist
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`, 
      {intermediates: true}
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }

  return dbFilePath;
}