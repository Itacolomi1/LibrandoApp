


$(document).ready(function () {
    $("#divAluno").hide();
    acesso_sala.valida_link();

});
var campo_branco = false;

var acesso_sala = function () {

    //Ids dos elementos da tela
    var controles = function () {
        return {
            cd_sala: "#cd_sala"

        };
    }



    var valida = function (code) {
      
        var codigo = $(controles().cd_sala).val() || code;

        var url = 'https://librando.azurewebsites.net/api/sala/valida?code=' + codigo;
       //var url = `http://localhost:9090/api/sala/valida?code=${codigo}`;
     
        $.ajax({
            type: "GET",
            url: url,            
            cache: false
        })
            .done(function (data) {
            
                if (data != null) {
                    alert('Seja Bem Vindo');
                    localStorage.setItem('codigo_sala', data._id);
                    localStorage.setItem('status_sala', data.status);
                    localStorage.setItem('tipo_jogo', data.tipoJogo);
                    localStorage.setItem('nome_sala', data.roomName);
                    $("#divSalaNome").hide();
                    $("#divAluno").show();
                } else {
                    alert('código errado');
                }
               

            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                
                alert("Erro ao validar o código da sala");
                console.log(errorThrown);
            });


    }

    var valida_link = function () {
      
        const urlParams = new URLSearchParams(window.location.search);
        var code = urlParams.get('code');
        if (code != null) {
            valida(code);
        }
    }
   
    var cadastrarJogador = function () {
        campo_branco = false;
        var url = "https://librando.azurewebsites.net/api/jogador/registra";
        //var url = "http://localhost:9090/api/jogador/registra";

        var jogador = {};
        jogador.personName = $('#idNome').val();

        valida_campo(jogador.personName);

        if (!campo_branco) {

            $.ajax({
                type: "POST",
                url: url,
                data: jogador,
                cache: false
            })
                .done(function (data) {

                    localStorage.setItem('codigo_jogador', data);
                    Insere_Jogador_Sala();
                    window.location = "https://librandoapp.azurewebsites.net/SalaEspera";

                }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Usuário ou Senha inválido");
                    console.log(errorThrown);
                });
        } else {
            alert('Escreva o seu nome!');
        }
      

    }

    var Insere_Jogador_Sala = function () {
        //var url = "http://localhost:9090/api/sala/createJogador";
        var url = "https://librando.azurewebsites.net/api/sala/createJogador";
       
        var aluno_sala = new Object();

        aluno_sala.cd_jogador = localStorage.getItem('codigo_jogador');
        aluno_sala._id = localStorage.getItem('codigo_sala');
        aluno_sala.personName = $('#idNome').val();
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

    function valida_campo(campo) {

        if (campo == "") {
            campo_branco = true;
        }

    }

    return {
        valida: valida,
        cadastrarJogador: cadastrarJogador,
        valida_link: valida_link
    };
}();