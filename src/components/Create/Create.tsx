import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  CreateContainer,
  CreateHeader,
  CreateContent,
  UploadArea,
  SelectButton,
  PreviewContainer,
  EditContainer,
  MediaPreview,
  EditForm,
  UserInfo,
  CaptionTextarea,
  CharacterCount,
  LocationInput,
  AccessibilitySection,
  ToggleContainer,
  Toggle,
  DragOverlay
} from './Create.styles';

// 현재 사용자 정보 (실제 구현에서는 Context나 Redux 등에서 가져옴)
const currentUser = {
  username: '우주_스타',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
};

enum Step {
  UPLOAD,
  EDIT
}

const Create: React.FC = () => {
  // 현재 단계 상태
  const [step, setStep] = useState<Step>(Step.UPLOAD);
  
  // 미디어 파일 상태
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [isVideo, setIsVideo] = useState<boolean[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
  
  // 게시물 정보 상태
  const [caption, setCaption] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [hideComments, setHideComments] = useState<boolean>(false);
  const [hideEngagement, setHideEngagement] = useState<boolean>(false);
  const [altText, setAltText] = useState<string>('');
  
  // 드래그 앤 드롭 상태
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragCounter = useRef(0);
  
  // 파일 입력 참조
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);

  // 비디오 재생 관련 상태 추가
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      processFiles(newFiles);
    }
  };

  // 파일 처리 함수
  const processFiles = (files: File[]) => {
    const supportedFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    if (supportedFiles.length === 0) {
      alert('이미지 또는 비디오 파일만 업로드할 수 있습니다.');
      return;
    }
    
    // 새로운 파일, 미리보기, 타입 배열 생성
    const newMediaFiles = [...mediaFiles, ...supportedFiles];
    const newIsVideo = [...isVideo, ...supportedFiles.map(file => file.type.startsWith('video/'))];
    
    // 미리보기 URL 생성
    const createPreviews = async () => {
      const newPreviews = await Promise.all(
        supportedFiles.map(file => URL.createObjectURL(file))
      );
      
      setMediaFiles(newMediaFiles);
      setMediaPreviews([...mediaPreviews, ...newPreviews]);
      setIsVideo(newIsVideo);
      
      // 새 이미지가 추가되었다면 마지막 이미지로 인덱스 변경
      if (newPreviews.length > 0) {
        setCurrentMediaIndex(mediaPreviews.length + newPreviews.length - 1);
      }
      
      // 업로드 -> 편집 단계로 전환
      setStep(Step.EDIT);
    };
    
    createPreviews();
  };

  // 개선된 드래그 앤 드롭 핸들러
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    }
  };

  // 컴포넌트 마운트시 drag counter 초기화
  useEffect(() => {
    dragCounter.current = 0;
    
    return () => {
      // 컴포넌트 언마운트시 미리보기 URL 정리
      mediaPreviews.forEach(preview => {
        URL.revokeObjectURL(preview);
      });
    };
  }, []);

  // 업로드 단계로 돌아가기
  const handleBackToUpload = () => {
    // 기존 미리보기 URL 정리
    mediaPreviews.forEach(preview => {
      URL.revokeObjectURL(preview);
    });
    
    setStep(Step.UPLOAD);
    setMediaFiles([]);
    setMediaPreviews([]);
    setIsVideo([]);
    setCurrentMediaIndex(0);
    setCaption('');
    setLocation('');
    setHideComments(false);
    setHideEngagement(false);
    setAltText('');
  };

  // 이미지/비디오 이동 핸들러
  const handlePrevMedia = () => {
    // 현재 동영상이면 현재 시간 저장 및 일시정지
    if (isVideo[currentMediaIndex] && videoRef.current) {
      setVideoProgress(videoRef.current.currentTime);
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setCurrentMediaIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextMedia = () => {
    // 현재 동영상이면 현재 시간 저장 및 일시정지
    if (isVideo[currentMediaIndex] && videoRef.current) {
      setVideoProgress(videoRef.current.currentTime);
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setCurrentMediaIndex(prev => (prev < mediaPreviews.length - 1 ? prev + 1 : prev));
  };

  // 음소거 토글 핸들러
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // 버블링 방지(영상 재생/일시정지 방지)
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // 동영상 클릭 핸들러 추가
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.warn('비디오 재생 오류:', err));
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // 미디어 인덱스가 변경될 때 동영상 자동 재생
  useEffect(() => {
    if (isVideo[currentMediaIndex] && videoRef.current) {
      // 해당 동영상이 로드되었을 때 실행할 함수 정의
      const handleLoadedData = () => {
        // 이전에 저장된 시간이 있으면 해당 시간부터 재생
        if (videoProgress > 0) {
          videoRef.current.currentTime = videoProgress;
        }
      
        // 자동 재생
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(err => console.warn('자동 재생 오류:', err));
        }
      };
      
      // 동영상이 이미 로드되었다면 바로 실행
      if (videoRef.current.readyState >= 2) {
        handleLoadedData();
      } else {
        // 아직 로드되지 않았다면 이벤트 리스너 추가
        videoRef.current.addEventListener('loadeddata', handleLoadedData);
        
        // 클린업 함수
        return () => {
          videoRef.current?.removeEventListener('loadeddata', handleLoadedData);
        };
      }
    }
  }, [currentMediaIndex, isVideo, videoProgress]);

  // 미디어 삭제 핸들러
  const handleDeleteMedia = (index: number) => {
    // 해당 미리보기 URL 정리
    URL.revokeObjectURL(mediaPreviews[index]);
    
    // 배열에서 제거
    const newMediaFiles = [...mediaFiles];
    const newMediaPreviews = [...mediaPreviews];
    const newIsVideo = [...isVideo];
    
    newMediaFiles.splice(index, 1);
    newMediaPreviews.splice(index, 1);
    newIsVideo.splice(index, 1);
    
    setMediaFiles(newMediaFiles);
    setMediaPreviews(newMediaPreviews);
    setIsVideo(newIsVideo);
    
    // 만약 삭제한 미디어가 현재 보고 있는 미디어였다면 인덱스 조정
    if (currentMediaIndex >= newMediaPreviews.length) {
      setCurrentMediaIndex(Math.max(0, newMediaPreviews.length - 1));
    }
    
    // 미디어가 모두 삭제되면 업로드 단계로 돌아감
    if (newMediaPreviews.length === 0) {
      setStep(Step.UPLOAD);
    }
  };

  // 추가 미디어 업로드 핸들러
  const handleAddMoreMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      processFiles(newFiles);
    }
  };

  // 게시물 공유 버튼 클릭 핸들러
  const handleShare = () => {
    // 여기서는 단순히 콘솔에 출력
    console.log('게시물 공유', {
      mediaFiles,
      caption,
      location,
      hideComments,
      hideEngagement,
      altText
    });
    
    // 실제 구현에서는 API 호출
    alert('게시물이 공유되었습니다!');
    
    // 초기화 및 업로드 단계로 돌아가기
    handleBackToUpload();
  };

  // 렌더링 함수
  const renderContent = () => {
    switch (step) {
      case Step.UPLOAD:
        return (
          <UploadArea
            ref={uploadAreaRef}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <svg aria-label="이미지나 동영상과 같은 미디어를 나타내는 아이콘" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96">
              <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
              <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
              <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
            </svg>
            <h3>사진과 동영상을 여기에 끌어다 놓으세요</h3>
            <SelectButton>
              컴퓨터에서 선택
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
              />
            </SelectButton>
            {isDragging && (
              <DragOverlay>
                <svg aria-label="파일 놓기" color="#ffffff" fill="#ffffff" height="48" role="img" viewBox="0 0 24 24" width="48">
                  <path d="M19.5 12c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-6.5 5.5c3.03 0 5.5-2.47 5.5-5.5S16.03 6.5 13 6.5 7.5 8.97 7.5 12s2.47 5.5 5.5 5.5zm0-9.5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-2 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill="currentColor"></path>
                </svg>
                <p>파일을 놓아서 업로드</p>
              </DragOverlay>
            )}
          </UploadArea>
        );
      
      case Step.EDIT:
        return (
          <EditContainer>
            <MediaPreview
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {mediaPreviews.length > 0 && (
                <>
                  {isVideo[currentMediaIndex] ? (
                    <>
                      <video 
                        ref={videoRef}
                        src={mediaPreviews[currentMediaIndex]} 
                        playsInline
                        muted={isMuted}
                        loop
                        onClick={handleVideoClick}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          backgroundColor: 'black',
                          cursor: 'pointer'
                        }}
                      />
                      {/* 재생/일시정지 오버레이 (재생 중이 아닐 때만 표시) */}
                      {!isPlaying && (
                        <div 
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            zIndex: 2
                          }}
                          onClick={handleVideoClick}
                        >
                          <svg fill="white" height="24" width="24" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"></path>
                          </svg>
                        </div>
                      )}
                      
                      {/* 음소거 버튼 */}
                      <div 
                        style={{
                          position: 'absolute',
                          bottom: '15px',
                          right: '15px',
                          background: 'rgba(0, 0, 0, 0.5)',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          zIndex: 3
                        }}
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <svg fill="white" height="24" width="24" viewBox="0 0 24 24">
                            <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3 3v-4.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06a8.996 8.996 0 003.76-1.74l1.49 1.49a.996.996 0 101.41-1.41L5.05 3.63a.996.996 0 00-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"></path>
                          </svg>
                        ) : (
                          <svg fill="white" height="24" width="24" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                          </svg>
                        )}
                      </div>
                    </>
                  ) : (
                    <img 
                      src={mediaPreviews[currentMediaIndex]} 
                      alt="미리보기" 
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'black'
                      }}
                    />
                  )}
                  
                  {/* 캐러셀 버튼 및 인디케이터 */}
                  {mediaPreviews.length > 1 && (
                    <>
                      <button 
                        className="carousel-prev" 
                        onClick={handlePrevMedia}
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(0,0,0,0.3)',
                          color: 'white',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 'none',
                          cursor: 'pointer',
                          opacity: currentMediaIndex > 0 ? 1 : 0.5,
                          pointerEvents: currentMediaIndex > 0 ? 'auto' : 'none',
                          zIndex: 10
                        }}
                      >
                        <svg aria-label="왼쪽 화살표" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16">
                          <polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                        </svg>
                      </button>
                      <button 
                        className="carousel-next" 
                        onClick={handleNextMedia}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(0,0,0,0.3)',
                          color: 'white',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 'none',
                          cursor: 'pointer',
                          opacity: currentMediaIndex < mediaPreviews.length - 1 ? 1 : 0.5,
                          pointerEvents: currentMediaIndex < mediaPreviews.length - 1 ? 'auto' : 'none',
                          zIndex: 10
                        }}
                      >
                        <svg aria-label="오른쪽 화살표" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16">
                          <polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                        </svg>
                      </button>
                      
                      {/* 인디케이터 */}
                      <div 
                        className="carousel-indicator"
                        style={{
                          position: 'absolute',
                          bottom: '15px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          gap: '4px',
                          zIndex: 10
                        }}
                      >
                        {mediaPreviews.map((_, index) => (
                          <div 
                            key={index}
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: index === currentMediaIndex ? '#0095f6' : 'rgba(255,255,255,0.4)',
                              cursor: 'pointer'
                            }}
                            onClick={() => setCurrentMediaIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* 미디어 삭제 버튼 */}
                  <button
                    className="delete-media"
                    onClick={() => handleDeleteMedia(currentMediaIndex)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(0,0,0,0.3)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <svg aria-label="삭제" color="#ffffff" fill="#ffffff" height="12" role="img" viewBox="0 0 24 24" width="12">
                      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" x1="21" x2="3" y1="3" y2="21"></line>
                      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" x1="21" x2="3" y1="21" y2="3"></line>
                    </svg>
                  </button>

                  {/* 더 많은 미디어 추가 버튼을 이미지 영역 하단 오른쪽에 배치 */}
                  <div style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '10px',
                    zIndex: 10
                  }}>
                    <SelectButton style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      padding: 0
                    }}>
                      <svg aria-label="미디어 추가" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16">
                        <path d="M12 2.598c-5.22 0-9.446 4.227-9.446 9.446 0 5.22 4.227 9.446 9.446 9.446 5.22 0 9.446-4.227 9.446-9.446 0-5.22-4.227-9.446-9.446-9.446Zm4.964 10.429h-3.982v3.982h-1.964v-3.982H7.036v-1.964h3.982V7.063h1.964v3.982h3.982v1.964Z" fill="currentColor"></path>
                      </svg>
                      <input
                        type="file"
                        multiple
                        onChange={handleAddMoreMedia}
                        accept="image/*,video/*"
                      />
                    </SelectButton>
                  </div>

                  {/* 드래그 오버레이 - 이미지 영역 내에서 드래그 시 표시 */}
                  {isDragging && (
                    <DragOverlay>
                      <svg aria-label="파일 놓기" color="#ffffff" fill="#ffffff" height="48" role="img" viewBox="0 0 24 24" width="48">
                        <path d="M19.5 12c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-6.5 5.5c3.03 0 5.5-2.47 5.5-5.5S16.03 6.5 13 6.5 7.5 8.97 7.5 12s2.47 5.5 5.5 5.5zm0-9.5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-2 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill="currentColor"></path>
                      </svg>
                      <p>파일을 놓아서 업로드</p>
                    </DragOverlay>
                  )}
                </>
              )}
            </MediaPreview>
            <EditForm>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <UserInfo>
                  <img src={currentUser.avatar} alt={currentUser.username} />
                  <span>{currentUser.username}</span>
                </UserInfo>
                <CaptionTextarea
                  placeholder="문구 입력..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  maxLength={2200}
                  style={{ flex: '1 1 auto' }}
                />
                <CharacterCount>{caption.length}/2,200</CharacterCount>
                
                <div style={{ marginTop: 'auto' }}>
                  <LocationInput
                    placeholder="위치 추가"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  
                  <AccessibilitySection>
                    <h4>고급 설정</h4>
                    
                    <ToggleContainer>
                      <span>댓글 기능 해제</span>
                      <Toggle 
                        isActive={hideComments} 
                        onClick={() => setHideComments(!hideComments)}
                        type="button"
                      />
                    </ToggleContainer>
                    
                    <ToggleContainer style={{ borderBottom: 'none' }}>
                      <span>좋아요 수 숨기기</span>
                      <Toggle 
                        isActive={hideEngagement} 
                        onClick={() => setHideEngagement(!hideEngagement)}
                        type="button"
                      />
                    </ToggleContainer>
                  </AccessibilitySection>
                </div>
              </div>
            </EditForm>
          </EditContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <CreateContainer>
      <CreateHeader>
        {step === Step.EDIT ? (
          <>
            <button className="back-button" onClick={handleBackToUpload}>
              <svg aria-label="뒤로" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line>
                <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
              </svg>
            </button>
            <h2>새 게시물 만들기</h2>
            <button 
              className="next-button" 
              onClick={handleShare}
              disabled={mediaFiles.length === 0}
            >
              공유하기
            </button>
          </>
        ) : (
          <h2>새 게시물 만들기</h2>
        )}
      </CreateHeader>
      <CreateContent>
        {renderContent()}
      </CreateContent>
    </CreateContainer>
  );
};

export default Create; 