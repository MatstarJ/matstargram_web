import styled from 'styled-components';

export const ExploreContainer = styled.div`
  max-width: 935px;
  margin: 0 auto;
  padding: 20px 0;
`;

export const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

interface GridItemProps {
  span?: boolean;
}

export const GridItem = styled.div<GridItemProps>`
  position: relative;
  cursor: pointer;
  aspect-ratio: 1/1;
  overflow: hidden;
  grid-column: span ${props => props.span ? 2 : 1};
  grid-row: span ${props => props.span ? 2 : 1};
  
  &:hover .overlay {
    opacity: 1;
  }
`;

export const GridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const GridStats = styled.div`
  display: flex;
  gap: 20px;
`;

export const GridStat = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: white;
  font-weight: 600;
`;

// 비디오 아이템 인디케이터
export const GridVideoIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  z-index: 1;
`;

// 여러 게시물 인디케이터
export const MultiPostIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  z-index: 1;
`; 