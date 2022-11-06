import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
flex: 1;
background-color: #36393f;
justify-content: center;
align-items: center;
`;

export const Title = styled.Text`
color: #fff;
font-size: 55px;
font-weight: bold;
font-style: italic;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#afafaf",
    
  })`
width: 80%;
background-color: #fff;
margin-top: 10px;
padding: 10px;
border-radius: 8px;
font-size: 17px;
`;
export const EyeBtn = styled.TouchableOpacity`
position: absolute;
right: 14%;
top: 40%;
z-index: 99;
`
export const Eye = styled(Feather).attrs(props => ({
  name: props.name,
  size: props.size,
  color: props.color
}))``;

export const Button = styled.TouchableOpacity`
width: 80%;
background-color: #418cfd;
border-radius: 8px;
margin-top: 10px;
padding: 10px;
align-items: center;
justify-content: center;

`;
export const ButtonText = styled.Text`
color: #fff;
font-size: 20px;
`;
export const SignUpButton = styled.TouchableOpacity`
width: 100%;
margin: 10px;
align-items: center;
justify-content: center;
`;
export const SignUpText = styled.Text`
color: #ddd;
font-size: 15px;
`;