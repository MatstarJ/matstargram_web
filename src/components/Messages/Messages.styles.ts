import styled from 'styled-components';

export const MessagesContainer = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  height: calc(100vh - 80px);
  max-width: 1200px;
  margin: 35px auto;
  overflow: hidden;
  
  @media (max-width: 935px) {
    max-width: 100%;
    margin: 0;
    height: calc(100vh - 60px);
    border-radius: 0;
    border: none;
  }
`;

interface ConversationListProps {
  isConversationSelected?: boolean;
}

export const ConversationList = styled.div<ConversationListProps>`
  width: 350px;
  border-right: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-right: none;
    display: ${props => props.isConversationSelected ? 'none' : 'flex'};
  }
`;

export const ConversationHeader = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  h2 {
    font-size: 16px;
    font-weight: 600;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    margin: 0;
  }
  
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const SearchInput = styled.div`
  padding: 8px 16px;
  position: relative;
  
  input {
    width: 100%;
    background-color: #efefef;
    border: none;
    border-radius: 8px;
    padding: 8px 16px 8px 30px;
    font-size: 14px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    
    &:focus {
      outline: none;
    }
    
    &::placeholder {
      color: #8e8e8e;
    }
  }
  
  svg {
    position: absolute;
    left: 25px;
    top: 50%;
    transform: translateY(-50%);
    color: #8e8e8e;
  }
`;

export const ConversationItems = styled.div`
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #c7c7c7;
    border-radius: 4px;
  }
`;

export const ConversationItem = styled.div<{ isActive: boolean }>`
  padding: 8px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.isActive ? '#efefef' : 'transparent'};
  
  &:hover {
    background-color: #fafafa;
  }
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  
  &.online:after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #0095f6;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    border: 2px solid white;
  }
`;

export const ConversationInfo = styled.div`
  flex: 1;
  overflow: hidden;
  
  .username {
    font-size: 14px;
    font-weight: 600;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    margin-bottom: 2px;
  }
  
  .message-preview {
    font-size: 14px;
    color: #8e8e8e;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ConversationMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  .time {
    font-size: 12px;
    color: #8e8e8e;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    margin-bottom: 4px;
  }
  
  .unread-count {
    width: 18px;
    height: 18px;
    background-color: #0095f6;
    border-radius: 50%;
    color: white;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface EmptyConversationProps {
  isConversationSelected?: boolean;
}

export const EmptyConversation = styled.div<EmptyConversationProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 40px;
  
  @media (max-width: 768px) {
    display: ${props => !props.isConversationSelected ? 'none' : 'flex'};
  }
  
  svg {
    font-size: 96px;
    color: #262626;
    margin-bottom: 16px;
  }
  
  h2 {
    font-size: 22px;
    font-weight: 300;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    color: #8e8e8e;
    margin-bottom: 24px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  button {
    background-color: #0095f6;
    color: white;
    font-weight: 600;
    padding: 7px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    border: none;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    
    &:hover {
      background-color: #1877f2;
    }
  }
`;

interface ChatContainerProps {
  isConversationSelected?: boolean;
}

export const ChatContainer = styled.div<ChatContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 350px);
  
  @media (max-width: 768px) {
    display: ${props => props.isConversationSelected ? 'flex' : 'none'};
    width: 100%;
    max-width: 100%;
  }
`;

export const ChatHeader = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  .back-button {
    display: none;
    margin-right: 12px;
    
    @media (max-width: 768px) {
      display: block;
    }
  }
  
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .user-info {
    flex: 1;
    display: flex;
    align-items: center;
    
    .username {
      font-size: 16px;
      font-weight: 600;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    }
  }
  
  .actions {
    display: flex;
    align-items: center;
    
    button {
      margin-left: 12px;
    }
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #c7c7c7;
    border-radius: 4px;
  }
`;

export const MessageGroup = styled.div`
  margin-bottom: 16px;
  
  .day-divider {
    text-align: center;
    margin: 24px 0;
    position: relative;
    
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: ${props => props.theme.colors.border};
      z-index: 0;
    }
    
    span {
      background-color: white;
      padding: 0 10px;
      position: relative;
      z-index: 1;
      font-size: 12px;
      color: #8e8e8e;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    }
  }
`;

export const Message = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: ${props => props.isMine ? 'row-reverse' : 'row'};
  align-items: flex-end;
  margin-bottom: 8px;
  
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin: ${props => props.isMine ? '0 0 0 8px' : '0 8px 0 0'};
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  
  .message-bubble {
    max-width: 65%;
    padding: 12px 16px;
    border-radius: 22px;
    background-color: ${props => props.isMine ? '#efefef' : '#0095f6'};
    color: ${props => props.isMine ? '#262626' : 'white'};
    font-size: 14px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    
    img {
      max-width: 100%;
      border-radius: 12px;
      margin-bottom: 8px;
    }
  }
  
  .message-meta {
    font-size: 12px;
    color: #8e8e8e;
    margin: ${props => props.isMine ? '0 12px 0 0' : '0 0 0 12px'};
    align-self: flex-end;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const ChatInputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  
  .emoji-button {
    margin-right: 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .input-wrapper {
    flex: 1;
    position: relative;
    
    textarea {
      width: 100%;
      background-color: #efefef;
      border: none;
      border-radius: 22px;
      padding: 10px 16px;
      font-size: 14px;
      resize: none;
      max-height: 100px;
      min-height: 40px;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
      &:focus {
        outline: none;
      }
      
      &::placeholder {
        color: #8e8e8e;
      }
    }
  }
  
  .actions {
    display: flex;
    align-items: center;
    margin-left: 12px;
    
    button {
      background: transparent;
      border: none;
      cursor: pointer;
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
      
      &.send-button {
        color: #0095f6;
        font-weight: 600;
        font-size: 14px;
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      }
    }
  }
`;

// 새로운 메시지 작성 모달 스타일
export const NewMessageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

export const NewMessageContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 400px;
  max-width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 480px) {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`;

export const NewMessageHeader = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  .close-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  h3 {
    flex: 1;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin: 0;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  .next-button {
    background: transparent;
    border: none;
    color: #0095f6;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    
    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
  }
`;

export const NewMessageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const RecipientInput = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  span {
    font-size: 14px;
    font-weight: 600;
    margin-right: 8px;
    color: #262626;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 14px;
    outline: none;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    
    &::placeholder {
      color: #8e8e8e;
    }
  }
`;

export const SelectedRecipients = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px 16px;
  gap: 8px;
  
  .recipient-chip {
    display: flex;
    align-items: center;
    background-color: #efefef;
    border-radius: 16px;
    padding: 4px 12px;
    
    span {
      font-size: 14px;
      font-weight: 600;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    button {
      background: transparent;
      border: none;
      cursor: pointer;
      margin-left: 8px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const SuggestedUsers = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
  
  h4 {
    font-size: 14px;
    color: #8e8e8e;
    font-weight: 600;
    margin: 8px 16px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #c7c7c7;
    border-radius: 4px;
  }
`;

export const UserItem = styled.div<{ isSelected: boolean }>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #fafafa;
  }
  
  .user-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 12px;
    
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  
  .user-info {
    flex: 1;
    
    .username {
      font-size: 14px;
      font-weight: 600;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .name {
      font-size: 14px;
      color: #8e8e8e;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    }
  }
  
  .selection-indicator {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid ${props => props.isSelected ? 'transparent' : '#dbdbdb'};
    background-color: ${props => props.isSelected ? '#0095f6' : 'transparent'};
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      color: white;
    }
  }
`; 