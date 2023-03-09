var fs = require('fs');
const global = require("../imports");
var register = require('./controllers/home');

exports.routers = (app) => {

    app.get('/', function (request, response) {
       register.module(request, response)
    });

    app.post("/main", (request, response) => {

        try {
            global.method.leads(request, response);
            fs.truncate('./error.html', 0, function () { console.log('done') })
        } catch (catchError) {
            console.log(catchError);
            let setLogError = JSON.stringify(catchError);
            fs.writeFile("./error.html", setLogError, function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("The file was saved in main!");
            });
        }

    });

    app.get('/download', function (request, response) {
        const file = `${__dirname}/planilha.xlsx`;
        console.log(file)
        response.download(file); // Set disposition and send it.
    });
    logs(app);
}

function logs(app) {
    app.get("/log", (request, response) => {
        if (fs.existsSync('./error.html')) {
            response.writeHead(200, { "content-Type": "text/html" });
            fs.createReadStream("./error.html").pipe(response);
        }
        response.end('');
    });
}