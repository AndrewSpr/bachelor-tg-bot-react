import './App.css';
import { useEffect } from 'react';
import { useTelegram } from './Hooks/Telegram';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import Admin from './components/Admin/Admin';

function App() {
  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path={'form'} element={<Form />}/>
        <Route path={'admin'} element={<Admin />}/>
      </Routes>
    </div>
  );
}

export default App;
