import React, { useState, useRef, useEffect } from 'react';
import {
  MessagesContainer,
  ConversationList,
  ConversationHeader,
  SearchInput,
  ConversationItems,
  ConversationItem,
  Avatar,
  ConversationInfo,
  ConversationMeta,
  EmptyConversation,
  ChatContainer,
  ChatHeader,
  ChatMessages,
  MessageGroup,
  Message,
  ChatInputContainer,
  NewMessageModal,
  NewMessageContainer,
  NewMessageHeader,
  NewMessageContent,
  RecipientInput,
  SelectedRecipients,
  SuggestedUsers,
  UserItem
} from './Messages.styles';

// 가상의 대화 데이터
const conversations = [
  {
    id: '1',
    username: '우주소녀',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    lastMessage: '안녕하세요! 오늘 어떻게 지내세요?',
    time: '1시간 전',
    unread: 2,
    online: true
  },
  {
    id: '2',
    username: '별빛소녀',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    lastMessage: '사진 잘 보았어요. 정말 좋네요!',
    time: '3시간 전',
    unread: 0,
    online: true
  },
  {
    id: '3',
    username: '은하수',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    lastMessage: '다음 주에 만나서 이야기해요.',
    time: '어제',
    unread: 0,
    online: false
  },
  {
    id: '4',
    username: '밤하늘',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    lastMessage: '프로젝트 진행 상황이 어떻게 되나요?',
    time: '어제',
    unread: 1,
    online: false
  },
  {
    id: '5',
    username: '태양계',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: '내일 회의 시간 알려주세요.',
    time: '2일 전',
    unread: 0,
    online: false
  }
];

// 특정 대화의 메시지 데이터
const messages = [
  {
    id: '1',
    sender: '1',
    text: '안녕하세요! 오늘 어떻게 지내세요?',
    time: '오후 2:30',
    date: '오늘'
  },
  {
    id: '2',
    sender: 'me',
    text: '안녕하세요! 잘 지내고 있어요. 새로운 프로젝트 시작했어요.',
    time: '오후 2:35',
    date: '오늘'
  },
  {
    id: '3',
    sender: '1',
    text: '오, 정말요? 어떤 프로젝트인가요?',
    time: '오후 2:36',
    date: '오늘'
  },
  {
    id: '4',
    sender: 'me',
    text: '인스타그램 클론 프로젝트예요. 리액트와 타입스크립트로 만들고 있어요.',
    time: '오후 2:38',
    date: '오늘'
  },
  {
    id: '5',
    sender: '1',
    text: '멋지네요! 완성되면 꼭 보여주세요.',
    time: '오후 2:40',
    date: '오늘'
  },
  {
    id: '6',
    sender: 'me',
    text: '네, 물론이죠! 😊',
    time: '오후 2:41',
    date: '오늘'
  },
  {
    id: '7',
    sender: '1',
    text: '기대할게요!',
    time: '오후 2:42',
    date: '오늘'
  }
];

// 추천 사용자 데이터
const suggestedUsers = [
  {
    id: '101',
    username: '별빛여행자',
    name: '별빛 여행하는 여자',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
  },
  {
    id: '102',
    username: '우주탐험가',
    name: '우주 탐험을 좋아하는 사람',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
  },
  {
    id: '103',
    username: '행성수집가',
    name: '행성 사진을 모으는 취미',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
  },
  {
    id: '104',
    username: '천체사진사',
    name: '천체 사진 전문가',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
  },
  {
    id: '105',
    username: '은하소녀',
    name: '은하계를 그리는 소녀',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg'
  },
  {
    id: '106',
    username: '블랙홀탐험가',
    name: '블랙홀 이론 연구자',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
  },
  {
    id: '107',
    username: '별자리연구소',
    name: '별자리 연구 동아리',
    avatar: 'https://randomuser.me/api/portraits/women/16.jpg'
  },
  {
    id: '108',
    username: '밤하늘별',
    name: '밤하늘의 별을 좋아하는 사람',
    avatar: 'https://randomuser.me/api/portraits/men/17.jpg'
  }
];

const Messages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(conversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 새 메시지 모달 관련 상태
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [searchRecipient, setSearchRecipient] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<typeof suggestedUsers[0][]>([]);
  const [filteredUsers, setFilteredUsers] = useState(suggestedUsers);

  // 검색어에 따라 대화 필터링
  useEffect(() => {
    if (searchTerm) {
      const filtered = conversations.filter(
        conversation => conversation.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchTerm]);

  // 수신자 검색어에 따라 추천 사용자 필터링
  useEffect(() => {
    if (searchRecipient) {
      const filtered = suggestedUsers.filter(
        user => 
          user.username.toLowerCase().includes(searchRecipient.toLowerCase()) ||
          user.name.toLowerCase().includes(searchRecipient.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(suggestedUsers);
    }
  }, [searchRecipient]);

  // 메시지 목록이 업데이트되면 스크롤을 맨 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (messageText.trim()) {
      // 실제 구현에서는 여기서 메시지를 서버로 전송
      console.log('메시지 전송:', messageText);
      setMessageText('');
    }
  };

  // 엔터키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 모바일에서 대화 목록으로 돌아가기
  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  // 새 메시지 모달 열기
  const handleOpenNewMessageModal = () => {
    setIsNewMessageModalOpen(true);
  };

  // 새 메시지 모달 닫기
  const handleCloseNewMessageModal = () => {
    setIsNewMessageModalOpen(false);
    setSearchRecipient('');
    setSelectedRecipients([]);
  };

  // 사용자 선택/선택 취소 토글
  const toggleUserSelection = (user: typeof suggestedUsers[0]) => {
    if (isUserSelected(user.id)) {
      setSelectedRecipients(selectedRecipients.filter(r => r.id !== user.id));
    } else {
      setSelectedRecipients([...selectedRecipients, user]);
    }
  };

  // 선택한 사용자 제거
  const removeSelectedUser = (userId: string) => {
    setSelectedRecipients(selectedRecipients.filter(r => r.id !== userId));
  };

  // 사용자가 선택되었는지 확인
  const isUserSelected = (userId: string) => {
    return selectedRecipients.some(r => r.id === userId);
  };

  // 다음 단계로 진행
  const handleNext = () => {
    if (selectedRecipients.length > 0) {
      // 새 대화 시작 로직 구현
      console.log('선택된 수신자:', selectedRecipients);
      handleCloseNewMessageModal();
      
      // 첫 번째 선택된 사용자와의 대화를 시작 (예시)
      const firstRecipient = selectedRecipients[0];
      
      // 실제 구현에서는 새 대화를 생성하고 DB에 저장하는 로직이 필요
      // 여기서는 간단히 UI만 업데이트
      setSelectedConversation(firstRecipient.id);
    }
  };

  return (
    <MessagesContainer>
      <ConversationList isConversationSelected={!!selectedConversation}>
        <ConversationHeader>
          <h2>메시지</h2>
          <button onClick={handleOpenNewMessageModal}>
            <svg aria-label="새로운 메시지" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
              <path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line>
            </svg>
          </button>
        </ConversationHeader>
        <SearchInput>
          <svg aria-label="검색" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
            <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
          </svg>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        <ConversationItems>
          {filteredConversations.map(conversation => (
            <ConversationItem
              key={conversation.id}
              isActive={selectedConversation === conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <Avatar className={conversation.online ? 'online' : ''}>
                <img src={conversation.avatar} alt={conversation.username} />
              </Avatar>
              <ConversationInfo>
                <div className="username">{conversation.username}</div>
                <div className="message-preview">{conversation.lastMessage}</div>
              </ConversationInfo>
              <ConversationMeta>
                <div className="time">{conversation.time}</div>
                {conversation.unread > 0 && (
                  <div className="unread-count">{conversation.unread}</div>
                )}
              </ConversationMeta>
            </ConversationItem>
          ))}
        </ConversationItems>
      </ConversationList>

      <ChatContainer isConversationSelected={!!selectedConversation}>
        {selectedConversation ? (
          <>
            <ChatHeader>
              <button className="back-button" onClick={handleBackToList}>
                <svg aria-label="뒤로" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line>
                  <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                </svg>
              </button>
              <div className="user-info">
                <Avatar className={conversations.find(c => c.id === selectedConversation)?.online ? 'online' : ''}>
                  <img
                    src={conversations.find(c => c.id === selectedConversation)?.avatar}
                    alt={conversations.find(c => c.id === selectedConversation)?.username}
                  />
                </Avatar>
                <span className="username">{conversations.find(c => c.id === selectedConversation)?.username}</span>
              </div>
              <div className="actions">
                <button>
                  <svg aria-label="전화 걸기" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path>
                  </svg>
                </button>
                <button>
                  <svg aria-label="화상 통화" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <rect fill="none" height="18" rx="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="16.999" x="1" y="3"></rect>
                    <path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </button>
                <button>
                  <svg aria-label="대화 정보" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                    <circle cx="11.819" cy="7.709" r="1.25"></circle>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line>
                    <polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                  </svg>
                </button>
              </div>
            </ChatHeader>
            <ChatMessages>
              <MessageGroup>
                <div className="day-divider">
                  <span>오늘</span>
                </div>
                {messages.map(message => (
                  <Message key={message.id} isMine={message.sender === 'me'}>
                    {message.sender !== 'me' && (
                      <div className="avatar">
                        <img
                          src={conversations.find(c => c.id === message.sender)?.avatar}
                          alt={conversations.find(c => c.id === message.sender)?.username}
                        />
                      </div>
                    )}
                    <div className="message-bubble">
                      {message.text}
                    </div>
                    <div className="message-meta">{message.time}</div>
                  </Message>
                ))}
                <div ref={messagesEndRef} />
              </MessageGroup>
            </ChatMessages>
            <ChatInputContainer>
              <button className="emoji-button">
                <svg aria-label="이모티콘" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                </svg>
              </button>
              <div className="input-wrapper">
                <textarea
                  placeholder="메시지 입력..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="actions">
                {messageText.trim() ? (
                  <button className="send-button" onClick={handleSendMessage}>
                    보내기
                  </button>
                ) : (
                  <>
                    <button>
                      <svg aria-label="사진 또는 동영상 추가" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path>
                        <path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                        <path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </button>
                    <button>
                      <svg aria-label="음성 메시지 녹음" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <path d="M19.5 10.671v.17c0 4.4-3.204 8.482-7.5 9.159-4.296-.677-7.5-4.759-7.5-9.159v-.17" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        <circle cx="12" cy="7" fill="none" r="4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </ChatInputContainer>
          </>
        ) : (
          <EmptyConversation isConversationSelected={!!selectedConversation}>
            <svg aria-label="Direct" color="#262626" fill="#262626" height="96" role="img" viewBox="0 0 96 96" width="96">
              <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
              <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="69.286" x2="41.447" y1="33.21" y2="48.804"></line>
              <polygon fill="none" points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
            </svg>
            <h2>내 메시지</h2>
            <p>친구나 그룹에 비공개 사진과 메시지를 보내보세요.</p>
            <button onClick={handleOpenNewMessageModal}>메시지 보내기</button>
          </EmptyConversation>
        )}
      </ChatContainer>

      {/* 새 메시지 작성 모달 */}
      {isNewMessageModalOpen && (
        <NewMessageModal onClick={(e) => e.target === e.currentTarget && handleCloseNewMessageModal()}>
          <NewMessageContainer onClick={(e) => e.stopPropagation()}>
            <NewMessageHeader>
              <button className="close-button" onClick={handleCloseNewMessageModal}>
                <svg aria-label="닫기" color="#262626" fill="#262626" height="18" role="img" viewBox="0 0 24 24" width="18">
                  <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
                  <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
                </svg>
              </button>
              <h3>새로운 메시지</h3>
              <button 
                className="next-button" 
                disabled={selectedRecipients.length === 0}
                onClick={handleNext}
              >
                다음
              </button>
            </NewMessageHeader>
            <NewMessageContent>
              <RecipientInput>
                <span>받는 사람:</span>
                <input
                  type="text"
                  placeholder="검색..."
                  value={searchRecipient}
                  onChange={(e) => setSearchRecipient(e.target.value)}
                />
              </RecipientInput>
              
              {selectedRecipients.length > 0 && (
                <SelectedRecipients>
                  {selectedRecipients.map(recipient => (
                    <div key={recipient.id} className="recipient-chip">
                      <span>{recipient.username}</span>
                      <button onClick={() => removeSelectedUser(recipient.id)}>
                        <svg aria-label="삭제" color="#0095f6" fill="#0095f6" height="12" role="img" viewBox="0 0 24 24" width="12">
                          <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
                          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </SelectedRecipients>
              )}
              
              <SuggestedUsers>
                <h4>추천</h4>
                {filteredUsers.map(user => (
                  <UserItem 
                    key={user.id} 
                    isSelected={isUserSelected(user.id)}
                    onClick={() => toggleUserSelection(user)}
                  >
                    <div className="user-avatar">
                      <img src={user.avatar} alt={user.username} />
                    </div>
                    <div className="user-info">
                      <div className="username">{user.username}</div>
                      <div className="name">{user.name}</div>
                    </div>
                    <div className="selection-indicator">
                      {isUserSelected(user.id) && (
                        <svg aria-label="선택됨" color="white" fill="white" height="12" role="img" viewBox="0 0 24 24" width="12">
                          <polyline fill="none" points="20.643 9.06 9.06 20.643 3.353 14.936" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
                        </svg>
                      )}
                    </div>
                  </UserItem>
                ))}
              </SuggestedUsers>
            </NewMessageContent>
          </NewMessageContainer>
        </NewMessageModal>
      )}
    </MessagesContainer>
  );
};

export default Messages; 