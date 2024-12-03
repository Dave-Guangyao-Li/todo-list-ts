import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
	id: string;
	label: string;
	checked: boolean;
}

interface TodoListProps {
	todos: Todo[];
	onChange: (id: string, checked: boolean) => void;
	onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onChange, onDelete }) => {
	return (
		<div>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					{...todo}
					onChange={onChange}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default TodoList;
