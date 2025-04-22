import styled from 'styled-components';

export const PostDetailContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 4px;
  width: 100%;
  max-width: 1600px;
  height: 90vh;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 935px) {
    flex-direction: column;
    height: auto;
    max-height: none;
    max-width: 614px;
  }
`;

export const PostDetailImage = styled.div`
  flex: 2;
  background-color: black;
  width: 800px;
  min-width: 800px;
  height: 90vh;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: none;
    transition: transform 0.3s ease;
  }
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: none;
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 935px) {
    min-width: 100%;
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
  }
`;

export const PostDetailContent = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #dbdbdb;
  
  @media (max-width: 935px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid #dbdbdb;
  }
`;

export const PostDetailHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid #efefef;
  position: relative;
  height: 60px;
`;

export const PostDetailAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 14px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PostDetailUsername = styled.span`
  font-weight: 600;
  color: #262626;
  font-size: 16px;
`;

export const PostDetailComments = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  font-size: 14px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #c7c7c7;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

export const CommentItem = styled.div`
  display: flex;
  margin-bottom: 24px;
  position: relative;
  
  &:first-child {
    margin-top: 16px;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #efefef;
  }
`;

export const CommentAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 14px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CommentContent = styled.div`
  flex: 1;
  padding-right: 24px;
  
  & > div:first-child {
    margin-bottom: 6px;
  }
  
  & > div:last-child {
    display: flex;
    gap: 10px;
    font-size: 13px;
    color: #8e8e8e;
  }
`;

export const CommentUsername = styled.span`
  font-weight: 600;
  color: #262626;
  margin-right: 6px;
  font-size: 14px;
`;

export const CommentText = styled.span`
  color: #262626;
  font-size: 14px;
`;

export const CommentLike = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 0;
  top: 4px;
`;

export const CommentTime = styled.span`
  font-size: 12px;
  color: #8e8e8e;
  text-transform: uppercase;
  line-height: 1.2;
`;

export const PostDetailActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  border-top: 1px solid #efefef;
  
  & > div {
    display: flex;
    gap: 20px;
  }
`;

export const PostDetailAction = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  svg {
    width: 28px;
    height: 28px;
  }
`;

export const PostDetailLikes = styled.div`
  font-weight: 600;
  padding: 0 20px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const PostDetailDescription = styled.div`
  padding: 0 20px;
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.4;
  
  strong {
    font-weight: 600;
    margin-right: 6px;
  }
`;

export const PostDetailTime = styled.div`
  padding: 0 20px;
  color: #8e8e8e;
  font-size: 12px;
  margin-bottom: 10px;
  text-transform: uppercase;
  line-height: 1.2;
`;

export const PostDetailAddComment = styled.form`
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #efefef;
  
  svg {
    margin-right: 18px;
    width: 26px;
    height: 26px;
  }
  
  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
  }
  
  button {
    border: none;
    background: transparent;
    color: #0095f6;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    
    &:disabled {
      color: #b9dffc;
      cursor: default;
    }
  }
`;

export const ReplyButton = styled.span`
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  color: #8e8e8e;
  margin-right: 8px;
`;

export const ViewRepliesButton = styled.span`
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  color: #8e8e8e;
`;

export const ReplyInputContainer = styled.div`
  display: flex; 
  margin-left: 54px; 
  margin-bottom: 15px;
  align-items: center;
`;

export const ReplyInput = styled.input`
  flex: 1; 
  border: none; 
  outline: none; 
  font-size: 14px;
  padding: 8px;
  border-bottom: 1px solid #dbdbdb;
`;

export const ReplySubmitButton = styled.button`
  background: none; 
  border: none; 
  color: #0095f6; 
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
`;

export const ReplyItem = styled(CommentItem)`
  margin-left: 54px; 
  margin-bottom: 10px;
`;

export const ReplyAvatar = styled(CommentAvatar)`
  width: 32px;
  height: 32px;
`; 