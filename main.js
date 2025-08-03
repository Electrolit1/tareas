// main.js
import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let isAdmin = false;

export async function mostrarTareas(destino = "taskList", mostrarEliminar = false) {
  const lista = document.getElementById(destino);
  lista.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "tareas"));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "task-card";
    div.innerHTML = `
      <strong>${data.descripcion}</strong><br>
      Para: ${data.para}<br>
      Fecha: ${data.fecha}<br>
      Escrito por: ${data.autor}
    `;
    if (mostrarEliminar) {
      const btn = document.createElement("button");
      btn.textContent = "×";
      btn.title = "Eliminar tarea";
      btn.onclick = async () => {
        if (confirm("¿Seguro quieres eliminar esta tarea?")) {
          await deleteDoc(doc(db, "tareas", docSnap.id));
          mostrarTareas("adminTasks", true);
          mostrarTareas();
        }
      };
      div.appendChild(btn);
    }
    lista.appendChild(div);
  });
}

export async function agregarTarea() {
  const descripcion = document.getElementById("descripcion").value.trim();
  const para = document.getElementById("para").value.trim();
  const fecha = document.getElementById("fecha").value;
  const autor = document.getElementById("autor").value.trim();

  if (!descripcion || !para || !fecha || !autor) {
    alert("Completa todos los campos");
    return;
  }

  await addDoc(collection(db, "tareas"), {
    descripcion, para, fecha, autor
  });

  mostrarTareas("adminTasks", true);
  mostrarTareas();

  document.getElementById("descripcion").value = "";
  document.getElementById("para").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("autor").value = "";
}

export function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("btnSoyPadre").style.display = "none";
  document.getElementById("userStatus").textContent = "";
}

export function closeLogin() {
  document.getElementById("loginForm").style.display = "none";
  if (!isAdmin) {
    document.getElementById("btnSoyPadre").style.display = "block";
  }
}

export function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (user === "Admin" && pass === "familia2025") {
    isAdmin = true;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("btnSoyPadre").style.display = "none";
    document.getElementById("userStatus").textContent = `👤 Usuario activo: ${user}`;
    mostrarTareas("adminTasks", true);
  } else {
    alert("Credenciales incorrectas.");
  }
}

export function logout() {
  isAdmin = false;
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("userStatus").textContent = "";
  document.getElementById("btnSoyPadre").style.display = "block";
}
