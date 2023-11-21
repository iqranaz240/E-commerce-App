import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { firestore as db } from '../firebase/firebaseConfig';

const ChatContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const MessageList = styled(List)({
  flex: 'none',
  overflowY: 'auto',
});

const ChatInput = styled(TextField)({
  width: '100%',
  borderTop: '1px solid #ccc',
  padding: '10px',
  marginTop: 'auto', // Set marginTop to 'auto' to push the input to the bottom
});

const Chat: React.FC<{ roomId: string; userId: string }> = ({ roomId, userId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'chats', roomId, 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [roomId]);

  const messageTime = (timestamp:  any) => {
    const dateObject = new Date(timestamp * 1000);
    const formattedDate = dateObject.toLocaleString(); 
    return formattedDate;
}

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const messageObj = {
      text: newMessage,
      userId: userId,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, 'chats', roomId, 'messages'), messageObj);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ChatContainer sx={{
        height: 'calc(100vh - 197px)',
        pt: 1.5,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}>
      <MessageList>
        {messages.map((message) => (
          <ListItem key={message.id} alignItems="flex-start">
            <ListItemText
              primary={message.text}
              secondary={messageTime(message.timestamp)}
            />
          </ListItem>
        ))}
      </MessageList>
      <ChatInput
        placeholder="Type your message..."
        variant="outlined"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton color="primary" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          ),
        }}
      />
    </ChatContainer>
  );
};

export default Chat;
