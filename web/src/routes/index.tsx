import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Context } from '../Context/AuthContext';
import useAuth from '../hooks/useAuth';
import { Cadastro } from '../page/Cadastro';
import { Carrinho } from '../page/Carrinho';
import {Home} from '../page/Home'
import { Login } from '../page/Login';
import { MeusPedidos } from '../page/MeusPedidos';
import { MeusProdutos } from '../page/MeusProdutos';
import { Pedidos } from '../page/Pedidos';
import { Produto } from '../page/Produto';
import { RegisterProduto } from '../page/RegisterProduto';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { loading, authenticated } = useContext(Context);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  let location = useLocation();
  console.log("Login= ",authenticated)
  if (!authenticated) {

    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export const RoutesPage = () => (
  <Routes>
    <Route path="/"  element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/cadastro" element={<Cadastro/>} />
    <Route path="/meusprodutos" element={<RequireAuth><MeusProdutos/></RequireAuth>} />
    <Route path="/pedidos" element={<RequireAuth><Pedidos/></RequireAuth>} />
    <Route path="/cadastrarprodutos" element={<RequireAuth><RegisterProduto/></RequireAuth>} />
    <Route path="/produto/:produtoId" element={<Produto/>} />
    <Route path="/carrinho" element={<RequireAuth><Carrinho/></RequireAuth>} />
    <Route path="/meuspedidos" element={<RequireAuth><MeusPedidos/></RequireAuth>} />
  </Routes>
);