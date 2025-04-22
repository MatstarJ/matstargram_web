import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  PostDetailContainer,
  PostDetailImage,
  PostDetailContent,
  PostDetailHeader,
  PostDetailAvatar,
  PostDetailUsername,
  PostDetailComments,
  CommentItem,
  CommentAvatar,
  CommentContent,
  CommentUsername,
  CommentText,
  CommentLike,
  CommentTime,
  PostDetailActions,
  PostDetailAction,
  PostDetailLikes,
  PostDetailDescription,
  PostDetailTime,
  PostDetailAddComment,
  ReplyButton,
  ViewRepliesButton,
  ReplyInputContainer,
  ReplyInput,
  ReplySubmitButton,
  ReplyItem,
  ReplyAvatar
} from './PostDetail.styles';
import { FiHeart, FiMessageCircle, FiSend, FiBookmark, FiMoreHorizontal, FiSmile, FiMaximize, FiMinimize } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styled from 'styled-components';

interface Reply {
  id: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
  likes: number;
  replies: Reply[];
  isLiked?: boolean;
}

// API에서 가져온 미디어 파일 타입 정의
interface PostAttach {
  postAttachId: number;
  fileUrl: string;
  orders: number;
  type: string; // "img" 또는 "video"
}

interface PostDetailProps {
  // 필요한 경우 상위 컴포넌트에서 받아올 데이터 정의
  post?: {
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
    likeYn?: boolean; // 좋아요 허용 여부
    commentYn?: boolean; // 댓글 허용 여부
    isLiked?: boolean; // 좋아요 상태
    isSaved?: boolean; // 저장 상태
  };
  onClose?: () => void; // 모달을 닫기 위한 콜백 함수
}

// 목업 데이터
const mockPost = {
  id: '1',
  username: 'user123',
  avatar: 'https://i.pravatar.cc/56?img=1',
  image: 'https://picsum.photos/600/600',
  imageType: 'img',
  mediaFiles: [
    {
      postAttachId: 1,
      fileUrl: 'https://picsum.photos/600/600',
      orders: 0,
      type: 'img'
    }
  ],
  likes: 123,
  description: '안녕하세요! 인스타그램 클론 앱입니다.',
  comments: [
    {
      id: 'c1',
      username: 'user456',
      avatar: 'https://i.pravatar.cc/56?img=2',
      text: '멋진 게시물이에요!',
      createdAt: '2시간 전',
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: 'r1',
          username: 'user123',
          avatar: 'https://i.pravatar.cc/56?img=1',
          text: '감사합니다! 😊',
          createdAt: '1시간 전',
          likes: 2,
          isLiked: false
        },
        {
          id: 'r2',
          username: 'user789',
          avatar: 'https://i.pravatar.cc/56?img=3',
          text: '저도 정말 마음에 들어요~',
          createdAt: '30분 전',
          likes: 1,
          isLiked: false
        }
      ]
    },
    {
      id: 'c2',
      username: 'user789',
      avatar: 'https://i.pravatar.cc/56?img=3',
      text: '와우 정말 멋져요~',
      createdAt: '1시간 전',
      likes: 2,
      isLiked: false,
      replies: []
    },
    {
      id: 'c3',
      username: 'friend123',
      avatar: 'https://i.pravatar.cc/56?img=4',
      text: '좋은 하루 되세요!',
      createdAt: '30분 전',
      likes: 1,
      isLiked: false,
      replies: [
        {
          id: 'r3',
          username: 'user123',
          avatar: 'https://i.pravatar.cc/56?img=1',
          text: '당신도 좋은 하루 되세요!',
          createdAt: '15분 전',
          likes: 0,
          isLiked: false
        }
      ]
    }
  ],
  time: '3시간 전',
  commentCount: 3,
  likeYn: true,
  commentYn: true,
  isLiked: false,
  isSaved: false
};

// 미디어 네비게이션 버튼 스타일 정의
const MediaNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
  
  &.prev {
    left: 16px;
  }
  
  &.next {
    right: 16px;
  }
  
  @media (max-width: 935px) {
    width: 26px;
    height: 26px;
  }
`;

// 미디어 인디케이터 스타일 정의
const MediaIndicator = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
`;

const IndicatorDot = styled.div<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  transition: background-color 0.2s ease;
`;

// 확대/축소 버튼 스타일
const ZoomButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// 날짜를 포맷팅하는 함수
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    // 이미 '시간 전' 형식으로 전달된 경우 그대로 반환
    if (dateString.includes('시간 전') || 
        dateString.includes('분 전') || 
        dateString.includes('일 전') || 
        dateString.includes('주 전') || 
        dateString.includes('방금 전')) {
      return dateString;
    }
    
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

const PostDetail: React.FC<PostDetailProps> = ({ post: propPost, onClose }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // 실제 구현에서는 API로 데이터를 가져오겠지만, 여기서는 목업 데이터 사용
  const post = propPost || mockPost;
  
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [showReplies, setShowReplies] = useState<{[key: string]: boolean}>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  
  // 비디오 재생 관련 상태 추가
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // 여러 미디어 파일 처리
  const hasMultipleMedia = post.mediaFiles && post.mediaFiles.length > 1;
  const currentMedia = post.mediaFiles && post.mediaFiles.length > 0 ? post.mediaFiles[currentMediaIndex] : null;

  // 포맷팅된 날짜
  const formattedPostTime = formatDate(post.time);

  const handleLike = () => {
    // 좋아요 기능이 비활성화된 경우
    if (post.likeYn === false) return;
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  /**
   * 다음 미디어로 이동
   */
  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (currentMediaIndex < (post.mediaFiles?.length || 0) - 1) {
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
  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
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

  /**
   * 인디케이터 클릭 핸들러
   */
  const handleIndicatorClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setCurrentMediaIndex(index);
  };

  /**
   * 이미지 확대/축소 토글
   */
  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsZoomed(!isZoomed);
  };

  // 음소거 토글 핸들러
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // 버블링 방지(영상 재생/일시정지 방지)
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // 동영상 클릭 핸들러 추가
  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
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

  /**
   * 현재 미디어를 렌더링하는 함수
   */
  const renderMedia = () => {
    if (!currentMedia) {
      // 미디어 파일이 없는 경우 기본 이미지 표시
      if (post.image) {
        return (
          <img 
            src={post.image} 
            alt="게시물 이미지"
            style={{ 
              objectPosition: 'center',
              transform: isZoomed ? 'scale(1.5)' : 'scale(1)', // 확대/축소 상태에 따른 변환
              cursor: isZoomed ? 'zoom-out' : 'zoom-in' // 커서 스타일 변경
            }}
            onClick={toggleZoom} // 이미지 클릭 시 확대/축소 토글
          />
        );
      }
      return <div>미디어 없음</div>;
    }

    // 비디오인 경우와 이미지인 경우를 구분하여 렌더링
    if (currentMedia.type === 'video') {
      return (
        <>
          <video 
            key={`video-${currentMedia.postAttachId}-${currentMediaIndex}`}
            ref={videoRef}
            src={currentMedia.fileUrl}
            playsInline
            muted={isMuted}
            loop
            onClick={handleVideoClick}
            style={{ 
              objectPosition: 'center',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'pointer'
            }}
          />
          {/* 재생/일시정지 오버레이 (재생 중이 아닐 때만 표시) */}
          {!isPlaying && (
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
      );
    } else {
      return (
        <img 
          key={`img-${currentMedia.postAttachId}-${currentMediaIndex}`}
          src={currentMedia.fileUrl} 
          alt="게시물 이미지"
          style={{ 
            objectPosition: 'center',
            transform: isZoomed ? 'scale(1.5)' : 'scale(1)', // 확대/축소 상태에 따른 변환
            cursor: isZoomed ? 'zoom-out' : 'zoom-in' // 커서 스타일 변경
          }}
          onClick={toggleZoom} // 이미지 클릭 시 확대/축소 토글
        />
      );
    }
  };

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment: Comment = {
        id: `c${comments.length + 1}`,
        username: 'me', // 현재 로그인한 사용자
        avatar: 'https://i.pravatar.cc/56?img=5',
        text: comment,
        createdAt: '방금 전',
        likes: 0,
        replies: [],
        isLiked: false
      };
      
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleReply = (commentId: string) => {
    if (replyText.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          const newReply: Reply = {
            id: `r${comment.replies.length + 1}`,
            username: 'me', // 현재 로그인한 사용자
            avatar: 'https://i.pravatar.cc/56?img=5',
            text: replyText,
            createdAt: '방금 전',
            likes: 0,
            isLiked: false
          };
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const toggleReplies = (commentId: string) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleClose = () => {
    // onClose 콜백이 있으면 사용하고, 없으면 이전 페이지로 이동
    if (onClose) {
      onClose();
    } else {
      navigate(-1); // 이전 페이지로 돌아가기 (라우터를 통해 직접 접근한 경우)
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    // 모달 내부 클릭 시 이벤트 버블링 방지
    e.stopPropagation();
  };

  const handleCommentLike = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  const handleReplyLike = (commentId: string, replyId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              isLiked: !reply.isLiked,
              likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  // 모달 외부 클릭 감지를 위한 이벤트 핸들러
  useEffect(() => {
    // postId가 있는 경우에만 이벤트 리스너 등록 (라우터를 통해 직접 접근한 경우)
    if (postId) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          handleClose();
        }
      };
  
      // 이벤트 리스너 등록
      document.addEventListener('mousedown', handleOutsideClick);
  
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [postId]);

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

  return (
    <PostDetailContainer ref={modalRef} onClick={handleModalClick}>
      <PostDetailImage>
        {renderMedia()}
        
        {/* 확대/축소 버튼 (이미지만 해당) */}
        {currentMedia && currentMedia.type !== 'video' && (
          <ZoomButton onClick={toggleZoom} aria-label={isZoomed ? '축소' : '확대'}>
            {isZoomed ? <FiMinimize /> : <FiMaximize />}
          </ZoomButton>
        )}
        
        {/* 여러 미디어가 있는 경우에만 네비게이션 버튼 표시 */}
        {hasMultipleMedia && (
          <>
            <MediaNavButton 
              className="prev" 
              onClick={prevMedia} 
              disabled={currentMediaIndex === 0}
              aria-label="이전 미디어"
            >
              <BsChevronLeft />
            </MediaNavButton>
            
            <MediaNavButton 
              className="next" 
              onClick={nextMedia} 
              disabled={currentMediaIndex === (post.mediaFiles?.length || 0) - 1}
              aria-label="다음 미디어"
            >
              <BsChevronRight />
            </MediaNavButton>
            
            {/* 미디어 인디케이터 (현재 몇 번째 미디어인지 표시) */}
            <MediaIndicator>
              {post.mediaFiles?.map((_, index) => (
                <IndicatorDot 
                  key={`indicator-${index}`} 
                  active={index === currentMediaIndex}
                  onClick={(e) => handleIndicatorClick(index, e)}
                />
              ))}
            </MediaIndicator>
          </>
        )}
      </PostDetailImage>
      
      <PostDetailContent>
        <PostDetailHeader>
          <PostDetailAvatar>
            <img src={post.avatar} alt={`${post.username}의 프로필`} />
          </PostDetailAvatar>
          <PostDetailUsername>{post.username}</PostDetailUsername>
        </PostDetailHeader>
        
        <PostDetailComments>
          {/* 포스트 작성자 코멘트 */}
          <CommentItem>
            <CommentAvatar>
              <img src={post.avatar} alt={post.username} />
            </CommentAvatar>
            <CommentContent>
              <div>
                <CommentUsername>{post.username}</CommentUsername>
                <CommentText>{post.description}</CommentText>
              </div>
              <CommentTime>{formatDate(post.time)}</CommentTime>
            </CommentContent>
          </CommentItem>
          
          {/* 댓글 목록 */}
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <CommentItem>
                <CommentAvatar>
                  <img src={comment.avatar} alt={comment.username} />
                </CommentAvatar>
                <CommentContent>
                  <div>
                    <CommentUsername>{comment.username}</CommentUsername>
                    <CommentText>{comment.text}</CommentText>
                  </div>
                  <div>
                    <CommentTime>{formatDate(comment.createdAt)}</CommentTime>
                    {comment.likes > 0 && <span style={{ marginRight: '8px' }}>{comment.likes}개의 좋아요</span>}
                    {comment.replies.length === 0 && (
                      <ReplyButton onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>
                        답글 달기
                      </ReplyButton>
                    )}
                    {comment.replies.length > 0 && (
                      <ViewRepliesButton onClick={() => toggleReplies(comment.id)}>
                        {showReplies[comment.id] ? '답글 숨기기' : `답글 ${comment.replies.length}개 보기`}
                      </ViewRepliesButton>
                    )}
                  </div>
                </CommentContent>
                <CommentLike onClick={() => handleCommentLike(comment.id)}>
                  {comment.isLiked ? (
                    <svg aria-label="좋아요 취소" fill="#ed4956" height="12" role="img" viewBox="0 0 24 24" width="12">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                  ) : (
                    <svg aria-label="좋아요" fill="none" height="12" role="img" viewBox="0 0 24 24" width="12" stroke="currentColor" strokeWidth="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                  )}
                </CommentLike>
              </CommentItem>

              {/* 답글 입력 영역 */}
              {replyingTo === comment.id && (
                <ReplyInputContainer>
                  <ReplyInput
                    type="text"
                    placeholder={`@${comment.username}에게 답글 달기...`}
                    value={replyText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReplyText(e.target.value)}
                  />
                  <ReplySubmitButton
                    onClick={() => handleReply(comment.id)}
                    disabled={!replyText.trim()}
                  >
                    게시
                  </ReplySubmitButton>
                </ReplyInputContainer>
              )}

              {/* 답글 목록 */}
              {showReplies[comment.id] && (
                <>
                  {comment.replies.map(reply => (
                    <ReplyItem key={reply.id}>
                      <ReplyAvatar>
                        <img src={reply.avatar} alt={reply.username} />
                      </ReplyAvatar>
                      <CommentContent>
                        <div>
                          <CommentUsername>{reply.username}</CommentUsername>
                          <CommentText>{reply.text}</CommentText>
                        </div>
                        <div>
                          <CommentTime>{formatDate(reply.createdAt)}</CommentTime>
                          {reply.likes > 0 && <span>{reply.likes}개의 좋아요</span>}
                        </div>
                      </CommentContent>
                      <CommentLike onClick={() => handleReplyLike(comment.id, reply.id)}>
                        {reply.isLiked ? (
                          <svg aria-label="좋아요 취소" fill="#ed4956" height="12" role="img" viewBox="0 0 24 24" width="12">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                          </svg>
                        ) : (
                          <svg aria-label="좋아요" fill="none" height="12" role="img" viewBox="0 0 24 24" width="12" stroke="currentColor" strokeWidth="2">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                          </svg>
                        )}
                      </CommentLike>
                    </ReplyItem>
                  ))}
                  
                  {/* 답글 목록 아래에 답글 달기 버튼 추가 */}
                  <div style={{ 
                    marginLeft: '54px', 
                    marginBottom: '16px' 
                  }}>
                    <ReplyButton onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>
                      답글 달기
                    </ReplyButton>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </PostDetailComments>
        
        <PostDetailActions>
          <div>
            {(post.likeYn !== false) && (
              <PostDetailAction onClick={handleLike}>
                {isLiked ? (
                  <svg aria-label="좋아요 취소" fill="#ed4956" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                ) : (
                  <svg aria-label="좋아요" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                )}
              </PostDetailAction>
            )}
            
            {(post.commentYn !== false) && (
              <PostDetailAction>
                <svg aria-label="댓글 달기" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </PostDetailAction>
            )}
            
            <PostDetailAction>
              <svg aria-label="공유" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
              </svg>
            </PostDetailAction>
          </div>
          <PostDetailAction onClick={handleSave}>
            {isSaved ? (
              <svg aria-label="저장 취소" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
              </svg>
            ) : (
              <svg aria-label="저장" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
              </svg>
            )}
          </PostDetailAction>
        </PostDetailActions>
        
        <PostDetailLikes>{post.likes.toLocaleString()}명이 좋아합니다</PostDetailLikes>
        <PostDetailTime>{formattedPostTime}</PostDetailTime>
        
        {(post.commentYn !== false) && (
          <PostDetailAddComment onSubmit={handleComment}>
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
          </PostDetailAddComment>
        )}
      </PostDetailContent>
    </PostDetailContainer>
  );
};

export default PostDetail; 