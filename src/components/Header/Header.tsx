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
import { Link } from 'react-router-dom';

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

// 링크 스타일
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 24px;
  font-weight: 600;
`;

const Header: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  // 로그인 핸들러
  const handleLogin = () => {
    console.log('로그인 시도...');
    login();
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    console.log('로그아웃 시도...');
    logout();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <StyledLink to="/home">Instagram</StyledLink>
        </Logo>
        
        {isAuthenticated ? (
          <>
            <SearchBar>
              <input type="text" placeholder="검색" />
            </SearchBar>
            
            <MobileSearchBar>
              <input type="text" placeholder="검색" />
            </MobileSearchBar>
            
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 