import React,{useContext,useState} from 'react';
import { motion } from 'framer-motion'; // For animations
import { useNavigate } from 'react-router-dom';
import { notification } from '../../utils/constants';

// Import images
import trustedagent from '../../assets/trusted-agent.png';
import helpdesk from '../../assets/help-desk.png';
import unlimited from '../../assets/unlimited-storage.png';
import homeImage from '../../assets/home-carousel.jpg';
import property1 from '../../assets/property1.jpg';
import property2 from '../../assets/property2.jpg';
import property3 from '../../assets/property3.jpg';
import { AuthContext } from '../../utils/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const features = [
  {
    id: 1,
    image: unlimited,
    title: 'Wide Selection',
    description: 'Choose from a wide variety of properties tailored to your needs.'
  },
  {
    id: 2,
    image: trustedagent,
    title: 'Trusted Agents',
    description: 'Our agents are experienced and will help you every step of the way.'
  },
  {
    id: 3,
    image: helpdesk,
    title: 'Great Support',
    description: 'We provide 24/7 support to assist with all your queries.'
  },
];

const properties = [
  {
    id: 1,
    image: property1,
    title: 'Luxury Villa in Amsterdam',
    price: '1,200',
    bedroom: 4,
    bath: 3,
    time: '7:52',
    hours:7,
    surface: 200,
  },
  {
    id: 2,
    image: property2,
    title: 'Modern Apartment in Paris',
    price: '1,300',
    bedroom: 3,
    bath: 2,
    time: '7:52',
    hours:7,
    surface: 120,
  },
  {
    id: 3,
    image: property3,
    title: 'Spacious House in London',
    price: '1,500',
    bedroom: 5,
    bath: 4,
    time: '7:52',
    hours:7,
    surface: 300,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { authenticatedUser } = useContext(AuthContext)
  const [searchCity, setSearchCity] = useState('');

  const handleCitySearch = () => {
    if (searchCity) {
      if (!authenticatedUser)
      {
        navigate('/login');
        notification("Please login first to view properties!","warning")
      }
      else {
        navigate(`/property?city=${encodeURIComponent(searchCity)}`);
      }
    } else {
      notification('Please enter the name of city',"warning");
    }
  };

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative bg-[#F8EDE3] h-screen bg-cover bg-center" style={{ backgroundImage: `url(${homeImage})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white p-6">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-mono"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Your Dream Home
          </motion.h1>
          <motion.p 
            className="mt-4 text-xl md:text-2xl font-serif"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the best properties across the city with us.
          </motion.p>
          <motion.button 
            className="font-serif mt-8 px-8 py-4 bg-[#D0B8A8] text-black font-semibold rounded-md shadow-lg hover:bg-[#C5705D] hover:text-white transition duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => {
              if (!authenticatedUser){
                navigate('/login')
              notification("Please login first to view properties")
            }
              else
                navigate('/property')
            }}
          >
            View Properties
          </motion.button>
          <motion.div
      className="mt-10 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <input
        type="text"
        placeholder="Where do you want to live?"
        className="font-serif px-4 py-3 w-96 md:w-96 text-black rounded-md border-2 border-[#D0B8A8] focus:outline-none"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <button
        onClick={handleCitySearch}
        className="font-serif px-4 w-48 md:w-60 py-3 bg-[#D0B8A8] text-black font-semibold rounded-md shadow-lg hover:bg-[#C5705D] hover:text-white transition duration-300"
      >
        Search Properties
      </button>
    </motion.div>
        </div>
      </section>
{/* Property Showcase */}
<section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-gray-800">Featured Properties</h2>
            <p className="font-serif mt-4 text-gray-600">Explore some of the top properties available in our listings.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {properties.map((property) => (
              <motion.div 
                key={property.id}
                className="bg-[#DFD3C3] rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                <div className=" w-full md:w-72 p-4 flex flex-col justify-between">
                <div>
                <h3 className="font-sans text-[#0A806C] text-lg font-bold">{property.title}</h3>
                <div className='flex items-center lg:whitespace-nowrap'>
  <p className="font-serif text-md text-gray-600">{property.address}</p>
</div>

                <div className='flex'>
                    <p className="font-serif text-gray-600"> {property.surface}m²</p>
                    <p className='font-sans px-2'>|</p>
                    <p className="font-serif text-gray-600"> {property.bedroom} bedrooms</p>
                </div>
                <p className="font-serif text-gray-800 font-bold">€{property.price} per month</p>
                </div>
                
                <div className='flex items-center whitespace-nowrap'>
                    <p className="font-serif text-sm text-gray-500 ">{property.office}</p>
                    <p className="font-serif text-sm text-gray-500">Offered since {property.time}</p>
                    <p className="font-sans text-sm mx-1">|</p>
                    <p className="font-serif text-sm text-gray-500">{property.hours} hours ago</p>
                </div>
            </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Feature Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-gray-800">Why Choose Us?</h2>
            <p className="font-serif mt-4 text-gray-600">We offer the best properties in the market with top-notch service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature) => (
              <motion.div 
                key={feature.id}
                className="bg-[#DFD3C3] p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={feature.image} alt={feature.title} className="w-16 h-16 mx-auto" />
                <h3 className="font-sans text-[#0A806C] text-xl font-bold mt-6">{feature.title}</h3>
                <p className="font-serif text-md text-gray-600 mt-4">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Footer */}
      
    </div>
  );
};

export default LandingPage;
