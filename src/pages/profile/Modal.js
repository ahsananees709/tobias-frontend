import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { yupResolver } from '@hookform/resolvers/yup';
import { profileModalSchema } from '../../utils/formValidations';
import { cities, bedrooms, surfaces, rentalPrices, notification } from '../../utils/constants';
import Loading from '../../components/Loading/loading';
import axiosInstance from '../../utils/axiosInstance';
import { AuthContext } from '../../utils/AuthContext';


const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-sm mx-4 p-6 rounded-lg shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">{message}</h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
          >
            Yes
          </button>
        </div>
      </div>
      </div>
      </>
  );
};

const Modal = ({ isOpen, onClose, loading, setLoading }) => {
  const {loggedInUserData, updateUserData} = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('updateUserData');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(profileModalSchema[activeTab]),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    setFormData(data); 
    setShowConfirmation(true); 
  };

  const confirmSubmit = async () => {
    
    console.log('Form Submitted:', formData); 
    
    const {confirmNewPassword, ...filteredData} = formData
    try {
      setLoading(true)
      onClose(); 
      const response = await axiosInstance.patch(`/user/update/${loggedInUserData?.id}/`,filteredData)
      if (response) {
        updateUserData(response.data)
        setLoading(true)
        notification(`${activeTab.replace("update","")} updated successfully!`)
      } else {
        notification(`Profile Updation failed: ${response.statusText}`,"error" );
      }
    } catch (error) {
      notification("An error occurred during profile update:", "error");
    } finally {
      setLoading(false);
    }
    reset(); 
    setFormData(null); 
    setShowConfirmation(false); 
   
  };

  if (!isOpen) return null;

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <Loading />
        </div>
      )}

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-form-color w-full max-w-lg mx-4 md:mx-0 p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-black">Update User Details</h2>

        {/* Tabs */}
        <div className="mb-4 flex space-x-4">
        <button
            onClick={() => setActiveTab('updateUserData')}
            className={`hover:bg-btn-color-hover hover:text-btn-text-color-hover font-semibold flex-1 py-2 px-1 rounded-md ${
              activeTab === 'updateUserData'
               ? 'bg-btn-color-hover text-btn-text-color-hover'
                : 'bg-btn-color text-btn-text-color'
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab('updatePassword')}
            className={`hover:bg-btn-color-hover hover:text-btn-text-color-hover font-semibold flex-1 py-2 px-1 rounded-md ${
              activeTab === 'updatePassword'
                ? 'bg-btn-color-hover font-bold text-btn-text-color-hover'
                : 'bg-btn-color text-btn-text-color'
            }`}
          >
            Password
          </button>
          <button
            onClick={() => setActiveTab('updateFilters')}
            className={`hover:bg-btn-color-hover hover:text-btn-text-color-hover font-semibold flex-1 py-2 px-1 rounded-md ${
              activeTab === 'updateFilters'
               ? 'bg-btn-color-hover font-bold text-btn-text-color-hover'
                : 'bg-btn-color text-btn-text-color'
            }`}
          >
            Filters
          </button>
        </div>

        {/* Forms */}
        <div>
        
          {activeTab === 'updatePassword' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <div className="relative mb-4">
                <label className="block text-gray-800">Old Password</label>
                <Controller
                  name="oldPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                    type={showOldPassword ? "text" : "password"}
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.oldPassword && (
                <span className="font-serif text-sm text-red-600 font-semibold">
                  {errors.oldPassword.message}
                  </span>   
                )}
                <button
                type="button"
                className={`absolute inset-y-0 right-0 flex items-center px-3 ${errors.oldPassword ? "pt-0" : "pt-6"}`}
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
              </div> */}
              <div className="relative mb-4">
                <label className="block text-gray-800">New Password</label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                    type={showNewPassword ? "text" : "password"}
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.password && (
                <span className="font-serif text-sm text-red-600 font-semibold">
                  {errors.password.message}
                </span>
                )}
                <button
                type="button"
                className={`absolute inset-y-0 right-0 flex items-center px-3 ${errors.password ? "pt-0" : "pt-6"}`}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
              </div>
              <div className="relative mb-4">
                <label className="block text-gray-800">Confirm New Password</label>
                <Controller
                  name="confirmNewPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                    type={showConfirmNewPassword ? "text" : "password"}
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.confirmNewPassword && (
                <span className="font-serif text-sm text-red-600 font-semibold">
                  {errors.confirmNewPassword.message}
                </span>
                )}
                <button
                type="button"
                className={`absolute inset-y-0 right-0 flex items-center px-3 ${errors.confirmNewPassword ? "pb-0" : "pt-6"}`}
                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              >
                {showConfirmNewPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
              </div>
              <button type="submit" className="float-right bg-btn-color text-btn-text-color font-bold py-2 px-4 rounded-md hover:bg-btn-color-hover hover:text-btn-text-color-hover">
                Update Password
              </button>
            </form>
          )}

          {activeTab === 'updateUserData' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-800">First Name</label>
                <Controller
                  name="f_name"
                  control={control}
                  defaultValue={loggedInUserData?.f_name || ''}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.f_name && <p className="text-red-500 text-sm">{errors.f_name.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-800">Last Name</label>
                <Controller
                  name="l_name"
                  control={control}
                  defaultValue={loggedInUserData?.l_name || ''}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.l_name && <p className="text-red-500 text-sm">{errors.l_name.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-800">Phone</label>
                <Controller
                  name="phone"
                  defaultValue={loggedInUserData?.phone || ''}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              <button type="submit" className="float-right bg-btn-color text-btn-text-color font-bold py-2 px-4 rounded-md hover:bg-btn-color-hover hover:text-btn-text-color-hover">
                Update User Data
              </button>
            </form>
          )}

          {activeTab === 'updateFilters' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-800">City</label>
                <Controller
                  name="city"
                  control={control}
                  defaultValue={loggedInUserData?.city || ''}
                  render={({ field }) => (
                    <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-800">Select max rental price (€)</label>
                <Controller
                  name="max_price"
                  control={control}
                  defaultValue={loggedInUserData?.max_price || ''}
                  render={({ field }) => (
                    <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select price</option>
                      {rentalPrices.map((price) => (
                        <option key={price} value={price}>
                          €{price}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.max_price && <p className="text-red-500 text-sm">{errors.max_price.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-800">Bedrooms</label>
                <Controller
                  name="no_of_rooms"
                  control={control}
                  defaultValue={loggedInUserData?.no_of_rooms || ''}
                  render={({ field }) => (
                    <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select number of bedrooms</option>
                      {bedrooms.map((bedroom) => (
                        <option key={bedroom} value={bedroom}>
                          {bedroom} or more
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.no_of_rooms && <p className="text-red-500 text-sm">{errors.no_of_rooms.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-800">Surface Area (m²)</label>
                <Controller
                  name="area"
                  control={control}
                  defaultValue={loggedInUserData?.area || ''}
                  render={({ field }) => (
                    <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select surface area</option>
                      {surfaces.map((surface) => (
                        <option key={surface} value={surface}>
                          {surface} m²
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
              </div>
              <button type="submit" className="float-right bg-btn-color text-btn-text-color font-bold py-2 px-4 rounded-md hover:bg-btn-color-hover hover:text-btn-text-color-hover">
                Update Filters
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <ConfirmationPopup
          message={`Are you sure you to ${activeTab.replace('update', 'update ').toLowerCase()}?`}
          onConfirm={confirmSubmit}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      </div>
      </>
  );
};

export default Modal;

