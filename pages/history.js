import {useAtom} from 'jotai';
import {searchHistoryAtom} from '@/store';
import { useRouter } from 'next/router';
import styles from '@/styles/History.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  function removeHistoryClicked(e, index) {
    e.stopPropagation();

    setSearchHistory(current => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  }

  if (parsedHistory.length == 0) {
    return (
      <Card>
        <Card.Body>
            <Card.Text>
                <h4>Nothing Here</h4> Try searching for some artwork.
            </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  let historyListItems = [];
  for (let i = 0; i < parsedHistory.length; i++) {
    historyListItems.push(
      <ListGroup.Item onClick={e => historyClicked(e, i)} className={styles.historyListItem}>
        {Object.keys(parsedHistory[i]).map(key => (<>{key}: <strong>{parsedHistory[i][key]}</strong>&nbsp;</>))}
        <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, i)}>&times;</Button>
      </ListGroup.Item>
    );
  }

  return(
    <ListGroup>
      {historyListItems}
    </ListGroup>
  );

}