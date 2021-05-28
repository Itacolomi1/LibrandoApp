


$(document).ready(function () {
    $("#divAluno").hide();

});

var acesso_sala = function () {

    //Ids dos elementos da tela
    var controles = function () {
        return {
            cd_sala: "#cd_sala"

        };
    }



    var valida = function () {

        var codigo = $(controles().cd_sala).val();
        //window.location = "https://librandoapp.azurewebsites.net/SalaEspera";
        var url = `http://localhost:9090/api/sala/valida?code=${codigo}`;
     
        $.ajax({
            type: "GET",
            url: url,            
            cache: false
        })
            .done(function (data) {

                if (data != null) {
                    alert('Seja Bem Vindo');
                    localStorage.setItem('codigo_sala', data);
                    $("#divSalaNome").hide();
                    $("#divAluno").show();
                } else {
                    alert('código errado');
                }
               

            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Usuário ou Senha inválido");
                console.log(errorThrown);
            });


    }

    var cadastrarJogador = function () {

        var url = "https://librando.azurewebsites.net/api/jogador/registra";
        //var url = "http://localhost:9090/api/jogador/registra";

        var jogador = {};
        jogador.personName = $('#idNome').val();


        $.ajax({
            type: "POST",
            url: url,
            data: jogador,
            cache: false
        })
            .done(function (data) {

                localStorage.setItem('codigo_jogador', data);
                Insere_Jogador_Sala();

            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Usuário ou Senha inválido");
                console.log(errorThrown);
            });

    }

    var Insere_Jogador_Sala = function () {
        //var url = "http://localhost:9090/api/sala/createJogador";
        var url = "https://librando.azurewebsites.net/api/sala/createJogador";

        var aluno_sala = new Object();

        aluno_sala.cd_jogador = localStorage.getItem('codigo_jogador');
       aluno_sala._id = localStorage.getItem('codigo_sala');      
        aluno_sala.data = ToDay();


        $.ajax({
            type: "POST",
            url: url,
            data: aluno_sala,
            cache: false
        })
            .done(function (data) {

                alert("Deu bom!");

            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("erro na hora de inserir jogador");
                console.log(errorThrown);
            });

    }

    var ToDay = function () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        return today;

    }

    return {
        valida: valida,
        cadastrarJogador: cadastrarJogador
    };
}();