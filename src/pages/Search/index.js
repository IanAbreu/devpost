import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

import SearchList from '../../components/SearchList';
import {
  Container,
  AreaInput,
  Input,
  Icon,
  List
} from './styles';

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(input === '' || input === undefined) {
      setUsers('');
      return;
    }
    const subscriber = firestore().collection('users')
    .where('name', '>=', input)
    .where('name', '<=', input + '\uf8ff')
    .onSnapshot(snapshot => {
      const listUsers = [];
      snapshot.forEach(doc => {
        listUsers.push({
          ...doc.data(),
          id: doc.id,
        });
      })
      setUsers(listUsers);
    })
    return () => subscriber();
  },[input])

  return (
    <Container>

      <AreaInput>
        <Icon />
        <Input
          value={input}
          onChangeText={(text) => setInput(text)}
        />
      </AreaInput>

      <List
        data={users}
       
        renderItem={({item}) => <SearchList data={item}/>}
      />
    </Container>
  );
}