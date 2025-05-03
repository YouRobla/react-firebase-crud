import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";
import ModalDelete from './ModalDelete';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import AppList from './AppList';
import { motion } from "framer-motion"; // Importar framer-motion

const Show = () => {
  const [aplicaciones, setAplicaciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const [appToEdit, setAppToEdit] = useState(null);
  const [newApp, setNewApp] = useState({ Nombre: "", Version: "" });
  const [loading, setLoading] = useState(true); // Estado de carga

  const aplicacionesCollection = collection(db, "aplicacion");

  const getAplicaciones = async () => {
    try {
      const data = await getDocs(aplicacionesCollection);
      const apps = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAplicaciones(apps);
      setLoading(false); // Finaliza el estado de carga cuando los datos estén listos
    } catch (error) {
      console.error("Error al obtener las aplicaciones:", error);
      setLoading(false); // Finaliza el estado de carga si hay un error
    }
  };

  useEffect(() => {
    getAplicaciones();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-8">Mostrar Aplicaciones</h2>
      
      {loading ? (
        <div className="flex justify-center items-center text-lg text-gray-500">
          <p>Cargando aplicaciones...</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transform transition duration-300 ease-in-out hover:scale-105"
            >
            Agregar Aplicación
            </button>

          <AppList
            aplicaciones={aplicaciones}
            setAppToDelete={setAppToDelete}
            setIsModalOpen={setIsModalOpen}
            setAppToEdit={setAppToEdit}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </div>
      )}

      {/* ModalDelete con animación */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalDelete
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            appToDelete={appToDelete}
            setAplicaciones={setAplicaciones}
          />
        </motion.div>
      )}

      {/* ModalAdd con animación */}
      {isAddModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalAdd
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            newApp={newApp}
            setNewApp={setNewApp}
            setAplicaciones={setAplicaciones}
          />
        </motion.div>
      )}

      {/* ModalEdit con animación */}
      {isEditModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalEdit
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            appToEdit={appToEdit}
            setAppToEdit={setAppToEdit}
            setAplicaciones={setAplicaciones}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Show;
