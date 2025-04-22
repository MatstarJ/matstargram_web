import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import Keycloak, { KeycloakConfig } from 'keycloak-js';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 키클락 설정
const keycloakConfig: KeycloakConfig = {
  url: 'https://access.matstar.kro.kr/public',
  realm: 'Matstar',
  clientId: 'matstarworld'
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

// 최소한의 로딩 화면 - 투명 배경으로 콘텐츠 보이지 않게 함
const MinimalLoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #0095f6;
  animation: spin 0.8s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const RetryButton = styled.button`
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0074cc;
  }
`;

// 인증이 필요한 경로 확인 함수
const isAuthRequired = (path: string) => {
  // 공개 경로 목록 (로그인이 필요하지 않은 경로들)
  const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
  
  // 공개 경로가 아닌 모든 경로는 인증 필요
  return !publicPaths.includes(path);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authTimeout, setAuthTimeout] = useState(false);
  const location = useLocation();

  // 현재 경로가 인증이 필요한지 확인
  const needsAuth = isAuthRequired(location.pathname);

  // 키클락 초기화
  useEffect(() => {
    const initKeycloak = async () => {
      try {
        console.log('Keycloak 초기화 시작...');
        const keycloakInstance = new Keycloak(keycloakConfig);

        // 타임아웃 설정 (20초)
        const timeoutPromise = new Promise<boolean>((_, reject) => {
          setTimeout(() => {
            reject(new Error('Keycloak 초기화 시간 초과'));
          }, 20000);
        });

        // 인증 상태 확인
        try {
          const authenticated = await Promise.race([
            keycloakInstance.init({
              onLoad: 'check-sso',
              silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
              checkLoginIframe: false,
              enableLogging: true
            }),
            timeoutPromise
          ]);

          console.log('Keycloak 초기화 완료, 인증 상태:', authenticated);
          
          // 인스턴스 저장
          setKeycloak(keycloakInstance);
          setInitialized(true);
          setIsAuthenticated(authenticated);
          
          // 인증이 필요한 페이지인데 인증되지 않은 경우 로그인 시도
          if (needsAuth && !authenticated) {
            console.log('인증이 필요한 경로에 접근 중, 로그인 시도...');
            keycloakInstance.login({
              redirectUri: window.location.origin + location.pathname
            });
          } else {
            // 로딩 상태 종료
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Keycloak 초기화 중 에러:', error);
          setAuthError('인증 서버 연결에 실패했습니다.');
          setInitialized(true);
          setIsLoading(false);
          setAuthTimeout(true);
        }
      } catch (error) {
        console.error('Keycloak 인스턴스 생성 중 에러:', error);
        setAuthError('인증 시스템을 초기화할 수 없습니다.');
        setInitialized(true);
        setIsLoading(false);
      }
    };

    initKeycloak();
  }, [needsAuth, location.pathname]);

  // 로그인 함수
  const login = () => {
    if (keycloak) {
      keycloak.login({
        redirectUri: window.location.origin + location.pathname
      });
    } else {
      console.error('Keycloak 인스턴스가 없어 로그인할 수 없습니다.');
      setAuthError('로그인 시스템을 사용할 수 없습니다.');
    }
  };

  // 로그아웃 함수
  const logout = () => {
    if (keycloak) {
      keycloak.logout({
        redirectUri: window.location.origin
      });
    }
  };

  // 재시도 핸들러
  const handleRetry = () => {
    window.location.reload();
  };

  // 인증 타임아웃 발생 시 재시도 버튼만 표시
  if (authTimeout) {
    return (
      <MinimalLoadingContainer>
        <RetryButton onClick={handleRetry}>다시 시도</RetryButton>
      </MinimalLoadingContainer>
    );
  }

  // 인증 오류 발생 시 재시도 버튼만 표시
  if (authError) {
    return (
      <MinimalLoadingContainer>
        <RetryButton onClick={handleRetry}>다시 시도</RetryButton>
      </MinimalLoadingContainer>
    );
  }

  // 인증이 필요하고 로딩 중인 경우 스피너만 표시
  if (needsAuth && isLoading) {
    return (
      <MinimalLoadingContainer>
        <Spinner />
      </MinimalLoadingContainer>
    );
  }

  const contextValue: AuthContextProps = {
    initialized,
    isAuthenticated,
    token: keycloak?.token,
    login,
    logout,
    isLoading
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
