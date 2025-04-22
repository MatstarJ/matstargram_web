import React from 'react';
import Feed from '../Feed/Feed';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

// 로딩 컨테이너 스타일
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
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

/**
 * 홈 페이지 컴포넌트
 * /home 경로에서 렌더링되며 Feed 컴포넌트를 표시합니다.
 * 인증 상태에 따라 컨텐츠를 보호합니다.
 * 
 * @returns {JSX.Element} 홈 페이지 컴포넌트
 */
const Home: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // 로딩 중이거나 인증되지 않은 경우 아무것도 표시하지 않음
  if (isLoading || !isAuthenticated) {
    return null;
  }
  
  // 인증된 경우에만 Feed 컴포넌트 표시
  return <Feed />;
};

export default Home; 