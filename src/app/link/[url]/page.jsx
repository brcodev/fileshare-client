"use client";

import Alert from "@/components/Alert";
import clienteAxios from "@/config/axios"
import useApp from "@/hooks/useApp";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import useSWR from "swr";

//const fetcher = (...args) => fetch(...args).then((res) => res.json())


const LinkPage = ({ params }) => {

  const { url } = params;

  const [dataLoading, setDataLoading] = useState(true);
  const [tienePassword, setTienePassword] = useState(true);
  const [passwordVerify, setPasswordVerify] = useState()
  const { getData, data_pass, data_url, mostrarAlerta, mensaje_archivo, url_link } = useApp();


  const [archivo, setArchivo] = useState();


  useEffect(() => {

    getData(params);
    setTienePassword(data_pass);
    setArchivo(data_url)
    

    setTimeout(() => {
      setDataLoading(false);
    }, 1500);


  }, [data_pass])



  if (!url_link && !dataLoading) {
    return (
      <div className="flex items-center justify-center h-full ">
      <h1 className="text-2xl text-center text-gray-700 mt-60">El link no existe o ha caducado.</h1>
    </div>
    

    )
  }


  if (dataLoading) {
    return (
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>

    )
  }

  

  const verificarPassword = async (e, url) => {
    e.preventDefault();
    const dataPass = {
      passwordVerify
    }

    setDataLoading(true);

    try {
      const respuesta = await clienteAxios.post(`/api/links/${url}`, dataPass);
      setTienePassword(respuesta.data.password);
      setArchivo(respuesta.data.archivo);
      if(!archivo){
        setDataLoading(false);
      }
    } catch (error) {
      mostrarAlerta(error.response.data.msg);
      setDataLoading(false);
    }

  }

  console.log(passwordVerify);
  console.log(url);


  return (
    <>

      {

        tienePassword ? (


          <>
            <p className="text-center">Este enlace esta protegido con contraseña.</p>

            

            <div className="flex justify-center mt-5">
              <div className="w-full max-w-lg">
                <form
                  className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={e => verificarPassword(e, url)}
                >
                  <div className="mb-4">
                    <label
                      className="block text-black text-sm font-bold mb-2"
                      htmlFor="password"
                    >Contraseña</label>
                    <input
                      required
                      type="password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      placeholder="Contraseña del enlace"
                      value={passwordVerify}
                      onChange={e => setPasswordVerify(e.target.value)}
                    />
                  </div>

                  <input
                    type="submit"
                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                    value="Validar Contraseña..."
                  />
                </form>
                {mensaje_archivo && <Alert />}
              </div>
            </div>
            
          </>
        ) :

          (
            <>

              <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
              <div className="flex items-center justify-center mt-10">
                <Link
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/files/${archivo || data_url}`}
                  className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'
                  download

                >Aquí</Link>
              </div>
            </>
          )

      }

    </>

  )

}

export default LinkPage