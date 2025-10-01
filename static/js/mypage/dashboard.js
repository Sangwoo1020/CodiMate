// Dashboard JavaScript

// 전역 변수
let userProfile = {
    name: '김상우',
    personalColor: null,
    favoriteColorGroup: null // ✅ 단일 색상 계열
};

// 색상 계열 정의
const colorGroups = {
    "빨강 계열": ["#dc2626", "#ef4444", "#f87171", "#fca5a5"],
    "주황 계열": ["#ea580c", "#f97316", "#fb923c"],
    "노랑 계열": ["#facc15", "#fde047", "#fef08a"],
    "초록 계열": ["#22c55e", "#16a34a", "#4ade80"],
    "파랑 계열": ["#2563eb", "#3b82f6", "#60a5fa"],
    "남색 계열": ["#4338ca", "#6366f1", "#818cf8"],
    "보라 계열": ["#7c3aed", "#a855f7", "#c084fc"],
    "분홍 계열": ["#db2777", "#ec4899", "#f472b6"],
    "갈색 계열": ["#92400e", "#b45309", "#d97706"],
    "회색 계열": ["#374151", "#6b7280", "#d1d5db"],
    "베이지 계열": ["#d6bc8b", "#f5deb3", "#fef3c7"],
    "흑백": ["#000000", "#6b7280", "#ffffff"]
};

let clothingStats = {
    topCount: 8,
    bottomCount: 6,
    wishlistCount: 3
};

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
    loadPersonalColorSection();
    loadFavoriteColorGroup(); // ✅ 좋아하는 색상 계열 로드
    setupEventListeners();
    console.log('Dashboard initialized');
}

// 사용자 프로필 로드
function loadUserProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        userProfile = { ...userProfile, ...JSON.parse(savedProfile) };
    }
}

// 옷장 통계 로드
function loadClothingStats() {
    const tops = JSON.parse(localStorage.getItem('tops')) || [];
    const bottoms = JSON.parse(localStorage.getItem('bottoms')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    clothingStats.topCount = tops.length;
    clothingStats.bottomCount = bottoms.length;
    clothingStats.wishlistCount = wishlist.length;
    document.getElementById('topCount').textContent = clothingStats.topCount;
    document.getElementById('bottomCount').textContent = clothingStats.bottomCount;
    document.getElementById('wishlistCount').textContent = clothingStats.wishlistCount;
    updateCategoryStats(tops, bottoms);
}

// 카테고리별 통계 업데이트
function updateCategoryStats(tops, bottoms) {
    if (tops.length === 0 && bottoms.length === 0) {
        console.log('Using sample category data');
        return;
    }
    console.log('Category analysis:', { tops: tops.length, bottoms: bottoms.length });
}

function loadPersonalColorSection() {
    const section = document.getElementById("personalColorSection");

    if (!userProfile.personalColor) {
        section.innerHTML = `
            <div class="personal-color-not-set">
                <div class="personal-color-placeholder">
                    <i class="fas fa-palette"></i>
                    <p>퍼스널 컬러를 선택하지 않았습니다</p>
                    <button class="select-color-btn" onclick="goToPersonalColorTest()">선택하기</button>
                </div>
            </div>
        `;
        return;
    }

    // personalColor 값이 있을 때만 colors 접근
    const colors = colorGroups[userProfile.personalColor];
    if (!colors) {
        console.warn("등록되지 않은 퍼스널컬러:", userProfile.personalColor);
        return;
    }

    section.innerHTML = `
        <div class="personal-color-display">
            ${colors.map(c => `<div class="color-box" style="background:${c}"></div>`).join('')}
        </div>
    `;
}

function loadFavoriteColorGroup() {
    const container = document.getElementById('favoriteColorGroupContainer');
    if (!container) return;

    if (userProfile.favoriteColorGroup) {
        const colors = colorGroups[userProfile.favoriteColorGroup];
        container.innerHTML = `
            <div class="color-item">
                <div style="display:flex; gap:6px;">
                    ${colors.map(c => `<div class="color-circle" style="background-color:${c};"></div>`).join('')}
                </div>
                <div class="color-info">
                    <span class="color-name">${userProfile.favoriteColorGroup}</span>
                    <span class="color-count">선택한 색상 계열</span>
                </div>
            </div>
        `;
    } else {
        // 선택 안 되어 있으면 그냥 그대로 둠 (HTML 기본 메시지 유지)
        container.innerHTML = `
            <div class="no-color-message">
                <p>선택한 색상 계열이 없습니다</p>
            </div>
        `;
    }
}

function editFavoriteColorGroup() {
    const modal = document.createElement('div');
    modal.className = 'color-edit-modal';
    modal.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center;
        z-index:1000;
    `;
    modal.innerHTML = `
        <div class="color-edit-content" style="background:white; padding:30px; border-radius:16px; max-width:600px; width:90%; max-height:90%; overflow-y:auto;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h3>좋아하는 색상 계열 선택</h3>
                <button onclick="closeColorEditModal()" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">&times;</button>
            </div>
            <div class="color-groups">
                ${Object.entries(colorGroups).map(([group, colors]) => `
                    <div class="color-group" data-group="${group}" style="border:2px solid #e5e7eb; border-radius:12px; padding:12px; margin-bottom:12px; cursor:pointer;">
                        <p style="margin-bottom:8px; font-weight:600;">${group}</p>
                        <div style="display:flex; gap:6px;">
                            ${colors.map(c => `<div class="color-circle" style="background-color:${c}; width:30px; height:30px;"></div>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="text-align:center; margin-top:20px;">
                <button onclick="saveColorGroupPreference()" class="select-color-btn">저장하기</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    if (userProfile.favoriteColorGroup) {
        const selected = modal.querySelector(`[data-group="${userProfile.favoriteColorGroup}"]`);
        if (selected) selected.style.border = "2px solid #667eea";
    }

    modal.querySelectorAll('.color-group').forEach(el => {
        el.addEventListener('click', () => {
            modal.querySelectorAll('.color-group').forEach(g => g.style.border = "2px solid #e5e7eb");
            el.style.border = "2px solid #667eea";
            userProfile.favoriteColorGroup = el.dataset.group;
        });
    });
}

function saveColorGroupPreference() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    closeColorEditModal();
    loadFavoriteColorGroup();
}

function closeColorEditModal() {
    const modal = document.querySelector('.color-edit-modal');
    if (modal) modal.remove();
}

// 이벤트 리스너 설정
function setupEventListeners() {
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
                position: fixed; top: 90px; left: 20px;
                z-index: 101; background: #667eea; color: white;
                border: none; width: 50px; height: 50px;
                border-radius: 50%; font-size: 1.2rem; cursor: pointer;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(sidebarToggle);
        }
        sidebarToggle.addEventListener('click', () => { sidebar.classList.toggle('mobile-open'); });
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }
}

// 유틸리티
function adjustColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
        (G<255?G<1?0:G:255)*0x100 +
        (B<255?B<1?0:B:255)).toString(16).slice(1);
}

// 네비게이션 함수들
function viewAllOutfits() { alert('코디 히스토리 페이지로 이동합니다'); }
function goToCloset() { window.location.href = '/templates/closet/closet.html'; }
function goToPersonalColorTest() { window.location.href = '/templates/mypage/setting.html#personal-color'; }
function goToCoordination() { window.location.href = '/templates/codi-recommend/codi-recommend.html'; }
function viewOutfitDetail(outfitId) { alert(`코디 ${outfitId}의 상세 정보를 확인합니다`); }

// 동기화
window.addEventListener('resize', () => { setupMobileSidebar(); });
window.addEventListener('storage', function(e) {
    if (e.key === 'userProfile' || e.key === 'tops' || e.key === 'bottoms' || e.key === 'wishlist') {
        loadClothingStats();
        loadUserProfile();
        loadFavoriteColorGroup();
    }
});

document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        loadClothingStats();
        loadFavoriteColorGroup();
    }
});

console.log('Dashboard script loaded successfully');