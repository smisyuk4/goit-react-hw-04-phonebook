import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm } from 'components/ContactForm';
import { ListContacts } from 'components/ListContacts';
import { Title } from 'components/Title';
import { Phonebook, MainTitle } from "./App.styled"

export class App extends Component {
  state = {
    contacts: [
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
    ],
    filter: '',
  };

  componentDidMount() {
    let contactsLocal = localStorage.getItem('contacts')
    
    if (contactsLocal) {
      contactsLocal = JSON.parse(contactsLocal)
      this.setState({contacts: contactsLocal})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }

    if (this.state.contacts.length === 0) {
      localStorage.removeItem('contacts')
    }
  }


  submitContact = (newContact) => {
    this.setState(({ contacts }) => {
      return {
      contacts: [...contacts, newContact]
    }})
  }

  filterContact = ({currentTarget}, actions) => {
    this.setState({filter: currentTarget.value})
  };

  filterTest = ({target}) => {
    this.setState({ filter: target.value });
  };

  showContacts = () => {
    const fullBaseContacts = this.state.contacts;
    const findName = this.state.filter.toLowerCase();

    return fullBaseContacts.filter(({ name }) =>
      name.toLowerCase().includes(findName)
    );
  };

  onClickBtnRemove = (idContact) => {
    this.setState(({contacts}) => {
      return {
        contacts: contacts.filter(item => item.id !== idContact)
      }
    })   

    Notify.success(
    'The contact has been remove from storage',
    { position: 'center-top' })
  }

  render() {
    const visibleContacts = this.showContacts();

    return (
      <Phonebook>
        <MainTitle>My favorite</MainTitle>
        <Title
          title="Phonebook"
          children={
            <ContactForm
              onSubmit={this.submitContact}
              contactsBase={this.state.contacts}
            />
          }
        />
        <Title
          title="Contacts"
          children={
            <ListContacts
              arrayContacts={visibleContacts}
              filterContact={this.filterContact}
              filter={this.state.filter}
              onClickBtnRemove={this.onClickBtnRemove}
            />
          }
        />
      </Phonebook>
    );
  }
}