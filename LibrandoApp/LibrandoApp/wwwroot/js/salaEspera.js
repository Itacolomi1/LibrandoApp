$(document).ready(function () {
   
});

function mostrarSalaEspera() {
    $("#formSalaEspera").show();
    $("#divSalaNome").hide();
}
$(function () { $("#formSalaEspera").hide(); });

function cadastrarJogador() {

    var url = "https://librando.azurewebsites.net/api/jogador/registra";

    var jogador = {};
    jogador.personName = $('#idNome').val();


    $.ajax({
        type: "POST",
        url: url,
        data: jogador,
        cache: false
    })
        .done(function (data) {
            
            mostrarSalaEspera();
            console.log("Jogador foi cadastrado");

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Usuário ou Senha inválido");
            console.log(errorThrown);
        });

}