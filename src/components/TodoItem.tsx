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
	onChange: (id: string, checked: boolean) => void; // Ensure this is included
}

const TodoItem: React.FC<TodoItemProps> = ({
	id,
	label,
	checked,
	onChange,
}) => {
	return (
		<TodoWrapper>
			<Label checked={checked}>{label}</Label>
			<input
				type='checkbox'
				checked={checked}
				onChange={(e) => onChange(id, e.target.checked)} // The checked value passed to onChange comes directly from the DOM event (e.target.checked), which ensures that the UI and the application state remain in sync.
			/>
		</TodoWrapper>
	);
};

export default TodoItem;
