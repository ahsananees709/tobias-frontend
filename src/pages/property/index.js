import React from 'react';
import PropertyList from '../../components/PropertyList';


const PropertyPage = () => {
  
    return (
        <div className="min-h-screen px-4 md:px-8 lg:px-24">
          <h1 className="text-3xl text-center font-bold mb-4"></h1>
        <PropertyList />
        </div>
      );
};

export default PropertyPage;
