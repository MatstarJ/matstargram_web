import React from 'react';
import { 
  StoriesContainer, 
  StoryItem, 
  StoryAvatar, 
  StoryUsername,
  StoriesWrapper
} from './Stories.styles';

// 임시 데이터
const storiesData = [
  { id: 1, username: 'traveler_kim', avatar: 'https://i.pravatar.cc/56?img=1' },
  { id: 2, username: 'food_lover_park', avatar: 'https://i.pravatar.cc/56?img=2' },
  { id: 3, username: 'fitness_coach_choi', avatar: 'https://i.pravatar.cc/56?img=3' },
  { id: 4, username: 'daily_couple', avatar: 'https://i.pravatar.cc/56?img=4' },
  { id: 5, username: 'pet_mom_seo', avatar: 'https://i.pravatar.cc/56?img=5' },
  { id: 6, username: 'creative_park', avatar: 'https://i.pravatar.cc/56?img=6' },
  { id: 7, username: 'coffee_addict', avatar: 'https://i.pravatar.cc/56?img=7' },
  { id: 8, username: 'seoul_foodie', avatar: 'https://i.pravatar.cc/56?img=8' },
  { id: 9, username: 'tech_geek', avatar: 'https://i.pravatar.cc/56?img=9' },
  { id: 10, username: 'nature_lover', avatar: 'https://i.pravatar.cc/56?img=10' },
  { id: 11, username: 'beauty_guru', avatar: 'https://i.pravatar.cc/56?img=11' },
  { id: 12, username: 'music_festival', avatar: 'https://i.pravatar.cc/56?img=12' },
  { id: 13, username: 'street_fashion', avatar: 'https://i.pravatar.cc/56?img=13' },
  { id: 14, username: 'bookworm_kim', avatar: 'https://i.pravatar.cc/56?img=14' },
];

const Stories: React.FC = () => {
  return (
    <StoriesContainer>
      <StoriesWrapper>
        {storiesData.map((story) => (
          <StoryItem key={story.id}>
            <StoryAvatar>
              <img src={story.avatar} alt={story.username} />
            </StoryAvatar>
            <StoryUsername>{story.username}</StoryUsername>
          </StoryItem>
        ))}
      </StoriesWrapper>
    </StoriesContainer>
  );
};

export default Stories; 