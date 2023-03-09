import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import CreatePost from './pages/Create-Post/CreatePost';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
           <Route path='/' element={<Home/>  } />
           <Route path='/login' element={<Login/>  } />
           <Route path='/createpost' element={<CreatePost/>  } />
         </Routes>
      </Router>
         
    </div>
  );
}

export default App;
