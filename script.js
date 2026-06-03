const PASSWORD = "bogado80";

const API =
"https://script.google.com/macros/s/AKfycbxmZlgYfD6fFMHopIS_86mw-srwKmcu_IECc3hLJ6XtNEtkep-da0QB0R2RzUlRN68r/exec";

function login(){

    const pass =
        document.getElementById("password").value;

    if(pass !== PASSWORD){
        alert("Contraseña incorrecta");
        return;
    }

    document.getElementById("loginBox").style.display="none";
    document.getElementById("panel").style.display="block";

    cargarDatos();
}

async function cargarDatos(){

    const response = await fetch(API);

    const data = await response.json();

    document.getElementById("confirmados").textContent =
        data.resumen.confirmados;

    document.getElementById("pendientes").textContent =
        data.resumen.pendientes;

    document.getElementById("noAsisten").textContent =
        data.resumen.noAsisten;

    document.getElementById("personas").textContent =
        data.resumen.personasConfirmadas;

    let totalCupos = 0;
    let totalConfirmados = 0;

    const tbody =
        document.getElementById("tbody");

    tbody.innerHTML = "";

    data.invitados.forEach(item => {

        totalCupos += item.cupo;
        totalConfirmados += item.personas;

        tbody.innerHTML += `
        <tr>
            <td>${item.nombre}</td>
            <td>${item.estado}</td>
            <td>${item.cupo}</td>
            <td>${item.personas}</td>
        </tr>
        `;
    });

    document.getElementById("totalCupos")
        .textContent = totalCupos;

    document.getElementById("totalConfirmados")
        .textContent = totalConfirmados;
}

function exportarExcel(){

    alert(
      "Próximo paso: generar Excel automáticamente."
    );
}