import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {List, Divider, Title} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';

// Constants
import {Colors} from '../components/constants/theme';

// Auth statements
import {AuthContext} from '../navigation/AuthProvider';

export default function HomeScreen() {
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
        <Title style={styles.title}>Lista evenimentelor</Title>
        <FlatList
          data={events}
          keyExtractor={(item: any) => item._id}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#efefef'}} />
          )}
          renderItem={({item}) => (
            <List.Item
              title={item.name}
              description="Eveniment în data de"
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
              left={props => <List.Icon {...props} icon="message" />}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    marginBottom: 15,
  },
  listTitle: {
    color: Colors.black,
    fontSize: 20,
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
