import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  const input = { display: 'block', margin: '10px 0', padding: 8, width: '100%', maxWidth: 420 };
  const label = { fontWeight: 600 };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
        <label style={label}>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={input}
          required
        />
        <label style={label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={input}
          required
        />
        <label style={label}>Message</label>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ ...input, height: 120, resize: 'vertical' }}
          required
        />
        <button type="submit" style={{ padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}>
          Send Message
        </button>
      </form>
    </div>
  );
}
