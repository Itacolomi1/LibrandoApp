var lista_perguntas = [];
var pontos = 0;


$(document).ready(function () {
    jogo1.lista_alfabeto();

});

var jogo1 = function () {



    //Ids dos elementos da tela
    var controles = function () {
        return {
            imagem: "#imagem",
            desc_pergunta: "#desc_pergunta",
            alt_A: "#alt_A",
            alt_B: "#alt_B",
            alt_C: "#alt_C"

        };
    }

    var lista_alfabeto = function () {

        //var url = "http://localhost:9090/api/jogo1";
        var url = "https://librando.azurewebsites.net/api/jogo1";


        $.ajax({
            type: "GET",
            url: url,
            cache: false

        })
            .done(function (data) {

                lista_perguntas = data;
                localStorage.setItem('jogo', JSON.stringify(data));
                console.log(JSON.parse(localStorage.getItem('jogo')));

                // Jogando na tela 
                exibe_pergunta(data[0]);


            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Usuário ou Senha inválido");
                console.log(errorThrown);
            });

    }

    var proxima_pergunta = function (id) {
       
        if (lista_perguntas.length == 1) {
            if ($(id).val() == lista_perguntas[0].OpcaoCerta) {
                Soma_Pontos();
            }
            else {
                Tira_Pontos();
            }
            UpdatePontos(); 
            var zero = 0;
            localStorage.setItem('pontuacao', zero.toString())
        } else {
            if ($(id).val() == lista_perguntas[0].OpcaoCerta) {
                Soma_Pontos();
            }
            else {
                Tira_Pontos();
            }

            lista_perguntas.shift();
            localStorage.setItem('jogo', JSON.stringify(lista_perguntas));
            console.log(JSON.parse(localStorage.getItem('jogo')));
            exibe_pergunta(lista_perguntas[0]);
        }

    }

    var exibe_pergunta = function (pergunta) {

        $(controles().desc_pergunta).text(pergunta.Descricao);
        Trocar_Imagem(controles().alt_A, pergunta.Opcao1);
        Trocar_Imagem(controles().alt_B, pergunta.OpcaoCerta);
        Trocar_Imagem(controles().alt_C, pergunta.Opcao2);

    }

    var Soma_Pontos = function () {
       
        pontos = pontos + 10;
        localStorage.setItem('pontuacao', pontos.toString());
    }

    var Tira_Pontos = function () {

        if (pontos > 0) {

            pontos = pontos - 5;
            localStorage.setItem('pontuacao', pontos.toString());
        }
    }


    var Trocar_Imagem = function (id, letra) {
        var imagem = letra + '.png';
        $(id).attr("src", "./img/AlfabetoLibras/" + imagem);
        $(id).val(letra);

    }

    var UpdatePontos = function () {
       // var url = "http://localhost:9090/api/sala/pontuacao";
        var url = "https://librando.azurewebsites.net/api/sala/pontuacao";
        var pontuacao = new Object();

        pontuacao._id = localStorage.getItem('codigo_sala');
        pontuacao.pontos = localStorage.getItem('pontuacao');
        pontuacao.id_jogador = localStorage.getItem('codigo_jogador');

        $.ajax({
            type: "PUT",
            url: url,
            data: pontuacao,
            cache: false
        })
            .done(function (data) {
                alert("O jogo acabou!! A sua pontuação foi: " + pontuacao.pontos);
                window.location = "https://librandoapp.azurewebsites.net/Aprendizado";

            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("erro na hora de inserir pontuacao");
                console.log(errorThrown);
            });

    }

    return {
        lista_alfabeto: lista_alfabeto,
        proxima_pergunta: proxima_pergunta,
        tira_pontos: Tira_Pontos,
        soma_pontos: Soma_Pontos

    };
}();