import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTheme } from '../context/ThemeContext';

const TodoWrapper = styled.div<{ isDarkMode: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 8px;
	border: 1px solid ${({ isDarkMode }) => isDarkMode ? '#444' : '#ccc'};
	border-radius: 4px;
	margin-bottom: 8px;
	background: ${({ isDarkMode }) => isDarkMode ? '#2d2d2d' : '#fff'};
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

const TagsContainer = styled.div`
	display: flex;
	gap: 4px;
	margin-left: 8px;
	flex-wrap: wrap;
`;

const Tag = styled.span<{ isDarkMode: boolean }>`
	background: ${({ isDarkMode }) => isDarkMode ? '#444' : '#e0e0e0'};
	color: ${({ isDarkMode }) => isDarkMode ? '#fff' : '#333'};
	padding: 2px 6px;
	border-radius: 12px;
	font-size: 12px;
	display: inline-flex;
	align-items: center;
`;

const TagInput = styled.input<{ isDarkMode: boolean }>`
	background: ${({ isDarkMode }) => isDarkMode ? '#444' : '#fff'};
	color: ${({ isDarkMode }) => isDarkMode ? '#fff' : '#333'};
	border: 1px solid ${({ isDarkMode }) => isDarkMode ? '#666' : '#ccc'};
	padding: 4px;
	border-radius: 4px;
	margin-right: 8px;
	width: 80px;
`;

interface TodoItemProps {
	id: string;
	label: string;
	checked: boolean;
	onChange: (
		id: string,
		checked: boolean,
		label?: string,
		deadline?: Date | null,
		tags?: string[]
	) => void;
	onDelete: (id: string) => void;
	deadline?: Date | null;
	tags: string[];
}

const TodoItem: React.FC<TodoItemProps> = ({
	id,
	label,
	checked,
	onChange,
	onDelete,
	deadline,
	tags,
}) => {
	const { isDarkMode } = useTheme();
	const [isEditing, setIsEditing] = useState(false);
	const [isEditingDeadline, setIsEditingDeadline] = useState(false);
	const [newDeadline, setNewDeadline] = useState(deadline);
	const [editLabel, setEditLabel] = useState(label);
	const [editTags, setEditTags] = useState(tags);
	const [newTag, setNewTag] = useState('');

	const isOverdue = deadline && new Date() > new Date(deadline);

	const handleSave = () => {
		if (editLabel.trim()) {
			onChange(id, checked, editLabel, newDeadline, editTags);
			setIsEditing(false);
			setIsEditingDeadline(false);
		}
	};

	const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && newTag.trim()) {
			setEditTags([...editTags, newTag.trim()]);
			setNewTag('');
			onChange(id, checked, editLabel, newDeadline, [...editTags, newTag.trim()]);
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		const updatedTags = editTags.filter(tag => tag !== tagToRemove);
		setEditTags(updatedTags);
		onChange(id, checked, editLabel, newDeadline, updatedTags);
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
		<TodoWrapper isDarkMode={isDarkMode}>
			<input
				type='checkbox'
				checked={checked}
				onChange={(e) => onChange(id, e.target.checked)}
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
					onBlur={handleSave}
					onKeyDown={(e) => e.key === 'Enter' && handleSave()}
					aria-label="Edit todo text"
				/>
			) : (
				<span
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
				</span>
			)}
			{isEditingDeadline ? (
				<DatePicker
					selected={newDeadline}
					onChange={(date) => setNewDeadline(date)}
					placeholderText='Deadline'
					onBlur={handleSave}
					onKeyDown={(e) => e.key === 'Enter' && handleSave()}
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
			{isEditing ? (
				<>
					<TagInput
						type="text"
						value={newTag}
						onChange={(e) => setNewTag(e.target.value)}
						onKeyDown={handleAddTag}
						placeholder="Add tag"
						aria-label="Add new tag"
						isDarkMode={isDarkMode}
					/>
					<TagsContainer>
						{editTags.map((tag) => (
							<Tag 
								key={tag} 
								isDarkMode={isDarkMode}
								onClick={() => handleRemoveTag(tag)}
								role="button"
								aria-label={`Remove ${tag} tag`}
							>
								{tag} ×
							</Tag>
						))}
					</TagsContainer>
				</>
			) : (
				<TagsContainer>
					{tags.map((tag) => (
						<Tag 
							key={tag} 
							isDarkMode={isDarkMode}
							role="status"
							aria-label={`Task tag: ${tag}`}
						>
							{tag}
						</Tag>
					))}
				</TagsContainer>
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
