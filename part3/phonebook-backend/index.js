const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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


let persons = [
	{ 
		"id": "1",
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": "2",
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": "3",
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": "4",
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]


app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(person => person.id === id)
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()  
	}
})

app.get('/info', (request, response) => {
	const count = persons.length
	const time = new Date()
	response.send(
		`<p>Phonebook has info for ${count} people</p><p>${time}</p>`
	)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({ 
			error: 'name or number missing' 
		})
	}
	if (persons.find(person => person.name === body.name)) {
		return response.status(400).json({ 
			error: 'name must be unique' 
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: Math.floor(Math.random() * 1000000).toString(),
	}

	persons = persons.concat(person)

	response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})