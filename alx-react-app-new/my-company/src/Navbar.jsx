import { Link } from 'react-router-dom';

function Navbar() {
  const linkStyle = {
    margin: '0 10px',
    textDecoration: 'none',
    color: 'blue'
  };

  return (
    <nav style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/services" style={linkStyle}>Services</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </nav>
  );
}

export default Navbar;
