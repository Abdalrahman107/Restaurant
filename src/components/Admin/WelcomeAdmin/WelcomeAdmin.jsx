import { FaUserShield, FaUsers, FaUtensils, FaList, FaClipboardList } from "react-icons/fa";

const WelcomeAdmin = () => {

  const role = localStorage.getItem('role')

  return (
    <div className="w-full p-6 min-h-screen dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
          <FaUserShield size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            You are logged in as <span className="font-medium text-blue-600">{role}</span>.
          </p>        
          <p className="text-green-600 dark:text-green-400 font-medium">
          Your session is active.
          </p>
        </div>
      </div>



      <p className="text-gray-700 dark:text-gray-200 mt-4">
       Welcome at dashboard. Use the sidebar to manage content.
      </p>

    </div>
  );
};

export default WelcomeAdmin;
