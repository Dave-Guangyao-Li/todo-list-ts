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
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem('todos');
		return savedTodos ? JSON.parse(savedTodos) : initialTodos;
	});

	// Add new todo
	const addTodo = useCallback((label: string) => {
		setTodos((prev: Todo[]) => [
			{ id: uuid(), label, checked: false },
			...prev,
		]);
	}, []);

	const handleChange = (id: string, checked: boolean) => {
		const updatedTodos = todos
			.map((todo: Todo) => (todo.id === id ? { ...todo, checked } : todo))
			.sort((a: Todo, b: Todo) => {
				if (!a.checked && b.checked) {
					return -1; // `a` is unchecked, comes before `b`
				}
				if (a.checked && !b.checked) {
					return 1; // `a` is checked, comes after `b`
				}
				return 0; // Both are either checked or unchecked, order remains unchanged
			}); // Both are either checked or unchecked, order remains unchanged}); //This sorting function ensures that unchecked todos (checked: false) appear before checked todos (checked: true)
		// The comparison function must return:
		// •	Negative value: If a should come before b.
		// •	Zero: If a and b are considered equal (order remains unchanged).
		// •	Positive value: If a should come after b.
		// •	Subtracting the numeric equivalents of a.checked and b.checked results in:
		// •	Negative Value: If a.checked is false (0) and b.checked is true (1), meaning a comes before b.
		// •	Zero: If a.checked and b.checked are equal, meaning the relative order doesn’t change.
		// •	Positive Value: If a.checked is true (1) and b.checked is false (0), meaning a comes after b.
		setTodos(updatedTodos);
	};

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<Wrapper>
			<h1>Todo List</h1>
			<AddInput onAdd={addTodo} />
			{/*  the checked value is explicitly passed from the TodoItem component via the onChange handler. This approach ensures that the checked state of the todo is set to the exact value provided by the input event (e.target.checked), which comes directly from the browser’s checkbox state. */}
			<TodoList todos={todos} onChange={handleChange} />
		</Wrapper>
	);
};

export default App;
