// backend/firestore/users.js
const admin = require('firebase-admin');
const db = admin.firestore();
const usersRef = db.collection('users');

module.exports = {
    createUser: async (userData) => {
        const userDoc = usersRef.doc(userData.email); // Using email as ID
        await userDoc.set(userData);
        return userData;
    },

    getUserByEmail: async (email) => {
        const userDoc = await usersRef.doc(email).get();
        return userDoc.exists ? userDoc.data() : null;
    }
};
