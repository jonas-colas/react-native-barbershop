import React from "react";
import styled from "styled-components/native";
import HomeIcon from "../assets/home.svg";
import SearchIcon from "../assets/home.svg";
import TodayIcon from "../assets/search.svg";
import FavoritesIcon from "../assets/favorite.svg";
import AccountIcon from "../assets/account.svg";

const TabArea = styled.View`
  height: 60px;
  background-color: #4eadbe;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => {


  return(
    <TabArea>
      <TabItem>
        <HomeIcon width="24" height="24" fill="#ffffff" />
      </TabItem>
      <TabItem>
        <SearchIcon width="24" height="24" fill="#ffffff" />
      </TabItem>
      <TabItem>
        <TodayIcon width="24" height="24" fill="#ffffff" />
      </TabItem>
      <TabItem>
        <FavoritesIcon width="24" height="24" fill="#ffffff" />
      </TabItem>
      <TabItem>
        <AccountIcon width="24" height="24" fill="#ffffff" />
      </TabItem>
    </TabArea>
  );
}