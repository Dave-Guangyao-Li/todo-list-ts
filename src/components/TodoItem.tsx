import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin-bottom: 8px;
`;

const TodoItemUpdateButton = styled.button`
	padding: 8px 12px;
	margin-right: 8px;
	background: #007bff;
	color: #fff;
	border: none;
	cursor: pointer;
	&:focus {
		outline: 2px solid #0056b3;
		outline-offset: 2px;
	}
`;

const TodoItemDeleteButton = styled.button`
	padding: 8px 12px;
	margin-right: 8px;
	background: red;
	color: #fff;
	border: none;
	cursor: pointer;
	&:focus {
		outline: 2px solid #cc0000;
		outline-offset: 2px;
	}
`;
// const Label = styled.label<{ checked: boolean }>`
// 	text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
// `;

interface TodoItemProps {
	id: string;
	label: string;
	checked: boolean;
	onChange: (
		id: string,
		checked: boolean,
		label?: string,
		deadline?: Date | null
	) => void; // Ensure this is included
	onDelete: (id: string) => void;
	deadline?: Date | null;
}

const TodoItem: React.FC<TodoItemProps> = ({
	id,
	label,
	checked,
	onChange,
	onDelete,
	deadline,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isEditingDeadline, setIsEditingDeadline] = useState(false);
	const [newDeadline, setNewDeadline] = useState(deadline);
	const [editLabel, setEditLabel] = useState(label);

	const isOverdue = deadline && new Date() > new Date(deadline);

	const handleSave = () => {
		if (editLabel.trim()) {
			onChange(id, checked, editLabel, newDeadline);
			setIsEditing(false);
			setIsEditingDeadline(false);
		}
	};

	const handleEdit = () => {
		setIsEditing(true);
		setIsEditingDeadline(true);
	};

	const handleDelete = () => {
		const userConfirmed = window.confirm(
			`Are you sure you want to delete "${label}"?`
		);
		if (userConfirmed) {
			onDelete(id);
		}
	};

	return (
		<TodoWrapper>
			<input
				type='checkbox'
				checked={checked}
				onChange={(e) => onChange(id, e.target.checked)} // Pass updated checked state.// The checked value passed to onChange comes directly from the DOM event (e.target.checked), which ensures that the UI and the application state remain in sync.
				aria-label={`Mark ${label} as ${checked ? 'incomplete' : 'complete'}`}
				role="checkbox"
				aria-checked={checked}
			/>
			{isEditing ? (
				<input
					style={{
						whiteSpace: 'nowrap',
						width: '100px',
					}}
					type='text'
					value={editLabel}
					onChange={(e) => setEditLabel(e.target.value)}
					onBlur={handleSave} // Save on blur
					onKeyDown={(e) => e.key === 'Enter' && handleSave()} // Save on Enter
					aria-label="Edit todo text"
				/>
			) : (
				<span
					// onDoubleClick={() => setIsEditing(true)}
					style={{
						textDecoration: checked ? 'line-through' : 'none',
						whiteSpace: 'nowrap',
						width: '100px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						}}
						aria-label={`Edit ${label} text`}
				>
					{label}
				</span> // Enable editing on double-click
			)}
			{isEditingDeadline ? (
				// <input
				// 	type='date'
				// 	value={newDeadline?.toISOString() ?? ''}
				// 	onChange={handleChange}
				// 	onBlur={handleSave}
				// />
				<DatePicker
					selected={newDeadline}
					onChange={(date) => setNewDeadline(date)}
					placeholderText='Deadline'
					onBlur={handleSave} // Save on blur
					onKeyDown={(e) => e.key === 'Enter' && handleSave()} // Save on Enter
				/>
			) : deadline ? (
				<span
					style={{
						color: isOverdue ? 'red' : 'green',
						width: '200px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{isOverdue
						? `Overdue:  ${new Date(deadline).toLocaleDateString()}`
						: `Due: ${new Date(deadline).toLocaleDateString()}`}
				</span>
			) : (
				<span
					style={{
						color: 'Blue',
						width: '200px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
					aria-label='No deadline'
				>
					No deadline
				</span>
			)}

			<div
				className='todo-item-buttons'
				style={{ display: 'flex', flexDirection: 'row' }}
			>
				<TodoItemUpdateButton
					onClick={handleEdit}
					aria-label={`Edit ${label}`}
				>Edit</TodoItemUpdateButton>
				<TodoItemDeleteButton
					onClick={handleDelete}
					aria-label={`Delete ${label}`}
				>
					Delete
				</TodoItemDeleteButton>
			</div>
		</TodoWrapper>
	);
};

export default TodoItem;
