import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import axiosInstance from './axiosInstance';
import { TOKEN_KEY } from './constants';
import { notification } from './constants';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(() => {
        const tokens = localStorage.getItem(TOKEN_KEY);
        return tokens ? JSON.parse(tokens) : null;
    });
    const [loggedInUserData, setLoggedInUserData] = useState({});
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (authTokens) {
            const decodedToken = jwtDecode(authTokens.access);
            setAuthenticatedUser(decodedToken.user_id);
            fetchUserData(decodedToken.user_id);
        }
        setLoading(false); 
    }, [authTokens]);

    const fetchUserData = async (userId) => {
        try {
            const response = await axiosInstance.get(`/user/${userId}`);
            if (response) {
                setLoggedInUserData(response.data);
            }
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };

    const updateUserData = (newData) => {
        setLoggedInUserData(newData);
    };

    const loginUser = async (data) => {
        try {
            const { email, password } = data;
            const response = await axiosInstance.post('/user/login/', {
                email,
                password
            });
            const responseData = response.data;
            if (response.status === 200) {
                setAuthTokens(responseData);
                const decodedToken = jwtDecode(responseData.access);
                setAuthenticatedUser(decodedToken.user_id);
                localStorage.setItem(TOKEN_KEY, JSON.stringify(responseData));
                notification('Login successful!', 'success');
                fetchUserData(decodedToken.user_id);
                return true
            } else {
                notification('Login Failed', 'error');
                return false
            }
        } catch (error) {
            notification('Login Failed', 'error');
            return false
        }
    };

    const logOutUser = () => {
        setAuthTokens(null);
        setAuthenticatedUser(null);
        setLoggedInUserData({});
        localStorage.removeItem(TOKEN_KEY);
        notification('Logged out successfully!', 'success');
    };

    return (
        <AuthContext.Provider value={{ authenticatedUser, loginUser, logOutUser, loggedInUserData, updateUserData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
