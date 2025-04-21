import styled from 'styled-components';

export const CreateContainer = styled.div`
  max-width: 1024px;
  margin: 0;
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  height: 80vh;
  position: fixed;
  top: 50%;
  left: calc(50% + 120px);
  transform: translate(-50%, -50%);
  
  @media (max-width: 935px) {
    max-width: 100%;
    width: 100%;
    border-radius: 0;
    margin: 0;
    height: calc(100vh - 60px);
    border: none;
    position: relative;
    top: auto;
    left: auto;
    transform: none;
  }
`;

export const CreateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 12px 20px;
  height: 42px;
  
  h2 {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    flex: 1;
    margin: 0;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: #0095f6;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    
    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
    
    &.back-button {
      color: #262626;
      margin-right: auto;
    }
    
    &.next-button {
      margin-left: auto;
    }
  }
`;

export const CreateContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  justify-content: center;
`;

export const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex: 1;
  background-color: #fafafa;
  
  svg {
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 22px;
    font-weight: 300;
    margin-bottom: 24px;
    text-align: center;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  p {
    font-size: 14px;
    color: #8e8e8e;
    margin-bottom: 24px;
    text-align: center;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const SelectButton = styled.label`
  background-color: #0095f6;
  color: white;
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  input[type="file"] {
    display: none;
  }
  
  &:hover {
    background-color: #1877f2;
  }
`;

export const PreviewContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex: 1;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: black;
  }
`;

export const EditContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MediaPreview = styled.div`
  flex: 1;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 100%;
  }
  
  @media (max-width: 768px) {
    height: 50%;
  }
`;

export const EditForm = styled.div`
  width: 340px;
  padding: 16px;
  border-left: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    border-left: none;
    border-top: 1px solid ${props => props.theme.colors.border};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 12px;
  }
  
  span {
    font-weight: 600;
    font-size: 14px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const CaptionTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  flex: 1 1 auto;
  border: none;
  resize: none;
  font-size: 16px;
  line-height: 24px;
  padding: 4px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #8e8e8e;
  }
`;

export const CharacterCount = styled.div`
  font-size: 12px;
  color: #8e8e8e;
  text-align: right;
  margin-top: 8px;
  margin-bottom: 16px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const LocationInput = styled.input`
  width: 100%;
  border: none;
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 16px 0;
  font-size: 16px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #8e8e8e;
  }
`;

export const AccessibilitySection = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 16px 0 0 0;
  margin-bottom: 0;
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  p {
    font-size: 14px;
    color: #8e8e8e;
    margin-bottom: 16px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  span {
    font-size: 16px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const Toggle = styled.button<{ isActive: boolean }>`
  width: 40px;
  height: 24px;
  background-color: ${props => props.isActive ? '#0095f6' : '#dbdbdb'};
  border-radius: 12px;
  position: relative;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    top: 2px;
    left: ${props => props.isActive ? '18px' : '2px'};
    transition: left 0.3s;
  }
`;

export const DragOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 100;
  pointer-events: none;
  
  svg {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 18px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`; 