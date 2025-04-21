import React, { useContext } from 'react';
import Post from '../Post/Post';
import { FeedContainer, PostsContainer, SidebarContainer } from './Feed.styles';
import Sidebar from '../Sidebar/Sidebar';
import { PostModalContext } from '../../App';

// 목업 데이터
const posts = [
  {
    id: '1',
    username: 'user123',
    avatar: 'https://i.pravatar.cc/56?img=1',
    image: 'https://picsum.photos/600/600?random=1',
    likes: 123,
    description: '인스타그램 클론 프로젝트 진행 중!',
    comments: [
      { username: 'friend1', text: '멋진 프로젝트네요! 👍' },
      { username: 'friend2', text: '어떤 기술 스택을 사용하고 있나요?' }
    ],
    time: '1시간 전'
  },
  {
    id: '2',
    username: 'developer99',
    avatar: 'https://i.pravatar.cc/56?img=2',
    image: 'https://picsum.photos/600/600?random=2',
    likes: 87,
    description: '오늘도 코딩! #리액트 #타입스크립트',
    comments: [
      { username: 'coder123', text: '화이팅! 👨‍💻' },
      { username: 'designer22', text: '디자인이 마음에 듭니다!' },
      { username: 'friend3', text: '좋은 코드 작성하세요!' }
    ],
    time: '3시간 전'
  },
  {
    id: '3',
    username: 'traveller_kim',
    avatar: 'https://i.pravatar.cc/56?img=3',
    image: 'https://picsum.photos/600/600?random=3',
    likes: 240,
    description: '아름다운 제주도 여행! #제주 #여행 #추억',
    comments: [
      { username: 'jeju_lover', text: '제주도 어디인가요? 정말 예쁘네요!' },
      { username: 'photo_master', text: '사진 너무 잘 나왔어요! 📸' }
    ],
    time: '8시간 전'
  }
];

const Feed: React.FC = () => {
  const { setSelectedPostId } = useContext(PostModalContext);
  
  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
  };
  
  return (
    <FeedContainer>
      <PostsContainer>
        {posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            avatar={post.avatar}
            image={post.image}
            likes={post.likes}
            description={post.description}
            comments={post.comments}
            time={post.time}
            onPostClick={handlePostClick}
          />
        ))}
      </PostsContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </FeedContainer>
  );
};

export default Feed; 