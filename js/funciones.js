// Ana Belen Rodriguez Berriel / N° de estudiante: 373879 - Iván De León Lino / N° de estudiante: 330339

let sistema = new Sistema();

const showInfluencerModalBtn = document.querySelector(".influencers__show-modal-btn");
const showArticleModalBtn = document.querySelector(".articles__show-modal-btn");
const showSaleModalBtn = document.querySelector(".sales__show-modal-btn");

const influencerDialog = document.querySelector(".influencers__dialog");
const articleDialog = document.querySelector(".articles__dialog");
const saleDialog = document.querySelector(".sales__dialog");

const closeInfluencerModalBtn = document.querySelector(".influencers__close-modal-btn");
const closeArticleModalBtn = document.querySelector(".articles__close-modal-btn");
const closeSaleModalBtn = document.querySelector(".sales__close-modal-btn");

const addInfluencerBtn = document.querySelector(".influencers__add-influencer-btn");
const addArticleBtn = document.querySelector(".articles__add-article-btn");
const addSaleBtn = document.querySelector(".sales__add-sale-btn");

const influencerNameInput = document.querySelector(".influencers__name-input");
const influencerMailInput = document.querySelector(".influencers__mail-input");
const influencerCommissionInput = document.querySelector(".influencers__commission-input");

const articleCodeInput = document.querySelector(".articles__code-input");
const articleDescriptionInput = document.querySelector(".articles__description-input");
const articlePriceInput = document.querySelector(".articles__price-input");

const saleArticleSelect = document.querySelector(".sales__article-select");
const saleInfluencerSelect = document.querySelector(".sales__influencer-select");
const saleQuantityInput = document.querySelector(".sales__quantity-input");
const saleMediumSelect = document.querySelector(".sales__medium-select");
const saleNumberSpan = document.querySelector(".sales__article-number");

const influencersTableBody = document.querySelector(".influencers__table-body");
const articlesTableBody = document.querySelector(".articles__table-body");
const salesTableBody = document.querySelector(".sales__table-body");

const mostrarModalInfluencer = () => {
  influencerDialog.showModal();
};

const cerrarModalInfluencer = () => {
  influencerDialog.close();
};

const mostrarModalArticulo = () => {
  articleDialog.showModal();
};

const cerrarModalArticulo = () => {
  articleDialog.close();
};

const mostrarModalVenta = () => {
  if (sistema.articulos.length === 0 || sistema.influencers.length === 0) {
    alert("Debe existir al menos un artículo y un influencer para registrar una venta");
  } else {
    saleNumberSpan.textContent = "Nro: " + sistema.proximoNumeroVenta;
    saleDialog.showModal();
  }
};

const cerrarModalVenta = () => {
  saleDialog.close();
};

const agregarInfluencer = () => {
  let nombre = influencerNameInput.value;
  let mail = influencerMailInput.value;
  let comision = Number(influencerCommissionInput.value);

  if (nombre === "" || mail === "" || comision === 0) {
    alert("Todos los campos son obligatorios");
  } else if (sistema.existeMail(mail)) {
    alert("Ya existe un influencer con ese mail");
  } else {
    sistema.agregarInfluencer(nombre, mail, comision);

    influencerNameInput.value = "";
    influencerMailInput.value = "";
    influencerCommissionInput.value = "";

    actualizarTablaInfluencers();
    actualizarSelectInfluencers();
  }
};

const actualizarTablaInfluencers = () => {
  influencersTableBody.innerHTML = "";

  for (let i = 0; i < sistema.influencers.length; i++) {
    let influencer = sistema.influencers[i];

    influencersTableBody.innerHTML += `
      <tr>
        <td>${influencer.nombre}</td>
        <td>${influencer.mail}</td>
        <td>${influencer.comision}%</td>
        <td>$0</td>
        <td></td>
        <td><button type="button">Ventas</button></td>
      </tr>
    `;
  }
};

const actualizarSelectInfluencers = () => {
  saleInfluencerSelect.innerHTML = "";

  for (let i = 0; i < sistema.influencers.length; i++) {
    let influencer = sistema.influencers[i];

    saleInfluencerSelect.innerHTML += `
      <option value="${influencer.mail}">${influencer.nombre}</option>
    `;
  }
};

const agregarArticulo = () => {
  let codigo = articleCodeInput.value;
  let descripcion = articleDescriptionInput.value;
  let precio = Number(articlePriceInput.value);

  if (codigo === "" || descripcion === "" || precio === 0) {
    alert("Todos los campos son obligatorios");
  } else if (sistema.existeCodigo(codigo)) {
    alert("Ya existe un artículo con ese código");
  } else {
    sistema.agregarArticulo(codigo, descripcion, precio);

    articleCodeInput.value = "";
    articleDescriptionInput.value = "";
    articlePriceInput.value = "";

    actualizarTablaArticulos();
    actualizarSelectArticulos();
  }
};

const actualizarTablaArticulos = () => {
  articlesTableBody.innerHTML = "";

  for (let i = 0; i < sistema.articulos.length; i++) {
    let articulo = sistema.articulos[i];

    articlesTableBody.innerHTML += `
      <tr>
        <td>${articulo.codigo}</td>
        <td>${articulo.descripcion}</td>
        <td>$${articulo.precio}</td>
      </tr>
    `;
  }
};

const actualizarSelectArticulos = () => {
  saleArticleSelect.innerHTML = "";

  for (let i = 0; i < sistema.articulos.length; i++) {
    let articulo = sistema.articulos[i];

    saleArticleSelect.innerHTML += `
      <option value="${articulo.codigo}">${articulo.codigo}</option>
    `;
  }
};

const agregarVenta = () => {
  let codigoArticulo = saleArticleSelect.value;
  let mailInfluencer = saleInfluencerSelect.value;
  let cantidad = Number(saleQuantityInput.value);
  let medio = Number(saleMediumSelect.value);

  let articulo = sistema.buscarArticulo(codigoArticulo);
  let influencer = sistema.buscarInfluencer(mailInfluencer);

  if (cantidad === 0) {
    alert("La cantidad es obligatoria");
  } else {
    sistema.agregarVenta(articulo, influencer, cantidad, medio);

    saleQuantityInput.value = "";

    actualizarTablaVentas();
  }
};

const actualizarTablaVentas = () => {
  salesTableBody.innerHTML = "";

  for (let i = 0; i < sistema.ventas.length; i++) {
    let venta = sistema.ventas[i];

    salesTableBody.innerHTML += `
      <tr>
        <td>${venta.numero}</td>
        <td>${venta.articulo.codigo}</td>
        <td>${venta.influencer.nombre}</td>
        <td>${venta.cantidad}</td>
        <td>${venta.textoMedio()}</td>
        <td><button type="button">Eliminar</button></td>
      </tr>
    `;
  }
};

showInfluencerModalBtn.addEventListener("click", mostrarModalInfluencer);
showArticleModalBtn.addEventListener("click", mostrarModalArticulo);
showSaleModalBtn.addEventListener("click", mostrarModalVenta);

closeInfluencerModalBtn.addEventListener("click", cerrarModalInfluencer);
closeArticleModalBtn.addEventListener("click", cerrarModalArticulo);
closeSaleModalBtn.addEventListener("click", cerrarModalVenta);

addInfluencerBtn.addEventListener("click", agregarInfluencer);
addArticleBtn.addEventListener("click", agregarArticulo);
addSaleBtn.addEventListener("click", agregarVenta);