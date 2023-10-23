
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    // console.log(name, email)
    const user = { name, email }
    console.log(user)
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser)
        form.reset();
    })
  }

  return (
    <div>
      <h2>Number of users: {users.length}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='name' name='name' />
        <input type="text" placeholder='email' name='email' />
        <input type="submit" value="Add User" />
      </form>
      {
        users.map((user, index) => <div
          key={index}>
          <p>Id: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>)
      }
    </div>
  )
}

export default App
