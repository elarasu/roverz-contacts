/**
 * Style Guide
 */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ListView,
} from 'react-native';

import {
  Icon,
  Text,
  List,
  ListItem,
} from 'react-native-elements';
import ContactCard from 'vcf';

/* Styles ==================================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'grey',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

const log = () => console.log('this is an example method');

/* Component ==================================================================== */

class AddressBook extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    // lets load dummy data
    const c1 = `
BEGIN:VCARD
VERSION:4.0
FN:Simon Perreault
N:Perreault;Simon;;;ing. jr,M.Sc.
BDAY:--0203
ANNIVERSARY:20090808T1430-0500
GENDER:M
LANG;PREF=1:fr
LANG;PREF=2:en
ORG;TYPE=work:Viagenie
ADR;TYPE=work:;Suite D2-630;2875 Laurier;
 Quebec;QC;G1V 2M2;Canada
TEL;VALUE=uri;TYPE="work,voice";PREF=1:tel:+1-418-656-9254;ext=102
TEL;VALUE=uri;TYPE="work,cell,voice,video,text":tel:+1-418-262-6501
EMAIL;TYPE=work:simon.perreault@viagenie.ca
GEO;TYPE=work:geo:46.772673,-71.282945
KEY;TYPE=work;VALUE=uri:
 http://www.viagenie.ca/simon.perreault/simon.asc
TZ:-0500
URL;TYPE=home:http://nomis80.org
END:VCARD
`;
    const c2 = `
BEGIN:VCARD
VERSION:4.0
N:Gump;Forrest;;;
FN:Forrest Gump
ORG:Bubba Gump Shrimp Co.
TITLE:Shrimp Man
PHOTO;MEDIATYPE=image/gif:http://www.example.com/dir_photos/my_photo.gif
TEL;TYPE=work,voice;VALUE=uri:tel:+11115551212
TEL;TYPE=home,voice;VALUE=uri:tel:+14045551212
ADR;TYPE=work;LABEL="100 Waters Edge\nBaytown, LA 30314\nUnited States
  of America":;;100 Waters Edge;Baytown;LA;30314;United States of America
ADR;TYPE=home;LABEL="42 Plantation St.\nBaytown, LA 30314\nUnited
  States ofAmerica":;;42 Plantation St.;Baytown;LA;30314;United States of
 America
EMAIL:forrestgump@example.com
REV:20080424T195243Z
END:VCARD
`;
    const c3 = `
BEGIN:VCARD
VERSION:3.0
PRODID:-//Apple Inc.//Mac OS X 10.12.5//EN
N:;;;;
FN:Apple Inc.
ORG:Apple Inc.;
TEL;type=MAIN;type=pref:1-800-MY-APPLE
item1.ADR;type=WORK;type=pref:;;1 Infinite Loop;Cupertino;CA;95014;United States
item1.X-ABADR:us
item2.URL;type=pref:http://www.apple.com
item2.X-ABLabel:_$!<HomePage>!$_
X-ABShowAs:COMPANY
X-ABUID:F02968F4-D407-4D54-8470-B1CA7F77FF95:ABPerson
END:VCARD
`;
// console.log(c1);
// console.log(c2);
    let card = new ContactCard();
    card = card.parse(c1);
    // console.log(card);
    // console.log(card.toString());

    // @todo: there are some issues in accessing
    // complex objects as this package might
    // not be ready for react-native, so
    // for time being just use the following methods
    // as shown here

    // console.log(card.data.fn.valueOf());
    // console.log(card.data.adr.toString());
    // console.log(card.data.tel.valueOf());
    // console.log(card.data.email.valueOf());
    const list1 = [];
    let item = { title: card.data.fn.valueOf(),
      subtitle: card.data.email && card.data.email.valueOf(),
      address: card.data.adr.valueOf() };
    list1.push(item);

    card = card.parse(c2);
    item = { title: card.data.fn.valueOf(),
      subtitle: card.data.email && card.data.email.valueOf(),
      address: card.data.adr.valueOf() };
    list1.push(item);

    card = card.parse(c3);
    item = { title: card.data.fn.valueOf(),
      subtitle: card.data.email && card.data.email.valueOf(),
      address: card.data.adr.valueOf() };
    list1.push(item);

    // @todo: kumar - use this list to display things
    // you can also replace any of the above vcards to display atleast 5-10 addresses for demo
    // vcards are plenty on the internet
    console.log(list1);

    this.state = {
      selectedIndex: 0,
      value: 0.5,
      dataSource: ds.cloneWithRows(list1),
    };

    this.updateIndex = this.updateIndex.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        onPress={log}
        title={rowData.title}
        icon={{ name: rowData.icon }}
        subtitle={rowData.subtitle}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <Icon color="white" name="invert-colors" size={62} />
          <Text style={styles.heading}>Key Contacts</Text>
        </View>
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          />
        </List>
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default AddressBook;
