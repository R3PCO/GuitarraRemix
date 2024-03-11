//import {  Outlet, useOutletContext } from '@remix-run/react'
import {  Outlet, useOutletContext} from '@remix-run/react'
import styles from '~/styles/guitarras.css'

export function links(){
  return [
    {
      rel:'stylesheet',
      href:styles
    }
  ]
}

function Tienda() {

  //const data = useOutletContext()

  //console.log(data)

  return (
    <main className='contenedor'>
     
      <Outlet
        context={ useOutletContext()}
      
      />
    </main>
  )
}

export default Tienda
