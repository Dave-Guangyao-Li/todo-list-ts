import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const TodoWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin-bottom: 8px;
`;

// const Label = styled.label<{ checked: boolean }>`
// 	text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
// `;

interface TodoItemProps {
	id: string;
	label: string;
	checked: boolean;
	onChange: (id: string, checked: boolean, label?: string) => void; // Ensure this is included
	onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
	id,
	label,
	checked,
	onChange,
	onDelete,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editLabel, setEditLabel] = useState(label);

	const handleSave = () => {
		if (editLabel.trim()) {
			onChange(id, checked, editLabel);
			setIsEditing(false);
		}
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
			/>
			{isEditing ? (
				<input
					type='text'
					value={editLabel}
					onChange={(e) => setEditLabel(e.target.value)}
					onBlur={handleSave} // Save on blur
					onKeyDown={(e) => e.key === 'Enter' && handleSave()} // Save on Enter
				/>
			) : (
				<span
					onDoubleClick={() => setIsEditing(true)}
					style={{ textDecoration: checked ? 'line-through' : 'none' }}
				>
					{label}
				</span> // Enable editing on double-click
			)}
			<button onClick={handleDelete}>X</button>
		</TodoWrapper>
	);
};

export default TodoItem;
