import { IconClose } from '@consta/icons/IconClose';
import { Button } from '@consta/uikit/Button';
import { Checkbox } from '@consta/uikit/Checkbox';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Select } from '@consta/uikit/Select';
import { Tag } from '@consta/uikit/Tag';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './FilterPanel.scss';

const FilterPanel = ({ onFilterChange, closeSidebar }) => {
  const apis = useSelector((state) => state.api.apis);
  const countries = [...new Set(apis.map(api => api.country))].map((country, index) => ({
    label: country,
    id: index,
  }));


  const [tempSelectedCountries, setTempSelectedCountries] = useState([]);
  const [tempTwoDomainOnly, setTempTwoDomainOnly] = useState(false);
  const [tempCnOnly, setTempCnOnly] = useState(false);

  const handleAddCountry = (value) => {
    if (value && !tempSelectedCountries.find(country => country.label === value.label)) {
      const updatedCountries = [...tempSelectedCountries, value];
      setTempSelectedCountries(updatedCountries);
    }
  };

  const handleRemoveCountry = (countryToRemove) => {
    const updatedCountries = tempSelectedCountries.filter(cat => cat.label !== countryToRemove.label);  
    setTempSelectedCountries(updatedCountries);
  };

  const handleCheckboxChange = (setter, filterKey) => (event) => {
    setter(event.target.checked);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      countries: tempSelectedCountries.map(country => country.label),
      twoDomainOnly: tempTwoDomainOnly,
      cnOnly: tempCnOnly,
    });
  };

  return (
    <div className="filter-panel">
      <div className="mb-3 filter-header">
        <span>Фильтры</span>
        <IconClose size="m" as="div" className="filter-close" onClick={closeSidebar} />
      </div>
      <div className="filter-line"></div>
      <div className="filter-body">
        <Select
          label="Страны"
          placeholder="Выберите страну"
          items={countries}
          value={tempSelectedCountries}
          onChange={handleAddCountry}
          renderValue={() => (
            <div>
              {tempSelectedCountries.map((country) => (
                <Tag
                  key={country.id}
                  label={country.label}
                  onCancel={() => handleRemoveCountry(country)}
                  size="m"
                  mode="cancel"
                  style={{ marginRight: 1 }}
                />
              ))}
            </div>
          )}
        />

        <Grid cols={1}>
          <GridItem>
            <Checkbox
              label="только Индийские"
              checked={tempTwoDomainOnly}
              onChange={handleCheckboxChange(setTempTwoDomainOnly, 'twoDomainOnly')}
            />
          </GridItem>
          <GridItem>
            <Checkbox
              label="CN"
              checked={tempCnOnly}
              onChange={handleCheckboxChange(setTempCnOnly, 'cnOnly')}
            />
          </GridItem>
          <GridItem className="apply-btn d-flex justify-content-center">
            <div className="filter-line"></div>
            <Button
              className="mt-2"
              view="secondary"
              align="center"
              onClick={handleApplyFilters}
              label="Применить"
            />
          </GridItem>
        </Grid>
      </div>
    </div>
  );
};

export default FilterPanel;
