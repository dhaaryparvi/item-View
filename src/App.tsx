import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AddItem from './pages/AddItem'
import ViewItems from './pages/ViewItems'

export default function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Link to="/add">Add Item</Link>
        <Link to="/view">View Items</Link>
      </nav>
      <Routes>
        <Route path="/add" element={<AddItem />} />
        <Route path="/view" element={<ViewItems />} />
      </Routes>
    </div>
  )
}
