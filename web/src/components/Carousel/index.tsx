export function Carousel(){
    return(
        <div className=" flex justify-center items-center px-8 py-4">
            <div id="carouselExampleCaptions" className="w-4/5 max-h-[35rem] carousel slide relative overflow-hidden" data-bs-ride="carousel">
                <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                    <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                    ></button>
                    <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                    ></button>
                    <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                    ></button>
                </div>
                <div className="carousel-inner relative w-full overflow-hidden">
                    <div className="carousel-item active relative float-left w-full">
                    <img
                        src="https://www.fatosdesconhecidos.com.br/wp-content/uploads/2018/03/o-SMARTPHONE-facebook-1600x800.jpg"
                        className="block w-full h-[35rem] object-cover"
                        alt="..."
                    />
                    <div className="carousel-caption hidden md:block absolute text-center w-1/3 left-0 ml-32 top-[40%]">
                        <p className="font-bold text-2xl text-black" >Curta a sua vida em familia com as melhores promoções no Venda+ </p>
                        <button type="submit" className="bg-background-orange mt-4 w-1/3 py-2 rounded-lg text-white font-weight">Veja mais</button>
                        </div>
                    </div>
                        <div className="carousel-item relative float-left w-full">
                        <img
                            src="https://img.freepik.com/fotos-premium/familia-sorridente-sentado-no-sofa-e-apontando-para-tablet-digital_107420-39210.jpg?w=2000"
                            className="block w-full h-[35rem] object-cover"
                            alt="..."
                        />
                        <div className="carousel-caption hidden md:block absolute text-center w-1/3 left-0 ml-32 top-[40%]">
                            <p className="font-bold text-2xl text-black">Curta a sua vida em familia com as melhores promoções no Venda+ </p>
                            <button type="submit" className="bg-background-orange mt-4 w-1/3 py-2 rounded-lg text-white font-weight">Veja mais</button>
                        </div>
                    </div>
                    <div className="carousel-item relative float-left w-full">
                        <img
                            src="https://cdn.create.vista.com/api/media/medium/265127828/stock-photo-father-son-playing-video-game?token="
                            className="block w-full h-[35rem] object-cover"
                            alt="..."
                        />
                        <div className="carousel-caption hidden md:block absolute text-center w-1/3 left-0 ml-32 top-[40%]">
                            <p className="font-bold text-2xl text-black">Curta a sua vida em familia com as melhores promoções no Venda+ </p>
                            <button type="submit" className="bg-background-orange mt-4 w-1/3 py-2 rounded-lg text-white font-weight">Veja mais</button>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
        </div>
    )
}