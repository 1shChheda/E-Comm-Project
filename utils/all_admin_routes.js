exports.All_admin_routes = (app) => {
    app.use(
        '/admin',
        require("../routes/admin") 
    );
}