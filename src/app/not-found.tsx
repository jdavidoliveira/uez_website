import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <div className="overflow-x-none overflow-y-none flex h-full w-full flex-col-reverse items-center justify-center gap-10 bg-white md:flex-row md:gap-0">
        <div className="flex h-fit w-full flex-col items-center justify-center p-4 md:h-full md:w-1/2 md:items-start md:p-20">
          <h1 className="mb-7 text-5xl font-normal tracking-widest text-blue-700 ">ERRO 404</h1>
          <div className="mb-5 flex justify-center gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-5 w-5 rounded-sm bg-gray-400"></div>
            ))}
          </div>
          <h2 className="mb-7 mt-7 text-center text-2xl md:text-justify">
            A página que você está tentando acessar não existe ou foi movida.
          </h2>
          <Link
            href="/"
            className="mt-7 flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base text-white no-underline hover:bg-blue-800"
          >
            Voltar à homepage
          </Link>
          <div className="absolute right-0 top-0 box-border h-36 w-36 overflow-hidden">
            <div className="absolute right-[-60px] top-[-70px] h-36 w-36 rounded-[50%] bg-blue-700"></div>
            <div className="absolute right-[40px] top-[30px] h-20 w-20 rotate-[-90deg] rounded-tl-[75px] bg-blue-950"></div>
          </div>
        </div>
        <div className="flex h-fit w-full items-center justify-center md:h-full md:w-1/2">
          <Image
            className="w-[80%]"
            src="/images/pages/notfound/not-found.png"
            alt="Not Found"
            width={838}
            height={538}
          />
        </div>
      </div>
    </>
  )
}
