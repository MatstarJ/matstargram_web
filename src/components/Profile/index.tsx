import React, { useState, useContext } from 'react';
import * as FaIcons from 'react-icons/fa6';
import styled from 'styled-components';
import { PostModalContext } from '../../App';
import { useNavigate } from 'react-router-dom';

// 스타일 컴포넌트 정의
const ProfileContainer = styled.div`
  max-width: 935px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  margin-bottom: 44px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
`;

const ProfileAvatarContainer = styled.div`
  width: 150px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const ProfileAvatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Username = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 12px;
  }
`;

const ProfileActions = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-top: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const FollowButton = styled.button`
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

const MessageButton = styled.button`
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

const MoreButton = styled.button`
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

const StatsRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    justify-content: space-around;
    width: 100%;
    margin-bottom: 16px;
  }
`;

const StatItem = styled.div`
  margin-right: 40px;
  display: flex;
  
  @media (max-width: 768px) {
    margin-right: 0;
    flex-direction: column;
    align-items: center;
  }
`;

const StatCount = styled.span`
  font-weight: 500;
  margin-right: 5px;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 4px;
  }
`;

const StatLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ProfileBio = styled.div`
  margin-bottom: 20px;
`;

const Name = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const Bio = styled.div`
  white-space: pre-line;
  margin-bottom: 4px;
`;

const Website = styled.a`
  color: ${props => props.theme.colors.link};
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 20px;
`;

interface TabProps {
  isActive: boolean;
}

const Tab = styled.button<TabProps>`
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

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  
  @media (max-width: 768px) {
    gap: 1px;
  }
`;

const PostGridItem = styled.div`
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

const PostImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostOverlay = styled.div`
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

const PostStats = styled.div`
  display: flex;
  color: white;
  font-weight: 600;
`;

const PostStat = styled.div`
  display: flex;
  align-items: center;
  margin: 0 12px;
  
  svg {
    margin-right: 6px;
  }
`;

const EmptyState = styled.div`
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

const EmptyStateTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const EmptyStateText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  max-width: 350px;
`;

// 프로필 정보 목업 데이터
const userProfile = {
  username: '우주_스타',
  name: '오스타',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  posts: 45,
  followers: 1252,
  following: 138,
  bio: '우주에서 온 스타⭐\n인스타그램 클론 프로젝트에 참여 중',
  websiteUrl: 'https://matstarworld.co.kr'
};

// 게시물 목업 데이터
const posts = Array(12).fill(null).map((_, index) => ({
  id: `post-${index + 1}`,
  imageUrl: `https://picsum.photos/seed/${index + 1}/800/800`,
  likes: Math.floor(Math.random() * 100) + 10,
  comments: Math.floor(Math.random() * 20) + 1,
  username: '우주_스타',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  description: `게시물 ${index + 1}에 대한 설명입니다. 인스타그램 클론 프로젝트 예시 게시물입니다.`,
  time: `${Math.floor(Math.random() * 24) + 1}시간 전`
}));

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  const { setSelectedPostId } = useContext(PostModalContext);
  const navigate = useNavigate();

  // 타입 단언을 사용하여 아이콘 컴포넌트 렌더링
  const IconEllipsis = FaIcons.FaEllipsis as any;
  const IconTableCells = FaIcons.FaTableCells as any;
  const IconBookmark = FaIcons.FaBookmark as any;
  const IconTag = FaIcons.FaTag as any;
  const IconHeart = FaIcons.FaHeart as any;
  const IconComment = FaIcons.FaComment as any;

  // 게시물 클릭 핸들러
  const handlePostClick = (post: any) => {
    // 전역 상태에 선택된 포스트 ID를 설정
    setSelectedPostId(post.id);
  };

  // 프로필 편집 페이지로 이동하는 함수
  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatarContainer>
          <ProfileAvatar src={userProfile.avatar} alt={userProfile.username} />
        </ProfileAvatarContainer>
        
        <ProfileInfo>
          <UsernameRow>
            <Username>{userProfile.username}</Username>
            <ProfileActions>
              <MessageButton onClick={handleEditProfile}>프로필 편집</MessageButton>
              <MessageButton>보관된 스토리보기</MessageButton>
            </ProfileActions>
          </UsernameRow>
          
          <StatsRow>
            <StatItem>
              <StatCount>{userProfile.posts}</StatCount>
              <StatLabel>게시물</StatLabel>
            </StatItem>
            <StatItem>
              <StatCount>{userProfile.followers.toLocaleString()}</StatCount>
              <StatLabel>팔로워</StatLabel>
            </StatItem>
            <StatItem>
              <StatCount>{userProfile.following.toLocaleString()}</StatCount>
              <StatLabel>팔로우</StatLabel>
            </StatItem>
          </StatsRow>
          
          <ProfileBio>
            <Name>{userProfile.name}</Name>
            <Bio>{userProfile.bio}</Bio>
            <Website href={userProfile.websiteUrl} target="_blank" rel="noopener noreferrer">
              {userProfile.websiteUrl}
            </Website>
          </ProfileBio>
        </ProfileInfo>
      </ProfileHeader>
      
      <TabsContainer>
        <Tab 
          isActive={activeTab === 'posts'} 
          onClick={() => setActiveTab('posts')}
        >
          <IconTableCells />
          게시물
        </Tab>
        <Tab 
          isActive={activeTab === 'saved'} 
          onClick={() => setActiveTab('saved')}
        >
          <IconBookmark />
          저장됨
        </Tab>
        <Tab 
          isActive={activeTab === 'tagged'} 
          onClick={() => setActiveTab('tagged')}
        >
          <IconTag />
          태그됨
        </Tab>
      </TabsContainer>
      
      {activeTab === 'posts' && (
        <PostsGrid>
          {posts.map(post => (
            <PostGridItem key={post.id} onClick={() => handlePostClick(post)}>
              <PostImage src={post.imageUrl} alt="게시물 이미지" />
              <PostOverlay className="overlay">
                <PostStats>
                  <PostStat>
                    <IconHeart />
                    {post.likes}
                  </PostStat>
                  <PostStat>
                    <IconComment />
                    {post.comments}
                  </PostStat>
                </PostStats>
              </PostOverlay>
            </PostGridItem>
          ))}
        </PostsGrid>
      )}
      
      {activeTab === 'saved' && (
        <EmptyState>
          <IconBookmark />
          <EmptyStateTitle>저장</EmptyStateTitle>
          <EmptyStateText>
            다시 보고 싶은 사진과 동영상을 저장하세요.
          </EmptyStateText>
        </EmptyState>
      )}
      
      {activeTab === 'tagged' && (
        <EmptyState>
          <IconTag />
          <EmptyStateTitle>사진</EmptyStateTitle>
          <EmptyStateText>
            사람들이 회원님을 사진에 태그하면 태그된 사진이 여기에 표시됩니다.
          </EmptyStateText>
        </EmptyState>
      )}
    </ProfileContainer>
  );
};

export default Profile;
