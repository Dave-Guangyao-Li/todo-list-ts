import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
	id: string;
	label: string;
	checked: boolean;
}

interface TodoListProps {
	todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
	return (
		<div>
			{todos.map((todo) => (
				<TodoItem key={todo.id} {...todo} />
			))}
		</div>
	);
};

export default TodoList;
