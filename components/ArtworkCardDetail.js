import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import useSWR from 'swr';

//Accepts single prop objectID
export default function ArtworkCardDetail(props) {
  const objectID = props.objectID;

  const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error || !data) {
    return(
      <Error statusCode={404}/>
    );
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
            <strong>Dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
