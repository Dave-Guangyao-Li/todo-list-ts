import React, { useState } from 'react';
import styled from 'styled-components';

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

interface AddInputProps {
	onAdd: (label: string) => void;
}

const AddInput: React.FC<AddInputProps> = ({ onAdd }) => {
	const [input, setInput] = useState('');

	const handleAdd = () => {
		if (input.trim()) {
			onAdd(input);
			setInput('');
		}
	};

	return (
		<InputWrapper>
			<Input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder='Add a new task'
			/>
			<Button onClick={handleAdd}>Add</Button>
		</InputWrapper>
	);
};

export default AddInput;
