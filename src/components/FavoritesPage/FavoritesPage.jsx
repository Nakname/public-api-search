import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ApiList from '../ApiList/ApiList';
import FilterPanel from '../FilterPanel/FilterPanel';
import SearchBar from '../SearchBar/SearchBar';
import './FavoritesPage.scss';

const FavoritesPage = () => {
  const apis = useSelector(state => state.api.apis);
  const favorites = useSelector(state => state.api.favorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ countries: [], twoDomainOnly: false, cnOnly: false });

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const favoriteApis = apis
    .filter(api => favorites.includes(api.id)) 
    .filter(api => {
      const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = filters.countries.length === 0 || filters.countries.includes(api.country);
      const matchesTwoDomain = !filters.twoDomainOnly || api.country === 'India'; 
      const matchesCnOnly = !filters.cnOnly || api.alpha_two_code === 'CN'; 

      return matchesSearch && matchesCountry && matchesTwoDomain && matchesCnOnly;
    });

  return (
    <div className="row">
      <div className="mt-1">
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      </div>
      <div className="col-md-9">
        <ApiList apis={favoriteApis} input={searchTerm} /> 
      </div>
      <div className="col-md-3 d-none d-lg-flex justify-content-end">
        <FilterPanel onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
};

export default FavoritesPage;
