import React from 'react';
import styled from "styled-components/native";


export const Container = styled.SafeAreaView`
  background-color: #63C2D1;
  flex: 1;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

export const SearchButton = styled.TouchableOpacity`

`;

export const LocationArea = styled.View`

`;

export const LocationInput = styled.TextInput`

`;

export const LocationFinder = styled.TouchableOpacity`

`;