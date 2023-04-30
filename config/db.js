import mongoose from 'mongoose'
mongoose.set('strictQuery', false);

const conectarDB = async () => {
    try {
        const conection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${conection.connection.host}: ${conection.connection.port}`
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1)      
    }
}

export default conectarDB