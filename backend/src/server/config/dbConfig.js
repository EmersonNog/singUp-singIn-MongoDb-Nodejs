import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const dbConfig = 'mongodb+srv://crud:image@crudimg.rueocsf.mongodb.net/album?retryWrites=true&w=majority';

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default connection;