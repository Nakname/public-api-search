import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import ApiList from './components/ApiList/ApiList';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import FilterPanel from './components/FilterPanel/FilterPanel';
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/SearchBar/SearchBar';
import './styles/main.scss';

const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <Router>
        <AppContent />
      </Router>
    </Theme>
  );
};

const AppContent = () => {
  const { apis } = useSelector(state => state.api);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ countries: [], twoDomainOnly: false, cnOnly: false });
  const location = useLocation();

  const handleSearch = (term) => {
    setSearchTerm(term || '');  
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);  
  };

  const filteredApis = apis.filter(api => {
    const matchesCountry = filters.countries.length === 0 || filters.countries.includes(api.country);
    const matchesTwoDomain = !filters.twoDomainOnly || api.country === 'India';
    const matchesCnOnly = !filters.cnOnly || api.alpha_two_code === 'CN';

    return matchesCountry && matchesTwoDomain && matchesCnOnly;
  });

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        {location.pathname !== '/favorites' && (
          <SearchBar 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange}
            selectedCountries={filters.countries.map(country => ({ label: country, id: country }))}
            onCountryChange={() => {}}
          />
        )}
        <Routes>
          <Route path="/" element={
            <div className="row">
              <div className="col-md-9">
                <ApiList apis={filteredApis} input={searchTerm} />
              </div>
              <div className="col-md-3 d-none d-lg-flex justify-content-end">
                <FilterPanel onFilterChange={handleFilterChange} />
              </div>
            </div>
          } />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
