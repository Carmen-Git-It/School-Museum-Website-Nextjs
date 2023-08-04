import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {useAtom} from 'jotai';
import {searchHistoryAtom} from '@/store';

function MainNav() {
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function submit(e){
    e.preventDefault();
    setSearchHistory(current => [...current, `title=true&q=${search}`]);
    setIsExpanded(false);
    router.push(`/artwork?title=true&q=${search}`)
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Carmen Whitton</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => {setIsExpanded(!isExpanded)}}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" legacyBehavior passHref><Nav.Link active={router.pathname === "/"} onClick={() => {setIsExpanded(false)}}>Home</Nav.Link></Link>
              <Link href="/search" legacyBehavior passHref><Nav.Link active={router.pathname === "/search"} onClick={() => {setIsExpanded(false)}}>Advanced Search</Nav.Link></Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={submit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="success" type="submit">Search</Button>
            </Form>
            &nbsp;
            <Nav>
            <NavDropdown title="User Name" id="basic-nav-dropdown">
              <Link href="/favourites" legacyBehavior passHref><NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => {setIsExpanded(false)}}>Favourites</NavDropdown.Item></Link>
              <Link href="/history" legacyBehavior passHref><NavDropdown.Item active={router.pathname === "/history"} onClick={() => {setIsExpanded(false)}}>Search History</NavDropdown.Item></Link>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br/><br/>
    </>
  );
}

export default MainNav;