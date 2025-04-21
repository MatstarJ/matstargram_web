import React from 'react';
import { 
  SidebarContainer, 
  ProfileSection, 
  ProfileAvatar, 
  ProfileInfo, 
  ProfileUsername, 
  ProfileName,
  SuggestionsHeader,
  SuggestionItem,
  SuggestionAvatar,
  SuggestionInfo,
  SuggestionUsername,
  SuggestionStatus,
  FollowButton,
  FooterLinks,
  FooterCopyright 
} from './Sidebar.styles';

// 임시 데이터
const suggestionsData = [
  { 
    id: 1, 
    username: 'photographer_lee', 
    name: '이진우', 
    avatar: 'https://i.pravatar.cc/32?img=20',
    status: '회원님을 위한 추천'
  },
  { 
    id: 2, 
    username: 'baker_kim', 
    name: '김도현', 
    avatar: 'https://i.pravatar.cc/32?img=21',
    status: 'traveler_kim님 외 3명이 팔로우합니다'
  },
  { 
    id: 3, 
    username: 'coding_park', 
    name: '박지호', 
    avatar: 'https://i.pravatar.cc/32?img=22',
    status: 'Instagram 신규 가입'
  },
  { 
    id: 4, 
    username: 'yoga_master', 
    name: '정유진', 
    avatar: 'https://i.pravatar.cc/32?img=23',
    status: 'fitness_coach_choi님이 팔로우합니다'
  },
  { 
    id: 5, 
    username: 'ceramic_artist', 
    name: '최민지', 
    avatar: 'https://i.pravatar.cc/32?img=24',
    status: 'creative_park님 외 2명이 팔로우합니다'
  },
  { 
    id: 6, 
    username: 'plant_lover', 
    name: '한수민', 
    avatar: 'https://i.pravatar.cc/32?img=25',
    status: '회원님을 위한 추천'
  },
  { 
    id: 7, 
    username: 'interior_cho', 
    name: '조은별', 
    avatar: 'https://i.pravatar.cc/32?img=26',
    status: 'Instagram 신규 가입'
  },
];

// 현재 사용자 데이터
const currentUser = {
  username: 'my_username',
  name: '나의 이름',
  avatar: 'https://i.pravatar.cc/56?img=15'
};

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <ProfileSection>
        <ProfileAvatar>
          <img src={currentUser.avatar} alt="내 프로필" />
        </ProfileAvatar>
        <ProfileInfo>
          <ProfileUsername>{currentUser.username}</ProfileUsername>
          <ProfileName>{currentUser.name}</ProfileName>
        </ProfileInfo>
        <FollowButton>전환</FollowButton>
      </ProfileSection>

      <SuggestionsHeader>
        <span>회원님을 위한 추천</span>
        <button>모두 보기</button>
      </SuggestionsHeader>

      {suggestionsData.slice(0, 5).map((suggestion) => (
        <SuggestionItem key={suggestion.id}>
          <SuggestionAvatar>
            <img src={suggestion.avatar} alt={suggestion.username} />
          </SuggestionAvatar>
          <SuggestionInfo>
            <SuggestionUsername>{suggestion.username}</SuggestionUsername>
            <SuggestionStatus>{suggestion.status}</SuggestionStatus>
          </SuggestionInfo>
          <FollowButton>팔로우</FollowButton>
        </SuggestionItem>
      ))}

      <FooterLinks>
        <a href="https://about.instagram.com/">소개</a>
        <a href="https://help.instagram.com/">도움말</a>
        <a href="https://about.instagram.com/blog/">홍보 센터</a>
        <a href="https://developers.facebook.com/docs/instagram">API</a>
        <a href="https://about.instagram.com/about-us/careers">채용 정보</a>
        <a href="https://privacycenter.instagram.com/">개인정보처리방침</a>
        <a href="https://help.instagram.com/581066165581870">약관</a>
        <a href="https://www.instagram.com/explore/locations/">위치</a>
        <a href="https://www.instagram.com/accounts/language/language_selection/">언어</a>
        <a href="https://www.facebook.com/help/instagram/261704639352628">Meta Verified</a>
      </FooterLinks>

      <FooterCopyright>
        © 2024 INSTAGRAM FROM META
      </FooterCopyright>
    </SidebarContainer>
  );
};

export default Sidebar; 