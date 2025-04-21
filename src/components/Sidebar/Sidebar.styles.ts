import styled from 'styled-components';

export const SidebarContainer = styled.div`
  padding: 0;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-top: 4px;
`;

export const ProfileAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const ProfileUsername = styled.div`
  font-weight: 600;
  color: #262626;
  margin-bottom: 2px;
`;

export const ProfileName = styled.div`
  color: #8e8e8e;
  font-size: 14px;
`;

export const SuggestionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 12px;
  
  span {
    color: #8e8e8e;
    font-weight: 600;
    font-size: 14px;
  }
  
  button {
    background: transparent;
    border: none;
    color: #262626;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
  }
`;

export const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const SuggestionAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SuggestionInfo = styled.div`
  flex: 1;
`;

export const SuggestionUsername = styled.div`
  font-weight: 600;
  color: #262626;
  font-size: 14px;
  margin-bottom: 2px;
`;

export const SuggestionStatus = styled.div`
  color: #8e8e8e;
  font-size: 12px;
`;

export const FollowButton = styled.button`
  background: transparent;
  border: none;
  color: #0095f6;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-bottom: 12px;
  
  a {
    color: #c7c7c7;
    font-size: 11px;
    margin-right: 8px;
    margin-bottom: 4px;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FooterCopyright = styled.div`
  color: #c7c7c7;
  font-size: 11px;
  text-transform: uppercase;
  margin-top: 12px;
`;