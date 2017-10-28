var Contacts = require('react-native-contacts');

/*
 * This class would be a wrapper to native contacts db. We will directly wire contacts to
 * device addressbook.
*/
class ContactsService {

  init() {
    // setup access
    Contacts.checkPermission((err, permission) => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      if (permission === 'undefined') {
        Contacts.requestPermission((err1, permission1) => {
          // ...
          console.log(err1);
          console.log(permission1);
        });
      }
      if (permission === 'authorized') {
        // yay!
      }
      if (permission === 'denied') {
        // x.x
      }
    });
    Contacts.getAll((err, contacts) => {
      console.log(contacts);
    });
  }
}

export default ContactsService;
