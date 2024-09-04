import { toast, Slide } from "react-toastify";
import axiosInstance from "./axiosInstance";
import { Navigate } from "react-router-dom";

const cities = [
    'Amsterdam', 'Rotterdam', 'The Hague (Den Haag)', 'Utrecht', 'Eindhoven', 
    'Groningen', 'Maastricht', 'Leiden', 'Haarlem', 'Nijmegen', 
    'Tilburg', 'Almere', 'Delft', 'Breda', 'Arnhem', 
    'Zwolle', 'Leeuwarden', 'Apeldoorn', 'Amersfoort', 'Den Bosch (\'s-Hertogenbosch)'
  ];
  
  const rentalPrices = [
    750, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500,
    1600, 1700, 1800, 1900, 2000, 2250, 2500, 2750, 3000,
    3250, 3500, 4000, 4500, 5000
  ];
  
  const bedrooms = [
    '1', '2', '3', '4', '5', '6'
  ];
  
  const surfaces = [
    '0', '10', '20', '30', '40', '50',
    '60', '70', '80', '90', '100'
];

export const TOKEN_KEY = 'authTokens';


const notification = (msg, type) =>
    toast(msg, {
      transition: Slide,
      autoClose: 3000,
      position: "top-right",
      type: type,
    });

// const getToken = () =>
//     localStorage.getItem(TOKEN_KEY);
const getToken = () => {
  const tokenString = localStorage.getItem(TOKEN_KEY);
  try {
    const tokenObj = JSON.parse(tokenString);  
    return tokenObj?.access || '';  
  } catch (error) {
    console.error('Failed to parse token:', error);
    return '';
  }
};

const getRefreshToken = () =>
    localStorage.getItem('refresh_token');

// Function to refresh the token
const refreshToken = async () => {
    try {
      const response = await axiosInstance.post('/api/token/refresh/', {
        refresh: getRefreshToken(),
      });
  
      // Save new tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      return response.data.access;
    } catch (error) {
      console.error('Refresh token error:', error);
      // Handle refresh token failure (e.g., log out the user)
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      Navigate('/login');
      throw error;
    }
};
  

  
export {
    cities,
    rentalPrices,
    bedrooms,
    surfaces,
    notification,
    getToken,
    getRefreshToken,
    refreshToken
}