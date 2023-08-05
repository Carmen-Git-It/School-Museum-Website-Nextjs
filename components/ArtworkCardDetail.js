import Error from 'next/error';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useSWR from 'swr';
import {useAtom} from 'jotai';
import {favouritesAtom} from '@/store';
import {useState, useEffect} from 'react';
import {addToFavourites, removeFromFavourites} from '@/lib/userData';

//Accepts single prop objectID
export default function ArtworkCardDetail(props) {
  const objectID = props.objectID;

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList?.includes(objectID));

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList, objectID]);

  const {data, error} = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  if (error || !data) {
    return(
      <Error statusCode={404}/>
    );
  }

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  }

  return (
    <>
      <Card>
        <Card.Img variant="top" src={data.primaryImage ? data.primaryImage : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"} <br />
            <strong>Classification: </strong>{data.classification ? data.classification : "N/A"} <br />
            <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}
            <br /><br />
            <strong>Artist: </strong>{data.artistDisplayName ? <>{data.artistDisplayName} (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>)</>: "N/A"} <br />
            <strong>Credit Line: </strong>{data.creditLine ? data.creditLine : "N/A"} <br />
            <strong>Dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"} <br /> <br />
            <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
