// login.js
import { db } from "./firebase.js";
import { setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

export async function registrarse() {
  const nick = document.getElementById("regNick").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  if (!nick || !pass) return alert("⚠ Completa todos los campos");

  const ref = doc(db, "usuarios", nick);
  const check = await getDoc(ref);

  if (check.exists()) {
    return alert("❌ Ese usuario ya está registrado");
  }

  await setDoc(ref, { pass });

  alert("✔ Registro exitoso!");
  sessionStorage.setItem("usuario", nick);
  window.location = "app.html";
}

export async function login() {
  const nick = document.getElementById("logNick").value.trim();
  const pass = document.getElementById("logPass").value.trim();

  const ref = doc(db, "usuarios", nick);
  const check = await getDoc(ref);

  if (!check.exists() || check.data().pass !== pass) {
    return alert("❌ Usuario o contraseña incorrectos");
  }

  alert("✔ Bienvenido");
  sessionStorage.setItem("usuario", nick);
  window.location = "app.html";
}
