import './App.css';
import Login from './Pages/Login';
import {Routes,Route} from 'react-router-dom';
import Search from './Pages/Search';
import Books from './Pages/Books';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login/>} />
      

      <Route path="/search" element={<Search />} />
      <Route path="/books" element={<Books />} />
      </Routes>
        

    </div>
  );
}

export default App;
