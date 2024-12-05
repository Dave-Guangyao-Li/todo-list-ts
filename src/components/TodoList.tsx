import React from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
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
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({
	todos,
	onChange,
	onDelete,
	setTodos,
}) => {
	const handleDragEnd = (result: any) => {
		console.log('handleDragEnd called', result);
		if (!result.destination) return;

		const reorderedTodos = Array.from(todos);
		const [removed] = reorderedTodos.splice(result.source.index, 1);
		reorderedTodos.splice(result.destination.index, 0, removed);
		setTodos(reorderedTodos);
	};
	return (
		<div>
			<DragDropContext onDragEnd={handleDragEnd}>
				<StrictModeDroppable droppableId='todos'>
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							<AnimatePresence>
								{todos.map((todo, index) => (
									<Draggable key={todo.id} draggableId={todo.id} index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<motion.div
													key={todo.id}
													initial={{ opacity: 0, y: -20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -20 }}
													transition={{ duration: 0.3 }}
												>
													<TodoItem
														{...todo}
														onChange={onChange}
														onDelete={onDelete}
													/>
												</motion.div>
											</div>
										)}
									</Draggable>
								))}
							</AnimatePresence>

							{provided.placeholder}
						</div>
					)}
				</StrictModeDroppable>
			</DragDropContext>
		</div>
	);
};

export default TodoList;
