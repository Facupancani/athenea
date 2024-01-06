let form = document.querySelector('#form');
form.addEventListener('submit', agregar);
let btnBorrar = document.querySelector("#BTN-borrar");
btnBorrar.addEventListener("click", vaciarTabla);

/*  JSON precargado con algunos platos para rellenar el menu. 
    No es necesario que los elementos esten ordenados ni separados de ninguna forma.
*/
let arrCarta = [
        {
            plato: "Papas fritas",
            precio: "700",
            categoria: "Entradas"
        },
        {
            plato: "Papas c/cheddar",
            precio: "950",
            categoria: "Entradas"
        },
        {
            plato: "Papas al verdeo",
            precio: "970",
            categoria: "Entradas"
        },
        {
            plato: "Rabas",
            precio: "850",
            categoria: "Entradas"
        },
        {
            plato: "Bastoncitos de muzzarela",
            precio: "850",
            categoria: "Entradas"
        },

        {
            plato: "Milanesa simple c/fritas",
            precio: "980",
            categoria: "Minutas"
        },
        {
            plato: "Milanesa napolitana c/fritas",
            precio: "1100",
            categoria: "Minutas"
        },
        {
            plato: "Milanesa a caballo c/fritas",
            precio: "1100",
            categoria: "Minutas"
        },
        {
            plato: "Milanesa de soja c/fritas",
            precio: "970",
            categoria: "Minutas"
        },
        {
            plato: "sorrentinos",
            precio: "1200",
            categoria: "Pastas"
        },
        {
            plato: "ravioles",
            precio: "1150",
            categoria: "Pastas"
        },
        {
            plato: "canelones",
            precio: "1300",
            categoria: "Pastas"
        },
        {
            plato: "lasagña",
            precio: "1350",
            categoria: "Pastas"
        },
];

function agregar(e){
    //Prevent default del submit para no enviar el formulario y recargar la pagina
    e.preventDefault();

    //Agarro todos los datos de el formulario
    let formData = new FormData(form);
    let plato = formData.get('Plato');
    let precio = formData.get('Precio');
    let cant = formData.get('Cantidad');
    let categoria = formData.get('Categoria');

    //JSON para almacenar los datos del form
    let menu = {
        plato: plato,
        precio: precio,
        categoria: categoria
    }
    //Inserto el nuevo objeto en el arreglo
    for (var i = 0; i < cant; i++) {
        arrCarta.push(menu);
    }
    //invoco a la funcion para recargar la tabla
    cargarTabla();
}

cargarTabla();

/* La funcion cargarTabla(), inserta los JSON de arrCarta en la tabla separandolos por categoria
    se recorre toda la estuctura tantas veces como cantidad de categorias haya.
*/
function cargarTabla(){
    let tabla = document.querySelector('#tablaCarta');
    tabla.innerHTML = '';

    for( i=0; i < 3; i++){

        //Pongo el head de cada categoria
        switch(i){
            case 0: Categoria = "Entradas"; tabla.innerHTML += "<td class=\celdaHead\ colspan='2'>" + "Entradas" + "</td>"; break;
            case 1: Categoria = "Minutas"; tabla.innerHTML += "<td class=\celdaHead\ colspan='2'>" + "Minutas" + "</td>";break;
            case 2: Categoria = "Pastas"; tabla.innerHTML += "<td class=\celdaHead\ colspan='2'>" + "Pastas" + "</td>";break;
        }

        //Inserto en la tabla todos los JSON que pertenezcan a esa categoria
        for (const item of arrCarta){
            if(item.categoria == Categoria){
                //Resalta las tablas que tienen un precio = $1000
                if(item.precio == "1000"){
                    tabla.innerHTML += `    <tr>
                                                <td class="celda-resaltada"> ${item.plato} </td>
                                                <td class="celda-resaltada"> $ ${item.precio} </td>
                                                <td class="invisible">
                                                <button class="BtnModificar">Modificar</button>
                                                </td>
                                            </tr>`;
                }else
                tabla.innerHTML += `    <tr>
                                            <td class="celdaTabla"> ${item.plato} </td>
                                            <td class="celdaTabla"> $ ${item.precio} </td>
                                            <td class="invisible">
                                            <button class="BtnModificar">Modificar</button>
                                            </td>
                                        </tr>`;
            }
        }
    } 
    //Añado el event listener de los botones que se acaban de crear
    let BtnModificar = document.querySelectorAll(".BtnModificar");
    BtnModificar.forEach(e => e.addEventListener("click", modificarPlato));
}

function modificarPlato(){
    //Accedo a la fila del boton presionado
    let fila = this.parentElement.parentElement;

    //Agarro todos los datos de el formulario
    let formData = new FormData(form);
    let plato = formData.get('Plato');
    let precio = formData.get('Precio');
    let cant = formData.get('Cantidad');
    let categoria = formData.get('Categoria');

    if((plato !="") && (precio != "")){
           
        //Inserto los datos y el boton en la tabla
        fila.innerHTML = `  <tr>
        <td class="celdaTabla"> ${plato} </td>
        <td class="celdaTabla"> $ ${precio} </td>
        <td class="invisible">
        <button class="BtnModificar">Modificar</button>
        </td>
        </tr>`;
        
        let BtnModificar = document.querySelectorAll(".BtnModificar");
        BtnModificar.forEach(e => e.addEventListener("click", modificarPlato));
    }

}

function vaciarTabla(e){
    e.preventDefault();

    let tabla = document.querySelector('#tablaCarta');
    tabla.innerHTML = '';
    arrCarta = [];
    cargarTabla();
}