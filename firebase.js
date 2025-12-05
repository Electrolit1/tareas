const firebaseConfig = {
  apiKey: "TU_API",
  authDomain: "TU_AUTH",
  projectId: "TU_ID",
  storageBucket: "TU BUCKET"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
