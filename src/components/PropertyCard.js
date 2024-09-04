import React from 'react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };
    
    return (
        <motion.div 
            className="bg-form-color shadow-md rounded-lg overflow-hidden mb-4 flex flex-col md:flex-row hover:shadow-2xl"
            whileHover={{ scale: 1.03 }}  // Hover animation
            transition={{ duration: 0.3 }}  // Animation duration
        >
            <div className="w-full h-60 md:w-80 md:h-48">
                <img src={property.image_url} alt={property.title} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-72 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="font-sans text-[#0A806C] text-lg font-bold">{property.title}</h3>
                    <div className='flex items-center lg:whitespace-nowrap'>
                        <p className="font-serif text-md text-gray-600">{property.address}</p>
                    </div>

                    <div className='flex'>
                        <p className="font-serif text-gray-600"> {property.area} m²</p>
                        <p className='font-sans px-2'>|</p>
                        <p className="font-serif text-gray-600"> {property.no_of_rooms} bedrooms</p>
                    </div>
                    <p className="font-serif text-gray-800 font-bold">€{property.price} per month</p>
                </div>
                
                <div className='flex items-center whitespace-nowrap'>
                    {/* <p className="font-serif text-sm text-gray-500 mr-4">{property.office}</p> */}
                    <p className="font-serif text-sm text-gray-500">Offered since {formatDate(property.created_at)}</p>
                    {/* <p className="font-sans text-sm mx-1">|</p> */}
                    {/* <p className="font-serif text-sm text-gray-500">{property.hours} hours ago</p> */}
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyCard;
