
require('dotenv').config();
const mongoose = require('mongoose')
const mySecret = process.env.MONGO_URI
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });
/* Create a person schema called personSchema having this prototype: 
name : string [required]
age :  number
favoriteFoods : array of strings (*)
*/
const Schema = mongoose.Schema

const personSchema = new Schema({
  name: {type:String,required: true},
  age: Number,
  favoriteFoods : [String]
})

// create a model called Person from the personSchema.
let Person = mongoose.model("Person",personSchema);

const createAndSavePerson = (done) => {
  let newperson = new Person({
    name: "Azumah Joshua", 
    age: 84, 
    favoriteFoods: ["eggs", "fish", "fresh fruit"]
  })
  newperson.save((error,data)=>{
    if(error) return console.error(error);
    done(null,data)
  })
  // done(null /*, data*/);
};
let arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(error,data)=>{
    if(error) return console.error(error)
    done(null,data)
  })
  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(error,matchFound)=>{
    if(error) return console.error(error)
    done(null,matchFound)
  })
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},(error,food)=>{
    if(error) return console.error(error)
    done(null,food)
  })
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(error,found)=>{
    if(error) return console.error(error)
    done(null,found)
  })
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId,(error,found)=>{
    
    if(error) return console.error(error)
    
    found.favoriteFoods.push(foodToAdd)
    
    found.save((error,updatePersonFood)=>{
      if(error) return console.error(error)
      done(null,updatePersonFood)
    })
    // done(null,found)
  })
  
  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},
    {age:ageToSet},
    {new : true},
    (error,updatedAge)=>{
      if(error) return console.error(error)
      done(null,updatedAge)
    }
  )
  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(error,removedPersonData)=>{
    if(error) return console.error(error)
    done(null,removedPersonData)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  // Person.remove({name:nameToRemove},(error,removedPerson)=>{
  //   if(error) return console.error(error)
  //   done(null,removedPerson)
  // })
  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods :foodToSearch})
    .sort('name')
    .limit(2)
    .select(['name','favoriteFoods'])
    .exec((error,people)=>{
    if(error) return console.error(error)
    done(null,people)
  })
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
