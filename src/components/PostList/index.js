import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import {
    Container,
    Header,
    Avatar,
    Name,
    ContentView,
    Content,
    Actions,
    LikeButton,
    Like,
    TimePost,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { formatDistance, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function PostList({ data, userId }) {
    const [likePost, setLikePost] = useState(data?.likes);

    const navigation = useNavigation();

    function formatTimePost() {
        const datePost = new Date(data.created.seconds * 1000);
        return formatDistance(
            new Date,
            datePost,
            {
                locale: ptBR
            }
        )
    }

    async function handleLikePost(id, likes) {
        const docId = `${userId}_${id}`;

        const doc = await firestore().collection('likes').doc(docId).get();

        if (doc.exists) {
            await firestore().collection('posts').doc(id).update({
                likes: likes - 1
            })

            await firestore().collection('likes').doc(docId).delete()
                .then(() => {
                    setLikePost(likes - 1)
                })
            return;
        }

        await firestore().collection('likes')
            .doc(docId).set({
                postId: id,
                userId: userId,
            });
        await firestore().collection('posts').doc(id).update({
            likes: likes + 1,
        }).then(() => {
            setLikePost(likes + 1)
        })
    }
    return (
        <Container key={data.id}>
            <Header onPress={() => navigation.navigate('PostsUser', { title: data?.author, userId: data.userId })}>
                {data.avatarURL ? (
                    <Avatar source={{ uri: data.avatarURL }} />
                ) : <Avatar source={require('../../assets/avatar.png')} />
                }

                <Name numberOfLines={1}>{data?.author}</Name>
            </Header>

            <ContentView>
                <Content>{data?.content}</Content>
            </ContentView>

            <Actions>
                <LikeButton
                    onPress={() => handleLikePost(data.id, likePost)}
                >

                    <Like>
                        {likePost === 0 ? '' : likePost}
                    </Like>
                    <MaterialCommunityIcons
                        name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
                        size={20}
                        color={'#e52246'} />
                </LikeButton>

                <TimePost>{formatTimePost()}</TimePost>
            </Actions>
        </Container>


    );
}

//<Text>userId: {data.userId}</Text>
            //<Text>userId: {userId.id}</Text>