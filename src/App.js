import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth, onAuthStateChanged, signOut } from './components/firebaseConfig';

import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";
import Login from './auth/Login';
import Register from './auth/Register';

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const fetchTodos = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "todos"));
          const todosData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })).filter(todo => todo.userId === user.uid);
          setTodos(todosData);
        } catch (error) {
          console.error("Erro ao buscar documentos: ", error);
        }
      };

      fetchTodos();
    }
  }, [user]);

  const addTodo = async (title, category, date, color) => {
    const newTodo = {
      title,
      category,
      date,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      userId: user.uid,
      color,
    };
  
    try {
      const docRef = await addDoc(collection(db, "todos"), newTodo);
      const todoWithId = { id: docRef.id, ...newTodo };
      setTodos(prevTodos => [...prevTodos, todoWithId]);
      alert("Tarefa criada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Erro ao remover documento: ", error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      await updateDoc(doc(db, "todos", id), { isCompleted: !todo.isCompleted });
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Erro ao completar tarefa: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setTodos([]);
    } catch (error) {
      console.error('Erro ao fazer logout: ', error);
    }
  };

  const generateCalendarData = (todosToDisplay) => {
    const calendarData = {};

    todosToDisplay.forEach(todo => {
      if (filter === "All" || todo.category === filter) {
        const [day, time] = todo.date.split('T');
        const hour = parseInt(time.split(':')[0], 10);

        if (!calendarData[day]) {
          calendarData[day] = {};
        }

        if (!calendarData[day][hour]) {
          calendarData[day][hour] = [];
        }

        calendarData[day][hour].push(todo);
      }
    });

    return calendarData;
  };

  // Filtrar todos baseado na pesquisa
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  const calendarData = generateCalendarData(filteredTodos);

  const sortedDates = Object.keys(calendarData).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <Router>
      <Routes>
        {user ? (
          <Route path="*" element={
            <div className="app">
              <h1>Agenda de Tarefas</h1>
              <button onClick={handleLogout}>Logout</button>
              <Search search={search} setSearch={setSearch} />
              <Filter
                filter={filter}
                setFilter={setFilter}
              />
              <div className="calendar">
                <table>
                  <thead>
                    <tr>
                      <th>Dia/Hora</th>
                      {Array.from({ length: 24 }, (_, index) => (
                        <th key={index}>{index}:00</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDates.map((date) => (
                      <tr key={date}>
                        <td>{formatDate(date)}</td>
                        {Array.from({ length: 24 }, (_, hour) => (
                          <td key={hour}>
                            {calendarData[date]?.[hour]?.map(todo => (
                              <Todo
                                key={todo.id}
                                todo={todo}
                                removeTodo={removeTodo}
                                completeTodo={completeTodo}
                                className={todo.category === 'estudos' ? 'green' : ''}
                              />
                            ))}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TodoForm addTodo={addTodo} />
            </div>
          } />
        ) : (
          <>
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
