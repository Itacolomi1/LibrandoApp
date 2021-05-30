$(document).ready(function () {
   
});

function mostrarSalaEspera() {
    $("#formSalaEspera").show();
    $("#divSalaNome").hide();
}

function direciona_jogo() {

    var sala = new Object();
    sala.roomname = localStorage.getItem('nome_sala');
    var url = 'https://librando.azurewebsites.net/api/sala/sala_ativa';
    //var url = `http://localhost:9090/api/sala/sala_ativa`;

    $.ajax({
        type: "POST",
        url: url,
        data: sala,
        cache: false
    })
        .done(function (data) {

            if (!sala) {
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


        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {

            alert("Erro ao validar status da sala");
            console.log(errorThrown);
        });









   
    

}
