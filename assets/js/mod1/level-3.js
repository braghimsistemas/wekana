var rnd = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

$(function() {
   
    var currI = 0;

    // Lista basica já sortida
    var basics = [
        {a:'あ'}, {i:'い'}, {u:'う'}, {e:'え'}, {o:'お'},
        {ka:'か'}, {ki:'き'}, {ku:'く'}, {ke:'け'}, {ko:'こ'},
        {sa:'さ'}, {shi:'し'}, {su:'す'}, {se:'せ'}, {so:'そ'},
        {ta:'た'}, {chi:'ち'}, {tsu:'つ'}, {te:'て'}, {to:'と'},
        {na:'な'}, {ni:'に'}, {nu:'ぬ'}, {ne:'ね'}, {no:'の'},
        {ha:'は'}, {hi:'ひ'}, {fu:'ふ'}, {he:'へ'}, {ho:'ほ'},
        {ma:'ま'}, {mi:'み'}, {mu:'む'}, {me:'め'}, {mo:'も'},
        {ra:'ら'}, {ri:'り'}, {ru:'る'}, {re:'れ'}, {ro:'ろ'},
        {ya:'や'}, {yu:'ゆ'}, {yo:'よ'},
        {wa:'わ'}, {wo:'を'},
        {n:'ん'}
    ].sort(function(a,b) {
      return .5 - Math.random();
    });

    // Lista em Objeto para pegarmos dicas falsas
    var bIndexes = [];
    for (var i in basics) bIndexes.push(Object.keys(basics[i])[0]);

    /** Muda a pergunta junto das dicas **/
    var change = function() {

        var romaji = Object.keys(basics[currI])[0];
        var value = Object.values(basics[currI])[0];

        // Adiciona o hiragana ao box da pergunta
        $('#mod1level3-question').text(value);

        // Temos 4 dicas, primeiro vamos escolher
        // aleatoriamente quem vai ter a resposta certa
        var rndi = rnd(0, 3);
        var already = [];

        // Loop sobre os td's da tabela
        $('table#mod1level3-table-tips tr td').each(function(a,b,c) {

            // Resposta certa
            if (parseInt($(b).data("key")) == rndi) {
                $(b).text(romaji);
                already.push(romaji);
            } else {
                // Dica errada
                for (var y=0; y<100; y++) {
                    var rndOpt = bIndexes[rnd(0, (bIndexes.length-1))];
                    if (already.indexOf(rndOpt) === -1) {
                        $(b).text(rndOpt);
                        already.push(rndOpt);
                        break;
                    }
                }
            }

        });

        // Avança para o próximo (isso tera efeito apenas depois de acertar)
        currI = (currI < (basics.length-1)) ? currI+1 : 0;
    };
    
    // Ao clicar no botao para dicas
    $('#mod1level3-btn-tips').on('click', function() {
        $('#mod1level3-table-tips').fadeToggle('fast');
        $('input[name="mod1level3-answere"]').focus(); // Retorna o foco para o input de resposta
    });

    // Ao abrir o modal
    $('#modalMod1Level3').on('show.bs.modal', function () {
        $('input[name="mod1level3-answere"]').focus();

        // Reinicia o quiz
        currI = 0;
        $('#mod1level3-table-tips').hide();

        // Começa aqui
        change();

        // Zera pontuacao
        $('#mod1level3-pnts').text('0');
    });

    // O usuario vai responder por aqui
    $('#mod1level3-answere').keyup(function() {
        var value = $(this).val();
        var higana = wanakana.toHiragana(value);

        // Acerto mizeravi
        if (higana == $('#mod1level3-question').text()) {
            $('#mod1level3-table-tips').hide();
            change();
            $(this).val('');

            $('#mod1level3-pnts').text(parseInt($('#mod1level3-pnts').text()) + rnd(0,30));
        }
    });

    /** O codigo abaixo mostra quantas formas diferentes cada hiragana tem de pronuncia

    // Gera um símbolo aleatório
    var s = wanakana.R_to_J;
    var done = [];
    // Verifica se o indice i já existe dentro do array
    Array.prototype.indexOf = function(i) {
        for (ii in this) {
            if (i === ii) return ii;
        }
        return -1;
    }
    // Verifica se já existe um valor dentro do array
    Array.prototype.contain = function(name) {
        for (i in this) {
            if (this[i] == name) return true;
        }
        return false;
    }
    // Loop principal
    for (i1 in s) {
        for (ii in s) {
            // Pula o proprio indice
            //if (i1 == ii) continue;
            // pula se hiragana for diferente
            if (s[i1] != s[ii]) continue;
            // Aqui o hiragana é o mesmo e o indice é diferente
            // portanto vamos adicionar ao array
            var hiragana = s[i1];
            // ainda não existe no array
            if (done.indexOf(hiragana) === -1) {
                done[hiragana] = new Array();
            }
            // Verifica se já existe esse nome para este hiragana
            if (done[hiragana].contain(i1)) continue;
            done[hiragana].push(i1);
        }
    }
    Array.prototype.size = function() {
        var c = 0;
        for (var i in this) c++;
        return c;
    }
    // console.log(done.size());
    // console.log(done);

    /** Até aqui estamos apenas verificando quantas formas diferentes cada hiragana tem de pronuncia **/
});

