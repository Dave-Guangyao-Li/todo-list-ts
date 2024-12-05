1. Initialize a React + TypeScript Project

```shell
npx create-react-app todo-list-ts --template typescript
cd todo-list-ts
npm start
```

2. Install Required Packages

```shell
npm install uuid styled-components
npm install @types/react @types/styled-components
```

Step 2: Boilerplate Code
src/
|-- components/
| |-- AddInput.tsx
| |-- TodoItem.tsx
| |-- TodoList.tsx
|-- App.tsx
|-- index.css

# React + TypeScript Todo List App

This project involves building a functional Todo List application using React and TypeScript. The tasks are designed to test your knowledge of React fundamentals, state management, TypeScript, and component-based design principles. Below are the requirements, detailed solutions, and boilerplate code for each step.

## Requirements

1. Initialize the App

   • The app should start with three predefined todo items:

2. Task 1: Toggle a Todo Item’s Checked State

   • Implement a handleChange function in App.tsx to toggle the checked state of a todo item.
   • Pass the handleChange function to the TodoList component and further to individual TodoItem components.
   • When a checkbox is clicked:
   • Update the checked property of the corresponding todo item.
   • Ensure immutability by creating a new state array.

3. Task 2: Persist Todos to Local Storage

   • Use the browser’s localStorage to persist the todo list.
   • Implement the following:
   • Load Todos: When the app loads, retrieve saved todos from localStorage.
   • Save Todos: Whenever the state updates, synchronize the todos with localStorage.

4. Task 3: Move Checked Items to the Bottom

   • Update the handleChange function to ensure:
   • Checked items are moved to the bottom of the list.
   • Unchecked items always appear at the top.
   • Use array sorting (.sort()) to reorder todos.

5. Task 4: Delete a Todo Item

   • Add functionality to delete a todo item.
   • Include a button (e.g., an “X” in the top-right corner of each TodoItem) to remove it.
   • Implement the handleDelete function in App.tsx to:
   • Filter out the todo item by its id.
   • Update the state with the remaining todos.

6. Bonus Features (If Time Permits)

   • Add animations for toggling, reordering, or deleting todos.
   • Implement a filtering system with options:
   • All
   • Active (unchecked)
   • Completed (checked)
   • Allow inline editing of the label for each todo item.

## Bonus Features:

    1.	Add Animations:
       •	Animate toggling, reordering, and deleting todos.
         Solution:Use React Transition Group for animations.
         npm install react-transition-group
    2.	Filtering System:
      •	Add filters to display:
         •	All todos
         •	Active todos (unchecked)
         •	Completed todos (checked)
    3.	Inline Editing:
       •	Allow users to edit the label of a todo directly.
    4.	Accessibility:
       •	Add ARIA labels for checkboxes and buttons.
    5.	Confirmation Prompt Before Deleting:
       •	Display a confirmation prompt before permanently deleting a todo.

## Advanced Requirements

1. Prioritize Tasks (Drag-and-Drop)
   Allow users to reorder tasks using a drag-and-drop interface.
2. Task Deadline with Notifications
   Allow users to set a deadline for tasks and notify them when a task is overdue.
3. Add Task Tags
   Allow users to categorize tasks with tags (e.g., “Work”, “Personal”).
4. Dark Mode
   Add a dark mode toggle to the app.
5. Progressive Web App (PWA)
   Turn the app into a PWA so users can install it on their devices.
6. Offline Mode
   Cache todos locally and allow updates offline, syncing changes when the app goes online.

## Component Structure

1. App.tsx

   • Manages the state of the todos and passes handlers to child components.
   • Implements handleChange, handleDelete, and localStorage logic.

2. TodoList.tsx

   • Accepts todos, onChange, and onDelete props.
   • Renders a list of TodoItem components.

3. TodoItem.tsx

   • Displays a single todo with:
   • A checkbox for toggling.
   • A label showing the task.
   • A delete button to remove the item.

4. AddInput.tsx

   • Provides an input field and a button to add new todos.
   • Calls the onAdd function passed from App.tsx.

## Key Interview Expectations

    1.	Correctness: Does the app meet all functional requirements?
    2.	Clean Code: Are components modular and reusable? Is the code readable and maintainable?
    3.	TypeScript Usage: Are types defined and used effectively?
    4.	State Management: Is state updated immutably and efficiently?
    5.	UI/UX: Is the app visually organized and user-friendly?
