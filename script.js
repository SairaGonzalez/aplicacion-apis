// API 1: WIKIMEDIA

// Buscar el ID en HTML
const contenidoWikimedia = document.getElementById("info-wikimedia");

// Hacer la petición a Wikimedia con fetch
fetch("https://es.wikipedia.org/api/rest_v1/page/summary/Austria")
  .then((respuesta) => {
    // Al regresar una promesa...
    if (!respuesta.ok) {
      // Se comprueba si la respuesta es correcta
      throw new Error("No se pudo obtener información de Wikimedia");
    }

    // Si se recibió la petición correctamente, se convierten los datos a JSON
    return respuesta.json();
  })
  .then((datos) => {
    // Visualizar los datos en consola
    console.log("Datos de Wikimedia");
    console.log(JSON.stringify(datos));

    // Al convertirse los datos, se colocan en el id
    contenidoWikimedia.innerHTML = `
      <h3>${datos.title}</h3>
      <img src="${datos.thumbnail.source}" width="300">
      <p>${datos.extract}</p>
      <a href="${datos.content_urls.desktop.page}" target="_blank">Leer más</a>
    `;
  })
  .catch((error) => {
    // Finalmente, se verifican errores y aparece un mensaje indicando el error
    contenidoWikimedia.textContent = "Ocurrió un error: " + error.message;
  });

// API 2:  OPEN METEO

// Buscar el id de HTML
const contenidoClima = document.getElementById("info-clima");

// Se hace la petición con fetch
fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=48.2085&longitude=16.3721&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FVienna",
)
  .then((respuesta) => {
    // Se comprueba la respuesta
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener información de Open Meteo");
    }

    // Se convierte a JSON
    return respuesta.json();
  })
  .then((datos) => {
    // Datos en consola
    console.log("Datos de Open Meteo");
    console.log(JSON.stringify(datos));

    // Se colocan los elementos en HTML
    contenidoClima.innerHTML = `
      <p><strong>Temperatura actual: </strong>${datos.current.temperature_2m} °C</p>
      <p><strong>Temperatura máxima: </strong>${datos.daily.temperature_2m_max[0]} °C</p>
      <p><strong>Temperatura mínima: </strong>${datos.daily.temperature_2m_min[0]} °C</p>
      <p><strong>Probabilidad de lluvia: </strong>${datos.daily.precipitation_probability_max[0]}%</p>
    `;
  })
  .catch((error) => {
    // Verificación de errores
    contenidoClima.textContent = "Ocurrió un error: " + error.message;
  });

// API 3: FRANKFURTER

// Buscar el id de HTML
const contenidoMoneda = document.getElementById("moneda-aus");

// Hacer la petición
fetch("https://api.frankfurter.dev/v2/rate/EUR/MXN")
  .then((respuesta) => {
    // Verificar la respuesta
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener información de Frankfurter");
    }

    // Regresar la respuesta en JSON
    return respuesta.json();
  })
  .then((datos) => {
    // Datos en consola
    console.log("Datos de Frankfurter");
    console.log(JSON.stringify(datos));

    // Insertar respuesta en HTML
    contenidoMoneda.innerHTML = `
      <p><strong>Moneda:</strong> ${datos.base}</p>
      <p><strong>Cambio al día: </strong> 1 EUR = ${datos.rate} MXN</p>
    `;
  })
  .catch((error) => {
    contenidoMoneda.textContent = "Ocurrió un error: " + error.message;
  });

// Función para convertir moneda
function convertirMoneda(monedaOrigen, monedaDestino, cantidad) {
  const api = "https://api.frankfurter.dev";

  return fetch(`${api}/v2/rate/${monedaOrigen}/${monedaDestino}`)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo realizar la conversión");
      }

      return respuesta.json();
    })
    .then((datos) => (cantidad * datos.rate).toFixed(2));
}

// Variables del conversor de moneda
const cantidadEuros = document.getElementById("cantidad-euros");
const btnConvertir = document.getElementById("convertir");
const resultadoConversion = document.getElementById("conversion");

// Manejo de evento del botón
btnConvertir.addEventListener("click", function () {
  const euros = Number(cantidadEuros.value);
  convertirMoneda("EUR", "MXN", euros)
    .then(function (resultado) {
      resultadoConversion.textContent = euros + " EUR = " + resultado + " MXN";
    })
    .catch(function (error) {
      resultadoConversion.textContent = "Ocurrió un error: " + error.message;
    });
});

