import React from 'react';
import styled from 'styled-components';

const TodoWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin-bottom: 8px;
`;

const Label = styled.label<{ checked: boolean }>`
	text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
`;

interface TodoItemProps {
	id: string;
	label: string;
	checked: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, label, checked }) => {
	return (
		<TodoWrapper>
			<Label checked={checked}>{label}</Label>
			<input type='checkbox' checked={checked} />
		</TodoWrapper>
	);
};

export default TodoItem;
