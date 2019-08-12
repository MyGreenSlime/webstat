module.exports = (sequelize, type) => {
    return sequelize.define('Users',{
        username : {
            type : type.STRING,
            primaryKey : true,
        },
        fullname : {
            type : type.STRING,
            require : true,
        },
        section : {
            type : type.STRING,
            require : true,
            defaultValue : "cpe"
        }
    })
}