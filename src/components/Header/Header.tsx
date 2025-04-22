import React from 'react';
import { 
  HeaderContainer, 
  HeaderContent, 
  Logo, 
  SearchBar, 
  MobileSearchBar
} from './Header.styles';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

// 로그인 버튼 스타일
const LoginButton = styled.button`
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0074cc;
  }
`;

// 로그아웃 버튼 스타일
const LogoutButton = styled.button`
  background-color: transparent;
  color: #262626;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Header: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <a href="/home">Instagram</a>
        </Logo>
        
        {isAuthenticated ? (
          <>
            <SearchBar>
              <input type="text" placeholder="검색" />
            </SearchBar>
            
            <MobileSearchBar>
              <input type="text" placeholder="검색" />
            </MobileSearchBar>
            
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
          </>
        ) : (
          <LoginButton onClick={login}>로그인</LoginButton>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 