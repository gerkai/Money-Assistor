const getDB = require('./mongo');

const collectioName = 'ads';

async function insertAd(ad){
    const database = await getDB();
    const insertId = await database.collection(collectioName).insertOne(ad);
    return insertId;
}

async function getAds() {
    const database = await getDB();
    return await database.collection(collectioName).find({}).toArray();
}

module.exports = {
    insertAd,
    getAds
}