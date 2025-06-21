import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ItemDetailModal from '../components/ItemDetailModal'

export default function ViewItems() {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(res => setItems(res.data))
      .catch(() => setItems([]))
  }, [])

  return (
    <div style={{
      width:'100vw',
      height: '100vh',
   background: '#020024',
background: 'linear-gradient(90deg,rgb(52, 95, 118) 0%, rgb(147, 147, 225) 35%, rgb(228, 183, 119) 100%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem'}}>
    <div style={{ maxWidth: '1000px', width: '100%' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#333' }}>View Items</h2>

      {items.length === 0 ? (
        <p style={{ color: '#777' }}>No items added yet.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedItem(item)}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <img
                src={item.cover}
                alt="cover"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1rem' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  margin: 0,
                  color: '#222'
                }}>{item.name}</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#888',
                  marginTop: '0.5rem'
                }}>{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
    </div>
  )
}
