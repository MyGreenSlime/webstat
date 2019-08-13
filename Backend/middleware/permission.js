module.exports = {
    isLogin : function(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).send("unauthorized")
    }
}