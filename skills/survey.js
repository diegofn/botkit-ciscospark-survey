//
// Survey: Example of a conversation with a menu that loops until explicitly stopped
//
module.exports = function (controller) {

    controller.hears(['survey|encuesta'], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            var welcome = "#Beyond Logic 2018: The Network Intuitive";
            welcome += "\n##Su opinión es importante para nosotros, por eso lo invitamos a participar de esta encuesta de servicio y percepción de nuestro evento: La Red Intuitiva -  Cisco"
            welcome += "\nDeseas contestar nuestra encuesta? (escribe si o no)";
            
            convo.ask(welcome, [
                {
                    pattern: '^si|s',
                    callback: function (response, convo) {
                        
                        convo.say("Gracias, su opinión es muy importante para nosotros");

                        //
                        // First question
                        //
                        question_email = "¿Cuál es tu dirección de correo electrónico?"
                        convo.ask(question_email , function (response, convo) {
                            survey_email = response.text;
                            convo.next();
                        });

                        //
                        // Second question
                        //
                        question_topics = "¿Qué le llamó la atención de la presentación de Red Intuitiva?"
                        convo.ask(question_topics , function (response, convo) {
                            survey_topics = response.text;
                            convo.next();
                        });

                        //
                        // Third question
                        //
                        question_renewal = "Su compañía está en proceso de renovación de red LAN?"
                        convo.ask(question_renewal , function (response, convo) {
                            survey_renewal = response.text;
                            convo.next();
                        });

                        //
                        // Fourth question
                        //
                        question_description = "¿En qué consiste el Proyecto?"
                        convo.ask(question_description, function (response, convo) {
                            survey_description = response.text;
                            convo.next();
                        });

                        //
                        // Fourth question
                        //
                        question_contact = "¿Quién es el contacto Decisor del Proyecto?"
                        convo.ask(question_contact, function (response, convo) {
                            survey_contact = response.text;
                            convo.next();
                        });

                        //
                        // Fifth question
                        //
                        question_budget = "¿Cúal es el presupuesto asignado para este proyecto?"
                        convo.ask(question_budget, function (response, convo) {
                            survey_budget = response.text;
                            convo.next();
                        });

                        //
                        // sixth question
                        //
                        question_experience = "¿Cómo fue su experiencia en el evento La Red Intuitiva CISCO?"
                        convo.ask(question_experience, function (response, convo) {
                            survey_experience = response.text;
                            convo.next();
                        });
                        
                        //
                        // Seventh question
                        //
                        convo.ask("Entre 1 y 5, ¿Cómo califica a los expositores?", [
                            {
                                pattern: "1|2|3|4|5",
                                callback: function (response, convo) {
                                    survey_evaluation = response.text;
                                    convo.next();
                                }
                            }
                            , {
                                default: true,
                                callback: function (response, convo) {
                                    convo.say("Lo siento, la respuesta debe ser un valor entre 1 y 5");
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        //
                        // Eighth question
                        //
                        convo.ask("Entre 1 y 5, ¿Cómo califica el evento en general??", [
                            {
                                pattern: "1|2|3|4|5",
                                callback: function (response, convo) {
                                    survey_evaluation_general = response.text;
                                    convo.next();
                                }
                            }
                            , {
                                default: true,
                                callback: function (response, convo) {
                                    convo.say("Lo siento, la respuesta debe ser un valor entre 1 y 5");
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        //
                        // sixth question
                        //
                        question_suggest = "Sugerencias y/u observaciones"
                        convo.ask(question_suggest, function (response, convo) {
                            survey_suggest = response.text;

                            convo.say('Muchas gracias! Si deseas realizar la encuesta nuevamente escribe **survey** o **encuesta**');

                            console.log('1. Cool, I like ' + survey_email + ' too!');
                            console.log('2. Cool, I like ' + survey_topics + ' too!');  
                            console.log('3. Cool, I like ' + survey_renewal + ' too!');  
                            console.log('4. Cool, I like ' + survey_description + ' too!');
                            console.log('5. Cool, I like ' + survey_contact + ' too!');
                            console.log('6. Cool, I like ' + survey_budget + ' too!');
                            console.log('6. Cool, I like ' + survey_experience + ' too!');

                            if (survey_evaluation){
                                console.log('8. Cool, I like ' + survey_evaluation + ' too!');
                            } 
                            else{
                                survey_evaluation = 0;
                            }

                            if (survey_evaluation_general){
                                console.log('9. Cool, I like ' + survey_evaluation_general + ' too!');
                            }
                            else{
                                survey_evaluation_general = 0;
                            } 
                            
                            console.log('10. Cool, I like ' + survey_suggest + ' too!');      

                            //
                            // Append the result to flat file
                            //
                            var fs = require('fs')
                            var logger = fs.createWriteStream('responses.txt', {
                              flags: 'a' // 'a' means appending (old data will be preserved)
                            })
                            
                            logger.write( survey_email + "," );
                            logger.write( survey_topics + "," );
                            logger.write( survey_renewal + "," );
                            logger.write( survey_description + "," );
                            logger.write( survey_contact + "," );
                            logger.write( survey_budget + "," );
                            logger.write( survey_experience + "," );
                            logger.write( survey_evaluation + "," );
                            logger.write( survey_evaluation_general + "," );
                            logger.write( survey_suggest + "" );
                            logger.write('\n'); // EOL

                            convo.next();
                        });

                        convo.next();
                    },
                }
                , {
                    pattern: "no|s",
                    callback: function (response, convo) {
                        var goodbye_message = "Gracias por tu respuesta, en cualquier momento puedes escribir survey para contestar la encuestas o ";
                        goodbye_message += "https://docs.google.com/forms/d/e/1FAIpQLSf-tQOc3AHUB23_pBW_HEFGkL77CxG_l1Bgqe3BSl4IMHZcPQ/viewform"
                        convo.say(goodbye_message);
                        convo.repeat();
                        convo.next();
                    },
                }
                , {
                    default: true,
                    callback: function (response, convo) {
                        convo.say("Lo siento no entiendo, intenta si o no");
                        convo.repeat();
                        convo.next();
                    }
                }
            ]);
        });
    });
};
