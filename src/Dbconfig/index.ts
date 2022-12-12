import mongoose from "mongoose"
import config from '../config';
const con = async () => {
    try {
            await mongoose.connect(config.dblink
                // "mongodb+srv://cnetdev:tipltest@cluster0.k5vz1.mongodb.net/test"
            // await mongoose.connect("mongodb://localhost:27017/spill"
        )
        console.log("database connected")
    }
    catch (e) {
        console.log(e)
        console.log("databse connection error " + e)
    }
}
export default con()
