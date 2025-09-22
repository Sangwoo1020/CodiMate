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
}

// 슬라이더 설정
function setupSlider() {
    updateSlideIndicators();
    
    // 터치 이벤트 처리 (모바일)
    setupTouchEvents();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    updateSlideIndicators();
    restartAutoSlide();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    updateSlideIndicators();
    restartAutoSlide();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
    updateSlideIndicators();
    restartAutoSlide();
}

function updateSlider() {
    const slider = document.getElementById('bannerSlider');
    if (slider) {
        slider.style.transform = `translateX(-${currentSlide * 20}%)`;
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
    slideInterval = setInterval(nextSlide, 6000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
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
        // 초기 애니메이션
        item.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.1}s`;
        
        // 클릭 이벤트
        item.addEventListener('click', function() {
            const title = this.querySelector('.coord-title').textContent;
            showCoordDetail(title, index + 1);
        });

        // 자세히 보기 버튼
        const detailBtn = item.querySelector('.view-detail-btn');
        if (detailBtn) {
            detailBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const title = item.querySelector('.coord-title').textContent;
                showCoordDetail(title, index + 1);
            });
        }
    });
}

function showCoordDetail(title, coordId) {
    // 모달이나 상세 페이지로 이동
    console.log('코디 상세 보기:', title, coordId);
    
    // 임시 알림 (실제로는 모달이나 페이지 이동 구현)
    alert(`"${title}" 코디의 상세 정보를 확인합니다.`);
    
    // TODO: 실제 구현시
    // window.location.href = `coord-detail.html?id=${coordId}`;
    // 또는 모달 열기
}

// 배너 버튼 기능들
function startColorMatching() {
    console.log('색상 매칭 시작');
    // 색상 매칭 페이지로 이동 또는 모달 열기
    window.location.href = 'color-matching.html';
}

function getWeatherRecommendation() {
    console.log('날씨 기반 추천');
    // 현재 위치 기반 날씨 코디 추천
    getCurrentLocationWeather();
}

function manageCloset() {
    console.log('옷장 관리');
    window.location.href = 'closet.html';
}

function viewHistory() {
    console.log('코디 히스토리');
    window.location.href = 'history.html';
}

function getSituationCoord() {
    console.log('상황별 코디');
    window.location.href = 'situation-coord.html';
}

// 날씨 API 연동 (예시)
async function getCurrentLocationWeather() {
    try {
        // 사용자 위치 가져오기
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        
        // 날씨 API 호출 (실제 API 키 필요)
        const weatherData = await fetchWeatherData(latitude, longitude);
        
        // 날씨 기반 코디 추천
        showWeatherBasedCoord(weatherData);
        
    } catch (error) {
        console.error('위치 또는 날씨 정보를 가져올 수 없습니다:', error);
        // 기본 서울 날씨로 대체
        showDefaultWeatherCoord();
    }
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('지오로케이션을 지원하지 않는 브라우저입니다.'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: true
        });
    });
}

async function fetchWeatherData(lat, lon) {
    // 실제 날씨 API 호출 (OpenWeatherMap 등)
    // const apiKey = 'YOUR_API_KEY';
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`);
    // return await response.json();
    
    // 임시 데이터
    return {
        main: { temp: 22, humidity: 65 },
        weather: [{ main: 'Clear', description: '맑음' }],
        name: '서울'
    };
}

function showWeatherBasedCoord(weatherData) {
    const temp = weatherData.main.temp;
    const weather = weatherData.weather[0].main;
    
    let message = `현재 ${weatherData.name}의 기온은 ${temp}°C입니다.\n`;
    
    if (temp >= 25) {
        message += '더운 날씨에 적합한 시원한 코디를 추천합니다!';
    } else if (temp >= 20) {
        message += '쾌적한 날씨에 적합한 가벼운 코디를 추천합니다!';
    } else if (temp >= 15) {
        message += '선선한 날씨에 적합한 가디건이나 얇은 재킷을 추천합니다!';
    } else {
        message += '추운 날씨에 적합한 따뜻한 코디를 추천합니다!';
    }
    
    alert(message);
}

function showDefaultWeatherCoord() {
    alert('현재 서울 기준으로 오늘의 날씨 코디를 추천합니다!');
}

// 애니메이션 CSS 추가
const animationCSS = `
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
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

// 스타일 태그에 애니메이션 추가
if (!document.getElementById('mainpage-animations')) {
    const style = document.createElement('style');
    style.id = 'mainpage-animations';
    style.textContent = animationCSS;
    document.head.appendChild(style);
}

// 스크롤 애니메이션
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // 관찰할 요소들
    const animatedElements = document.querySelectorAll('.coord-item, .section-title, .filter-tabs');
    animatedElements.forEach(el => observer.observe(el));
}

// 페이지 로드 완료 후 실행
window.addEventListener('load', function() {
    setupScrollAnimations();
    
    // 초기 로딩 애니메이션
    const mainBanner = document.querySelector('.main-banner');
    if (mainBanner) {
        mainBanner.style.animation = 'slideInFromLeft 1s ease forwards';
    }
    
    const recommendations = document.querySelector('.recommendations');
    if (recommendations) {
        recommendations.style.animation = 'slideInFromRight 1s ease forwards 0.3s';
        recommendations.style.opacity = '0';
        setTimeout(() => {
            recommendations.style.opacity = '1';
        }, 300);
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

// 로컬 스토리지 활용 (사용자 선호도 저장)
function saveUserPreference(key, value) {
    try {
        localStorage.setItem(`codiMate_${key}`, JSON.stringify(value));
    } catch (error) {
        console.warn('로컬 스토리지 저장 실패:', error);
    }
}

function getUserPreference(key, defaultValue = null) {
    try {
        const stored = localStorage.getItem(`codiMate_${key}`);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
        console.warn('로컬 스토리지 읽기 실패:', error);
        return defaultValue;
    }
}

// 사용자 선호 카테고리 저장
function savePreferredCategory(category) {
    saveUserPreference('preferredCategory', category);
}

function loadPreferredCategory() {
    const preferred = getUserPreference('preferredCategory', 'all');
    filterCoords(preferred);
}

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('페이지 에러:', e.error);
    // 에러 로깅 서비스로 전송 (실제 구현시)
});

// 성능 최적화 - 이미지 지연 로딩
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
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
        case 'Escape':
            // 모달이나 오버레이 닫기
            closeAllModals();
            break;
    }
});

function closeAllModals() {
    // 모든 모달이나 오버레이 닫기
    const modals = document.querySelectorAll('.modal, .overlay');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
}

// 다크 모드 토글 (선택사항)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    saveUserPreference('darkMode', isDark);
}

function loadDarkModePreference() {
    const isDark = getUserPreference('darkMode', false);
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
}

// 초기화 함수 확장
function initializeMainPage() {
    setupSlider();
    setupFilterTabs();
    setupCoordItems();
    startAutoSlide();
    setupLazyLoading();
    loadDarkModePreference();
    loadPreferredCategory();
    
    // 페이지 성능 측정
    measurePagePerformance();
}

function measurePagePerformance() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`페이지 로드 시간: ${loadTime}ms`);
            
            // 성능 데이터 서버로 전송 (실제 구현시)
            // sendPerformanceData(loadTime);
        }, 0);
    });
}