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

interface PostDetailProps {
  // 필요한 경우 상위 컴포넌트에서 받아올 데이터 정의
  post?: {
    id: string;
    username: string;
    avatar: string;
    image: string;
    likes: number;
    description: string;
    comments: Comment[];
    time: string;
  };
  onClose?: () => void; // 모달을 닫기 위한 콜백 함수
}

// 목업 데이터
const mockPost = {
  id: '1',
  username: 'user123',
  avatar: 'https://i.pravatar.cc/56?img=1',
  image: 'https://picsum.photos/600/600',
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
  time: '3시간 전'
};

const PostDetail: React.FC<PostDetailProps> = ({ post: propPost, onClose }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // 실제 구현에서는 API로 데이터를 가져오겠지만, 여기서는 목업 데이터 사용
  const post = propPost || mockPost;
  
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [showReplies, setShowReplies] = useState<{[key: string]: boolean}>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
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

  return (
    <PostDetailContainer ref={modalRef} onClick={handleModalClick}>
      <PostDetailImage>
        <img src={post.image} alt="게시물 이미지" />
      </PostDetailImage>
      
      <PostDetailContent>
        <PostDetailHeader>
          <PostDetailAvatar>
            <img src={post.avatar} alt={post.username} />
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
              <CommentTime>{post.time}</CommentTime>
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
                    <CommentTime>{comment.createdAt}</CommentTime>
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
                          <CommentTime>{reply.createdAt}</CommentTime>
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
            <PostDetailAction>
              <svg aria-label="댓글 달기" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </PostDetailAction>
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
        <PostDetailTime>{post.time}</PostDetailTime>
        
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
      </PostDetailContent>
    </PostDetailContainer>
  );
};

export default PostDetail; 