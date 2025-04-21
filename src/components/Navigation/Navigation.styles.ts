import styled from 'styled-components';

export const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 244px;
  padding: 8px 12px 20px;
  position: fixed;
  border-right: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.background};
  z-index: 2;
  overflow-y: auto;

  @media (max-width: 1264px) {
    width: 24px;
    align-items: center;
    padding: 8px 0 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 48px;
    flex-direction: row;
    padding: 0;
    border-right: none;
    border-top: 1px solid ${props => props.theme.colors.border};
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: space-between;
    z-index: 999;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 25px 12px 16px;
  margin-bottom: 19px;
  cursor: pointer;

  .logo-icon {
    margin-right: 16px;
  }

  .logo-text {
    font-size: 24px;
    font-weight: 500;
  }

  @media (max-width: 1264px) {
    padding: 25px 0 16px;
    justify-content: center;
    
    .logo-text {
      display: none;
    }
    
    .logo-icon {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavigationMenu = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 0 4px;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;

  &.active {
    font-weight: 900;
  }

  svg {
    margin-right: 16px;
  }

  @media (max-width: 1264px) {
    justify-content: center;
    
    span {
      display: none;
    }
    
    svg {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
    padding: 10px;
    border-radius: 0;
    flex: 1;
    justify-content: center;
    
    svg {
      margin-right: 0;
    }

    span {
      display: none;
    }
  }
  
  &[data-mobile-hidden="true"] {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 16px;
  }

  @media (max-width: 1264px) {
    justify-content: center;
    
    span {
      display: none;
    }
    
    img {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
    padding: 10px;
    border-radius: 0;
    flex: 1;
    justify-content: center;
    
    span {
      display: none;
    }
  }
`;

export const MoreContainer = styled.div`  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }

  svg {
    margin-right: 16px;
  }

  @media (max-width: 1264px) {
    justify-content: center;
    
    span {
      display: none;
    }
    
    svg {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
