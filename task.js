import { db } from "./firebase.js";
import { setDoc, getDoc, getDocs, deleteDoc, doc, collection } 
from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const usuario = sessionStorage.getItem("usuario");
if (!usuario) location.href = "index.html";

document.getElementById("titulo").innerText = `Tareas de ${usuario}`;

const lista = document.getElementById("lista");

async function cargarTareas() {
    lista.innerHTML = "";
    const query = await getDocs(collection(db, "tareas", usuario, "items"));
    query.forEach(docSnap => {
        const data = docSnap.data();
        const div = document.createElement("div");
        div.className = "task " + (data.completada ? "done" : "");
        div.innerHTML = `
            ${data.texto}
            <div>
              <button onclick="completar('${docSnap.id}', ${!data.completada})">✔</button>
              <button onclick="eliminar('${docSnap.id}')">🗑</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

window.agregarTarea = async function () {
    const texto = document.getElementById("tareaInput").value.trim();
    if (!texto) return;

    const id = Date.now().toString();
    await setDoc(doc(db, "tareas", usuario, "items", id), { texto, completada:false });

    document.getElementById("tareaInput").value = "";
    cargarTareas();
}

window.eliminar = async function (id) {
    await deleteDoc(doc(db, "tareas", usuario, "items", id));
    cargarTareas();
}

window.completar = async function (id, estado) {
    await setDoc(doc(db, "tareas", usuario, "items", id), { completada:estado }, { merge:true });
    cargarTareas();
}

cargarTareas();
