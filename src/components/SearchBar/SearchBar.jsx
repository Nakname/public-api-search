import { IconFunnel } from '@consta/icons/IconFunnel';
import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import { Button } from '@consta/uikit/Button';
import { Sidebar } from '@consta/uikit/Sidebar';
import { TextField } from '@consta/uikit/TextField';
import React, { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import FilterPanel from '../FilterPanel/FilterPanel';
import './SearchBar.scss';

const SearchBar = ({ onSearch, onFilterChange, selectedCountries, onCountryChange }) => {
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const debouncedInputText = useDebounce(inputText, 300);

  React.useEffect(() => {
    onSearch(debouncedInputText.toLowerCase());
  }, [debouncedInputText, onSearch]);

  const handleInputChange = (event) => {
    const userInput = event || '';
    setInputText(userInput);
    onSearch(userInput.toLowerCase());
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="search-bar">
      <TextField
        leftSide={IconSearchStroked}
        placeholder="Введите текст"
        value={inputText}
        onChange={handleInputChange}
        view="default"
        withClearButton
      />

      <Button
        className="filter-button"
        label="Фильтры"
        view="secondary"
        iconRight={IconFunnel}
        onClick={handleOpenSidebar}
      />

      <Button
        className="filter-little-button"
        view="secondary"
        iconLeft={IconFunnel}
        onClick={handleOpenSidebar}
        onlyIcon
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onClickOutside={handleCloseSidebar}
        position="right"
        size="m"
        className="filter-sidebar"
      >
        <FilterPanel
          onFilterChange={onFilterChange}
          selectedCountries={selectedCountries}
          onCountryChange={onCountryChange}
          closeSidebar={handleCloseSidebar}
        />
      </Sidebar>
    </div>
  );
};

export default SearchBar;
