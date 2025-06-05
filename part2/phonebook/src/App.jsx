import { useState, useEffect } from 'react'
import personsService from "./services/persons"

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const filteredPersons = persons.filter(person =>
		person.name.toLowerCase().includes(filter.toLowerCase()) || (person.number && person.number.includes(filter))
	);


	const submitHandler = (event) => {
		event.preventDefault();

		const newPerson = { name: newName, number: newNumber }
		if ( persons.some((person => person.name === newPerson.name)) ) { return alert(`${newName} is already in the phonebook`); }
		if ( !!newName ){ 
    		personsService.create(newPerson)
    		.then(response => {
				setPersons(persons.concat(response.data));
				setNewName("");
				setNewNumber("");
		    })
		}
	}

	const deleteHandler = (id, name) => {
		if(!confirm(`delete ${name}?`)) return;
		
		personsService.remove(id)
		.then(
			(response) => {
        		setPersons( persons.filter(person => person.id !== id) )
     		}
			,(error) => {
				console.error("Failed to delete:", error)
			}
		);
	}

	useEffect(() => {
		personsService.getAll()
		.then(response => {
			setPersons(response.data)
		})
	}, []);

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
			<Persons filteredPersons={filteredPersons} deleteHandler={deleteHandler}/>
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
	const {deleteHandler} = props;
	return (
		<div>
			{ 
				filteredPersons.map( 
					person => {
						return (
							<p key={person.id}>
								{person.name} {person.number}
								<button onClick={() => deleteHandler(person.id, person.name)}>delete</button>
							</p>
						)
 					}
				)
			}
		</div>
	)
}


export default App