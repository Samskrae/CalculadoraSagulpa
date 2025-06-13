const datosTarifaPantalla = {
    1: {
        name: "Elder",
        rates: [
            { 
                dayGroup: "Lunes a Viernes:",
                subRates: [
                    { time: "06:00 - 15:59", price: "2.05 €/hora" },
                    { time: "16:00 - 05:59", price: "1.00 €/hora" }
                ]
            },
            { 
                dayGroup: "Sábados, Domingos y Festivos:",
                subRates: [
                    { time: "00:00 - 23:59",price: "1.00 €/hora" }
                ]
            }
        ],
        notes: ""
    },
    2: {
        name: "Intermodal Del Rincón",
        rates: [
            { 
                dayGroup: "Estancias:", 
                subRates: [
                    {time: "< 3 horas", price: "0.50 €/hora"},
                    {time: "> 3 horas", price: "3.00 € (Cada 24 horas)"}
                ] 
            }
        ],
        notes: ""
    },
    3: {
        name: "Mercado de Vegueta",
        rates: [
            {
                dayGroup: "Lunes a Viernes:",
                subRates: [
                    { time: "08:00 - 18:59", price: "2.05 €/hora" },
                    { time: "00:00 - 07:59", price: "1.00 €/hora" },
                    { time: "19:00 - 23:59", price: "1.00 €/hora" }
                ]
            },
            {
                dayGroup: "Sábados:",
                subRates: [
                    { time: "00:00 - 07:59", price: "1.00 €/hora" },
                    { time: "08:00 - 13:29", price: "2.05 €/hora" },
                    { time: "13:30 - 23:59", price: "1.50 €/hora" }
                ]
            },
            {
                dayGroup: "Domingos y Festivos:",
                subRates: [
                    { time: "00:00 - 07:59", price: "1.50 €/hora" },
                    { time: "08:00 - 23:59", price: "1.00 €/hora" }
                ]
            }
        ],
        notes: ""
    },
    4: {
        name: "Metropol",
        rates: [
            {
                dayGroup: "Lunes a Viernes:",
                subRates: [
                    { time: "07:00 - 15:59", price: "1.85 €/hora" },
                    { time: "16:00 - 06:59", price: "0.50 €/hora" }
                ]
            },
            {
                dayGroup: "Sábados, Domingos y Festivos:",
                subRates: [
                    { time: "00:00 - 23:59",price: "0.50 €/hora" }
                ]
            }
        ],
        notes: "Límite diario: 24.15 €. Tarifas por minuto.",
        dailyLimit: 24.15
    },
    5: {
        name: "Nuevos Juzgados",
        rates: [
            {
                dayGroup: "Lunes a Viernes:",
                subRates: [
                    { time: "07:30 - 15:29", price: "1.86 €/hora" },
                    { time: "15:30 - 07:29", price: "0.50 €/hora" }
                ]
            },
            {
                dayGroup: "Sábados, Domingos y Festivos:",
                subRates: [
                    { time: "00:00 - 23:59",price: "0.50 €/hora" }
                ]
            }
        ],
        notes: ""
    },
    6: {
        name: "San Bernardo",
        rates: [
            {
                dayGroup: "Lunes a Viernes:",
                subRates: [
                    { time: "06:00 - 19:59", price: "1.86 €/hora" },
                    { time: "20:00 - 05:59", price: "1.00 €/hora" }
                ]
            },
            {
                dayGroup: "Sábados, Domingos y Festivos:",
                subRates: [
                    { time: "00:00 - 23:59",price: "1.00 €/hora" }
                ]
            }
        ],
        notes: ""
    },
    7: {
        name: "Subida De Mata",
        rates: [
            {
                dayGroup: "Lunes a Viernes:",
                subRates: [
                    { time: "06:00 - 15:59", price: "1.85 €/hora" },
                    { time: "16:00 - 05:59", price: "0.50 €/hora" }
                ]
            },
            {
                dayGroup: "Sábados, Domingos y Festivos:",
                subRates: [
                    { time: "00:00-23:59",price: "0.50 €/hora" }
                ]
            }
        ],
        notes: "Límite diario: 24.15 €. Tarifas por minuto.",
        dailyLimit: 24.15
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const formularioAparcamiento = document.getElementById('parking-form');
    const formularioInicio = document.getElementById('inicio');
    const formularioFin = document.getElementById('fin');
    const listaAparcamientos = document.getElementById('parking-list');
    const divResultado = document.getElementById('resultado-calculo');
    const diasFestivosArray = [];

    const desplegableListaAparcamientos = document.getElementById('parking-list');
    const divGuiaTarifas = document.getElementById('tariff-guide-display');


    function actualizarGuiaTarifas() {
        if (!desplegableListaAparcamientos || !divGuiaTarifas) {
            console.error("Tariff guide elements not found!");
            return;
        }

        const aparcamientoId = parseInt(desplegableListaAparcamientos.value);

        if (aparcamientoId === 0) {
            divGuiaTarifas.style.display = 'none';
            return; 
        }

        divGuiaTarifas.style.display = 'block'; 

        const datosAparcamiento = datosTarifaPantalla[aparcamientoId];

        if (datosAparcamiento) {
            let contenidoHtml = `<h3>${datosAparcamiento.name} - Guía de Tarifas</h3>`;
            contenidoHtml += '<ul>';
            datosAparcamiento.rates.forEach(rateEntry => {
                contenidoHtml += `<li>`;
                contenidoHtml += `<span class="grupo-dia-tarifa">${rateEntry.dayGroup}</span>`;

                if (rateEntry.subRates && rateEntry.subRates.length > 0) {
                    contenidoHtml += '<ul class="lista-subtarifas">';
                    rateEntry.subRates.forEach(subItem => {
                        contenidoHtml += `<li>`;
                        if (subItem.time && subItem.time.trim() !== "") {
                            contenidoHtml += `<span class="descripcion-tarifa">${subItem.time}</span>`;
                        } else {
                            contenidoHtml += `<span class="descripcion-tarifa"></span>`; 
                        }
                        contenidoHtml += `<span class="tasa-tarifa">${subItem.price}</span>`;
                        contenidoHtml += `</li>`;
                    });
                    contenidoHtml += '</ul>';
                }
                contenidoHtml += `</li>`;
            });
            contenidoHtml += '</ul>';
            if (datosAparcamiento.notes) {
                contenidoHtml += `<p class="notes">${datosAparcamiento.notes}</p>`;
            }
            divGuiaTarifas.innerHTML = contenidoHtml;
        } else {
            divGuiaTarifas.innerHTML = '<p>Guía de tarifas no disponible para este aparcamiento.</p>';
        }
    }

    if (desplegableListaAparcamientos) {
        desplegableListaAparcamientos.addEventListener('change', actualizarGuiaTarifas);

        actualizarGuiaTarifas();
    } else {
        console.error("Parking list dropdown not found for tariff guide event listener.");
    }

    formularioAparcamiento.addEventListener('submit', (event) => {
        event.preventDefault();

        const fechaInicio = new Date(formularioInicio.value);
        const fechaFin = new Date(formularioFin.value);
        const aparcamientoId = parseInt(listaAparcamientos.value);

        const divDesglosePrecio = document.getElementById('fee-breakdown-display');
        if (!divDesglosePrecio) {
            console.error("Fee breakdown display element not found!");
            return;
        }

        divResultado.style.display = 'none';
        divResultado.innerHTML = '';
        divDesglosePrecio.innerHTML = '';
        divDesglosePrecio.style.display = 'none';
        diasFestivosArray.length = 0;
        fetch('Scripts/obtenerFestivos.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json(); 
            })
            .then(data => {

                if (Array.isArray(data)) {
                    data.forEach(fechaFestivoString => {
                        const partesFecha = fechaFestivoString.split('-'); 
                        if (partesFecha.length === 3) {
                            const year = parseInt(partesFecha[0], 10);
                            const month = parseInt(partesFecha[1], 10) - 1;
                            const day = parseInt(partesFecha[2], 10);
                            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {

                                diasFestivosArray.push(new Date(Date.UTC(year, month, day)));
                            } else {
                                console.error('Invalid date part in holiday string:', fechaFestivoString);
                            }
                        } else {
                            console.error('Invalid holiday string format:', fechaFestivoString);
                        }
                    });
                } else {
                    console.error("Holiday data is not an array:", data);
                }

                let desgloseDetalladoArray = [];

                switch (aparcamientoId) {
                    case 1:
                        desgloseDetalladoArray = calcularTarifaElder(fechaInicio, fechaFin, diasFestivosArray);
                        break;
                    case 2:
                        desgloseDetalladoArray = calcularTarifaIntermodal(fechaInicio, fechaFin, diasFestivosArray);
                        break;
                    case 3:
                        desgloseDetalladoArray = calcularTarifaVegueta(fechaInicio, fechaFin, diasFestivosArray);
                        break;
                    case 4:
                        desgloseDetalladoArray = calcularTarifaMetropol(fechaInicio, fechaFin, diasFestivosArray);
                        break;
                    case 5:
                        desgloseDetalladoArray = calcularTarifaJuzgados(fechaInicio, fechaFin, diasFestivosArray);
                        break;
                    case 6:
                        desgloseDetalladoArray = calcularTarifaSanBernardo(fechaInicio, fechaFin, diasFestivosArray);
                        break;
                    case 7:
                        desgloseDetalladoArray = calcularTarifaMata(fechaInicio, fechaFin, diasFestivosArray);
                        break;
                    default:
                        divDesglosePrecio.innerHTML = '<p>Aparcamiento no válido.</p>';
                        divDesglosePrecio.style.display = 'block';
                        return;
                }

                mostrarDesglosePrecio(desgloseDetalladoArray, 'fee-breakdown-display', aparcamientoId); 

            });
    });

    function redondearTotalFinalAbajo(precio) {
        return Math.floor(precio * 20) / 20;
    }


    function esDiaFestivo(fecha, diasFestivosArray) { 
        const fechaSinHoraUTC = Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

        return diasFestivosArray.some(festivoDateObj => { 
            return festivoDateObj.getTime() === fechaSinHoraUTC;
        });
    }

    function getCurrentElderRatePerHour(date, diasFestivosArray) {
        const diaDeLaSemana = date.getDay();
        const hora = date.getHours();
        const esFestivoLocalVariable = esDiaFestivo(date, diasFestivosArray);

        if (esFestivoLocalVariable || diaDeLaSemana === 0 || diaDeLaSemana === 6 || hora >= 16 || hora < 6) {
            return 1.00; 
        } else { 
            return 2.05; 
        }
    }

    function getNextElderRateChangeTimesOnDay(date) {
        const cambios = [];
        const T06_00 = new Date(date); T06_00.setHours(6, 0, 0, 0);
        const T16_00 = new Date(date); T16_00.setHours(16, 0, 0, 0);

        if (T06_00 > date) cambios.push(T06_00);
        if (T16_00 > date) cambios.push(T16_00);

        return cambios.sort((a, b) => a - b); 
    }

    function calcularTarifaElder(fechaInicio, fechaFin, diasFestivosArray) {
        let desgloseGeneralArray = [];
        let iteradorFechaActual = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());

        while (iteradorFechaActual <= fechaFin && iteradorFechaActual < fechaFin) { 
            let horaInicioProcesamientoDia;
            let horaFinProcesamientoDia;

            const medianocheDiaInicio = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());
            if (iteradorFechaActual.getTime() === medianocheDiaInicio.getTime()) {
                horaInicioProcesamientoDia = new Date(fechaInicio);
            } else {
                horaInicioProcesamientoDia = new Date(iteradorFechaActual); 
            }

            const medianocheDiaFin = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate());
            if (iteradorFechaActual.getTime() === medianocheDiaFin.getTime()) {
                horaFinProcesamientoDia = new Date(fechaFin);
            } else {
                let finDelDia = new Date(iteradorFechaActual);
                finDelDia.setHours(23, 59, 59, 999); 
                horaFinProcesamientoDia = finDelDia;
            }

            if (horaInicioProcesamientoDia >= fechaFin) break;
            horaFinProcesamientoDia = horaFinProcesamientoDia.getTime() > fechaFin.getTime() ? new Date(fechaFin) : horaFinProcesamientoDia;
            if (horaFinProcesamientoDia <= horaInicioProcesamientoDia) {
                iteradorFechaActual.setDate(iteradorFechaActual.getDate() + 1);
                continue;
            }


            let iteradorMinutoActualEnDia = new Date(horaInicioProcesamientoDia);

            while (iteradorMinutoActualEnDia < horaFinProcesamientoDia) {
                let fechaInicioBloque = new Date(iteradorMinutoActualEnDia);
                let tasaPorHoraActual = getCurrentElderRatePerHour(fechaInicioBloque, diasFestivosArray);
                const esFestivoLocalVariable = esDiaFestivo(fechaInicioBloque, diasFestivosArray);
                const diaDeLaSemana = fechaInicioBloque.getDay();

                let fechasFinPotenciales = [horaFinProcesamientoDia];
                if (!esFestivoLocalVariable && !(diaDeLaSemana === 0 || diaDeLaSemana === 6)) {
                    const proximosCambiosEnDia = getNextElderRateChangeTimesOnDay(fechaInicioBloque);
                    proximosCambiosEnDia.forEach(t => {
                        if (t.getTime() > fechaInicioBloque.getTime() && t.getTime() <= horaFinProcesamientoDia.getTime()) {
                            fechasFinPotenciales.push(t);
                        }
                    });
                }

                let fechaFinBloque = horaFinProcesamientoDia;
                for (const d of fechasFinPotenciales) {
                    if (d.getTime() > fechaInicioBloque.getTime() && d.getTime() < fechaFinBloque.getTime()) {
                        fechaFinBloque = d;
                    }
                }
                if (fechaFinBloque.getTime() > horaFinProcesamientoDia.getTime()) {
                    fechaFinBloque = new Date(horaFinProcesamientoDia);
                }
                if (fechaFinBloque.getTime() > fechaFin.getTime()) {
                    fechaFinBloque = new Date(fechaFin);
                }

                let duracionMilisegundos = fechaFinBloque.getTime() - fechaInicioBloque.getTime();

                if (duracionMilisegundos > 0) {
                    const duracionHorasCalculada = duracionMilisegundos / (1000 * 60 * 60);
                    let totalPorBloqueCalculado = duracionHorasCalculada * tasaPorHoraActual;

                    desgloseGeneralArray.push({
                        fechaOriginal: new Date(fechaInicioBloque),
                        diaDelMes: fechaInicioBloque.getDate(),
                        nombreDia: obtenerNombreDia(fechaInicioBloque),
                        tipoDia: esFestivoLocalVariable ? "festivo" : (diaDeLaSemana === 0 || diaDeLaSemana === 6 ? "" : "laborable"),
                        horaInicio: formatearHora(fechaInicioBloque),
                        horaFin: formatearHora(fechaFinBloque),
                        duracionHoras: duracionHorasCalculada,
                        tasaPorHora: tasaPorHoraActual,
                        totalPorBloque: totalPorBloqueCalculado,
                    });
                }

                if (fechaFinBloque.getTime() <= iteradorMinutoActualEnDia.getTime()) {
                    iteradorMinutoActualEnDia.setTime(iteradorMinutoActualEnDia.getTime() + 60000);
                    if (iteradorMinutoActualEnDia >= fechaFin) break;
                } else {
                    iteradorMinutoActualEnDia = new Date(fechaFinBloque);
                }
            }
            iteradorFechaActual.setDate(iteradorFechaActual.getDate() + 1);
            iteradorFechaActual.setHours(0, 0, 0, 0);
        }
        return desgloseGeneralArray;
    }

    function calcularTarifaIntermodal(fechaInicio, fechaFin, diasFestivosArray) {
        let desgloseGeneralArray = [];
        let tiempoTotalMilisegundos = fechaFin - fechaInicio;

        if (tiempoTotalMilisegundos <= 0) return desgloseGeneralArray;

        let tiempoTotalHorasCalculadas = tiempoTotalMilisegundos / (1000 * 60 * 60);
        let inicioBloqueActual = new Date(fechaInicio);

        if (tiempoTotalHorasCalculadas < 3) {
            const precioTotalCalculado = tiempoTotalHorasCalculadas * 0.50;
            const tasaPorHoraEfectiva = 0.50;

            desgloseGeneralArray.push({
                fechaOriginal: new Date(inicioBloqueActual),
                diaDelMes: inicioBloqueActual.getDate(),
                nombreDia: obtenerNombreDia(inicioBloqueActual),
                tipoDia: esDiaFestivo(inicioBloqueActual, diasFestivosArray) ? "festivo" : (inicioBloqueActual.getDay() === 0 || inicioBloqueActual.getDay() === 6 ? "" : "laborable"),
                horaInicio: formatearHora(inicioBloqueActual),
                horaFin: formatearHora(fechaFin),
                duracionHoras: tiempoTotalHorasCalculadas,
                tasaPorHora: tasaPorHoraEfectiva,
                totalPorBloque: precioTotalCalculado
            });
        } else {
            let milisegundosRestantes = tiempoTotalMilisegundos;

            while (milisegundosRestantes > 0) {
                let duracionBloqueMilisegundos = Math.min(milisegundosRestantes, 24 * 60 * 60 * 1000);
                let duracionBloqueHoras = duracionBloqueMilisegundos / (1000 * 60 * 60);
                let finBloqueActual = new Date(inicioBloqueActual.getTime() + duracionBloqueMilisegundos);

                if (finBloqueActual > fechaFin) {
                    finBloqueActual = new Date(fechaFin);
                    duracionBloqueMilisegundos = finBloqueActual - inicioBloqueActual;
                    duracionBloqueHoras = duracionBloqueMilisegundos / (1000 * 60 * 60);
                }

                let precioBloque = 3.00;
                let tasaPorHoraEfectiva = duracionBloqueHoras > 0 ? precioBloque / duracionBloqueHoras : 0;

                desgloseGeneralArray.push({
                    fechaOriginal: new Date(inicioBloqueActual),
                    diaDelMes: inicioBloqueActual.getDate(),
                    nombreDia: obtenerNombreDia(inicioBloqueActual),
                    tipoDia: esDiaFestivo(inicioBloqueActual, diasFestivosArray) ? "festivo" : (inicioBloqueActual.getDay() === 0 || inicioBloqueActual.getDay() === 6 ? "" : "laborable"),
                    horaInicio: formatearHora(inicioBloqueActual),
                    horaFin: formatearHora(finBloqueActual),
                    duracionHoras: duracionBloqueHoras,
                    tasaPorHora: tasaPorHoraEfectiva,
                    totalPorBloque: precioBloque
                });

                milisegundosRestantes -= duracionBloqueMilisegundos;
                if (milisegundosRestantes <= 0) break;
                inicioBloqueActual = new Date(finBloqueActual);
            }
        }
        return desgloseGeneralArray;
    }

    const tarifasMercadoVegueta = [
        { dias: [1, 2, 3, 4, 5], horas: [8, 19], tarifaPorHora: 2.05 },
        { dias: [6], horas: [0, 8], tarifaPorHora: 1.00 },
        { dias: [6], horas: [8, 13.5], tarifaPorHora: 2.05 },
        { dias: [6], horas: [13.5, 24], tarifaPorHora: 1.50 },
        { dias: [0], horas: [0, 8], tarifaPorHora: 1.50 },
        { tarifaPorHora: 1.00 }
    ];

    function getVeguetaRatePerHour(date, esFestivoLocalParam) {
        const diaDeLaSemana = date.getDay();
        const hora = date.getHours();
        const minutos = date.getMinutes();
        const fraccionHoraActual = hora + minutos / 60.0;

        if (esFestivoLocalParam) {
            if (hora >= 0 && hora < 8) return 1.50;
            return 1.00;
        }

        for (const tramo of tarifasMercadoVegueta) {
            const dias = tramo.dias;
            const horas = tramo.horas;
            if (dias && dias.includes(diaDeLaSemana)) {
                if (fraccionHoraActual >= horas[0] && fraccionHoraActual < horas[1]) {
                    return tramo.tarifaPorHora;
                }
            }
        }
        if (diaDeLaSemana >= 1 && diaDeLaSemana <= 5) {
            if (!((fraccionHoraActual >= 8 && fraccionHoraActual < 19))) {
                return 1.00;
            }
        }
        if (diaDeLaSemana === 0) {
            if (fraccionHoraActual >= 0 && fraccionHoraActual < 8) return 1.50;
            return 1.00;
        }
        return tarifasMercadoVegueta[tarifasMercadoVegueta.length - 1].tarifaPorHora;
    }

    function getNextVeguetaRateChangeTimesOnDay(date, esFestivoLocalParam) {
        const cambios = [];
        const diaActual = date.getDay();

        if (esFestivoLocalParam || diaActual === 0) {
            const T08_00 = new Date(date); T08_00.setHours(8, 0, 0, 0);
            if (T08_00 > date) cambios.push(T08_00);
        } else if (diaActual >= 1 && diaActual <= 5) {
            const T08_00 = new Date(date); T08_00.setHours(8, 0, 0, 0);
            const T19_00 = new Date(date); T19_00.setHours(19, 0, 0, 0);
            if (T08_00 > date) cambios.push(T08_00);
            if (T19_00 > date) cambios.push(T19_00);
        } else if (diaActual === 6) {
            const T08_00 = new Date(date); T08_00.setHours(8, 0, 0, 0);
            const T13_30 = new Date(date); T13_30.setHours(13, 30, 0, 0);
            if (T08_00 > date) cambios.push(T08_00);
            if (T13_30 > date) cambios.push(T13_30);
        }
        return cambios.sort((a, b) => a - b);
    }

    function calcularTarifaVegueta(fechaInicio, fechaFin, diasFestivosArray) {
        let desgloseGeneralArray = [];
        let iteradorFechaActual = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());

        while (iteradorFechaActual <= fechaFin && iteradorFechaActual < fechaFin) {
            let horaInicioProcesamientoDia;
            let horaFinProcesamientoDia;

            if (iteradorFechaActual.getTime() === new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()).getTime()) {
                horaInicioProcesamientoDia = new Date(fechaInicio);
            } else {
                horaInicioProcesamientoDia = new Date(iteradorFechaActual);
            }

            let finDelDiaParaIterador = new Date(iteradorFechaActual);
            finDelDiaParaIterador.setHours(23, 59, 59, 999);

            if (iteradorFechaActual.getTime() === new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate()).getTime()) {
                horaFinProcesamientoDia = new Date(fechaFin);
            } else {
                horaFinProcesamientoDia = finDelDiaParaIterador;
            }

            if (horaInicioProcesamientoDia >= fechaFin) break;
            horaFinProcesamientoDia = horaFinProcesamientoDia.getTime() > fechaFin.getTime() ? new Date(fechaFin) : horaFinProcesamientoDia;
            if (horaInicioProcesamientoDia.getTime() >= horaFinProcesamientoDia.getTime()) {
                iteradorFechaActual.setDate(iteradorFechaActual.getDate() + 1);
                iteradorFechaActual.setHours(0, 0, 0, 0);
                continue;
            }

            let iteradorMinutoActualEnDia = new Date(horaInicioProcesamientoDia);

            while (iteradorMinutoActualEnDia < horaFinProcesamientoDia) {
                let fechaInicioBloque = new Date(iteradorMinutoActualEnDia);
                const esFestivoLocalVariable = esDiaFestivo(fechaInicioBloque, diasFestivosArray);
                let tasaPorHoraActual = getVeguetaRatePerHour(fechaInicioBloque, esFestivoLocalVariable);

                let proximosCambiosTarifa = getNextVeguetaRateChangeTimesOnDay(fechaInicioBloque, esFestivoLocalVariable);

                let fechasFinPotenciales = [horaFinProcesamientoDia];
                proximosCambiosTarifa.forEach(t => {
                    if (t.getTime() > fechaInicioBloque.getTime()) {
                        fechasFinPotenciales.push(t);
                    }
                });


                let timestampFinBloque = Math.min(...fechasFinPotenciales.map(d => d.getTime()));
                let fechaFinBloque = new Date(timestampFinBloque);

                if (fechaFinBloque.getTime() <= fechaInicioBloque.getTime()) {

                    fechaFinBloque = new Date(horaFinProcesamientoDia);
                }

                if (fechaFinBloque.getTime() > fechaFin.getTime()) {
                    fechaFinBloque = new Date(fechaFin);
                }


                let duracionMilisegundos = fechaFinBloque.getTime() - fechaInicioBloque.getTime();

                if (duracionMilisegundos > 0) {
                    const duracionHorasCalculada = duracionMilisegundos / (1000 * 60 * 60);
                    let totalPorBloqueCalculado = duracionHorasCalculada * tasaPorHoraActual;
                    const diaDeLaSemana = fechaInicioBloque.getDay();
                    let tipoDiaCalculado = esFestivoLocalVariable ? "festivo" :
                        (diaDeLaSemana === 0 || diaDeLaSemana === 6 ? "" : "laborable");

                    desgloseGeneralArray.push({
                        fechaOriginal: new Date(fechaInicioBloque),
                        diaDelMes: fechaInicioBloque.getDate(),
                        nombreDia: obtenerNombreDia(fechaInicioBloque),
                        tipoDia: tipoDiaCalculado,
                        horaInicio: formatearHora(fechaInicioBloque),
                        horaFin: formatearHora(fechaFinBloque),
                        duracionHoras: duracionHorasCalculada,
                        tasaPorHora: tasaPorHoraActual,
                        totalPorBloque: totalPorBloqueCalculado,
                    });
                }

                if (fechaFinBloque.getTime() <= iteradorMinutoActualEnDia.getTime()) {
                    iteradorMinutoActualEnDia.setTime(iteradorMinutoActualEnDia.getTime() + 60000);
                    if (iteradorMinutoActualEnDia >= fechaFin) break;
                } else {
                    iteradorMinutoActualEnDia = new Date(fechaFinBloque);
                }
            }
            iteradorFechaActual.setDate(iteradorFechaActual.getDate() + 1);
            iteradorFechaActual.setHours(0, 0, 0, 0);
        }
        return desgloseGeneralArray;
    }


    function getCurrentMetropolRatePerHour(date, diasFestivosArray) {
        const esFestivoLocalVariable = esDiaFestivo(date, diasFestivosArray);
        const diaDeLaSemana = date.getDay();
        const hora = date.getHours();
        const tarifaAltaHora = 1.85;
        const tarifaBajaHora = 0.50;

        if (esFestivoLocalVariable || diaDeLaSemana === 0 || diaDeLaSemana === 6 || hora >= 16 || hora < 7) {
            return tarifaBajaHora;
        } else {
            return tarifaAltaHora;
        }
    }

    function getNextMetropolRateChangeTimesOnDay(date) {
        const cambios = [];
        const T07_00 = new Date(date); T07_00.setHours(7, 0, 0, 0);
        const T16_00 = new Date(date); T16_00.setHours(16, 0, 0, 0);

        if (T07_00 > date) cambios.push(T07_00);
        if (T16_00 > date) cambios.push(T16_00);

        return cambios.sort((a, b) => a - b);
    }

    function calcularTarifaMetropol(fechaInicio, fechaFin, diasFestivosArray) {
        let desgloseGeneralArray = [];
        const cantidadLimite = datosTarifaPantalla[4].dailyLimit;
        let iteradorFechaActual = new Date(fechaInicio);

        while (iteradorFechaActual < fechaFin) {
            let horaInicioVentana = new Date(iteradorFechaActual);
            let horaFinVentana = new Date(horaInicioVentana.getTime() + 24 * 60 * 60 * 1000);
            if (horaFinVentana > fechaFin) {
                horaFinVentana = new Date(fechaFin);
            }

            let costoEnVentanaActual = 0;
            let iteradorFechaEnVentana = new Date(horaInicioVentana);

            while (iteradorFechaEnVentana < horaFinVentana) {
                let fechaInicioBloque = new Date(iteradorFechaEnVentana);
                const esFestivoLocalVariable = esDiaFestivo(fechaInicioBloque, diasFestivosArray);
                const diaDeLaSemana = fechaInicioBloque.getDay();
                let tasaPorHoraActual = getCurrentMetropolRatePerHour(fechaInicioBloque, diasFestivosArray);

                let fechasFinPotencialesSinLimite = [horaFinVentana];

                let finDelDiaCalendario = new Date(fechaInicioBloque);
                finDelDiaCalendario.setHours(23, 59, 59, 999);
                if (finDelDiaCalendario < horaFinVentana) fechasFinPotencialesSinLimite.push(finDelDiaCalendario);


                if (!esFestivoLocalVariable && !(diaDeLaSemana === 0 || diaDeLaSemana === 6)) {
                    const proximosCambiosEnDia = getNextMetropolRateChangeTimesOnDay(fechaInicioBloque);
                    proximosCambiosEnDia.forEach(t => {
                        if (t.getTime() > fechaInicioBloque.getTime()) {
                            fechasFinPotencialesSinLimite.push(t);
                        }
                    });
                }

                let fechaFinBloqueVerdaderaSinLimite = horaFinVentana;
                for (const d of fechasFinPotencialesSinLimite) {
                    if (d.getTime() > fechaInicioBloque.getTime() && d.getTime() < fechaFinBloqueVerdaderaSinLimite.getTime()) {
                        fechaFinBloqueVerdaderaSinLimite = d;
                    }
                }
                if (fechaFinBloqueVerdaderaSinLimite.getTime() > horaFinVentana.getTime()) {
                    fechaFinBloqueVerdaderaSinLimite = new Date(horaFinVentana);
                }


                let duracionMilisegundosSinLimite = fechaFinBloqueVerdaderaSinLimite.getTime() - fechaInicioBloque.getTime();
                if (duracionMilisegundosSinLimite <= 0) {
                    iteradorFechaEnVentana.setTime(iteradorFechaEnVentana.getTime() + 60000);
                    if (iteradorFechaEnVentana >= fechaFin) break;
                    continue;
                }

                let costoBloqueBruto = (duracionMilisegundosSinLimite / (1000 * 60 * 60)) * tasaPorHoraActual;
                let duracionMilisegundosReal = duracionMilisegundosSinLimite;
                let costoParaEsteSegmentoBloque = costoBloqueBruto;
                let fechaFinBloqueParaMostrar = new Date(fechaFinBloqueVerdaderaSinLimite);

                if (costoEnVentanaActual + costoBloqueBruto > cantidadLimite) {
                    costoParaEsteSegmentoBloque = cantidadLimite - costoEnVentanaActual;
                    if (costoParaEsteSegmentoBloque < 0) costoParaEsteSegmentoBloque = 0;

                    if (costoBloqueBruto > 0) {
                        let proporcion = costoParaEsteSegmentoBloque / costoBloqueBruto;
                        duracionMilisegundosReal = Math.round(duracionMilisegundosSinLimite * proporcion);
                    } else {
                        duracionMilisegundosReal = 0;
                    }
                    fechaFinBloqueParaMostrar = new Date(fechaInicioBloque.getTime() + duracionMilisegundosReal);
                }

                if (fechaFinBloqueParaMostrar.getTime() > horaFinVentana.getTime()) fechaFinBloqueParaMostrar = new Date(horaFinVentana);
                if (fechaFinBloqueParaMostrar.getTime() > fechaFin.getTime()) fechaFinBloqueParaMostrar = new Date(fechaFin);
                duracionMilisegundosReal = fechaFinBloqueParaMostrar.getTime() - fechaInicioBloque.getTime();
                if (duracionMilisegundosReal < 0) duracionMilisegundosReal = 0;


                if (duracionMilisegundosReal === 0) costoParaEsteSegmentoBloque = 0;


                if (duracionMilisegundosReal > 0 || (costoParaEsteSegmentoBloque > 0 && costoBloqueBruto > 0) || (costoBloqueBruto === 0 && costoParaEsteSegmentoBloque === 0)) {
                    const duracionHorasCalculada = duracionMilisegundosReal / (1000 * 60 * 60);
                    desgloseGeneralArray.push({
                        fechaOriginal: new Date(fechaInicioBloque),
                        diaDelMes: fechaInicioBloque.getDate(),
                        nombreDia: obtenerNombreDia(fechaInicioBloque),
                        tipoDia: esFestivoLocalVariable ? "festivo" : (diaDeLaSemana === 0 || diaDeLaSemana === 6 ? "" : "laborable"),
                        horaInicio: formatearHora(fechaInicioBloque),
                        horaFin: formatearHora(fechaFinBloqueParaMostrar),
                        duracionHoras: duracionHorasCalculada,
                        tasaPorHora: tasaPorHoraActual,
                        totalPorBloque: costoParaEsteSegmentoBloque,
                    });
                }

                costoEnVentanaActual += costoParaEsteSegmentoBloque;

                if (fechaFinBloqueParaMostrar.getTime() <= iteradorFechaEnVentana.getTime()) {
                    iteradorFechaEnVentana.setTime(iteradorFechaEnVentana.getTime() + 60000);
                    if (iteradorFechaEnVentana >= fechaFin) break;
                } else {
                    iteradorFechaEnVentana = new Date(fechaFinBloqueParaMostrar);
                }

                if (costoEnVentanaActual >= cantidadLimite) {
                    break;
                }
            }
            iteradorFechaActual = new Date(horaFinVentana);
        }
        return desgloseGeneralArray;
    }

    function getCurrentJuzgadosRatePerHour(date, diasFestivosArray) {
        const esFestivoLocalVariable = esDiaFestivo(date, diasFestivosArray);
        const diaDeLaSemana = date.getDay();
        const hora = date.getHours();
        const minutos = date.getMinutes();

        if (esFestivoLocalVariable || diaDeLaSemana === 0 || diaDeLaSemana === 6) {
            return 0.50;
        } else {
            const totalMinutosDesdeMedianoche = hora * 60 + minutos;
            if (totalMinutosDesdeMedianoche >= (7 * 60 + 30) && totalMinutosDesdeMedianoche < (15 * 60 + 29)) {
                return 1.86;
            } else {
                return 0.50;
            }
        }
    }

    function getNextJuzgadosRateChangeTimesOnDay(date) {
        const cambios = [];
        const T07_30 = new Date(date); T07_30.setHours(7, 30, 0, 0);
        const T15_29 = new Date(date); T15_29.setHours(15, 29, 0, 0);

        if (T07_30 > date) cambios.push(T07_30);
        if (T15_29 > date) cambios.push(T15_29);

        return cambios.sort((a, b) => a - b);
    }

    function calcularTarifaJuzgados(fechaInicio, fechaFin, diasFestivosArray) {
        let desgloseGeneralArray = [];
        let iteradorFechaActual = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());

        while (iteradorFechaActual <= fechaFin && iteradorFechaActual < fechaFin) { 
            let horaInicioProcesamientoDia;
            let horaFinProcesamientoDia;

            if (iteradorFechaActual.getTime() === new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()).getTime()) {
                horaInicioProcesamientoDia = new Date(fechaInicio);
            } else {
                horaInicioProcesamientoDia = new Date(iteradorFechaActual);
            }

            let finDelDiaParaIterador = new Date(iteradorFechaActual);
            finDelDiaParaIterador.setHours(23, 59, 59, 999);

            if (iteradorFechaActual.getTime() === new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate()).getTime()) {
                horaFinProcesamientoDia = new Date(fechaFin);
            } else {
                horaFinProcesamientoDia = finDelDiaParaIterador;
            }

            if (horaInicioProcesamientoDia >= fechaFin) break;
            horaFinProcesamientoDia = horaFinProcesamientoDia.getTime() > fechaFin.getTime() ? new Date(fechaFin) : horaFinProcesamientoDia;
            if (horaInicioProcesamientoDia.getTime() >= horaFinProcesamientoDia.getTime()) {
                iteradorFechaActual.setDate(iteradorFechaActual.getDate() + 1);
                iteradorFechaActual.setHours(0, 0, 0, 0);
                continue;
            }

            let iteradorMinutoActualEnDia = new Date(horaInicioProcesamientoDia);

            while (iteradorMinutoActualEnDia < horaFinProcesamientoDia) {
                let fechaInicioBloque = new Date(iteradorMinutoActualEnDia);
                const esFestivoLocalVariable = esDiaFestivo(fechaInicioBloque, diasFestivosArray);
                let tasaPorHoraActual = getCurrentJuzgadosRatePerHour(fechaInicioBloque, diasFestivosArray);

                let fechasFinPotenciales = [horaFinProcesamientoDia];
                if (!esFestivoLocalVariable && !(fechaInicioBloque.getDay() === 0 || fechaInicioBloque.getDay() === 6)) {
                    let proximosCambiosTarifa = getNextJuzgadosRateChangeTimesOnDay(fechaInicioBloque);
                    proximosCambiosTarifa.forEach(t => {
                        if (t.getTime() > fechaInicioBloque.getTime()) {
                            fechasFinPotenciales.push(t);
                        }
                    });
                }

                let timestampFinBloque = Math.min(...fechasFinPotenciales.map(d => d.getTime()));
                let fechaFinBloque = new Date(timestampFinBloque);

                if (fechaFinBloque.getTime() <= fechaInicioBloque.getTime()) {
                    fechaFinBloque = new Date(horaFinProcesamientoDia);
                }
                if (fechaFinBloque.getTime() > fechaFin.getTime()) {
                    fechaFinBloque = new Date(fechaFin);
                }

                let duracionMilisegundos = fechaFinBloque.getTime() - fechaInicioBloque.getTime();

                if (duracionMilisegundos > 0) {
                    const duracionHorasCalculada = duracionMilisegundos / (1000 * 60 * 60);
                    let totalPorBloqueCalculado = duracionHorasCalculada * tasaPorHoraActual;
                    const diaDeLaSemana = fechaInicioBloque.getDay();
                    let tipoDiaCalculado = esFestivoLocalVariable ? "festivo" :
                        (diaDeLaSemana === 0 || diaDeLaSemana === 6 ? "" : "laborable");

                    desgloseGeneralArray.push({
                        fechaOriginal: new Date(fechaInicioBloque),
                        diaDelMes: fechaInicioBloque.getDate(),
                        nombreDia: obtenerNombreDia(fechaInicioBloque),
                        tipoDia: tipoDiaCalculado,
                        horaInicio: formatearHora(fechaInicioBloque),
                        horaFin: formatearHora(fechaFinBloque),
                        duracionHoras: duracionHorasCalculada,
                        tasaPorHora: tasaPorHoraActual,
                        totalPorBloque: totalPorBloqueCalculado,
                    });
                }

                if (fechaFinBloque.getTime() <= iteradorMinutoActualEnDia.getTime()) {
                    iteradorMinutoActualEnDia.setTime(iteradorMinutoActualEnDia.getTime() + 60000);
                    if (iteradorMinutoActualEnDia >= fechaFin) break;
                } else {
                    iteradorMinutoActualEnDia = new Date(fechaFinBloque);
                }
            }
            iteradorFechaActual.setDate(iteradorFechaActual.getDate() + 1);
            iteradorFechaActual.setHours(0, 0, 0, 0);
        }
        return desgloseGeneralArray;
    }


    function calcularTarifaSanBernardo(fechaInicio, fechaFin, diasFestivosArray) {
        if (fechaInicio >= fechaFin) return [];

        let desgloseGeneralArray = [];
        let iteradorFechaGlobal = new Date(fechaInicio);

        const tarifaAltaHora = 1.86;
        const tarifaBajaHora = 1.00; //Como puedo añadirlo a una base de datos para que sea configurable?...

        while (iteradorFechaGlobal < fechaFin) {
            let horaInicioDelDia = new Date(iteradorFechaGlobal);
            let horaFinDelDia = new Date(iteradorFechaGlobal);
            horaFinDelDia.setHours(23, 59, 59, 999);

            if (horaFinDelDia >= fechaFin) {
                horaFinDelDia = new Date(fechaFin);
            }

            let arrayBloquesDelDia = [];
            let iteradorFechaEnDia = new Date(horaInicioDelDia);

            while (iteradorFechaEnDia < horaFinDelDia) {
                let fechaInicioBloque = new Date(iteradorFechaEnDia);
                const esFestivoLocalVariable = esDiaFestivo(fechaInicioBloque, diasFestivosArray);
                const diaDeLaSemana = fechaInicioBloque.getDay();
                const hora = fechaInicioBloque.getHours();
                let tasaPorHoraActual;

                if (esFestivoLocalVariable || diaDeLaSemana === 0 || diaDeLaSemana === 6) {
                    tasaPorHoraActual = tarifaBajaHora;
                } else {
                    if (hora >= 6 && hora < 20) {
                        tasaPorHoraActual = tarifaAltaHora;
                    } else {
                        tasaPorHoraActual = tarifaBajaHora;
                    }
                }

                let fechaFinBloque = new Date(fechaInicioBloque);
                let finPotencial = new Date(horaFinDelDia);

                let fechaTemporal = new Date(fechaInicioBloque);
                fechaTemporal.setTime(fechaTemporal.getTime() + 60000);
                fechaFinBloque = new Date(finPotencial);

                while (fechaTemporal <= finPotencial && fechaTemporal < fechaFin) {
                    const esFestivoTemporal = esDiaFestivo(fechaTemporal, diasFestivosArray);
                    const diaSemanaTemporal = fechaTemporal.getDay();
                    const horaTemporal = fechaTemporal.getHours();
                    let tasaEnFechaTemporal;

                    if (esFestivoTemporal || diaSemanaTemporal === 0 || diaSemanaTemporal === 6) {
                        tasaEnFechaTemporal = tarifaBajaHora;
                    } else {
                        if (horaTemporal >= 6 && horaTemporal < 20) {
                            tasaEnFechaTemporal = tarifaAltaHora;
                        } else {
                            tasaEnFechaTemporal = tarifaBajaHora;
                        }
                    }

                    if (tasaEnFechaTemporal !== tasaPorHoraActual) {
                        fechaFinBloque = new Date(fechaTemporal);
                        break;
                    }
                    if (fechaTemporal.getTime() === fechaFin.getTime()) {
                        fechaFinBloque = new Date(fechaFin);
                        break;
                    }
                    fechaTemporal.setTime(fechaTemporal.getTime() + 60000);
                }
                if (fechaTemporal >= fechaFin && fechaFinBloque > fechaFin) {
                    fechaFinBloque = new Date(fechaFin);
                }


                const duracionMilisegundos = fechaFinBloque.getTime() - fechaInicioBloque.getTime();
                if (duracionMilisegundos <= 0) {
                    iteradorFechaEnDia.setTime(iteradorFechaEnDia.getTime() + 60000);
                    if (iteradorFechaEnDia >= horaFinDelDia) break;
                    continue;
                }
                const duracionHorasCalculada = duracionMilisegundos / (1000 * 60 * 60);
                const totalPorBloqueCalculado = duracionHorasCalculada * tasaPorHoraActual;

                arrayBloquesDelDia.push({
                    fechaOriginal: new Date(fechaInicioBloque),
                    diaDelMes: fechaInicioBloque.getDate(),
                    nombreDia: obtenerNombreDia(fechaInicioBloque),
                    tipoDia: esFestivoLocalVariable ? "festivo" : (diaDeLaSemana === 0 || diaDeLaSemana === 6 ? "" : "laborable"),
                    horaInicio: formatearHora(fechaInicioBloque),
                    horaFin: formatearHora(fechaFinBloque),
                    duracionHoras: duracionHorasCalculada,
                    tasaPorHora: tasaPorHoraActual,
                    totalPorBloque: totalPorBloqueCalculado
                });
                iteradorFechaEnDia = new Date(fechaFinBloque);
            }

            desgloseGeneralArray.push(...arrayBloquesDelDia);

            iteradorFechaGlobal = new Date(horaFinDelDia);
            if (iteradorFechaGlobal < fechaFin && iteradorFechaGlobal.getHours() === 23 && iteradorFechaGlobal.getMinutes() === 59) {
                iteradorFechaGlobal.setTime(iteradorFechaGlobal.getTime() + 2000);
            } else if (iteradorFechaGlobal >= fechaFin) {
                break;
            }
        }
        return desgloseGeneralArray;
    }



    function getCurrentMataRatePerHour(date, diasFestivosArray) {
        const esFestivoLocalVariable = esDiaFestivo(date, diasFestivosArray);
        const diaDeLaSemana = date.getDay();
        const hora = date.getHours();
        const tarifaRegularHora = 1.85;
        const tarifaNocheFestivoHora = 0.50;

        if (esFestivoLocalVariable || diaDeLaSemana === 0 || diaDeLaSemana === 6) {
            return tarifaNocheFestivoHora;
        } else {
            if (hora >= 6 && hora < 16) {
                return tarifaRegularHora;
            } else {
                return tarifaNocheFestivoHora;
            }
        }
    }

    function getNextMataRateChangeTimesOnDay(date) {
        const cambios = [];
        const T06_00 = new Date(date); T06_00.setHours(6, 0, 0, 0);
        const T16_00 = new Date(date); T16_00.setHours(16, 0, 0, 0);

        if (T06_00 > date) cambios.push(T06_00);
        if (T16_00 > date) cambios.push(T16_00);

        return cambios.sort((a, b) => a - b);
    }

    function calcularTarifaMata(fechaInicio, fechaFin, diasFestivosArray) {
        let desgloseGeneralArray = [];
        const cantidadLimite = datosTarifaPantalla[7].dailyLimit;
        let iteradorFechaActual = new Date(fechaInicio);

        while (iteradorFechaActual < fechaFin) {
            let horaInicioVentana = new Date(iteradorFechaActual);
            let horaFinVentana = new Date(horaInicioVentana.getTime() + 24 * 60 * 60 * 1000);
            if (horaFinVentana > fechaFin) {
                horaFinVentana = new Date(fechaFin);
            }

            let costoEnVentanaActual = 0;
            let iteradorFechaEnVentana = new Date(horaInicioVentana);

            while (iteradorFechaEnVentana < horaFinVentana) {
                let fechaInicioBloque = new Date(iteradorFechaEnVentana);
                const esFestivoLocalVariable = esDiaFestivo(fechaInicioBloque, diasFestivosArray);
                const diaDeLaSemana = fechaInicioBloque.getDay();
                let tasaPorHoraActual = getCurrentMataRatePerHour(fechaInicioBloque, diasFestivosArray);

                let fechasFinPotencialesSinLimite = [horaFinVentana];

                let finDelDiaCalendario = new Date(fechaInicioBloque);
                finDelDiaCalendario.setHours(23, 59, 59, 999);
                if (finDelDiaCalendario.getTime() < horaFinVentana.getTime()) {
                    fechasFinPotencialesSinLimite.push(finDelDiaCalendario);
                }

                if (!esFestivoLocalVariable && !(diaDeLaSemana === 0 || diaDeLaSemana === 6)) {
                    const proximosCambiosEnDia = getNextMataRateChangeTimesOnDay(fechaInicioBloque);
                    proximosCambiosEnDia.forEach(t => {
                        if (t.getTime() > fechaInicioBloque.getTime()) {
                            fechasFinPotencialesSinLimite.push(t);
                        }
                    });
                }

                let fechaFinBloqueVerdaderaSinLimite = horaFinVentana;
                for (const d of fechasFinPotencialesSinLimite) {
                    if (d.getTime() > fechaInicioBloque.getTime() && d.getTime() < fechaFinBloqueVerdaderaSinLimite.getTime()) {
                        fechaFinBloqueVerdaderaSinLimite = d;
                    }
                }
                if (fechaFinBloqueVerdaderaSinLimite.getTime() > horaFinVentana.getTime()) {
                    fechaFinBloqueVerdaderaSinLimite = new Date(horaFinVentana);
                }


                let duracionMilisegundosSinLimite = fechaFinBloqueVerdaderaSinLimite.getTime() - fechaInicioBloque.getTime();
                if (duracionMilisegundosSinLimite <= 0) {
                    iteradorFechaEnVentana.setTime(iteradorFechaEnVentana.getTime() + 60000);
                    if (iteradorFechaEnVentana >= fechaFin) break;
                    continue;
                }

                let costoBloqueBruto = (duracionMilisegundosSinLimite / (1000 * 60 * 60)) * tasaPorHoraActual;
                let duracionMilisegundosReal = duracionMilisegundosSinLimite;
                let costoParaEsteSegmentoBloque = costoBloqueBruto;
                let fechaFinBloqueParaMostrar = new Date(fechaFinBloqueVerdaderaSinLimite);

                if (costoEnVentanaActual + costoBloqueBruto > cantidadLimite) {
                    costoParaEsteSegmentoBloque = cantidadLimite - costoEnVentanaActual;
                    if (costoParaEsteSegmentoBloque < 0) costoParaEsteSegmentoBloque = 0;

                    if (costoBloqueBruto > 0) {
                        let proporcion = costoParaEsteSegmentoBloque / costoBloqueBruto;
                        duracionMilisegundosReal = Math.round(duracionMilisegundosSinLimite * proporcion);
                    } else {
                        duracionMilisegundosReal = 0;
                    }
                    fechaFinBloqueParaMostrar = new Date(fechaInicioBloque.getTime() + duracionMilisegundosReal);
                }

                if (fechaFinBloqueParaMostrar.getTime() > horaFinVentana.getTime()) fechaFinBloqueParaMostrar = new Date(horaFinVentana);
                if (fechaFinBloqueParaMostrar.getTime() > fechaFin.getTime()) fechaFinBloqueParaMostrar = new Date(fechaFin);
                duracionMilisegundosReal = fechaFinBloqueParaMostrar.getTime() - fechaInicioBloque.getTime();
                if (duracionMilisegundosReal < 0) duracionMilisegundosReal = 0;
                if (duracionMilisegundosReal === 0) costoParaEsteSegmentoBloque = 0;


                if (duracionMilisegundosReal > 0 || (costoParaEsteSegmentoBloque > 0 && costoBloqueBruto > 0) || (costoBloqueBruto === 0 && costoParaEsteSegmentoBloque === 0)) {
                    const duracionHorasCalculada = duracionMilisegundosReal / (1000 * 60 * 60);
                    desgloseGeneralArray.push({
                        fechaOriginal: new Date(fechaInicioBloque),
                        diaDelMes: fechaInicioBloque.getDate(),
                        nombreDia: obtenerNombreDia(fechaInicioBloque),
                        tipoDia: esFestivoLocalVariable ? "festivo" : (diaDeLaSemana === 0 || diaDeLaSemana === 6 ? "" : "laborable"),
                        horaInicio: formatearHora(fechaInicioBloque),
                        horaFin: formatearHora(fechaFinBloqueParaMostrar),
                        duracionHoras: duracionHorasCalculada,
                        tasaPorHora: tasaPorHoraActual,
                        totalPorBloque: costoParaEsteSegmentoBloque,
                    });
                }

                costoEnVentanaActual += costoParaEsteSegmentoBloque;

                if (fechaFinBloqueParaMostrar.getTime() <= iteradorFechaEnVentana.getTime()) {
                    iteradorFechaEnVentana.setTime(iteradorFechaEnVentana.getTime() + 60000);
                    if (iteradorFechaEnVentana >= fechaFin) break;
                } else {
                    iteradorFechaEnVentana = new Date(fechaFinBloqueParaMostrar);
                }

                if (costoEnVentanaActual >= cantidadLimite) {
                    break;
                }
            }
            iteradorFechaActual = new Date(horaFinVentana);
        }
        return desgloseGeneralArray;
    }

    function formatearHora(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function formatearFecha(date) {
        const day = date.getDate();
        const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const month = monthNames[date.getMonth()];
        return `${day} de ${month}`;
    }

    function obtenerNombreDia(date) {
        const dayNames = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
        return dayNames[date.getDay()];
    }

    function adjuntarListenersExpandir(parentElement) {
        const elementosExpandir = parentElement.querySelectorAll('.expandir-desglose');
        elementosExpandir.forEach(elemento => {
            elemento.addEventListener('click', function() {
                const targetId = this.dataset.target;
                const divDesgloseDia = parentElement.querySelector('#' + targetId);
                if (divDesgloseDia) {
                    const isHidden = divDesgloseDia.style.display === 'none';
                    divDesgloseDia.style.display = isHidden ? 'block' : 'none';
                    this.textContent = isHidden ? 'ocultar' : '...';
                }
            });
        });
    }

    function mostrarDesglosePrecio(desgloseDetalladoArray, feeBreakdownDivId, aparcamientoId) {
        const divDesglosePrecio = document.getElementById(feeBreakdownDivId);

        if (!divDesglosePrecio) {
            console.error("Fee breakdown display element not found!");
            return;
        }

        if (!desgloseDetalladoArray || desgloseDetalladoArray.length === 0) {
            divDesglosePrecio.innerHTML = '<p>No hay datos de desglose para mostrar.</p>';
            divDesglosePrecio.style.display = 'block';
            return;
        }

        let htmlDetallado = '';
        let granTotal = 0;

        const currentParkingInfo = datosTarifaPantalla[aparcamientoId];
        const dailyLimit = currentParkingInfo ? currentParkingInfo.dailyLimit : null;

        const agrupadoPorDia = desgloseDetalladoArray.reduce((acc, item) => {
            const fechaStr = formatearFecha(item.fechaOriginal);
            if (!acc[fechaStr]) {
                acc[fechaStr] = [];
            }
            acc[fechaStr].push(item);
            return acc;
        }, {});

        for (const fechaStr in agrupadoPorDia) {
            const elementosDia = agrupadoPorDia[fechaStr];
            const primerElemento = elementosDia[0];
            const nombreDia = primerElemento.nombreDia;
            const tipoDia = primerElemento.tipoDia;

            htmlDetallado += `<h4>${fechaStr} (${nombreDia}${tipoDia ? ', ' + tipoDia : ''})</h4>`;
            const idDesgloseDia = `desglose-${fechaStr.replace(/\s+/g, '-')}`;
            htmlDetallado += `<div class="desglose-dia" id="${idDesgloseDia}" style="display: none;">`;
            
            let totalDiarioBruto = 0;
            elementosDia.forEach(item => {
                htmlDetallado += `<p>${item.horaInicio} – ${item.horaFin} → ${item.duracionHoras.toFixed(2)} horas a ${item.tasaPorHora.toFixed(2)} €/h = ${item.totalPorBloque.toFixed(2)} €</p>`;
                totalDiarioBruto += item.totalPorBloque;
            });
            htmlDetallado += `</div>`;

            let totalDiarioNeto = totalDiarioBruto;
            if (aparcamientoId !== 4 && aparcamientoId !== 7) { 
                if (dailyLimit !== null && totalDiarioBruto > dailyLimit) {
                    totalDiarioNeto = dailyLimit;
                }
            }
            
            htmlDetallado += `<p><strong>Total día ${primerElemento.diaDelMes}: ${totalDiarioNeto.toFixed(2)} € </strong> <span class="expandir-desglose" data-target="${idDesgloseDia}"><i class="fa-solid fa-caret-down"></i></span></p>`;
            htmlDetallado += '<hr>';
            granTotal += totalDiarioNeto; 
        }

        const granTotalNormalizado = parseFloat(granTotal.toFixed(4));
        const granTotalRedondeadoFinal = redondearTotalFinalAbajo(granTotalNormalizado + 0.005);
        
        divDesglosePrecio.innerHTML = `
            <h2>Desglose de Precio</h2>
            <p class="gran-total">Total: ${granTotalRedondeadoFinal.toFixed(2)} € <i class="fa-solid fa-circle-info" title="El resultado se obtiene de un redondeo de 5 centimos a la baja."></i></p>
            <button id="botonMostrarDetalles" class="boton-estilo">Mostrar Detalles</button>
            <div id="contenedor-principal-detalles" style="display: none;"></div>
            <button id="botonOcultarDetalles" class="boton-estilo" style="display: none; margin-top: 15px;">Ocultar Detalles</button>
        `;
        divDesglosePrecio.style.display = 'block';

        const contenedorPrincipalDetalles = document.getElementById('contenedor-principal-detalles');
        if (contenedorPrincipalDetalles) {
            contenedorPrincipalDetalles.innerHTML = htmlDetallado;
            adjuntarListenersExpandir(contenedorPrincipalDetalles);
        }

        const botonMostrarDetalles = document.getElementById('botonMostrarDetalles');
        const botonOcultarDetalles = document.getElementById('botonOcultarDetalles');

        if (botonMostrarDetalles && botonOcultarDetalles && contenedorPrincipalDetalles) {
            botonMostrarDetalles.addEventListener('click', () => {
                botonMostrarDetalles.style.display = 'none';
                contenedorPrincipalDetalles.style.display = 'block';
                botonOcultarDetalles.style.display = 'block';
            });

            botonOcultarDetalles.addEventListener('click', () => {
                botonOcultarDetalles.style.display = 'none';
                contenedorPrincipalDetalles.style.display = 'none';
                botonMostrarDetalles.style.display = 'block';
            });
        }
    }
});