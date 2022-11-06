import React, { useState, useContext, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/auth'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

import { Container, ButtonPost, ListPost } from './styles';

import Header from '../../components/Header';
import PostList from '../../components/PostList';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);


  useFocusEffect(
    useCallback(() => {
      let isActive = true
      function fetchPosts() {
        firestore().collection('posts')
          .orderBy('created', 'desc')
          .limit(5).get()
          .then((snapshot) => {
            if (isActive) {
              setPosts([]);
              const postList = [];
              snapshot.docs.map(u => {
                postList.push({
                  ...u.data(),
                  id: u.id
                })
              })
              setPosts(postList);
              setLastItem(snapshot.docs[snapshot.docs.length - 1]);
              setEmptyList(!!snapshot.empty)
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
      fetchPosts();
      return () => {
        isActive = false
      }
    }, [])
  )


  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  async function handleRefreshPost() {
    setLoadingRefresh(true)
    firestore().collection('posts')
      .orderBy('created', 'desc')
      .limit(5).get()
      .then((snapshot) => {
        setPosts([]);
        const postList = [];

        snapshot.docs.map(u => {
          postList.push({
            ...u.data(),
            id: u.id
          })
        })

        setEmptyList(false);
        setPosts(postList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
    setLoadingRefresh(false);
  }

  async function getListPost() {
    if (emptyList) {
      setLoading(false);
      return null;
    }

    if (loading) return;

    firestore().collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .startAfter(lastItem)
      .get()
      .then((snapshot) => {
        const postList = [];
        snapshot.docs.map(u => {
          postList.push({
            ...u.data(),
            id: u.id
          })
        })
        setEmptyList(!!snapshot.empty);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setPosts(oldPosts => [...oldPosts, ...postList]);
        setLoading(false);
      })
  }

  return (
    <Container>
      <Header />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={50} color='#E52246' />
        </View>
      ) : (
        <ListPost
          showsVerticalScrollsIndicator={false}
          data={posts}
          renderItem={({ item }) => (
            <PostList
              data={item}
              userId={user?.uid}
            />)}
          refreshing={loadingRefresh}
          onRefresh={handleRefreshPost}
          onEndReached={() => getListPost()}
          onEndReachedThreshold={0.1}

          ListFooterComponent={ emptyList ? null : <ActivityIndicator size={30} color='#121212'/>}
        />
      )}

      <ButtonPost
        onPress={() => navigation.navigate('NewPost')}
        activeOpacity={0.8}
      >
        <Feather
          name='edit-2'
          size={25}
          color='#fff'
        />
      </ButtonPost>
    </Container>
  );
}