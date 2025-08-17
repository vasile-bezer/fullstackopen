require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/people')

const app = express()

app.use(express.static('dist'))

const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
app.use(cors({origin: allowedOrigin}))

app.use(express.json())
morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()  
		}
	}).catch(error => next(error))
})

app.get('/info', (request, response) => {
	Person.countDocuments({}).then(count => {
		const time = new Date()
		response.send(
			`<p>Phonebook has info for ${count} people</p><p>${time}</p>`
		)
	})
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body

	Person.findById(request.params.id).then(person => {
		if (!person) {
			return response.status(404).end()
		}

		person.name = name
		person.number = number

		return person.save().then((updatedPerson) => {
			response.json(updatedPerson)
		})
	}).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id).then(() => {
		response.status(204).end()
	}).catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({error: 'name or number missing'})
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} 

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})