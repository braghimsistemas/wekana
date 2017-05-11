$(function() {
   
    // http://jisho.org

   // Dicionario
   var dic = [
        {hiragana:'おはよう',                    mean:'Good morning',                       romaji:'ohayou'},
        {hiragana:'こんにちわ',                  mean:'Good afternoon',                     romaji:'konnichiwa'},
        {hiragana:'さようなら',                   mean:'Bye',                                romaji:'sayounara'},
        {hiragana:'から',                       mean:'From',                               romaji:'kara'},
        {hiragana:'ます',                       mean:'I will',                             romaji:'masu'},
        {hiragana:'さきやむに',                   mean:'Buda Sakyamuni',                     romaji:'sakyamuni'},
        {hiragana:'おやすみなさい',               mean:'Good night',                         romaji:'oyasuminasai'},
        {hiragana:'またね',                     mean:'See you later',                       romaji:'matane'},
        {hiragana:'きをつけて',                   mean:'Take care',                          romaji:'kiwotsukete'},
        {hiragana:'おなまえは?',                 mean:'What is your name?',                 romaji:'onamaewa'},
        {hiragana:'わたし',                      mean:'Me',                                 romaji:'watashi'},
        {hiragana:'うれしい',                     mean:'I am happy',                         romaji:'ureshii'},
        {hiragana:'おせわになりました',             mean:'Thank you for your help',            romaji:'osewani narimashita'},
        {hiragana:'はい',                       mean:'Yes',                                romaji:'hai'},
        {hiragana:'いいえ',                      mean:'No',                                 romaji:'iie'},
        {hiragana:'わかりました',                  mean:'I understand',                       romaji:'wakarimashita'},
        {hiragana:'あまりうまく',                  mean:'Not very well',                      romaji:'amari umaku'},
        {hiragana:'はなせません',                 mean:'Do not speak',                       romaji:'hanasemasen'},
        {hiragana:'しりません',                   mean:'I don not know',                     romaji:'shirimasen'},
        {hiragana:'すみません',                   mean:'Excuse me',                          romaji:'sumimasen'},
        {hiragana:'ほんと?',                    mean:'Really?',                             romaji:'honto?'},
        {hiragana:'え?',                        mean:'What?',                              romaji:'e?'},
        {hiragana:'もうすこし',                   mean:'Um pouco mais',                      romaji:'mousukoshi'},
        {hiragana:'はなして',                    mean:'Let me go',                          romaji:'hanashite'},
        {hiragana:'せんせい',                    mean:'Teacher',                            romaji:'sensei'},
        {hiragana:'これをもらえますか?',            mean:'Can I have this?',                   romaji:'korewo moraemasuka?'},
        {hiragana:'これを',                      mean:'This',                                romaji:'korewo'},
        {hiragana:'もういいよ',                   mean:'That is enough',                       romaji:'mouiiyo'},
        {hiragana:'なんということを?',              mean:'What do you mean?',                   romaji:'nantoiukotowo'},
        {hiragana:'たのむいよ',                   mean:'I am counting on you',                romaji:'tanomuiyo'},
        {hiragana:'ここ',                        mean:'Aqui',                                romaji:'koko'},
        {hiragana:'ここにある',                    mean:'It is here',                          romaji:'kokoniaru'},
        {hiragana:'したい',                      mean:'Want to',                             romaji:'shitai'},
        {hiragana:'いくら',                       mean:'How much',                            romaji:'ikura'},
        {hiragana:'ありますか',                   mean:'Do you have',                          romaji:'arimasuka'},
        {hiragana:'しめたい',                     mean:'I want to close',                    romaji:'shimetai'},
        {hiragana:'しませんか?',                  mean:'Why do not you?',                   romaji:'shimasenka'},
        {hiragana:'ひのめ',                      mean:'Sunset',                             romaji:'hinome'}
   ].sort(function() {
        return .5 - Math.random();
   });
    
   // Dicas
   // Letras mais dificeis de decorar
   var fuck = [
        'ぬ = nu', 'ね = ne', 'ふ = fu',
        'む = mu', 'め = me', 'る = ru',
        'れ = re', 'ろ = ro', 'わ = wa'
    ];
    for (var f in fuck) {
        $('#mod1level4-tips').append('<div class="col-xs-4">'+fuck[f]+'</div>');
    }
    $('#mod1level4-btn-tips').on('click', function() {
        $('#mod1level4-tips').slideToggle('fast');
        setTimeout(function() {
            $('#mod1level4-tips').slideUp('fast');
        }, 3000);
    });

    var currI = 0;
    var next = false;

    // Aqui mudamos a palavra no começo e depois de acertar
    var change = function() {
        $('#mod1level4-answere').focus();

        $('#mod1level4-answere').val('');

        var hiragana = dic[currI].hiragana;
        var mean = dic[currI].mean;
        var romaji = dic[currI].romaji;

        // Preenche a questao
        $('#mod1level4-question-hiragana').text(hiragana);
        $('#mod1level4-question-mean').text(mean);
        $('#mod1level4-question-romaji').text(romaji).fadeTo(0, 0);
        
        // Avança para o próximo (isso tera efeito apenas depois de acertar)
        currI = (currI < (dic.length-1)) ? currI+1 : 0;

        // Não deixa pular de tela apertando enter
        next = false;
    };

    // Aqui começa a brincadeira
    $('#modalMod1Level4').on('show.bs.modal', function () {
        $('#mod1level4-answere').focus();

        currI = 0;
        change();
    });

    // Ao digitar no teclado o campo sera transformado para romaji
    wanakana.bind(document.getElementById('mod1level4-answere'));

    $('#mod1level4-answere').keyup(function() {
        if ($(this).val() == $('#mod1level4-question-hiragana').text()) {

            // Criamos um link <a> para o proximo item
            var a = $('<a>', {
                'id': 'mod1level4-btn-next',
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
            $('#mod1level4-answere').val('');

            // Mostra romaji e link para proximo
            $('#mod1level4-question-romaji').fadeTo('fast', 1);
            $('#mod1level4-question-romaji').append(a);
        }
    });

    // Muda de questao ao apertar o 'enter'
    document.addEventListener("keyup", function(e) {
        if (next && e.keyCode == 13) change();
    }, false);

});

