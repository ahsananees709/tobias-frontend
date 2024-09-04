import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import Loading from './Loading/loading';

const ProtectedRoute = () => {
    const { authenticatedUser, loading } = useContext(AuthContext);

    if (loading) {
        // You can return a loading spinner or some loading text here
        return <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
        <Loading />
      </div>
    }

    return authenticatedUser ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
