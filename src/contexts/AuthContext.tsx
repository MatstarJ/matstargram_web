import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Keycloak 인스턴스를 전역 범위에서 초기화
// @ts-ignore
if (!window.__keycloak) {
  // @ts-ignore
  window.__keycloak = new Keycloak('/keycloak.json');
}

// 전역 인스턴스에 접근하는 함수
const getKeycloakInstance = () => {
  // @ts-ignore
  return window.__keycloak;
};

interface AuthContextProps {
  initialized: boolean;
  isAuthenticated: boolean;
  token: string | undefined;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// 로딩 화면 스타일 정의
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: white;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 20px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #333;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;

// 인증이 필요한 경로 확인 함수
const isAuthRequired = (path: string) => {
  // 공개 경로 목록 (로그인이 필요하지 않은 경로들)
  const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
  
  // 공개 경로가 아닌 모든 경로는 인증 필요
  return !publicPaths.includes(path);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 인스턴스를 직접 가져오는 대신 함수를 사용
  const keycloak = useMemo(() => getKeycloakInstance(), []);
  const [initCompleted, setInitCompleted] = useState(false); // 기본값을 false로 변경
  
  // 이전 실행 중인 인스턴스 정리
  useEffect(() => {
    return () => {
      console.log('AuthProvider unmounting, cleaning up...');
    };
  }, []);
  
  // 잘못된 Keycloak 인스턴스 처리
  if (!keycloak) {
    return <div>Keycloak 인스턴스를 초기화할 수 없습니다.</div>;
  }
  
  const initOptions = {
    onLoad: 'check-sso',  // login-required 대신 check-sso 사용
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    checkLoginIframe: false,
    enableLogging: true  // 로깅 활성화
  };

  const handleOnEvent = (event: any) => {
    console.log('Keycloak event:', event);
    
    // 전역에 설정
    if (event === 'onReady' || event === 'onAuthSuccess') {
      // @ts-ignore - Keycloak 인스턴스를 window에 노출
      window.keycloak = keycloak;
    }
    
    // 인증 이벤트 발생 시 완료 상태로 설정
    if (event === 'onReady' || event === 'onAuthSuccess' || event === 'onAuthError') {
      setInitCompleted(true);
    }
  };

  const handleTokens = (tokens: any) => {
    console.log('토큰 받음:', tokens);
    setInitCompleted(true);
  };

  // 진짜 로딩 상태를 체크하는 함수 (초기화 및 인증이 완료되었는지)
  const isLoadingCheck = (keycloak: Keycloak) => {
    return !initCompleted;
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initOptions}
      onEvent={handleOnEvent}
      onTokens={handleTokens}
      isLoadingCheck={isLoadingCheck}
      LoadingComponent={
        <LoadingContainer>
          <Spinner />
          <LoadingText>로그인 확인 중...</LoadingText>
        </LoadingContainer>
      }
    >
      <AuthContextContent>
        {children}
      </AuthContextContent>
    </ReactKeycloakProvider>
  );
};

const AuthContextContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { initialized, keycloak } = useKeycloak();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // 현재 경로가 인증이 필요한지 확인
  const needsAuth = isAuthRequired(location.pathname);

  // 인증이 필요한 경로에 접근하고 인증되지 않은 경우 로그인 실행
  useEffect(() => {
    if (initialized) {
      if (needsAuth && !keycloak.authenticated) {
        console.log('인증이 필요한 경로 접근. 로그인 시도...');
        keycloak.login();
      } else {
        // 인증 상태 확인이 완료되면 로딩 상태 종료
        setIsLoading(false);
      }
    }
  }, [keycloak, initialized, needsAuth]);

  // 콘솔에 디버깅 정보 출력
  useEffect(() => {
    console.log('Keycloak 상태:', {
      initialized,
      authenticated: keycloak.authenticated,
      token: keycloak.token ? '있음' : '없음',
      currentPath: location.pathname,
      needsAuth,
      isLoading
    });
  }, [initialized, keycloak.authenticated, keycloak.token, location.pathname, needsAuth, isLoading]);

  const contextValue: AuthContextProps = {
    initialized,
    isAuthenticated: keycloak.authenticated || false,
    token: keycloak.token,
    login: () => keycloak.login(),
    logout: () => keycloak.logout(),
    isLoading
  };

  // 인증이 필요하고 로딩 중인 경우 로딩 화면 표시
  if (needsAuth && isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>콘텐츠 로딩 중...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
