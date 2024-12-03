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
}

const TodoList: React.FC<TodoListProps> = ({ todos, onChange }) => {
	return (
		<div>
			{todos.map((todo) => (
				<TodoItem key={todo.id} {...todo} onChange={onChange} />
			))}
		</div>
	);
};

export default TodoList;
