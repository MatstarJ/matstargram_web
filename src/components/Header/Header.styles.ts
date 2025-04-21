import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  z-index: 100;
  height: 60px;
  display: none;
  
  @media (max-width: 768px) {
    z-index: 101;
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 975px;
  padding: 0 20px;
  margin: 0 auto;
  height: 60px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 48px;
  }
`;

export const Logo = styled.div`
  font-family: 'Instagram Sans', cursive;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  
  a {
    color: #262626;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  height: 36px;
  min-width: 125px;
  width: 268px;
  display: flex;
  align-items: center;
  background-color: #efefef;
  border-radius: 8px;
  padding: 0 16px;
  
  input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 14px;
    color: #262626;
    
    &::placeholder {
      color: #8e8e8e;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileSearchBar = styled.div`
  display: none;
  position: relative;
  height: 36px;
  width: 40%;
  max-width: 200px;
  background-color: #efefef;
  border-radius: 8px;
  align-items: center;
  padding: 0 16px;
  
  input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 14px;
    color: #262626;
    
    &::placeholder {
      color: #8e8e8e;
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
    color: #262626;
  }
  
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 44px;
  border-top: 1px solid #dbdbdb;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;

  @media (max-width: 768px) {
    display: none;
  }
`; 