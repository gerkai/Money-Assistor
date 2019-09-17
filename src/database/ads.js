const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');

const collectioName = 'ads';

async function insertAd(ad){
    const database = await getDatabase();
    const {insertId} = await database.collection(collectioName).insertOne(ad);
    return insertId;
}

async function getAds() {
    const database = await getDatabase();
    return await database.collection(collectioName).find({}).toArray();
}

async function deleteAd(id){
    const database = getDatabase();
    await database.collection(collectioName).deleteOne({
        _id: new ObjectID(id),
    });
}

async function updateAd(id, ad) {
    const database = getDatabase();
    delete ad._id;
    await database.collection(collectioName).update({
        _id: new ObjectId(id)
    }, {
        $set: {
            ...ad
        }
    })
}

module.exports = {
    insertAd,
    getAds,
    deleteAd,
    updateAd
}