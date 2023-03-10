import {
    MongoClient,
    ObjectId
} from "mongodb";

const connectionString = "mongodb+srv://suchanon:vHXiX0u5ZWBFsDGe@cluster0.zp08nnp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);

const runDb = async() => {
    try {
        const database = client.db('sample_mflix');
        const movies = database.collection('comments');

        const countDocument = await movies.count()
        console.log(countDocument);

        //---------READ
        // Query for a movie that has the title 'Back to the Future'
        // const query = { movie_id: new ObjectId("573a1390f29313caabcd587d") };
        // const movie = await movies.findOne(query);
        // const movie = await movies.deleteOne(query);

        // console.log(movie);
        // console.log(countDoc);

        //-----------INSERT
        const doc = { name: "Neapolitan pizza", shape: "round" };
        const result = await movies.insertOne(doc);
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`,
        );

        //----------------UPDATE
        const updateById = { _id: new ObjectId('640ad13891c992ffd7eed151') }
        const updateDoc = {
            $set: {
                name: "Hello ther"
            }
        }
        const result = await movies.updateOne(updateById, updateDoc)
        console.log("Result>>>", result);

        //-----------------DELETE
        const updateById = { _id: new ObjectId('640ad13891c992ffd7eed151') }
        const result = await movies.deleteOne(updateById)
        console.log("Result>>>", result);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
runDb().catch(console.dir);