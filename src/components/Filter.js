// Filter.jsx

import React from 'react';

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="filter">
      <h2>Filtrar por Categoria:</h2>
      <div className="filter-options">
        <div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">Todas</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Estudos">Estudos</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Saude">Saúde</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
