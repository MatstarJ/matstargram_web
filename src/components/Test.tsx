import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const TestContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.textPrimary};
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  
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
  padding: 15px;
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const StatusText = styled.p<{ success?: boolean; error?: boolean }>`
  margin-top: 10px;
  font-weight: 500;
  color: ${props => 
    props.success ? 'green' : 
    props.error ? 'red' : 
    props.theme.colors.textSecondary
  };
`;

const InfoText = styled.div`
  margin: 15px 0;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #0095f6;
`;

const ErrorContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #fff0f0;
  border-radius: 8px;
  border: 1px solid #ffcccc;
  color: #cc0000;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin: 15px 0;
  flex-wrap: wrap;
  gap: 10px;
`;

const MethodContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Pre = styled.pre`
  background-color: #f5f5f5;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  overflow: auto;
  font-size: 12px;
  max-height: 300px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.input};
  color: ${props => props.theme.colors.textPrimary};
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.input};
  color: ${props => props.theme.colors.textPrimary};
`;

const TextArea = styled.textarea`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.input};
  color: ${props => props.theme.colors.textPrimary};
  min-height: 120px;
  font-family: monospace;
`;

// CORS 테스트를 위한 다양한 출처 목록
const TEST_ORIGINS = [
  'http://localhost:8080',
  'https://access.matstar.kro.kr/api/'
];

// HTTP 메서드 리스트
const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const Test: React.FC = () => {
  const { isAuthenticated, initialized, login, logout, token } = useAuth();
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keycloakStatus, setKeycloakStatus] = useState<string | null>(null);
  const [requestInfo, setRequestInfo] = useState<any>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string>(TEST_ORIGINS[0]);
  
  // 동적 API 테스트를 위한 상태
  const [httpMethod, setHttpMethod] = useState<string>('GET');
  const [apiPath, setApiPath] = useState<string>('/test');
  const [requestBody, setRequestBody] = useState<string>('{\n  "key": "value"\n}');

  // Keycloak 상태 확인
  useEffect(() => {
    // @ts-ignore
    const kc = window.__keycloak || window.keycloak;
    if (kc) {
      setKeycloakStatus(`Keycloak 초기화됨: ${kc.authenticated ? '인증됨' : '인증 안됨'}`);
    } else {
      setKeycloakStatus('Keycloak 인스턴스를 찾을 수 없음');
    }
  }, [isAuthenticated]);

  // API 호출 함수
  const handleApiCall = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);
    setRequestInfo(null);
    
    try {
      // 요청 설정
      const config: any = {
        url: `${selectedOrigin}${apiPath}`,
        method: httpMethod.toLowerCase(),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        withCredentials: true
      };
      
      // 토큰이 있으면 헤더에 추가
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      // POST, PUT, PATCH 메서드일 경우 Body 추가
      if (['post', 'put', 'patch'].includes(httpMethod.toLowerCase()) && requestBody) {
        try {
          config.data = JSON.parse(requestBody);
        } catch (e) {
          setError(`JSON 형식이 올바르지 않습니다: ${e instanceof Error ? e.message : String(e)}`);
          setIsLoading(false);
          return;
        }
      }
      
      // 요청 정보 저장
      setRequestInfo(config);
      
      const response = await axios(config);
      setTestResult(JSON.stringify(response.data, null, 2));
    } catch (err: any) {
      console.error('API 호출 오류:', err);
      setError(`API 호출 오류: ${err.message || '알 수 없는 오류'}\n${err.response?.data ? JSON.stringify(err.response.data, null, 2) : ''}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 토큰 디코딩 함수
  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  return (
    <TestContainer>
      <Title>API 테스트</Title>
      
      <InfoText>
        이 페이지는 API를 호출하여 테스트합니다.
        {isAuthenticated ? 
          ' 현재 인증된 상태입니다.' : 
          ' API를 호출하기 위한 여러 방법을 시도해볼 수 있습니다.'}
      </InfoText>
      
      {keycloakStatus && (
        <StatusText>{keycloakStatus}</StatusText>
      )}
      
      <ButtonGroup>
        {isAuthenticated ? (
          <Button onClick={logout}>로그아웃</Button>
        ) : (
          <Button onClick={login}>로그인</Button>
        )}
      </ButtonGroup>
      
      <FormGroup>
        <Label>테스트 출처 선택:</Label>
        <Select 
          value={selectedOrigin} 
          onChange={(e) => setSelectedOrigin(e.target.value)}
        >
          {TEST_ORIGINS.map(origin => (
            <option key={origin} value={origin}>{origin}</option>
          ))}
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label>HTTP 메서드:</Label>
        <Select 
          value={httpMethod} 
          onChange={(e) => setHttpMethod(e.target.value)}
        >
          {HTTP_METHODS.map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label>API 주소 (경로만):</Label>
        <Input 
          type="text" 
          value={apiPath} 
          onChange={(e) => setApiPath(e.target.value)} 
          placeholder="/test"
        />
      </FormGroup>
      
      {['POST', 'PUT', 'PATCH'].includes(httpMethod) && (
        <FormGroup>
          <Label>요청 본문 (JSON):</Label>
          <TextArea 
            value={requestBody} 
            onChange={(e) => setRequestBody(e.target.value)} 
            placeholder='{"key": "value"}'
          />
        </FormGroup>
      )}
      
      <Button 
        onClick={handleApiCall} 
        disabled={isLoading}
      >
        {isLoading ? '로딩 중...' : 'API 호출'}
      </Button>
      
      {token && (
        <ResultContainer>
          <h3>인증 토큰:</h3>
          <Pre>{token}</Pre>
          <details>
            <summary>토큰 페이로드 보기</summary>
            <Pre>{JSON.stringify(decodeToken(token), null, 2)}</Pre>
          </details>
        </ResultContainer>
      )}
      
      {requestInfo && (
        <ResultContainer>
          <h3>요청 정보:</h3>
          <Pre>{JSON.stringify(requestInfo, null, 2)}</Pre>
        </ResultContainer>
      )}
      
      {testResult && (
        <ResultContainer>
          <h3>결과:</h3>
          <pre>{testResult}</pre>
        </ResultContainer>
      )}
      
      {error && (
        <ErrorContainer>
          <h3>오류 발생:</h3>
          <pre>{error}</pre>
          <p>
            문제 해결 방법:
          </p>
          <ol>
            <li>서버가 선택한 출처({selectedOrigin})에서 실행 중인지 확인하세요.</li>
            <li>서버에 CORS 설정이 제대로 되어 있는지 확인하세요.</li>
            <li>Keycloak 설정이 올바른지 확인하세요.</li>
            <li>API 서버가 토큰을 제대로 검증하는지 확인하세요.</li>
            <li>Network 탭에서 요청 헤더를 확인하세요. Authorization 헤더에 토큰이 있는지 확인하세요.</li>
          </ol>
        </ErrorContainer>
      )}
    </TestContainer>
  );
};

export default Test;
