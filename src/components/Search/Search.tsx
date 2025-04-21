import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  SearchContainer,
  SearchHeader,
  SearchInput,
  SearchContent,
  SearchLabel,
  RecentSearches,
  SearchItem,
  SearchAvatar,
  SearchInfo,
  SearchUsername,
  SearchName,
  ClearSearchButton,
  EmptySearch,
  SearchResults
} from './Search.styles';
import { SearchContext } from '../../App';
import styled, { keyframes } from 'styled-components';

// 모의 검색 데이터
const RECENT_SEARCHES = [
  { id: 1, username: 'user1', name: '사용자1', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, username: 'user2', name: '사용자2', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, username: 'user3', name: '사용자3', avatar: 'https://i.pravatar.cc/150?img=3' },
];

// 모의 추천 데이터
const SUGGESTED_ACCOUNTS = [
  { id: 4, username: 'suggested1', name: '추천계정1', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, username: 'suggested2', name: '추천계정2', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 6, username: 'suggested3', name: '추천계정3', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 7, username: 'suggested4', name: '추천계정4', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 8, username: 'suggested5', name: '추천계정5', avatar: 'https://i.pravatar.cc/150?img=8' },
];

// SearchProps는 계속 필요하지만 isOpen은 이제 context에서 가져오기 때문에 onClose만 필요합니다.
interface SearchProps {
  onClose: () => void;
}

// 애니메이션을 적용한 Search 컨테이너
const AnimatedSearchContainer = styled(SearchContainer)<{ isClosing: boolean }>`
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

const Search: React.FC<SearchProps> = ({ onClose }) => {
  const { isSearchOpen } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // 검색창이 열리면 input에 자동 포커스 및 상태 초기화
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // 사이드바 애니메이션 후에 포커스
      setIsClosing(false);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    // 검색어가 변경될 때마다 검색 결과 업데이트
    if (searchTerm.trim()) {
      // 실제 애플리케이션에서는 API 호출을 통해 검색 결과를 가져올 수 있습니다.
      const filteredResults = [...RECENT_SEARCHES, ...SUGGESTED_ACCOUNTS].filter(
        user => user.username.includes(searchTerm.toLowerCase()) || user.name.includes(searchTerm)
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    // 바깥영역 클릭 시 검색창 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleCloseWithAnimation();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, onClose]);

  const handleClearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearAllSearches = () => {
    setRecentSearches([]);
  };

  const handleRemoveSearch = (id: number) => {
    setRecentSearches(recentSearches.filter(search => search.id !== id));
  };

  const handleCloseWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500); // 애니메이션 지속 시간과 일치시킴
  };

  if (!isSearchOpen) return null;

  return (
    <AnimatedSearchContainer ref={searchRef} isClosing={isClosing}>
      <SearchHeader>
        <h4>검색</h4>
      </SearchHeader>
      <SearchInput
        ref={inputRef}
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchContent>
        {searchTerm ? (
          <SearchResults>
            <SearchLabel>검색 결과</SearchLabel>
            {searchResults.length > 0 ? (
              searchResults.map(user => (
                <SearchItem key={user.id}>
                  <SearchAvatar>
                    <img src={user.avatar} alt={user.username} />
                  </SearchAvatar>
                  <SearchInfo>
                    <SearchUsername>{user.username}</SearchUsername>
                    <SearchName>{user.name}</SearchName>
                  </SearchInfo>
                </SearchItem>
              ))
            ) : (
              <EmptySearch>검색 결과가 없습니다.</EmptySearch>
            )}
          </SearchResults>
        ) : (
          <>
            <div className="search-header-container">
              <SearchLabel>최근 검색 항목</SearchLabel>
              {recentSearches.length > 0 && (
                <ClearSearchButton onClick={handleClearAllSearches}>
                  모두 지우기
                </ClearSearchButton>
              )}
            </div>
            
            <RecentSearches>
              {recentSearches.length > 0 ? (
                recentSearches.map(search => (
                  <SearchItem key={search.id}>
                    <SearchAvatar>
                      <img src={search.avatar} alt={search.username} />
                    </SearchAvatar>
                    <SearchInfo>
                      <SearchUsername>{search.username}</SearchUsername>
                      <SearchName>{search.name}</SearchName>
                    </SearchInfo>
                    <ClearSearchButton onClick={() => handleRemoveSearch(search.id)}>
                      삭제
                    </ClearSearchButton>
                  </SearchItem>
                ))
              ) : (
                <EmptySearch>최근 검색 기록이 없습니다.</EmptySearch>
              )}
            </RecentSearches>

            <SearchLabel style={{ marginTop: '16px' }}>추천 계정</SearchLabel>
            {SUGGESTED_ACCOUNTS.map(account => (
              <SearchItem key={account.id}>
                <SearchAvatar>
                  <img src={account.avatar} alt={account.username} />
                </SearchAvatar>
                <SearchInfo>
                  <SearchUsername>{account.username}</SearchUsername>
                  <SearchName>{account.name}</SearchName>
                </SearchInfo>
              </SearchItem>
            ))}
          </>
        )}
      </SearchContent>
    </AnimatedSearchContainer>
  );
};

export default Search; 