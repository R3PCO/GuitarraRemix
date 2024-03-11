import { useState, useEffect  } from 'react'

import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useCatch,
  Link
}from '@remix-run/react'

import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'

export function meta(){
    return(
        {
            chartset: "utf-8",
            title:"GuitarLA - Remix",
            viewport:"width= device-width,initial-scale=1"
        }
    )
}


export function links(){
    return[
        
       {
            rel:'stylesheet',
            href:'https://necolas.github.io/normalize.css/8.0.1/normalize.css'

        },
        {
            rel:'preconnect',
            href:'https://fonts.googleapis.com'
        },
        {
            rel:'preconnect',
            href:'https://fonts.gstatic.com',
            crossOrigin:'true'
        },
        {
            rel:'stylesheet',
            href:'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,700&display=swap'
            
        }
        ,
        {   
            rel : 'StyleSheet',
            href: styles

        }
    ]
}

export default function App() {
/*
    function sumar(){
        console.log(2+2)
    }
*/
    const carritoLS = typeof window !=='undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? []: null
    /*const carritoLS = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('carrito')) */
    const [ carrito, setCarrito ] = useState(carritoLS)
    /*const carritoLS =  JSON.parse(localStorage.getItem('carrito')) 
       const [ carrito, setCarrito ] = useState(carritoLS)*/
    useEffect(() =>{
        if (typeof window !== 'undefined'){
        //console.log( "desde el useEfeect")
        localStorage.setItem('carrito',JSON.stringify(carrito))
        //console.log( "mostrando...")
        }
       /* localStorage.setItem('carrito',JSON.stringify(carrito))
        console.log( "mostrando...")*/
    }, [carrito])

    const agregarCarrito = guitarra => {
        //console.log("agregando...", guitarra )  
        //setCarrito([...carrito, guitarra ])
        if (carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            //console.log("este elemento ya existe....")
            /* iterar sobre el arreglo e identificar el elemento duplicado */
            const carritoActualizado = carrito.map(guitarraState => {
                if(guitarraState.id === guitarra.id){
                    /* Aqui reescribimos la cantidad */
                    guitarraState.cantidad = guitarra.cantidad     
                }
                return guitarraState
            })
            /* Añadir al carrito */
            setCarrito(carritoActualizado)
        } else {
            /*Registro nuevo , agregar un carrito*/

            setCarrito([...carrito,guitarra])

        }
    }

    const actualizarCantidad = guitarra =>{
        //console.log(guitarra)
        const carritoActualizado = carrito.map(guitarraState =>{
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad

            }
            return guitarraState
        })
        setCarrito(carritoActualizado)

    }
    
    const eliminarGuitarra = id =>{
        //console.log("Eliminando...", id )
        const carritoActualizado = carrito.filter( guitarraState => guitarraState.id !== id )
        setCarrito(carritoActualizado)
        // setCarrito = carrito.filter( guitarraState => guitarraState.id !== id )
    }

    return(
            //<h1> Desde App</h1>
            <Document>
                <Outlet
                    context= {{
                        //guitarLa:"GuitarLA",
                        //auth:true,
                        //sumar
                        agregarCarrito,
                        carrito,
                        actualizarCantidad, 
                        eliminarGuitarra

                    }}
                />
             </Document>
    )
}

function Document({children}){

    return(
        <html lang= "es">
            <head>
                <Meta/>
                <Links/>
             </head>
            <body>
                <Header/>
                {children}
                <Footer/>
                <Scripts/>
                <LiveReload/>
            </body>
        </html>

    )

}

/** Manejo de errores */
export function CatchBoundary(){
    const error = useCatch()  
    return (
        <Document>
            <p className='error'>{ error.status } { error.statusText}</p>
            <Link className='error-enlace' to= "/"> Tal vez desee volver a la pagina principal </Link>
                
        </Document>
            )
}

export function ErrorBoundary({error}){
    return (
        <Document>
            <p className='error'>{ error.status } { error.statusText}</p>
            <Link className='error-enlace' to= "/"> Tal vez desee volver a la pagina principal </Link>
        </Document>
    )
}