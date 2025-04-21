import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { useLocation } from 'react-router-dom';

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
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// 인증이 필요한 경로 확인 함수
const isAuthRequired = (path: string) => {
  return path === '/test';
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 인스턴스를 직접 가져오는 대신 함수를 사용
  const keycloak = useMemo(() => getKeycloakInstance(), []);
  const [initCompleted, setInitCompleted] = useState(true); // 기본값을 true로 설정
  
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
    setInitCompleted(true);
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
      isLoadingCheck={(keycloak) => false} // 항상 로딩 상태가 아니도록 설정
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
  
  // 현재 경로가 인증이 필요한지 확인
  const needsAuth = isAuthRequired(location.pathname);

  // 인증이 필요한 경로에 접근하고 인증되지 않은 경우 로그인 실행
  useEffect(() => {
    if (needsAuth && initialized && !keycloak.authenticated) {
      console.log('인증이 필요한 경로 접근. 로그인 시도...');
      keycloak.login();
    }
  }, [keycloak, initialized, needsAuth]);

  // 콘솔에 디버깅 정보 출력
  useEffect(() => {
    console.log('Keycloak 상태:', {
      initialized,
      authenticated: keycloak.authenticated,
      token: keycloak.token ? '있음' : '없음',
      currentPath: location.pathname,
      needsAuth
    });
  }, [initialized, keycloak.authenticated, keycloak.token, location.pathname, needsAuth]);

  const contextValue: AuthContextProps = {
    initialized,
    isAuthenticated: keycloak.authenticated || false,
    token: keycloak.token,
    login: () => keycloak.login(),
    logout: () => keycloak.logout(),
  };

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
