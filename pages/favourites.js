import {useAtom} from 'jotai';
import {favouritesAtom} from '@/store';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ArtworkCard from '../components/ArtworkCard';


export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) {
    return null;
  }
  
  if (favouritesList.length === 0) {
    return(
      <Card>
      <Card.Body>
          <Card.Text>
              <h4>Nothing Here</h4> Try adding favourites!
          </Card.Text>
      </Card.Body>
      </Card>
    );
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