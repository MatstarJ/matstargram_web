import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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

/**
 * 현재 토큰을 가져오는 함수
 * @returns 현재 Keycloak 토큰 또는 undefined
 */
export const getCurrentToken = (): string | undefined => {
  const keycloak = getKeycloakInstance();
  return keycloak?.token || undefined;
};

// 인증이 필요한 API 경로인지 확인하는 함수
const isAuthRequired = (url: string): boolean => {
  // 모든 matstar API는 인증이 필요하다고 가정
  return true;
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

// 로컬 API URL (개발용)
const LOCAL_API_URL = 'http://localhost:8080';

// MatStar API URL
const MATSTAR_API_URL = 'https://access.matstar.kro.kr/api';

// API Base URL 설정 (실제 환경에 맞게 선택)
const API_BASE_URL = MATSTAR_API_URL;

/**
 * API 클라이언트 생성 함수
 * @param baseURL API 기본 URL
 * @param useAuth 인증 사용 여부
 * @returns Axios 인스턴스
 */
const createApiClient = (baseURL: string, useAuth: boolean = true): AxiosInstance => {
  // Axios 인스턴스 생성
  const client = axios.create({
    baseURL,
    headers: getHeaders(),
    withCredentials: true,
  });

  // 인증이 필요한 경우에만 인터셉터 설정
  if (useAuth) {
    // 요청 인터셉터 - 토큰 추가
    client.interceptors.request.use(
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
    client.interceptors.response.use(
      (response) => {
        console.log('API 응답 성공:', response.config.url);
        return response;
      },
      (error) => {
        try {
          const { status, config, data } = error.response || {};
          const url = config?.url || '';
          
          console.error('API 오류 발생:', {
            url,
            status,
            message: error.message,
            responseData: data
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
  }

  return client;
};

// 인증이 필요한 API 클라이언트
export const api = createApiClient(API_BASE_URL, true);

// 인증이 필요하지 않은 API 클라이언트
export const unauthApi = createApiClient(API_BASE_URL, false);

/**
 * 직접 API 호출 함수 - 토큰을 명시적으로 제공
 * @param url API 엔드포인트 경로
 * @param options Axios 요청 옵션
 * @param token 사용할 토큰 (없으면 현재 인증된 토큰 사용)
 * @returns API 응답
 */
export const apiRequest = async <T = any>(
  url: string, 
  options: AxiosRequestConfig = {}, 
  token?: string
): Promise<T> => {
  try {
    // 토큰이 전달되지 않으면 현재 토큰 사용
    const useToken = token || getCurrentToken();
    
    // 요청 설정
    const config: AxiosRequestConfig = {
      ...options,
      headers: {
        ...getHeaders(useToken),
        ...(options.headers || {})
      },
      withCredentials: true
    };
    
    console.log(`API 요청: ${url}`, config);
    
    // API 호출
    const response = await axios({
      ...config,
      url: `${API_BASE_URL}${url}`
    });
    
    return response.data;
  } catch (error) {
    console.error(`API 호출 오류 (${url}):`, error);
    throw error;
  }
};

// API 엔드포인트 그룹화
export const matstarApi = {
  // 게시물 관련 API
  post: {
    // 팔로우된 사용자의 게시물 가져오기
    getFollowedPosts: (page: number = 0) => {
      return apiRequest(`/post/personal/followed?page=${page}`);
    },
    
    // 특정 게시물 상세 정보 가져오기
    getPostDetail: (postId: string) => {
      return apiRequest(`/post/${postId}`);
    },
    
    // 게시물 생성하기
    createPost: (postData: any) => {
      return apiRequest('/post', {
        method: 'POST',
        data: postData
      });
    },
    
    // 게시물 수정하기
    updatePost: (postId: string, postData: any) => {
      return apiRequest(`/post/${postId}`, {
        method: 'PUT',
        data: postData
      });
    },
    
    // 게시물 삭제하기
    deletePost: (postId: string) => {
      return apiRequest(`/post/${postId}`, {
        method: 'DELETE'
      });
    },
    
    // 게시물 좋아요 설정/해제
    toggleLike: (postId: string) => {
      return apiRequest(`/post/${postId}/like`, {
        method: 'POST'
      });
    },
    
    // 게시물에 댓글 추가
    addComment: (postId: string, comment: string) => {
      return apiRequest(`/post/${postId}/comment`, {
        method: 'POST',
        data: { comment }
      });
    }
  },
  
  // 사용자 관련 API
  user: {
    // 현재 사용자 정보 가져오기
    getCurrentUser: () => {
      return apiRequest('/user/me');
    },
    
    // 사용자 프로필 정보 가져오기
    getUserProfile: (userId: string) => {
      return apiRequest(`/user/${userId}/profile`);
    },
    
    // 사용자 팔로우하기
    followUser: (userId: string) => {
      return apiRequest(`/user/${userId}/follow`, {
        method: 'POST'
      });
    },
    
    // 사용자 팔로우 취소하기
    unfollowUser: (userId: string) => {
      return apiRequest(`/user/${userId}/unfollow`, {
        method: 'POST'
      });
    }
  }
};

// 기존 테스트 API (하위 호환성을 위해 유지)
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
    return axios.get(`${LOCAL_API_URL}/test`, {
      headers: getHeaders(token),
      withCredentials: true
    });
  }
};

export default api;

