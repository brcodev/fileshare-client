"use client"
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import Dropzone from '@/components/Dropzone';
import useApp from '@/hooks/useApp';
import Alert from '@/components/Alert';

export default function Home() {

  const { usuarioAutenticado } = useAuth();

  const { mensaje_archivo, url  } = useApp();

  useEffect(() => {
    const token = localStorage.getItem('fs_token')

    if(token){
      usuarioAutenticado()
    }

   
  }, [])


  return (
    
    <div className="md:w-4/5 xl:w-2/3 2xl:w-3/5 mx-auto mb-auto pb-10 ">
      { url ? (

      
        <>
        <p className='text-center text-2xl mt-10'>
           <span className='font-bold text-red-700 text-3xl uppercase' text-4xl> Tu URL para compartir es: </span>
          {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/link/${url}`}
        </p>
        <button
          type='button'
          className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10'
          onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/link/${url}`)}
        >
          Copiar Enlace
        </button>
        </>
      )
       
      : 
      
      (
        <>

        { mensaje_archivo && <Alert /> }


        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            <Dropzone />
            
            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Comparte archivos de forma sencilla y privada.</h2> 
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">FileShare</span> es una plataforma que permite compartir archivos de forma privada, en donde el archivo es eliminado después de ser descargado mediante el link generado, de esta manera tus archivos no quedan en la nube.
                  Registrándote podrás tener la posibilidad de establecer una contraseña para poder descargar el archivo subido, como también la posibilidad de realizar más de una descarga por link creado. 
                </p>
                <Link href="/signup" className="text-red-500 font-bold text-lg hover:text-red-700"> 
                    Crea una cuenta y obtén todas las funciones.
                </Link>

            </div>
        </div>
        
        </>
      )}
  </div>
  )
}
