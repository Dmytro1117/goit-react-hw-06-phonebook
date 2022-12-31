import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import './App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => { 
  const [filter, setFilter] = useState('')
  const [contacts, setContacts] = useState(() => { return JSON.parse(window.localStorage.getItem('contacts')) ?? [] });


  useEffect(() => {
   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const handlerFromForm = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(num => num.name === contact.name.toLowerCase() || num.number === contact.number)
      ? Notify.info(`${name} or ${number} is already in contacts`)
      : setContacts([contact, ...contacts])
  };

const handlerFindContact = e => {
    setFilter(e.currentTarget.value);
 };
  
  const filtrContacts = () => {
    return contacts.filter(cont =>
      cont.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
     setFilter('');
  };


  return (
      <section>
        <h1>Phonebook:</h1>
        <ContactForm onSendForApp={handlerFromForm} />
        <h1>Contacts:</h1>
        <Filter
          text={filter}
          filterInput={handlerFindContact}
        />
        <ContactList
          find={filtrContacts()}
          deleteContact={deleteContact}
        />
      </section>
    );

 };

