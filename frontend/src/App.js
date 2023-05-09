import Register from './Pages/Register';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ErrorPage from './Pages/ErrorPage';
import Products from './Pages/Products';
import New from './Pages/New';
function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard/> } />
          <Route path='/products' element={<Products/>} />
          <Route path='/new' element={<New/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
