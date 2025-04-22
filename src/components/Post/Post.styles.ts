import styled from 'styled-components';

export const PostContainer = styled.article`
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 800px;
  
  @media (max-width: 768px) {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

export const PostHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #efefef;
`;

export const PostAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 14px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PostUser = styled.div`
  flex: 1;
`;

export const PostUsername = styled.span`
  font-weight: 600;
  color: #262626;
  font-size: 16px;
`;

export const PostOptions = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const PostImage = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 550px;
  max-height: 700px;
  
  @media (max-width: 768px) {
    min-height: 350px;
  }
  
  @media (max-width: 480px) {
    min-height: 300px;
  }
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    max-height: 100%;
    max-width: 100%;
  }
`;

export const MediaNavButton = styled.button`
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  z-index: 10;
  font-size: 18px;
  
  &.prev {
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  &.next {
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const MediaIndicator = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

export const MediaDot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#0095f6' : 'rgba(255, 255, 255, 0.5)'};
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  
  & > div {
    display: flex;
    gap: 18px;
  }
`;

export const PostAction = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  svg {
    width: 26px;
    height: 26px;
  }
`;

export const PostLikes = styled.div`
  font-weight: 600;
  padding: 0 20px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const PostDescription = styled.div`
  padding: 0 20px;
  margin-bottom: 24px;
  word-break: break-word;
  font-size: 15px;
  line-height: 1.5;
  
  strong {
    font-weight: 600;
    margin-right: 5px;
    font-size: 16px;
  }
`;

export const PostComments = styled.div`
  padding: 0 20px;
  color: #262626;
  margin-bottom: 10px;
  position: relative;
  
  div {
    margin-bottom: 4px;
    max-width: calc(100% - 30px);
    word-break: break-word;
    font-size: 15px;
  }
  
  strong {
    font-weight: 600;
    margin-right: 5px;
  }
`;

// 댓글 링크 스타일
export const CommentsLink = styled.div`
  color: #8e8e8e;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 10px;
  padding-right: 28px;
  
  &:hover {
    color: #262626;
  }
`;

export const PostTime = styled.div`
  padding: 0 20px;
  color: #8e8e8e;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const PostAddComment = styled.form`
  display: flex;
  align-items: center;
  padding: 18px 20px;
  border-top: 1px solid #efefef;
  
  svg {
    margin-right: 16px;
    width: 26px;
    height: 26px;
  }
  
  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 15px;
  }
  
  button {
    border: none;
    background: transparent;
    color: #0095f6;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    
    &:disabled {
      color: #b9dffc;
      cursor: default;
    }
  }
`;

// 미디어 컨테이너
export const MediaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
  
  img, video {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`; 