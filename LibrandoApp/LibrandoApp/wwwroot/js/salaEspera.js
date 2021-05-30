$(document).ready(function () {
   
});

function mostrarSalaEspera() {
    $("#formSalaEspera").show();
    $("#divSalaNome").hide();
}

function direciona_jogo() {

    if (localStorage.getItem('status_sala') == 0) {
        alert("Espere a responsável liberar o jogo");
    }
    else {
        if (localStorage.getItem('tipo_jogo') == 'Meteoro') {
            window.location = "https://librandoapp.azurewebsites.net/Jogo2";
        }
        else {
            window.location = "https://librandoapp.azurewebsites.net/PrimeiroJogo";
        }




    }
        
    

}
