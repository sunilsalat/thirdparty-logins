const { mongoose } = require("mongoose");
const { app } = require(".");

const start = () => {
    try {
        mongoose.connect("mongodb://localhost:27017/social-login");
        app.listen(8080, () => {
            console.log("Server running on port 8080...");
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
