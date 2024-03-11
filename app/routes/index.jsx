import { useLoaderData} from '@remix-run/react'

import {getGuitarras} from '~/models/guitarras.server'
import { getPosts } from '~/models/posts.server'
import { getCurso } from '~/models/curso.server'


import ListadoGuitarras from '~/components/listado-guitarras'
import ListadoPosts from '~/components/listado-posts'
import Curso from  '~/components/curso'

import stylesGuitarras from '~/styles/guitarras.css'
import stylesPosts from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'


export function meta(){



}

export function links(){
  return[
    {
      rel:'stylesheet',
      href:stylesGuitarras

    },
    {
      rel:'stylesheet',
      href:stylesPosts
    },

    {
      rel:'stylesheet',
      href:stylesCurso
    }
  ]


}

export async function loader(){

  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()

  ])
  //console.log(curso)
  //console.log(guitarras)
  //console.log(posts)

  /*const guitarras = await getGuitarras()
  console.log( guitarras)

  const posts = await getPosts()
  console.log( posts)
*/

//const data = {guitarras, posts }
  return {
    guitarras: guitarras.data,
    posts: posts.data,
      //data
    curso : curso.data
  }
}

function Index() {

  //const datos = useLoaderData()
  
  //console.log(datos)

  const { guitarras, posts, curso } = useLoaderData()

  //console.log(guitarras)
  //console.log(posts)

  return (
    <>
      <main className='contenedor'>
        <ListadoGuitarras
          guitarras= {guitarras}
        />        
      </main>
      <Curso
      
      curso = { curso.attributes}
      
      />
      
      <section className='contenedor'>
        <ListadoPosts
          posts = {posts}     
        />
      </section>
    </>
  )
}

export default Index
