var userinput = ""; // ce que l'utilisateur a tappé
var inputlines = 1;
var toeval = ""; // ce qui va être évalué
var terminalresponse = ""; // la réponse du terminal
var is_mobile = false;

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if( isMobile.any() )
{
    console.log("Mobile détecté");
    alert("cette appli a présentement un problème avec les claviers de smartphone. En attendant, merci d'utiliser un ordinateur de bureau ou n'importe quoi avec un clavier physique.");
    is_mobile = true;
}



// permet de récupérer et d'afficher les touches du clavier saisies par l'utilisateur
function addchar(event) {
    userinput += event.key;
    $(".userinput").html(userinput);
};

// permet de supprimer un caractère avec un appui sur backspace
function delchar(event) {
    userinput = userinput.slice(0, -1);
    $(".userinput").html(userinput);
};

// permet de valider la saisie
function validateinput() {
    var newhistory = $(".input").html();
    newhistory = newhistory.replace('userinput', '');
    newhistory = newhistory.replace('cursor', '');
    newhistory = "<div>" + newhistory + "</div>";
    toeval = userinput;
    userinput = "";
    $(".input").before(newhistory);
    evalinput(toeval); console.log(toeval);
    $('.userinput').html(userinput);
    $(document).scrollTop($(document).height());
    //inputlines = 1;
};

// fonction d'aide de l'utilisateur pour une commande spécifique
function help(arg)
{
    switch(arg)
    {
        case "showcv": terminalresponse = "affiche mon cv en pdf dans un nouvel onglet";
            $(".input").before(terminalresponse);
            break;
        case "whoami": terminalresponse = "\"Connais-toi toi-même et tu connaîtras l'univers et les dieux.\"";
            $(".input").before(terminalresponse);
            break;
        case "apod": terminalresponse = "affiche la photo d'astronomie du jour et quelques infos à son sujet";
            $(".input").before(terminalresponse);
            break;
        /*case "iss_location": terminalresponse = "permet d'afficher la position actuelle de la station spatiale internationale<br>au format JSON (si vous ne savez pas ce que c'est, c'est un format de structure de données standard sur le web... essayez la commande, vous allez comprendre)<br>désactivé car l'API est en http et je suis en https";
            $(".input").before(terminalresponse);
            break;
        case "people_in_space": terminalresponse = "permet d'afficher la liste des personnes actuellement dans l'espace, au format JSON<br>désactivé car l'API est en http et je suis en https";
            $(".input").before(terminalresponse);
            break;*/
        default: terminalresponse = "commande inconnue : '"+arg+"'";
            $(".input").before(terminalresponse);
            break;
    }
};

// fonction d'aide générique qui liste les commandes implémentées
function help_generic()
{
    terminalresponse = $.ajax({
        method: "POST",
        url: "src/ctrl/route.php",
        data: {"input": "help_generic"},
        dataType: "text"
    })
    .done(function(retour){
        console.log(retour);
        $(".input").before(retour);
    });
};

// affiche le cv dans un nouvel onglet
function showcv()
{
    console.log(window.location.pathname);
    window.open(window.location.pathname+"/../public/files/Adrien_Godoy_SoftDev.pdf");
};

// affiche des infos basiques sur le visiteur
function whoami()
{
    terminalresponse = $.ajax({
        method: "POST",
        url: "src/ctrl/route.php",
        data: {"input": "whoami"},
        dataType: "text"
    })
    .done(function(retour){
        console.log(retour);
        $(".input").before(retour);
    });
};

// affiche la position actuelle de l'ISS (désactivé, l'api est en http)
/*function iss_location()
{
    terminalresponse = $.ajax({
        method: "POST",
        url: "src/ctrl/route.php",
        data: {"input": "iss_location"},
        dataType: "text"
    })
    .done(function(retour){
        console.log(retour);
        $(".input").before(retour);
    });
};*/

// affiche la liste des personnes actuellement dans l'espace (désactivé, l'api est en http)
/*function people_in_space()
{
    terminalresponse = $.ajax({
        method: "POST",
        url: "src/ctrl/route.php",
        data: {"input": "people_in_space"},
        dataType: "text"
    })
    .done(function(retour){
        console.log(retour);
        $(".input").before(retour);
    });
};*/

// affiche la photo d'astronomie du jour
function apod()
{
    terminalresponse = $.ajax({
        method: "POST",
        url: "src/ctrl/route.php",
        data: {"input": "apod"},
        dataType: "text"
    })
    .done(function(retour){
        console.log(retour);
        $(".input").before(retour);
    });
};

// affiche la position de l'iss
function where_is_iss()
{
    terminalresponse = $.ajax({
        method: "POST",
        url: "src/ctrl/route.php",
        data: {"input": "where_is_iss"},
        dataType: "text"
    })
    .done(function(retour){
        console.log(retour);
        $(".input").before(retour);
    });
};

function iss_live()
{
    terminalresponse = $.ajax({
        method: "POST",
        url: "src/ctrl/route.php",
        data: {"input": "iss_live"},
        dataType: "text"
    })
    .done(function(retour){
        console.log(retour);
        $(".input").before(retour);
    });
};

function learn_machine_learning()
{
    route("learn_machine_learning");
}

function route(arg)
{
    terminalresponse = $.ajax({
        method: "POST",
        url: "src/ctrl/route.php",
        data: {"input": arg},
        dataType: "text"
    })
    .done(function(retour){
        console.log(retour);
        $(".input").before(retour);
    });    
}

// évalue la saisie utilisateur, détecte les commandes implémentées et lance les fonctions correspondantes
function evalinput(input)
{
    console.log("evalinput");
    var arr = input.split(' ');
    switch(arr[0])
    {
        case "apod": apod();
            break;
        case 'help': 
            if (arr.length > 1)
            {
                help(arr[1]);
            }
            else
            {
                help_generic();
            }
            break;
        case "iss_live": iss_live();
        break;
        case "learn_machine_learning": learn_machine_learning();
        break;
        /*case "iss_location": iss_location();  // désactivé car l'api est en http et pas en https
            break;
        case "people_in_space": people_in_space(); // désactivé car l'api est en http et pas en https
            break;*/
        case 'showcv': showcv();
        break;
        case 'where_is_iss': where_is_iss();
        break;
        case 'whoami': whoami();
        break;
        default: terminalresponse = "commande inconnue : '"+arr[0]+"'";
            $(".input").before(terminalresponse);
            break;
    }
};


// TODO: détecter si c'est un mobile, lancer une fonction différente si c'est le cas
// évalue la touche appuyée et lance les bonnes fonctions en conséquence
$('html').keydown(function (event) {
    console.log("lines : "+inputlines);
    console.log(event.keyCode);
    console.log("length: "+userinput.length);
    /*if(userinput.length == 206 && inputlines == 1)
    {
        userinput += "<br>";
        inputlines++;
    }
    else if ((userinput.length - 206)%252 == 0)
    {
        userinput += "<br>";
        inputlines++;
    }*/
    switch (event.keyCode) {
    case 8:
        delchar(event); // touche backspace
        break;
    case 13:
        validateinput(); // touche entrée
        break;
    case 9: // touche tab
    case 16: // touche shift
    case 17: // touche control
    case 18: // touche altgraph
    case 19: // touche pause
    case 20: // touche caps lock
    case 27: // touche echap
    case 33: // touche pageup
    case 34: // touche pagedown
    case 35: // touche fin
    case 36: // touche home
    case 37: // arrow left
    case 38: // arrow up
    case 39: // arrow right
    case 40: // arrow down
    case 45: // touche insert
    case 91: // touche meta
    case 93: // touche context menu
    case 112: // touche f1
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
    case 123: // touche f12
    case 144: // touche verr num
    case 145: // touche scroll lock
    case 226: // touche <
    case 229:
    case undefined:
        break;
    default:
        if (userinput.length < 145) { // limite la saisie utilisateur à 144 chars
            addchar(event); // autres touches du clavier
        }
        break;
    }
});


/*$(document).change(function(){
    $("#mk_kbd_appear").val('');
    $("#mk_kbd_appear").focus();
});

$(document).click(function(){
    $("mk_kbd_appear").val('');
    $("mk_kbd_appear").focus();
});*/

$(document).on('touchstart', function() {
    $("#mk_kbd_appear").val('');
    $("#mk_kbd_appear").focus();
});