import styled, { css, keyframes } from 'styled-components';
import { PanelItem, AvatarContainer, EmptyStateMessage } from '../common/SidePanel.styles';

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

export const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const NotificationsHeader = styled.div`
  padding: 24px 16px 12px;
  border-bottom: 1px solid #efefef;
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #262626;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const NotificationsContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

export const NotificationTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #efefef;
  padding: 0 16px;
`;

export const NotificationTab = styled.div<{ active: boolean }>`
  flex: 1;
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  position: relative;
  color: ${props => props.active ? '#262626' : '#8e8e8e'};
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #262626;
    opacity: ${props => props.active ? '1' : '0'};
    transition: opacity 0.2s ease;
  }
  
  &:hover {
    color: ${props => props.active ? '#262626' : '#555'};
  }
`;

export const NotificationItem = styled.div<{ unread?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  background-color: ${props => props.unread ? '#fafafa' : 'transparent'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #fafafa;
  }
`;

export const NotificationAvatar = styled.div`
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

export const NotificationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const NotificationText = styled.div`
  font-size: 14px;
  color: #262626;
  margin-bottom: 4px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  strong {
    font-weight: 600;
  }
`;

export const NotificationTime = styled.div`
  font-size: 12px;
  color: #8e8e8e;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const NotificationPreview = styled.div`
  width: 44px;
  height: 44px;
  margin-left: 12px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const EmptyNotification = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
  color: #8e8e8e;
  
  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #262626;
    margin-bottom: 8px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  p {
    font-size: 14px;
    text-align: center;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`; 