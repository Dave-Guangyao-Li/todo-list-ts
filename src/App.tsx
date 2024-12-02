import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import AddInput from './components/AddInput';

import TodoList from './components/TodoList';

const Wrapper = styled.div`
	width: 400px;
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface Todo {
	id: string;
	label: string;
	checked: boolean;
}

const App: React.FC = () => {
	const initialTodos = [
		{ id: '1', label: 'Buy groceries', checked: false },
		{ id: '2', label: 'Reboot computer', checked: false },
		{ id: '3', label: 'Ace interview', checked: true },
	];
	const [todos, setTodos] = useState(initialTodos);

	// Add new todo
	const addTodo = useCallback((label: string) => {
		setTodos((prev) => [{ id: uuid(), label, checked: false }, ...prev]);
	}, []);

	return (
		<Wrapper>
			<h1>Todo List</h1>
			<AddInput onAdd={addTodo} />
			<TodoList todos={todos} />
		</Wrapper>
	);
};

export default App;
