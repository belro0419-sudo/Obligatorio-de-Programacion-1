// Show Modals

// Variables
const agregarInfluencerBtn = document.querySelector(
    ".influencers__show-modal-btn",
  ),
  influencersDialog = document.querySelector(".influencers__dialog"),
  cerrarModalBtn = document.querySelector(".influencers__close-modal-btn"),
  agregarArticuloBtn = document.querySelector(".articles__show-modal-btn"),
  articuloDialog = document.querySelector(".articulo__dialog"),
  cerrarArtModalBtn = document.querySelector(".articles__close-modal-btn"),
  agregarSalesBtn = document.querySelector(".sales__show-modal-btn"),
  salesDialog = document.querySelector(".sales__dialog"),
  cerrarSalesModalBtn = document.querySelector(".sales__close-modal-btn");

// Influencer Modal
agregarInfluencerBtn.addEventListener("click", () => {
  influencersDialog.showModal();
});
cerrarModalBtn.addEventListener("click", () => {
  influencersDialog.close();
});
agregarArticuloBtn.addEventListener("click", () => {
  articuloDialog.showModal();
});
cerrarArtModalBtn.addEventListener("click", () => {
  articuloDialog.close();
});
agregarSalesBtn.addEventListener("click", () => {
  salesDialog.showModal();
});
cerrarSalesModalBtn.addEventListener("click", () => {
  salesDialog.close();
});

// TODO: Hacer que el <button class="button articles__table-button">Código ↕</button> ordene la tabla de forma ascendente a descendete y visceversa.
/* TODO: Investigar como hacer la grafica de burbujas.
- Debe representar seis valores numericos
- El equipo deberá investigar cómo generar la gráfica de burbujas de colores. Se debe mostrar una gráfica de burbujas que
represente seis valores numéricos. Cada burbuja corresponde al total de ventas de ese medio y su tamaño es proporcional al
monto representado: la burbuja asociada al valor mínimo debe tener un radio equivalente al 10 % del radio máximo,
mientras que la burbuja asociada al valor máximo debe tener el 100 % del radio máximo.
Las demás burbujas deben escalarse de forma proporcional entre esos extremos. Debe indicarse el monto de cada burbuja.
Los colores son a elección. Deben quedar alineadas.
*/
