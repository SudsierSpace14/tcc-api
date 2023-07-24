import mongoose from 'mongoose'
import log from '../config/logger'

async function connect(){
    const dbHost = process.env.DB_HOST_ATLAS || "127.0.0.1:27017/"

    // mongoose.Promise = global.Promise TS error
    return mongoose
    .connect(dbHost, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(mongoose => {
        
        mongoose.Promise = global.Promise
        
        log.info("Connected to the database")
    })
    .catch(err => {
        log.error("db error:", err);
        process.exit(1);
    })
}

export default connect