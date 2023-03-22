import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {List, Title} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';

// Moment
import moment from 'moment';
import 'moment/locale/ro';
moment.locale('ro');

// Constants
import {Colors} from '../components/constants/theme';

// Auth statements
import {AuthContext} from '../navigation/AuthProvider';

export default function HomeScreen({navigation}: any) {
  const {user} = useContext(AuthContext);
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('EVENTS')
      .where('user', '==', user.uid)
      .onSnapshot(querySnapshot => {
        const rooms = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            ...documentSnapshot.data(),
          };
        });

        setEvents(rooms);

        if (loading) {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* Events list */}
      <View style={styles.container}>
        <View
          style={{
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}>
          <Title style={styles.title}>Selectează un eveniment</Title>
          <Text style={styles.subTitle}>
            Un operator va intra într-o discuție live cu tine și te va ajuta cu
            mai multe detalii despre evenimentul tău.
          </Text>
        </View>
        <FlatList
          data={events}
          keyExtractor={(item: any) => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Event', {event: item})}>
              <List.Item
                title={item.name}
                description={`Creat cu ${moment(item.createdAt)
                  .startOf('day')
                  .fromNow()}.`}
                titleNumberOfLines={1}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={1}
                left={props => (
                  <List.Icon
                    {...props}
                    icon="account-circle"
                    color="#fff"
                    style={styles.iconChat}
                  />
                )}
                style={styles.listChat}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
  },
  subTitle: {
    color: '#999',
  },
  listChat: {
    backgroundColor: '#eee',
    borderRadius: 100,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  iconChat: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  listTitle: {
    color: Colors.black,
    fontSize: 18,
  },
  listDescription: {
    color: '#888',
    marginTop: 5,
    fontSize: 14,
  },
  container: {
    backgroundColor: '#f5f5f5',
    color: '#000',
    padding: 15,
    flex: 1,
  },
  navButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
