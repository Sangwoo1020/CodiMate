// Header JavaScript Functions - 완전 수정된 버전

document.addEventListener('DOMContentLoaded', function() {
    // 헤더와 푸터를 동시에 로드
    loadHeaderAndFooter();
});

// 헤더와 푸터 동시 로드 함수
async function loadHeaderAndFooter() {
    try {
        console.log('헤더 로드 시작...');
        
        // 헤더 로드
        const headerResponse = await fetch('/templates/fix/header.html');
        if (!headerResponse.ok) {
            throw new Error('헤더 파일을 찾을 수 없습니다: ' + headerResponse.status);
        }
        const headerHTML = await headerResponse.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;
        document.getElementById('header-placeholder').classList.remove('loading');
        console.log('헤더 로드 완료');
        
        // 푸터 로드
        try {
            const footerResponse = await fetch('/templates/fix/footer.html');
            if (footerResponse.ok) {
                const footerHTML = await footerResponse.text();
                const footerPlaceholder = document.getElementById('footer-placeholder');
                if (footerPlaceholder) {
                    footerPlaceholder.innerHTML = footerHTML;
                    console.log('푸터 로드 완료');
                }
            } else {
                console.warn('푸터 파일을 찾을 수 없습니다:', footerResponse.status);
            }
        } catch (footerError) {
            console.warn('푸터 로드 실패:', footerError);
        }
        
        // 헤더 로드 후 초기화
        initializeHeader();
        
    } catch (error) {
        console.error('헤더 로드 실패:', error);
        // 에러 발생 시에도 메인페이지는 작동하도록
        initializeMainPageFallback();
    }
}

function initializeHeader() {
    // 각 함수들을 안전하게 실행
    try {
        console.log('헤더 초기화 시작...');
        handleScrollEffect();
        setupMobileMenu();
        setupSearchFeature();
        highlightCurrentPage();
        setupProfileMenu();
        console.log('헤더 초기화 완료');
    } catch (error) {
        console.error('헤더 초기화 중 오류:', error);
    }
}

// 메인페이지 대체 초기화 (헤더 로드 실패 시)
function initializeMainPageFallback() {
    console.warn('헤더 없이 메인페이지만 초기화합니다');
    // mainpage.js의 함수가 있다면 호출
    if (typeof initializeMainPage === 'function') {
        initializeMainPage();
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
                            document.querySelector('.mobile-menu-btn') ||
                            document.querySelector('.mobile-menu-toggle');
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
        
        console.log('모바일 메뉴 설정 완료');
    } else {
        console.warn('모바일 메뉴 요소를 찾을 수 없습니다');
    }
}

// 검색 기능 설정 (안전한 요소 접근)
function setupSearchFeature() {
    const searchIcon = document.getElementById('searchIcon') || 
                      document.querySelector('.search-btn') ||
                      document.querySelector('.search-icon');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput') || 
                       document.querySelector('.search-input');
    
    // 검색창 열기
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
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
                } else {
                    // 검색 입력창도 없으면 간단한 프롬프트
                    const query = prompt('검색어를 입력하세요:');
                    if (query) {
                        performSearch(query);
                    }
                }
            }
        });
        console.log('검색 아이콘 이벤트 설정 완료');
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
        
        try {
            const linkPath = new URL(link.href).pathname;
            if (currentPath === linkPath || 
                (currentPath === '/' && linkPath.includes('mainpage.html')) ||
                (currentPath.includes('mainpage') && linkPath.includes('mainpage.html'))) {
                link.classList.add('active');
            }
        } catch (error) {
            // URL 파싱 실패 시 간단한 비교
            if (link.href.includes(currentPath) || 
                (currentPath === '/' && link.textContent === '홈')) {
                link.classList.add('active');
            }
        }
    });
    
    console.log('페이지 하이라이트 설정 완료');
}

// 프로필 메뉴 설정
function setupProfileMenu() {
    const profileIcon = document.getElementById('profileIcon') || 
                       document.querySelector('.profile-btn') ||
                       document.querySelector('.profile-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (profileIcon) {
        profileIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('active');
            } else {
                // 드롭다운이 없으면 기본 프로필 메뉴 표시
                showProfileMenu();
            }
        });
        
        console.log('프로필 메뉴 설정 완료');
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
    const choice = confirm(`프로필 메뉴를 선택하세요:\n${options.join('\n')}\n\n확인을 누르면 마이페이지로 이동합니다.`);
    if (choice) {
        navigateToMyPage();
    }
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

// 헤더 로드 대기 함수 (백업용)
function waitForHeaderLoad() {
    const checkInterval = setInterval(() => {
        const header = document.querySelector('.main-header') || document.querySelector('.header');
        
        if (header) {
            clearInterval(checkInterval);
            initializeHeader();
        }
    }, 100);
    
    // 5초 후 타임아웃
    setTimeout(() => {
        clearInterval(checkInterval);
        console.warn('헤더 로드 타임아웃 - 헤더 없이 진행');
    }, 5000);
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

// 디버깅용 전역 함수들
window.debugHeader = function() {
    console.log('=== 헤더 디버그 정보 ===');
    console.log('헤더 요소:', document.querySelector('.header'));
    console.log('플레이스홀더:', document.getElementById('header-placeholder'));
    console.log('네비게이션 메뉴:', document.querySelector('.nav-menu'));
    console.log('검색 아이콘:', document.getElementById('searchIcon'));
    console.log('프로필 아이콘:', document.getElementById('profileIcon'));
};

// 페이지 로드 완료 후 추가 확인
window.addEventListener('load', function() {
    console.log('페이지 로드 완료 - 헤더 상태 확인');
    const header = document.querySelector('.header');
    if (header) {
        console.log('헤더가 정상적으로 로드되었습니다');
    } else {
        console.warn('헤더를 찾을 수 없습니다');
    }
});