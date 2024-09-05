import React from 'react';
import ApiCard from '../ApiCard/ApiCard';
import './ApiList.scss';

const ApiList = ({ apis, input }) => {
  const searchInput = typeof input === 'string' ? input : '';

  const filteredData = apis.filter(api => {
    if (searchInput === '') {
      return api;
    } else {
      return api.name.toLowerCase().includes(searchInput.toLowerCase());
    }
  });

  return (
    <div className="api-list">
      {filteredData.map(api => (
        <div className="ApiCard" key={api.id}>
          <ApiCard api={api} />
        </div>
      ))}
    </div>
  );
};

export default ApiList;
