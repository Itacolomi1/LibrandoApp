var lista_perguntas = [];


$(document).ready(function () {
    jogo2.lista_alfabeto();

});

var jogo2 = function () {

   

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

        var url = "http://localhost:9090/api/jogo1";
        

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
        debugger;
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
        $(controles().alt_A).text(pergunta.Opcao1);
        $(controles().alt_B).text(pergunta.Opcao2);
        $(controles().alt_C).text(pergunta.OpcaoCerta);
    }

  
    return {
        lista_alfabeto: lista_alfabeto,     
        proxima_pergunta: proxima_pergunta

    };
}();