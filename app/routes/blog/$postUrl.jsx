import { useLoaderData } from '@remix-run/react'
import {getPost} from '~/models/posts.server'
import { formatearFecha } from '~/utils/helpers'
//import styles from  '~/styles/blog.css'

export function meta({data}){
  //console.log(data.data)
  if(!data){
    return {
      title:'GuitarraLa - Entrada no encontrada',
      description:  `Guitarras- Venta de guitarras - Entrada no encontrada`

    }
  }

  return {
    title:`GuitarraLA - ${data.data[0].attributes.titulo }`,
    description: `Guitarras- Venta de guitarras, entrada  ${data.data[0].attributes.titulo }`
  }
}

/*

export function links(){

return [
 {
  rel: 'stylesheet',
  href: styles
 }

]}

*/



export async function loader({params}){
  
  const { postUrl } = params
  const post = await getPost(postUrl)
  console.log(postUrl)
  //console.log(post)
  if (post.data.length === 0) {
    throw new Response('',{
      status:404,
      statusText: 'Entrada no encontrada'

    })
  }
  return post  
}
  


export default function Post() {
  
  const post = useLoaderData()
  console.log(post)
  const {titulo, contenido, imagen , publishedAt} = post.data[0]?.attributes 
  
  return (
    //<article className='contenedor post mt-3'>
      <article className='post mt-3'>
      <img className="imagen" src={imagen?.data?.attributes?.url}
            alt= {`imagen blog ${titulo }`}/>
           
            <div className="contenido">
                <h3> {titulo}</h3>
                <p className="fecha">{ formatearFecha(publishedAt) }</p>
                <p className="texto">{ contenido }</p>
            </div>


    </article>
  )
}
