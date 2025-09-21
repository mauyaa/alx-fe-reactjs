export default function Footer() {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: 16,
        background: '#f3f4f6',
        borderTop: '1px solid #e5e7eb'
      }}
    >
      <small>&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</small>
    </footer>
  );
}
