import styled from 'styled-components';

export const FeedContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  margin-top: 40px;
  font-size: 14px;
  line-height: 1.4;
  
  @media (max-width: 1200px) {
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
  max-width: 800px;
  
  @media (max-width: 1200px) {
    margin-bottom: 20px;
  }
`;

export const SidebarContainer = styled.div`
  position: sticky;
  top: 40px;
  width: 320px;
  height: auto;
  align-self: flex-start;
  margin-left: 40px;
  margin-top: 8px;
  
  @media (max-width: 1024px) {
    width: 280px;
  }
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 800px;
    position: static;
    margin-left: 0;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const FeedText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: #262626;
`;

export const FeedComment = styled.div`
  font-size: 14px;
  color: #262626;
  margin-top: 16px;
`; 