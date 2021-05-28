var lista_perguntas = [];


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

    var proxima_pergunta = function () {

        if (lista_perguntas.length == 1) {
            alert("Acabou o Jogo!!");
        } else {
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

    var Trocar_Imagem = function (id, letra) {
        var imagem = letra + '.png';
        $(id).attr("src", "./img/AlfabetoLibras/" + imagem);

    }



    return {
        lista_alfabeto: lista_alfabeto,
        proxima_pergunta: proxima_pergunta


    };
}();