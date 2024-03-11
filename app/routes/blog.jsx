/*import {useLoaderData, Outlet} from '@remix-run/react'
import ListadoPosts from "~/components/listado-posts"
import {getPosts} from "~/models/posts.server.js"*/
import { Outlet} from '@remix-run/react'
import styles from "~/styles/blog.css"
/*
export function meta(){
  return{
    title: 'Guitarra LA - Nuestro Blog',
    description: 'GuitarraLA. Blog de Musica y venta de guirtarras'
  }

}
*/

export function links(){
  return[
    {
      rel:'stylesheet',
      href:styles
    }
  ]
}
/*
export async function loader(){
  const posts =await getPosts()
  //console.log(posts)

  return posts.data
}
*/
function Blog() {

  //const posts = useLoaderData()

  return (
    <main className="contenedor">
       <Outlet />
    </main>
  )
}

export default Blog