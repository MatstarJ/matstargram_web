import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #fafafa;
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 350px;
  padding: 30px;
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: 'Lobster', cursive;
  font-size: 42px;
  margin-bottom: 30px;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #0095f6;
  color: white;
  padding: 12px 0;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0076e4;
  }
`;

const SignUpBox = styled.div`
  width: 100%;
  max-width: 350px;
  padding: 20px 0;
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  text-align: center;
`;

const Message = styled.p`
  color: #737373;
  font-size: 14px;
  margin: 10px 0;
  text-align: center;
`;

const StatusText = styled.p`
  margin: 10px 0;
  font-size: 14px;
  color: #737373;
  background-color: #fafafa;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  width: 100%;
`;

const Login: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  
  // 이미 인증된 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <LoginContainer>
      <LoginBox>
        <Logo>Matstargram</Logo>
        <Message>키클락(Keycloak) 인증을 통해 로그인하세요.</Message>
        <StatusText>
          현재 상태: {isAuthenticated ? '인증됨' : '인증되지 않음'}
        </StatusText>
        <LoginButton onClick={login}>
          키클락으로 로그인
        </LoginButton>
      </LoginBox>
      
      <SignUpBox>
        <Message>
          계정이 없으신가요? 관리자에게 문의하세요.
        </Message>
      </SignUpBox>
    </LoginContainer>
  );
};

export default Login; 