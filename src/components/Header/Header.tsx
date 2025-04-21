import React from 'react';
import { 
  HeaderContainer, 
  HeaderContent, 
  Logo, 
  SearchBar, 
  MobileSearchBar
} from './Header.styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <a href="/">Instagram</a>
        </Logo>
        
        <SearchBar>
          <input type="text" placeholder="검색" />
        </SearchBar>
        
        <MobileSearchBar>
          <input type="text" placeholder="검색" />
        </MobileSearchBar>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 