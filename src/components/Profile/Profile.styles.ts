import styled from 'styled-components';

export const ProfileContainer = styled.div`
  max-width: 935px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  margin-bottom: 44px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
`;

export const ProfileAvatarContainer = styled.div`
  width: 150px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

export const ProfileAvatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Username = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 12px;
  }
`;

export const ProfileActions = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-top: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const FollowButton = styled.button`
  background-color: ${props => props.theme.colors.primaryButtonBg};
  color: ${props => props.theme.colors.primaryButtonText};
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryButtonHoverBg};
  }
`;

export const MessageButton = styled.button`
  background-color: ${props => props.theme.colors.secondaryButtonBg};
  color: ${props => props.theme.colors.buttonText};
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  margin-right: 8px;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondaryButtonHoverBg};
  }
`;

export const MoreButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StatsRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    justify-content: space-around;
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const StatItem = styled.div`
  margin-right: 40px;
  display: flex;
  
  @media (max-width: 768px) {
    margin-right: 0;
    flex-direction: column;
    align-items: center;
  }
`;

export const StatCount = styled.span`
  font-weight: 500;
  margin-right: 5px;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 4px;
  }
`;

export const StatLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const ProfileBio = styled.div`
  margin-bottom: 20px;
`;

export const Name = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

export const Bio = styled.div`
  white-space: pre-line;
  margin-bottom: 4px;
`;

export const Website = styled.a`
  color: ${props => props.theme.colors.link};
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 20px;
`;

export interface TabProps {
  isActive: boolean;
}

export const Tab = styled.button<TabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: transparent;
  border: none;
  border-top: 1px solid ${props => props.isActive ? props.theme.colors.text : 'transparent'};
  margin-top: -1px;
  color: ${props => props.isActive ? props.theme.colors.text : props.theme.colors.textSecondary};
  font-weight: ${props => props.isActive ? '600' : '400'};
  cursor: pointer;
  transition: color 0.2s ease;
  
  svg {
    margin-right: 6px;
  }
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  
  @media (max-width: 768px) {
    gap: 1px;
  }
`;

export const PostGridItem = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 1:1 Aspect Ratio */
  background-color: ${props => props.theme.colors.secondaryBackground};
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

export const PostImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PostOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const PostStats = styled.div`
  display: flex;
  color: white;
  font-weight: 600;
`;

export const PostStat = styled.div`
  display: flex;
  align-items: center;
  margin: 0 12px;
  
  svg {
    margin-right: 6px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  
  svg {
    font-size: 40px;
    margin-bottom: 16px;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const EmptyStateTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const EmptyStateText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  max-width: 350px;
`; 