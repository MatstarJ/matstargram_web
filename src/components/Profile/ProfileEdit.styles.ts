import styled from 'styled-components';

export const ProfileEditContainer = styled.div`
  max-width: 935px;
  width: 900px;
  margin: 0 auto;
  display: flex;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  margin-top: 50px;
  min-height: 850px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  
  @media (max-width: 768px) {
    flex-direction: column;
    border: none;
    background-color: transparent;
    width: 100%;
    box-shadow: none;
  }
`;

export const Sidebar = styled.div`
  width: 236px;
  min-width: 236px;
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.secondaryBackground};
  padding: 8px 0;
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

export interface MenuItemProps {
  active?: boolean;
}

export const MenuItem = styled.li<MenuItemProps>`
  padding: 16px;
  font-size: 16px;
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textSecondary};
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? props.theme.colors.secondaryBackground : 'transparent'};
  cursor: pointer;
  border-left: ${props => props.active ? `2px solid ${props.theme.colors.text}` : 'none'};
  border-radius: 12px;
  margin: 4px 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondaryBackground};
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    border-left: none;
    border-radius: 12px;
    border-bottom: ${props => props.active ? `2px solid ${props.theme.colors.text}` : 'none'};
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 32px;
  border-radius: 16px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

export const Label = styled.label`
  width: 120px;
  font-weight: 600;
  margin-top: 8px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 8px;
  }
`;

export const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  max-width: 355px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
`;

export const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  max-width: 355px;
  min-height: 60px;
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
`;

export const HelperText = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 12px;
  margin-top: 8px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

export const ChangePictureButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 12px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondaryBackground};
    color: ${props => props.theme.colors.link};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 120px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 24px;
  }
`;


export const ButtonsContainerForOpenId = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 290px;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 24px;
  }
`;

export const ButtonsContainerForProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 270px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 24px;
  }
`;

export const ButtonsContainerForChangePassword = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 235px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 24px;
  }
`;


export const ButtonsContainerForTag = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 260px;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 24px;
  }
`;

export const PasswordChangeButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 235px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 24px;
  }
`;

export const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryButtonHoverBg};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 12px;
  border-radius: 8px 8px 0 0;
`;

export const DeactivateLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-top: 20px;
  text-align: left;
  
  &:hover {
    color: ${props => props.theme.colors.link};
  }
`;

export const GenderSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  max-width: 355px;
  background-color: ${props => props.theme.colors.background};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const CustomCheckbox = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${props => props.checked ? props.theme.colors.primary : props.theme.colors.border};
  background-color: ${props => props.checked ? props.theme.colors.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    display: ${props => props.checked ? 'block' : 'none'};
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
`;

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const CustomRadio = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${props => props.checked ? props.theme.colors.primary : props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.checked ? props.theme.colors.primary : 'transparent'};
    position: absolute;
  }
`;

export const RadioLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`; 