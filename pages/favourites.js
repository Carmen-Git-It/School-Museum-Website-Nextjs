import {useAtom} from 'jotai';
import {favouritesAtom} from '@/store';
import {useState} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ArtworkCard from '../components/ArtworkCard';


export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) {
    return null;
  } 

  let artworks = [];
  favouritesList.forEach((artwork) => {
      artworks.push(
          <Col lg={3} eventKey={artwork} key={artwork}>
              <ArtworkCard objectID={Number(artwork)}/>
          </Col>
      );
  });

  return (
    <>
      <Row className="gy-4">
        {artworks}
      </Row>
    </>
  );
}