var lista_perguntas = [];


$(document).ready(function () {
    //jogo2.lista_alfabeto();
    jogo2.chuva_de_meteoros();
    jogo2.teste();

});

var jogo2 = function () {

   

    //Ids dos elementos da tela
    var controles = function () {
        return {
            imagem: "#imagem",
            desc_pergunta: "#desc_pergunta",
            alt_A: "#alt_A",
            alt_B: "#alt_B",
            alt_C: "#alt_C",
            m1: "#m1",
            m2: "#m2",
            m3: "#m3",
            m4: "#m4"

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
        $(controles().alt_A).text(pergunta.Opcao1);
        $(controles().alt_B).text(pergunta.Opcao2);
        $(controles().alt_C).text(pergunta.OpcaoCerta);
    }
    var chuva_de_meteoros = function () {

        $(controles().m1).trigger("click");
        $(controles().m2).trigger("click");
        $(controles().m3).trigger("click");
        $(controles().m4).trigger("click");
        

        
    }

    var queda_meteoro = function (elemento) {
        elemento.style.top = '400px';
    }
    var teste = function (){
        let el = document.getElementById('m1');
        // utiliza método
        let elCoordenadas = el.getBoundingClientRect();
        // verificar as propriedades com as coord
        console.log(elCoordenadas);
    }
  
    return {
        lista_alfabeto: lista_alfabeto,     
        proxima_pergunta: proxima_pergunta,
        chuva_de_meteoros: chuva_de_meteoros,
        queda_meteoro: queda_meteoro,
        teste: teste

    };
}();