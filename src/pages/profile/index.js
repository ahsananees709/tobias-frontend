import React, { useState, useEffect,useContext } from 'react';
import Modal from './Modal'; 
import Loading from '../../components/Loading/loading';
import { AuthContext } from '../../utils/AuthContext';


const ProfilePage = () => {
  const [loading,setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {loggedInUserData} = useContext(AuthContext)


  useEffect(() => {
    if (Object.keys(loggedInUserData).length > 0) {
      setLoading(false); 
    }
  }, [loggedInUserData]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const avatarUrl = `https://ui-avatars.com/api/?name=${loggedInUserData.f_name?.charAt(0)}&background=D0B8A8&color=C5705D&size=100&font-size=0.7`;

    return (
      <>
        {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <Loading />
        </div>
      )}
    <div className={`min-h-screen p-6 ${
          loading ? "blur-sm" : ""
        }`}>
      {/* Profile Header */}
      <div className="bg-form-color max-w-4xl mx-auto shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
          <div>
            <h1 className="text-3xl font-semibold">{`${loggedInUserData.f_name} ${loggedInUserData.l_name}`}</h1>
            <p className="text-gray-500">{loggedInUserData.email}</p>
          </div>
        </div>

        {/* User Details */}
        <div>
          <h2 className="text-2xl font-semibold  mb-4">User Details</h2>
          <div className="p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-black text-bold text-lg">First Name</p>
                <p className="text-gray-500">{loggedInUserData.f_name}</p>
              </div>
              <div>
                <p className="text-black text-bold text-lg">Last Name</p>
                <p className="text-gray-500">{loggedInUserData.l_name}</p>
              </div>
              <div>
                <p className="text-black text-bold text-lg">Email</p>
                <p className="text-gray-500">{loggedInUserData.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Filters */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Selected Filters</h2>
          <div className="p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-black text-bold text-lg">City</p>
                <p className="text-gray-500">{loggedInUserData.city}</p>
              </div>
              <div>
                <p className="text-black text-bold text-lg">Maximum Rental Price</p>
                <p className="text-gray-500">€{loggedInUserData.max_price}</p>
              </div>
              <div>
                <p className="text-black text-bold text-lg">Bedrooms</p>
                <p className="text-gray-500">{loggedInUserData.no_of_rooms}</p>
              </div>
              <div>
                <p className="text-black text-bold text-lg">Surface</p>
                <p className="text-gray-500">{loggedInUserData.area} (m²)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={openModal}
            className="bg-btn-color font-bold text-btn-text-color py-2 px-4 rounded-md hover:bg-btn-color-hover hover:text-btn-text-color-hover"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} loading={loading} setLoading={setLoading} />
            </div>
            </>
  );
};

export default ProfilePage;
