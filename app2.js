const usuario = sessionStorage.getItem("usuario");
if (!usuario) window.location = "index.html";

const lista = document.getElementById("lista");

async function crearTarea() {
  const texto = document.getElementById("tarea").value;
  await db.collection("tareas").add({
    texto,
    creador: usuario,
    terminada: false
  });
}

db.collection("tareas").onSnapshot(s => {
  lista.innerHTML = "";
  s.docs.forEach(doc =>{
    const t = doc.data();
    lista.innerHTML += `
      <li>
        ${t.terminada ? "<s>"+t.texto+"</s>" : t.texto}
        ${usuario===t.creador ? `<button onclick="eliminar('${doc.id}')">🗑</button>` : ""}
        <button onclick="terminar('${doc.id}', ${t.terminada})">✔</button>
      </li>
    `;
  })
})

function eliminar(id) {
  db.collection("tareas").doc(id).delete();
}

function terminar(id, estado) {
  db.collection("tareas").doc(id).update({ terminada: !estado });
}
