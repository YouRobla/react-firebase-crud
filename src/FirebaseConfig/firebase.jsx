// Importa funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCE97DAdltQnDOTicgp9YeyNXDaTlF80Ws",
  authDomain: "react-senati.firebaseapp.com",
  projectId: "react-senati",
  storageBucket: "react-senati.appspot.com", // ✅ Corregido
  messagingSenderId: "530710352273",
  appId: "1:530710352273:web:852584021a8be5e81c8a30",
  measurementId: "G-RVVYFPYRX3"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exporta la instancia de Firestore
export const db = getFirestore(app);
