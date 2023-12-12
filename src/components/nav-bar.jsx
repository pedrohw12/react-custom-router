// Navigation.js
import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from "../router";

const StyledLink = styled(RouterLink)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:visited {
    color: white;
  }
`;

const Navigation = () => (
  <nav style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '1rem', backgroundColor: '#333' }}>
    <StyledLink to="/">Home</StyledLink>
    <StyledLink to="/about">About</StyledLink>
    <StyledLink to="/dashboard/settings">Dashboard Settings</StyledLink>
  </nav>
);

export default Navigation;
