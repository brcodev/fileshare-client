"use client"

import useApp from "@/hooks/useApp";
import useAuth from "@/hooks/useAuth";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Header = () => {

    const router = useRouter();

    const { usuarioAutenticado, autenticado ,usuario, cerrarSesion } = useAuth();
    
    const { limpiarState } = useApp();

    useEffect(() => {
        usuarioAutenticado()
    }, [])

    const redireccionar = () => {
        router.push('/');
        limpiarState()
    }

    const logout = () => {
        cerrarSesion();
        router.push('/login');
    }

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">

        
            <img className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.png"
                onClick={() => redireccionar()}
            
            />
            



            <div>
                {
                    autenticado ? (
                        <div className="flex item-center">
                        <Link href={'/list'} className="px-5 py-3 rounded-lg bg-red-500  text-white font-bold uppercase mr-2">Links Activos</Link>
                        <button
                             type="button"
                             className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                             onClick={() => logout()}
                         >
                            Cerrar Sesión
                        </button>
                        </div>
                    ) : (
                        <>

                            <Link className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2" href="/login">
                                Iniciar Sesión
                            </Link>
                            <Link className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase" href="/signup">
                                Crear Cuenta
                            </Link>

                        </>
                    )


                }

            </div>
        </header>
    )
}

export default Header
