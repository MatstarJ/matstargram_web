import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import Post from '../Post/Post';
import { FeedContainer, PostsContainer, SidebarContainer } from './Feed.styles';
import Sidebar from '../Sidebar/Sidebar';
import { PostModalContext } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import { matstarApi } from '../../services/api';

// API 응답 타입 정의
interface PostAttach {
  postAttachId: number;
  fileUrl: string;
  orders: number;
  type: string; // "img" 또는 "video"
}

interface UserProfile {
  loginId: string;
  content: string;
  postCount: number;
  followCount: number;
  followerCount: number;
  pushYn: boolean;
  emailPushYn: boolean;
  isTagged: string;
  isMentioned: string;
  profileImg: {
    profileImgUrl: string;
  };
}

interface PostData {
  postId: number;
  postContent: string;
  commentCount: number;
  postLikeCount: number;
  commentYn: boolean;
  likeYn: boolean;
  isLike: boolean;
  isSaved: boolean;
  createDate: string;
  user: UserProfile;
  postAttach: PostAttach[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: PostData[];
  currentPage: number;
  size: number;
  first: boolean;
  last: boolean;
}

/**
 * 피드 컴포넌트
 * 홈페이지에 표시되는 게시물 목록을 렌더링합니다.
 * API를 호출하여 팔로우된 게시물을 가져오고 무한 스크롤을 구현합니다.
 */
const Feed: React.FC = () => {
  const { setSelectedPostId, addPost } = useContext(PostModalContext);
  const { isAuthenticated } = useAuth();
  
  // 상태 관리
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allPostsViewed, setAllPostsViewed] = useState<boolean>(false);
  
  // 무한 스크롤 관련 ref
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMorePosts();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);
  
  /**
   * API를 호출하여 팔로우된 게시물 목록을 가져옵니다.
   */
  const fetchFollowedPosts = async (page: number) => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // API 호출
      const response = await matstarApi.post.getFollowedPosts(page);
      const apiResponse = response as ApiResponse;
      
      // 결과 처리
      const newPosts = apiResponse.data;
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setCurrentPage(apiResponse.currentPage);
      setHasMore(!apiResponse.last);
      
      // 모든 게시물을 확인한 경우
      if (apiResponse.last) {
        setAllPostsViewed(true);
      }
      
      // 새로운 게시물을 PostModalContext에 추가
      newPosts.forEach(post => {
        addPost(post);
      });
      
      console.log('API 호출 결과:', apiResponse);
    } catch (error) {
      console.error('API 호출 오류:', error);
      setError('게시물을 불러오는 데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * 추가 게시물을 가져오는 함수
   */
  const fetchMorePosts = () => {
    fetchFollowedPosts(currentPage + 1);
  };
  
  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Feed 컴포넌트 마운트, API 호출 실행');
      fetchFollowedPosts(0);
    } else {
      console.log('인증되지 않았거나 토큰이 없어 API 호출 건너뜀');
    }
  }, [isAuthenticated]);
  
  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
  };
  
  return (
    <FeedContainer>
      <PostsContainer>
        {posts.map((post, index) => {
          // 이미지나 비디오 중 첫 번째 파일을 게시물 이미지로 사용
          const postMedia = post.postAttach.length > 0 ? post.postAttach[0].fileUrl : '';
          const isLastPost = index === posts.length - 1;
          
          return (
            <div 
              key={post.postId}
              ref={isLastPost ? lastPostElementRef : null}
            >
              <Post
                id={post.postId.toString()}
                username={post.user.loginId}
                avatar={post.user.profileImg.profileImgUrl}
                image={postMedia}
                imageType={post.postAttach.length > 0 ? post.postAttach[0].type : 'img'}
                mediaFiles={post.postAttach}
                likes={post.postLikeCount}
                description={post.postContent}
                comments={[]} // 댓글 데이터는 API에서 제공하지 않음
                commentCount={post.commentCount}
                time={post.createDate}
                onPostClick={handlePostClick}
                likeYn={post.likeYn}
                commentYn={post.commentYn}
                isLiked={post.isLike}
                isSaved={post.isSaved}
              />
            </div>
          );
        })}
        
        {isLoading && <div>게시물을 불러오는 중...</div>}
        {error && <div>{error}</div>}
        
        {allPostsViewed && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '20px',
            margin: '20px 0',
            textAlign: 'center' 
          }}>
            <img src="/confirm.png" alt="모두 확인" style={{ width: '80px', marginBottom: '10px' }} />
            <p style={{ fontWeight: 'bold' }}>모두 확인했습니다</p>
            <p>최근 3일 동안 새롭게 올라온 게시물을 모두 확인했습니다.</p>
          </div>
        )}
      </PostsContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </FeedContainer>
  );
};

export default Feed; 