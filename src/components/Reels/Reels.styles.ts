import styled from 'styled-components';

// 최상위 부모
export const ReelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  position: relative;
  
  @media (max-width: 768px) {
    height: 100vh;
  }
`;
// 동영상을 감싸는 부모
export const ReelsScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  @media (max-width: 768px) {
    align-items: center;
    margin-bottom: 10vh;

  }
  
  @media (max-width: 480px) {
    align-items: center;

  }
`;
// div class -real
export const ReelItem = styled.div`
  position: relative;
  height: 85vh;
  width: 100%;
  max-width: 650px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  padding: 0;
  overflow: visible;
  margin: 20vh 0;
  
  @media (max-width: 768px) {
    height: 80vh;
    max-width: 600px;
  }
  
  @media (max-width: 480px) {
    height: 70vh;
    max-width: 75%;

  }
`;

export const ReelVideo = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  max-height: 85vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    pointer-events: none;
  }
  
  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 78vh;
    max-height: 78vh;
    border-radius: 10px;
    
    video {
      object-fit: cover;
    }
  }
  
  @media (max-width: 480px) {
    height: 65vh;
    max-height: 65vh;
    border-radius: 8px;
    width: 100%;
    
    video {
      object-fit: cover;
    }
  }
`;

export const ReelContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 15px;
  color: white;
  z-index: 10;
  max-width: 80%;
  text-align: left;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

export const ReelUser = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ReelAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
  border: 2px solid #ddd;
  object-fit: cover;
`;

export const ReelUsername = styled.span`
  font-weight: 600;
  font-size: 16px;
  margin-right: 12px;
  color: white;
`;

export const ReelFollowButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const ReelDescription = styled.p`
  font-size: 14px;
  margin: 8px 0;
  color: white;
  line-height: 1.4;
`;

export const ReelMusic = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 8px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ReelActions = styled.div`
  position: absolute;
  right: -55px;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  background-color: transparent;
  
  @media (max-width: 992px) {
    right: -50px;
    bottom: 40px;
  }
  
  @media (max-width: 768px) {
    right: -45px;
    bottom: 30px;
  }
  
  @media (max-width: 480px) {
    right: -40px;
    bottom: 20px;
  }
`;

export const ReelAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    color: #262626;
  }
  
  span {
    font-size: 12px;
    color: #262626;
    font-weight: 500;
  }
`;

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%) scale(1.1);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  svg {
    width: 32px;
    height: 32px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    transform: translateX(2px);
  }
`;

export const MuteButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  z-index: 20;
  color: white;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
  }
  
  svg {
    width: 24px;
    height: 24px;
    transform: scale(1.2);
  }
  
  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
  }
  
  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  }
`;