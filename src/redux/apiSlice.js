import { createSlice } from '@reduxjs/toolkit';
import apiData from '../components/ApiList/ApiData.json';

const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    apis: apiData,
    favorites: loadFavorites(),
    filters: {
      category: null,
      https: false,
      cors: false,
    },
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const apiId = action.payload;
      if (state.favorites.includes(apiId)) {
        state.favorites = state.favorites.filter(id => id !== apiId);
      } else {
        state.favorites.push(apiId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { toggleFavorite, setFilters } = apiSlice.actions;
export default apiSlice.reducer;
