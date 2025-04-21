import styled from 'styled-components';

export const StoriesContainer = styled.div`
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 16px 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    border: none;
    border-radius: 0;
    margin-bottom: 0;
  }
`;

export const StoriesWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 16px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  min-width: 64px;
  cursor: pointer;
  
  &:last-child {
    margin-right: 0;
  }
`;

export const StoryAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    border-radius: 50%;
    z-index: -1;
  }
  
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 2px solid #fff;
    object-fit: cover;
  }
`;

export const StoryUsername = styled.span`
  font-size: 12px;
  color: #262626;
  margin-top: 4px;
  max-width: 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`; 