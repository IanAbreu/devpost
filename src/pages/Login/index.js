import React, { useState, useContext } from 'react';
import { Text, ActivityIndicator, View } from 'react-native';


import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText, EyeBtn, Eye } from './styles';

import { AuthContext } from '../../contexts/auth';

export default function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const { signUp, signIn, loadingAuth } = useContext(AuthContext);

  async function handleSignIn() {
    if (email === '' || password === '') {
      console.log('Preencha todos os campos para logar');
      return
    }
    await signIn(email, password);
  }

  async function handleSignUp() {
    if (name === '' || email === '' || password === '') {
      console.log('Preencha todos os campos para cadastrar');
      return
    }
    await signUp(email, password, name);
  }

  function toogleLogin() {
    setName('');
    setEmail('');
    setPassword('');
    setLogin(!login);
  }
  if (login) {
    return (
      <Container>

        <Title>
          Dev<Text style={{ color: '#e52246' }}>Post</Text>
        </Title>

        <Input
          placeholder='Digite seu e-mail'
          onChangeText={(e) => { setEmail(e) }}
          value={email}
          keyboardType='email-address'
        />

        <View style={{position: 'relative', flexDirection:'row', justifyContent: 'center',width: '100%' }}>
          <Input
            placeholder='Digite sua senha'
            onChangeText={(e) => { setPassword(e) }}
            value={password}
            secureTextEntry={isHidden}
          />
          <EyeBtn onPress={() => setIsHidden(!isHidden)}>
            <Eye name={isHidden ? 'eye' : 'eye-off'} size={25} color='#afafaf' />
          </EyeBtn>
        </View>

        <Button onPress={handleSignIn}>
          {loadingAuth ?
            (
              <ActivityIndicator size={30} color='#fff' />
            ) : (
              <ButtonText>Acessar</ButtonText>
            )}
        </Button>

        <SignUpButton onPress={toogleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>

      </Container>

    );
  }
  return (
    <Container>

      <Title>
        Dev<Text style={{ color: '#e52246' }}>Post</Text>
      </Title>

      <Input
        placeholder='Digite seu nome'
        onChangeText={(e) => { setName(e) }}
        value={name}
      />

      <Input
        placeholder='Digite seu e-mail'
        onChangeText={(e) => { setEmail(e) }}
        value={email}
        keyboardType='email-address'
      />
        <View style={{position: 'relative', flexDirection:'row', justifyContent: 'center',width: '100%' }}>

      <Input
        placeholder='Digite sua senha'
        onChangeText={(e) => { setPassword(e) }}
        value={password}
        secureTextEntry={isHidden}
      />
        <EyeBtn onPress={() => setIsHidden(!isHidden)}>
            <Eye name={isHidden ? 'eye' : 'eye-off'} size={25} color='#afafaf' />
          </EyeBtn>
        </View>

      <Button onPress={handleSignUp}>
        {loadingAuth ?
          (
            <ActivityIndicator size={30} color='#fff' />
          ) : (
            <ButtonText>Cadastrar</ButtonText>
          )}
      </Button>

      <SignUpButton onPress={toogleLogin}>
        <SignUpText>Já tenho uma conta</SignUpText>
      </SignUpButton>

    </Container>

  );
}