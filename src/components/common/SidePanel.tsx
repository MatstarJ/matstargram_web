import React, { useRef, useEffect } from 'react';
import { SidePanelContainer } from './SidePanel.styles';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose, children, className }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // isOpen 상태 변경 시 실행되는 useEffect
  useEffect(() => {
    console.log(`SidePanel isOpen 상태 변경: ${isOpen}`);
    // 여기에 isOpen 상태가 변경될 때 실행할 로직을 추가할 수 있습니다.
    // 예: 패널이 닫힐 때 특정 작업 수행 등
  }, [isOpen]);

  // 외부 클릭 감지 로직
  useEffect(() => {
    // 외부 클릭 이벤트 핸들러
    const handleOutsideClick = (event: MouseEvent) => {
      // 패널이 존재하고, 패널 외부를 클릭한 경우에만 닫기
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // 이벤트 리스너 추가 및 제거
    if (isOpen) {
      // mousedown 대신 mouseup 이벤트 사용 (클릭 완료 시점에 처리)
      setTimeout(() => {
        document.addEventListener('mouseup', handleOutsideClick);
      }, 10);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mouseup', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // ESC 키 누르면 패널 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // 패널이 열려있을 때만 키보드 이벤트 리스너 추가
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    // 컴포넌트 언마운트 또는 의존성 변경 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  // 패널이 닫혀있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <SidePanelContainer 
      ref={panelRef}
      className={className}
      onClick={(e) => e.stopPropagation()} // 패널 내부 클릭이 외부로 전파되지 않도록 방지
    >
      {children}
    </SidePanelContainer>
  );
};

export default SidePanel; 