import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Addpost from './Components/Addpost';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={
          <Dashboard/> 
        }/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/addpost' element={<Addpost />}/>
        <Route path='/Signup' element={<Signup/>}/>
       </Routes>
    </div>
  );
}

export default App;
