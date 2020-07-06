import React from 'react';
import * as Elements from './elements';
import News from './components/News';
import Preloader from 'front/features/shared/Preloader';

const NewsCard = ({ loading, data }) => <Elements.Container>
  <Elements.Title>Лента новостей</Elements.Title>
  <Elements.Content>
    {
      loading
        ? <Preloader />
        : <>
            { data.map((news, i) => <News {...news} key = {i}/>) }
          </>        
    }
  </Elements.Content>
</Elements.Container>;

export default NewsCard;