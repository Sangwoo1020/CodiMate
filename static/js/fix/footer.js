// Footer JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    initializeFooter();
});

function initializeFooter() {
    setupScrollToTop();
    setupFooterAnimations();
    updateCurrentYear();
    setupSocialLinks();
    setupFooterLinks();
}

// 맨 위로 스크롤 버튼
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }, 100));

    // 클릭 이벤트
    scrollToTopBtn.addEventListener('click', scrollToTop);
}

function scrollToTop() {
    const scrollOptions = {
        top: 0,
        behavior: 'smooth'
    };

    // 부드러운 스크롤 지원 확인
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo(scrollOptions);
    } else {
        // 폴백: 애니메이션으로 스크롤
        smoothScrollPolyfill();
    }
}

function smoothScrollPolyfill() {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 800;

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition * (1 - easeProgress));

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// 푸터 애니메이션
function setupFooterAnimations() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFooterSections();
                footerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    footerObserver.observe(footer);
}

function animateFooterSections() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    footerSections.forEach((section, index) => {
        setTimeout(() => {
            section.style.animation = 'fadeInUp 0.8s ease forwards';
        }, index * 150);
    });

    // 소셜 링크 애니메이션
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.animation = 'bounceIn 0.6s ease forwards';
        }, 800 + (index * 100));
    });
}

// 현재 연도 업데이트
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // 저작권 텍스트 업데이트
    const copyrightText = document.querySelector('.footer-bottom-left p');
    if (copyrightText && copyrightText.textContent.includes('2025')) {
        copyrightText.textContent = copyrightText.textContent.replace('2025', currentYear);
    }
}

// 소셜 링크 설정
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.getAttribute('aria-label');
            handleSocialLinkClick(platform);
        });

        // 호버 효과 강화
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

function handleSocialLinkClick(platform) {
    const socialUrls = {
        'Instagram': 'https://instagram.com/codimate_official',
        'Twitter': 'https://twitter.com/codimate_kr',
        'Facebook': 'https://facebook.com/codimate.kr'
    };

    const url = socialUrls[platform];
    if (url) {
        // 실제 소셜 미디어 계정으로 이동
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        // 임시 알림
        alert(`${platform} 페이지 준비 중입니다!`);
    }

    // 클릭 이벤트 분석 (실제 구현시 사용)
    trackSocialClick(platform);
}

function trackSocialClick(platform) {
    // 구글 애널리틱스나 다른 분석 도구로 전송
    console.log(`Social click tracked: ${platform}`);
    
    // 실제 구현 예시:
    // gtag('event', 'click', {
    //     event_category: 'social',
    //     event_label: platform
    // });
}

// 푸터 링크 설정
function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-legal a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 개발 중인 페이지 처리
            if (href && !href.startsWith('http') && !pageExists(href)) {
                e.preventDefault();
                showPageInDevelopment(this.textContent);
            }
        });

        // 링크 호버 효과
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

function pageExists(href) {
    // 실제 존재하는 페이지 목록
    const existingPages = [
        'mainpage.html',
        'coordination.html',
        'color-matching.html',
        'closet.html',
        'mypage.html',
        'history.html'
    ];

    return existingPages.includes(href);
}

function showPageInDevelopment(pageName) {
    const modal = createDevelopmentModal(pageName);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
}

function createDevelopmentModal(pageName) {
    const modal = document.createElement('div');
    modal.className = 'dev-modal';
    modal.innerHTML = `
        <div class="dev-modal-content">
            <h3>🚧 개발 중인 페이지</h3>
            <p><strong>"${pageName}"</strong> 페이지는 현재 개발 중입니다.</p>
            <p>빠른 시일 내에 서비스를 제공하겠습니다.</p>
            <button onclick="closeDevelopmentModal()" class="dev-modal-close">확인</button>
        </div>
    `;

    // 모달 스타일
    const style = document.createElement('style');
    style.textContent = `
        .dev-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .dev-modal.active {
            opacity: 1;
        }
        
        .dev-modal-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .dev-modal.active .dev-modal-content {
            transform: scale(1);
        }
        
        .dev-modal h3 {
            color: #ff4757;
            margin-bottom: 20px;
            font-size: 1.5rem;
        }
        
        .dev-modal p {
            color: #333;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .dev-modal-close {
            background: #ff4757;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 20px;
            transition: background 0.3s ease;
        }
        
        .dev-modal-close:hover {
            background: #e84043;
        }
    `;

    document.head.appendChild(style);
    return modal;
}

function closeDevelopmentModal() {
    const modal = document.querySelector('.dev-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 이메일 구독 기능 (선택사항)
function setupNewsletterSubscription() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        subscribeToNewsletter(email);
    });
}

function subscribeToNewsletter(email) {
    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
    }

    // 구독 처리 (실제로는 서버로 전송)
    console.log('Newsletter subscription:', email);
    alert('뉴스레터 구독이 완료되었습니다!');
    
    // 폼 초기화
    document.querySelector('.newsletter-form input[type="email"]').value = '';
}

// 푸터 정보 동적 업데이트
function updateFooterInfo() {
    // 팀 정보 업데이트
    const teamInfo = {
        members: ['김상우', '김동석', '김도현', '김서진'],
        professor: '장재영',
        university: '한성대학교',
        course: '데이터베이스 설계',
        year: new Date().getFullYear()
    };

    updateTeamDisplay(teamInfo);
}

function updateTeamDisplay(teamInfo) {
    const teamInfoElement = document.querySelector('.team-info');
    if (teamInfoElement) {
        teamInfoElement.innerHTML = `
            <span>팀원: ${teamInfo.members.join(', ')}</span>
            <span class="separator">|</span>
            <span>지도교수: ${teamInfo.professor}</span>
        `;
    }
}

// 유틸리티 함수
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 접근성 개선
function enhanceAccessibility() {
    // 키보드 네비게이션
    const focusableElements = document.querySelectorAll('.footer a, .footer button');
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // 스크린 리더 지원
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.setAttribute('aria-label', '페이지 맨 위로 이동');
        scrollToTopBtn.setAttribute('title', '페이지 맨 위로 이동');
    }
}

// 애니메이션 CSS 추가
const footerAnimationCSS = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

// 스타일 추가
if (!document.getElementById('footer-animations')) {
    const style = document.createElement('style');
    style.id = 'footer-animations';
    style.textContent = footerAnimationCSS;
    document.head.appendChild(style);
}

// 초기화 완료 후 추가 설정
window.addEventListener('load', function() {
    enhanceAccessibility();
    updateFooterInfo();
});