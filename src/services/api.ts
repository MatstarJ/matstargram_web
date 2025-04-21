import axios from 'axios';
import Keycloak from 'keycloak-js';

// Keycloak 인스턴스 가져오기
const getKeycloakInstance = (): Keycloak | null => {
  try {
    // 먼저 글로벌 인스턴스 확인
    // @ts-ignore
    if (window.__keycloak) {
      // @ts-ignore
      return window.__keycloak;
    }
    
    // 기존 방식으로 폴백
    // @ts-ignore
    if (window.keycloak && window.keycloak.authenticated) {
      // @ts-ignore
      return window.keycloak;
    }
    
    return null;
  } catch (error) {
    console.error('Keycloak 인스턴스를 가져오는 데 실패했습니다:', error);
    return null;
  }
};

// 인증이 필요한 API 경로인지 확인하는 함수
const isAuthRequired = (url: string): boolean => {
  return url.includes('/test');
};

// 기본 헤더 가져오기
const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log('헤더에 토큰 추가됨:', token.substring(0, 20) + '...');
  }
  
  return headers;
};

// API 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: getHeaders(),
  withCredentials: true
});

// 인증되지 않은 API 인스턴스 생성 (인증 필요 없는 요청용)
const unauthApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: getHeaders(),
  withCredentials: true
});

// 요청 인터셉터 - 토큰 추가 (필요한 경우만)
api.interceptors.request.use(
  async (config) => {
    try {
      // URL 이 정의되어 있는지 확인
      const url = config.url || '';
      
      // 인증이 필요한 경로인지 확인
      if (isAuthRequired(url)) {
        const keycloak = getKeycloakInstance();
        
        if (keycloak && keycloak.authenticated) {
          console.log(`인증 토큰 첨부 시도 [${url}]...`);
          
          // 토큰이 만료되었는지 확인하고 필요한 경우 갱신
          try {
            const isTokenExpired = keycloak.isTokenExpired();
            
            if (isTokenExpired) {
              console.log('토큰이 만료되어 갱신을 시도합니다.');
              await keycloak.updateToken(5);
              console.log('토큰이 성공적으로 갱신되었습니다.');
            }
            
            // 인증 헤더에 토큰 추가
            if (config.headers && keycloak.token) {
              config.headers['Authorization'] = `Bearer ${keycloak.token}`;
              console.log('토큰 헤더 추가됨:', keycloak.token.substring(0, 20) + '...');
              console.log('최종 요청 헤더:', JSON.stringify(config.headers));
            } else {
              console.error('토큰이 없거나 헤더를 설정할 수 없습니다.');
              if (!keycloak.token) console.error('토큰이 없습니다.');
              if (!config.headers) console.error('헤더가 없습니다.');
            }
          } catch (error) {
            console.error('토큰 처리 중 오류:', error);
            keycloak.login();
            return Promise.reject('토큰 갱신에 실패했습니다.');
          }
        } else {
          console.log('인증이 필요한 API 호출인데 인증되지 않았습니다:', url);
        }
      } else {
        console.log('인증이 필요하지 않은 API 호출:', url);
      }
    } catch (err) {
      console.error('Keycloak 토큰 처리 중 오류:', err);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - 오류 처리
api.interceptors.response.use(
  (response) => {
    console.log('API 응답 성공:', response.config.url);
    console.log('응답 헤더:', response.headers);
    return response;
  },
  (error) => {
    try {
      const { status, config, data, headers } = error.response || {};
      const url = config?.url || '';
      
      console.error('API 오류 발생:', {
        url,
        status,
        message: error.message,
        responseData: data,
        requestHeaders: config?.headers
      });

      // 인증 관련 오류 처리 (인증이 필요한 경로인 경우만)
      if ((status === 401 || status === 403) && isAuthRequired(url)) {
        console.error('인증 오류 발생:', status, data);
        
        const keycloak = getKeycloakInstance();
        if (keycloak) {
          console.log('인증 오류 발생. 토큰 갱신 후 재시도합니다.');
          // 토큰 갱신 시도
          keycloak.updateToken(5).then(() => {
            console.log('토큰이 갱신되었습니다. 다시 시도하세요.');
          }).catch(() => {
            console.log('토큰 갱신 실패. 로그인 페이지로 이동합니다.');
            keycloak.login();
          });
        }
      }
    } catch (err) {
      console.error('응답 처리 중 오류:', err);
    }
    
    return Promise.reject(error);
  }
);

// 간단한 테스트용 API 직접 호출 함수
export const directApiCall = async (url: string, token?: string) => {
  try {
    console.log('직접 API 호출 시작:', url);
    console.log('사용할 토큰:', token ? `${token.substring(0, 20)}...` : '토큰 없음');
    
    const headers = getHeaders(token);
    console.log('직접 API 호출 헤더:', headers);
    
    const response = await axios.get(`http://localhost:8080${url}`, { 
      headers,
      withCredentials: true
    });
    
    console.log('직접 API 호출 응답:', response.status);
    return response.data;
  } catch (error) {
    console.error('직접 API 호출 오류:', error);
    throw error;
  }
};

// API 엔드포인트
export const testApi = {
  // 인증이 필요한 API
  getTest: () => {
    // 토큰을 직접 가져와서 헤더에 추가
    const keycloak = getKeycloakInstance();
    if (keycloak && keycloak.token) {
      console.log('getTest 호출: 토큰을 직접 설정합니다.');
      api.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}`;
    }
    return api.get('/test');
  },
  
  // 인증 없이 호출할 수 있는 API
  getPublicTest: () => unauthApi.get('/test'),
  
  // 직접 토큰을 전달하여 API 호출
  getTestWithToken: (token: string) => {
    console.log('getTestWithToken 호출:', token.substring(0, 20) + '...');
    return axios.get('http://localhost:8080/test', {
      headers: getHeaders(token),
      withCredentials: true
    });
  }
};

export default api;

