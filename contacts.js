// contacts.js

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
 

/*
 * Раскомментируй и запиши значение
const contactsPath = ;
 */

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

// TODO: задокументировать каждую функцию
const listContacts = async() => {
  // ...твой код. Возвращает массив контактов.
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
    
};
console.log(listContacts);

const getContactById = async (id) => {
    // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
};
console.log(getContactById);

const removeContact = async (id) => {
    // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
    const contacts = await listContacts();
    const index = contacts.find(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
     
};
console.log(removeContact);

const addContact = async (data) => {
    // ...твой код. Возвращает объект добавленного контакта.
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};
console.log(addContact);


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};