// show dbs
use(db_name)
db.users.insertOne({ name: "shamim" }) // create autometic users data and insert
db.users.insertMany([{ name: "shamim" }, { name: "shamim" }, { name: "shamim" }])
db
db.users.find()

// querying data............
db.users.find().count() // total users length. like. result= 5
db.users.find().limit(2) // res 2 data from this db
db.users.find().skip(2).limit(2) // 2 skip and next 2 res
db.users.find().sort({ name: -1 }) // sort high to low
db.users.find().sort({ name: 1 }) // sort low to high

db.users.find().projection({ name: 1 }) // only return name data
db.users.find().projection({ name: 0 }) // only return without name data

db.users.find({ name: "shamim" }) //return data for this name


// operators...............
db.users.find({ age: { $gt: 20 } }) //return 20 age high data
db.users.find({ age: { $gte: 20 } })
db.users.find({ age: { $lt: 20 } })
db.users.find({ age: { $lte: 20 } })

db.users.find({ age: { $eq: 20 } })
db.users.find({ age: { $ne: 20 } }) //not equel

db.users.find({ name: { $in: ["shamim", "sahin"] } }) //in received an array. When any name find return this data
db.users.find({ name: { $nin: ["shamim", "sahin"] } }) // not in


// ---------update & deleting----------
db.users.updateOne({ name: "shamim" }, { $set: { age: 22 } }) // first object for find data & second object for update data 
db.users.updateMany({ age: {$gt: 20} }, { $inc: { age: 2 } })