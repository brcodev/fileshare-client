'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '@/hooks/useAuth';
import Alert from '@/components/Alert';
import { useContext, useEffect } from 'react';
import authContext from '@/context/auth/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {


  const { mensaje, iniciarSesion, autenticado, cargando } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (autenticado && !cargando) {
      router.push('/');
    }
  }, [autenticado, cargando])


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es válido')
        .required('El Email es Obligatorio'),
      password: Yup.string()
        .required('El password no puede ir vacio')
    }),
    onSubmit: valores => {
      iniciarSesion(valores)
    }
  });


  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">

      {cargando&&(

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
         
            <div className="flex justify-center mb-4">
              <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
              </div>
            </div>
            
          
        </div>
      )}

      <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Iniciar Sesión</h2>

      {mensaje && <Alert />}


      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >

            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="email"
              >Email</label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="Email del usuario"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                  <p>{formik.errors.email} </p>
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="password"
              >Password</label>
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                  <p>{formik.errors.password} </p>
                </div>
              ) : null}
            </div>
            <div className='mb-2'>
              <Link
                href={'/recovery'}
                className='font-sans text-gray-700 hover:text-gray-900 '

              >¿Olvidaste tu contraseña?</Link>

            </div>

            <input
              type="submit"
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer "
              value="Iniciar Sesión"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login