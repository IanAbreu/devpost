import Feather from 'react-native-vector-icons/Feather';
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
flex: 1;
padding-top: 14px;
background-color: #353840;
`;

export const AreaInput = styled.View`
flex-direction: row;
align-items: center;
background-color: #f1f1f1;
margin: 10px;
border-radius: 4px;
padding: 5px 10px;
`;
export const Input = styled.TextInput.attrs({
    placeholder:'Procurando alguém?',
    placeholderTextColor: '#353840',
})`
width: 90%;
background-color: #f1f1f1;
height: 40px;
padding-left: 8px;
font-size: 17px;
color: #121212;
`;

export const Icon = styled(Feather).attrs({
    name:'search' ,
    size: 25,
    color:'#E52246',
})``;

export const List = styled.FlatList`
flex: 1;

`;

