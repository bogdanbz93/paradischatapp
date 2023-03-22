import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

export default function EventScreen({navigation}: any) {
  useEffect(() => {
    navigation.setOptions({title: 'Discuta'});
  }, []);
  const [messages, setMessages] = useState<any>([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'Ați început discuția evenimentului.',
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    {
      _id: 1,
      text: 'Buna ziua, cu ce va putem ajuta?',
      createdAt: new Date().getTime(),
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

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{_id: 1}}
    />
  );
}
