const MONGO_URL = process.env.MONGODB_PORT || "spire.cpe.ku.ac.th"
const MONGO_PORT = process.env.MONGO_URL || "27017"

module.exports ={
    MONGO_PORT,MONGO_URL
}