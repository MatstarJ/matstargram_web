import React, { useState, useContext, useEffect } from 'react';
import {
  NavigationContainer,
  LogoContainer,
  NavigationMenu,
  MenuItem,
  ProfileContainer
} from './Navigation.styles';
import styled, { css } from 'styled-components';
import Search from '../Search/Search';
import { SearchContext, NotificationsContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Notifications from '../Notifications/Notifications';

// 호버 효과를 가진 MenuItem 스타일 재정의
const MenuItemWithHover = styled(MenuItem)`
  &:hover {
    background-color: #f2f2f2;
    border-radius: 8px;
  }
`;

// 호버 효과를 가진 ProfileContainer 스타일 재정의
const ProfileContainerWithHover = styled(ProfileContainer)<{ isActive?: boolean }>`
  &:hover {
    background-color: #f2f2f2;
    border-radius: 8px;
  }

  ${props => props.isActive && `
    img {
      border: 2px solid #000;
    }
  `}
`;

// 로고 컨테이너 스타일 재정의
const LogoContainerStyled = styled(LogoContainer)`
  justify-content: flex-start;
  cursor: pointer;
  
  .logo-icon {
    margin-right: 16px;
  }

  @media (max-width: 1264px) {
    .logo-text {
      display: none;
    }
  }
`;

// 로고 텍스트 스타일 재정의
const LogoText = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  white-space: nowrap;
`;

// 메뉴 텍스트 스타일 재정의
const MenuText = styled.span<{ isActive?: boolean }>`
  font-weight: ${props => props.isActive ? '900' : '500'};
  font-size: 15px;
  white-space: nowrap;
`;

// 네비게이션 컨테이너 (사이드바) 스타일
const NavigationContainerCollapsed = styled(NavigationContainer)`
  width: 244px;
  max-width: 244px;
  overflow: hidden;
  transition: width 0.3s ease;
  
  ${LogoContainerStyled} {
    justify-content: flex-start;
    
    .logo-icon {
      margin-right: 16px;
    }
  }

  ${LogoText}, ${MenuText} {
    display: block;
  }
  
  ${MenuItemWithHover} svg, ${ProfileContainerWithHover} img {
    margin-right: 16px;
  }

  @media (max-width: 1264px) {
    width: 72px;
    max-width: 72px;
    align-items: center;
    padding: 8px 12px;
    
    ${LogoContainerStyled} {
      justify-content: center;
      
      .logo-icon {
        margin-right: 0;
      }
    }
    
    ${LogoText}, ${MenuText} {
      display: none;
    }
    
    ${MenuItemWithHover} svg, ${ProfileContainerWithHover} img {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: 48px;
    flex-direction: row;
    padding: 0;
    border-right: none;
    border-top: 1px solid ${props => props.theme.colors.border};
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

// 현재 사용자 데이터
const currentUser = {
  username: 'my_username',
  name: '나의 이름',
  avatar: 'https://i.pravatar.cc/56?img=15'
};

const Navigation: React.FC = () => {
  // 알림과 검색을 제외한 현재 페이지 정보 저장
  const [currentPage, setCurrentPage] = useState(() => {
    // 초기 렌더링 시 현재 경로에 따라 currentPage 값 설정
    const path = window.location.pathname;
    if (path === '/') return 'home';
    if (path === '/profile') return 'profile';
    if (path === '/explore') return 'explore';
    if (path === '/reels') return 'reels';
    if (path === '/messages') return 'messages';
    if (path === '/create') return 'create';
    if (path === '/test') return 'test';
    return 'home'; // 기본값
  });
  
  // 알림창과 검색창 상태 (1: 알림창 열림, 2: 검색창 열림, 3: 모두 닫힘)
  const [windowState, setWindowState] = useState(3);
  
  const { isSearchOpen, setIsSearchOpen } = useContext(SearchContext);
  const { isNotificationsOpen, setIsNotificationsOpen } = useContext(NotificationsContext);
  const navigate = useNavigate();

  // 컨텍스트 상태가 변경될 때 windowState 동기화
  useEffect(() => {
    if (isSearchOpen) {
      setWindowState(2);
    } else if (isNotificationsOpen) {
      setWindowState(1);
    } else {
      setWindowState(3);
    }
  }, [isSearchOpen, isNotificationsOpen]);

  // 현재 경로에 따라 currentPage 업데이트 (라우트 변경시)
  useEffect(() => {
    const updateCurrentPage = () => {
      const path = window.location.pathname;
      
      if (path === '/' || path === '/home') {
        setCurrentPage('home');
      } else if (path === '/profile') {
        setCurrentPage('profile');
      } else if (path === '/explore') {
        setCurrentPage('explore');
      } else if (path === '/reels') {
        setCurrentPage('reels');
      } else if (path === '/messages') {
        setCurrentPage('messages');
      } else if (path === '/create') {
        setCurrentPage('create');
      } else if (path === '/test') {
        setCurrentPage('test');
      }
    };
    
    // 초기 로드 및 페이지 변경 시 실행
    updateCurrentPage();
    
    // 페이지 변경 이벤트 리스너 등록
    window.addEventListener('popstate', updateCurrentPage);
    // navigate 함수로 인한 경로 변경 감지를 위한 이벤트 리스너
    const handleRouteChange = () => {
      updateCurrentPage();
    };
    window.addEventListener('routechange', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', updateCurrentPage);
      window.removeEventListener('routechange', handleRouteChange);
    };
  }, []);

  // 창 크기가 모바일 뷰로 변경될 때 검색창과 알림창 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        }
        if (isNotificationsOpen) {
          setIsNotificationsOpen(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    // 초기 로드 시 체크
    handleResize();
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSearchOpen, isNotificationsOpen, setIsSearchOpen, setIsNotificationsOpen]);

  const handleMenuClick = (menu: string) => {
    if (menu === 'search') {
      // 검색창 토글
      if (!isSearchOpen) {
        // 검색창 열기
        setIsSearchOpen(true);
        
        // 알림창이 열려있으면 닫기
        if (isNotificationsOpen) {
          setIsNotificationsOpen(false);
        }
      } else {
        // 검색창 닫기
        setIsSearchOpen(false);
      }
    } else if (menu === 'notifications') {
      // 알림창 토글
      if (!isNotificationsOpen) {
        // 알림창 열기
        setIsNotificationsOpen(true);
        
        // 검색창이 열려있으면 닫기
        if (isSearchOpen) {
          setIsSearchOpen(false);
        }
      } else {
        // 알림창 닫기
        setIsNotificationsOpen(false);
      }
    } else {
      // 다른 메뉴 항목 클릭 시 검색창과 알림창 닫기
      setIsSearchOpen(false);
      setIsNotificationsOpen(false);
      
      // 현재 페이지 상태 업데이트
      setCurrentPage(menu);
      
      // 해당 메뉴 페이지로 이동
      if (menu === 'home') {
        navigate('/home');
      } else if (menu === 'explore') {
        navigate('/explore');
      } else if (menu === 'reels') {
        navigate('/reels');
      } else if (menu === 'messages') {
        navigate('/messages');
      } else if (menu === 'create') {
        navigate('/create');
      } else if (menu === 'profile') {
        navigate('/profile');
      } else if (menu === 'test') {
        navigate('/test');
      }
      
      // 이벤트 발행
      window.dispatchEvent(new Event('routechange'));
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleCloseNotifications = () => {
    setIsNotificationsOpen(false);
  };

  // 활성화된 메뉴 클래스 설정 함수
  const getMenuClassName = (menu: string): string => {
    // 알림창이 열려있으면 알림 버튼만 활성화
    if (windowState === 1 && menu === 'notifications') {
      return 'active';
    }
    
    // 검색창이 열려있으면 검색 버튼만 활성화
    if (windowState === 2 && menu === 'search') {
      return 'active';
    }
    
    // 모든 창이 닫혀있으면 현재 페이지 버튼 활성화
    if (windowState === 3 && menu === currentPage) {
      return 'active';
    }
    
    return '';
  };

  return (
    <>
      <NavigationContainerCollapsed>
        <LogoContainerStyled onClick={() => navigate('/home')}>
          <div className="logo-icon">
            <svg aria-label="Instagram" height="24" role="img" viewBox="0 0 24 24" width="24">
              <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.013 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.987 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.987 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.013 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path>
            </svg>
          </div>
          <LogoText>Instagram</LogoText>
        </LogoContainerStyled>

        <NavigationMenu>
          <MenuItemWithHover 
            className={getMenuClassName('home')} 
            onClick={() => handleMenuClick('home')}
          >
            {getMenuClassName('home') === 'active' ? (
              <svg aria-label="홈" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
              </svg>
            ) : (
              <svg aria-label="홈" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            )}
            <MenuText isActive={getMenuClassName('home') === 'active'}>홈</MenuText>
          </MenuItemWithHover>

          <MenuItemWithHover 
            className={getMenuClassName('search')} 
            onClick={() => handleMenuClick('search')}
            data-mobile-hidden="true"
          >
            {getMenuClassName('search') === 'active' ? (
              <svg aria-label="검색" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="16.511" x2="21.643" y1="16.511" y2="21.643"></line>
              </svg>
            ) : (
              <svg aria-label="검색" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
              </svg>
            )}
            <MenuText isActive={getMenuClassName('search') === 'active'}>검색</MenuText>
          </MenuItemWithHover>

          <MenuItemWithHover 
            className={getMenuClassName('explore')} 
            onClick={() => handleMenuClick('explore')}
          >
            {getMenuClassName('explore') === 'active' ? (
              <svg aria-label="탐색" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="m13.173 13.164 1.491-3.829-3.83 1.49ZM12.001.5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12.001.5Zm5.35 7.443-2.478 6.369a1 1 0 0 1-.57.569l-6.36 2.47a1 1 0 0 1-1.294-1.294l2.48-6.369a1 1 0 0 1 .57-.569l6.359-2.47a1 1 0 0 1 1.294 1.294Z"></path>
              </svg>
            ) : (
              <svg aria-label="탐색" height="24" role="img" viewBox="0 0 24 24" width="24">
                <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                <polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
              </svg>
            )}
            <MenuText isActive={getMenuClassName('explore') === 'active'}>탐색</MenuText>
          </MenuItemWithHover>

          <MenuItemWithHover 
            className={getMenuClassName('reels')} 
            onClick={() => handleMenuClick('reels')}
          >
            {getMenuClassName('reels') === 'active' ? (
              <svg aria-label="릴스" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z" fillRule="evenodd"></path>
              </svg>
            ) : (
              <svg aria-label="릴스" height="24" role="img" viewBox="0 0 24 24" width="24">
                <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line>
                <path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91-.001Z" fillRule="evenodd"></path>
              </svg>
            )}
            <MenuText isActive={getMenuClassName('reels') === 'active'}>릴스</MenuText>
          </MenuItemWithHover>

          <MenuItemWithHover 
            className={getMenuClassName('create')} 
            onClick={() => handleMenuClick('create')}
          >
            {getMenuClassName('create') === 'active' ? (
              <svg aria-label="새 게시물" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M12.003 5.545l-.117.006-.112.02a1 1 0 0 0-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 0 0-.877.876L5.545 12l.007.117a1 1 0 0 0 .877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 0 0 .876.877l.117.007.117-.007a1 1 0 0 0 .876-.877l.007-.116V13h4.452l.116-.007a1 1 0 0 0 .877-.876l.007-.117-.007-.117a1 1 0 0 0-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 0 0-.876-.877ZM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1Z"></path>
              </svg>
            ) : (
              <svg aria-label="새 게시물" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
              </svg>
            )}
            <MenuText isActive={getMenuClassName('create') === 'active'}>만들기</MenuText>
          </MenuItemWithHover>
          
          <MenuItemWithHover 
            className={getMenuClassName('messages')} 
            onClick={() => handleMenuClick('messages')}
          >
            {getMenuClassName('messages') === 'active' ? (
              <svg aria-label="메시지" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M12.003 1.131a10.487 10.487 0 0 0-10.87 10.57 10.194 10.194 0 0 0 3.412 7.771l.054 1.78a1.67 1.67 0 0 0 2.342 1.476l1.935-.872a11.767 11.767 0 0 0 3.127.416 10.488 10.488 0 0 0 10.87-10.57 10.487 10.487 0 0 0-10.87-10.57Zm5.786 9.001-2.566 3.983a1.577 1.577 0 0 1-2.278.42l-2.452-1.84a.63.63 0 0 0-.759.002l-2.556 2.049a.659.659 0 0 1-.96-.874L8.783 9.89a1.576 1.576 0 0 1 2.277-.42l2.453 1.84a.63.63 0 0 0 .758-.003l2.556-2.05a.659.659 0 0 1 .961.874Z"></path>
              </svg>
            ) : (
              <svg aria-label="메시지" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path>
                <path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002l-2.453-1.84a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.277-.42l2.567-3.983Z" fillRule="evenodd"></path>
              </svg>
            )}
            <MenuText isActive={getMenuClassName('messages') === 'active'}>메시지</MenuText>
          </MenuItemWithHover>

          <MenuItemWithHover 
            className={getMenuClassName('notifications')} 
            onClick={() => handleMenuClick('notifications')}
            data-mobile-hidden="true"
          >
            {getMenuClassName('notifications') === 'active' ? (
              <svg aria-label="알림" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"></path>
              </svg>
            ) : (
              <svg aria-label="알림" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            )}
            <MenuText isActive={getMenuClassName('notifications') === 'active'}>알림</MenuText>
          </MenuItemWithHover>

          <ProfileContainerWithHover 
            className={getMenuClassName('profile')} 
            onClick={() => handleMenuClick('profile')}
            isActive={getMenuClassName('profile') === 'active'}
          >
            <img src={currentUser.avatar} alt="프로필" />
            <MenuText isActive={getMenuClassName('profile') === 'active'}>프로필</MenuText>
          </ProfileContainerWithHover>
        </NavigationMenu>
      </NavigationContainerCollapsed>
      
      {/* 검색 페이지 */}
      <Search onClose={handleCloseSearch} />
      
      {/* 알림 페이지 */}
      <Notifications onClose={handleCloseNotifications} />
    </>
  );
};

export default Navigation; 