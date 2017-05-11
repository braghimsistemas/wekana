$(function() {
    var symbols = [
        {h:'か => が', r:'ka => ga'},
        {h:'き => ぎ', r:'ki => gi'},
        {h:'く => ぐ', r:'ku => gu'},
        {h:'け => げ', r:'ke => ge'},
        {h:'こ => ご', r:'ko => go'},

        {h:'さ => ざ', r:'sa => za'},
        {h:'し => じ', r:'shi => ji'},
        {h:'す => ず', r:'su => zu'},
        {h:'せ => ぜ', r:'se => ze'},
        {h:'そ => ぞ', r:'so => zo'},

        {h:'た => だ', r:'ta => da'},
        {h:'ち => ぢ', r:'chi => dji'},
        {h:'つ => づ', r:'tsu => du'},
        {h:'て => で', r:'te => de'},
        {h:'と => ど', r:'to => do'},
        
        {h:'は => ば', r: 'ha => ba'},
        {h:'ひ => び', r: 'hi => bi'},
        {h:'ふ => ぶ', r: 'fu => bu'},
        {h:'へ => べ', r: 'he => be'},
        {h:'ほ => ぼ', r: 'ho => bo'},

        {h:'は => ぱ', r: 'ha => pa'},
        {h:'ひ => ぴ', r: 'hi => pi'},
        {h:'ふ => ぷ', r: 'fu => pu'},
        {h:'へ => ぺ', r: 'he => pe'},
        {h:'ほ => ぽ', r: 'ho => po'},
    ]

    var currI = 0;
    var change = function() {
        $('#mod2level1-question').text(symbols[currI].h);
        $('#mod2level1-romaji').text(symbols[currI].r);
    }
    
    var modalOpen = false;

    // Ao abrir o modal
    $('#modalMod2Level1').on('show.bs.modal', function () {
        currI = 0;
        change();
        modalOpen = true;
    });

    // fechar o modal
    $('#modalMod2Level1').on('hide.bs.modal', function () {
        modalOpen = false;
    });

    var prev = function() {
        currI--;
        if (currI < 0) currI = (symbols.length-1);
        change();
    };
    var next = function() {
        currI++;
        if (currI > (symbols.length-1)) currI = 0;
        change();
    };

    $('button#m2lvl1-prev').on('click', prev);
    $('button#m2lvl1-next').on('click', next);

    // Ao apertar as setas
    document.addEventListener("keyup", function(e) {
        if (e.keyCode == 37) { // <
            prev();
        } else if (e.keyCode == 39) { // >
            next();
        }
    }, false);
});

