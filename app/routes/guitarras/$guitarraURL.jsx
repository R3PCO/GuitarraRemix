import { useState } from 'react'
import { useLoaderData, useOutletContext} from '@remix-run/react'
import {getGuitarra} from '~/models/guitarras.server' 
//import styles from '~/styles/guitarras.css'


export async function loader({params}){
  const { guitarraURL } = params
  //console.log(guitarraURL)
  const guitarra = await getGuitarra( guitarraURL )
 // console.log(guitarra)
  
  if(guitarra.data.length === 0) {
    throw new Response('',{
      status:404,
      statusText:'Guitarra no encontrada'
    })
  }
  return guitarra
}

export function meta({data}){
  //console.log(data.data)
  if(!data){
    return {
      title:'GuitarraLa -Guitarra no encontrada',
      description:  `Guitarras- Venta de guitarras - guitarra no encontrada`

    }
  }

  return {
    title:`GuitarraLA - ${data.data[0].attributes.nombre }`,
    description: `Guitarras- Venta de guitarras  ${data.data[0].attributes.nombre }`
  }
}
/*
export function links(){
  return [
    {
        rel:'stylesheet',
        href: styles
    }
  ]
}
*/

function Guitarra() {

    //const data = useOutletContext()
    //console.log(data)

    //const {auth} = useOutletContext()
    //const data = useOutletContext()
    //const {sumar} = useOutletContext()

    //const data = useOutletContext()
    const { agregarCarrito } = useOutletContext()

    const [cantidad, setCantidad] = useState(0)
    const guitarra = useLoaderData()
    //console.log( guitarra.data[0].attributes.Imagen )
    const { nombre, descripcion, Imagen, precio} = guitarra.data[0].id[0].attributes

    //console.log( data )
   
    const handleSubmit = e =>{ 
      e.preventDefault();

      if (cantidad <1) {
        alert("Debe seleccionar una cantidad")
        return
      }

      const guitarraSeleccionada = {
        id: guitarra.data[0].id,
        imagen: Imagen.data.attributes.formats.medium.url,
        nombre,
        precio,
        cantidad
      }

      agregarCarrito(guitarraSeleccionada)

      //console.log(guitarraSeleccionada)
      //console.log(auth)
      //console.log(data)
      //sumar()
    }

  return (
    <div className='guitarra'>
      <img className='imagen' src = {Imagen.data.attributes.formats.medium.url} alt  = {`imagen de la guitarra ${nombre}`}/>
      <div className='contenido'>
        <h3> {nombre}</h3>
        <p className='texto'>{descripcion}</p>
        <p className='precio'>${precio}</p>

        <form 
           onSubmit= {handleSubmit} className='formulario'>
          <label htmlFor='cantidad'> Cantidad </label>

          <select 
            onChange={ (e) => setCantidad(parseInt(e.target.value))}        
            id ="cantidad"
          >
              <option value= "0">--Seleccione --</option>
              <option value= "1"> 1</option>
              <option value= "2"> 2</option>
              <option value= "3"> 3</option>
              <option value= "4"> 4</option>
              <option value= "5"> 5</option>
          </select>

          <input
            type="submit"
            value="Agregar al carrito"
          />

        </form>
      </div>    
    </div>
  )
}

export default Guitarra