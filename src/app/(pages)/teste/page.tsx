import React from "react";


export default function Teste() {
  return (
    <div className="w-full h-full flex flex-row bg-white overflow-x-none overflow-y-none">
    <div className="w-[45vw] h-full flex items-start justify-center flex-col p-20">
    <h1 className="text-blue-700 font-sans font-normal tracking-widest text-5xl mb-7 ">ERRO 404</h1>
    <div className="flex justify-center gap-5 mb-5">
                    <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
                    <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
                    <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
                    <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
                    <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
                    </div>
                   <h2 className="mb-7 mt-7 text-justify tracking-widest font-sans text-2xl">A página que você está tentando acessar não existe ou foi movida.</h2>
                   <a href="/" className=" w-[200px] h-[35px] flex items-center justify-center bg-blue-600 text-white no-underline rounded-md text-base mt-7 hover:bg-blue-800">Voltar à homepage</a>
                   <div className="absolute top-0 right-0 w-36 h-36 overflow-visible box-border">
                    <div className="absolute w-36 h-36 bg-blue-700 rounded-[50%] top-[-70px] right-[-60px]"></div>
                    <div className="absolute w-20 h-20 bg-blue-950 rounded-tl-[75px] top-[30px] right-[40px] rotate-[-90deg]"></div>
                  </div>
    </div> {/*end lado esquerdo*/}
    {/* <div class="w-[55vw] h-full flex items-center justify-center"> */}
      <img className="w-[80%]" src="Erro 404.png" alt="" width={838} height={538}/>
    </div> 

  )
}
