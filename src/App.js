import './App.css';
import Login from './containers/login/Login';
import Navbar from './components/navbar/Navbar';
import { HashRouter as MyRouter, Route, Redirect, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './containers/home/Home';
import Workspace from './containers/workspace/Workspace';
import Board from './containers/board/Board';
import Register from './containers/register/Register';

function App() {
  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn
    }
  });
  return (
    <div className="App">
      <MyRouter>
        <Navbar />
        <Routes>
          {!isLoggedIn && <Route exact path="/login" element={<Login />} />}
          {!isLoggedIn && <Route exact path="/register" element={<Register />} />}
          {isLoggedIn  && <Route exact path="/" element={<Home />} />}
          {isLoggedIn  && <Route exact path="/workspace/:id" element={<Workspace />} />}
          {isLoggedIn  && <Route exact path="/board/:boardId" element={<Board />} />}
        </Routes>
      </MyRouter>
    </div>
  );
}

export default App;
