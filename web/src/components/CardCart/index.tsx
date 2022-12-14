import { useContext, useEffect, useState } from "react";
import api from "../../api/api_product";
import { Context } from "../../Context/AuthContext";
import { useCart } from "../../hooks/useCart";

function byteToBlob(photo: string){
    const imageBytes = photo;
    let blob = new Blob([imageBytes], { type: "image/jpeg" });
    let imageUrl = URL.createObjectURL(blob);
    return imageUrl
}

interface PropsProduct {
  id: number;
  id_produto: number;
  nome: string;
  marca: string;
  preco: number;
  quantidade: number;
}

interface PropsCartItem {
  id: number,
  produto: {
    descricao: string;
    estoque: number;
    id: number;
    marca: string;
    nome: string;
    preco: number;
    precoAnterior: number;
  },
  type: {
    id: number;
    nome: string;
  },
  quantidade: number,
  valorTotalItens: number
}


export function CardCart({nome, id, marca, preco, id_produto, quantidade}:PropsProduct){
  const {use} = useContext(Context)
  const [foto, setFoto] = useState<string>();
  const [itemCarrinho, setItemCarrinho] = useState<PropsCartItem>();


  function handleUpdateCart(itemId: number){
    api.post(`/carrinho/increment/${itemId}?token=${use?.token}`,{
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
      },
  }).then((response) => {

      console.log("sucesso", response);
      api.get(`/carrinho/cartItem/${itemId}`)
      .then(response => response.data)
      .then(data => {
        setItemCarrinho(data);
      })

  }).catch((error) => {
      console.log("erro: " + error);
      return error.message
  });
}

  function handleDecrementCart(itemId: number){
      api.post(`/carrinho/decrement/${itemId}?token=${use?.token}`,{
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
        },
    }).then((response) => {

        console.log("sucesso", response);
        api.get(`/carrinho/cartItem/${itemId}`)
        .then(response => response.data)
        .then(data => {
          setItemCarrinho(data);
        })

    }).catch((error) => {
        console.log("erro: " + error);
        return error.message
    });
  }


    useEffect(() => {
      api.get(`/produto/${id_produto}/downloadPhoto`,
          { responseType: 'arraybuffer' })
            .then(response => response.data)
            .then(data => {
              const imageUrl = byteToBlob(data);
              setFoto(imageUrl);
            })
    }, [])

    useEffect(() => {
      api.get(`/carrinho/cartItem/${id}`)
        .then(response => response.data)
        .then(data => {
          console.log("data " + data)
          setItemCarrinho(data);
        })
    }, [])


    const {formatMoney, handleRemoveCart} = useCart()
    return (
        <div
          className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
        >
          <div className="flex w-2/5">
          <div className="flex items-center">
              <img
                src={foto}
                alt=""
                className=" w-[28rem]"
              />
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">
                {itemCarrinho?.produto.nome}
              </span>
              <span className="text-red-500 text-xs">{itemCarrinho?.produto.marca}</span>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <svg
              className="fill-current text-gray-600 w-3 cursor-pointer"
              viewBox="0 0 448 512"
              onClick={() => {
                handleDecrementCart(id);
              }}
            >
              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>

            <input
              className="mx-2 border text-center w-8"
              type="text"
              value={itemCarrinho?.quantidade || ""}
            />

            <svg
              className="fill-current text-gray-600 w-3 cursor-pointer"
              viewBox="0 0 448 512"
              onClick={() => {
                handleUpdateCart(id);

              }}
            >
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{formatMoney(itemCarrinho?.produto.preco)}</span>
          <span className="text-center w-1/5 font-semibold text-sm">
            {formatMoney(itemCarrinho?.valorTotalItens)}
          </span>
        </div>
      )
}