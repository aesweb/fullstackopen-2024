import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${returnedPerson.name}'s number`);
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              setPersons(persons.filter((p) => p.id !== existingPerson.id));
              showNotification(
                `Information of ${existingPerson.name} has already been removed from server`,
                'error'
              );
            } else {
              console.error('Error updating person:', error);
              showNotification(
                `Failed to update ${existingPerson.name}'s number`,
                'error'
              );
            }
            setNewName('');
            setNewNumber('');
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${returnedPerson.name}`);
        })
        .catch((error) => {
          console.error('Error adding person:', error);
          showNotification('Failed to add the person to the server', 'error');
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${personToDelete.name}`);
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
          showNotification(`Failed to delete ${personToDelete.name}`, 'error');
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
