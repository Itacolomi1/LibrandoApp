var lista_meteoros = [];
var lista_alfabeto = ["A","B","C","D","E","F","G","H","I", "J", "K", "L", "M","O","P","Q","R","S","T","U", "V", "X", "Y","W","Z"];
var pontos = 0;

var meteoro = {};

$(document).ready(function () {
    jogo2.preenche_lista_meteoros();
     jogo2.chuva_de_meteoros();

});

var jogo2 = function () {

    var preenche_lista_meteoros = function () {
        
        for (var x = 0; x < 4; x++) {
            debugger;
            meteoro = new Object();
            meteoro.letra = get_random_letra();
            meteoro.status = 0;
            lista_meteoros.push(meteoro);
        }
     
        Trocar_Imagem(controles().m1, lista_meteoros[0].letra);
        Trocar_Imagem(controles().m2, lista_meteoros[1].letra);
        Trocar_Imagem(controles().m3, lista_meteoros[2].letra);
        Trocar_Imagem(controles().m4, lista_meteoros[3].letra);
    }
    var Trocar_Imagem = function (id, letra) {
        var imagem = letra + '.png';
        $(id).attr("src", "./img/Meteoros/" + imagem);

    }

    var get_random_letra = function () {

        return lista_alfabeto[Math.floor(Math.random() * lista_alfabeto.length)];
    }
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

    var chuva_de_meteoros = function () {

        $(controles().m1).trigger("click");
        $(controles().m2).trigger("click");
        $(controles().m3).trigger("click");
        $(controles().m4).trigger("click");


    }

    var queda_meteoro = function (elemento) {
        elemento.style.top = '400px';
    }

    var valida_meteoro = function (letra) {        
        retorno = lista_meteoros.find(x => x.letra == letra)
        if (retorno != null) {
           
            pontos = pontos + 10;
            lista_meteoros.find(x => x.letra == letra).status = 1;

            var indice = lista_meteoros.indexOf(retorno);

            $(retorna_id_meteoro(indice)).attr("src", "./img/Certo.png");

            console.log("Acertou!")
        } else {
          
            if (pontos > 0) {

                pontos = pontos - 5;
            }
            
            console.log("Errou!")
        }
    }

    var retorna_id_meteoro = function (indice) {

        switch (indice) {

            case 0:
                return controles().m1;
                break;

            case 1:
                return controles().m2;
                break;

            case 2:
                return controles().m3;
                break;

            case 3:
                return controles().m4;
                break;

        }

    }

    var valida_explosao = function () {

        for (var x = 0; x < 4; x++) {
           
            if (lista_meteoros[x].status != 1) {                
                $(retorna_id_meteoro(x)).attr("src", "./img/explodir2.gif");
            }
            
        }
    }

    var limpa_explosao = function () {

        for (var x = 0; x < 4; x++) {
           
            $(retorna_id_meteoro(x)).attr("src", "./img/transparente.png");            

        }
    }

    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            if (timer == 5) {
                $('#tempo').addClass('red');
            }
            if (timer == 1) {
                valida_explosao();
            }
            if (--timer < 0) {
                timer = 0;
                limpa_explosao();
                
                localStorage.setItem('pontuacao', pontos.toString());
                UpdatePontos();
            }
        }, 1000);
    }

    window.onload = function () {
        var duration = 20 ; // Converter para segundos
        display = document.querySelector('#tempo'); // selecionando o timer
        startTimer(duration, display); // iniciando o timer
    };	

    var UpdatePontos = function () {
        //var url = "http://localhost:9090/api/sala/pontuacao";
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

                alert("Deu bom!");

            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("erro na hora de inserir pontuacao");
                console.log(errorThrown);
            });

    }
  
    return {
        
        chuva_de_meteoros: chuva_de_meteoros,
        queda_meteoro: queda_meteoro,
        preenche_lista_meteoros: preenche_lista_meteoros,
        valida_meteoro: valida_meteoro,
        atualiza_pontos: UpdatePontos
    };
      
}();