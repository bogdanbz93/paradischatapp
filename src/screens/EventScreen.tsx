import React, {useState} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {IconButton} from 'react-native-paper';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Colors} from '../components/constants/theme';

// Moment
import moment from 'moment';
import 'moment/locale/ro';
moment.locale('ro');

export default function EventScreen({route}: any) {
  const [messages, setMessages] = useState<any>([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'Ați început discuția evenimentului.',
      createdAt: route.params.event.createdAt.toDate(),
      system: true,
    },
    // example of chat message
    {
      _id: 1,
      text: `Bună ziua! \n\nAți selectat evenimentul "${
        route.params.event.name
      }", creat cu ${moment(route.params.createdAt)
        .startOf('day')
        .fromNow()}. \n\nLăsați-ne un mesaj și vă vom răspunde cât de repede posibil. Cu ce vă putem ajuta?`,
      createdAt: route.params.event.createdAt.toDate(),
      user: {
        _id: 2,
        name: 'Restaurant Paradis',
      },
    },
  ]);

  // helper method that is sends a message
  function handleSend(newMessage: any = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

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
      onSend={newMessage => handleSend(newMessage)}
      user={{_id: 1, name: 'User Test'}}
      renderBubble={renderBubble}
      placeholder="Discută cu operatorul nostru.."
      showUserAvatar
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
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
});
