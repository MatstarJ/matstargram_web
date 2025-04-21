import React, { useState } from 'react';
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
} from './Post.styles';

interface PostProps {
  id: string;
  username: string;
  avatar: string;
  image: string;
  likes: number;
  description: string;
  comments: { username: string; text: string }[];
  time: string;
  onPostClick?: (postId: string) => void;
}

const Post: React.FC<PostProps> = ({
  id,
  username,
  avatar,
  image,
  likes,
  description,
  comments,
  time,
  onPostClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      // 실제 애플리케이션에서는 여기에 새 댓글 추가 로직을 구현
      setComment('');
    }
  };

  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick(id);
    }
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

      <PostImage onClick={handlePostClick}>
        <img src={image} alt="게시물 이미지" />
      </PostImage>

      <PostActions>
        <div>
          <PostAction onClick={handleLike}>
            {isLiked ? (
              <svg aria-label="좋아요 취소" fill="#ed4956" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            ) : (
              <svg aria-label="좋아요" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            )}
          </PostAction>
          <PostAction onClick={handlePostClick}>
            <svg aria-label="댓글 달기" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
              <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </PostAction>
          <PostAction>
            <svg aria-label="공유" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
              <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
              <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
            </svg>
          </PostAction>
        </div>
        <PostAction onClick={handleSave}>
          {isSaved ? (
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
        <strong>{username}</strong> {description}
      </PostDescription>

      {comments.length > 0 && (
        <PostComments>
          {comments.length > 2 ? (
            <>
              <div onClick={handlePostClick} style={{ cursor: 'pointer', color: '#8e8e8e', marginBottom: '8px' }}>
                댓글 {comments.length}개 모두 보기
              </div>
              {comments.slice(0, 2).map((comment, index) => (
                <div key={index}>
                  <strong>{comment.username}</strong> {comment.text}
                </div>
              ))}
            </>
          ) : (
            comments.map((comment, index) => (
              <div key={index}>
                <strong>{comment.username}</strong> {comment.text}
              </div>
            ))
          )}
        </PostComments>
      )}

      <PostTime onClick={handlePostClick} style={{ cursor: 'pointer' }}>{time}</PostTime>

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
    </PostContainer>
  );
};

export default Post; 