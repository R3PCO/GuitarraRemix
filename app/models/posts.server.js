export async function getPosts(url){

    const respuesta = await fetch(`${process.env.API_URL}/posts?populate=*`);
    const resultado = await respuesta.json()

    return resultado
}

export async function getPost(url){
    
    const respuesta = await fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=*`)
    const resultado = await respuesta.json()
    
    //console.log(resultado)
    return resultado
}