//
// Command: help
//
module.exports = function (controller) {

    controller.hears(["help", "who"], 'direct_message,direct_mention', function (bot, message) {
        var text = "Puedes interactuar con los siguientes comandos:";
        text += "<br/>Desarrollado por Calltech S.A. 2018";
        text += "\n- " + bot.enrichCommand(message, "survey|encuesta") + ": Encuesta de satisfacción";
        text += "\n- " + bot.enrichCommand(message, "help") + ": Ayuda de mis capacidades";

        bot.reply(message, text);
    });
}
