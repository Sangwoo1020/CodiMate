// Header JavaScript Functions - 수정된 버전

document.addEventListener('DOMContentLoaded', function() {
    // 헤더가 로드될 때까지 기다린 후 초기화
    waitForHeaderLoad();
});

// 헤더 로드 대기 함수
function waitForHeaderLoad() {
    const checkInterval = setInterval(() => {
        // 헤더가 로드되었는지 확인 (헤더의 주요 요소가 있는지 체크)
        const header = document.querySelector('.main-header') || document.querySelector('.header');
        
        if (header) {
            clearInterval(checkInterval);
            initializeHeader();
        }
    }, 100); // 100ms마다 체크
    
    // 5초 후 타임아웃 (헤더 로드에 실패한 경우)
    setTimeout(() => {
        clearInterval(checkInterval);
        console.warn('헤더 로드 타임아웃 - 헤더 없이 진행');
    }, 5000);
}

function initializeHeader() {
    // 각 함수들을 안전하게 실행
    try {
        handleScrollEffect();
        setupMobileMenu();
        setupSearchFeature();
        highlightCurrentPage();
        setupProfileMenu();
    } catch (error) {
        console.error('헤더 초기화 중 오류:', error);
    }
}

// 스크롤 효과 (안전한 요소 접근)
function handleScrollEffect() {
    const header = document.querySelector('.header') || document.querySelector('.main-header');
    
    if (!header) {
        console.warn('헤더 요소를 찾을 수 없습니다');
        return;
    }
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 모바일 메뉴 설정 (안전한 요소 접근)
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle') || 
                            document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 바디 스크롤 제어
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // 메뉴 링크 클릭 시 메뉴 닫기
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    } else {
        console.warn('모바일 메뉴 요소를 찾을 수 없습니다');
    }
}

// 검색 기능 설정 (안전한 요소 접근)
function setupSearchFeature() {
    const searchIcon = document.getElementById('searchIcon') || 
                      document.querySelector('.search-btn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput') || 
                       document.querySelector('.search-input');
    
    // 검색창 열기
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            if (searchOverlay) {
                searchOverlay.classList.add('active');
                setTimeout(() => {
                    if (searchInput) searchInput.focus();
                }, 300);
            } else {
                // 오버레이가 없으면 직접 검색 실행
                if (searchInput) {
                    const query = searchInput.value;
                    if (query) {
                        performSearch(query);
                    } else {
                        searchInput.focus();
                    }
                }
            }
        });
    }
    
    // 검색창 닫기
    if (searchClose && searchOverlay) {
        searchClose.addEventListener('click', closeSearch);
        
        // 오버레이 클릭 시 닫기
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
    }
    
    // ESC 키로 검색창 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });
    
    // 검색 실행
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

function closeSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput') || 
                       document.querySelector('.search-input');
    
    if (searchOverlay) {
        searchOverlay.classList.remove('active');
    }
    if (searchInput) {
        searchInput.value = '';
    }
}

function performSearch(query) {
    if (query.trim() === '') {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    // 실제 검색 로직 구현
    console.log('검색어:', query);
    alert(`"${query}"에 대한 검색 결과를 찾고 있습니다...`);
    
    // 검색창 닫기
    closeSearch();
    
    // TODO: 실제 검색 API 호출 및 결과 페이지로 이동
    // window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
}

// 현재 페이지 하이라이트 (안전한 요소 접근)
function highlightCurrentPage() {
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    if (menuLinks.length === 0) {
        console.warn('네비게이션 메뉴를 찾을 수 없습니다');
        return;
    }
    
    const currentPath = window.location.pathname;
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || 
            (currentPath === '/' && linkPath.includes('mainpage.html'))) {
            link.classList.add('active');
        }
    });
}

// 프로필 메뉴 설정
function setupProfileMenu() {
    const profileIcon = document.getElementById('profileIcon') || 
                       document.querySelector('.profile-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (profileIcon) {
        profileIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('active');
            } else {
                // 드롭다운이 없으면 기본 프로필 메뉴 표시
                showProfileMenu();
            }
        });
    }
    
    // 다른 곳 클릭 시 드롭다운 닫기
    if (dropdownMenu) {
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('active');
        });
        
        // 드롭다운 내부 클릭 시 이벤트 전파 중단
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

function showProfileMenu() {
    // 간단한 프로필 메뉴 표시
    const options = [
        '마이페이지',
        '코디 히스토리', 
        '설정',
        '로그아웃'
    ];
    
    // 임시로 alert 사용 (실제로는 드롭다운 메뉴 구현)
    alert('프로필 메뉴: ' + options.join(', '));
    
    // TODO: 실제 프로필 드롭다운 메뉴 구현
}

// 네비게이션 함수들
function navigateToHome() {
    window.location.href = '/';
}

function navigateToCoordination() {
    window.location.href = '/coordination';
}

function navigateToCloset() {
    window.location.href = '/closet';
}

function navigateToColorMatching() {
    window.location.href = '/color-matching';
}

function navigateToMyPage() {
    window.location.href = '/mypage';
}

function navigateToHistory() {
    window.location.href = '/history';
}

// 유틸리티 함수들
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 안전한 DOM 요소 접근을 위한 헬퍼 함수
function safeQuerySelector(selector, context = document) {
    try {
        return context.querySelector(selector);
    } catch (error) {
        console.warn(`선택자 "${selector}"를 찾을 수 없습니다:`, error);
        return null;
    }
}

function safeQuerySelectorAll(selector, context = document) {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        console.warn(`선택자들 "${selector}"을 찾을 수 없습니다:`, error);
        return [];
    }
}

// 전역 에러 처리
window.addEventListener('error', function(e) {
    console.error('헤더 관련 에러:', e.error);
});