import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";
import { useState } from "react"; // Para manejar el estado de carga
import { FaSpinner } from 'react-icons/fa'; // Spinner más estilizado

const ModalDelete = ({ isModalOpen, setIsModalOpen, appToDelete, setAplicaciones }) => {
  const [isDeleting, setIsDeleting] = useState(false); // Estado para controlar el proceso de eliminación

  const eliminarAplicacion = async () => {
    try {
      setIsDeleting(true); // Activamos el estado de carga
      if (appToDelete) {
        const appDoc = doc(db, "aplicacion", appToDelete.id);
        await deleteDoc(appDoc); // Eliminamos la aplicación
        setAplicaciones(prev => prev.filter(app => app.id !== appToDelete.id)); // Actualizamos la lista
        setTimeout(() => setIsModalOpen(false), 500); // Esperamos un poco antes de cerrar el modal para dar tiempo a la animación
      }
    } catch (error) {
      console.error("Error al eliminar la aplicación:", error);
      setIsDeleting(false); // Si hay un error, desactivamos el estado de carga
    }
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate__animated animate__fadeIn">
        <div className="bg-white p-8 rounded-lg shadow-xl w-1/3 transition-all duration-300 ease-in-out transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Confirmar Eliminación</h3>
          <p className="text-gray-600 mb-6">
            {isDeleting ? "Eliminando la aplicación..." : "¿Estás seguro de que quieres eliminar esta aplicación?"}
          </p>

          {/* Mostrar un spinner cuando se está eliminando */}
          {isDeleting && (
            <div className="flex justify-center mb-4">
              <FaSpinner className="w-8 h-8 text-gray-600 animate-spin" />
            </div>
          )}

          <div className="flex justify-end space-x-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-200"
              disabled={isDeleting} // Desactivamos el botón "Cancelar" mientras se está eliminando
            >
              Cancelar
            </button>
            <button
              onClick={eliminarAplicacion}
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-200"
              disabled={isDeleting} // Desactivamos el botón "Eliminar" mientras se está eliminando
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
