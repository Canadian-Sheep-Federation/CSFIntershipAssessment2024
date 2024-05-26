const request  = require('axios');
const oneModel = require('./model.js');
async function current(city){
    //requiretment check and external connection
    if(!city || city.length<2){
        throw "City name required and must be longer than 2 characters";
      }
  
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://api.weatherstack.com/current?access_key=${process.env.api_key}&query=${city}`,
      headers: { }
    };
try {
     const externalApiCall =  await request(config)
    return externalApiCall.data
} catch (error) {
   throw error
}
}

async function insertData(city, temperature, weather,db){
 //requiretment check
if(!city || city.length<2) throw "City name required and must be longer then 2 characters"
if(!temperature || isNaN(temperature)) throw "Temperature must be a number and can not be null"
if(!weather || !isNaN(weather)) throw "Weather must be a alphabetic format and can not be number"

try {
//call insert data function from controller
     const insertData =  await oneModel.insertData(city, temperature, weather,db)
    return insertData
} catch (error) {
   throw error
} }
async function getDataById(id,db){
     //requiretment check
    if(!id || id.length<1 || isNaN(id)) throw "Id must be present and longer than 0 and must be numraric"

    
    try {
        //call get data by id function from controller
         const getDataByIdModel =  await oneModel.getById(id, db)
        return getDataByIdModel
    } catch (error) {
       throw error
    } }
 async function deleteDataById(id,db){
            //requiretment check
        if(!id || id.length<1 || isNaN(id)) throw "Id must be present and longer than 0 and must be numraric"
    
        
        try {
             //call delete data by id function from controller
             const deleteDataByIdModel =  await oneModel.deleteById(id, db)
            return deleteDataByIdModel
        } catch (error) {
           throw error
        } }
async function getAllData(db){
        try {
                 //call get all data function from controller
             const getAllData =  await oneModel.getAll(db)
            return getAllData
        } catch (error) {
           throw error
        } }

        module.exports.current = current
        module.exports.insertData=insertData
        module.exports.getDataById=getDataById
        module.exports.getAllData=getAllData
        module.exports.deleteDataById=deleteDataById