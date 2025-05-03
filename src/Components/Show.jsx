import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";
import ModalDelete from './ModalDelete';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import AppList from './AppList';
import { motion } from "framer-motion";

const Show = () => {
  const [aplicaciones, setAplicaciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const [appToEdit, setAppToEdit] = useState(null);
  const [newApp, setNewApp] = useState({ Nombre: "", Version: "" });
  const [loading, setLoading] = useState(true);

  const aplicacionesCollection = collection(db, "aplicacion");

  const getAplicaciones = async () => {
    try {
      const data = await getDocs(aplicacionesCollection);
      const apps = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAplicaciones(apps);
      setLoading(false); 
    } catch (error) {
      console.error("Error al obtener las aplicaciones:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAplicaciones();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-700 mb-8">Mostrar Aplicaciones</h2>
      
      {loading ? (
        <div className="flex justify-center items-center text-lg text-gray-500">
          <p>Cargando aplicaciones...</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center flex-wrap mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 text-center sm:text-left w-full sm:w-auto">Aplicaciones</h2>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-300 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Agregar Aplicación
            </button>
          </div>

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
