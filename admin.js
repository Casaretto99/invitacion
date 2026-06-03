const PASSWORD = "bogado80";

const API =
"https://script.google.com/macros/s/AKfycbxmZlgYfD6fFMHopIS_86mw-srwKmcu_IECc3hLJ6XtNEtkep-da0QB0R2RzUlRN68r/exec";

function login() {

    const pass = document.getElementById("password").value;

    if (pass !== PASSWORD) {
        alert("Contraseña incorrecta");
        return;
    }

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("panel").style.display = "block";

    cargarDatos();
}

async function cargarDatos() {

    try {

        const response =
  await fetch(API + "?key=bogado80");
        const data = await response.json();

        console.log("JSON recibido:", data);

        if (!data.resumen) {
            console.error("No existe data.resumen");
            alert("Error: la API no devuelve el formato esperado.");
            return;
        }

        document.getElementById("confirmados").textContent =
            data.resumen.confirmados || 0;

        document.getElementById("pendientes").textContent =
            data.resumen.pendientes || 0;

        document.getElementById("noAsisten").textContent =
            data.resumen.noAsiste || 0;

        document.getElementById("personas").textContent =
            data.resumen.personasConfirmadas || 0;

        let totalCupos = 0;
        let totalConfirmados = 0;

        const tbody = document.getElementById("tbody");

        tbody.innerHTML = "";

        if (data.invitados && data.invitados.length > 0) {

            data.invitados.forEach(item => {

                totalCupos += Number(item.cupo || 0);
                totalConfirmados += Number(item.personas || 0);

                tbody.innerHTML += `
                    <tr>
                        <td>${item.nombre || ""}</td>
                        <td>${item.estado || ""}</td>
                        <td>${item.cupo || 0}</td>
                        <td>${item.personas || 0}</td>
                    </tr>
                `;
            });
        }

        document.getElementById("totalCupos").textContent =
            totalCupos;

        document.getElementById("totalConfirmados").textContent =
            totalConfirmados;

    } catch (error) {

        console.error("Error cargando datos:", error);

        alert(
            "No se pudo conectar con el Apps Script. Revisá la consola (F12)."
        );
    }
}

function exportarExcel() {

    alert(
        "La exportación Excel se implementará en el siguiente paso."
    );
}