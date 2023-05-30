const get404page = (req, res, next) => { // added a 404 Page Not Found
    res.status(404).render('404-error', {
        pageTitle: "Page Not Found",
        path: req.path  // Added the path variable here (else the navbar.ejs code breaks)   
    });    
};

module.exports = {
    get404page : get404page
}