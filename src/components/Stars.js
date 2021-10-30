import React from 'react';
import styled from 'styled-components/native';
import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';

const StarArea = styled.View`
  flex-direction: row;
`;

const StarView = styled.View`
  
`;

const StarText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: #737373;
`;

export default ({stars, showNumber}) => {
    let st = [0, 0, 0, 0, 0];

    let floor = Math.floor(stars);
    
    for(var i=0; i<floor; i++) {
      st[i] = 2; 
    }

    let left = stars - floor;
    if(left > 0){
      st[i] = 1;
    }



  return (
    <StarArea>
      { st.map((s, i) => (
          <StarView key={i}>
            { s === 0 && <StarEmpty width="18" height="18" fill="#ff9200" /> }
            { s === 1 && <StarHalf width="18" height="18" fill="#ff9200" /> }
            { s === 2 && <StarFull width="18" height="18" fill="#ff9200" /> }
          </StarView>
        ))
      }
      {showNumber && <StarText>{stars}</StarText> }
    </StarArea>
  )
}