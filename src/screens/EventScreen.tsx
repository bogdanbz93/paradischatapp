import React, {useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import {IconButton} from 'react-native-paper';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {Colors} from '../components/constants/theme';

// Moment
import moment from 'moment';
import 'moment/locale/ro';
moment.locale('ro');

// Auth Statements
import {AuthContext} from '../navigation/AuthProvider';

export default function EventScreen({route}: any) {
  // User
  const {user} = useContext(AuthContext);
  const currentUser = user.toJSON();

  // Event
  const {event} = route.params;

  // Chat
  const [messages, setMessages] = useState<any>([
    {
      _id: 0,
      text: 'Ați început discuția evenimentului.',
      createdAt: event.createdAt.toDate(),
      system: true,
    },
    {
      _id: 1,
      text: `Bună ziua! \n\nAți selectat evenimentul "${
        event.name
      }", creat cu ${moment(route.params.createdAt)
        .startOf('day')
        .fromNow()}. \n\nLăsați-ne un mesaj și vă vom răspunde cât de repede posibil. Cu ce vă putem ajuta?`,
      createdAt: event.createdAt.toDate(),
      user: {
        _id: 2,
        name: 'Restaurant Paradis',
      },
    },
  ]);

  async function handleSend(messages: any) {
    const text = messages[0].text;
    firestore()
      .collection('EVENTS')
      .doc(event._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
        },
      });

    await firestore()
      .collection('EVENTS')
      .doc(event._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
      );
  }

  useEffect(() => {
    const messagesListener = firestore()
      .collection('EVENTS')
      .doc(event._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data: {
            text: string;
            _id: string;
            createdAt: number;
            user?: string;
          } = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

  function renderBubble(props: any) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.primary,
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function renderSend(props: any) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton
            icon="send-circle"
            size={32}
            iconColor={Colors.primary.toString()}
          />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton
          icon="chevron-double-down"
          size={28}
          iconColor={Colors.black.toString()}
        />
      </View>
    );
  }

  function renderSystemMessage(props: any) {
    return (
      <View style={styles.systemMessageContainer}>
        <Text style={{textAlign: 'center', fontSize: 12, color: '#999'}}>
          Mesaj automat
        </Text>
        <SystemMessage
          {...props}
          wrapperStyle={styles.systemMessageWrapper}
          textStyle={styles.systemMessageText}
        />
      </View>
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{_id: currentUser.uid}}
      renderBubble={renderBubble}
      placeholder="Discută cu operatorul nostru.."
      showUserAvatar
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      renderSystemMessage={renderSystemMessage}
    />
  );
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemMessageContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  systemMessageWrapper: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
});
