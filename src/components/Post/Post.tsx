import React, { useState, useEffect, useRef } from 'react';
import {
  PostContainer,
  PostHeader,
  PostAvatar,
  PostUser,
  PostUsername,
  PostOptions,
  PostImage,
  PostActions,
  PostAction,
  PostLikes,
  PostDescription,
  PostComments,
  PostTime,
  PostAddComment,
  CommentsLink,
  MediaNavButton,
  MediaIndicator,
  MediaDot,
  MediaContainer
} from './Post.styles';

// API에서 가져온 미디어 파일 타입 정의
interface PostAttach {
  postAttachId: number;
  fileUrl: string;
  orders: number;
  type: string; // "img" 또는 "video"
}

// 인터페이스 정의
interface Reply {
  id: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
}

interface PostProps {
  id: string;
  username: string;
  avatar: string;
  image: string;
  imageType?: string; // 이미지 또는 비디오 타입
  mediaFiles?: PostAttach[]; // 모든 미디어 파일들
  likes: number;
  description: string;
  comments: Comment[];
  commentCount?: number; // 댓글 개수
  time: string;
  onPostClick?: (postId: string) => void;
  likeYn?: boolean; // 좋아요 허용 여부
  commentYn?: boolean; // 댓글 허용 여부
  isLiked?: boolean; // 좋아요 상태
  isSaved?: boolean; // 저장 상태
}

// 날짜를 포맷팅하는 함수
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // 날짜가 유효한지 확인
    if (isNaN(date.getTime())) {
      return '';
    }
    
    // 현재 시간과의 차이 계산
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    
    // 시간 차이에 따라 다른 형식으로 표시
    if (diffDay > 30) {
      // 30일 이상이면 년월일 형식으로 표시
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    } else if (diffWeek > 0) {
      // 1주일 이상이면 n주 전 형식으로 표시
      return `${diffWeek}주 전`;
    } else if (diffDay > 0) {
      // 1일 이상이면 n일 전 형식으로 표시
      return `${diffDay}일 전`;
    } else if (diffHour > 0) {
      // 1시간 이상이면 n시간 전 형식으로 표시
      return `${diffHour}시간 전`;
    } else if (diffMin > 0) {
      // 1분 이상이면 n분 전 형식으로 표시
      return `${diffMin}분 전`;
    } else {
      // 1분 미만이면 방금 전 형식으로 표시
      return '방금 전';
    }
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return '';
  }
};

const Post: React.FC<PostProps> = ({
  id,
  username,
  avatar,
  image,
  imageType = 'img',
  mediaFiles = [],
  likes,
  description,
  comments,
  commentCount = 0,
  time,
  onPostClick,
  likeYn = true,
  commentYn = true,
  isLiked = false,
  isSaved = false,
}) => {
  // 상태 관리
  const [liked, setLiked] = useState<boolean>(isLiked);
  const [saved, setSaved] = useState<boolean>(isSaved);
  const [comment, setComment] = useState<string>('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
  
  // 날짜 포맷팅
  const formattedDate = formatDate(time);
  
  // 본문 길이 체크 (대략 100자 이상이면 더보기 버튼 표시)
  const isLongDescription = description.length > 100;
  
  // 본문 요약 (더보기 버튼이 필요한 경우 100자로 제한)
  const truncatedDescription = isLongDescription && !isDescriptionExpanded 
    ? `${description.substring(0, 100)}...` 
    : description;

  // 여러 미디어 파일 처리
  const hasMultipleMedia = mediaFiles.length > 1;
  const currentMedia = mediaFiles.length > 0 ? mediaFiles[currentMediaIndex] : null;

  // 미디어 프리로드를 위한 state
  const [loadedMedias, setLoadedMedias] = useState<Set<number>>(new Set([-1]));

  // 비디오 재생 관련 상태 추가
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // 미디어 파일 프리로드
  useEffect(() => {
    // 다음 미디어 파일 미리 로드
    if (mediaFiles.length > 1 && currentMediaIndex < mediaFiles.length - 1) {
      const nextIndex = currentMediaIndex + 1;
      const nextMedia = mediaFiles[nextIndex];
      
      if (nextMedia.type === 'img') {
        const img = new Image();
        img.src = nextMedia.fileUrl;
      }
    }
  }, [currentMediaIndex, mediaFiles]);

  /**
   * 좋아요 버튼 클릭 처리
   */
  const handleLike = () => {
    // 좋아요 기능이 비활성화된 경우
    if (!likeYn) return;
    setLiked(!liked);
    // 여기에 API 호출 로직 추가 (실제 좋아요 처리)
  };

  /**
   * 저장 버튼 클릭 처리
   */
  const handleSave = () => {
    setSaved(!saved);
    // 여기에 API 호출 로직 추가 (실제 저장 처리)
  };

  /**
   * 댓글 제출 처리
   */
  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      // 실제 애플리케이션에서는 여기에 새 댓글 추가 로직을 구현
      setComment('');
    }
  };

  /**
   * 게시물 클릭 처리
   */
  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick(id);
    }
  };
  
  /**
   * 본문 확장/축소 토글
   */
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  /**
   * 다음 미디어로 이동
   */
  const nextMedia = () => {
    if (currentMediaIndex < mediaFiles.length - 1) {
      // 현재 동영상이면 현재 시간 저장 및 일시정지
      if (currentMedia?.type === 'video' && videoRef.current) {
        setVideoProgress(videoRef.current.currentTime);
        videoRef.current.pause();
        setIsPlaying(false);
      }
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  /**
   * 이전 미디어로 이동
   */
  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      // 현재 동영상이면 현재 시간 저장 및 일시정지
      if (currentMedia?.type === 'video' && videoRef.current) {
        setVideoProgress(videoRef.current.currentTime);
        videoRef.current.pause();
        setIsPlaying(false);
      }
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  // 동영상 클릭 핸들러 추가
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.warn('비디오 재생 오류:', err));
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // 음소거 토글 핸들러
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // 버블링 방지(영상 재생/일시정지 방지)
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // 미디어 인덱스가 변경될 때 동영상 자동 재생
  useEffect(() => {
    if (currentMedia?.type === 'video' && videoRef.current) {
      // 해당 동영상이 로드되었을 때 실행할 함수 정의
      const handleLoadedData = () => {
        // 이전에 저장된 시간이 있으면 해당 시간부터 재생
        if (videoProgress > 0) {
          videoRef.current.currentTime = videoProgress;
        }
      
        // 자동 재생
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(err => console.warn('자동 재생 오류:', err));
        }
      };
      
      // 동영상이 이미 로드되었다면 바로 실행
      if (videoRef.current.readyState >= 2) {
        handleLoadedData();
      } else {
        // 아직 로드되지 않았다면 이벤트 리스너 추가
        videoRef.current.addEventListener('loadeddata', handleLoadedData);
        
        // 클린업 함수
        return () => {
          videoRef.current?.removeEventListener('loadeddata', handleLoadedData);
        };
      }
    }
  }, [currentMediaIndex, currentMedia, videoProgress]);

  /**
   * 현재 미디어를 렌더링하는 함수
   */
  const renderMedia = () => {
    if (!currentMedia) {
      // 미디어 파일이 없는 경우 기본 이미지 표시
      if (image) {
        return (
          <MediaContainer>
            <img 
              src={image} 
              alt="게시물 이미지"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </MediaContainer>
        );
      }
      return <div>미디어 없음</div>;
    }

    // 현재 미디어만 렌더링하되 크기 유지
    return (
      <MediaContainer>
        {currentMedia.type === 'video' ? (
          <>
            <video 
              key={`video-${currentMedia.postAttachId}`}
              ref={videoRef}
              src={currentMedia.fileUrl} 
              playsInline
              muted={isMuted}
              loop
              onClick={handleVideoClick}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                cursor: 'pointer' 
              }}
            />
            {/* 재생/일시정지 오버레이 (동영상이고 재생 중이 아닐 때만 표시) */}
            {currentMedia.type === 'video' && !isPlaying && (
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
                onClick={handleVideoClick}
              >
                <svg fill="white" height="24" width="24" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </div>
            )}
            
            {/* 음소거 버튼 */}
            <div 
              style={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 3
              }}
              onClick={toggleMute}
            >
              {isMuted ? (
                <svg fill="white" height="24" width="24" viewBox="0 0 24 24">
                  <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3 3v-4.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06a8.996 8.996 0 003.76-1.74l1.49 1.49a.996.996 0 101.41-1.41L5.05 3.63a.996.996 0 00-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"></path>
                </svg>
              ) : (
                <svg fill="white" height="24" width="24" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                </svg>
              )}
            </div>
          </>
        ) : (
          <img 
            key={`img-${currentMedia.postAttachId}`}
            src={currentMedia.fileUrl} 
            alt="게시물 이미지"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </MediaContainer>
    );
  };

  return (
    <PostContainer>
      <PostHeader>
        <PostAvatar>
          <img src={avatar} alt={username} />
        </PostAvatar>
        <PostUser>
          <PostUsername>{username}</PostUsername>
        </PostUser>
        <PostOptions>
          <svg aria-label="옵션 더 보기" height="24" role="img" viewBox="0 0 24 24" width="24">
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </PostOptions>
      </PostHeader>

      <PostImage>
        {renderMedia()}
        
        {/* 여러 미디어 파일이 있는 경우 이전/다음 버튼 표시 */}
        {hasMultipleMedia && (
          <>
            {currentMediaIndex > 0 && (
              <MediaNavButton className="prev" onClick={prevMedia}>
                &lt;
              </MediaNavButton>
            )}
            {currentMediaIndex < mediaFiles.length - 1 && (
              <MediaNavButton className="next" onClick={nextMedia}>
                &gt;
              </MediaNavButton>
            )}
            <MediaIndicator>
              {mediaFiles.map((_, index) => (
                <MediaDot key={index} active={index === currentMediaIndex} />
              ))}
            </MediaIndicator>
          </>
        )}
      </PostImage>

      <PostActions>
        <div>
          {likeYn && (
            <PostAction onClick={handleLike}>
              {liked ? (
                <svg aria-label="좋아요 취소" fill="#ed4956" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              ) : (
                <svg aria-label="좋아요" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              )}
            </PostAction>
          )}
          
          {commentYn && (
            <PostAction onClick={handlePostClick}>
              <svg aria-label="댓글 달기" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </PostAction>
          )}
          
          <PostAction>
            <svg aria-label="공유" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
              <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
              <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
            </svg>
          </PostAction>
        </div>
        <PostAction onClick={handleSave}>
          {saved ? (
            <svg aria-label="저장 취소" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
              <path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
            </svg>
          ) : (
            <svg aria-label="저장" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
              <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
            </svg>
          )}
        </PostAction>
      </PostActions>

      <PostLikes>{likes.toLocaleString()}명이 좋아합니다</PostLikes>

      <PostDescription>
        <strong>{username}</strong> {truncatedDescription}
        {isLongDescription && (
          <button 
            onClick={toggleDescription} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#8e8e8e', 
              cursor: 'pointer',
              padding: '0',
              fontSize: '13px',
              fontWeight: '600',
              marginLeft: '5px'
            }}
          >
            {isDescriptionExpanded ? '접기' : '더 보기'}
          </button>
        )}
      </PostDescription>

      {commentCount > 0 && (
        <PostComments>
          <CommentsLink onClick={handlePostClick}>
            댓글 {commentCount}개 보기
          </CommentsLink>
        </PostComments>
      )}

      {formattedDate && <PostTime>{formattedDate}</PostTime>}

      {commentYn && (
        <PostAddComment onSubmit={handleComment}>
          <svg aria-label="이모티콘" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
            <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
          </svg>
          <input
            type="text"
            placeholder="댓글 달기..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" disabled={!comment.trim()}>
            게시
          </button>
        </PostAddComment>
      )}
    </PostContainer>
  );
};

export default Post; 