const MONGO_URL = process.env.MONGO_URL || "spire.cpe.ku.ac.th";
const MONGO_PORT = process.env.MONGODB_PORT || "27017";

module.exports = {
  MONGO_PORT,
  MONGO_URL,
};
