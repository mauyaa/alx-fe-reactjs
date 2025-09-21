import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const nav = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: '#1f2937',
    color: 'white'
  };

  const links = { display: 'flex', gap: 12 };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#34d399' : 'white',
    textDecoration: 'none',
    padding: '6px 8px',
    borderRadius: 6,
    background: isActive ? 'rgba(52, 211, 153, 0.15)' : 'transparent'
  });

  return (
    <nav style={nav}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>
        MyCompany
      </Link>
      <div style={links}>
        <NavLink to="/" style={linkStyle} end>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/services" style={linkStyle}>Services</NavLink>
        <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
      </div>
    </nav>
  );
}
