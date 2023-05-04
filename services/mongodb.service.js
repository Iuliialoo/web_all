import { ObjectId } from 'mongodb'
import {connectToMongoDB} from '../configs/mongodb.config.js'

let db

connectToMongoDB()
  .then(result => { db = result })
  .catch(err => console.log(err))

console.log(db);

async function insert(collection, data) {
  const collect = db.collection(collection)
  const model = await collect.insertOne(data)
  return model
}

async function findAll(collection) {
  const collect = db.collection(collection)
  const result = await collect.find( {}, { name: true } )
  return result.toArray()
}

async function findOne(collection, id) {
  const collect = db.collection(collection);
  const result = await collect.findOne({_id: new ObjectId(id)});
  return result;
}

async function updateOne(collection, newModels, id) {
  const collect = db.collection(collection)
  return await collect.updateOne({_id: new ObjectId(id)}, {$set: newModels})
}

async function deleteOne(collection, id) {
  const collect = db.collection(collection)
  await collect.deleteOne({_id: new ObjectId(id)})
}

async function deleteMany(collection) {
  const collect = db.collection(collection)
  await collect.deleteMany({})
}


async function findOneByLogin(collection, login) {
  const collect = db.collection(collection);
  const result = await collect.findOne({login: login});
  return result
}

async function findOneByLoginAndPassword(collection, login, password) {
  const collect = db.collection(collection);
  const result = await collect.findOne({login: login, password: password});
  return result
}

export {insert, findAll, findOne, updateOne, deleteOne, deleteMany, findOneByLogin, findOneByLoginAndPassword}