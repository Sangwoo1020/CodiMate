// Main Page JavaScript Functions

// ==========================================================
// 🚀 0. 모달 데이터 및 유틸리티 함수 정의 (mainpage.js 최상단)
// ==========================================================

// 메인 페이지의 코디 데이터 (ID 1부터 8까지)
const MAIN_PAGE_COORDS = [
    {
        id: 1,
        title: '봄날 캐주얼 룩',
        description: '화이트 셔츠 + 데님 팬츠 + 스니커즈',
        image: '/static/image/mainpage/sample1.png',
        colors: ['#FFFFFF', '#4682B4', '#D2B48C'], // 흰색, 데님, 베이지
        matchScore: 96,
        tags: ['casual', 'spring', 'comfortable']
    },
    {
        id: 2,
        title: '클래식 오피스 룩',
        description: '네이비 블레이저 + 화이트 셔츠 + 슬랙스',
        image: '/static/image/mainpage/sample2.png',
        colors: ['#1E3A8A', '#FFFFFF', '#36454F'], // 네이비, 흰색, 차콜
        matchScore: 92,
        tags: ['business', 'classic', 'elegant']
    },
    {
        id: 3,
        title: '로맨틱 데이트 룩',
        description: '플라워 원피스 + 가디건 + 플랫슈즈',
        image: '/static/image/mainpage/sample3.png',
        colors: ['#FFC0CB', '#FFFFFF', '#D2B48C'], // 핑크, 흰색, 베이지
        matchScore: 98,
        tags: ['date', 'romantic', 'spring']
    },
    {
        id: 4,
        title: '미니멀 스트리트 룩',
        description: '오버사이즈 후드 + 와이드 팬츠 + 운동화',
        image: '/static/image/mainpage/sample4.png',
        colors: ['#000000', '#A9A9A9', '#D3D3D3'], // 검정, 다크그레이, 라이트그레이
        matchScore: 86,
        tags: ['casual', 'modern', 'comfortable']
    },
    {
        id: 5,
        title: '엘레간트 포멀',
        description: '블랙 원피스 + 하이힐 + 클러치백',
        image: '/static/image/mainpage/sample5.png',
        colors: ['#000000', '#D3D3D3', '#8B4513'], // 검정, 그레이, 브라운
        matchScore: 94,
        tags: ['formal', 'elegant', 'winter']
    },
    {
        id: 6,
        title: '모던 비즈니스',
        description: '베이지 트렌치 + 블라우스 + 펌프스',
        image: '/static/image/mainpage/sample6.png',
        colors: ['#D2B48C', '#FFFFFF', '#8B4513'], // 베이지, 흰색, 브라운
        matchScore: 90,
        tags: ['business', 'modern', 'autumn']
    },
    {
        id: 7,
        title: '편안한 주말 룩',
        description: '니트 탑 + 청바지 + 로퍼',
        image: '/static/image/mainpage/sample7.png',
        colors: ['#A9A9A9', '#4682B4', '#8B4513'], // 그레이, 데님, 브라운
        matchScore: 84,
        tags: ['casual', 'comfortable', 'autumn']
    },
    {
        id: 8,
        title: '캐주얼 데이트 룩',
        description: '스웨터 + 미니스커트 + 부츠',
        image: '/static/image/mainpage/sample8.png',
        colors: ['#800020', '#D2B48C', '#000000'], // 버건디, 베이지, 검정
        matchScore: 95,
        tags: ['date', 'casual', 'winter']
    }
];

const TAG_NAMES_MAP = {
    'elegant': '우아한', 'autumn': '가을', 'business': '비즈니스',
    'classic': '클래식', 'romantic': '로맨틱', 'spring': '봄',
    'modern': '모던', 'winter': '겨울', 'casual': '캐주얼',
    'energetic': '활기찬', 'warm': '따뜻한', 'comfortable': '편안한',
    'sophisticated': '세련된', 'bright': '밝은', 'soft': '부드러운',
    'feminine': '여성스러운', 'fresh': '신선한', 'summer': '여름',
    'luxury': '고급스러운', 'natural': '자연스러운', 'calm': '차분한',
    'cool': '시원한', 'chic': '시크한', 'date': '데이트', 'formal': '포멀'
};

let currentSlide = 0;
const totalSlides = 5;
let slideInterval;

// ==========================================================
// 1. 초기화 및 이벤트 핸들러
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeMainPage();
});

function initializeMainPage() {
    setupSlider();
    setupFilterTabs();
    setupCoordItems(); 
    startAutoSlide();
    addSlideDebugInfo(); 
}

function itemClickHandler() {
    const itemElements = Array.from(document.querySelectorAll('.coord-grid .coord-item'));
    const itemIndex = itemElements.indexOf(this) + 1; 
    
    showMainPageCoordDetail(itemIndex); 
}

function setupCoordItems() {
    const coordItems = document.querySelectorAll('.coord-item');
    coordItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.1}s`;
        
        // ⭐️ 클릭 이벤트 핸들러 연결 ⭐️
        item.removeEventListener('click', itemClickHandler); 
        item.addEventListener('click', itemClickHandler);
    });
}

function showMainPageCoordDetail(coordId) {
    const coord = MAIN_PAGE_COORDS.find(c => c.id === coordId);
    
    if (coord) {
        showCoordDetailModal(coord);
    } else {
        showNotification(`코디 #${coordId}의 상세 정보를 찾을 수 없습니다.`);
    }
}

// ==========================================================
// 2. 모달 표시 로직 (스크린샷 디자인 반영)
// ==========================================================

function showCoordDetailModal(coord) {
    const existingModal = document.querySelector('.coord-detail-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 데이터 가공 (태그, 별점)
    const colorsHtml = coord.colors.map(color => 
        `<div class="modal-color-circle" style="background-color: ${color};"></div>`
    ).join('');
    
    const tagsHtml = coord.tags.map(tag => {
        return `<span class="modal-tag">${TAG_NAMES_MAP[tag] || tag}</span>`;
    }).join('');

    const fullStars = Math.floor(coord.matchScore / 20);
    const emptyStars = 5 - fullStars;
    const starsHtml = '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    
    // ⭐️ 모달 HTML 마크업 (스크린샷과 크기/디자인 통일) ⭐️
    const modalHtml = `
        <div class="coord-detail-modal active" id="coordDetailModal">
            <div class="modal-content-screenshot"> 
                
                <button class="modal-close-btn" onclick="closeCoordDetailModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                
                <div class="modal-image-section" style="background-image: url('${coord.image}');">
                    <div class="modal-image-overlay">
                        <h2 class="modal-coord-title-screenshot">${coord.title}</h2>
                        <span class="modal-coord-subtitle-screenshot">코디 추천</span>
                    </div>
                </div>
                
                <div class="modal-info-section">
                    
                    <div class="info-group">
                        <span class="info-label">코디 구성</span>
                        <span class="info-value">${coord.description}</span>
                    </div>
                    
                    <div class="info-group">
                        <span class="info-label">매칭도</span>
                        <div class="info-rating">
                            <span class="info-stars">${starsHtml}</span>
                            <span class="info-score">${coord.matchScore}%</span>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <span class="info-label">사용된 색상</span>
                        <div class="info-colors-palette">
                            ${colorsHtml}
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <span class="info-label">코디 번호</span>
                        <span class="info-value">#${coord.id}</span>
                    </div>

                    <div class="tip-separator"></div>
                    
                    <h3 class="styling-tip-title">스타일링 팁</h3>
                    <p class="styling-tip-text">
                        이 코디는 ${coord.tags.map(t => TAG_NAMES_MAP[t] || t).join(', ')} 스타일을 중심으로 추천됩니다. 
                        ${coord.description}의 조합은 ${coord.matchScore}%의 높은 만족도를 자랑합니다.
                    </p>
                    <div class="styling-tip-tags">
                        ${tagsHtml}
                    </div>
                </div>
                
                <div class="modal-action-buttons">
                    <button class="action-btn-screenshot favorite-btn" id="favoriteBtn-${coord.id}" onclick="toggleFavorite(${coord.id})">
                        <span id="favoriteText-${coord.id}">♡ 즐겨찾기</span>
                    </button>
                    <button class="action-btn-screenshot close-btn" onclick="closeCoordDetailModal()">
                    닫기
                </button>
                </div>
            </div>
        </div>
    `;
    
    // 모달 추가 및 이벤트 처리
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleModalEsc);
}


// ==========================================================
// 3. 슬라이더 및 필터 함수 (기존 로직)
// ==========================================================

function setupSlider() {
    updateSlideIndicators();
    setupTouchEvents();
    console.log('Initial slide:', currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    updateSlideIndicators();
    restartAutoSlide();
    console.log('Next slide:', currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    updateSlideIndicators();
    restartAutoSlide();
    console.log('Previous slide:', currentSlide);
}

function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
        currentSlide = slideIndex;
        updateSlider();
        updateSlideIndicators();
        restartAutoSlide();
        console.log('Go to slide:', currentSlide);
    }
}

function updateSlider() {
    const slider = document.getElementById('bannerSlider');
    if (slider) {
        const translateX = -currentSlide * 20; // 각 슬라이드는 20%씩
        slider.style.transform = `translateX(${translateX}%)`;
        console.log(`Slider moved to: ${translateX}%`);
        
        const slides = document.querySelectorAll('.banner-slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    } else {
        console.error('Banner slider not found!');
    }
}

function updateSlideIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function startAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    slideInterval = setInterval(() => {
        nextSlide();
    }, 4000); 
    
    console.log('Auto slide started');
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
        console.log('Auto slide stopped');
    }
}

function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

function setupTouchEvents() {
    const banner = document.querySelector('.main-banner');
    if (!banner) return;

    let startX = 0;
    let endX = 0;

    banner.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });

    banner.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        startAutoSlide();
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }
}

function addSlideDebugInfo() {
    window.getCurrentSlide = () => currentSlide;
    window.setSlide = (index) => goToSlide(index);
    window.debugSlider = () => {
        console.log('Current slide:', currentSlide);
        console.log('Total slides:', totalSlides);
        console.log('Slider element:', document.getElementById('bannerSlider'));
        console.log('Auto slide interval:', slideInterval);
    };
    
    const slideColors = [
        'Purple (AI 색상 매칭)',
        'Pink (날씨 기반 추천)', 
        'Blue (나만의 옷장)',
        'Green (코디 히스토리)',
        'Orange (상황별 추천)'
    ];
    
    window.showCurrentSlideInfo = () => {
        console.log(`현재 슬라이드: ${currentSlide + 1}/5 - ${slideColors[currentSlide]}`);
    };
}

function setupFilterTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.textContent.toLowerCase();
            const categoryMap = {
                '전체': 'all',
                '캐주얼': 'casual',
                '비즈니스': 'business',
                '데이트': 'date',
                '포멀': 'formal'
            };
            filterCoords(categoryMap[this.textContent] || 'all');
        });
    });
}

function filterCoords(category) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        const categoryMap = {
            '전체': 'all',
            '캐주얼': 'casual',
            '비즈니스': 'business',
            '데이트': 'date',
            '포멀': 'formal'
        };
        if (categoryMap[tab.textContent] === category) {
            tab.classList.add('active');
        }
    });

    const items = document.querySelectorAll('.coord-item');
    items.forEach((item, index) => {
        const shouldShow = category === 'all' || item.dataset.category === category;
        
        if (shouldShow) {
            item.style.display = 'block';
            item.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        } else {
            item.style.display = 'none';
        }
    });
}

// 배너 버튼 기능들
function startColorMatching() {
    window.location.href = '/templates/codi-recommend/codi-recommend.html?option=color#recommend-options';
}

function getWeatherRecommendation() {
    window.location.href = '/templates/codi-recommend/codi-recommend.html?option=weather#recommend-options';
}

function getSituationCoord() {
    window.location.href = '/templates/codi-recommend/codi-recommend.html?option=situation#recommend-options';
}

function manageCloset() {
    window.location.href = '/templates/closet/closet.html';
}

function viewHistory() {
    window.location.href = '/templates/codi-history/codi-history.html';
}

// 키보드/가시성 이벤트
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (e.target.tagName !== 'INPUT') {
                previousSlide();
                e.preventDefault();
            }
            break;
        case 'ArrowRight':
            if (e.target.tagName !== 'INPUT') {
                nextSlide();
                e.preventDefault();
            }
            break;
        case ' ': 
            if (e.target.tagName !== 'INPUT') {
                if (slideInterval) {
                    stopAutoSlide();
                    console.log('Auto slide paused');
                } else {
                    startAutoSlide();
                    console.log('Auto slide resumed');
                }
                e.preventDefault();
            }
            break;
    }
});

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.main-banner');
    if (banner) {
        banner.addEventListener('mouseenter', stopAutoSlide);
        banner.addEventListener('mouseleave', startAutoSlide);
    }
});

window.addEventListener('load', function() {
    console.log('Page loaded, checking slider...');
    const slider = document.getElementById('bannerSlider');
    if (slider) {
        console.log('Slider found, current transform:', slider.style.transform);
        updateSlider();
        console.log('Slider initialized to slide 0');
    } else {
        console.error('Slider not found on page load!');
    }
});

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


// ==========================================================
// 4. 모달 유틸리티 및 이벤트 처리 함수 (재사용 로직)
// ==========================================================

function closeCoordDetailModal() {
    const modal = document.querySelector('.coord-detail-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
    document.removeEventListener('keydown', handleModalEsc);
}

function handleModalEsc(e) {
    if (e.key === 'Escape') {
        closeCoordDetailModal();
    }
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('coord-detail-modal')) {
        closeCoordDetailModal();
    }
});

function toggleFavorite(id) {
    const btn = document.getElementById(`favoriteBtn-${id}`);
    const text = document.getElementById(`favoriteText-${id}`);
    
    if (btn.classList.contains('added')) {
        btn.classList.remove('added');
        text.textContent = '♡ 즐겨찾기';
        showNotification('즐겨찾기에서 제거되었습니다');
    } else {
        btn.classList.add('added');
        text.textContent = '♥ 즐겨찾기 완료';
        showNotification('즐겨찾기에 추가되었습니다!');
    }
}

function shareCoord(id) {
    showNotification('코디 링크가 클립보드에 복사되었습니다!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'coord-notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(250, 112, 154, 0.3);
        z-index: 100000;
        animation: slideUpNotif 0.3s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDownNotif 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// 알림 애니메이션 스타일
const style = document.createElement('style');
style.textContent += `
    @keyframes slideUpNotif {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideDownNotif {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }
`;
document.head.appendChild(style);