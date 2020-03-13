import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "react-datepicker/dist/react-datepicker.css";
import UserPage from './UsersPage';
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <UserPage/>
      </header>
    </div>
  );
}

export default App;
