import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

function MainNav() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  function submit(e){
    e.preventDefault();
    router.push(`/artwork?title=true&q=${search}`)
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary">
        <Container>
          <Navbar.Brand>Carmen Whitton</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" legacyBehavior passHref><Nav.Link>Home</Nav.Link></Link>
              <Link href="/search" legacyBehavior passHref><Nav.Link>Advanced Search</Nav.Link></Link>
            </Nav>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br/><br/>
    </>
  );
}

export default MainNav;