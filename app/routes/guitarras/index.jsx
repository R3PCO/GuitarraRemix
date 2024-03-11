//import { useLoaderData, Outlet} from '@remix-run/react'
import { useLoaderData} from '@remix-run/react'
import {getGuitarras} from '~/models/guitarras.server'
//import Guitarra from '~/components/guitarra'
//import styles from '~/styles/guitarras.css'
import ListadoGuitarras from '~/components/listado-guitarras'

export function meta(){
 return {
   title: 'GuitarLA - Tienda de Guitarras',
   description: 'GuitarLA - Nuestra Coleecionde guitarras'   

 }

}

/*
export function links(){
  return [
    {
      rel:'stylesheet',
      href:styles

    }

  ]
}
*/
export async function loader(){

  //const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
  // const respuesta = await fetch(`http://localhost:1337/api/guitarras?populate=imagen`)
  //const resultado = await respuesta.json()
  
  //console.log(resultado)
  //console.log(process.env.API_URL)

  const guitarras = await getGuitarras()
  //console.log(guitarras)
  return guitarras.data
}

function Tienda() {

  const guitarras = useLoaderData()
  //console.log(guitarras)

  return (
    //<main className='contenedor'>
      <ListadoGuitarras
        guitarras ={guitarras}
      />
 
   // </main>
  )
}

export default Tienda