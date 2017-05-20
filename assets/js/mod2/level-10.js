$(function() {
    // https://en.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words
    // http://www.openxrest.com/translatejs/

    // Dicionario
    var dic = [
        // Animais
        {hiragana:'どうぶつ', mean:'animal',romaji:'doubutsu'},
        {hiragana:'いぬ', mean:'dog',romaji:'inu'},
        {hiragana:'ねこ', mean:'cat',romaji:'neko'},
        {hiragana:'うし', mean:'cow',romaji:'ushi'},
        {hiragana:'ぶた', mean:'pig',romaji:'buta'},
        {hiragana:'うま', mean:'horse',romaji:'uma'},
        {hiragana:'ひつじ', mean:'sheep',romaji:'hitsuji'},
        {hiragana:'さる', mean:'monkey',romaji:'saru'},
        {hiragana:'ねずみ', mean:'mouse, rat',romaji:'nezumi'},
        {hiragana:'とら', mean:'tiger',romaji:'tora'},
        {hiragana:'おうかみ', mean:'wolf',romaji:'oukami'},
        {hiragana:'うさぎ', mean:'rabbit',romaji:'usagi'},
        {hiragana:'たつ', mean:'dragon',romaji:'tatsu'},
        {hiragana:'しか', mean:'deer',romaji:'shika'},
        {hiragana:'かえる', mean:'frog',romaji:'kaeru'},
        {hiragana:'がま', mean:'toad',romaji:'gama'},
        {hiragana:'しし', mean:'lion',romaji:'shishi'},
        {hiragana:'きりん', mean:'giraffe',romaji:'kirin'},
        {hiragana:'ぞう', mean:'elephant',romaji:'zou'},
        {hiragana:'とり', mean:'bird',romaji:'tori'},
        {hiragana:'にわとり', mean:'chicken',romaji:'niwatori'},
        {hiragana:'すずめ', mean:'sparrow',romaji:'suzume'},
        {hiragana:'からす', mean:'crow, raven',romaji:'karasu'},
        {hiragana:'わし', mean:'eagle',romaji:'washi'},
        {hiragana:'たか', mean:'hawk, falcon',romaji:'taka'},
        {hiragana:'さかな', mean:'fish',romaji:'sakana'},
        {hiragana:'たい', mean:'red snapper',romaji:'tai'},
        {hiragana:'えび', mean:'shrimp, lobster',romaji:'ebi'},
        {hiragana:'いわし', mean:'sardine',romaji:'iwashi'},
        {hiragana:'まぐろ', mean:'tuna',romaji:'maguro'},
        {hiragana:'むし', mean:'insect',romaji:'mushi'},
        {hiragana:'ちょう', mean:'butterfly',romaji:'chou'},
        {hiragana:'くも', mean:'spider',romaji:'kumo'},
        {hiragana:'かい', mean:'shellfish',romaji:'kai'},
        {hiragana:'かいがら', mean:'shell',romaji:'kaigara'},
        {hiragana:'へび', mean:'snake',romaji:'hebi'},
        {hiragana:'きつね', mean:'fox',romaji:'kitsune'},
     ].sort(function() {
        return 0.5 - Math.random();
    });
    
    // Dicas
    // Letras mais dificeis de decorar
    var fuck = [
        'ぬ = nu', 'ね = ne', 'ふ = fu',
        'む = mu', 'め = me', 'る = ru',
        'れ = re', 'ろ = ro', 'わ = wa'
    ];
    for (var f in fuck) {
        $('#mod2level10-tips').append('<div class="col-xs-4">'+fuck[f]+'</div>');
    }
    $('#mod2level10-btn-tips').on('click', function() {
        $('#mod2level10-tips').slideToggle('fast');
        setTimeout(function() {
            $('#mod2level10-tips').slideUp('fast');
        }, 3000);
    });

    var currI = 0;
    var next = false;

    // Aqui mudamos a palavra no começo e depois de acertar
    var change = function() {
        $('#mod2level10-answere').focus();

        $('#mod2level10-answere').val('');

        var hiragana = dic[currI].hiragana;
        var mean = dic[currI].mean;
        var romaji = dic[currI].romaji;

        // Preenche a questao
        $('#mod2level10-question-hiragana').text(hiragana).hide();
        $('#mod2level10-question-mean').text(mean);
        $('#mod2level10-question-romaji').text(romaji).fadeTo(0, 0);
        
        // Avança para o próximo (isso tera efeito apenas depois de acertar)
        currI = (currI < (dic.length-1)) ? currI+1 : 0;

        // Não deixa pular de tela apertando enter
        next = false;
    };

    // Aqui começa a brincadeira
    $('#modalMod2Level10').on('show.bs.modal', function () {
        $('#mod2level10-answere').focus();

        currI = 0;
        change();
    });

    // Ao digitar no teclado o campo sera transformado para romaji
    wanakana.bind(document.getElementById('mod2level10-answere'));

    $('#mod2level10-answere').keyup(function() {
        if ($(this).val() == $('#mod2level10-question-hiragana').text()) {

            // Criamos um link <a> para o proximo item
            var a = $('<a>', {
                'id': 'mod2level10-btn-next',
                'href': 'javascript:void(0);',
                'class': 'btn btn-primary btn-xs',
                'style': 'font-size: 10pt; float: right; margin-top: 10px;'
            }).text('Next one [enter]').on('click', function(e) {
                change();
            });

            // Permite pular de tela apertando enter
            next = true;

            // Limpa primeiro, pois ao tocar no teclado
            // pode acontecer de ficar adicionando sem querer
            $('#mod2level10-answere').val('');

            // Mostra romaji e link para proximo
            $('#mod2level10-question-romaji').fadeTo('fast', 1);
            $('#mod2level10-question-romaji').append(a);
        }
    });

    // Muda de questao ao apertar o 'enter'
    document.addEventListener("keyup", function(e) {
        if (next && e.keyCode == 13) {
            change();

        } else if ($('#mod2level10-answere').val() == '' && e.keyCode == 8) {

            // Ao trocar de pergunta o sistema esconde o hiragana para dificultar
            // e forçar o usuário a tentar lembrar, mas ao apertar back space sem
            // ter respondido ainda ele aparece
            $('#mod2level10-question-hiragana').show();
        }

    }, false);

});

