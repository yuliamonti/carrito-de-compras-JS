//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = []; //Mostrar el curso seleccionado en el carrito 

cargarEventListeners(); //mando a llamar la funcion siguiente
function cargarEventListeners (){
    //Agregar un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos de carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito desde btn
    vaciarCarritoBtn.addEventListener('click', () =>{
       articulosCarrito = []; //reseteamos arreglo
    
        limpiarHtml(); //eliminamos todo el html
    }) 
}


//Funciones
function agregarCurso(e){
    //para evitar que salte hacia arriba debito al href:#
    e.preventDefault(); 
    //cuando hagamos click en el elemento que contiene la class agregar-carrito 
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        leerDatosCurso(cursoSeleccionado); 
    }
}

//Lee el contenido del html al que le dimos click y extrae la info del curso
function leerDatosCurso (curso) {
    //console.log(curso);

    //creamos objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector ('img').src,
        titulo: curso.querySelector ('h4').textContent,
        precio: curso.querySelector ('.precio span').textContent,
        id: curso.querySelector('a').getAttribute ('data-id'),
        cantidad:1
    }
    //Revisamos si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if (existe) { //si existe actualizamos la cantidad
        const cursos = articulosCarrito.map ( curso => { //articulosCarrito es nuestro array original, Map crea un nuevo arreglo
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizada
            } else {
                return curso;//retorna el objeto que no está duplicado
            }
        });
        articulosCarrito = [...cursos];
    
        } else { //si no existe lo agregamos
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

   //Agregamos elementos al arreglo carrito
   //    console.log(articulosCarrito);

    carritoHtml(); //mandamos a llamar despues de leer los datos del curso y haberlo agregado al carrito
}
//elimina curso del carrito
function eliminarCurso(e) {

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute ('data-id');
        
        //elimina del arreglo de articuloCarrito por el data-id con filter
        articulosCarrito = articulosCarrito.filter (curso => curso.id !== cursoId);
    
        carritoHtml (); //iteramos sobre carrito y mostramos su html
    }
}
//Muestra el carrito de compras en el html
function carritoHtml () { 

    //limpiar el Html
    limpiarHtml();//primero se limpia el html

    //Recorre el carrito y genera el Html
    articulosCarrito.forEach (curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr'); //tabla <tr>
        row.innerHTML= `  
            <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </td>
             `;     //template string en que imprimimos el nombre del curso
                    //lo agregamos al <tbody>
        contenedorCarrito.appendChild(row)
    });
}

//Elimina los cursos del <tbody>
function limpiarHtml (){
    //forma lenta
    //contenedorCarrito.innerHTML = ''; //se limpia y se vuelve a iterar y agregar

    //mejor performance
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
