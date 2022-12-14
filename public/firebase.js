// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { collection, getFirestore, addDoc, getDocs, 
        onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAChI4KwfWm5_EP9LDCWC1EFTVqP1h6PI8",
    authDomain: "crud-firestore-js-2c124.firebaseapp.com",
    projectId: "crud-firestore-js-2c124",
    storageBucket: "crud-firestore-js-2c124.appspot.com",
    messagingSenderId: "369861705410",
    appId: "1:369861705410:web:eb484e8fe1b6d643a3055b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage(app);

export const saveTask = (title, description) => addDoc(collection(db, 'tasks'), { title, description });

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = callback => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    },
    (error) => {
        // Handle unsuccessful uploads
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        });
    }
    );
}