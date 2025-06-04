import { useState } from 'react'

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

	return (
		<div>
			<h2>Phonebook</h2>
				<div>
					filter: <input onChange={(event) => setFilter(event.target.value)} value={filter}/>
				</div>
			<h2>add a new</h2>
				<form onSubmit={submitHandler}>
					<div>
						name: <input onChange={(event) => setNewName(event.target.value)} value={newName}/>
						number: <input onChange={(event) => setNewNumber(event.target.value)} value={newNumber}/>
					</div>
					<div>
					<button type="submit">add</button>
					</div>
				</form>
			<h2>Numbers</h2>
			{ filteredPersons.map( person => (<p key={person.name}>{person.name} {person.number}</p>) ) }
		</div>
	)
}

export default App