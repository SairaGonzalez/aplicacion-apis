// API 1: WIKIMEDIA

// Buscar el ID en HTML
const tablaWikimedia = document.getElementById("tabla-wikimedia");

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
    // Crear arreglo para seleccionar los datos
    const informacion = [
      {
        nombre: "Pais",
        valor: datos.title,
      },
      {
        nombre: "Descripción",
        valor: datos.description,
      },
      {
        nombre: "Resumen",
        valor: datos.extract,
      },
    ];

    // Recorrer los datos del arreglo
    informacion.forEach(function (dato) {
      // Crear la fila para la tabla
      const fila = document.createElement("tr");

      // Crear las celdas de la fila
      fila.innerHTML = `
        <td>${dato.nombre}</td>
        <td>${dato.valor}</td>
      `;

      // Agregar la fila a la tabla
      tablaWikimedia.appendChild(fila);
    });
  })
  .catch((error) => {
    // Finalmente, se verifican errores y aparece un mensaje indicando el error
    tablaWikimedia.textContent = "Ocurrió un error: " + error.message;
  });

// API 2:  OPEN METEO

// Buscar el id de la tabla en HTML
const tablaClima = document.getElementById("tabla-clima");

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
    // Recorrer datos diarios
    for (let i = 0; i < datos.daily.time.length; i++) {
      // Crear una fila
      const fila = document.createElement("tr");

      // Crear las celdas
      fila.innerHTML = `
        <td>${datos.daily.time[i]}</td>
        <td>${datos.daily.temperature_2m_max[i]} °C</td>
        <td>${datos.daily.temperature_2m_min[i]} °C</td>
        <td>${datos.daily.precipitation_probability_max[i]}%</td>
      `;

      // Agregar las filas a la tabla
      tablaClima.appendChild(fila);
    }
  })
  .catch((error) => {
    // Verificación de errores
    tablaClima.textContent = "Ocurrió un error: " + error.message;
  });

// API 3: FRANKFURTER

// Buscar el id de HTML
const tablaMoneda = document.getElementById("tabla-moneda");

// Hacer la petición
fetch("https://api.frankfurter.dev/v2/rates?base=EUR&quotes=MXN,USD,GBP,JPY")
  .then((respuesta) => {
    // Verificar la respuesta
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener información de Frankfurter");
    }

    // Regresar la respuesta en JSON
    return respuesta.json();
  })
  .then((datos) => {
    // Recorrer los datos
    datos.forEach(function (moneda) {
      // Crear fila
      const fila = document.createElement("tr");

      // Crear celdas
      fila.innerHTML = `
        <td>${moneda.base}</td>
        <td>${moneda.quote}</td>
        <td>${moneda.rate}</td>
      `;

      // Agregar fila a la tabla
      tablaMoneda.appendChild(fila);
    });
  })
  .catch((error) => {
    tablaMoneda.textContent = "Ocurrió un error: " + error.message;
  });
