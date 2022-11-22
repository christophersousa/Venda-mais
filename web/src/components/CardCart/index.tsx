import { useEffect, useState } from "react";
import api from "../../api/api_product";
import { useCart } from "../../hooks/useCart";



function byteToBlob(photo: string){
    const imageBytes = photo;
    let blob = new Blob([imageBytes], { type: "image/jpeg" });
    let imageUrl = URL.createObjectURL(blob);
    return imageUrl
}

interface PropsProduct {
  id: number;
  nome: string;
  marca: string;
  preco: number;
}


export function CardCart({nome, id, marca, preco}:PropsProduct){
    const [foto, setFoto] = useState<string>();
    useEffect(() => {
      api.get(`/produto/${id}/downloadPhoto`,
          { responseType: 'arraybuffer' })
            .then(response => response.data)
            .then(data => {
              const imageUrl = byteToBlob(data);
              setFoto(imageUrl);
            })
  }, [])
    console.log(id)
    const {formatMoney} = useCart()
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
                {nome}
              </span>
              <span className="text-red-500 text-xs">{marca}</span>
              <a
                className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
              >
                Remove
              </a>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <svg
              className="fill-current text-gray-600 w-3"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>

            <input
              className="mx-2 border text-center w-8"
              type="text"
              value="1"
            />

            <svg
              className="fill-current text-gray-600 w-3"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{formatMoney(preco)}</span>
          <span className="text-center w-1/5 font-semibold text-sm">
            {formatMoney(preco)}
          </span>
        </div>
      )
}