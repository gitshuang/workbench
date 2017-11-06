import React from 'react';
import { Navbar } from 'tinper-bee';

const {
  NavItem, Header, Brand, Nav,
} = Navbar;

const Headers = () => (
  <div>
    <Navbar>
      <Header>
        <Brand>
          <a href="###"><i className="uf uf-home" /> React-FED</a>
        </Brand>
      </Header>
      <Nav>
        <NavItem eventKey={1}>选项1</NavItem>
        <NavItem eventKey={2}>
          选项2
        </NavItem>
        <NavItem eventKey={3}>
          选项3
        </NavItem>
      </Nav>
    </Navbar>
  </div>
);

export default Headers;
