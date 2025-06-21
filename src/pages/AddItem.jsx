import React, { useState } from 'react'
import axios from 'axios'

export default function AddItem() {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [desc, setDesc] = useState('')
  const [cover, setCover] = useState(null)
  const [images, setImages] = useState([])
  const [success, setSuccess] = useState(false)

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const base64Cover = await toBase64(cover)
    const base64Images = await Promise.all([...images].map(file => toBase64(file)))

    const newItem = {
      name,
      type,
      desc,
      cover: base64Cover,
      images: base64Images
    }

    await axios.post('http://localhost:5000/items', newItem)

    setName('')
    setType('')
    setDesc('')
    setCover(null)
    setImages([])
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div style={{
      width:'100vw',
       height: '100vh',
  background: '#2A7B9B',
background: 'linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)',
  
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
    }}>
      <div style={{
    padding: '2rem',
    maxWidth: '600px',
    width: '100%',
    background: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)'
  }}>
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>Add New Item</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <input
          placeholder="Item Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{...inputStyle, color:'black'}}
        />

        <select
          value={type}
          onChange={e => setType(e.target.value)}
          required
          style={{...inputStyle,color:'black'} }
        >
          <option value="">Select Type</option>
          <option>Shirt</option>
          <option>Pant</option>
          <option>Shoes</option>
          <option>Sports Gear</option>
        </select>

        <textarea
          placeholder="Item Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' , color:'black' }}
        />

        <label style={labelStyle}>
          Cover Image:
          <input type="file" accept="image/*" onChange={e => setCover(e.target.files[0])} required />
        </label>

        <label style={labelStyle}>
          Additional Images:
          <input type="file" accept="image/*" multiple onChange={e => setImages(e.target.files)} />
        </label>

        <button type="submit" style={buttonStyle}>
          Add Item
        </button>

        {success && (
          <p style={{ color: 'green', marginTop: '1rem' }}>
            ✅ Item successfully added!
          </p>
        )}
      </form>
    </div>
    </div>
  )
}

const inputStyle = {
  padding: '0.8rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  width: '100%',
  background: '#fff'
}

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.95rem',
  color: '#555',
  gap: '0.25rem'
}

const buttonStyle = {
  padding: '0.75rem',
  fontSize: '1rem',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 0.2s ease'
}
