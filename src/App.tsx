import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import ApiTest from './components/ApiTest';
import Login from './components/Login';
import styled from 'styled-components';
import { AuthProvider, useAuth } from './contexts/AuthContext';

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
  addPost: (post: any) => void;
}>({
  selectedPostId: null,
  setSelectedPostId: () => {},
  addPost: () => {},
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
  background-color: rgba(0, 0, 0, 0.85); /* 배경 색상 어둡게 조정 */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden; /* 모달이 화면을 넘어가는 것 방지 */
  
  /* 애니메이션 효과 추가 */
  animation: fadeIn 0.2s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

// 인증 상태를 확인하여 접근을 제어하는 컴포넌트
interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // 로딩 중이거나 이미 인증되어 있으면 자식 컴포넌트 렌더링
  if (isLoading || isAuthenticated) {
    return <>{children}</>;
  }

  // 인증되지 않았으면 로그인 페이지로 리다이렉트
  return <Navigate to="/login" replace />;
};

// 레이아웃을 관리하는 컴포넌트
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  
  // 전역 게시물 데이터 저장소
  const [globalPosts, setGlobalPosts] = useState<{[key: string]: any}>({});

  // 게시물 데이터 추가 함수
  const addPost = (post: any) => {
    setGlobalPosts(prev => ({
      ...prev,
      [post.postId.toString()]: {
        id: post.postId.toString(),
        username: post.user.loginId,
        avatar: post.user.profileImg.profileImgUrl,
        image: post.postAttach.length > 0 ? post.postAttach[0].fileUrl : '',
        imageType: post.postAttach.length > 0 ? post.postAttach[0].type : 'img',
        mediaFiles: post.postAttach,
        likes: post.postLikeCount,
        description: post.postContent,
        comments: [],
        commentCount: post.commentCount,
        time: post.createDate,
        likeYn: post.likeYn,
        commentYn: post.commentYn,
        isLiked: post.isLike,
        isSaved: post.isSaved
      }
    }));
  };

  // 로그인 페이지인지 확인
  const isLoginPage = location.pathname === '/login';

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedPostId(null);
  };

  // 목업 포스트 데이터를 찾는 함수
  const findPostById = (postId: string) => {
    // 실제 API에서 가져온 게시물 데이터가 있는지 확인
    if (globalPosts[postId]) {
      return globalPosts[postId];
    }
    
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
        comments: [
          {
            id: 'c1',
            username: 'explorer42',
            avatar: 'https://i.pravatar.cc/56?img=20',
            text: '와! 멋진 사진이네요~',
            createdAt: '3시간 전',
            likes: 8,
            isLiked: false,
            replies: []
          },
          {
            id: 'c2',
            username: 'travel_lover',
            avatar: 'https://i.pravatar.cc/56?img=25',
            text: '어디서 찍으신 사진인가요? 정보 공유 부탁드려요! 😍',
            createdAt: '2시간 전',
            likes: 4,
            isLiked: false,
            replies: [
              {
                id: 'r1',
                username: `user${Math.floor(Math.random() * 100)}`,
                avatar: `https://i.pravatar.cc/56?img=${Math.floor(Math.random() * 70)}`,
                text: '서울 성수동이에요! 구경 오세요~',
                createdAt: '1시간 전',
                likes: 2,
                isLiked: false
              }
            ]
          }
        ],
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
        comments: [
          {
            id: 'c1',
            username: 'friend_forever',
            avatar: 'https://i.pravatar.cc/56?img=33',
            text: '오랜만에 사진 올리네~ 잘 지내?',
            createdAt: '5시간 전',
            likes: 7,
            isLiked: false,
            replies: [
              {
                id: 'r1',
                username: '우주_스타',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                text: '응! 잘 지내고 있어. 너는?',
                createdAt: '3시간 전',
                likes: 2,
                isLiked: false
              }
            ]
          },
          {
            id: 'c2',
            username: 'photo_master',
            avatar: 'https://i.pravatar.cc/56?img=42',
            text: '사진 너무 잘 나왔다! 무슨 카메라 쓰세요?',
            createdAt: '4시간 전',
            likes: 5,
            isLiked: false,
            replies: []
          },
          {
            id: 'c3',
            username: 'insta_lover',
            avatar: 'https://i.pravatar.cc/56?img=45',
            text: '이번 주말에 만나요! 👋',
            createdAt: '2시간 전',
            likes: 3,
            isLiked: false,
            replies: []
          }
        ],
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
      comments: [
        {
          id: 'c1',
          username: 'fan_user',
          avatar: 'https://i.pravatar.cc/56?img=8',
          text: '멋진 포스트네요! 👍',
          createdAt: '1시간 전',
          likes: 5,
          isLiked: false,
          replies: [
            {
              id: 'r1',
              username: 'user123',
              avatar: 'https://i.pravatar.cc/56?img=1',
              text: '감사합니다! 😊',
              createdAt: '30분 전',
              likes: 2,
              isLiked: false
            }
          ]
        },
        {
          id: 'c2',
          username: 'coding_master',
          avatar: 'https://i.pravatar.cc/56?img=12',
          text: '인스타그램 클론 어떤 기술 스택 사용하셨나요?',
          createdAt: '45분 전',
          likes: 3,
          isLiked: false,
          replies: []
        },
        {
          id: 'c3',
          username: 'web_lover',
          avatar: 'https://i.pravatar.cc/56?img=15',
          text: '디자인이 실제 인스타랑 너무 비슷해요! 대단해요',
          createdAt: '20분 전',
          likes: 1,
          isLiked: false,
          replies: []
        }
      ],
      time: '1시간 전'
    };
  };

  // 로그인 페이지일 경우 자식 컴포넌트만 렌더링
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <SearchContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
      <NotificationsContext.Provider value={{ isNotificationsOpen, setIsNotificationsOpen }}>
        <PostModalContext.Provider value={{ selectedPostId, setSelectedPostId, addPost }}>
          {isAuthenticated && <Header />}
          <AppContainer>
            {isAuthenticated && <Navigation />}
            <ContentContainer isSearchOpen={isSearchOpen} isNotificationsOpen={isNotificationsOpen}>
              {children}
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
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <AppLayout>
            <Routes>
              <Route 
                path="/" 
                element={
                  <AuthGuard>
                    <Feed />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/profile/edit" 
                element={
                  <AuthGuard>
                    <ProfileEdit />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/explore" 
                element={
                  <AuthGuard>
                    <Explore />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/reels" 
                element={
                  <AuthGuard>
                    <Reels />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/messages" 
                element={
                  <AuthGuard>
                    <Messages />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <AuthGuard>
                    <div>알림 페이지</div>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/create" 
                element={
                  <AuthGuard>
                    <Create />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/test" 
                element={
                  <AuthGuard>
                    <Test />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/api-test" 
                element={
                  <AuthGuard>
                    <ApiTest />
                  </AuthGuard>
                } 
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AppLayout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
