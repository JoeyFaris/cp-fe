import React from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <ImageUpload />
      </main>
    </div>
  );
}

export default App;
