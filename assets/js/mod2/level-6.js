$(function() {
    // https://en.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words
    // http://www.openxrest.com/translatejs/

    // Dicionario
    var dic = [

        // Pessoa
        {hiragana:'にんげん', mean:'human', romaji:'ningen'},
        {hiragana:'じんるい', mean:'humanity',romaji:'jinrui'},
        {hiragana:'ひと', mean:'person',romaji:'hito'},
        {hiragana:'おとこ', mean:'male',romaji:'otoko'},
        {hiragana:'おとこのひと', mean:'man',romaji:'otokonohito'},
        {hiragana:'おとこのこ', mean:'boy',romaji:'otokonoko'},
        {hiragana:'おんな', mean:'female',romaji:'onna'},
        {hiragana:'おんなのひと', mean:'woman',romaji:'onnanohito'},
        {hiragana:'おんなのこ', mean:'girl',romaji:'onnanoko'},
        {hiragana:'あかちゃん', mean:'baby',romaji:'akachan'},
        {hiragana:'わかもの', mean:'youth, young person',romaji:'wakamono'},
        {hiragana:'わたし', mean:'I, myself',romaji:'watashi'},
        {hiragana:'ぼく', mean:'I, myself (male)',romaji:'boku'},
        {hiragana:'おれ', mean:'I, myself (male informal)',romaji:'ore'},
        {hiragana:'あたし', mean:'I, myself (female)',romaji:'atashi'},
        {hiragana:'しょうじょ', mean:'girl',romaji:'shoujo'},
        {hiragana:'しょうねん', mean:'boy',romaji:'shounen'},
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
        $('#mod2level6-tips').append('<div class="col-xs-4">'+fuck[f]+'</div>');
    }
    $('#mod2level6-btn-tips').on('click', function() {
        $('#mod2level6-tips').slideToggle('fast');
        setTimeout(function() {
            $('#mod2level6-tips').slideUp('fast');
        }, 3000);
    });

    var currI = 0;
    var next = false;

    // Aqui mudamos a palavra no começo e depois de acertar
    var change = function() {
        $('#mod2level6-answere').focus();

        $('#mod2level6-answere').val('');

        var hiragana = dic[currI].hiragana;
        var mean = dic[currI].mean;
        var romaji = dic[currI].romaji;

        // Preenche a questao
        $('#mod2level6-question-hiragana').text(hiragana).hide();
        $('#mod2level6-question-mean').text(mean);
        $('#mod2level6-question-romaji').text(romaji).fadeTo(0, 0);
        
        // Avança para o próximo (isso tera efeito apenas depois de acertar)
        currI = (currI < (dic.length-1)) ? currI+1 : 0;

        // Não deixa pular de tela apertando enter
        next = false;
    };

    // Aqui começa a brincadeira
    $('#modalMod2Level6').on('show.bs.modal', function () {
        $('#mod2level6-answere').focus();

        currI = 0;
        change();
    });

    // Ao digitar no teclado o campo sera transformado para romaji
    wanakana.bind(document.getElementById('mod2level6-answere'));

    $('#mod2level6-answere').keyup(function() {
        if ($(this).val() == $('#mod2level6-question-hiragana').text()) {

            // Criamos um link <a> para o proximo item
            var a = $('<a>', {
                'id': 'mod2level6-btn-next',
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
            $('#mod2level6-answere').val('');

            // Mostra romaji e link para proximo
            $('#mod2level6-question-romaji').fadeTo('fast', 1);
            $('#mod2level6-question-romaji').append(a);
        }
    });

    // Muda de questao ao apertar o 'enter'
    document.addEventListener("keyup", function(e) {
        if (next && e.keyCode == 13) {
            change();

        } else if ($('#mod2level6-answere').val() == '' && e.keyCode == 8) {

            // Ao trocar de pergunta o sistema esconde o hiragana para dificultar
            // e forçar o usuário a tentar lembrar, mas ao apertar back space sem
            // ter respondido ainda ele aparece
            $('#mod2level6-question-hiragana').show();
        }

    }, false);

});

