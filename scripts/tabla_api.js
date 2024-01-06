let url = `https://631bcd2b1b470e0e12f5a4d1.mockapi.io/api/v1/Carta`;
let pagina = 1;
let BtnEnviar = document.querySelector("#BTN-enviar").addEventListener("click", AgregarPlato);
let aplicarFiltro = document.querySelector("#enviarSelect").addEventListener("click", seleccionarFiltro);

async function cargarTabla(){
    let tabla = document.querySelector("#tablaCarta");
    tabla.innerHTML = 'Cargando...';
    
    try {
        //Agarro el JSON de mockapi
        let respuesta = await fetch(url);
        let json =  await respuesta.json();

        //Elijo y pongo el titulo de la categoria en base a la pagina en la que esta actualmente
        switch(pagina){
            case 1: Categoria = "Entradas"; break;
            case 2: Categoria = "Minutas"; break;
            case 3: Categoria = "Pastas"; break;
            case 4: Categoria = "Hamburguesas"; break;
            case 5: Categoria = "Bebidas"; break;
            case 6: Categoria = "Postres"; break;
        }
        tabla.innerHTML = `<td class=\celdaHead\ colspan='2'> ${Categoria} </td>`

        //Tomo todos los platos que pertenecen a dicha categoria
        for (const item of json) {
            if(item.categoria == Categoria){
                tabla.innerHTML += `<tr><td class="celdaTabla"> ${item.plato} </td>
                <td class="celdaTabla"> $ ${item.precio} </td>
                <td class="invisible">
                <button id="${item.id}" class="BtnModificar">Modificar</button>
                <button id="${item.id}" class="BtnEliminar">Eliminar</button>
                </td>
                </tr>`;
            }
        }

        //Añado la paginacion 
        tabla.innerHTML += `
        <tfoot>
        <tr>
        <td class="invisible">
        <button class="btnPaginacion" id="anterior">Anterior</button>
        </td>
        <td class="invisible">
        <button class="btnPaginacion" id="siguiente">Siguiente</button>
        </td>
        </tr>
        </tfoot>`;
        let BtnSiguiente = document.querySelector("#siguiente").addEventListener("click", function(){
            if(pagina < 6){
                pagina = pagina + 1;
                cargarTabla();
            }
        });
        let BtnAnterior = document.querySelector("#anterior").addEventListener("click", function(){
            if(pagina > 1){
                pagina = pagina-1;
                cargarTabla();
            } 
        });

    }catch (error) {
        console.log(error);
    }

    //Añado la funcionalidad de los botones que fueron creados para cada item
    let BtnEliminar = document.querySelectorAll(".BtnEliminar");
    BtnEliminar.forEach(e => e.addEventListener("click", eliminarPlato));
    let BtnModificar = document.querySelectorAll(".BtnModificar");
    BtnModificar.forEach(e => e.addEventListener("click", modificarPlato));
}

cargarTabla();

async function AgregarPlato(e){
    e.preventDefault();
    let tabla = document.querySelector("#tablaCarta");
    tabla.innerHTML = 'Cargando...';
    let form = document.querySelector("#form");
    let formData = new FormData(form);

    //Pongo los datos del form en variables distintas
    let plato = formData.get('Plato');
    let precio = formData.get('Precio');
    let cant = formData.get('Cantidad');
    let categoria = formData.get('Categoria');

    //Chequeo no estar cargando vacio
    if ((plato != "") && (precio != "")){
    
        //JSON para almacenar los datos del form
        let menu = {
            "plato" : plato,
            "precio" : precio,
            "categoria": categoria
        }    
        // Hago el POST del objeto
        for(i = 0; i < cant; i++){
            try {
                let res = await fetch(url, {
                    "method" : "POST",
                    "headers" : {"Content-type" : "application/json"},
                    "body" : JSON.stringify(menu)
                });
            if(res.status == 201){
                cargarTabla();
            }

            } catch (error) {
                console.log(error);
            }
        }

    }else cargarTabla();
}
    
async function eliminarPlato(){
    try {
        let respuesta = await fetch(`${url}/${this.id}`, {
            "method" : "DELETE",
        })
        if(respuesta.status == 200){
            cargarTabla();
        }
    } 
    catch (error) {
        console.log(error);
    }
}

async function modificarPlato(){
    let form = document.querySelector("#form");
    let formData = new FormData(form);

    //Pongo los datos del form en variables distintas
    let plato = formData.get('Plato');
    let precio = formData.get('Precio');

    //JSON para almacenar los datos del form
    let menu = {
        "plato": plato,
        "precio": precio,
    }

    //Piso el elemento con los nuevos datos
    try {
        let enviar = await fetch(`${url}/${this.id}`, {
            "method" : "PUT",
            "headers" : {"Content-type" : "application/json"},
            "body" : JSON.stringify(menu)
        })
        if(enviar.status === 200){
            cargarTabla();
        }
    } 
    catch (error) {
        console.log(error);
    }

}

//Invoca a la funcion dependiendo el filtro elegido por el usuario
function seleccionarFiltro(){
    let form = document.querySelector("#form");
    let formData = new FormData(form);

    let filtro = formData.get("filtros")
    if(filtro == "Menor"){
        ObtenerMenor();
    }
    if(filtro == "Mayor"){
        ObtenerMayor();
    }
    if(filtro == "Ninguno"){
        cargarTabla();
    }
    }

async function ObtenerMenor(){
    let tabla = document.querySelector("#tablaCarta");
    tabla.innerHTML = 'Cargando...';

    try {
        let respuesta = await fetch(url);
        let json =  await respuesta.json();

        //Elijo y pongo el titulo de la categoria en base a la pagina
        switch(pagina){
            case 1: Categoria = "Entradas"; break;
            case 2: Categoria = "Minutas"; break;
            case 3: Categoria = "Pastas"; break;
        }
        tabla.innerHTML = `<td class=\celdaHead\ colspan='2'> ${Categoria} </td>`

        //Cargo todos los platos que pertenecen a dicha categoria y estan en el rango de precio
        for (const item of json) {
            if((item.categoria == Categoria) && (item.precio < 1000)){
                tabla.innerHTML += `<tr><td class="celdaTabla"> ${item.plato} </td>
                <td class="celdaTabla"> $ ${item.precio} </td>
                <td class="invisible">
                <button id="${item.id}" class="BtnModificar">Modificar</button>
                <button id="${item.id}" class="BtnEliminar">Eliminar</button>
                </td>
                </tr>`;
            }
        }

        //Inserto los botones de paginacion y les añado el eventListener para paginar con el filtro aplicado
        tabla.innerHTML += `
                        <tfoot>
                            <tr>
                                <td class="invisible"></td>
                                <td class="invisible">
                                    <button class="btnPaginacion" id="anterior">Anterior</button>
                                    <button class="btnPaginacion" id="siguiente">Siguiente</button>
                                </td>
                            </tr>
                        </tfoot>`
        let BtnSiguiente = document.querySelector("#siguiente").addEventListener("click", function(){
            pagina ++;
            ObtenerMenor();
        });
        let BtnAnterior = document.querySelector("#anterior").addEventListener("click", function(){
            if(pagina > 1){
                pagina = pagina-1;
                ObtenerMenor();
            } 
        });

    }
    catch (error) {
        console.log(error);
    }
}

async function ObtenerMayor(){
    let tabla = document.querySelector("#tablaCarta");
    tabla.innerHTML = 'Cargando...';

    try {
        let respuesta = await fetch(url);
        let json =  await respuesta.json();

        //Elijo y pongo el titulo de la categoria en base a la pagina
        switch(pagina){
            case 1: Categoria = "Entradas"; break;
            case 2: Categoria = "Minutas"; break;
            case 3: Categoria = "Pastas"; break;
        }
        tabla.innerHTML = `<td class=\celdaHead\ colspan='2'> ${Categoria} </td>`

        //Cargo todos los platos que pertenecen a dicha categoria y estan en el rango de precio
        for (const item of json) {
            if((item.categoria == Categoria) && (item.precio >= 1000)){
                tabla.innerHTML += `<tr><td class="celdaTabla"> ${item.plato} </td>
                <td class="celdaTabla"> $ ${item.precio} </td>
                <td class="invisible">
                <button id="${item.id}" class="BtnModificar">Modificar</button>
                <button id="${item.id}" class="BtnEliminar">Eliminar</button>
                </td>
                </tr>`;
            }
        }

        //Inserto los botones de paginacion y les añado el eventListener para paginar con el filtro aplicado
        tabla.innerHTML += `
                        <tfoot>
                            <tr>
                                <td class="invisible"></td>
                                <td class="invisible">
                                    <button class="btnPaginacion" id="anterior">Anterior</button>
                                    <button class="btnPaginacion" id="siguiente">Siguiente</button>
                                </td>
                            </tr>
                        </tfoot>`
        let BtnSiguiente = document.querySelector("#siguiente").addEventListener("click", function(){
            pagina ++;
            ObtenerMayor();
        });
        let BtnAnterior = document.querySelector("#anterior").addEventListener("click", function(){
            if(pagina > 1){
                pagina = pagina-1;
                ObtenerMayor();
            } 
        });
        
    }
    catch (error) {
        console.log(error);
    }
}
