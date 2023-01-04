import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm } from 'components/ContactForm';
import { ListContacts } from 'components/ListContacts';
import { Title } from 'components/Title';
import { Phonebook, MainTitle } from "./App.styled"

const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Тарас Шевченко', number: '459-12-56' },
  {id: 'id-2', name: 'Іван Франко', number: '443-89-12'},
  {id: 'id-3', name: 'Леся Українка', number: '645-17-79'},
  { id: 'id-4', name: 'Григорій Сковорода', number: '227-88-33' },
  { id: 'id-5', name: 'Ліна Костенко', number: '4567-78-26' },
  { id: 'id-6', name: 'Валер’ян Підмогильний', number: '527272-91-00' },
  { id: 'id-7', name: 'Михайло Коцюбинський', number: '7778-99-55' },
  { id: 'id-8', name: 'Jack Richer', number: '55-99-55' },
  { id: 'id-9', name: 'Batman', number: '88-99-55' },
  { id: 'id-10', name: 'Spiderman', number: '36363-99-55' },
]

export const App =()=>{
  const [contacts, setContact] = useState([...INITIAL_CONTACTS])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let contactsLocal = localStorage.getItem('contacts')

    if (contactsLocal) {
      contactsLocal = JSON.parse(contactsLocal)
      setContact([...contactsLocal])
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
      
    if (contacts.length === 0) {
      localStorage.removeItem('contacts')
    }
  },[contacts])

  const submitContact = (newContact) => {
    setContact([...contacts, newContact])
  }

  const filterContact = ({ currentTarget }, actions) => {
    setFilter(currentTarget.value)
  };

  const showContacts = () => {
    const fullBaseContacts = contacts;
    const findName = filter.toLowerCase();

    return fullBaseContacts.filter(({ name }) =>
      name.toLowerCase().includes(findName)
    );
  };

  const onClickBtnRemove = (idContact) => {
    const contactLists = contacts.filter(item => item.id !== idContact)  
    setContact([...contactLists])

    Notify.success(
    'The contact has been remove from storage',
    { position: 'center-top' })
  }

  return (
    <Phonebook>
      <MainTitle>My favorite</MainTitle>
      <Title
        title="Phonebook"
        children={
          <ContactForm
            onSubmit={submitContact}
            contactsBase={contacts}
          />
        }
      />
      <Title
        title="Contacts"
        children={
          <ListContacts
            arrayContacts={showContacts()}
            filterContact={filterContact}
            filter={filter}
            onClickBtnRemove={onClickBtnRemove}
          />
        }
      />
    </Phonebook>
  );
}