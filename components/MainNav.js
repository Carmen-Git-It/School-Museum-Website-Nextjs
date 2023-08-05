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
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

function MainNav() {
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
 }

  async function submit(e){
    e.preventDefault();
    setSearchHistory(await addToHistory(`title=true&q=${search}`));
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
              {token && <Link href="/search" legacyBehavior passHref><Nav.Link active={router.pathname === "/search"} onClick={() => {setIsExpanded(false)}}>Advanced Search</Nav.Link></Link>}
            </Nav>
            &nbsp;
            {!token && 
              <Nav>
                <Link href="/register" legacyBehavior passHref><Nav.Link onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                <Link href="/login" legacyBehavior passHref><Nav.Link onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/login"}>Login</Nav.Link></Link>
              </Nav>}
            {token && <Form className="d-flex" onSubmit={submit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" type="submit">Search</Button>
              </Form>}
            &nbsp;
            <Nav>
            {token && <NavDropdown title={token.userName} id="basic-nav-dropdown">
              <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
              <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/history"}>History</NavDropdown.Item></Link>
              <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
              </NavDropdown>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br/><br/>
    </>
  );
}

export default MainNav;