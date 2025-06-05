import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const filteredPersons = persons.filter(person =>
		person.name.toLowerCase().includes(filter.toLowerCase()) || (person.number && person.number.includes(filter))
	);


	const submitHandler = (event) => {
		event.preventDefault();

		const newPerson = { name: newName, number: newNumber }
		if ( persons.some((person => JSON.stringify(person) === JSON.stringify(newPerson))) ) { return alert(`${newName} is already in the phonebook`); }
		if ( !!newName ){ setPersons(persons.concat(newPerson)); }
		setNewName("");
		setNewNumber("");
	}

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}, [])

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} setFilter={setFilter}/>
			<h2>add a new</h2>
			<PersonForm 
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				submitHandler={submitHandler}
			/>
			<h2>Numbers</h2>
			<Persons filteredPersons={filteredPersons}/>
		</div>
	)
}

const Filter = (props) => {
	const {filter, setFilter} = props;

	return (
		<div>
			filter: <input onChange={(event) => setFilter(event.target.value)} value={filter}/>
		</div>
	)
}

const PersonForm = (props) => {
	const {newName, setNewName} = props;
	const {newNumber, setNewNumber} = props;
	const {submitHandler} = props;

	return (
		<form onSubmit={submitHandler}>
			<div>
				name: <input onChange={(event) => setNewName(event.target.value)} value={newName}/>
				number: <input onChange={(event) => setNewNumber(event.target.value)} value={newNumber}/>
			</div>
			<div>
			<button type="submit">add</button>
			</div>
		</form>
	)
}

const Persons = (props) => {
	const {filteredPersons} = props;

	return (
		<div>{ filteredPersons.map( person => (<p key={person.name}>{person.name} {person.number}</p>) ) }</div>
	)
}


export default App