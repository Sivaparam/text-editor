import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //creates connection to database and the version
 const textEditorDb = await openDB('jate', 1);
 // create new transaction and specify the database and data privilages
 const transaction = textEditorDb.transaction('jate', 'readwrite');
 // open up desired object store
 const store = transaction.objectStore('jate');
 // add content to databse
 const request = store.put({id: 1, value: content});
 //get confirmation of result
 const result = await request;

  console.log('Data saved to database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //create a connection to the database and specify the version to use
  const textEditorDb = await openDB('jate', 1);
  //create a new transaction and specify the database and data privilages
  const transaction = textEditorDb.transaction('jate', 'readonly');
  //open up the desired object store
  const store = transaction.objectStore('jate');
  //getAll() method to get all data from database
  const request = store.getAll();

//get confirmation of the result
const result = await request;
console.log('result.value', result);
}

initdb();
