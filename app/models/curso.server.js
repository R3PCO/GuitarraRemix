export async function  getCurso(){
   
    //const respuesta = await fetch(`${process.env.API_URL}/curso?populate=*`)
    const respuesta = await fetch(`${process.env.API_URL}/curso?populate=*`);
    const resultado= await respuesta.json()

    return resultado
    
   // return await respuesta.json()

}

