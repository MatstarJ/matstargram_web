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

// 로딩 컴포넌트 스타일링
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  z-index: 9999;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #dbdbdb;
  border-radius: 50%;
  border-top-color: #3897f0;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// 로딩 컴포넌트
const LoadingScreen = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);

interface AuthContextProps {
  initialized: boolean;
  isAuthenticated: boolean;
  token: string | undefined;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// 인증이 필요하지 않은 경로 목록
const publicPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

// 인증이 필요한 경로 확인 함수
const isAuthRequired = (path: string) => {
  // publicPaths에 포함된 경로가 아니면 인증 필요
  return !publicPaths.some(publicPath => path === publicPath || path.startsWith(publicPath));
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
    
    // 인증 이벤트 발생 시 바로 완료 상태로 설정
    if (event === 'onReady' || event === 'onAuthSuccess' || event === 'onAuthError') {
      setInitCompleted(true);
    }
  };

  const handleTokens = (tokens: any) => {
    console.log('토큰 받음:', tokens);
    setInitCompleted(true);
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initOptions}
      onEvent={handleOnEvent}
      onTokens={handleTokens}
      LoadingComponent={<LoadingScreen />}
    >
      <AuthContextContent initCompleted={initCompleted}>
        {children}
      </AuthContextContent>
    </ReactKeycloakProvider>
  );
};

const AuthContextContent: React.FC<{ children: ReactNode, initCompleted: boolean }> = ({ children, initCompleted }) => {
  const { initialized, keycloak } = useKeycloak();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // 현재 경로가 인증이 필요한지 확인
  const needsAuth = isAuthRequired(location.pathname);

  // 인증 상태 및 로딩 상태 처리
  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (needsAuth && !keycloak.authenticated) {
      console.log('인증이 필요한 경로 접근. 로그인 시도...');
      keycloak.login();
    } else {
      // 초기화가 완료되면 로딩 상태 해제
      setIsLoading(false);
    }
  }, [keycloak, initialized, needsAuth, initCompleted]);

  // 콘솔에 디버깅 정보 출력
  useEffect(() => {
    console.log('Keycloak 상태:', {
      initialized,
      authenticated: keycloak.authenticated,
      token: keycloak.token ? '있음' : '없음',
      currentPath: location.pathname,
      needsAuth,
      isLoading,
      initCompleted
    });
  }, [initialized, keycloak.authenticated, keycloak.token, location.pathname, needsAuth, isLoading, initCompleted]);

  const contextValue: AuthContextProps = {
    initialized,
    isAuthenticated: keycloak.authenticated || false,
    token: keycloak.token,
    login: () => keycloak.login(),
    logout: () => keycloak.logout(),
    isLoading,
  };

  // 로딩 중이면 로딩 화면 표시
  if (isLoading) {
    return <LoadingScreen />;
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
