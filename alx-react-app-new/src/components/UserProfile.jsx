/* Expects props: name, age, bio */
export default function UserProfile(props) {
  return (
    <div
      style={{
        border: '1px solid #d1d5db',
        padding: '12px',
        margin: '12px auto',
        maxWidth: 480,
        borderRadius: 8,
        background: '#f9fafb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}
    >
      <h2 style={{ color: '#1d4ed8', margin: '0 0 8px' }}>{props.name}</h2>
      <p style={{ margin: '4px 0' }}>
        Age:{' '}
        <span style={{ fontWeight: 'bold', color: '#111827' }}>{props.age}</span>
      </p>
      <p style={{ margin: '4px 0', color: '#374151' }}>Bio: {props.bio}</p>
    </div>
  );
}
