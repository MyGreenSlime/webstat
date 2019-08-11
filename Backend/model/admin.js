module.exports = (sequelize, type) => {
    return sequelize.define('Admins',{
        username : {
            type : type.STRING,
            primaryKey : true,
        },
        fullname : {
            type : type.STRING,
            require : true,
        },
        status : {
            type : type.STRING,
            require : true,
            defaultValue : "Instructor"
        }
    })
}