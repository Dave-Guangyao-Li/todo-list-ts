import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const InputWrapper = styled.div`
	display: flex;
	margin-bottom: 16px;
`;

const Input = styled.input`
	flex: 1;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const Button = styled.button`
	padding: 8px 12px;
	margin-left: 8px;
	background: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
`;

const DatePickerWrapper = styled.div`
	margin-bottom: 6px;
`;

const DeleteButton = styled.button`
	padding: 8px 12px;
	margin-left: 8px;
	background: #dc3545;
	color: #fff;
	border: none;
	cursor: pointer;
`;

interface AddInputProps {
	onAdd: (label: string, deadline?: Date | null) => void;
}

const AddInput: React.FC<AddInputProps> = ({ onAdd }) => {
	const [label, setLabel] = useState('');
	const [deadline, setDeadline] = useState<Date | null>(null);

	const handleAdd = () => {
		if (label.trim()) {
			onAdd(label, deadline);
			setLabel('');
			setDeadline(null);
		}
	};

	return (
		<InputWrapper>
			<Input
				type='text'
				value={label}
				onChange={(e) => setLabel(e.target.value)}
				placeholder='Add a new task'
			/>
			<DatePickerWrapper>
				<DatePicker
					selected={deadline}
					onChange={(date) => setDeadline(date)}
					placeholderText='Deadline'
				/>
			</DatePickerWrapper>
			<Button onClick={handleAdd}>Add</Button>
		</InputWrapper>
	);
};

export default AddInput;
