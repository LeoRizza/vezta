// Firebase SDK v10
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Tu configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArB4bIF3OHM5ksPegGTjIPaRDr60uGH6c",
  authDomain: "vezta-5de08.firebaseapp.com",
  projectId: "vezta-5de08",
  storageBucket: "vezta-5de08.firebasestorage.app",
  messagingSenderId: "375743892027",
  appId: "1:375743892027:web:2d3fd2b67cbaedb3f52a1e",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Contenedor del catálogo
const catalogo = document.getElementById("catalogo");

// Función para renderizar productos
async function renderProductos() {
  const querySnapshot = await getDocs(collection(db, "productos"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${data.imagen}" class="card-img-top" alt="${data.nombre}" style="object-fit: cover; height: 250px;">
        <div class="card-body">
          <h5 class="card-title text-uppercase">${data.nombre}</h5>
          <p class="card-text">${data.descripcion}</p>
          <a href="#" class="btn btn-danger">Cotizar</a>
        </div>
      </div>
    `;

    catalogo.appendChild(card);
  });
}

renderProductos();
