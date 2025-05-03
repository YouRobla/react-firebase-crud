import { updateDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";

const ModalEdit = ({ isEditModalOpen, setIsEditModalOpen, appToEdit, setAppToEdit, setAplicaciones }) => {
  const editarAplicacion = async () => {
    try {
      if (appToEdit) {
        const appDoc = doc(db, "aplicacion", appToEdit.id);
        await updateDoc(appDoc, appToEdit);
        setAplicaciones(prev => prev.map(app => app.id === appToEdit.id ? appToEdit : app));
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error al editar la aplicación:", error);
    }
  };

  return (
    isEditModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-2xl lg:max-w-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Editar Aplicación</h3>

          {/* Campo Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre de la aplicación</label>
            <input
              type="text"
              value={appToEdit.Nombre}
              onChange={(e) => setAppToEdit({ ...appToEdit, Nombre: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Nombre de la aplicación"
            />
          </div>

          {/* Campo Versión */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Versión</label>
            <input
              type="text"
              value={appToEdit["Version"] || ""}
              onChange={(e) => setAppToEdit({ ...appToEdit, "Version": e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Versión"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={editarAplicacion}
              className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalEdit;
