let tabla = [
    {
      identificacion: "1",
      nombre: "Sorlenis",
      apellido: "Jimenez",
      direccion: "Cra 8",
      ciudad: "Barranquilla",
      edad: "42",
      telefono: "3118008943",
      email: "sorlenis@gmail.com"
    },
    {
      identificacion: "2",
      nombre: "Gisella",
      apellido: "Jimenez",
      direccion: "Cra 22",
      ciudad: "Barranquilla",
      edad: "25",
      telefono: "3004142405",
      email: "gisella@gmail.com"

    },
    {
        identificacion: "3",
        nombre: "Jenaro",
        apellido: "Jimenez",
        direccion: "Cra 25",
        ciudad: "Barranquilla",
        edad: "20",
        telefono: "3014160258",
        email: "jenaroaf10@gmail.com"
      },
  ];


  var tablaUsuarios = document.getElementById("usuarios");
  
  const limpiarTabla = () => {
    tabla.map(() => {
      tablaUsuarios.deleteRow(-1);
    });
  };
  
  const ListarUsuario=()=>{
    let tbody=document.getElementById("usuarios")
    let tablallena="";
    for(let i=0;i<tabla.length;i++){
        tablallena+="<tr><td>"+tabla[i].identificacion+"</td><td>"+tabla[i].nombre+"</td><td>"+tabla[i].apellido+"</td><td>"+tabla[i].direccion+"</td><td>"+tabla[i].ciudad+"</td><td>"+tabla[i].edad+"</td><td>"+tabla[i].telefono+"</td><td>"+tabla[i].email+"</td></tr>";
    }
    tbody.innerHTML=tablallena;
}

    
  
  const seEncuentra = (id) => {
    return tabla.find((tabla) => tabla.identificacion == id) !== undefined;
  };
  
  const esNumero = (id) => {
    return !isNaN(id);
  };
  
  const esVacio = (valor) => {
    return valor === "";
  };
  
  const registrarUsuario = () => {
    console.log("registrando");
    //Obtiene los datos del form
    const identificacion = document.getElementById("identificacion").value;
    const nombre = document.getElementById("nombres").value;
    const apellido = document.getElementById("apellidos").value;
    const direccion = document.getElementById("direccion").value;
    const ciudad = document.getElementById("ciudad").value;
    const edad = document.getElementById("age").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
  
    if (
      !esVacio(identificacion) &&
      !esVacio(nombre) &&
      !esVacio(apellido) &&
      !esVacio(direccion) &&
      !esVacio(ciudad) &&
      !esVacio(edad) &&
      !esVacio(telefono) &&
      !esVacio(email) 
    ) {
      if (esNumero(identificacion)) {
        if (!seEncuentra(identificacion)) {
          //Agrega los datos del formulario a un objeto usuarios de tipo JSON
          const nuevoUsuario = {
            identificacion,
            nombre,
            apellido,
            direccion,
            ciudad,
            edad,
            telefono,
            email,
          };
  
          limpiarTabla();
  
          
          tabla.push(nuevoUsuario);
  
         
          ListarUsuario();
  
         
          success();
  
          
          eliminarAlerta();
        } else {
          
          fail();
  
         
          eliminarAlerta();
        }
      } else {
        warning("La identificación del usuario debe ser un número.");
      }
    } else {
      warning("Todos los campos del formulario son obligatorios.");
    }
  };
  
  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    event.key === "Enter" && registrarUsuario();
  });
  
  const eliminarAlerta = () => {
    
    let alertNode = document.querySelector("#messages");
  
    setTimeout(() => {
      alertNode.innerHTML = "";
    }, 4000);
  };
  
  const success = () => {
    document.getElementById("messages").innerHTML += `
              <div class="alert alert-success" role="alert" id="alert">
                  Usuario registrado correctamente.
              </div>
          `;
  };
  
  const fail = () => {
    document.getElementById("messages").innerHTML += `
              <div class="alert alert-danger role="alert" id="alert">
                      El número de identificación ingresado ya se encuentra registrado.
              </div>
          `;
  };
  
  const warning = (mensaje) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  
    Toast.fire({
      icon: "warning",
      title: mensaje,
    });
  };