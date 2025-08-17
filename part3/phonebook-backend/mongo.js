require('dotenv').config()

const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URI)

const Person = mongoose.model(
  'Person', new mongoose.Schema({
    name: String,
    number: String,
  })
)

switch (process.argv.length) {
  case 3:
    Person
	  .find({})
	  .then(persons => {
      	persons.forEach(person => {
        	console.log(`${person.name} ${person.number}`)
      	})
    	mongoose.connection.close()
      })
    break
  case 5:
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({ name, number })

    person
	  .save()
	  .then((response) => {
      	console.log(`added ${name} number ${number} to phonebook`)
      	mongoose.connection.close()
      })
    break
  default:
	console.log('incorrect number of arguments')
	mongoose.connection.close()
	process.exit(1)
}