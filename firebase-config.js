// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1LqppWSU8KGVNw9xbkFkU1BJLAw0EdUo",
  authDomain: "tareas-542bb.firebaseapp.com",
  projectId: "tareas-542bb",
  storageBucket: "tareas-542bb.appspot.com",
  messagingSenderId: "774046945636",
  appId: "1:774046945636:web:c26868684cfdd9acd66a71",
  measurementId: "G-JF2V8974BX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
