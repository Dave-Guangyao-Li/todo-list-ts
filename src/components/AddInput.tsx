import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTheme } from '../context/ThemeContext';

const InputWrapper = styled.div<{ isDarkMode: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input<{ isDarkMode: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid ${({ isDarkMode }) => isDarkMode ? '#4A5568' : '#E2E8F0'};
  background: ${({ isDarkMode }) => isDarkMode ? '#2D3748' : '#FFFFFF'};
  color: ${({ isDarkMode }) => isDarkMode ? '#E2E8F0' : '#2D3748'};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4299E1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const Button = styled.button<{ isDarkMode: boolean }>`
  padding: 0.75rem 1.5rem;
  background: #4299E1;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #3182CE;
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const DatePickerWrapper = styled.div<{ isDarkMode: boolean }>`
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker__input-container input {
    // width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: 2px solid ${({ isDarkMode }) => isDarkMode ? '#4A5568' : '#E2E8F0'};
    background: ${({ isDarkMode }) => isDarkMode ? '#2D3748' : '#FFFFFF'};
    color: ${({ isDarkMode }) => isDarkMode ? '#E2E8F0' : '#2D3748'};
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #4299E1;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
    }
  }
`;

const TagsContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span<{ isDarkMode: boolean }>`
  background: ${({ isDarkMode }) => isDarkMode ? '#4A5568' : '#EDF2F7'};
  color: ${({ isDarkMode }) => isDarkMode ? '#E2E8F0' : '#2D3748'};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    filter: brightness(110%);
    cursor: pointer;
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
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <InputWrapper isDarkMode={isDarkMode}>
        <InputGroup>
          <Input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Add a new task"
            aria-label="New todo task input"
            isDarkMode={isDarkMode}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInput}
            placeholder="Add tags (press Enter)"
            aria-label="Add tags to task"
            isDarkMode={isDarkMode}
          />
        </InputGroup>
        <InputGroup>
          <DatePickerWrapper isDarkMode={isDarkMode}>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              placeholderText="Set deadline"
              aria-label="Task deadline"
              dateFormat="MM/dd/yyyy"
            />
          </DatePickerWrapper>
          <Button 
            onClick={handleAdd}
            aria-label="Add new task"
            isDarkMode={isDarkMode}
          >
            Add Task
          </Button>
        </InputGroup>
      </InputWrapper>
      {tags.length > 0 && (
        <TagsContainer isDarkMode={isDarkMode}>
          {tags.map(tag => (
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
      )}
    </div>
  );
};

export default AddInput;
