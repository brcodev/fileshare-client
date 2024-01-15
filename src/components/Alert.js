import useApp from "@/hooks/useApp";
import useAuth from "@/hooks/useAuth";
import { useContext } from "react";

import React from 'react'

const Alert = () => {

    const { mensaje } = useAuth();

    const { mensaje_archivo } = useApp();

    return (
        <>
            {mensaje?.ok ? (
                <div className="bg-green-600 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
                    {mensaje?.ok}
                </div>
            ) : (
                <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
                    {mensaje || mensaje_archivo}
                </div>
            )}

        </>
    )
}

export default Alert