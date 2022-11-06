import React, { useContext, useState, } from 'react';
import { Modal, Platform } from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

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
    const options = {
      noData: true,
      mediaType: 'photo'
    }
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('cancelou');
        
      }else if (response.error) {
        console.log('ops deu algum erro');
      }else {
        uploadFileFirebase(response)
        .then(() => {
          uploadAvatarPosts()
        })
        setUrl(response.assets[0].uri)
      }
    })
  }
  const getFileLocalePath = (response) => {
    return response.assets[0].uri
  }

  const uploadFileFirebase = async (response) => {
    const fileSource = getFileLocalePath(response)
    
    const storageRef = storage().ref('users').child(user?.uid);
    return await storageRef.putFile(fileSource);
  }
  async function uploadAvatarPosts() {
    const storageRef = storage().ref('users').child(user?.uid);
    const url = await storageRef.getDownloadURL()
    .then(async (image) => {
      const postDocs = await firestore().collection('posts')
      .where('userId', '==', user?.uid).get();
      postDocs.forEach( async doc => {
        await firestore().collection('posts').doc(doc.id).update({
          avatarURL: image
        })
      })
    })
    .catch((error) => {
      console.log('Erro ao atualizar fotos dos posts', error);
    })


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