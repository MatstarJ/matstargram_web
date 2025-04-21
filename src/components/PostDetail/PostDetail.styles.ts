import styled from 'styled-components';

export const PostDetailContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 4px;
  width: 100%;
  max-width: 1400px;
  max-height: 98vh;
  overflow: hidden;
  position: relative;
  
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
  min-width: 650px;
  max-height: 98vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 935px) {
    min-width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
  }
`;

export const PostDetailContent = styled.div`
  width: 450px;
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
  height: 72px;
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
  font-size: 15px;
  
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
  margin-bottom: 20px;
  position: relative;
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
`;

export const CommentText = styled.span`
  color: #262626;
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
  margin-bottom: 12px;
  font-size: 15px;
  
  strong {
    font-weight: 600;
    margin-right: 6px;
  }
`;

export const PostDetailTime = styled.div`
  padding: 0 20px;
  color: #8e8e8e;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 12px;
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