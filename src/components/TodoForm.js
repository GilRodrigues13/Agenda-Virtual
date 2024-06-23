import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState('#ffffff');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value || !category || !date) return;

    addTodo(value, category, date, color);

    setValue("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="todo-form">
      <h2>Criar tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o título"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Estudos">Estudos</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Saude">Saúde</option>
        </select>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
        <button type="submit">Criar tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;
