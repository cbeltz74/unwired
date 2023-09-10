import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFaNNJ972VXPrQaI3YJoCbsYa4LjmJ97k",
  authDomain: "notnotion-2e76b.firebaseapp.com",
  projectId: "notnotion-2e76b",
  storageBucket: "notnotion-2e76b.appspot.com",
  messagingSenderId: "524854660386",
  appId: "1:524854660386:web:526613dd99b9889d5d697b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "movies");

getDocs(colRef)
.then(data => {
    let movies = [];
    data.docs.forEach(document => {
        movies.push({...document.data(), id: document.id})
    });
    console.log(movies);
})

.catch(error => {
    console.log(error);
})
