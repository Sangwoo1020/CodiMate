// Main Page JavaScript Functions

let currentSlide = 0;
const totalSlides = 5;
let slideInterval;

document.addEventListener('DOMContentLoaded', function() {
    initializeMainPage();
});

function initializeMainPage() {
    setupSlider();
    setupFilterTabs();
    setupCoordItems();
    startAutoSlide();
    addSlideDebugInfo(); // 디버깅용 함수 추가
}

// 슬라이더 설정
function setupSlider() {
    updateSlideIndicators();
    setupTouchEvents();
    // 초기 슬라이드 위치 확인
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
        
        // 현재 활성 슬라이드에 클래스 추가 (디버깅용)
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

// 자동 슬라이드
function startAutoSlide() {
    // 기존 인터벌 제거
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    slideInterval = setInterval(() => {
        nextSlide();
    }, 4000); // 4초마다 변경 (더 빠르게 확인 가능)
    
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

// 터치 이벤트 처리
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

// 디버깅용 함수 (슬라이더 상태 확인)
function addSlideDebugInfo() {
    // 개발자 도구 콘솔에서 슬라이더 상태 확인 가능
    window.getCurrentSlide = () => currentSlide;
    window.setSlide = (index) => goToSlide(index);
    window.debugSlider = () => {
        console.log('Current slide:', currentSlide);
        console.log('Total slides:', totalSlides);
        console.log('Slider element:', document.getElementById('bannerSlider'));
        console.log('Auto slide interval:', slideInterval);
    };
    
    // 슬라이드 변경시 콘솔에 현재 색상 정보 출력
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

// 필터 탭 설정
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
    // 탭 활성화 상태 업데이트
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        const tabCategory = tab.textContent.toLowerCase();
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

    // 아이템 필터링
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

// 코디 아이템 설정
function setupCoordItems() {
    const coordItems = document.querySelectorAll('.coord-item');
    coordItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.1}s`;
        
        item.addEventListener('click', function() {
            const title = this.querySelector('.coord-title').textContent;
            showCoordDetail(title, index + 1);
        });
    });
}

function showCoordDetail(title, coordId) {
    console.log('코디 상세 보기:', title, coordId);
    alert(`"${title}" 코디의 상세 정보를 확인합니다.`);
}

// 배너 버튼 기능들
function startColorMatching() {
    console.log('색상 매칭 시작');
    alert('색상 매칭 기능으로 이동합니다!');
}

function getWeatherRecommendation() {
    console.log('날씨 기반 추천');
    alert('오늘의 날씨 기반 코디를 확인합니다!');
}

function manageCloset() {
    console.log('옷장 관리');
    alert('옷장 관리 페이지로 이동합니다!');
}

function viewHistory() {
    console.log('코디 히스토리');
    alert('코디 히스토리를 확인합니다!');
}

function getSituationCoord() {
    console.log('상황별 코디');
    alert('상황별 코디 추천을 확인합니다!');
}

// 키보드 네비게이션 지원
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
        case ' ': // 스페이스바로 자동슬라이드 토글
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

// 페이지 가시성 변경 처리 (탭 전환 등)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

// 마우스 호버시 자동 슬라이드 일시정지
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.main-banner');
    if (banner) {
        banner.addEventListener('mouseenter', stopAutoSlide);
        banner.addEventListener('mouseleave', startAutoSlide);
    }
});

// 슬라이더 초기화 확인
window.addEventListener('load', function() {
    console.log('Page loaded, checking slider...');
    const slider = document.getElementById('bannerSlider');
    if (slider) {
        console.log('Slider found, current transform:', slider.style.transform);
        // 강제로 첫 번째 슬라이드로 이동
        updateSlider();
        console.log('Slider initialized to slide 0');
    } else {
        console.error('Slider not found on page load!');
    }
});

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