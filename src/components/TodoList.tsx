import React from 'react';
import TodoItem from './TodoItem';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { motion, AnimatePresence } from 'framer-motion';
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
			<AnimatePresence>
				{todos.map((todo) => (
					<motion.div
						key={todo.id}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
					>
						<TodoItem {...todo} onChange={onChange} onDelete={onDelete} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};

export default TodoList;
