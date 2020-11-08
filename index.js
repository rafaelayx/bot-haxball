var room = HBInit({
    roomName: " Futsal x3 ",
    maxPlayers: 13,
    noPlayer: true,
    public: false,
    geo: {code: 'br', lat: -23, lon: -46}
          })






// variáveis
{

var playermutado = ""
var playerdesmutado = ""
var streakplayer = []


// cores
var amarelo = 0xFFC766
var vermelho = 0xC94C40
var azul = 0x0066CC
var verde = 0x29A329
var corceo = 0xd24dff
var dantcor = 0x3AC6C6
var pvcor = 0x5cd65c
var pvcor2 = 0x248f24
        

//stats
var stats = []
var mutePlayer = []
var maiorID = 0

var discord = ""


var admafk1
var numregistro = 0

var whileGame = 0
var contafk = []
var jogoPausado = 0

var tempoadm = 30


// ranking
var top1aut, top2aut, top3aut
var top1cor = 0xFFD700
var top2cor = 0xBFBFBF //D5D5D5
var top3cor = 0xCD7F32


// gametick
var ativo = 0;
var trancada = 0;
var bandeirared = 0
var pegadorred
var pegadorblue
var auxred = 0
var auxblue = 0
var bandeirablue = 0
var placarred = 0
var placarblue = 0
var admson = 0
var admspresentes = 0
var comandoafk = 0
var pegosred = 0
var pegosblue = 0
var cdpegos = 0
var pegos = []



var duplicatePlayer = []
var namePlayer = []
var salamutada = 0


// ranking
var top1aut, top2aut, top3aut
var top1cor = 0xFFD700
var top2cor = 0xBFBFBF //D5D5D5
var top3cor = 0xCD7F32
var posrank = []
var nomeRank1
var nomeRank2
var nomeRank3


//senhas
var senhamod = "!senha"
var senhaceo = "!senha"


// cargos
var moderadores = []
var ceos = []
var countmod = 0
var countceo = 0


// sistema de login
var login = []
var registro = []
var autlogin = []
var confirmar = []
var senha = []
var senha2 = []
var numlogin = 0



var usuariosativos2
var usuariosafk = []
var playerAfk = []
var autentica = []
var gameStarted

chatplayer = []
pvplayer = []


}

var last_toucher;
var second_toucher;
var team_name = team => team == 1 ? "Blue" : "Red";
var isOwnGoal = (team, player) => team != player.team ? " (gol contra)" : "";
var floor = s => s < 10 ? "0" + s : s;
var playerTouchedTwice = playerList => playerList[0].team == playerList[1].team ? " (assistência de " + playerList[1].name + ")" : "";
var init = "init";
init.id = 0;
var scorers;
var whoTouchedLast;
var whoTouchedBall = [init, init];
var radiusBall = 10;
var triggerDistance = radiusBall + 15 + 0.1;

// configuração da sala
{
room.setTimeLimit(3);
room.setScoreLimit(3);
room.setTeamsLock(true);
room.setTeamColors(1, 50, 0xFFFFFF, [0xFF4133, 0xED0000, 0x570404]);
room.setTeamColors(2, 310, 0xFFFFFF, [0x40ACFF, 0x062F77, 0x020033]);
}



// funções room.on
{
room.onPlayerJoin = function(player)
{
msg = ""

room.sendAnnouncement("👍 Seja bem vindo à sala oficial da Futsal Bang Bang! ⚽", player.id, verde, "bold", 0);


chatplayer[player.id] = 0
pvplayer[player.id] = [{name:0,id:0},{name:0,id:0},{name:0,id:0}]

var found5 = moderadores.find(element => element == player.auth);
var found6 = ceos.find(element => element == player.auth);

if(found6 != undefined)
{
    msg += "👑 O CEO "
    room.setPlayerAdmin(player.id, true)
    msg += player.name
    room.sendAnnouncement(msg + " entrou na sala.", null, corceo, "bold", 2);
}
    
else if(found5 != undefined)
{
    msg += "👑 O moderador "
    room.setPlayerAdmin(player.id, true)
    msg += player.name
    room.sendAnnouncement(msg + " entrou na sala.", null, azul, "bold", 2);
}

contafk[player.id] = 0
updateAdmins()
autentica[player.id] = player.auth

//maiorID = player.id
maiorID++

playerAfk[player.id] = 0

if(duplicatePlayer[autentica[player.id]] != undefined)
    duplicatePlayer[autentica[player.id]]++

else
    duplicatePlayer[autentica[player.id]] = 1

if(duplicatePlayer[autentica[player.id]] == 2)
{
    for(i=0; i<room.getPlayerList().length; i++)
    {
        if((autentica[room.getPlayerList()[i].id] == autentica[player.id]) && (room.getPlayerList()[i].id != player.id))
            room.kickPlayer(room.getPlayerList()[i].id, "Você reentrou na sala.", false);

    }

}

if(mutePlayer[player.auth] == undefined)
    mutePlayer[player.auth] = 0;




}

room.onPlayerChat = function(player,message)
{

if(chatplayer[player.id] == 1 && message.slice(0,1) != "!")
{
    if(pvplayer[player.id][0].id != 0)
        room.sendAnnouncement("[Time] " + player.name + ": " + message, pvplayer[player.id][0].id, pvcor, "bold", 0);

    if(pvplayer[player.id][1].id != 0)
        room.sendAnnouncement("[Time] " + player.name + ": " + message, pvplayer[player.id][1].id, pvcor, "bold", 0);

    if(pvplayer[player.id][2].id != 0)
        room.sendAnnouncement("[Time] " + player.name + ": " + message, pvplayer[player.id][2].id, pvcor, "bold", 0);

    return false
}


var mod = 0
var moderador = 0

var ehmoderador = moderadores.find(element => element == autentica[player.id]);
var ehceo = ceos.find(element => element == autentica[player.id]);

if(ehceo != undefined)
    mod = 1

if(ehmoderador != undefined)
    moderador = 1

    // chat
{

    if(message == "!removeadms")
    {
        if(mod == 1)
        {
            removeAdmins()
        }
    }
    
    if(message == "!time")
    {
        if(player.team != 0)
        {
            var usuario = room.getPlayerList()

            for(i=0; i<usuario.length; i++)
            {
                if(usuario[i].team == player.team)
                {
                    chatplayer[player.id] = 1
                    
                    if(pvplayer[player.id][0].id == 0)
                        pvplayer[player.id][0] = {name:usuario[i].name, id:usuario[i].id}

                    else if(pvplayer[player.id][1].id == 0)
                        pvplayer[player.id][1] = {name:usuario[i].name, id:usuario[i].id}

                    else if(pvplayer[player.id][2].id == 0)
                        pvplayer[player.id][2] = {name:usuario[i].name, id:usuario[i].id}
                }
            }

            if(chatplayer[player.id] == 1)
            {
                room.sendAnnouncement("🔒 Você entrou no modo Chat de Time. Suas mensagens serão repassadas para o seu time.", player.id, corceo, "bold", 2);
                room.sendAnnouncement("Para voltar ao modo Chat Geral, digite !geral", player.id, verde, "bold", 0);
            }

            else
            {
                room.sendAnnouncement("❌ Esse jogador não existe.", player.id, vermelho, "bold", 0);
            }
        }

        else
        {
            room.sendAnnouncement("❌ Você não está jogando.", player.id, vermelho, "bold", 2);

        }

        return false
    }

    if(message == "!geral")
    {
        if(chatplayer[player.id] == 1)
        {
            chatplayer[player.id] = 0
            pvplayer[player.id] = [{name:0,id:0},{name:0,id:0},{name:0,id:0}]

            room.sendAnnouncement("✔️ Você entrou no modo Chat Geral.", player.id, verde, "bold", 0);
        }

        else
        {
            room.sendAnnouncement("❌ Você já está no modo Chat Geral.", player.id, vermelho, "bold", 0);
        }

        return false
    }

    if(message.substr(0, 6) == "!disc ")
    {
        if(mod == 1)
            discord = message.substr(6)

        else
            room.sendAnnouncement("❌ Apenas moderadores podem utilizar esse comando.", player.id, 0xffd633, "bold", 2);

        return false
    }

    
    if(mutePlayer[player.name] == 1)
    {
        room.sendAnnouncement("❌ Você está temporariamente silenciado.", player.id, vermelho, "bold", 2);

        return false
    }

    if(salamutada == 1 && mod == 0)
        return false
        
    if(message == senhamod)
    {
        moderadores.push(autentica[player.id])
        room.setPlayerAdmin(player.id, 1)
        room.sendAnnouncement("👑 " + player.name + " agora é um moderador do Futsal Bang Bang !", null, dantcor, "bold", 2);
        countmod++

        return false
    }

    if(message == senhaceo)
    {
        ceos.push(autentica[player.id])
        room.setPlayerAdmin(player.id, 1)
        room.sendAnnouncement("👑 " + player.name + " agora é um CEO da Futsal Bang Bang!", null, corceo, "bold", 2);
        countceo++

        return false
    }

    if(message == "!resetmods")
    {
        if(mod == 1)
        {
            moderadores = []
            room.sendAnnouncement("👑 O CEO " + player.name + " removeu todos os moderadores.", null, corceo, "bold", 2);
        }

        return false
    }

    if(message == "!resetcounts")
    {
        if(mod == 1)
        {
            countmod = 0
            countceo = 0
        }

        return false
    }

    if(message.substr(0,10)=="!senhamod ")
    {
        if(mod == 1)
        {
            senhamod = "!" + message.substr(10)
            room.sendAnnouncement("A nova senha para MODs é " + senhamod, player.id, verde, "normal", 1);
        }

        return false
    }

    if(message.substr(0,10)=="!senhaceo ")
    {
        if(mod == 1)
        {
            senhamod = "!" + message.substr(10)
            room.sendAnnouncement("A nova senha para CEOs é " + senhaceo, player.id, verde, "normal", 1);
        }

        return false
    }

    if(message == "!admafk" && comandoafk == 0)
    {
        admson = 0
        admspresentes = 0
        comandoafk = 1

        for(i=0; i<room.getPlayerList().length; i++)
        {
            if(room.getPlayerList()[i].admin == 1)
                admson++
        }

        room.sendAnnouncement("🚨 " + player.name + " solicitou a confirmação da presença dos administradores.", null, top3cor, "bold", 0);
        room.sendAnnouncement("🚨 Os administradores tem 30 segundos para digitar !presente", null, top3cor, "bold", 2);

        admafk1 = setTimeout(admafk, 30000)
        admaviso1 = setInterval(admaviso, 5000)
        setTimeout(cooldown, 600000)

    }

    if(message == "!presente" && player.admin == 1 && comandoafk == 1)
    {
        room.sendAnnouncement("✔️ " + player.name + " está presente!", null, verde, "bold", 1);
        clearInterval(admafk1)
        clearInterval(admaviso1)
        tempoadm = 30
    }

    if(message == "!rr")
    {
        if(mod == 1)
        {
            room.stopGame()
            room.startGame()
            room.pauseGame(1)
            room.pauseGame(0)

            room.sendAnnouncement("⌛️ O moderador " + player.name + " reiniciou a partida.", null, amarelo, "bold", 1);
        }

        else
            room.sendAnnouncement("❌ Apenas moderadores podem utilizar esse comando.", player.id, 0xffd633, "bold", 2);

        return false
    }

        
//          -------------------------------------------------------------------------------------------------------
{
        if(moderador == 1 && mod == 0 && message.substr(0,1)!="!")
        {
            room.sendAnnouncement("[𝕄𝕆𝔻] " + player.name + ": " + message, null, dantcor, "normal", 1);
            return false
        }
        
        if(mod == 1 && message.substr(0,1)!="!")
        {
            room.sendAnnouncement("[ℂ𝔼𝕆] " + player.name + ": " + message, null, corceo, "normal", 1);
            return false
        }

        if(mod == 0 && player.name == nomeRank1 && message.substr(0,1)!="!")
        {
            room.sendAnnouncement("🏆 [𝕋𝕆ℙ 𝟙] " + player.name + ": " + message, null, top1cor, "normal", 1);
            return false
        }
        
        if(mod == 0 && player.name == nomeRank2 && message.substr(0,1)!="!")
        {
            room.sendAnnouncement("🏆 [𝕋𝕆ℙ 𝟚] " + player.name + ": " + message, null, top2cor, "normal", 1);
            return false
        }
        
        if(mod == 0 && player.name == nomeRank3 && message.substr(0,1)!="!")
        {
            room.sendAnnouncement("🏆 [𝕋𝕆ℙ 𝟛] " + player.name + ": " + message, null, top3cor, "normal", 1);
            return false
        }

}
//          -------------------------------------------------------------------------------------------------------
        


        if(message == "!bb")
        {
            room.kickPlayer(player.id, "Volte sempre!", false);
            return false
        }
        
        
        if(message == "!clear")
        {
            if(mod == 1 || moderador == 1)
            {
                room.clearBans();
                room.sendAnnouncement("✔️ " + player.name + " desbaniu todos os jogadores.", null, verde, "bold", 2);
            }

            else
                room.sendAnnouncement("❌ Apenas moderadores podem utilizar esse comando.", player.id, vermelho, "bold", 2);

            return false
        }
        

        if(message.substr(0,7)=="!mutar ")
        {
            if(moderador == 1 || mod == 1)
            {
                var indexPlayer = -1

                for(var a=0; a<room.getPlayerList().length; a++)
                    if(message.substr(7)==room.getPlayerList()[a].name)
                        indexPlayer = a;

                if(indexPlayer != -1)
                {
                    if(mutePlayer[room.getPlayerList()[indexPlayer].name] == 1)
                        room.sendAnnouncement("❌ " + message.substr(7) + " já está silenciado.", player.id, amarelo, "bold", 2);

                    
                    else
                    {
                        var ehmoderador1 = moderadores.find(element => element == room.getPlayerList()[indexPlayer].name);
                        var ehceo1 = ceos.find(element => element == room.getPlayerList()[indexPlayer].name);

                        if((ehmoderador1 == undefined && ehceo1 == undefined) || mod == 1)
                        {
                            mutePlayer[room.getPlayerList()[indexPlayer].name] = 1
                            room.sendAnnouncement("❌ " + player.name + " silenciou " + message.substr(7), null, vermelho, "bold", 2);
                        }

                        else
                        {
                            room.sendAnnouncement("❌ Você não pode silenciar um moderador.", player.id, vermelho, "bold", 2);
                        }
                    }
                }

                else
                    room.sendAnnouncement("❌ Nome inválido.", player.id, vermelho, "bold", 2);
            }

            else
                room.sendAnnouncement("❌ Apenas moderadores podem utilizar esse comando.", player.id, vermelho, "bold", 2);

            return false
        }

        if(message.substr(0,10)=="!desmutar ")
        {
            if(moderador == 1 || mod == 1)
            {
                var indexPlayer = -1

                for(var a=0; a<room.getPlayerList().length; a++)
                    if(message.substr(10)==room.getPlayerList()[a].name)
                        indexPlayer = a;

                if(indexPlayer != -1)
                {
                    if(mutePlayer[room.getPlayerList()[indexPlayer].name] == 0)
                        room.sendAnnouncement("❌ " + message.substr(10) + " não está silenciado.", player.id, amarelo, "bold", 2);
                
                    else
                    {
                        mutePlayer[room.getPlayerList()[indexPlayer].name] = 0
                        room.sendAnnouncement("✔️ " + message.substr(10) + " agora pode falar.", null, verde, "bold", 2);
                    }
                }

                else
                    room.sendAnnouncement("❌ Nome inválido.", player.id, vermelho, "bold", 2); 
            }

            else
                room.sendAnnouncement("❌ Apenas moderadores podem utilizar esse comando.", player.id, vermelho, "bold", 2);

            return false
        }


        if(message == "!mutarsala")
        {
            if(mod == 1)
            {
                salamutada = 1

                room.sendAnnouncement("❌ A sala foi silenciada.", null, vermelho, "bold", 2);
            }

            else
                room.sendAnnouncement("❌ Apenas moderadores podem utilizar esse comando.", player.id, vermelho, "normal", 2);

            return false
        }


        if(message == "!desmutarsala")
        {
            if(mod == 1)
            {
                salamutada = 0

                room.sendAnnouncement("✔️ Agora todos podem falar.", null, verde, "bold", 2);
            }

            else
                room.sendAnnouncement("❌ Apenas moderadores podem utilizar esse comando.", player.id, vermelho, "normal", 2);

            return false
        }


        if(message == "!comandos")
        {
            if(mod == 1)
            {
                room.sendAnnouncement("!clear > desbane todos os jogadores", player.id, verde, "normal", 0);
                room.sendAnnouncement("!mutar NOME > silencia um jogador", player.id, verde, "normal", 0);
                room.sendAnnouncement("!desmutar NOME > permite que o jogador volte a falar", player.id, verde, "normal", 0);
                room.sendAnnouncement("!mutarsala > silencia a sala, com exceção dos moderadores", player.id, amarelo, "normal", 0);
                room.sendAnnouncement("!desmutarsala > permite que a sala volte a falar", player.id, amarelo, "normal", 0);
                room.sendAnnouncement("!kickall > expulsa todos os jogadores, com exceção dos moderadores", player.id, amarelo, "normal", 0);
                room.sendAnnouncement("!disc LINK > altera o link do !discord", player.id, vermelho, "normal", 0);
            }

            else
                room.sendAnnouncement("❌ Apenas moderadores podem utilizar esse comando.", player.id, vermelho, "normal", 2);

            return false
        }

        if(message == "!ajuda")
        {
            room.sendAnnouncement("!discord > link do discord da Rouba Bandeira League", player.id, amarelo, "bold", 0);
            room.sendAnnouncement("!afk > fica ausente e não pode ser escolhido para jogar", player.id, amarelo, "bold", 0);
            room.sendAnnouncement("!bb > é kickado da sala", player.id, amarelo, "bold", 0);
            return false
        }
        
        if(message == "!afk")
        {
            if(player.team == 0)
            {
                if(playerAfk[player.id] == 0)
                {
                    playerAfk[player.id] = 1;
                    room.sendAnnouncement("💤 " + player.name + " agora está ausente.", null, vermelho, "bold", 1);
                }

                else if(playerAfk[player.id] == 1)
                {
                    playerAfk[player.id] = 0;
                    room.sendAnnouncement("✔️ " + player.name + " não está mais ausente.", null, verde, "bold", 1);
                }
            }

            else
            {
                room.sendAnnouncement("💤 " + player.name + " agora está ausente.", null, vermelho, "bold", 1);
                room.setPlayerTeam(player.id, 0)
                playerAfk[player.id] = 1;
                room.pauseGame(1)

                if(pegadorred == player.id)
                {
                    auxred = 0
                    bandeirared = 0
                }

                if(pegadorblue == player.id)
                {
                    auxblue = 0
                    bandeirablue = 0
                }

                const found8 = pegos.find(element => element.id == player.id);

                if(found8 != undefined)
                {
                    function nspec1(value)
                    {
                        return value.id != player.id;
                    }
                    
                    pegos = pegos.filter(nspec1)
                }


                //if()
            }

            return false
        }

        if(message.substr(0,3) == "!pw")
        {
            if(mod == 1)
            {
                if(message.length > 4)
                {
                    trancada = 1
                    room.sendAnnouncement("🔐 A sala foi trancada.", null, vermelho, "bold", 2);
                    room.sendAnnouncement("Senha: " + message.substr(4), player.id, amarelo, "normal", 2);
                    room.setPassword(message.substr(4));
                }

                else
                {
                    trancada = 0
                    room.sendAnnouncement("🔓 A sala foi reaberta.", null, verde, "bold", 2);
                    room.setPassword(null);
                }
            }

            else
                room.sendAnnouncement("❌ Apenas moderadores podem utilizar esse comando.", player.id, vermelho, "normal", 2);

            return false
        }
        
        
        if(message == "!kickall")
        {
            if(mod == 1)
            {
                for(i=0; i<room.getPlayerList().length; i++)
                {
                    var ehmoderador = moderadores.find(element => element == room.getPlayerList()[i].name);

                    if(ehmoderador == undefined)
                        room.kickPlayer(room.getPlayerList()[i].id, "O administrador da sala kickou todos os jogadores. :)", false);

                }
            }
            
            return false
        }
        
        if(message == "!discord")
        {
            room.sendAnnouncement("🏴 Rouba Bandeira League: " + discord, player.id, verde, "bold", 0);

            return false;
        }
}

if(message.slice(0,1) == "!")
    return false

}



room.onGamePause = function()
{
jogoPausado = 1
}

room.onGameUnpause = function()
{
jogoPausado = 0
}


room.onGameStart = function()
{
whileGame = 1
room.pauseGame(1)
room.pauseGame(0)

room.sendAnnouncement("🏴 O jogo está prestes a começar!", null, verde, "bold", 2);
}

room.onGameStop = function()
{
whileGame = 0
jogoPausado = 0
}

room.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer)
{
var ehmoderador = moderadores.find(element => element == autentica[kickedPlayer.id]);
var ehceo = ceos.find(element => element == autentica[kickedPlayer.id]);

if(byPlayer != null)
{
    var mod = ceos.find(element => element == autentica[byPlayer.id]);

    if((ehmoderador != undefined || ehceo != undefined) && mod == undefined)
    {
        room.kickPlayer(byPlayer.id, "Você não pode expulsar ou banir membros da moderação.", 0)

        if(ban)
        {
            room.clearBan(kickedPlayer.id)
        }
    }
}
}

room.onGameTick = function()
{

whoTouchedLast = getLastTouchTheBall(whoTouchedLast);

if (whoTouchedLast != undefined && whoTouchedLast.id != whoTouchedBall[0].id)
{
    whoTouchedBall[1] = whoTouchedBall[0];
    whoTouchedBall[0] = whoTouchedLast; // last player who touched the ball
}

room.onTeamGoal = function(team)
{
    updatePlayerList();

    var ownGoal = isOwnGoal(team, whoTouchedBall[0]);
    var assist = "";

    var autor = whoTouchedBall[0].name


    if(ownGoal == "")
        assist = playerTouchedTwice(whoTouchedBall);

    if(team == 1)
    {
        team_name = "Blue"
    }

    else
    {
        team_name = "Red"
    }

    room.sendAnnouncement("⚽ GOOOOOL! " + autor + ownGoal + " marcou"
    + assist + " contra o " + team_name + "!", null, verde, "bold", 1);
    
    assist = ""

    whoTouchedBall = [init, init];
    whoTouchedLast = undefined;

    
}

}


room.onPlayerActivity = function(player)
{
}



room.onPlayerLeave = function(player)
{
playerAfk[player.id] = 0

duplicatePlayer[autentica[player.id]]--

if(player.team != 0)
{
    room.pauseGame(1)
}

updateAdmins()

}


room.onStadiumChange = function(newStadiumName)
{
if(newStadiumName != "Futsal x3")
{
    room.setCustomStadium(stadiumFileText);
    room.sendAnnouncement("O mapa não pode ser alterado!", null, vermelho, "normal", 2);
}
}


room.onPlayerTeamChange = function(player)
{
contafk[player.id] = 0
}


}

// funções artificiais
{
function updateAdmins()
{
    var players = room.getPlayerList().filter((player) => player.id != 0 );
    if ( players.length == 0 ) return;
    if ( players.find((player) => player.admin) != null ) return;
    room.setPlayerAdmin(players[0].id, true);
}

function admafk()
{
    for(i=0; i<room.getPlayerList().length; i++)
    {
        if(room.getPlayerList()[i].admin == 1)
            room.kickPlayer(room.getPlayerList()[i].id, "Você não pode ficar ausente como administrador!", 0)
    }

    clearInterval(admaviso1)
    tempoadm = 30

    updateAdmins()
}

function cooldown()
{
    comandoafk = 0

    clearInterval(admaviso1)
    tempoadm = 30
}

function anuncio()
{
    room.sendAnnouncement("🏴  Futsal Bang Bang: " + "discord.gg/JqbhVAdJ", null, verde, "bold", 2);
    room.sendAnnouncement("Caso algum administrador esteja ausente, digite !admafk", null, azul, "bold", 0);
}

function avisopv()
{
    room.sendAnnouncement("Para abrir o chat de time, digite !time. Se quiser sair desse modo, digite !geral", null, pvcor, "bold", 2);
}

setInterval(avisopv, 180000)

function admaviso()
{
    tempoadm -= 5
    room.sendAnnouncement("🚨 Os administradores têm " + tempoadm + " segundos para digitar !presente", null, top3cor, "bold", 2);
}

function verificaafklist()
{
    var afklist = []

    for(i=1; i<playerAfk.length; i++)
    {
        if(playerAfk[i] == 1)
            afklist.push(i)
    }

    if(afklist.length >= 3)
    {
        room.kickPlayer(afklist[0], "Você não pode ficar ausente por muito tempo!", 0)
    }

    function nspec4(value)
    {
        return value != afklist[0];
    }

    afklist = afklist.filter(nspec4)

}

function updatePlayerList()
{
    usuariosativos = room.getPlayerList()

    function testando(x,y)
    {
        if(x.team > y.team)
            return -1;
            
        else if(x.team < y.team) 
            return 1;
    }

    usuariosativos.sort(testando);
}

function removeAdmins()
{
    for(i=0; i<room.getPlayerList().length; i++)
    {
        var found5 = moderadores.find(element => element == room.getPlayerList()[i].name);
        var found6 = ceos.find(element => element == room.getPlayerList()[i].name);

        if(room.getPlayerList()[i].admin == 1 && found5 == undefined && found6 == undefined)
        {
            room.setPlayerAdmin(room.getPlayerList()[i].id, 0)
        }
    }

    room.sendAnnouncement("Todos os administradores foram removidos.", null, verde, "bold", 2);
}
}


// intervalos/timeouts
{
setInterval(verificaafklist, 10000)
setInterval(anuncio, 240000);
}


function pointDistance(p1, p2)
{
var d1 = p1.x - p2.x;
var d2 = p1.y - p2.y;
return Math.sqrt(d1 * d1 + d2 * d2);
}

function getLastTouchTheBall(lastPlayerTouched)
{
var ballPosition = room.getBallPosition();
var players = room.getPlayerList();

for(var i = 0; i < players.length; i++)
    if(players[i].position != null)
    {
        var distanceToBall = pointDistance(players[i].position, ballPosition);

        if(distanceToBall < triggerDistance)
            lastPlayerTouched = players[i];
    }

return lastPlayerTouched;
}
