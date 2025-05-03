import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";

const ModalAdd = ({ isAddModalOpen, setIsAddModalOpen, newApp, setNewApp, setAplicaciones }) => {
  const agregarAplicacion = async () => {
    try {
      if (newApp.Nombre && newApp["Version"]) {
        await addDoc(collection(db, "aplicacion"), newApp);
        setAplicaciones(prev => [...prev, newApp]);
        setIsAddModalOpen(false);
        setNewApp({ Nombre: "", "Version": "" });
      } else {
        console.log("Por favor, completa todos los campos.");
      }
    } catch (error) {
      console.error("Error al agregar la aplicación:", error);
    }
  };

  return (
    isAddModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate__animated animate__fadeIn">
        <div className="bg-white p-8 rounded-lg shadow-xl w-1/3 transition-all duration-300 ease-in-out transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Agregar Nueva Aplicación</h3>
          
          {/* Campo Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre de la aplicación</label>
            <input
              type="text"
              value={newApp.Nombre}
              onChange={(e) => setNewApp({ ...newApp, Nombre: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Nombre de la aplicación"
            />
          </div>

          {/* Campo Versión */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Versión</label>
            <input
              type="text"
              value={newApp["Version"]}
              onChange={(e) => setNewApp({ ...newApp, "Version": e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Versión"
            />
          </div>

          <div className="flex justify-end space-x-6">
            {/* Botón Cancelar */}
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancelar
            </button>

            {/* Botón Agregar */}
            <button
              onClick={agregarAplicacion}
              className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 transition duration-200"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalAdd;
