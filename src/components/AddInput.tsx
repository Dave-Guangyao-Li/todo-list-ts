import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTheme } from '../context/ThemeContext';

const InputWrapper = styled.div<{ isDarkMode: boolean }>`
	display: flex;
	margin-bottom: 16px;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
`;

const Input = styled.input<{ isDarkMode: boolean }>`
	flex: 1;
	padding: 8px;
	border: 1px solid ${({ isDarkMode }) => isDarkMode ? '#444' : '#ccc'};
	border-radius: 4px;
	background: ${({ isDarkMode }) => isDarkMode ? '#2d2d2d' : '#fff'};
	color: ${({ isDarkMode }) => isDarkMode ? '#fff' : '#333'};

	&::placeholder {
		color: ${({ isDarkMode }) => isDarkMode ? '#888' : '#999'};
	}
`;

const TagInput = styled(Input)`
	flex: 0.5;
`;

const Button = styled.button<{ isDarkMode: boolean }>`
	padding: 8px 12px;
	margin-left: 8px;
	background: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background: #0056b3;
	}

	&:focus {
		outline: 2px solid #0056b3;
		outline-offset: 2px;
	}
`;

const DatePickerWrapper = styled.div<{ isDarkMode: boolean }>`
	margin-left: 8px;
	
	.react-datepicker-wrapper {
		width: auto;
	}

	.react-datepicker__input-container input {
		padding: 8px;
		border: 1px solid ${({ isDarkMode }) => isDarkMode ? '#444' : '#ccc'};
		border-radius: 4px;
		background: ${({ isDarkMode }) => isDarkMode ? '#2d2d2d' : '#fff'};
		color: ${({ isDarkMode }) => isDarkMode ? '#fff' : '#333'};
	}
`;

interface AddInputProps {
	onAdd: (label: string, deadline?: Date | null, tags?: string[]) => void;
}

const AddInput: React.FC<AddInputProps> = ({ onAdd }) => {
	const { isDarkMode } = useTheme();
	const [label, setLabel] = useState('');
	const [deadline, setDeadline] = useState<Date | null>(null);
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState('');

	const handleAdd = () => {
		if (label.trim()) {
			onAdd(label, deadline, tags);
			setLabel('');
			setDeadline(null);
			setTags([]);
			setTagInput('');
		}
	};

	const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && tagInput.trim()) {
			setTags([...tags, tagInput.trim()]);
			setTagInput('');
		}
	};

	return (
		<>
			<InputWrapper isDarkMode={isDarkMode}>
				<Input
					type='text'
					value={label}
					onChange={(e) => setLabel(e.target.value)}
					placeholder='Add a new task'
					aria-label="New todo task input"
					isDarkMode={isDarkMode}
					onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
				/>
				<TagInput
					type='text'
					value={tagInput}
					onChange={(e) => setTagInput(e.target.value)}
					onKeyDown={handleTagInput}
					placeholder='Add tags (press Enter)'
					aria-label="Add tags to task"
					isDarkMode={isDarkMode}
				/>
				<DatePickerWrapper isDarkMode={isDarkMode}>
					<DatePicker
						selected={deadline}
						onChange={(date) => setDeadline(date)}
						placeholderText='Deadline'
						aria-label="Task deadline"
					/>
				</DatePickerWrapper>
				<Button 
					onClick={handleAdd}
					aria-label="Add new task"
					isDarkMode={isDarkMode}
				>
					Add
				</Button>
			</InputWrapper>
			{tags.length > 0 && (
				<div style={{ marginBottom: '16px' }}>
					Tags: {tags.map(tag => (
						<span 
							key={tag}
							style={{
								background: isDarkMode ? '#444' : '#e0e0e0',
								color: isDarkMode ? '#fff' : '#333',
								padding: '2px 6px',
								borderRadius: '12px',
								marginRight: '4px',
								fontSize: '12px'
							}}
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</>
	);
};

export default AddInput;
