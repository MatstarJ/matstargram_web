import styled from 'styled-components';

export const PostContainer = styled.article`
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 614px;
  
  @media (max-width: 768px) {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

export const PostHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #efefef;
`;

export const PostAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  
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
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  
  & > div {
    display: flex;
    gap: 16px;
  }
`;

export const PostAction = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const PostLikes = styled.div`
  font-weight: 600;
  padding: 0 16px;
  margin-bottom: 8px;
`;

export const PostDescription = styled.div`
  padding: 0 16px;
  margin-bottom: 8px;
  
  strong {
    font-weight: 600;
    margin-right: 4px;
  }
`;

export const PostComments = styled.div`
  padding: 0 16px;
  color: #262626;
  margin-bottom: 8px;
  
  div {
    margin-bottom: 4px;
  }
  
  strong {
    font-weight: 600;
    margin-right: 4px;
  }
`;

export const PostTime = styled.div`
  padding: 0 16px;
  color: #8e8e8e;
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 8px;
  cursor: pointer;
`;

export const PostAddComment = styled.form`
  display: flex;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #efefef;
  
  svg {
    margin-right: 16px;
  }
  
  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
  }
  
  button {
    border: none;
    background: transparent;
    color: #0095f6;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    
    &:disabled {
      color: #b9dffc;
      cursor: default;
    }
  }
`; 