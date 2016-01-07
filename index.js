var config = require('./config');
var jsonfile = require('jsonfile')

var email = require("emailjs/email");

var server = email.server.connect({
    user: config.source.user,
    password: config.source.pass,
    host: config.source.host,
    ssl: true
});

var buildQuery = function (lookup) {
    return ["?app_id=", config.api.appId, "&app_key=", config.api.appKey, "&format=json&vertical=flight&mode=one&class=E", "&source=", lookup.start,
        "&destination=", lookup.end, "&sdate=", lookup.startDate, "&edate", lookup.endDate
    ].join('');
};

setInterval(function () {
    console.log("lookup starting");
    var fares = {};
        try {
            fares = jsonfile.readFileSync("./fare.json");
        }
        catch(err){
            console.log("fare.json not read");
        }
        for (var key in fares) {
            var data = fares[key];
            if (data.fare <= 2500 ) {
                console.log("shooting email.....");
                shootEmail(data.date, data.fare, data, function (err, message) {
                    console.log(err || message);
                });
            }
        }
    console.log("lookup ended");
}, 20000);

var shootEmail = function (date, fare, data, callback) {
    server.send({
        text: JSON.stringify(data),
        from: config.source.user,
        to: config.notification.user,
        subject: ["FARE-ALERT - ", fare, " on ", date].join('')
    }, callback);
}