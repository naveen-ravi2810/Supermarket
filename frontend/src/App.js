import Register from './Pages/Register';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { useState } from 'react';
import ErrorPage from './Pages/ErrorPage';
import Products from './Pages/Products';
function App() {

  const [userId ,setuserId] = useState('');
  console.log(userId)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login userId={setuserId} />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard userId = {userId}/> } />
          <Route path='/products' element={<Products/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
