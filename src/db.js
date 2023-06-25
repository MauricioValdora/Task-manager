import mongoose from 'mongoose'


export const connectDB = async () => {

    try {
        await mongoose.connect('mongodb+srv://mauricio:valdora@clustermaury.y8wiux9.mongodb.net/');
        console.log('baseconectad')

    } catch (error) {
        console.log(error)
    }

}