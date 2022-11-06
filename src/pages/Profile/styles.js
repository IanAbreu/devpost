import Feather from 'react-native-vector-icons/Feather';
import styled from "styled-components/native";

export const Container = styled.View`
flex: 1;
align-items: center;
background-color: #353840;
`;

export const Name = styled.Text`
margin: 20px 20px 0 20px;
font-size: 28px;
font-weight: bold;
color: #FFF;
`;
export const Email = styled.Text`
margin: 20px 10px 0 20px;
color: #FFF;
font-size: 18px;
font-style: italic;
`;
export const Button = styled.TouchableOpacity`
margin-top: 16px;
background-color: ${props => props.bg};
width: 80%;
height: 50px;
border-radius: 4px;
align-items: center;
justify-content: center;
`;
export const ButtonText = styled.Text`
font-size: 18px;
color:  ${props => props.color};
`;

export const UploadButton = styled.TouchableOpacity`
margin-top: 20%;
background-color: #FFF;
width: 165px;
height: 165px;
border-radius: 90px;
align-items: center;
justify-content: center;
z-index: 99;
`;

export const UploadText = styled.Text`
position: absolute;
font-size: 55px;
color: #E52246;
z-index: 8;
`;
export const Avatar = styled.Image`
width: 160px;
height: 160px;
border-radius: 80px;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
width: 100%;
height: 70%;
background-color: #FFF;

position: absolute;
bottom: 0;
align-items: center;
justify-content: center;
`;

export const ButtonBack = styled.TouchableOpacity`
width: 90%;
height: 50px;
position: absolute;
top: 15px;
left: 25px;
flex-direction: row;
align-items: center;
`;
export const Input = styled.TextInput`
background-color: #DDD;
width: 80%;
border-radius: 4px;
padding: 10px;
font-size: 18px;
color: #121212;
text-align: center;
`;
export const Icon = styled(Feather).attrs({
    name:'arrow-left',
    size: 25,
    color:'#121212',
})``;
