import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/login/Login';
import Auth from './auth/Auth';
import ProtectedRoute from './util/ProtectedRoute';
import Home from './portal/home/Home';
import Product from './portal/product/Product';
import AddProduct from './portal/product/AddProduct';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      
      <BrowserRouter>
        <Routes>
          <Route path='auth' element={<Auth />}>
            <Route path='login' element={<Login />} />
          </Route>

          <Route path='/' element={<App />}>
            <Route path='' element={ 
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='/products' element={ 
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route path='/products/new' element={ 
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='*' element={<h1>404! Invalid URL</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
);
