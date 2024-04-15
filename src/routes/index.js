const AllRoutes = require("./allRoutes");

const loadRoutes = (app) => {
    app.use("/", AllRoutes);
};

module.exports = { loadRoutes };
