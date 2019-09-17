module.exports = {
    isLogin : function(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect(401, '/login')
    },
    isAdmin : function(req, res, next){
        if (req.isAuthenticated() && req.user.admin) {
            return next();
        } else if(req.isAuthenticated()){
            res.redirect(403, '/home')
        }
        res.status(401).send("unauthorized")
    }
}