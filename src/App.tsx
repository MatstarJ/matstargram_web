import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles';
import theme from './styles/theme';
import Header from './components/Header/Header';
import Feed from './components/Feed/Feed';
import Navigation from './components/Navigation/Navigation';
import PostDetail from './components/PostDetail/PostDetail';
import Profile from './components/Profile';
import ProfileEdit from './components/Profile/ProfileEdit';
import Explore from './components/Explore';
import Reels from './components/Reels';
import Create from './components/Create';
import Messages from './components/Messages';
import Test from './components/Test';
import styled from 'styled-components';
import { AuthProvider } from './contexts/AuthContext';

// 검색 상태를 위한 Context 생성
export const SearchContext = React.createContext<{
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isSearchOpen: false,
  setIsSearchOpen: () => {},
});

// 포스트 모달 상태를 위한 Context 생성
export const PostModalContext = React.createContext<{
  selectedPostId: string | null;
  setSelectedPostId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  selectedPostId: null,
  setSelectedPostId: () => {},
});

// 알림 상태를 위한 Context 생성
export const NotificationsContext = React.createContext<{
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isNotificationsOpen: false,
  setIsNotificationsOpen: () => {},
});

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  
  @media (max-width: 768px) {
    padding-top: 60px;
    flex-direction: column;
  }
`;

interface ContentContainerProps {
  isSearchOpen: boolean;
  isNotificationsOpen: boolean;
}

const ContentContainer = styled.div<ContentContainerProps>`
  margin-left: 244px;
  width: calc(100% - 244px);
  transition: margin-left 0.3s ease, width 0.3s ease;
  
  @media (max-width: 1264px) {
    margin-left: 48px;
    width: calc(100% - 48px);
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    margin-bottom: 48px;
  }
`;

// 포스트 상세 페이지를 위한 모달 컨테이너
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedPostId(null);
  };

  // 알림 닫기 핸들러
  const handleCloseNotifications = () => {
    setIsNotificationsOpen(false);
  };

  // 목업 포스트 데이터를 찾는 함수
  const findPostById = (postId: string) => {
    // 탐색 페이지 포스트인지 확인
    if (postId.startsWith('explore-')) {
      const index = parseInt(postId.split('-')[1]);
      return {
        id: postId,
        username: `user${Math.floor(Math.random() * 100)}`,
        avatar: `https://i.pravatar.cc/56?img=${Math.floor(Math.random() * 70)}`,
        image: `https://picsum.photos/seed/explore${index - 1}/800/800`,
        likes: Math.floor(Math.random() * 10000) + 100,
        description: `인스타그램 탐색 페이지 예시 게시물 #${index}`,
        comments: [],
        time: `${Math.floor(Math.random() * 24) + 1}시간 전`
      };
    }
    
    // 프로필 페이지 포스트인지 확인
    if (postId.startsWith('post-')) {
      const index = parseInt(postId.split('-')[1]);
      return {
        id: postId,
        username: '우주_스타',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        image: `https://picsum.photos/seed/${index}/800/800`,
        likes: Math.floor(Math.random() * 1000) + 50,
        description: `게시물 ${index}에 대한 설명입니다. 인스타그램 클론 프로젝트 예시 게시물입니다.`,
        comments: [],
        time: `${Math.floor(Math.random() * 24) + 1}시간 전`
      };
    }
    
    // 기본 포스트
    return {
      id: postId,
      username: 'user123',
      avatar: 'https://i.pravatar.cc/56?img=1',
      image: `https://picsum.photos/seed/${postId}/800/800`,
      likes: 123,
      description: '인스타그램 클론 프로젝트 포스트입니다.',
      comments: [],
      time: '1시간 전'
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <SearchContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
            <NotificationsContext.Provider value={{ isNotificationsOpen, setIsNotificationsOpen }}>
              <PostModalContext.Provider value={{ selectedPostId, setSelectedPostId }}>
                <Header />
                <AppContainer>
                  <Navigation />
                  <ContentContainer isSearchOpen={isSearchOpen} isNotificationsOpen={isNotificationsOpen}>
                    <Routes>
                      <Route path="/" element={<Feed />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/profile/edit" element={<ProfileEdit />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/reels" element={<Reels />} />
                      <Route path="/messages" element={<Messages />} />
                      <Route path="/notifications" element={<div>알림 페이지</div>} />
                      <Route path="/create" element={<Create />} />
                      <Route path="/test" element={<Test />} />
                    </Routes>
                  </ContentContainer>
                </AppContainer>
                
                {/* 포스트 모달 - 선택된 포스트가 있을 때만 표시 */}
                {selectedPostId && (
                  <ModalContainer onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
                    <div onClick={(e) => e.stopPropagation()}>
                      <PostDetail 
                        post={findPostById(selectedPostId)} 
                        onClose={handleCloseModal}
                      />
                    </div>
                  </ModalContainer>
                )}
              </PostModalContext.Provider>
            </NotificationsContext.Provider>
          </SearchContext.Provider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
