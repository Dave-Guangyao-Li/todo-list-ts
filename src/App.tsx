import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import AddInput from './components/AddInput';
import TodoList from './components/TodoList';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppWrapper = styled.div<{ isDarkMode: boolean }>`
	display: flex;
	width: 1000px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	// background: ${({ isDarkMode }) => isDarkMode ? '#1a1a1a' : '#f5f5f5'};
	color: ${({ isDarkMode }) => isDarkMode ? '#fff' : '#333'};
`;

const Card = styled.div<{ isDarkMode: boolean }>`
	background: ${({ isDarkMode }) => isDarkMode ? '#2d2d2d' : '#fff'};
	border-radius: 12px;
	box-shadow: 0px 4px 6px ${({ isDarkMode }) => isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
	max-width: 800px;
	width: 100%;
	padding: 20px;
	box-sizing: border-box;
`;

const Title = styled.h1`
	font-size: 1.8rem;
	// color: #333;
	margin-bottom: 20px;
	text-align: center;
`;

const FilterWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

const Dropdown = styled.select`
	padding: 10px;
	border-radius: 8px;
	border: 1px solid #ccc;
	font-size: 1rem;
	background: #fff;
	cursor: pointer;
	transition: border-color 0.3s;

	&:hover {
		border-color: #007bff;
	}

	&:focus {
		outline: none;
		border-color: #007bff;
	}
`;

const ThemeToggle = styled.button<{ isDarkMode: boolean }>`
	position: fixed;
	top: 20px;
	right: 20px;
	padding: 10px;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	background: ${({ isDarkMode }) => isDarkMode ? '#4a4a4a' : '#fff'};
	border: 1px solid ${({ isDarkMode }) => isDarkMode ? '#666' : '#ccc'};
	color: ${({ isDarkMode }) => isDarkMode ? '#fff' : '#333'};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	
	&:hover {
		background: ${({ isDarkMode }) => isDarkMode ? '#666' : '#f0f0f0'};
	}
`;

export interface Todo {
	id: string;
	label: string;
	checked: boolean;
	deadline?: Date | null;
	tags: string[];
}

const AppContent: React.FC = () => {
	const initialTodos = [
		{
			id: '1',
			label: 'Buy groceries',
			checked: false,
			deadline: '2024-12-01T23:59:00',
			tags: ['shopping']
		},
		{
			id: '2',
			label: 'Reboot computer',
			checked: false,
			deadline: '2024-12-10T23:59:00',
			tags: ['work']
		},
		{
			id: '3',
			label: 'Ace interview',
			checked: true,
			deadline: '2024-12-05T23:59:00',
			tags: ['personal']
		},
	];
	const { isDarkMode, toggleTheme } = useTheme();
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem('todos');
		if (savedTodos) {
			const parsedTodos = JSON.parse(savedTodos);
			// Add a deadline field to each item if it doesn't exist
			const updatedTodos = parsedTodos.map((todo: Todo) => {
				if (!todo.deadline) {
					todo.deadline = null; // or some default value
				}
				if (!todo.tags) {
					todo.tags = []; // or some default value
				}
				return todo;
			});
			return updatedTodos;
		} else {
			return initialTodos;
		}
	});

	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

	const filteredTodos = todos.filter((todo: Todo) => {
		if (filter === 'active') {
			return !todo.checked;
		}
		if (filter === 'completed') {
			return todo.checked;
		}
		return true;
	});

	// Add new todo
	const addTodo = useCallback((label: string, deadline?: Date | null, tags?: string[]) => {
		setTodos((prev: Todo[]) => [
			{ id: uuid(), label, checked: false, deadline, tags: tags || [] },
			...prev,
		]);
	}, []);

	const handleDelete = (id: string) => {
		const updateTodos = todos.filter((todo: Todo) => todo.id !== id);
		setTodos(updateTodos);
	};

	const handleChange = (
		id: string,
		checked: boolean,
		label?: string,
		deadline?: Date | null,
		tags?: string[]
	) => {
		const updatedTodos = todos
			.map((todo: Todo) =>
				todo.id === id
					? {
							...todo,
							checked,
							label: label || todo.label,
							deadline: deadline || todo.deadline,
							tags: tags || todo.tags,
					  }
					: todo
			)
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
		<AppWrapper isDarkMode={isDarkMode}>
			<ThemeToggle isDarkMode={isDarkMode} onClick={toggleTheme} aria-label="Toggle dark mode">
				{isDarkMode ? '🌞' : '🌙'}
			</ThemeToggle>
			<Card isDarkMode={isDarkMode}>
				<Title>Modern Todo List</Title>
				<FilterWrapper>
					<Dropdown
						value={filter}
						onChange={(e) => setFilter(e.target.value as typeof filter)}
					>
						<option value='all'>All</option>
						<option value='active'>Active</option>
						<option value='completed'>Completed</option>
					</Dropdown>
				</FilterWrapper>
				<AddInput onAdd={addTodo} />
				<TodoList
					todos={filteredTodos}
					onChange={handleChange}
					onDelete={handleDelete}
					setTodos={setTodos}
				/>
			</Card>
		</AppWrapper>
	);
};

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<AppContent />
		</ThemeProvider>
	);
};

export default App;
