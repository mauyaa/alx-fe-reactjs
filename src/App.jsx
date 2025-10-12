import TodoList from './components/TodoList.jsx';
export default function App() {
  return (
    <main style={{ maxWidth: 520, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>React Todo</h1>
      <TodoList />
    </main>
  );
}
