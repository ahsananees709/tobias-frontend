import React from 'react';
import { cities, rentalPrices, bedrooms, surfaces } from '../utils/constants';
import { notification } from '../utils/constants';

const PropertyFilter = ({ propertyFilters, setPropertyFilters, onResetFilters }) => {
  
  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "max_price") {
      if (propertyFilters.min_price && Number(value) <= Number(propertyFilters.min_price)) {
        value = "";
        notification("Maximum price must be greater than minimum price value.", "warning");
      }
    }
    if (name === "min_price") {
      if (propertyFilters.max_price && Number(propertyFilters.max_price) <= Number(value)) {
        setPropertyFilters(prevFilters => ({
          ...prevFilters,
          max_price: "",
        }));
        notification("Maximum price must be greater than minimum price value.", "warning");
      }
    }
    setPropertyFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="ml-4 mt-4 bg-form-color shadow-lg p-4 rounded-lg w-full max-w-xs flex flex-col space-y-4">
      <h2 className="font-serif text-xl font-semibold mb-4">Filters</h2>
      
      {/* City Filter */}
      <div className="mb-4">
        <label className="font-serif font-bold block text-gray-700 mb-2 flex items-center">
          🏢 City
        </label>
        <select 
          name="city" 
          className="font-serif w-full p-2 border border-gray-300 rounded-md"
          onChange={handleChange}
          value={propertyFilters.city}
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      
      {/* Price Filter with Minimum and Maximum */}
      <div className="mb-4">
        <label className="font-serif font-bold block text-gray-700 mb-2 flex items-center">
          💵 Price
        </label>
        <div className="flex space-x-2">
          {/* Minimum Price */}
          <select 
            name="min_price" 
            className="font-serif w-1/2 p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            value={propertyFilters.min_price}
          >
            <option value="">Minimum</option>
            {rentalPrices.map((price, index) => (
              <option key={index} value={price}>
                €{price}
              </option>
            ))}
          </select>

          {/* Maximum Price */}
          <select 
            name="max_price" 
            className="font-serif w-1/2 p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            value={propertyFilters.max_price}
          >
            <option value="">Maximum</option>
            {rentalPrices.map((price, index) => (
              <option key={index} value={price}>
                €{price}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bedrooms Filter */}
      <div className="mb-4">
        <label className="font-serif font-bold block text-gray-700 mb-2 flex items-center">
          🛏 Rooms
        </label>
        <select 
          name="no_of_rooms" 
          className="font-serif w-full p-2 border border-gray-300 rounded-md"
          onChange={handleChange}
          value={propertyFilters.no_of_rooms}
        >
          <option value="">Select Bedrooms</option>
          {bedrooms.map((bedroom, index) => (
            <option key={index} value={bedroom}>
              {bedroom} or more
            </option>
          ))}
        </select>
      </div>

      {/* Surface Filter */}
      <div className="mb-4">
        <label className="font-serif font-bold block text-gray-700 mb-2 flex items-center">
          🏠 Surface (m²)
        </label>
        <select 
          name="area" 
          className="font-serif w-full p-2 border border-gray-300 rounded-md"
          onChange={handleChange}
          value={propertyFilters.area}
        >
          <option value="">Select Minimum Surface</option>
          {surfaces.map((surface, index) => (
            <option key={index} value={surface}>
              {surface} m²
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={onResetFilters}
        className="bg-red-500 text-white p-2 rounded-md mt-4"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default PropertyFilter;
