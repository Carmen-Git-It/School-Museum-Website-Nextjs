import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import useSWR from 'swr';

//Accepts single prop objectID
export default function ArtworkCard(props) {
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
        <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"} <br />
            <strong>Classification: </strong>{data.classification ? data.classification : "N/A"} <br />
            <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}
          </Card.Text>
          <Link href={`/artwork/${objectID}`} passHref><Button variant="primary"><strong>ID: </strong>{objectID}</Button></Link>
        </Card.Body>
      </Card>
    </>
  );
}
