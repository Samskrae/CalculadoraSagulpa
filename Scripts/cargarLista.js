document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('diaFestivo');
    const listaFestivosDiv = document.getElementById('lista-festivos');
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('mensaje-container');
    formulario.parentNode.insertBefore(mensajeDiv, formulario.nextSibling);

    function mostrarMensaje(mensaje, tipo) {
        mensajeDiv.innerHTML = `<div class="mensaje ${tipo}">${mensaje}</div>`;
        setTimeout(() => {
            mensajeDiv.innerHTML = '';
        }, 3000);
    }

    function cargarListaFestivos() {
        fetch('../Scripts/listarFestivos.php')
            .then(response => response.text())
            .then(data => {
                listaFestivosDiv.innerHTML = data;
                const botonesEliminar = listaFestivosDiv.querySelectorAll('.eliminar-festivo');
                botonesEliminar.forEach(boton => {
                    boton.addEventListener('click', eliminarDiaFestivo);
                });
            })
            .catch(error => {
                console.error('Error al cargar la lista de días festivos:', error);
                listaFestivosDiv.innerHTML = '<p class="error">Error al cargar la lista de días festivos.</p>';
            });
    }

    function eliminarDiaFestivo() {
        const fechaEliminar = this.dataset.fecha;

        if (confirm(`¿Seguro que quieres eliminar el día festivo ${fechaEliminar}?`)) {
            const formData = new FormData();
            formData.append('fecha', fechaEliminar);

            fetch('../Scripts/eliminarFestivos.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                mostrarMensaje(data, data.includes('Error') ? 'error' : 'exito');
                cargarListaFestivos();
            })
            .catch(error => {
                mostrarMensaje('Error al eliminar el día festivo.', 'error');
                console.error('Error:', error);
            });
        }
    }

    cargarListaFestivos();

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const fechaInput = document.getElementById('dia');
        const fecha = fechaInput.value;

        if (!fecha) {
            mostrarMensaje('Por favor, selecciona una fecha.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('dia', fecha);

        fetch('../Scripts/procesarForm.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            mostrarMensaje(data, data.includes('Error') ? 'error' : 'exito');
            cargarListaFestivos();
            fechaInput.value = '';
        })
        .catch(error => {
            mostrarMensaje('Error al enviar la solicitud.', 'error');
            console.error('Error:', error);
        });
    });
});