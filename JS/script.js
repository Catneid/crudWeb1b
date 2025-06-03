//URL de la API
const API_URL = "https://retoolapi.dev/mQfaCh/data";

//funcion que manda a llamar al JSON
async function obtenerPersonas() {
    //respuesta del servidor
    const res = await fetch(API_URL); //Se hace una llamada al 
    
    //Pasamos a JSON la respuesta del servidor
    const data = await res.json(); //Esto es un JSON

    //Enviamos el JSON que nos manda la API a la funcion que crea la tabla
    MostrarDatos(data);
}

//La funcion lleva un parametro "datos que representa al JSON"
function MostrarDatos(datos){
    const tabla = document.querySelector('#tabla tbody');


    //Para inyectar codigo HTML usamos innerHTML
     tabla.innerHTML = '';

     datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.Nombre}</td>
            <td>${persona.Apelllido}</td>
            <td>${persona.Email}</td>
            <td>${persona.Edad}</td>
            <td>
                <button>Editar</button>
                <button onClick="EliminarPersona(${persona.id})">Eliminar</button>
            </td>
            </tr>
        `;
     });
}

//Lllamada inicial para que se carguen los datos que vienen del servidor
obtenerPersonas();

//Agregar un nuevo registro
const modal = document.getElementById("modal-agregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", () => {
    modal.showModal();
});

btnCerrar.addEventListener("click", () => {
    modal.close();
});

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa "submit" - Evita que el formulario se envie de golpe

    const Nombre = document.getElementById("nombre").value.trim();
    const Apelllido = document.getElementById("apellido").value.trim();
    const Email = document.getElementById("email").value.trim();
    const Edad = document.getElementById("edad").value.trim();

    //Validacion basica
    if(!Nombre || !Apelllido || !Email || !Edad){
        alert("Complete todos los campos");
        return; //Evitar que el formulario se envie
    }

    //Llamar a la API para enviar el usuario
    const respuesta = await fetch(API_URL,{
        method: "POST",
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({Nombre, Apelllido, Email, Edad})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario y cerrar el modal
        document.getElementById("frmAgregar").reset();
        
        modal.close();

        //Recargar la tabla 
        obtenerPersonas();
    }
    else{
        alert("Hubo un error al agregar");
    }
    
});

//Funcion para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente deseas eliminar el registro?");

    //Validamos si el usuario dijo que si desea borrar 
    if(confirmacion){
        await fetch (`${API_URL}/${id}`,{method: "DELETE"});
    }

    //Recargamos la tabla para ver la eliminacion
    obtenerPersonas();


}