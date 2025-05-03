import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AppList = ({ aplicaciones, setAppToDelete, setIsModalOpen, setAppToEdit, setIsEditModalOpen }) => {
  const handleDeleteClick = (app) => {
    setAppToDelete(app);
    setIsModalOpen(true);
  };

  const handleEditClick = (app) => {
    setAppToEdit({ ...app });
    setIsEditModalOpen(true);
  };

  return (
    <ul className="space-y-4">
      {aplicaciones.map(app => (
        <li
          key={app.id}
          className="flex justify-between items-center bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <div>
            <strong className="text-2xl text-indigo-600">{app.Nombre}</strong>
            <p className="text-gray-700 text-sm">Versión {app["Version"]}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => handleEditClick(app)}
              className="flex items-center text-yellow-500 hover:text-yellow-600 transition duration-200 px-3 py-2 rounded-lg border border-transparent hover:bg-yellow-100"
            >
              <FaEdit className="mr-2" /> Editar
            </button>
            <button
              onClick={() => handleDeleteClick(app)}
              className="flex items-center text-red-500 hover:text-red-600 transition duration-200 px-3 py-2 rounded-lg border border-transparent hover:bg-red-100"
            >
              <FaTrashAlt className="mr-2" /> Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AppList;
