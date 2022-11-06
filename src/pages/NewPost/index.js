import React, { useState, useLayoutEffect, useContext } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Container, Input, Button, ButtonText } from './styles';

import { AuthContext } from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function NewPost() {
  const [post, setPost] = useState('')
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => handlePost()}
        >
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })

  }, [navigation, post])

  async function handlePost() {
    if (post === '') {
      alert('Digite algum post')
      return;
    }
    let avatarURL = null;
    try {
      let response = await storage().ref('users').child(user?.uid).getDownloadURL();
      let avatarURL = response
    } catch (error) {
      avatarURL = null;
    }
    await firestore().collection('posts')
    .add({
      created: new Date(),
      content: post,
      author: user?.name,
      userId: user?.uid,
      likes: 0,
      avatarURL,
    })
    .then(() =>{
      setPost('');
    })
    .catch((error) => {
      console.log('Erro:' + error);
    })

    navigation.goBack();

  }


  return (
    <Container>

      <Input
        placeholder='O que está acontecendo...'
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false}
        multiline={true}
        placeholderTextColor={'#DDD'}
        maxLength={400}
      />

    </Container>
  );
}