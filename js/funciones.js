// Ana Belen Rodriguez Berriel / N° de estudiante: 373879 - Iván De León Lino / N° de estudiante: 330339

let sistema = new Sistema();

let ordenInfluencersAscendente = true;
let ordenArticulosAscendente = true;

// Referencia documentos del DOM

// Mostrar Modals
const botonMostrarModalInfluencer = document.querySelector(".influencers__show-modal-btn"),
botonMostrarModalArticulo         = document.querySelector(".articles__show-modal-btn"),
botonMostrarModalVenta            = document.querySelector(".sales__show-modal-btn"),
// Dialogs
dialogoInfluencer                 = document.querySelector(".influencers__dialog"),
dialogoArticulo                   = document.querySelector(".articles__dialog"),
dialogoVenta                      = document.querySelector(".sales__dialog"),
// Cerrar Modals
botonCerrarModalInfluencer        = document.querySelector(".influencers__close-modal-btn"),
botonCerrarModalArticulo          = document.querySelector(".articles__close-modal-btn"),
botonCerrarModalVenta             = document.querySelector(".sales__close-modal-btn"),
// Agregar datos tabla 
botonAgregarInfluencer            = document.querySelector(".influencers__add-influencer-btn"),
botonAgregarArticulo              = document.querySelector(".articles__add-article-btn"),
botonAgregarVenta                 = document.querySelector(".sales__add-sale-btn"),
// Informacion influencer
inputNombreInfluencer             = document.querySelector(".influencers__name-input"),
inputMailInfluencer               = document.querySelector(".influencers__mail-input"),
inputComisionInfluencer           = document.querySelector(".influencers__commission-input"),
// Informacion articulo
 inputCodigoArticulo              = document.querySelector(".articles__code-input"),
 inputDescripcionArticulo         = document.querySelector(".articles__description-input"),
 inputPrecioArticulo              = document.querySelector(".articles__price-input"),
// Informacnion venta
selectArticuloVenta               = document.querySelector(".sales__article-select"),
selectInfluencerVenta             = document.querySelector(".sales__influencer-select"),
inputCantidadVenta                = document.querySelector(".sales__quantity-input"),
selectMedioVenta                  = document.querySelector(".sales__medium-select"),
spanNumeroVenta                   = document.querySelector(".sales__article-number"),
// Table bodies
cuerpoTablaInfluencers            = document.querySelector(".influencers__table-body"),
cuerpoTablaArticulos              = document.querySelector(".articles__table-body"),
cuerpoTablaVentas                 = document.querySelector(".sales__table-body"),
// Botones ordenar tablas 
botonOrdenarInfluencers           = document.querySelector(".influencers__table-button"),
botonOrdenarArticulos             = document.querySelector(".articles__table-button"),
//Grafica
graficoBurbujas                   = document.querySelector(".sales__bubble-chart"),
// Boton eliminar ventas
botonesEliminar = document.querySelectorAll(".sales__delete-btn");

// Control de apertura y cierre de los dialogs

const mostrarModalInfluencer = () => {
  dialogoInfluencer.showModal();
};

const cerrarModalInfluencer = () => {
  dialogoInfluencer.close();
};

const mostrarModalArticulo = () => {
  dialogoArticulo.showModal();
};

const cerrarModalArticulo = () => {
  dialogoArticulo.close();
};

const mostrarModalVenta = () => {
  if (sistema.articulos.length === 0 || sistema.influencers.length === 0) {
    alert(
      "Debe existir al menos un artículo y un influencer para registrar una venta",
    );
  } else {
    // Inicializacion del numero de ventas
    spanNumeroVenta.textContent = "Nro: " + sistema.proximoNumeroVenta;
    dialogoVenta.showModal();
  }
};

const cerrarModalVenta = () => {
  dialogoVenta.close();
};

const actualizarTodo = () => {
  actualizarSelectInfluencers();
  actualizarSelectArticulos();
  actualizarTablaInfluencers();
  actualizarTablaArticulos();
  actualizarTablaVentas();
  actualizarGraficoBurbujas();
};

// Logica influencers

const agregarInfluencer = () => {
  let nombre   = inputNombreInfluencer.value,
  mail         = inputMailInfluencer.value.toLowerCase(),
  comision     = Number(inputComisionInfluencer.value);

  if (nombre === "" || mail === "" || inputComisionInfluencer.value === "") {
    alert("Todos los campos son obligatorios");
  } else if (comision <= 0) {
    alert("La comisión debe ser mayor a 0");
  } else if (sistema.existeMail(mail)) {
    alert("Ya existe un influencer con ese mail");
  } else if (!mail.includes("@")) {
    alert("El email debe tener un @");
  } else {
    sistema.agregarInfluencer(nombre, mail, comision);

    inputNombreInfluencer.value = "";
    inputMailInfluencer.value = "";
    inputComisionInfluencer.value = "";

    actualizarTodo();
  }
};

const actualizarTablaInfluencers = () => {
  sistema.ordenarInfluencersPorNombre(ordenInfluencersAscendente);
  cuerpoTablaInfluencers.innerHTML = "";
  for (let i = 0; i < sistema.influencers.length; i++) {
    let influencer  = sistema.influencers[i],
    totalComisiones = sistema.calcularTotalComisionesInfluencer(influencer),
    etiquetas       = sistema.obtenerEtiquetasInfluencer(influencer);

    cuerpoTablaInfluencers.innerHTML += `
      <tr class="influencers__table-row">
        <td class="influencers__table-cell">${influencer.nombre}</td>
        <td class="influencers__table-cell">${influencer.mail}</td>
        <td class="influencers__table-cell">${influencer.comision}%</td>
        <td class="influencers__table-cell">$${totalComisiones}</td>
        <td class="influencers__table-cell">${etiquetas}</td>
        <td class="influencers__table-cell">
        <button type="button" class="button influencers__sales-detail-btn">
          Ventas
        </button>
        </td>
      </tr>
    `;
  }

  const botonesDetalle = document.querySelectorAll(
    ".influencers__sales-detail-btn",
  );

  for (let i = 0; i < botonesDetalle.length; i++) {
    let influencer = sistema.influencers[i];

    botonesDetalle[i].addEventListener("click", function () {
      mostrarDetalleVentasInfluencer(influencer);
    });
  }
};

const mostrarDetalleVentasInfluencer = (influencer) => {
  let ventas = sistema.obtenerVentasInfluencer(influencer);

  if (ventas.length === 0) {
    alert("El influencer " + influencer.nombre + " no tiene ventas.");
  } else {
    let mensaje = "Ventas de " + influencer.nombre + ":\n\n";

    for (let i = 0; i < ventas.length; i++) {
      let venta = ventas[i];

      mensaje +=
        "Nro " +
        venta.numero +
        " ⇥ " +
        venta.cantidad +
        " ⇥ " +
        venta.articulo.descripcion +
        " ⇥ $" +
        venta.articulo.precio +
        " c/u Total $" +
        venta.calcularTotal() +
        " ⇥ Comisión: $" +
        venta.calcularComision() +
        "\n";
    }

    alert(mensaje);
  }
};

const actualizarSelectInfluencers = () => {
  selectInfluencerVenta.innerHTML = "";

  for (let i = 0; i < sistema.influencers.length; i++) {
    let influencer = sistema.influencers[i];

    selectInfluencerVenta.innerHTML += `
      <option value="${influencer.mail}">${influencer.nombre}</option>
    `;
  }
};

// Logica articulos

const agregarArticulo = () => {
  let codigo = inputCodigoArticulo.value,
  descripcion = inputDescripcionArticulo.value,
  precio = Number(inputPrecioArticulo.value);

  if (codigo === "" || descripcion === "" || inputPrecioArticulo.value === "") {
    alert("Todos los campos son obligatorios");
  } else if (precio <= 0) {
    alert("El precio debe ser mayor a 0");
  } else if (sistema.existeCodigo(codigo)) {
    alert("Ya existe un artículo con ese código");
  } else {
    sistema.agregarArticulo(codigo, descripcion, precio);

    inputCodigoArticulo.value = "";
    inputDescripcionArticulo.value = "";
    inputPrecioArticulo.value = "";

    actualizarTodo();
  }
};

const actualizarTablaArticulos = () => {
  sistema.ordenarArticulosPorCodigo(ordenArticulosAscendente);
  cuerpoTablaArticulos.innerHTML = "";

  for (let i = 0; i < sistema.articulos.length; i++) {
    let articulo = sistema.articulos[i];
    let medalla = "";

    if (sistema.articuloMasVendido(articulo)) {
      medalla = " ⭐";
    }

    cuerpoTablaArticulos.innerHTML += `
      <tr class="articles__table-row">
        <td class="articles__table-cell">${articulo.codigo}${medalla}</td>
        <td class="articles__table-cell">${articulo.descripcion}</td>
        <td class="articles__table-cell">$${articulo.precio}</td>
      </tr>
    `;
  }
};

const actualizarSelectArticulos = () => {
  selectArticuloVenta.innerHTML = "";

  for (let i = 0; i < sistema.articulos.length; i++) {
    let articulo = sistema.articulos[i];

    selectArticuloVenta.innerHTML += `
      <option value="${articulo.codigo}">${articulo.codigo}</option>
    `;
  }
};

// Logica ventas

const agregarVenta = () => {
  let codigoArticulo = selectArticuloVenta.value,
  mailInfluencer     = selectInfluencerVenta.value,
  cantidad           = Number(inputCantidadVenta.value),
  medio              = Number(selectMedioVenta.value),
// Datos previamente requeridos
  articulo           = sistema.buscarArticulo(codigoArticulo),
  influencer         = sistema.buscarInfluencer(mailInfluencer);

  if (inputCantidadVenta.value === "") {
    alert("La cantidad es obligatoria");
  } else if (cantidad <= 0) {
    alert("La cantidad debe ser mayor a 0");
  } else {
    sistema.agregarVenta(articulo, influencer, cantidad, medio);

    inputCantidadVenta.value = "";
    spanNumeroVenta.textContent = "Nro: " + sistema.proximoNumeroVenta;

    actualizarTodo();
  }
};

const actualizarTablaVentas = () => {
  cuerpoTablaVentas.innerHTML = "";

  for (let i = 0; i < sistema.ventas.length; i++) {
    let venta = sistema.ventas[i];

    cuerpoTablaVentas.innerHTML += `
      <tr class="sales__table-row">
        <td class="sales__table-cell">${venta.numero}</td>
        <td class="sales__table-cell">${venta.articulo.codigo}</td>
        <td class="sales__table-cell">${venta.influencer.nombre}</td>
        <td class="sales__table-cell">${venta.cantidad}</td>
        <td class="sales__table-cell">${venta.textoMedio()}</td>
        <td class="sales__table-cell">
          <button class="button sales__delete-btn">
  ❌
</button>
        </td>
      </tr>
    `;
  }
};

for (let i = 0; i < botonesEliminar.length; i++) {
  let venta = sistema.ventas[i];

  botonesEliminar[i].addEventListener("click", function () {
    eliminarVenta(venta.numero);
  });
}

const eliminarVenta = (numero) => {
  let confirma = confirm("¿Eliminar la fila?");

  if (confirma) {
    sistema.eliminarVenta(numero);
    actualizarTodo();
  }
};

// Logica grafico de burbujas

const actualizarGraficoBurbujas = () => {
  if (graficoBurbujas === null) {
    return;
  }

  let nombres = ["Instagram", "YouTube", "X", "TikTok", "Facebook", "Otras"],
  clases = ["instagram", "youtube", "x", "tiktok", "facebook", "otras"],
  totales = [];

  for (let i = 1; i <= 6; i++) {
    totales.push(sistema.obtenerTotalVendidoPorMedio(i));
  }

  let maximo = 0,
  minimo = totales[0];

  for (let i = 0; i < totales.length; i++) {
    if (totales[i] > maximo) {
      maximo = totales[i];
    }

    if (totales[i] < minimo) {
      minimo = totales[i];
    }
  }

  graficoBurbujas.innerHTML = "";

  for (let i = 0; i < totales.length; i++) {
    let radio = calcularRadioBurbuja(totales[i], minimo, maximo);

    graficoBurbujas.innerHTML += `
      <div class="sales__bubble-container">
        <div
          class="sales__bubble sales__bubble--${clases[i]}"
          style="width: ${radio}rem; height: ${radio}rem;"
        >
          ${totales[i]}
        </div>
        <span>${i + 1} - ${nombres[i]}</span>
      </div>
    `;
  }
};

const calcularRadioBurbuja = (valor, minimo, maximo) => {
  let radioMinimo = 0.5,
  radioMaximo = 5;

  if (maximo === 0) {
    return radioMinimo;
  }

  if (maximo === minimo) {
    return radioMaximo;
  }

  return (
    radioMinimo +
    ((valor - minimo) * (radioMaximo - radioMinimo)) / (maximo - minimo)
  );
};

// Logica orden ascendente y descendente de tablas

const ordenarInfluencers = () => {
  ordenInfluencersAscendente = !ordenInfluencersAscendente;
  actualizarTablaInfluencers();
};

const ordenarArticulos = () => {
  ordenArticulosAscendente = !ordenArticulosAscendente;
  actualizarTablaArticulos();
};

// Event Listeners

// Mostrar modals
botonMostrarModalInfluencer.addEventListener("click", mostrarModalInfluencer);
botonMostrarModalArticulo.addEventListener("click", mostrarModalArticulo);
botonMostrarModalVenta.addEventListener("click", mostrarModalVenta);
// Cerrar modals
botonCerrarModalInfluencer.addEventListener("click", cerrarModalInfluencer);
botonCerrarModalArticulo.addEventListener("click", cerrarModalArticulo);
botonCerrarModalVenta.addEventListener("click", cerrarModalVenta);
// Agregar datos
botonAgregarInfluencer.addEventListener("click", agregarInfluencer);
botonAgregarArticulo.addEventListener("click", agregarArticulo);
botonAgregarVenta.addEventListener("click", agregarVenta);
// Ordenar tablas influencers y articulos
botonOrdenarInfluencers.addEventListener("click", ordenarInfluencers);
botonOrdenarArticulos.addEventListener("click", ordenarArticulos);

actualizarTodo();
