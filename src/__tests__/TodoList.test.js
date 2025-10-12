import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList.jsx';

describe('TodoList', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Ship feature')).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /todo-list/i })).toBeInTheDocument();
  });

  test('adds a new todo (using fireEvent)', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/e\.g\., read a chapter/i);
    const addBtn = screen.getByRole('button', { name: /add/i });
    fireEvent.change(input, { target: { value: 'Practice RTL' } });
    fireEvent.click(addBtn);
    expect(screen.getByText('Practice RTL')).toBeInTheDocument();
  });

  test('toggles a todo when its text is clicked', () => {
    render(<TodoList />);
    const toggleBtn = screen.getByRole('button', { name: /toggle learn react/i });
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    expect(screen.getByText('Ship feature')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /delete ship feature/i }));
    expect(screen.queryByText('Ship feature')).not.toBeInTheDocument();
  });
});
