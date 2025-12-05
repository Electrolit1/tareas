import { db } from "./firebase.js";
import { setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

window.registrarse = async function () {
    const nick = document.getElementById("regNick").value.trim();
    const pass = document.getElementById("regPass").value.trim();

    if (!nick || !pass) return alert("Completa todos los campos.");

    const ref = doc(db, "usuarios", nick);
    const snap = await getDoc(ref);

    if (snap.exists()) return alert("❌ Ese usuario ya existe");

    await setDoc(ref, { pass });

    sessionStorage.setItem("usuario", nick);
    window.location = "app.html";
}

window.login = async function () {
    const nick = document.getElementById("logNick").value.trim();
    const pass = document.getElementById("logPass").value.trim();

    const ref = doc(db, "usuarios", nick);
    const snap = await getDoc(ref);

    if (!snap.exists() || snap.data().pass !== pass)
        return alert("❌ Usuario o contraseña inválidos");

    sessionStorage.setItem("usuario", nick);
    window.location = "app.html";
}
