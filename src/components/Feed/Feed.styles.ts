import styled from 'styled-components';

export const FeedContainer = styled.div`
  display: flex;
  max-width: 935px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  margin-top: 40px;
  
  @media (max-width: 935px) {
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
  
  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 614px;
  
  @media (max-width: 935px) {
    margin-bottom: 20px;
  }
`;

export const SidebarContainer = styled.div`
  position: sticky;
  top: 40px;
  width: 293px;
  height: auto;
  align-self: flex-start;
  margin-left: 28px;
  margin-top: 8px;
  
  @media (max-width: 1024px) {
    width: 245px;
  }
  
  @media (max-width: 935px) {
    width: 100%;
    max-width: 614px;
    position: static;
    margin-left: 0;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`; 