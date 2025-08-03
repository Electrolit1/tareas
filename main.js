import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

// Mostrar tareas
async function cargarTareas() {
  const tareasRef = collection(db, "tareas");
  const snapshot = await getDocs(tareasRef);
  const lista = document.getElementById("taskList");
  lista.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    lista.innerHTML += `
      <div class="task">
        <b>Tarea:</b> ${data.tarea}<br>
        <b>Para:</b> ${data.para}<br>
        <b>Fecha:</b> ${data.fecha}<br>
        <b>Hecha por:</b> ${data.autor}
      </div>
    `;
  });
}

window.guardarTarea = async () => {
  const tarea = document.getElementById("tarea").value;
  const para = document.getElementById("para").value;
  const autor = document.getElementById("autor").value;
  const fecha = document.getElementById("fecha").value;

  if (!tarea || !para || !autor || !fecha) return alert("Completa todos los campos");

  await addDoc(collection(db, "tareas"), { tarea, para, autor, fecha });
  alert("Tarea guardada");
  cargarTareas();
}

// Admin login simple
window.login = () => {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "admin" && pass === "1234") {
    document.querySelector(".add-task").classList.remove("hidden");
    document.querySelector(".admin-login").classList.add("hidden");
  } else {
    alert("Usuario o contraseña incorrecta");
  }
};

cargarTareas();
