import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProfileEditContainer,
  Sidebar,
  MenuList,
  MenuItem,
  ContentArea,
  FormGroup,
  Label,
  InputContainer,
  Input,
  TextArea,
  HelperText,
  AvatarContainer,
  Avatar,
  ChangePictureButton,
  ButtonsContainer,
  SubmitButton,
  SectionTitle,
  DeactivateLink,
  GenderSelect,
  CheckboxContainer,
  CustomCheckbox,
  CheckboxLabel,
  RadioContainer,
  CustomRadio,
  RadioLabel,
  RadioGroup,
  PasswordChangeButtonsContainer,
  ButtonsContainerForOpenId,
  ButtonsContainerForTag,
  ButtonsContainerForChangePassword,
  ButtonsContainerForProfile
} from './ProfileEdit.styles';

// 사용자 데이터 목업
const userProfile = {
  username: '우주_스타',
  name: '오스타',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: '우주에서 온 스타⭐\n인스타그램 클론 프로젝트에 참여 중',
  email: 'space_star@example.com',
  phone: '010-1234-5678',
  gender: 'male',
  websiteUrl: 'https://matstarworld.co.kr'
};

// 메뉴 타입 재정의
type MenuType = 'edit' | 'password' | 'privacy' | 'blocked' | 'notifications' | 'push' | 'email' | 'tags' | 'deactivate' | 'forgot-password';

const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<MenuType>('edit');
  
  // 폼 상태
  const [formData, setFormData] = useState({
    name: userProfile.name,
    username: userProfile.username,
    website: userProfile.websiteUrl,
    bio: userProfile.bio,
    email: userProfile.email,
    phone: userProfile.phone,
    gender: userProfile.gender
  });
  
  // 체크박스 및 라디오 버튼 상태들
  const [tagPermission, setTagPermission] = useState('everyone'); // 'everyone', 'following', 'none'
  const [mentionPermission, setMentionPermission] = useState('everyone'); // 'everyone', 'following', 'none'
  const [privateAccount, setPrivateAccount] = useState(false);
  const [pushLikes, setPushLikes] = useState('all');
  const [pushComments, setPushComments] = useState('all');
  const [emailFeedback, setEmailFeedback] = useState(false);
  const [emailReminders, setEmailReminders] = useState(true);
  const [emailProduct, setEmailProduct] = useState(true);
  
  // 계정 비활성화 상태
  const [deactivatePassword, setDeactivatePassword] = useState('');
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);
  
  // 비밀번호 재설정 상태
  const [resetEmail, setResetEmail] = useState(userProfile.email);
  const [resetSent, setResetSent] = useState(false);
  
  // 폼 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 API 호출을 통해 프로필 업데이트를 처리
    console.log('프로필 업데이트:', formData);
    // 성공 시 프로필 페이지로 이동
    navigate('/profile');
  };
  
  // 파일 선택 핸들러 (프로필 사진 변경)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // 여기서 이미지 업로드 로직을 처리
      console.log('프로필 이미지 변경:', e.target.files[0]);
    }
  };
  
  const renderEditProfile = () => {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="avatar">프로필 사진</Label>
          <AvatarContainer>
            <Avatar src={userProfile.avatar} alt={userProfile.username} />
            <div>
              <input 
                type="file" 
                id="profile-pic" 
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
              />
              <ChangePictureButton 
                onClick={() => document.getElementById('profile-pic')?.click()}
              >
                프로필 사진 바꾸기
              </ChangePictureButton>
            </div>
          </AvatarContainer>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="name">이름</Label>
          <InputContainer>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <HelperText>
              사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.
            </HelperText>
          </InputContainer>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="username">사용자 이름</Label>
          <InputContainer>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </InputContainer>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="website">웹사이트</Label>
          <InputContainer>
            <Input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
            />
          </InputContainer>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="bio">소개</Label>
          <InputContainer>
            <TextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
            />
          </InputContainer>
        </FormGroup>
        
        <FormGroup>
          <Label></Label>
          <InputContainer>
            <HelperText style={{ fontSize: '14px', fontWeight: '600' }}>
              개인정보
            </HelperText>
            <HelperText>
              비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인정보를 입력하세요. 이 정보는 공개 프로필에 포함되지 않습니다.
            </HelperText>
          </InputContainer>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">이메일</Label>
          <InputContainer>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </InputContainer>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="phone">전화번호</Label>
          <InputContainer>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </InputContainer>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="gender">성별</Label>
          <InputContainer>
            <GenderSelect
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="custom">맞춤 성별</option>
              <option value="prefer_not_to_say">밝히고 싶지 않음</option>
            </GenderSelect>
          </InputContainer>
        </FormGroup>
        
        <ButtonsContainerForProfile>
          <SubmitButton type="submit">제출</SubmitButton>
        </ButtonsContainerForProfile>

      </form>
    );
  };

  const renderPasswordChange = () => {
    return (
      <div>
        <SectionTitle>비밀번호 변경</SectionTitle>
        <form>
          <FormGroup>
            <Label htmlFor="old-password">이전 비밀번호</Label>
            <InputContainer>
              <Input
                type="password"
                id="old-password"
                name="oldPassword"
              />
            </InputContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="new-password">새 비밀번호</Label>
            <InputContainer>
              <Input
                type="password"
                id="new-password"
                name="newPassword"
              />
            </InputContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
            <InputContainer>
              <Input
                type="password"
                id="confirm-password"
                name="confirmPassword"
              />
            </InputContainer>
          </FormGroup>
          
          <PasswordChangeButtonsContainer>
            <SubmitButton type="submit">비밀번호 변경</SubmitButton>
          </PasswordChangeButtonsContainer>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <DeactivateLink onClick={() => handleMenuClick('forgot-password')}>
              비밀번호를 잊으셨나요?
            </DeactivateLink>
          </div>
        </form>
      </div>
    );
  };

  const renderForgotPassword = () => {
    const handleResetSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // 이메일 입력 검증 코드 제거
      // 계정에 저장된 이메일(userProfile.email)로 비밀번호 재설정 링크 전송
      console.log('비밀번호 재설정 요청:', userProfile.email);
      setResetSent(true);
    };
    
    return (
      <div>
        <SectionTitle>비밀번호 재설정</SectionTitle>
        
        {!resetSent ? (
          <>
            <div style={{ 
              backgroundColor: '#f0f8ff', 
              padding: '20px', 
              borderRadius: '16px', 
              marginBottom: '24px', 
              border: '1px solid rgba(0, 149, 246, 0.2)',
              boxShadow: '0 2px 8px rgba(0, 149, 246, 0.05)'
            }}>
              <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
                계정에 등록된 이메일 주소(<strong>{userProfile.email}</strong>)로 비밀번호 재설정 링크를 보내드립니다. 
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                링크를 통해 새로운 비밀번호를 설정하실 수 있습니다.
              </p>
            </div>
            
            <form onSubmit={handleResetSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
                <SubmitButton 
                  type="submit" 
                  style={{ 
                    minWidth: '200px',
                    padding: '10px 24px'
                  }}
                >
                  재설정 링크 보내기
                </SubmitButton>
                
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <DeactivateLink onClick={() => handleMenuClick('password')}>
                    비밀번호 변경으로 돌아가기
                  </DeactivateLink>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ 
              backgroundColor: '#f0f9eb', 
              padding: '20px', 
              borderRadius: '16px', 
              marginBottom: '24px', 
              border: '1px solid rgba(103, 194, 58, 0.2)',
              boxShadow: '0 2px 8px rgba(103, 194, 58, 0.05)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#67c23a' }}>
                이메일이 전송되었습니다
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <strong>{userProfile.email}</strong> 주소로 비밀번호 재설정 링크를 보냈습니다. 이메일을 확인하고 링크를 클릭하여 새로운 비밀번호를 설정해주세요.
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '12px' }}>
                이메일이 수신되지 않았다면 스팸 폴더를 확인하시거나, 아래 버튼을 클릭하여 다시 요청해주세요.
              </p>
            </div>
            
            <ButtonsContainer style={{ justifyContent: 'center' }}>
              <SubmitButton 
                type="button" 
                onClick={() => setResetSent(false)}
                style={{ 
                  minWidth: '200px',
                  padding: '10px 24px'
                }}
              >
                다시 요청하기
              </SubmitButton>
            </ButtonsContainer>
            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <DeactivateLink onClick={() => handleMenuClick('password')}>
                비밀번호 변경으로 돌아가기
              </DeactivateLink>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTagSettings = () => {
    return (
      <div>
        <SectionTitle>태그 및 언급</SectionTitle>
        <form>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>나를 태그할 수 있는 사람</h3>
            <p style={{ fontSize: '14px', color: '#8e8e8e', marginBottom: '16px' }}>
              사진과 동영상에서 회원님을 태그할 수 있는 사람을 선택하세요. 다른 사람이 회원님을 태그하려고 하면 회원님이 일부에게만 태그를 허용한다는 메시지가 표시됩니다.
            </p>
            <RadioGroup>
              <RadioContainer>
                <CustomRadio 
                  checked={tagPermission === 'everyone'} 
                  onClick={() => setTagPermission('everyone')}
                />
                <RadioLabel onClick={() => setTagPermission('everyone')}>
                  모든 사람의 태그 허용
                </RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <CustomRadio 
                  checked={tagPermission === 'following'} 
                  onClick={() => setTagPermission('following')}
                />
                <RadioLabel onClick={() => setTagPermission('following')}>
                  내가 팔로우하는 사람의 태그 허용
                </RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <CustomRadio 
                  checked={tagPermission === 'none'} 
                  onClick={() => setTagPermission('none')}
                />
                <RadioLabel onClick={() => setTagPermission('none')}>
                  태그 허용 안 함
                </RadioLabel>
              </RadioContainer>
            </RadioGroup>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>나를 @언급할 수 있는 사람</h3>
            <p style={{ fontSize: '14px', color: '#8e8e8e', marginBottom: '16px' }}>
              회원님을 @언급하여 스토리, 메모, 댓글, 라이브 방송 및 문구에서 회원님의 계정을 연결할 수 있도록 허용할 사람을 선택하세요. 허용되지 않은 사람이 회원님을 @언급하려고 시도하면 회원님이 @언급을 허용하지 않는다는 메시지가 표시됩니다.
            </p>
            <RadioGroup>
              <RadioContainer>
                <CustomRadio 
                  checked={mentionPermission === 'everyone'} 
                  onClick={() => setMentionPermission('everyone')}
                />
                <RadioLabel onClick={() => setMentionPermission('everyone')}>
                  모든 사람의 언급 허용
                </RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <CustomRadio 
                  checked={mentionPermission === 'following'} 
                  onClick={() => setMentionPermission('following')}
                />
                <RadioLabel onClick={() => setMentionPermission('following')}>
                  내가 팔로우하는 사람의 언급 허용
                </RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <CustomRadio 
                  checked={mentionPermission === 'none'} 
                  onClick={() => setMentionPermission('none')}
                />
                <RadioLabel onClick={() => setMentionPermission('none')}>
                  언급 허용 안함
                </RadioLabel>
              </RadioContainer>
            </RadioGroup>
          </div>
          
          <ButtonsContainerForTag>
            <SubmitButton type="submit">저장</SubmitButton>
          </ButtonsContainerForTag>
        </form>
      </div>
    );
  };

  const renderPrivacySettings = () => {
    return (
      <div>
        <SectionTitle>계정공개 범위</SectionTitle>
        <form>
          <FormGroup>
            <Label></Label>
            <InputContainer>
              <CheckboxContainer>
                <CustomCheckbox 
                  checked={privateAccount} 
                  onClick={() => setPrivateAccount(!privateAccount)}
                />
                <CheckboxLabel onClick={() => setPrivateAccount(!privateAccount)}>
                  비공개 계정
                </CheckboxLabel>
              </CheckboxContainer>
              <HelperText>
                계정이 비공개 상태인 경우 회원님이 승인한 사람만 Instagram에서 회원님의 사진과 동영상을 볼 수 있습니다. 기존 팔로워는 영향을 받지 않습니다.
              </HelperText>
            </InputContainer>
          </FormGroup>
          
          <ButtonsContainerForOpenId>
            <SubmitButton type="submit">저장</SubmitButton>
          </ButtonsContainerForOpenId>
        </form>
      </div>
    );
  };

  const renderBlockedAccounts = () => {
    return (
      <div>
        <SectionTitle>차단된 계정</SectionTitle>
        <p>현재 차단한 계정이 없습니다.</p>
        <p style={{ color: '#8e8e8e', marginTop: '20px' }}>
          차단한 사람은 Instagram에서 회원님의 프로필, 게시물, 스토리를 찾을 수 없습니다. Instagram은 회원님이 차단한 사람에게 이 사실을 알리지 않습니다.
        </p>
      </div>
    );
  };

  const renderNotificationsMain = () => {
    return (
      <div>
        <SectionTitle>알림</SectionTitle>
        <p>Instagram에서 받을 알림을 관리합니다.</p>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
          <li style={{ marginBottom: '15px', color: '#0095f6', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveMenu('push')}>
            푸시 알림
          </li>
          <li style={{ marginBottom: '15px', color: '#0095f6', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveMenu('email')}>
            이메일 알림
          </li>
        </ul>
      </div>
    );
  };

  const renderPushNotifications = () => {
    return (
      <div>
        <SectionTitle>푸시 알림</SectionTitle>
        <form>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>좋아요</h3>
            <RadioGroup>
              <RadioContainer>
                <CustomRadio 
                  checked={pushLikes === 'off'} 
                  onClick={() => setPushLikes('off')}
                />
                <RadioLabel onClick={() => setPushLikes('off')}>
                  해제
                </RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <CustomRadio 
                  checked={pushLikes === 'from'} 
                  onClick={() => setPushLikes('from')}
                />
                <RadioLabel onClick={() => setPushLikes('from')}>
                  팔로우한 사람들
                </RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <CustomRadio 
                  checked={pushLikes === 'all'} 
                  onClick={() => setPushLikes('all')}
                />
                <RadioLabel onClick={() => setPushLikes('all')}>
                  모든 사람
                </RadioLabel>
              </RadioContainer>
            </RadioGroup>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>댓글</h3>
            <RadioGroup>
              <RadioContainer>
                <CustomRadio 
                  checked={pushComments === 'off'} 
                  onClick={() => setPushComments('off')}
                />
                <RadioLabel onClick={() => setPushComments('off')}>
                  해제
                </RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <CustomRadio 
                  checked={pushComments === 'from'} 
                  onClick={() => setPushComments('from')}
                />
                <RadioLabel onClick={() => setPushComments('from')}>
                  팔로우한 사람들
                </RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <CustomRadio 
                  checked={pushComments === 'all'} 
                  onClick={() => setPushComments('all')}
                />
                <RadioLabel onClick={() => setPushComments('all')}>
                  모든 사람
                </RadioLabel>
              </RadioContainer>
            </RadioGroup>
          </div>
          
          <ButtonsContainer style={{ paddingLeft: 0 }}>
            <SubmitButton type="submit">저장</SubmitButton>
          </ButtonsContainer>
        </form>
      </div>
    );
  };

  const renderEmailNotifications = () => {
    return (
      <div>
        <SectionTitle>이메일 알림</SectionTitle>
        <form>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>피드백 이메일</h3>
            <CheckboxContainer>
              <CustomCheckbox 
                checked={emailFeedback} 
                onClick={() => setEmailFeedback(!emailFeedback)}
              />
              <CheckboxLabel onClick={() => setEmailFeedback(!emailFeedback)}>
                Instagram 제품 개선에 참여하도록 Instagram에서 가끔 보내는 이메일을 수신합니다.
              </CheckboxLabel>
            </CheckboxContainer>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>알림 이메일</h3>
            <CheckboxContainer>
              <CustomCheckbox 
                checked={emailReminders} 
                onClick={() => setEmailReminders(!emailReminders)}
              />
              <CheckboxLabel onClick={() => setEmailReminders(!emailReminders)}>
                푸시 알림을 받을 수 없는 경우 확인하지 않은 알림에 대한 이메일을 수신합니다.
              </CheckboxLabel>
            </CheckboxContainer>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>제품 이메일</h3>
            <CheckboxContainer>
              <CustomCheckbox 
                checked={emailProduct} 
                onClick={() => setEmailProduct(!emailProduct)}
              />
              <CheckboxLabel onClick={() => setEmailProduct(!emailProduct)}>
                Instagram의 새로운 기능에 대한 정보를 얻습니다.
              </CheckboxLabel>
            </CheckboxContainer>
          </div>
          
          <ButtonsContainer style={{ paddingLeft: 0 }}>
            <SubmitButton type="submit">저장</SubmitButton>
          </ButtonsContainer>
        </form>
      </div>
    );
  };

  // 추가 메뉴 렌더링 함수들
  const renderNotifications = () => {
    return (
      <div>
        <SectionTitle>알림</SectionTitle>
        <p>Instagram에서 받을 알림을 관리합니다.</p>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
          <li style={{ marginBottom: '15px', color: '#0095f6', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveMenu('push')}>
            푸시 알림
          </li>
          <li style={{ marginBottom: '15px', color: '#0095f6', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveMenu('email')}>
            이메일 알림
          </li>
        </ul>
      </div>
    );
  };

  const renderDeactivateAccount = () => {
    const handleDeactivateSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (confirmDeactivate && deactivatePassword) {
        alert('계정 비활성화 요청이 처리되었습니다. 로그아웃됩니다.');
        // 여기서 API 호출을 통해 계정 비활성화 처리
        navigate('/');
      } else {
        alert('비밀번호를 입력하고 확인란을 체크해주세요.');
      }
    };
    
    return (
      <div>
        <SectionTitle>계정 비활성화</SectionTitle>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#ed4956' }}>
            계정 비활성화 전에 확인하세요
          </h3>
          <div style={{ 
            backgroundColor: '#fff8f8', 
            padding: '20px', 
            borderRadius: '16px', 
            marginBottom: '20px', 
            border: '1px solid rgba(237, 73, 86, 0.2)',
            boxShadow: '0 2px 8px rgba(237, 73, 86, 0.05)'
          }}>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
              계정을 비활성화하면 프로필, 사진, 동영상, 댓글, 좋아요 및 팔로워가 모두 Instagram에서 숨겨집니다. 다시 로그인하면 모든 정보가 복원됩니다.
            </p>
            <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>계정은 즉시 비활성화되며 30일 이내에 다시 로그인하지 않으면 영구 삭제될 수 있습니다.</li>
              <li style={{ marginBottom: '8px' }}>비활성화 기간 동안에도 이메일 주소와 사용자 이름은 다른 계정에서 사용할 수 없습니다.</li>
              <li style={{ marginBottom: '8px' }}>일부 정보(예: 다른 사용자에게 보낸 메시지)는 계정을 비활성화해도 계속 표시될 수 있습니다.</li>
              <li>계정 삭제는 되돌릴 수 없습니다. 삭제 전에 모든 콘텐츠를 백업하는 것을 권장합니다.</li>
            </ul>
          </div>
        </div>
        
        <form onSubmit={handleDeactivateSubmit}>
          <FormGroup>
            <Label htmlFor="deactivate-password">비밀번호 확인</Label>
            <InputContainer>
              <Input
                type="password"
                id="deactivate-password"
                name="password"
                value={deactivatePassword}
                onChange={(e) => setDeactivatePassword(e.target.value)}
                placeholder="계정 비밀번호를 입력하세요"
              />
              <HelperText>
                비활성화를 진행하려면 계정 비밀번호를 입력해주세요.
              </HelperText>
            </InputContainer>
          </FormGroup>
          
          <FormGroup>
            <Label></Label>
            <InputContainer>
              <CheckboxContainer>
                <CustomCheckbox 
                  checked={confirmDeactivate} 
                  onClick={() => setConfirmDeactivate(!confirmDeactivate)}
                />
                <CheckboxLabel onClick={() => setConfirmDeactivate(!confirmDeactivate)}>
                  위의 내용을 이해했으며 계정을 비활성화하겠습니다.
                </CheckboxLabel>
              </CheckboxContainer>
            </InputContainer>
          </FormGroup>
          
          <ButtonsContainerForChangePassword>
            <SubmitButton 
              type="submit" 
              style={{ 
                backgroundColor: '#ed4956'
              }}
            >
              계정 비활성화
            </SubmitButton>
          </ButtonsContainerForChangePassword>
        </form>
      </div>
    );
  };

  // 메뉴에 따른 컨텐츠 렌더링
  const renderContent = () => {
    switch (activeMenu) {
      case 'edit':
        return renderEditProfile();
      case 'password':
        return renderPasswordChange();
      case 'privacy':
        return renderPrivacySettings();
      case 'blocked':
        return renderBlockedAccounts();
      case 'notifications':
        return renderNotifications();
      case 'push':
        return renderPushNotifications();
      case 'email':
        return renderEmailNotifications();
      case 'tags':
        return renderTagSettings();
      case 'deactivate':
        return renderDeactivateAccount();
      case 'forgot-password':
        return renderForgotPassword();
      default:
        return renderEditProfile();
    }
  };

  const handleMenuClick = (menu: MenuType) => {
    setActiveMenu(menu);
  };

  // 서브메뉴가 활성화되어 있는지 확인하는 함수
  const isNotificationSubmenuActive = () => {
    return activeMenu === 'push' || activeMenu === 'email';
  };

  return (
    <ProfileEditContainer>
      <Sidebar>
        <MenuList>
          <MenuItem 
            active={activeMenu === 'edit'} 
            onClick={() => handleMenuClick('edit')}
          >
            프로필 편집
          </MenuItem>
          <MenuItem 
            active={activeMenu === 'password'} 
            onClick={() => handleMenuClick('password')}
          >
            비밀번호 변경
          </MenuItem>
          <MenuItem 
            active={activeMenu === 'privacy'} 
            onClick={() => handleMenuClick('privacy')}
          >
            계정공개 범위
          </MenuItem>
          <MenuItem 
            active={activeMenu === 'tags'} 
            onClick={() => handleMenuClick('tags')}
          >
            태그 및 언급
          </MenuItem>
          <MenuItem 
            active={activeMenu === 'blocked'} 
            onClick={() => handleMenuClick('blocked')}
          >
            차단된 계정
          </MenuItem>
          <MenuItem 
            active={activeMenu === 'notifications' || isNotificationSubmenuActive()} 
            onClick={() => handleMenuClick('notifications')}
          >
            알림
          </MenuItem>
          {isNotificationSubmenuActive() && (
            <>
              <MenuItem 
                active={activeMenu === 'push'} 
                onClick={() => handleMenuClick('push')}
                style={{ paddingLeft: '32px', fontSize: '14px' }}
              >
                푸시 알림
              </MenuItem>
              <MenuItem 
                active={activeMenu === 'email'} 
                onClick={() => handleMenuClick('email')}
                style={{ paddingLeft: '32px', fontSize: '14px' }}
              >
                이메일 알림
              </MenuItem>
            </>
          )}
          <MenuItem 
            active={activeMenu === 'deactivate'} 
            onClick={() => handleMenuClick('deactivate')}
            style={{ color: '#ed4956' }}
          >
            계정 비활성화
          </MenuItem>
        </MenuList>
      </Sidebar>
      <ContentArea>
        {renderContent()}
      </ContentArea>
    </ProfileEditContainer>
  );
};

export default ProfileEdit; 