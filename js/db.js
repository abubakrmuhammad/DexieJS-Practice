/********************
 * DexieJS Practice
 ********************/

const db = new Dexie('MyDatabase');

db.version(1).stores({ friends: '++id, firstName, lastName, age' });

/*
// Update Friend
const updateFriend = () => {
  db.friends.update(2, { name: 'Ali' }).then(count => {
    console.log(count + ' users updated.');
  });
};

*/
