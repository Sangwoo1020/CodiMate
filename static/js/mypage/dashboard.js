// Dashboard JavaScript

// 전역 변수
let userProfile = {
    name: '김상우',
    personalColor: null,
    favoriteColors: ['#1e3a8a', '#ffffff', '#374151', '#d2b48c']
};

let clothingStats = {
    topCount: 8,
    bottomCount: 6,
    wishlistCount: 3,
    recentOutfits: 12
};

// 샘플 데이터
const sampleRecentOutfits = [
    {
        id: 1,
        date: '2025.01.25',
        top: { name: '화이트 셔츠', color: '#ffffff' },
        bottom: { name: '네이비 슬랙스', color: '#1e3a8a' },
        rating: 5,
        weather: '맑음 22°C'
    },
    {
        id: 2,
        date: '2025.01.24',
        top: { name: '회색 니트', color: '#6b7280' },
        bottom: { name: '블랙 청바지', color: '#1f2937' },
        rating: 4,
        weather: '흐림 18°C'
    },
    {
        id: 3,
        date: '2025.01.23',
        top: { name: '베이지 셔츠', color: '#d2b48c' },
        bottom: { name: '차콜 슬랙스', color: '#374151' },
        rating: 5,
        weather: '비 15°C'
    }
];

const personalColorData = {
    '봄웜톤': {
        colors: ['#FFB347', '#98FB98', '#FFE4B5'],
        description: '밝고 따뜻한 색상'
    },
    '여름쿨톤': {
        colors: ['#B0C4DE', '#DDA0DD', '#F0F8FF'],
        description: '부드럽고 차가운 색상'
    },
    '가을웜톤': {
        colors: ['#D2691E', '#8B4513', '#DAA520'],
        description: '깊고 따뜻한 색상'
    },
    '겨울쿨톤': {
        colors: ['#4169E1', '#800080', '#000000'],
        description: '선명하고 차가운 색상'
    }
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// 대시보드 초기화
function initializeDashboard() {
    loadUserProfile();
    loadClothingStats();
    loadRecentOutfits();
    loadPersonalColorSection();
    setupEventListeners();
    
    console.log('Dashboard initialized');
}

// 사용자 프로필 로드
function loadUserProfile() {
    // 로컬 스토리지에서 사용자 데이터 로드
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        userProfile = { ...userProfile, ...JSON.parse(savedProfile) };
    }
    
    // DOM 업데이트
    document.getElementById('userName').textContent = userProfile.name;
    
    const personalColorElement = document.getElementById('userPersonalColor');
    if (userProfile.personalColor) {
        personalColorElement.textContent = userProfile.personalColor;
        personalColorElement.style.color = '#667eea';
    } else {
        personalColorElement.textContent = '퍼스널 컬러 미설정';
        personalColorElement.style.color = '#718096';
    }
}

// 옷장 통계 로드
function loadClothingStats() {
    // 로컬 스토리지에서 옷장 데이터 로드
    const tops = JSON.parse(localStorage.getItem('tops')) || [];
    const bottoms = JSON.parse(localStorage.getItem('bottoms')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    clothingStats.topCount = tops.length;
    clothingStats.bottomCount = bottoms.length;
    clothingStats.wishlistCount = wishlist.length;
    
    // DOM 업데이트
    document.getElementById('topCount').textContent = clothingStats.topCount;
    document.getElementById('bottomCount').textContent = clothingStats.bottomCount;
    document.getElementById('wishlistCount').textContent = clothingStats.wishlistCount;
    document.getElementById('recentOutfits').textContent = clothingStats.recentOutfits;
    
    // 카테고리별 통계 업데이트
    updateCategoryStats(tops, bottoms);
}

// 카테고리별 통계 업데이트
function updateCategoryStats(tops, bottoms) {
    // 실제 데이터가 있다면 분석, 없다면 샘플 데이터 사용
    if (tops.length === 0 && bottoms.length === 0) {
        console.log('Using sample category data');
        return;
    }
    
    // TODO: 실제 카테고리 분석 로직 구현
    console.log('Category analysis:', { tops: tops.length, bottoms: bottoms.length });
}

// 최근 착용 코디 로드
function loadRecentOutfits() {
    const recentOutfitsGrid = document.getElementById('recentOutfitsGrid');
    if (!recentOutfitsGrid) return;
    
    // 로컬 스토리지에서 코디 기록 로드
    const outfitHistory = JSON.parse(localStorage.getItem('outfitHistory')) || sampleRecentOutfits;
    
    recentOutfitsGrid.innerHTML = '';
    
    // 최근 3개만 표시
    const recentThree = outfitHistory.slice(0, 3);
    
    recentThree.forEach(outfit => {
        const outfitCard = document.createElement('div');
        outfitCard.className = 'outfit-card';
        outfitCard.innerHTML = `
            <div class="outfit-image">
                <div class="outfit-items">
                    <div class="outfit-item top" style="background: linear-gradient(135deg, ${outfit.top.color}, ${adjustColor(outfit.top.color, -20)});">
                        <span>${outfit.top.name}</span>
                    </div>
                    <div class="outfit-item bottom" style="background: linear-gradient(135deg, ${outfit.bottom.color}, ${adjustColor(outfit.bottom.color, -20)});">
                        <span>${outfit.bottom.name}</span>
                    </div>
                </div>
            </div>
            <div class="outfit-info">
                <div class="outfit-date">${outfit.date}</div>
                <div class="outfit-rating">
                    <span class="stars">${'★'.repeat(outfit.rating)}${'☆'.repeat(5 - outfit.rating)}</span>
                    <span class="rating-text">만족도 ${outfit.rating}</span>
                </div>
                <div class="outfit-weather">${outfit.weather}</div>
            </div>
        `;
        
        outfitCard.addEventListener('click', () => viewOutfitDetail(outfit.id));
        recentOutfitsGrid.appendChild(outfitCard);
    });
    
    // 코디가 없을 때 메시지 표시
    if (recentThree.length === 0) {
        recentOutfitsGrid.innerHTML = `
            <div class="no-outfits-message">
                <i class="fas fa-tshirt" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 15px;"></i>
                <p>아직 착용한 코디가 없습니다</p>
                <button onclick="goToCoordination()" class="select-color-btn">코디 추천받기</button>
            </div>
        `;
    }
}

// 퍼스널 컬러 섹션 로드
function loadPersonalColorSection() {
    const personalColorSection = document.getElementById('personalColorSection');
    if (!personalColorSection) return;
    
    if (userProfile.personalColor) {
        const colorData = personalColorData[userProfile.personalColor];
        personalColorSection.innerHTML = `
            <div class="personal-color-selected">
                <div class="personal-color-display">
                    <div class="personal-color-circle" style="background: linear-gradient(135deg, ${colorData.colors[0]}, ${colorData.colors[1]}, ${colorData.colors[2]});"></div>
                    <div class="personal-color-name">${userProfile.personalColor}</div>
                    <div class="personal-color-desc">${colorData.description}</div>
                </div>
                <div class="personal-color-info">
                    <h4>추천 색상 팔레트</h4>
                    <p>당신의 퍼스널 컬러에 맞는 색상들로 코디할 때 더욱 빛나는 외모를 연출할 수 있어요!</p>
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        ${colorData.colors.map(color => `
                            <div class="color-circle" style="background-color: ${color}; width: 30px; height: 30px;"></div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    } else {
        personalColorSection.innerHTML = `
            <div class="personal-color-not-set">
                <div class="personal-color-placeholder">
                    <i class="fas fa-palette"></i>
                    <p>퍼스널 컬러를 선택하지 않았습니다</p>
                    <button class="select-color-btn" onclick="goToPersonalColorTest()">선택하기</button>
                </div>
            </div>
        `;
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 사이드바 네비게이션 클릭 이벤트
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
    
    // 반응형 사이드바 토글 (모바일)
    setupMobileSidebar();
}

// 모바일 사이드바 설정
function setupMobileSidebar() {
    if (window.innerWidth <= 1024) {
        const sidebar = document.querySelector('.sidebar');
        let sidebarToggle = document.getElementById('sidebarToggle');
        
        if (!sidebarToggle) {
            sidebarToggle = document.createElement('button');
            sidebarToggle.id = 'sidebarToggle';
            sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
            sidebarToggle.style.cssText = `
                position: fixed;
                top: 90px;
                left: 20px;
                z-index: 101;
                background: #667eea;
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 1.2rem;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(sidebarToggle);
        }
        
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
        
        // 사이드바 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }
}

// 유틸리티 함수들
function adjustColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// 네비게이션 함수들
function viewAllOutfits() {
    // TODO: 코디 히스토리 페이지로 이동
    alert('코디 히스토리 페이지로 이동합니다');
    // window.location.href = '/templates/history/history.html';
}

function goToCloset() {
    window.location.href = '/templates/closet/closet.html';
}

function editFavoriteColors() {
    // 색상 편집 모달 표시
    showColorEditModal();
}

function goToPersonalColorTest() {
    window.location.href = '/templates/mypage/setting.html#personal-color';
}

function goToCoordination() {
    window.location.href = '/templates/codi-recommend/codi-recommend.html';
}

function viewOutfitDetail(outfitId) {
    // TODO: 코디 상세 페이지로 이동
    alert(`코디 ${outfitId}의 상세 정보를 확인합니다`);
}

// 색상 편집 모달
function showColorEditModal() {
    const modal = document.createElement('div');
    modal.className = 'color-edit-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div class="color-edit-content" style="background: white; padding: 30px; border-radius: 16px; max-width: 500px; width: 90%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3>좋아하는 색상 편집</h3>
                <button onclick="closeColorEditModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <div class="color-palette" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 20px;">
                ${generateColorPalette()}
            </div>
            <div style="text-align: center;">
                <button onclick="saveColorPreferences()" class="select-color-btn">저장하기</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 현재 선택된 색상들 표시
    userProfile.favoriteColors.forEach(color => {
        const colorElement = modal.querySelector(`[data-color="${color}"]`);
        if (colorElement) {
            colorElement.classList.add('selected');
        }
    });
}

function generateColorPalette() {
    const colors = [
        '#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80',
        '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080',
        '#ffffff', '#f0f0f0', '#d0d0d0', '#b0b0b0', '#808080', '#404040',
        '#000000', '#8b4513', '#d2b48c', '#f0e68c', '#dda0dd', '#98fb98',
        '#1e3a8a', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'
    ];
    
    return colors.map(color => `
        <div class="color-selector" 
             data-color="${color}" 
             style="width: 40px; height: 40px; background-color: ${color}; border-radius: 50%; cursor: pointer; border: 3px solid transparent; transition: all 0.3s;"
             onclick="toggleColorSelection('${color}')">
        </div>
    `).join('');
}

function toggleColorSelection(color) {
    const colorElement = document.querySelector(`[data-color="${color}"]`);
    const index = userProfile.favoriteColors.indexOf(color);
    
    if (index > -1) {
        userProfile.favoriteColors.splice(index, 1);
        colorElement.classList.remove('selected');
        colorElement.style.border = '3px solid transparent';
    } else {
        if (userProfile.favoriteColors.length < 6) {
            userProfile.favoriteColors.push(color);
            colorElement.classList.add('selected');
            colorElement.style.border = '3px solid #667eea';
        } else {
            alert('최대 6개의 색상까지 선택 가능합니다.');
        }
    }
}

function saveColorPreferences() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    closeColorEditModal();
    location.reload(); // 페이지 새로고침으로 변경사항 반영
}

function closeColorEditModal() {
    const modal = document.querySelector('.color-edit-modal');
    if (modal) {
        modal.remove();
    }
}

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', () => {
    setupMobileSidebar();
});

// 데이터 동기화 함수들
function syncWithLocalStorage() {
    // 다른 페이지에서 변경된 데이터와 동기화
    const event = new CustomEvent('storageSync');
    window.dispatchEvent(event);
}

// 스토리지 변경 감지
window.addEventListener('storage', function(e) {
    if (e.key === 'userProfile' || e.key === 'tops' || e.key === 'bottoms' || e.key === 'wishlist') {
        loadClothingStats();
        loadUserProfile();
    }
});

// 페이지 가시성 변경 시 데이터 새로고침
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        loadClothingStats();
        loadRecentOutfits();
    }
});

console.log('Dashboard script loaded successfully');