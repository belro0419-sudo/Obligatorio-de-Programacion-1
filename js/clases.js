// Ana Belen Rodriguez Berriel / N° de estudiante: 373879 -  Iván De León Lino / N° de estudiante: 330339

class Sistema {
  constructor() {
    this.influencers = [];
    this.articulos = [];
    this.ventas = [];
    // TODO: Arreglar el tema del toLowerCase() repetido
    this.proximoNumeroVenta = 1;
  }

  agregarInfluencer(nombre, mail, comision) {
    mail = mail.toLowerCase();

    let influencer = new Influencer(nombre, mail, comision);

    this.influencers.push(influencer);
  }

  agregarArticulo(codigo, descripcion, precio) {
    let articulo = new Articulo(codigo, descripcion, precio);
    this.articulos.push(articulo);
  }

  agregarVenta(articulo, influencer, cantidad, medio) {
    let venta = new Venta(
      this.proximoNumeroVenta,
      articulo,
      influencer,
      cantidad,
      medio,
    );

    this.ventas.push(venta);
    this.proximoNumeroVenta++;
  }

  eliminarVenta(numero) {
    for (let i = 0; i < this.ventas.length; i++) {
      if (this.ventas[i].numero === numero) {
        this.ventas.splice(i, 1);
        break;
      }
    }
  }

  existeMail(mail) {
    mail = mail.toLowerCase();

    let existe = false;

    for (let i = 0; i < this.influencers.length; i++) {
      if (this.influencers[i].mail === mail) {
        existe = true;
      }
    }

    return existe;
  }

  existeCodigo(codigo) {
    let existe = false;

    for (let i = 0; i < this.articulos.length; i++) {
      if (this.articulos[i].codigo.toLowerCase() === codigo.toLowerCase()) {
        existe = true;
      }
    }

    return existe;
  }

  buscarArticulo(codigo) {
    let articuloBuscado = null;

    for (let i = 0; i < this.articulos.length; i++) {
      if (this.articulos[i].codigo === codigo) {
        articuloBuscado = this.articulos[i];
      }
    }

    return articuloBuscado;
  }

  // TODO: Volver a revisar esta funcion
  buscarInfluencer(mail) {
    mail = mail.toLowerCase();

    let influencerBuscado = null;

    for (let i = 0; i < this.influencers.length; i++) {
      if (this.influencers[i].mail === mail) {
        influencerBuscado = this.influencers[i];
      }
    }

    return influencerBuscado;
  }
}

class Influencer {
  constructor(nombre, mail, comision) {
    this.nombre = nombre;
    this.mail = mail;
    this.comision = comision;
  }
}

class Articulo {
  constructor(codigo, descripcion, precio) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

class Venta {
  constructor(numero, articulo, influencer, cantidad, medio) {
    this.numero = numero;
    this.articulo = articulo;
    this.influencer = influencer;
    this.cantidad = cantidad;
    this.medio = medio;
  }

  calcularTotal() {
    return this.articulo.precio * this.cantidad;
  }

  calcularComision() {
    return (this.calcularTotal() * this.influencer.comision) / 100;
  }

  nombreMedio() {
    let medios = ['Instagram', 'YouTube', 'X', 'TikTok', 'Facebook', 'Otras'];
    return medios[this.medio - 1];
  }

  textoMedio() {
    return this.medio + ' - ' + this.nombreMedio();
  }
}
