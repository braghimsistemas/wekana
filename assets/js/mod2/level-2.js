$(function() {
    var symbols = [
        'きゃ => kya', 'きゅ => kyu', 'きょ => kyo',
        'しゃ => sha', 'しゅ => shu', 'しょ => sho',
        'ちゃ => cha', 'ちゅ => chu', 'ちょ => cho',
        'にゃ => nya', 'にゅ => nyu', 'にょ => nyo',
        'ひゃ => hya', 'ひゅ => hyu', 'ひょ => hyo',
        'みゃ => mya', 'みゅ => myu', 'みょ => myo',
        'りゃ => rya', 'りゅ => ryu', 'りょ => ryo',
        'ぎゃ => gya', 'ぎゅ => gyu', 'ぎょ => gyo',
        'じゃ => ja', 'じゅ => ju', 'じょ => jo',
        'びゃ => bya', 'びゅ => byu', 'びょ => byo',
        'ぴゃ => pya', 'ぴゅ => pyu', 'ぴょ => pyo'
    ]

    var currI = 0;
    var change = function() {
        $('#mod2level2-question').text(symbols[currI]);
    }
    
    // Identifica modal aberto
    var modalOpen = false;

    // Ao abrir o modal
    $('#modalMod2Level2').on('show.bs.modal', function () {
        currI = 0;
        change();
        modalOpen = true;
    });

    // Quando fecha o modal
    $('#modalMod2Level2').on('hide.bs.modal', function() {
        modalOpen = false;
    });

    // Previous
    var prev = function() {
        currI--;
        if (currI < 0) currI = (symbols.length-1);
        change();
    };

    // Next
    var next = function() {
        currI++;
        if (currI > (symbols.length-1)) currI = 0;
        change();
    };

    // Ao clicar nos botoes para trocar
    $('button#m2lvl2-prev').on('click', prev);
    $('button#m2lvl2-next').on('click', next);

    document.addEventListener("keyup", function(e) {
        if (e.keyCode == 37) { // <
            prev();
        } else if (e.keyCode == 39) { // >
            next();
        }
    }, false);

});

