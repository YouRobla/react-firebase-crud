import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";
import { useState } from "react";
import { FaSpinner } from 'react-icons/fa';

const ModalDelete = ({ isModalOpen, setIsModalOpen, appToDelete, setAplicaciones }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const eliminarAplicacion = async () => {
    try {
      setIsDeleting(true);
      if (appToDelete) {
        const appDoc = doc(db, "aplicacion", appToDelete.id);
        await deleteDoc(appDoc);
        setAplicaciones(prev => prev.filter(app => app.id !== appToDelete.id));
        setTimeout(() => setIsModalOpen(false), 500);
      }
    } catch (error) {
      console.error("Error al eliminar la aplicación:", error);
      setIsDeleting(false);
    }
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
        <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 rounded-lg shadow-xl transition-all duration-300 ease-in-out animate__animated animate__fadeIn">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 text-center sm:text-left">Confirmar Eliminación</h3>
          
          <p className="text-gray-600 mb-6 text-sm sm:text-base text-center sm:text-left">
            {isDeleting ? "Eliminando la aplicación..." : "¿Estás seguro de que quieres eliminar esta aplicación?"}
          </p>

          {isDeleting && (
            <div className="flex justify-center mb-4">
              <FaSpinner className="w-8 h-8 text-gray-600 animate-spin" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-400 transition duration-200"
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              onClick={eliminarAplicacion}
              className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition duration-200"
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalDelete;
