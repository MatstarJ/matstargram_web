import React, { useContext } from 'react';
import * as FaIcons from 'react-icons/fa6';
import { 
  ExploreContainer, 
  ExploreGrid, 
  GridItem, 
  GridImage, 
  GridOverlay,
  GridStats,
  GridStat,
  GridVideoIndicator,
  MultiPostIndicator
} from './Explore.styles';
import { PostModalContext } from '../../App';

// 탐색 페이지 게시물 목업 데이터
const exploreItems = Array(30).fill(null).map((_, index) => {
  // 약 20%의 확률로 2x2 아이템으로 설정
  const isLarge = Math.random() < 0.2;
  // 약 30%의 확률로 비디오로 설정
  const isVideo = Math.random() < 0.3;
  // 약 20%의 확률로 여러 게시물로 설정
  const isMultiple = !isVideo && Math.random() < 0.2;
  
  return {
    id: `explore-${index + 1}`,
    imageUrl: `https://picsum.photos/seed/explore${index}/800/800`,
    likes: Math.floor(Math.random() * 10000) + 100,
    comments: Math.floor(Math.random() * 1000) + 10,
    isLarge,
    isVideo,
    isMultiple,
    username: `user${Math.floor(Math.random() * 100)}`,
    avatar: `https://i.pravatar.cc/56?img=${Math.floor(Math.random() * 70)}`,
    description: `인스타그램 탐색 페이지 예시 게시물 #${index + 1}`,
    time: `${Math.floor(Math.random() * 24) + 1}시간 전`
  };
});

const Explore: React.FC = () => {
  const { setSelectedPostId } = useContext(PostModalContext);
  
  // 아이콘 컴포넌트
  const IconHeart = FaIcons.FaHeart as any;
  const IconComment = FaIcons.FaComment as any;
  const IconPlay = FaIcons.FaPlay as any;
  const IconLayerGroup = FaIcons.FaLayerGroup as any;
  
  // 게시물 클릭 핸들러
  const handleItemClick = (item: any) => {
    setSelectedPostId(item.id);
  };
  
  return (
    <ExploreContainer>
      <ExploreGrid>
        {exploreItems.map(item => (
          <GridItem 
            key={item.id} 
            span={item.isLarge}
            onClick={() => handleItemClick(item)}
          >
            <GridImage 
              src={item.imageUrl} 
              alt="탐색 이미지" 
            />
            <GridOverlay className="overlay">
              <GridStats>
                <GridStat>
                  <IconHeart />
                  {item.likes.toLocaleString()}
                </GridStat>
                <GridStat>
                  <IconComment />
                  {item.comments.toLocaleString()}
                </GridStat>
              </GridStats>
            </GridOverlay>
            
            {item.isVideo && (
              <GridVideoIndicator>
                <IconPlay size={20} />
              </GridVideoIndicator>
            )}
            
            {item.isMultiple && (
              <MultiPostIndicator>
                <IconLayerGroup size={20} />
              </MultiPostIndicator>
            )}
          </GridItem>
        ))}
      </ExploreGrid>
    </ExploreContainer>
  );
};

export default Explore; 