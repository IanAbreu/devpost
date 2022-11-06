import React, { useContext, useState, } from 'react';
import { Modal, Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore'

import { AuthContext } from '../../contexts/auth';
import {
  Container,
  Name,
  Email,
  Button,
  ButtonText,
  UploadButton,
  UploadText,
  Avatar,
  ModalContainer,
  ButtonBack,
  Icon,
  Input,
} from './styles';

import Header from '../../components/Header';


export default function Profile() {

  const { signOut, user, setUser, storageUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name)
  const [url, setUrl] = useState(user?.url)
  //const [url, setUrl] = useState('https://midias.correiobraziliense.com.br/_midias/jpg/2013/11/15/675x450/1_cbifot151120135622-18891928.jpg?20220922092144?20220922092144')
  const [openModal, setOpenModal] = useState(false)

  async function handleSignOut() {
    await signOut();
  }
  async function updateProfile() {
    if (name.trim() === '') return;

    await firestore().collection('users')
    .doc(user?.uid)
    .update({ 
      name: name.trim()
    });

    const postDocs = await firestore().collection('posts')
    .where('userId', '==', user?.uid).get();
    postDocs.forEach(async doc => {
      await firestore().collection('posts').doc(doc.id)
      .update({
        author: name.trim()
      })
    })
    let data = {
      uid: user.uid,
      name: name.trim(),
      email: user.email,
    }
    
    setUser(data);
    storageUser(data);
    setOpenModal(false);
  }

  const uploadFile = () => {
    alert('clicou')
  }
  return (
    <Container>
      <Header />

      {url ? (
        <UploadButton onPress={() => uploadFile()}>
          <UploadText>+</UploadText>
          <Avatar
            source={{ uri: url }}
          />
        </UploadButton>
      ) : (
        <UploadButton  onPress={() => uploadFile()}>
          <UploadText>+</UploadText>
        </UploadButton>
      )}
      <Name>{user?.name}</Name>

      <Email>{user?.email}</Email>

      <Button
        bg='#428cfd'
        onPress={() => setOpenModal(true)}>
        <ButtonText color='#FFF'>Atualizar Perfil</ButtonText>
      </Button>

      <Button
        bg='#ddd'
        onPress={handleSignOut}>
        <ButtonText color='#353840'>Sair</ButtonText>
      </Button>

      <Modal visible={openModal} animationType='slide' transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>

          <ButtonBack onPress={() => setOpenModal(false)}>
            <Icon />
            <ButtonText color='#121212'>Voltar</ButtonText>
          </ButtonBack>

          <Input placeholder={user?.name}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Button
            bg='#428cfd'
            onPress={updateProfile}>
            <ButtonText color='#FFF'>Salvar Alterações</ButtonText>
          </Button>


        </ModalContainer>
      </Modal>
    </Container>
  );
}