import { useEffect, useState } from 'react'
import { client } from './client'
import './App.css'

type User = {
  id: number
  name: string
  email: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const res = await client.api.users.$get()
      if (res.ok) {
        const data = await res.json()
        setUsers(data as User[])
      }
    } catch (error) {
      console.error('Erro ao buscar usuários', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Usuários (D1 + Hono + React)</h1>

      {/* Lista */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{ 
            background: '#f4f4f4', 
            margin: '5px 0', 
            padding: '10px', 
            borderRadius: '4px',
            color: '#333'
          }}>
            <strong>{user.name}</strong> <small>({user.email})</small>
          </li>
        ))}
      </ul>
      
      {users.length === 0 && <p>Nenhum usuário encontrado.</p>}
    </div>
  )
}

export default App