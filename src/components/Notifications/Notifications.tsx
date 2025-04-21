import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  NotificationsContainer,
  NotificationsHeader,
  NotificationsContent,
  NotificationTabs,
  NotificationTab,
  NotificationItem,
  NotificationAvatar,
  NotificationContent,
  NotificationText,
  NotificationTime,
  NotificationPreview,
  EmptyNotification
} from './Notifications.styles';
import { NotificationsContext } from '../../App';
import styled from 'styled-components';

// 모의 알림 데이터
const NOTIFICATIONS_DATA = [
  {
    id: 1,
    type: 'like',
    user: { id: 1, username: 'user1', avatar: 'https://i.pravatar.cc/150?img=1' },
    postImage: 'https://picsum.photos/id/1/200/200',
    time: '방금 전',
    unread: true
  },
  {
    id: 2,
    type: 'follow',
    user: { id: 2, username: 'travel_lover', avatar: 'https://i.pravatar.cc/150?img=2' },
    time: '1시간 전',
    unread: true
  },
  {
    id: 3,
    type: 'comment',
    user: { id: 3, username: 'photo_master', avatar: 'https://i.pravatar.cc/150?img=3' },
    postImage: 'https://picsum.photos/id/3/200/200',
    comment: '정말 멋진 사진이에요!',
    time: '3시간 전',
    unread: false
  },
  {
    id: 4,
    type: 'mention',
    user: { id: 4, username: 'nature_vibes', avatar: 'https://i.pravatar.cc/150?img=4' },
    postImage: 'https://picsum.photos/id/4/200/200',
    comment: '여기 같이 가보자! @my_username',
    time: '5시간 전',
    unread: false
  },
  {
    id: 5,
    type: 'like',
    user: { id: 5, username: 'creative_soul', avatar: 'https://i.pravatar.cc/150?img=5' },
    postImage: 'https://picsum.photos/id/5/200/200',
    time: '8시간 전',
    unread: false
  },
  {
    id: 6,
    type: 'follow',
    user: { id: 6, username: 'daily_adventure', avatar: 'https://i.pravatar.cc/150?img=6' },
    time: '1일 전',
    unread: false
  },
  {
    id: 7,
    type: 'like',
    user: { id: 7, username: 'urban_explorer', avatar: 'https://i.pravatar.cc/150?img=7' },
    postImage: 'https://picsum.photos/id/7/200/200',
    time: '1일 전',
    unread: false
  },
  {
    id: 8,
    type: 'comment',
    user: { id: 8, username: 'moment_capturer', avatar: 'https://i.pravatar.cc/150?img=8' },
    postImage: 'https://picsum.photos/id/8/200/200',
    comment: '어디서 찍은 사진인가요?',
    time: '2일 전',
    unread: false
  }
];

interface NotificationsProps {
  onClose: () => void;
}

// 애니메이션을 적용한 알림 컨테이너
const AnimatedNotificationsContainer = styled(NotificationsContainer)<{ isClosing: boolean }>`
  transform: ${props => props.isClosing ? 'translateX(100%)' : 'translateX(0)'};
  opacity: ${props => props.isClosing ? 0 : 1};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  will-change: transform, opacity;
  position: fixed;
  left: 244px;
  top: 0;
  width: 397px;
  height: 100vh;
  background-color: white;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  z-index: 150;
  
  @media (max-width: 1264px) {
    left: 72px;
  }
  
  @media (max-width: 768px) {
    left: 0;
    width: 100%;
    border-right: none;
  }
`;

const Notifications: React.FC<NotificationsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const { isNotificationsOpen } = useContext(NotificationsContext);
  const [isClosing, setIsClosing] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // 알림창이 열릴 때 상태 초기화
  useEffect(() => {
    if (isNotificationsOpen) {
      setIsClosing(false);
    }
  }, [isNotificationsOpen]);

  // 바깥영역 클릭 시 알림창 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        handleCloseWithAnimation();
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen, onClose]);

  // ESC 키 누르면 알림창 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isNotificationsOpen) {
        handleCloseWithAnimation();
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isNotificationsOpen, onClose]);

  // 알림 읽기 처리
  const handleReadNotification = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, unread: false } : notification
      )
    );
  };

  // 닫기 애니메이션 적용 후 실제 닫기 실행
  const handleCloseWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500); // 애니메이션 지속 시간과 일치시킴
  };

  // 필터링된 알림 목록
  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(notification => notification.unread)
    : notifications;

  // 알림 내용에 따른 텍스트 생성
  const getNotificationText = (notification: any) => {
    switch(notification.type) {
      case 'like':
        return <><strong>{notification.user.username}</strong>님이 회원님의 게시물을 좋아합니다.</>;
      case 'follow':
        return <><strong>{notification.user.username}</strong>님이 회원님을 팔로우하기 시작했습니다.</>;
      case 'comment':
        return <><strong>{notification.user.username}</strong>님이 댓글을 남겼습니다: {notification.comment}</>;
      case 'mention':
        return <><strong>{notification.user.username}</strong>님이 회원님을 언급했습니다: {notification.comment}</>;
      default:
        return <><strong>{notification.user.username}</strong>님이 활동했습니다.</>;
    }
  };

  if (!isNotificationsOpen) return null;

  return (
    <AnimatedNotificationsContainer 
      ref={notificationsRef}
      isClosing={isClosing}
      onClick={(e) => e.stopPropagation()}
    >
      <NotificationsHeader>
        <h4>알림</h4>
      </NotificationsHeader>
      
      <NotificationTabs>
        <NotificationTab 
          active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          모두
        </NotificationTab>
        <NotificationTab 
          active={activeTab === 'unread'} 
          onClick={() => setActiveTab('unread')}
        >
          읽지 않음
        </NotificationTab>
      </NotificationTabs>
      
      <NotificationsContent>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <NotificationItem 
              key={notification.id} 
              unread={notification.unread}
              onClick={() => handleReadNotification(notification.id)}
            >
              <NotificationAvatar>
                <img src={notification.user.avatar} alt={notification.user.username} />
              </NotificationAvatar>
              <NotificationContent>
                <NotificationText>
                  {getNotificationText(notification)}
                </NotificationText>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationContent>
              {notification.postImage && (
                <NotificationPreview>
                  <img src={notification.postImage} alt="게시물 미리보기" />
                </NotificationPreview>
              )}
            </NotificationItem>
          ))
        ) :
          <EmptyNotification>
            <svg aria-label="알림 없음" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <h3>알림 없음</h3>
            <p>{activeTab === 'all' ? '아직 알림이 없습니다.' : '읽지 않은 알림이 없습니다.'}</p>
          </EmptyNotification>
        }
      </NotificationsContent>
    </AnimatedNotificationsContainer>
  );
};

export default Notifications; 