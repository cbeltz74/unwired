import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, query, where} from "firebase/firestore";

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
const qRef = query(colRef, where("category", "===", "drama"));


getDocs(qRef)
    .then(data => {
        let movies = [];
        data.docs.forEach(document => {
            movies.push({...document.data(), id: document.id});
        });
        console.log(movies);
    })
    .catch(error => {
        console.log(error);
    });


// onSnapshot(colRef, (data) => {
//     let movies = [];
//     data.docs.forEach(document => {
//         movies.push({...document.data(), id: document.id});
//     });
//     console.log(movies);
// });


const addForm = document.querySelector(".add");
addForm.addEventListener("submit", event => {
    event.preventDefault();
    addDoc(colRef, {
        name: addForm.name.value,
        description: addForm.description.value,
        category: addForm.category.value
    })
    .then(() => {
        addForm.reset();
    });
});


const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", event => {
    event.preventDefault();
    
    const documentReference = doc(db, "movies", deleteForm.id.value);
    deleteDoc(documentReference)
    .then(() => {
            deleteForm.reset();
    });
});