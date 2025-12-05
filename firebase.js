// VERSION PARA USAR CON SCRIPT NORMAL EN HTML (SIN IMPORT)
const firebaseConfig = {
  apiKey: "AIzaSyAbkpn2i02BQ4EdbxPRmjMTiJb_U32noZA",
  authDomain: "respuestas-a0c38.firebaseapp.com",
  databaseURL: "https://respuestas-a0c38-default-rtdb.firebaseio.com",
  projectId: "respuestas-a0c38",
  storageBucket: "respuestas-a0c38.firebasestorage.app",
  messagingSenderId: "694006707121",
  appId: "1:694006707121:web:79267ca0496b935bd88390",
  measurementId: "G-FLNG6V9KMK"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Firestore
const db = firebase.firestore();
