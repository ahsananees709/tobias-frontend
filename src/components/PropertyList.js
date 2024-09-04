import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyFilter from './PropertyFilter';
import PropertyCard from './PropertyCard';
import { notification } from '../utils/constants';
import axiosInstance from '../utils/axiosInstance';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Loading from './Loading/loading';
import { AuthContext } from '../utils/AuthContext';

const PropertyList = () => {
  const { loggedInUserData } = useContext(AuthContext);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState({ next: false, previous: false, count: 0 });
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [propertyFilters, setPropertyFilters] = useState({
    min_price: "", 
    max_price: loggedInUserData.max_price, 
    area: loggedInUserData.area, 
    no_of_rooms: loggedInUserData.no_of_rooms, 
    city: loggedInUserData.city
  });

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageParam = urlParams.get('page') || 1;
    const filters = {};

    ['min_price', 'max_price', 'area', 'no_of_rooms', 'city'].forEach(param => {
      const value = urlParams.get(param);
      if (value) filters[param] = value;
    });

    setPropertyFilters(filters);
    setPageIndex(parseInt(pageParam, 10));
  }, [location.search]);

  useEffect(() => {
    if (propertyFilters.city || Object.values(propertyFilters).some(value => value)) {
      setLoading(true);
      getJobs(pageIndex);
    }
  }, [propertyFilters, pageIndex]);

  const getJobs = async (pageIndex = 1) => {
    try {
      const response = await axiosInstance.get("/properties", {
        params: { ...propertyFilters, page: pageIndex }
      });

      setProperties(response.data.results);
      setPage({ 
        next: response.data.next, 
        count: response.data.count, 
        previous: response.data.previous 
      });

      const url = new URL(window.location);
      url.searchParams.set('page', pageIndex);
      Object.keys(propertyFilters).forEach(key => {
        if (propertyFilters[key]) {
          url.searchParams.set(key, propertyFilters[key]);
        } else {
          url.searchParams.delete(key);
        }
      });
      window.history.pushState({}, '', url.toString());

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      notification("Failed to fetch Properties", "error");
    }
  };
  useEffect(() => {
   getJobs()
 },[])

  const getProperties = async (pageIndex = 1) => {
    try {
      const response = await axiosInstance.get("/properties", {
        params: {  page: pageIndex }
      });

      setProperties(response.data.results);
      setPage({ 
        next: response.data.next, 
        count: response.data.count, 
        previous: response.data.previous 
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      notification("Failed to fetch Properties", "error");
    }
  };

  const onResetFilters = () => {
    const resetFilters = {
      min_price: "", 
      max_price: "", 
      area: "", 
      no_of_rooms: "", 
      city: ""
    };
    setPropertyFilters(resetFilters);
    setPageIndex(1); // Reset to the first page
    const url = new URL(window.location);
    url.searchParams.delete('page'); // Remove page from URL
    Object.keys(resetFilters).forEach(key => url.searchParams.delete(key)); // Remove all filters from URL
    window.history.pushState({}, '', url.toString());
    setLoading(true);
    getProperties(1); // Fetch data without filters
  };

  const nextPage = () => {
    if (page?.next) {
      const urlObject = new URL(page.next);
      const nextPageNumber = urlObject.searchParams.get('page');
      setPageIndex(nextPageNumber);
      getJobs(nextPageNumber);
      setLoading(true);
    } else {
      notification("This is the last page", "warning");
    }
  };

  const previousPage = () => {
    if (page?.previous) {
      const urlObject = new URL(page.previous);
      const prevPageNumber = urlObject.searchParams.get('page');
      setPageIndex(prevPageNumber || 1);
      getJobs(prevPageNumber || 1);
      setLoading(true);
    } else {
      notification("This is the first page", "warning");
    }
  };
  

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <Loading /> {/* Your loading spinner component */}
        </div>
      )}
      <div className={`flex flex-col md:flex-row gap-4 mt-10 ${loading ? "blur-sm" : ""}`}>
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4 flex justify-center w-full">
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="bg-btn-color text-btn-text-color border-2 text-lg font-bold w-[200px] px-4 py-2 rounded-lg focus:outline-none"
          >
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Property Filter */}
        <div className={`md:w-1/4 ${isFilterVisible ? 'block' : 'hidden md:block'}`}>
          <PropertyFilter
            propertyFilters={propertyFilters}
            setPropertyFilters={setPropertyFilters}
            onResetFilters={onResetFilters}
          />
        </div>

        {/* Property List */}
        <div className="w-full md:flex-1 p-4">
          {properties.length === 0 && 
          <p className='font-bold text-3xl font-mono text-center mt-32 mb-32'>Sorry no properties available according to applied filters.</p>}
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}

          {/* Pagination */}
          <div className="mt-10 mb-6 w-full max-w-lg mx-auto flex justify-between bg-form-color p-3 rounded-md">
            {/* Previous Button */}
            <Pagination aria-label="Page navigation example" size="lg" className="mr-2 sm:mb-0 sm:mr-2 bg-btn-color hover:bg-btn-color-hover text-btn-text-color hover:text-btn-text-color-hover flex items-center">
              <PaginationItem title="Previous Records" className="font-bold px-3 py-1 rounded-md">
                <PaginationLink onClick={previousPage}>
                  Previous
                </PaginationLink>
              </PaginationItem>
            </Pagination>

            {/* Page Information */}
            <div className="flex-grow text-center border px-3 py-1 rounded-md bg-btn-color-hover text-btn-text-color-hover mb-2 sm:mb-0">
              <b>
                <span>
                  {page?.count === 0
                    ? pageIndex
                    : (parseInt(pageIndex) - 1) * parseInt(pageSize) + 1}-
                  {Math.min(
                    parseInt(pageIndex) * parseInt(pageSize),
                    page?.count
                  )}{" "}
                  of {page.count}
                </span>
              </b>
            </div>

            {/* Next Button */}
            <Pagination aria-label="Page navigation example" size="lg" className="ml-2 sm:mb-0 sm:ml-2 bg-btn-color hover:bg-btn-color-hover text-btn-text-color hover:text-btn-text-color-hover flex items-center">
              <PaginationItem title="Next Records" className="font-bold px-3 py-1 rounded-md">
                <PaginationLink onClick={nextPage}>
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyList;
