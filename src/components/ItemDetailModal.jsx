import React from 'react'
import emailjs from 'emailjs-com'





export default function ItemDetailModal({ item, onClose }) {

  const handleEnquire = () => {
  const templateParams = {
    to_name: 'Admin',
    from_name: 'CrowdShield App User',
    message: `User enquired about "${item.name}" (${item.type})\nDescription: ${item.desc}`
  }

  emailjs.send('khushi service ', 'template_js4rx0n', templateParams, '4Mq1iKe07OOWNGspB')
    .then(() => alert('Enquiry email sent!'))
    .catch((err) => alert('Failed to send email: ' + err.message))
}
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 0 25px rgba(0,0,0,0.2)'
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '10px',
          right: '15px',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          color: '#333',
          cursor: 'pointer'
        }}>✖</button>

        {/* Title & Description */}
        <h2 style={{ marginBottom: '0.5rem', color: '#333' }}>{item.name}</h2>
        <p style={{ color: '#555', marginBottom: '0.25rem' }}><strong>Type:</strong> {item.type}</p>
        <p style={{ color: '#666', marginBottom: '1rem' }}>{item.desc}</p>

        {/* Images Carousel */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid #ddd',
          marginBottom: '1rem'
        }}>
          {[item.cover, ...item.images].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`item-${i}`}
              style={{ height: '180px', borderRadius: '8px' }}
            />
          ))}
        </div>

        {/* Enquire Button */}
        <button
          onClick={handleEnquire}
          style={{
            padding: '0.6rem 1.5rem',
            fontSize: '1rem',
            background: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.background = '#007BFF'}
        >
          Enquire
        </button>
      </div>
    </div>
  )
}
