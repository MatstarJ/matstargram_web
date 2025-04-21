import styled, { css, keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  20% {
    transform: translateX(80%);
    opacity: 0.2;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const SearchHeader = styled.div`
  padding: 24px 16px 12px;
  border-bottom: 1px solid #efefef;
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #262626;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const SearchInput = styled.input`
  margin: 8px 16px;
  padding: 8px 16px;
  background-color: #efefef;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  line-height: 24px;
  color: #262626;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #8e8e8e;
  }
`;

export const SearchContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
  
  .search-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
  }
`;

export const SearchLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  padding: 8px 16px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const RecentSearches = styled.div`
  margin-bottom: 16px;
`;

export const SearchResults = styled.div`
  padding-bottom: 16px;
`;

export const SearchItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #fafafa;
  }
`;

export const SearchAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SearchInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const SearchUsername = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const SearchName = styled.div`
  font-size: 14px;
  color: #8e8e8e;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const ClearSearchButton = styled.button`
  background: none;
  border: none;
  color: #0095f6;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const EmptySearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
  color: #8e8e8e;
  font-size: 14px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`; 