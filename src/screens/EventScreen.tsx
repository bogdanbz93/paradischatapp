import React, {useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
  Actions,
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';

// Constants
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
  const [messages, setMessages] = useState<any>([]);

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
            padding: 3,
          },
          left: {
            backgroundColor: Colors.gray,
            padding: 3,
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          columnGap: 14,
        }}>
        <Icon name="paperclip" size={24} color="#888" />
        <Icon name="camera" size={24} color="#888" />
        <Send {...props}>
          <View style={styles.sendingContainer}>
            <Icon name="send" size={20} color={Colors.white} />
          </View>
        </Send>
      </View>
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
      placeholder="Discută cu noi"
      messagesContainerStyle={{paddingBottom: 10}}
      showUserAvatar
      alwaysShowSend
      minInputToolbarHeight={55}
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      renderSystemMessage={renderSystemMessage}
      renderActions={() => (
        <>
          <Actions
            onPressActionButton={() => console.log('test')}
            containerStyle={{marginBottom: 14}}
            icon={() => (
              <Icon name="emoticon-happy-outline" size={26} color="#888" />
            )}
          />
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  sendingContainer: {
    display: 'flex',
    backgroundColor: Colors.primary,
    height: '100%',
    paddingHorizontal: 12,
    borderRadius: 5,
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
    borderWidth: 1,
    backgroundColor: '555',
    borderColor: Colors.gray,
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
