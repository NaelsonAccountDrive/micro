const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion, Payload } = require("dialogflow-fulfillment");

const db = require("../database/db");
exports.leads = (request, response) => {

    const agent = new WebhookClient({ request, response });

    if (agent.contexts[0].lifespan > 0) {

        if (agent.intent == "PRJ.Cadastro" ||
            agent.intent == "PRJ.Cadastro.repeat.name" ||
            agent.intent == "PRJ.Cadastro.repeat.email" ||
            agent.intent == "PRJ.Cadastro.repeat.phone") {

            let validation = { "name": false, "phone": false, "email": false }

            agent.parameters.name = agent.contexts[0].parameters.name;
            if (agent.parameters.name.length < 3) {
                agent.handleRequest(new Map().set(agent.intent, () => {
                    agent.add(`O nome precisa ter pelo menos 3 caracteres. Digite 1 para corrigir!`);
                }));
            } else validation.name = true;

            agent.parameters.phone = agent.contexts[0].parameters.phone;
            let phone = (Array.isArray(agent.parameters.phone)) ? agent.parameters.phone[0] : agent.parameters.phone;

            if (phone.length < 9) {
                //fix the name first another try display it
                if (validation.name == true) {
                    agent.handleRequest(new Map().set(agent.intent, () => {
                        agent.add(`O Telefone precisa ter pelo menos 9 caracteres. Digite 3 para corrigir!`);
                    }));
                }
            } else validation.phone = true;

            if (validation.name == true && validation.phone == true) {

                let email = (agent.parameters.email = agent.contexts[0].parameters.email);
                let name = (agent.parameters.name = agent.contexts[0].parameters.name);
                let phone_ = phone;

                db.conn.query(`SELECT count(*) as count FROM register_leads where email = '${email}' `, (error, results, fields) => {
                    if (results) {
                        if (results[0].count <= 0) {
                            validation.email = true;
                            db.conn.query(`INSERT INTO register_leads (name,email,telefone) VALUES ('${name}','${email}','${phone_}')`, (error, results, fields) => {
                                if (results) {
                                    agent.handleRequest(new Map().set(agent.intent, () => {
                                        agent.add(`Cadastro realizado com sucesso!`);
                                    }));
                                }
                                if (error) console.log(error)
                            });

                        } else {
                            agent.handleRequest(new Map().set(agent.intent, () => {
                                agent.add(`Já existe cadastro com esse email: ${email}, Digite 2 para alterar!`);
                            }));
                        }
                    }
                    if (error) {
                        console.log(error)
                    }
                });
            }

            if (true) {
                console.log(agent.intent)
                console.log(agent.contexts)
                console.log(agent.parameters)
                console.log(agent.contexts[0].lifespan)

                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (validation.email == true) {
                            resolve(1);
                        }
                    }, 300)
                }).then((result_) => {
                    console.log(validation)
                })
            }
        }

    } else {
        agent.handleRequest(new Map().set(agent.intent, () => {
            //reset context
            agent.add(`Digite cadastar novamente, o lifespan foi excedido!`);
        }));
    }
}


//[Probably sintax error] Cannot set headers after they are sent to the client
// Miss communication Lamento, mas não compreendi. 