import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { matstarApi, apiRequest } from '../services/api';

/**
 * API 테스트 컴포넌트 스타일
 */
const ApiTestContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.textPrimary};
`;

const Section = styled.section`
  margin-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.textPrimary};
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  background-color: #f7f7f7;
  border-radius: 4px;
  padding: 15px;
`;

const ResultTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.textPrimary};
`;

const Pre = styled.pre`
  overflow-x: auto;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  max-height: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

/**
 * API 테스트 컴포넌트
 * MatStar API와의 통신을 테스트합니다.
 */
const ApiTest: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [customEndpoint, setCustomEndpoint] = useState<string>('');
  
  /**
   * API 응답 결과 처리
   */
  const handleResult = (data: any, errorMsg: string | null = null) => {
    setResult(data);
    setError(errorMsg);
    setLoading(false);
  };
  
  /**
   * 팔로우한 사용자의 게시물 가져오기
   */
  const getFollowedPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await matstarApi.post.getFollowedPosts(0);
      handleResult(data);
    } catch (err) {
      console.error('팔로우 게시물 가져오기 오류:', err);
      handleResult(null, '팔로우 게시물을 가져오는데 실패했습니다.');
    }
  };
  
  /**
   * 현재 사용자 정보 가져오기
   */
  const getCurrentUser = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await matstarApi.user.getCurrentUser();
      handleResult(data);
    } catch (err) {
      console.error('사용자 정보 가져오기 오류:', err);
      handleResult(null, '사용자 정보를 가져오는데 실패했습니다.');
    }
  };
  
  /**
   * 사용자 정의 API 엔드포인트 호출
   */
  const callCustomEndpoint = async () => {
    if (!customEndpoint) {
      setError('API 엔드포인트를 입력하세요.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // 엔드포인트 시작이 '/'로 시작하는지 확인
      const endpoint = customEndpoint.startsWith('/') ? customEndpoint : `/${customEndpoint}`;
      const data = await apiRequest(endpoint);
      handleResult(data);
    } catch (err) {
      console.error('사용자 정의 API 호출 오류:', err);
      handleResult(null, '사용자 정의 API 호출에 실패했습니다.');
    }
  };
  
  return (
    <ApiTestContainer>
      <Title>MatStar API 테스트</Title>
      
      {isAuthenticated ? (
        <>
          <Section>
            <SectionTitle>인증 정보</SectionTitle>
            <p>인증됨: {isAuthenticated ? '예' : '아니오'}</p>
            {token && (
              <Pre>
                {token.substring(0, 20)}...
              </Pre>
            )}
          </Section>
          
          <Section>
            <SectionTitle>게시물 API</SectionTitle>
            <ButtonGrid>
              <Button onClick={getFollowedPosts} disabled={loading}>
                팔로우 게시물 가져오기
              </Button>
            </ButtonGrid>
          </Section>
          
          <Section>
            <SectionTitle>사용자 API</SectionTitle>
            <ButtonGrid>
              <Button onClick={getCurrentUser} disabled={loading}>
                현재 사용자 정보
              </Button>
            </ButtonGrid>
          </Section>
          
          <Section>
            <SectionTitle>사용자 정의 API 호출</SectionTitle>
            <FormGroup>
              <Label>API 엔드포인트</Label>
              <Input
                type="text"
                value={customEndpoint}
                onChange={(e) => setCustomEndpoint(e.target.value)}
                placeholder="/post/personal/followed?page=0"
              />
            </FormGroup>
            <Button onClick={callCustomEndpoint} disabled={loading}>
              API 호출
            </Button>
          </Section>
          
          {loading && <p>로딩 중...</p>}
          
          {error && (
            <ResultContainer>
              <ResultTitle>오류</ResultTitle>
              <p style={{ color: 'red' }}>{error}</p>
            </ResultContainer>
          )}
          
          {result && (
            <ResultContainer>
              <ResultTitle>결과</ResultTitle>
              <Pre>{JSON.stringify(result, null, 2)}</Pre>
            </ResultContainer>
          )}
        </>
      ) : (
        <p>API 테스트를 위해 로그인이 필요합니다.</p>
      )}
    </ApiTestContainer>
  );
};

export default ApiTest; 