var lista_meteoros = [];
var lista_alfabeto = ["J", "K", "L", "M"];

var meteoro = {};

$(document).ready(function () {
    jogo2.preenche_lista_meteoros();
     jogo2.chuva_de_meteoros();

});

var jogo2 = function () {

    var preenche_lista_meteoros = function () {
        
        for (var x = 0; x < 4; x++) {
            meteoro.letra = lista_alfabeto[x];
            meteoro.status = 0;
            lista_meteoros[x] = meteoro;
        }
        debugger;
        lista_meteoros = lista_alfabeto
        Trocar_Imagem(controles().m1, lista_meteoros[0].letra);
        Trocar_Imagem(controles().m2, lista_meteoros[1].letra);
        Trocar_Imagem(controles().m3, lista_meteoros[2].letra);
        Trocar_Imagem(controles().m4, lista_meteoros[3].letra);
    }
    var Trocar_Imagem = function (id, letra) {
        var imagem = letra + '.png';
        $(id).attr("src", "./img/Meteoros/" + imagem);

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
    var teste = function (){
        let el = document.getElementById('m1');
        // utiliza método
        let elCoordenadas = el.getBoundingClientRect();
        // verificar as propriedades com as coord
        console.log(elCoordenadas);
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
                $('#m1').attr("src", "./img/explodir2.gif");
            }
            if (--timer < 0) {
                timer = 0;
                $('#m1').attr("src", "./img/transparente.png");
            }
        }, 1000);
    }
    window.onload = function () {
        var duration = 20 ; // Converter para segundos
        display = document.querySelector('#tempo'); // selecionando o timer
        startTimer(duration, display); // iniciando o timer
    };	
  
    return {
        
        chuva_de_meteoros: chuva_de_meteoros,
        queda_meteoro: queda_meteoro,
        preenche_lista_meteoros: preenche_lista_meteoros

    };
}();