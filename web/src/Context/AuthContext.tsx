import { createContext, useState, useEffect, ReactNode } from "react";

import useAuth from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import useProduct from "../hooks/useProduct";
interface IRouterContextProps {
  children: ReactNode;
}

interface User {
  id: number;
  nome: string;
  email: string;
  token: string;
  status: string;
}

interface PropsLoginUser {
  email: string;
  password: string;
}

interface Ficha {
  codigo: string;
  codigo_barras: string;
  Garantia: string;
}

interface PropsProduct {
  title: string;
  link: string;
  imageUrl: string;
  images2: string;
  valor_anterior: string;
  valor: string;
  descricao: string;
  ficha: Ficha;
}

interface ProposContext {
  use: User | null | undefined;
  loading: boolean;
  authenticated: boolean;
  handleLogin: (data: PropsLoginUser) => Promise<void>;
  handleLogout: () => void;
  handleProduct: (data: PropsProduct) => void;
  product: PropsProduct | undefined;
  cart: PropsProduct[];
  handleCart: (data?: PropsProduct) => void;
}

const Context = createContext({} as ProposContext);

function AuthProvider({ children }: IRouterContextProps) {
  const { authenticated, loading, handleLogin, handleLogout, use } = useAuth();

  const { product, handleProduct } = useProduct();

  const { cart, handleCart } = useCart();

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        handleLogin,
        handleLogout,
        use,
        product,
        handleProduct,
        cart,
        handleCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };