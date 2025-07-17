const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.bwqaa3r.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
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