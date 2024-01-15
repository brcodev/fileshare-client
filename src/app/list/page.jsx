"use client";
import useAuth from "@/hooks/useAuth"
import { notFound } from "next/navigation"
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Delete from "@/components/Delete";
import { useEffect, useRef, useState } from "react";
import useApp from "@/hooks/useApp";
import useSWR from "swr";
import tokenAuth from "@/config/tokenAuth";
import clienteAxios from "@/config/axios";
import Link from "next/link";
import { UUID } from "crypto";
import { Toast } from "primereact/toast";




const ListLink = () => {

  const { getLinkList, lista } = useApp();

  const toast = useRef(null);

  const { autenticado, usuarioAutenticado, userId, token } = useAuth();


  useEffect(() => {
    if(lista.length < 1){
      getLinkList();
    }
   
  }, [])
 

  return (
    <>

      {autenticado && (

        <div className="w-full xl:w-8/12 my-5 md:mx-auto overflow-x-auto rounded-lg border border-gray-200 shadow-md ">

          { lista.length > 0 ? (

            <table className="w-full p-2 border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">Link</th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center ">Archivo</th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">Contraseña</th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">Descargas disponibles</th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">Eliminar</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                
                <ConfirmDialog />
                {lista.map((item) => (
                  <tr key={crypto.randomUUID()} className="hover:bg-gray-50">
                    <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">

                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/link/${item.url}`} className="mx-auto text-center" >
                            {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/link/${item.url}`}

                          </Link>



                        </div>

                      </div>
                    </td>


                    <td className="mx-auto py-4">
                      <div className="flex justify-end gap-4">
                        <p className="mx-auto">{item.nombre_original}</p>
                      </div>
                    </td>


                    <td className="px-10 py-4">
                      <div className="flex justify-end gap-4">
                        <p className="mx-auto">{item.password ? 'Si' : 'No'}</p>
                      </div>
                    </td>


                    <td className="px-10 py-4">
                      <div className="flex justify-end gap-4 ">
                        <p className="mx-auto">{item.descargas}</p>
                      </div>
                    </td>


                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                      <Toast ref={toast} />
                        <Delete

                          toast={toast}
                          idLink={item._id}
                          archivo={item.nombre}
                          lista={lista}

                        />
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
            ) : ( 

              <h1 className="text-4xl p-3 text-center font-semibold">No tienes links activos</h1>


             )
          }
        </div>


      )







      }
    </>

  )
}

export default ListLink