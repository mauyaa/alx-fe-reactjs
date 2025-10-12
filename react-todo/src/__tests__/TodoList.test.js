import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import TodoList from '../components/TodoList';

const renderApp = () => render(<App />);

const demoTodos = [
  { id: '1', text: 'First todo', completed: false },
  { id: '2', text: 'Second todo', completed: true },
];

test('renders the initial list of todos', () => {
  renderApp();
  expect(
    screen.getByRole('button', { name: /^Review project requirements$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /^Implement todo list component$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /^Write component tests$/i })
  ).toBeInTheDocument();
});

test('allows users to add a new todo item', () => {
  renderApp();
  const input = screen.getByLabelText(/add a new todo/i);
  fireEvent.change(input, { target: { value: 'Ship the release' } });
  fireEvent.click(screen.getByRole('button', { name: /add/i }));

  expect(
    screen.getByRole('button', { name: /^Ship the release$/i })
  ).toBeInTheDocument();
  expect(input).toHaveValue('');
});

test('renders todos passed into TodoList component', () => {
  render(
    <TodoList
      todos={demoTodos}
      onToggleTodo={jest.fn()}
      onDeleteTodo={jest.fn()}
    />
  );
  expect(screen.getByRole('button', { name: /^First todo$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^Second todo$/i })).toBeInTheDocument();
});

test('allows users to toggle a todo item', () => {
  renderApp();
  const todoButton = screen.getByRole('button', {
    name: /^Implement todo list component$/i,
  });

  expect(todoButton).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(todoButton);
  expect(todoButton).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(todoButton);
  expect(todoButton).toHaveAttribute('aria-pressed', 'false');
});

test('calls toggle handler when TodoList item is clicked', () => {
  const handleToggle = jest.fn();
  render(
    <TodoList
      todos={demoTodos}
      onToggleTodo={handleToggle}
      onDeleteTodo={jest.fn()}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: /^First todo$/i }));
  expect(handleToggle).toHaveBeenCalledWith('1');
});

test('allows users to delete a todo item', () => {
  renderApp();
  const todoText = /^Review project requirements$/i;
  expect(
    screen.getByRole('button', { name: todoText })
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /delete review project requirements/i }));

  expect(
    screen.queryByRole('button', { name: todoText })
  ).not.toBeInTheDocument();
});

test('calls delete handler when TodoList delete button is clicked', () => {
  const handleDelete = jest.fn();
  render(
    <TodoList
      todos={demoTodos}
      onToggleTodo={jest.fn()}
      onDeleteTodo={handleDelete}
    />
  );

  fireEvent.click(
    screen.getByRole('button', { name: /delete first todo/i })
  );
  expect(handleDelete).toHaveBeenCalledWith('1');
});
