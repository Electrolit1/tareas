async function registrarse() {
  const nick = document.getElementById("regNick").value;
  const pass = document.getElementById("regPass").value;

  const usuario = await db.collection("usuarios").doc(nick).get();
  if (usuario.exists) return alert("❌ Nick ya está en uso");

  await db.collection("usuarios").doc(nick).set({
    pass: pass
  });

  sessionStorage.setItem("usuario", nick);
  window.location = "app.html";
}

async function login() {
  const nick = document.getElementById("logNick").value;
  const pass = document.getElementById("logPass").value;

  const usuario = await db.collection("usuarios").doc(nick).get();
  if (!usuario.exists || usuario.data().pass !== pass)
    return alert("❌ Datos incorrectos");

  sessionStorage.setItem("usuario", nick);
  window.location = "app.html";
}
