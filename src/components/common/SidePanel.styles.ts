import styled from 'styled-components';

// 기본 사이드 패널 컨테이너
export const SidePanelContainer = styled.div`
  position: fixed;
  left: 244px;
  top: 0;
  width: 397px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #dbdbdb;
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.06);
  
  @media (max-width: 1264px) {
    left: 72px;
  }
  
  @media (max-width: 768px) {
    left: 0;
    width: 100%;
    border-right: none;
  }
`;

// 패널 헤더 스타일
export const PanelHeader = styled.div`
  padding: 24px 16px 12px;
  border-bottom: 1px solid #efefef;
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #262626;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

// 패널 콘텐츠 스타일
export const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

// 아바타 스타일
export const AvatarContainer = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 아이템 스타일
export const PanelItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #fafafa;
  }
  
  ${props => props.isActive && `
    background-color: #f7f7f7;
  `}
`;

// 아이템 텍스트 스타일
export const ItemText = styled.div`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;

// 빈 상태 메시지 스타일
export const EmptyStateMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
  color: #8e8e8e;
  
  svg {
    margin-bottom: 16px;
    color: #8e8e8e;
  }
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    text-align: center;
  }
`; 