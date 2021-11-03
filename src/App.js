import React, { Component } from "react";
import s from "./App.module.css";
import { v4 } from "uuid";
import "./App.module.css";
import ContactsForm from "./components/ContactsForm";
import Contacts from "./components/Contacts";
import FilterField from "./components/FilterField";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem("contacts"));

    if (localContacts) {
      this.setState({ contacts: localContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = ({ name, number }) => {
    const contact = {
      id: v4(),
      name: name,
      number: number,
    };

    const contactsNames = this.state.contacts.map((item) =>
      item.name.toLowerCase()
    );

    contactsNames.includes(contact.name.toLowerCase())
      ? alert(`${contact.name} is already in contacts.`)
      : this.setState((prevState) => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const NormalizeFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(NormalizeFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={s.app}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactsForm addNewContact={this.addNewContact} />
        <h2 className={s.title}>Contacts</h2>
        <FilterField value={this.state.filter} onChange={this.changeFilter} />
        <Contacts
          contactsArr={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
