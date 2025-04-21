import React, { useState, useRef, useEffect } from 'react';
import {
  ReelsContainer,
  ReelsScrollContainer,
  ReelItem,
  ReelVideo,
  ReelContent,
  ReelUser,
  ReelAvatar,
  ReelUsername,
  ReelFollowButton,
  ReelDescription,
  ReelMusic,
  ReelActions,
  ReelAction,
  PlayButton,
  MuteButton
} from './Reels.styles';

// 더미 데이터 생성
const reelsData = [
  {
    id: '1',
    videoUrl: 'https://videos.pexels.com/video-files/8019917/8019917-uhd_1440_2560_25fps.mp4',
    username: 'user_123',
    avatar: 'https://i.pravatar.cc/56?img=1',
    description: '아름다운 자연 풍경 🌱',
    likes: 1245,
    comments: 89,
    isFollowing: false,
    music: '오리지널 사운드 - user_123'
  },
  {
    id: '2',
    videoUrl: 'https://videos.pexels.com/video-files/30946903/13232230_1080_1920_60fps.mp4',
    username: 'travel_lover',
    avatar: 'https://i.pravatar.cc/56?img=5',
    description: '여행 중 찍은 아름다운 순간 ✈️ #여행 #adventure',
    likes: 2756,
    comments: 152,
    isFollowing: true,
    music: 'Beautiful Day - Various Artists'
  },
  {
    id: '3',
    videoUrl: 'https://videos.pexels.com/video-files/31201717/13328048_1440_2558_30fps.mp4',
    username: 'photo_master',
    avatar: 'https://i.pravatar.cc/56?img=15',
    description: '도시의 불빛 🌃 #night #cityscape #urban',
    likes: 988,
    comments: 67,
    isFollowing: false,
    music: 'City Nights - Urban Sounds'
  },
  {
    id: '4',
    videoUrl: 'https://videos.pexels.com/video-files/30707440/13138369_1440_2562_60fps.mp4',
    username: 'nature_vibes',
    avatar: 'https://i.pravatar.cc/56?img=22',
    description: '자연 속 평화로운 순간 🌿',
    likes: 3421,
    comments: 201,
    isFollowing: true,
    music: 'Nature Sounds - Peaceful Moments'
  },
  {
    id: '5',
    videoUrl: 'https://videos.pexels.com/video-files/30985846/13246017_1440_2560_60fps.mp4',
    username: 'creative_soul',
    avatar: 'https://i.pravatar.cc/56?img=33',
    description: '일상에서 발견한 예술 🎨 #creative #daily',
    likes: 1567,
    comments: 98,
    isFollowing: false,
    music: 'Artistic Vibes - Creative Minds'
  },
  {
    id: '6',
    videoUrl: 'https://videos.pexels.com/video-files/31243700/13344127_1440_2560_24fps.mp4',
    username: 'daily_adventure',
    avatar: 'https://i.pravatar.cc/56?img=45',
    description: '매일이 모험 💫 #adventure #lifestyle',
    likes: 2045,
    comments: 132,
    isFollowing: true,
    music: 'Adventure Awaits - Popular Hits'
  },
  {
    id: '7',
    videoUrl: 'https://videos.pexels.com/video-files/30825911/13183348_1080_1920_30fps.mp4',
    username: 'urban_explorer',
    avatar: 'https://i.pravatar.cc/56?img=55',
    description: '도시 탐험 🏙️ #urban #city #exploration',
    likes: 1876,
    comments: 110,
    isFollowing: false,
    music: 'Urban Beats - City Explorers'
  },
  {
    id: '8',
    videoUrl: 'https://videos.pexels.com/video-files/30851527/13193570_1440_2560_25fps.mp4',
    username: 'moment_capturer',
    avatar: 'https://i.pravatar.cc/56?img=60',
    description: '특별한 순간을 담다 ✨ #moment #capture',
    likes: 2543,
    comments: 167,
    isFollowing: true,
    music: 'Beautiful Moments - Life Soundtrack'
  },
  {
    id: '9',
    videoUrl: 'https://videos.pexels.com/video-files/31219121/13334687_1440_2560_30fps.mp4',
    username: 'lifestyle_guru',
    avatar: 'https://i.pravatar.cc/56?img=70',
    description: '라이프스타일의 작은 팁 💡 #lifestyle #tips',
    likes: 3210,
    comments: 189,
    isFollowing: false,
    music: 'Lifestyle Remix - Trending Hits'
  }
];

const Reels: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [likes, setLikes] = useState<{[key: string]: boolean}>({});
  const [isPlaying, setIsPlaying] = useState<{[key: string]: boolean}>({});
  const [videoLoading, setVideoLoading] = useState<{[key: string]: boolean}>({});
  const [videoErrors, setVideoErrors] = useState<{[key: string]: boolean}>({});
  const [isMuted, setIsMuted] = useState<{ [key: string]: boolean }>({});
  const [retryCount, setRetryCount] = useState<{[key: string]: number}>({});
  
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 비디오 로드 완료 핸들러
  const handleVideoLoaded = (reelId: string) => {
    setVideoLoading(prev => ({ ...prev, [reelId]: false }));
    setVideoErrors(prev => ({ ...prev, [reelId]: false }));
    setRetryCount(prev => ({ ...prev, [reelId]: 0 }));
  };
  
  // 비디오 에러 핸들러
  const handleVideoError = (reelId: string) => {
    console.error(`비디오 로딩 실패: ${reelId}`);
    
    // 최대 3번까지 재시도
    const currentRetries = retryCount[reelId] || 0;
    if (currentRetries < 3) {
      // 재시도 횟수 증가
      setRetryCount(prev => ({ ...prev, [reelId]: currentRetries + 1 }));
      
      // 1초 후 다시 로드 시도
      setTimeout(() => {
        const video = videoRefs.current[reelId];
        if (video) {
          setVideoLoading(prev => ({ ...prev, [reelId]: true }));
          video.load();
        }
      }, 1000);
    } else {
      // 3번 이상 실패하면 에러 표시
      setVideoLoading(prev => ({ ...prev, [reelId]: false }));
      setVideoErrors(prev => ({ ...prev, [reelId]: true }));
    }
  };
  
  // 비디오 교차점 관찰자 설정
  useEffect(() => {
    // 비디오 시작 시 로딩 상태 설정
    setVideoLoading(
      reelsData.reduce((acc, _, index) => {
        acc[`reel-${index + 1}`] = true;
        return acc;
      }, {} as Record<string, boolean>)
    );
  
    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.6
    };

    const playPromises = new Map();
    let lastVisibleReelId: string | null = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const reelId = entry.target.id;
        
        // 변경이 일어난 후 약간의 지연을 주어 빠른 스크롤에서의 충돌 방지
        setTimeout(() => {
          if (entry.isIntersecting) {
            const videoIndex = parseInt(reelId.split('-')[1]) - 1;
            setActiveIndex(videoIndex);
            lastVisibleReelId = reelId;
            
            // 이전에 일시정지된 경우에만 재생 시도
            if (videoRefs.current[reelId]?.paused && !videoErrors[reelId]) {
              setVideoLoading(prev => ({ ...prev, [reelId]: true }));
              
              // 이전 재생 Promise가 있으면 완료될 때까지 기다림
              if (!playPromises.has(reelId) || playPromises.get(reelId) === null) {
                const promise = videoRefs.current[reelId]?.play().catch(err => {
                  console.warn('비디오 재생 오류:', err);
                  setVideoLoading(prev => ({ ...prev, [reelId]: false }));
                  return null;
                });
                
                playPromises.set(reelId, promise);
                
                // Promise 완료 후 Map에서 제거
                if (promise) {
                  promise.then(() => {
                    setIsPlaying(prev => ({ ...prev, [reelId]: true }));
                    playPromises.set(reelId, null);
                    setVideoLoading(prev => ({ ...prev, [reelId]: false }));
                  });
                }
              }
            }
          } else {
            // 현재 보이는 비디오가 있고, 이 비디오가 현재 보이는 비디오가 아닌 경우에만 일시정지
            if (videoRefs.current[reelId] && lastVisibleReelId !== reelId) {
              const currentPromise = playPromises.get(reelId);
              
              // 이전 재생 Promise가 완료되었는지 확인
              if (currentPromise) {
                currentPromise.then(() => {
                  if (videoRefs.current[reelId] && lastVisibleReelId !== reelId) {
                    videoRefs.current[reelId]?.pause();
                    setIsPlaying(prev => ({ ...prev, [reelId]: false }));
                  }
                }).catch(() => {
                  // 에러 발생 시 처리
                  setIsPlaying(prev => ({ ...prev, [reelId]: false }));
                });
              } else {
                videoRefs.current[reelId]?.pause();
                setIsPlaying(prev => ({ ...prev, [reelId]: false }));
              }
            }
          }
        }, 50); // 50ms 지연
      });
    }, options);

    // Observer 설정 후 약간 지연시켜 등록
    setTimeout(() => {
      Object.keys(videoRefs.current).forEach(reelId => {
        const videoElement = document.getElementById(reelId);
        if (videoElement) {
          observer.observe(videoElement);
        }
      });
    }, 100);

    // 첫 번째 비디오 자동 재생 - 약간 지연
    setTimeout(() => {
      const firstReelId = `reel-1`;
      if (videoRefs.current[firstReelId] && !videoErrors[firstReelId]) {
        lastVisibleReelId = firstReelId;
        const promise = videoRefs.current[firstReelId]?.play().catch(err => {
          console.warn('첫 번째 비디오 재생 오류:', err);
          setVideoLoading(prev => ({ ...prev, [firstReelId]: false }));
          return null;
        });
        
        if (promise) {
          promise.then(() => {
            setIsPlaying(prev => ({ ...prev, [firstReelId]: true }));
            setVideoLoading(prev => ({ ...prev, [firstReelId]: false }));
          });
        }
      }
    }, 200);

    return () => {
      observer.disconnect();
    };
  }, [videoErrors]); // videoErrors가 변경되면 다시 실행

  // 좋아요 토글 핸들러
  const toggleLike = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  // 비디오 클릭 핸들러 (재생/일시정지)
  const handleVideoClick = (reelId: string) => {
    if (videoRefs.current[reelId]) {
      if (videoRefs.current[reelId]?.paused) {
        videoRefs.current[reelId]?.play()
          .then(() => {
            setIsPlaying(prev => ({ ...prev, [reelId]: true }));
          })
          .catch(err => {
            console.warn('클릭 재생 오류:', err);
            setIsPlaying(prev => ({ ...prev, [reelId]: false }));
          });
      } else {
        videoRefs.current[reelId]?.pause();
        setIsPlaying(prev => ({ ...prev, [reelId]: false }));
      }
    }
  };

  // 비디오 참조 설정
  const setVideoRef = (reelId: string, element: HTMLVideoElement) => {
    videoRefs.current[reelId] = element;
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();
    
    // 현재 보이는 비디오 찾기
    const videoElements = container.querySelectorAll('video');
    
    videoElements.forEach((video) => {
      const videoRect = video.getBoundingClientRect();
      const reelId = video.parentElement?.parentElement?.id || '';
      const isVisible = (
        videoRect.top >= containerRect.top &&
        videoRect.bottom <= containerRect.bottom
      );
      
      if (isVisible) {
        video.play().then(() => {
          // 재생이 시작되면 isPlaying 상태 업데이트
          setIsPlaying(prev => ({ ...prev, [reelId]: true }));
        }).catch(() => {
          // 자동 재생이 차단된 경우
          video.muted = true;
          video.play().then(() => {
            setIsPlaying(prev => ({ ...prev, [reelId]: true }));
          }).catch(console.error);
        });
      } else {
        // 보이지 않는 비디오는 일시정지하지만 isPlaying 상태는 변경하지 않음
        video.pause();
        // isPlaying 상태는 유지하여 재생 버튼이 표시되지 않도록 함
        // setIsPlaying(prev => ({ ...prev, [reelId]: false }));
      }
    });
  };

  const handleMute = (reelId: string) => {
    const video = videoRefs.current[reelId];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(prev => ({
        ...prev,
        [reelId]: video.muted
      }));
    }
  };

  // 에러 발생한 비디오 다시 시도 핸들러
  const handleRetryVideo = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoErrors(prev => ({ ...prev, [reelId]: false }));
    setVideoLoading(prev => ({ ...prev, [reelId]: true }));
    setRetryCount(prev => ({ ...prev, [reelId]: 0 }));
    
    const video = videoRefs.current[reelId];
    if (video) {
      video.load();
      video.play().then(() => {
        setIsPlaying(prev => ({ ...prev, [reelId]: true }));
        setVideoLoading(prev => ({ ...prev, [reelId]: false }));
      }).catch(err => {
        console.warn('다시 시도 중 오류:', err);
        handleVideoError(reelId);
      });
    }
  };

  return (
    <ReelsContainer>
      <ReelsScrollContainer ref={containerRef} onScroll={handleScroll}>
        {reelsData.map((reel, index) => (
          <ReelItem key={reel.id} id={`reel-${index + 1}`}>
            <ReelVideo onClick={() => handleVideoClick(`reel-${index + 1}`)}>
              <video
                ref={(el) => setVideoRef(`reel-${index + 1}`, el as HTMLVideoElement)}
                src={reel.videoUrl}
                loop
                muted={isMuted[`reel-${index + 1}`]}
                playsInline
                preload="auto"
                onLoadedData={() => handleVideoLoaded(`reel-${index + 1}`)}
                onError={() => handleVideoError(`reel-${index + 1}`)}
              />
              
              <MuteButton onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleMute(`reel-${index + 1}`);
              }}>
                {isMuted[`reel-${index + 1}`] ? (
                  <svg aria-label="음소거 해제" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2" x2="22" y1="2" y2="22"></line>
                  </svg>
                ) : (
                  <svg aria-label="음소거" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                  </svg>
                )}
              </MuteButton>
              
              {!isPlaying[`reel-${index + 1}`] && !videoLoading[`reel-${index + 1}`] && !videoErrors[`reel-${index + 1}`] && (
                <PlayButton>
                  <svg aria-label="재생" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </PlayButton>
              )}
              
              {videoLoading[`reel-${index + 1}`] && !isPlaying[`reel-${index + 1}`] && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '8px',
                  padding: '10px 15px',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  동영상 로딩 중...
                </div>
              )}
              
              {videoErrors[`reel-${index + 1}`] && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '8px',
                  padding: '15px 20px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <div style={{ marginBottom: '10px', fontSize: '16px' }}>동영상을 불러올 수 없습니다</div>
                  <div style={{ fontSize: '14px', marginBottom: '15px' }}>네트워크 연결을 확인해주세요</div>
                  <button 
                    onClick={(e) => handleRetryVideo(`reel-${index + 1}`, e)}
                    style={{
                      background: 'white',
                      color: 'black',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    다시 시도
                  </button>
                </div>
              )}
            </ReelVideo>
            
            <ReelContent>
              <ReelUser>
                <ReelAvatar src={reel.avatar} alt={reel.username} />
                <div>
                  <ReelUsername>{reel.username}</ReelUsername>
                  {!reel.isFollowing && (
                    <ReelFollowButton>팔로우</ReelFollowButton>
                  )}
                </div>
              </ReelUser>
              <ReelDescription>{reel.description}</ReelDescription>
              <ReelMusic>
                <span style={{ marginRight: '8px' }}>🎵</span> {reel.music}
              </ReelMusic>
            </ReelContent>
            
            <ReelActions>
              <ReelAction onClick={(e) => toggleLike(`reel-${index + 1}`, e)}>
                {likes[`reel-${index + 1}`] ? (
                  <svg aria-label="좋아요 취소" fill="#ed4956" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                ) : (
                  <svg aria-label="좋아요" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                )}
                <span>{reel.likes.toLocaleString()}</span>
              </ReelAction>
              
              <ReelAction>
                <svg aria-label="댓글 달기" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                <span>{reel.comments.toLocaleString()}</span>
              </ReelAction>
              
              <ReelAction>
                <svg aria-label="공유" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                  <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                </svg>
                <span>보내기</span>
              </ReelAction>
              
              <ReelAction>
                <svg aria-label="저장" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                </svg>
                <span>저장</span>
              </ReelAction>
              
              <ReelAction>
                <svg aria-label="옵션 더 보기" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
              </ReelAction>
            </ReelActions>
          </ReelItem>
        ))}
      </ReelsScrollContainer>
    </ReelsContainer>
  );
};

export default Reels; 