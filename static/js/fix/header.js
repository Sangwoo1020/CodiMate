// Header JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
});

function initializeHeader() {
    // 스크롤 이벤트 처리
    handleScrollEffect();
    
    // 모바일 메뉴 토글
    setupMobileMenu();
    
    // 검색 기능
    setupSearchFeature();
    
    // 현재 페이지 하이라이트
    highlightCurrentPage();
}

// 스크롤 효과
function handleScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 모바일 메뉴 설정
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
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
    }
}

// 검색 기능 설정
function setupSearchFeature() {
    const searchIcon = document.getElementById('searchIcon');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    
    // 검색창 열기
    if (searchIcon && searchOverlay) {
        searchIcon.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            setTimeout(() => {
                searchInput.focus();
            }, 300);
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
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
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
    const searchInput = document.getElementById('searchInput');
    
    searchOverlay.classList.remove('active');
    searchInput.value = '';
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

// 현재 페이지 하이라이트
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || 
            (currentPath === '/' && linkPath.includes('mainpage.html'))) {
            link.classList.add('active');
        }
    });
}

// 프로필 아이콘 클릭 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profileIcon');
    
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            // 프로필 메뉴 또는 마이페이지로 이동
            showProfileMenu();
        });
    }
});

function showProfileMenu() {
    // 간단한 프로필 메뉴 표시 (실제로는 드롭다운 메뉴를 구현할 수 있음)
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
    window.location.href = 'mainpage.html';
}

function navigateToCoordination() {
    window.location.href = 'coordination.html';
}

function navigateToCloset() {
    window.location.href = 'closet.html';
}

function navigateToColorMatching() {
    window.location.href = 'color-matching.html';
}

function navigateToMyPage() {
    window.location.href = 'mypage.html';
}

function navigateToHistory() {
    window.location.href = 'history.html';
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