/**
 * Created by vijay on 07/01/16.
 */
module.exports = {
    api: {
        host: "http://developer.goibibo.com/api",
        endpoints: {
            minfare: "/stats/minfare"
        },
        appId : "insert app id here",
        appKey : "insert app key here"
    },
    source: {
        user: "email from which notification will be sent",
        pass: "password",
        host: "smtp.gmail.com"
    },
    notification : {
        user : "email to which notification will be sent"
    }
}