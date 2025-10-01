// Settings JavaScript - 사이드바 고정 버전

// 전역 변수
let currentTab = 'profile';
let selectedPersonalColor = null;
let pendingAction = null;

// 사용자 프로필 데이터
let userProfile = {
    name: '김상우',
    height: '',
    weight: '',
    gender: '',
    age: '',
    personalColor: null
};

// 퍼스널 컬러 데이터
const personalColorData = {
    'spring-warm': {
        name: '봄웜톤',
        description: '밝고 따뜻한 색상',
        colors: ['#FFB347', '#98FB98', '#FFE4B5'],
        detailDesc: '생동감 있고 화사한 느낌을 주는 따뜻한 톤'
    },
    'summer-cool': {
        name: '여름쿨톤',
        description: '부드럽고 차가운 색상',
        colors: ['#B0C4DE', '#DDA0DD', '#F0F8FF'],
        detailDesc: '우아하고 세련된 느낌의 차가운 톤'
    },
    'autumn-warm': {
        name: '가을웜톤',
        description: '깊고 따뜻한 색상',
        colors: ['#D2691E', '#8B4513', '#DAA520'],
        detailDesc: '차분하고 고급스러운 느낌의 깊은 따뜻한 톤'
    },
    'winter-cool': {
        name: '겨울쿨톤',
        description: '선명하고 차가운 색상',
        colors: ['#4169E1', '#800080', '#000000'],
        detailDesc: '강렬하고 대비가 뚜렷한 차가운 톤'
    }
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
    handleUrlHash();
});

// 설정 페이지 초기화
function initializeSettings() {
    loadUserData();
    setupEventListeners();
    updatePersonalColorDisplay();
    
    console.log('Settings initialized');
}

// URL 해시 처리 (다른 페이지에서 특정 탭으로 이동)
function handleUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash && ['profile', 'personal-color'].includes(hash)) {
        switchTab(hash);
    }
}

// 사용자 데이터 로드
function loadUserData() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        userProfile = { ...userProfile, ...JSON.parse(savedProfile) };
    }
    
    // 프로필 폼에 데이터 채우기
    document.getElementById('profileName').value = userProfile.name || '';
    document.getElementById('profileHeight').value = userProfile.height || '';
    document.getElementById('profileWeight').value = userProfile.weight || '';
    document.getElementById('profileGender').value = userProfile.gender || '';
    document.getElementById('profileAge').value = userProfile.age || '';
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 프로필 폼 제출
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
    }
    
    // 사이드바 네비게이션
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
    
    // 모달 외부 클릭 시 닫기
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeConfirmModal();
            }
        });
    }
}

// 탭 전환
function switchTab(tab) {
    currentTab = tab;
    
    // 탭 버튼 활성화 상태 변경
    document.querySelectorAll('.settings-tab').forEach(tabBtn => {
        tabBtn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    // 섹션 표시/숨김
    document.querySelectorAll('.settings-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${tab}-tab`).classList.add('active');
    
    // URL 해시 업데이트
    window.location.hash = tab;
}

// 프로필 폼 제출 처리
function handleProfileSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const updatedProfile = {
        name: formData.get('name'),
        height: formData.get('height'),
        weight: formData.get('weight'),
        gender: formData.get('gender'),
        age: formData.get('age'),
        personalColor: userProfile.personalColor // 기존 퍼스널 컬러 유지
    };
    
    // 유효성 검사
    if (!updatedProfile.name.trim()) {
        showToast('이름을 입력해주세요', 'error');
        return;
    }
    
    // 프로필 업데이트
    userProfile = { ...userProfile, ...updatedProfile };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    showToast('프로필이 성공적으로 저장되었습니다!', 'success');
}

// 프로필 초기화
function resetProfile() {
    if (confirm('프로필 정보를 초기화하시겠습니까?')) {
        document.getElementById('profileForm').reset();
        showToast('프로필이 초기화되었습니다', 'info');
    }
}

// 퍼스널 컬러 관련 함수들
function updatePersonalColorDisplay() {
    const colorPreview = document.getElementById('colorPreview');
    const currentColorName = document.getElementById('currentColorName');
    const currentColorDesc = document.getElementById('currentColorDesc');
    
    if (userProfile.personalColor && personalColorData[userProfile.personalColor]) {
        const colorData = personalColorData[userProfile.personalColor];
        colorPreview.style.background = `linear-gradient(135deg, ${colorData.colors[0]}, ${colorData.colors[1]}, ${colorData.colors[2]})`;
        colorPreview.innerHTML = '';
        currentColorName.textContent = colorData.name;
        currentColorDesc.textContent = colorData.description;
    } else {
        colorPreview.style.background = 'linear-gradient(135deg, #cbd5e0, #a0aec0)';
        colorPreview.innerHTML = '<i class="fas fa-palette"></i>';
        currentColorName.textContent = '퍼스널 컬러를 선택해주세요';
        currentColorDesc.textContent = '자신에게 맞는 컬러를 찾아보세요';
    }
}

function updatePersonalColorSidebar() {
    const personalColorElement = document.getElementById('userPersonalColor');
    if (userProfile.personalColor && personalColorData[userProfile.personalColor]) {
        personalColorElement.textContent = personalColorData[userProfile.personalColor].name;
        personalColorElement.style.color = '#667eea';
    } else {
        personalColorElement.textContent = '퍼스널 컬러 미설정';
        personalColorElement.style.color = '#718096';
    }
}

function startColorTest() {
    document.getElementById('colorOptions').style.display = 'block';
    // 기존 선택 초기화
    document.querySelectorAll('.color-type').forEach(type => {
        type.classList.remove('selected');
    });
    selectedPersonalColor = null;
    updateColorButtons();
}

function selectPersonalColor(colorType) {
    selectedPersonalColor = colorType;
    
    // 선택 상태 업데이트
    document.querySelectorAll('.color-type').forEach(type => {
        type.classList.remove('selected');
    });
    document.querySelector(`[data-type="${colorType}"]`).classList.add('selected');
    
    updateColorButtons();
}

function updateColorButtons() {
    const confirmBtn = document.querySelector('.color-actions .btn-primary');
    if (confirmBtn) {
        confirmBtn.disabled = !selectedPersonalColor;
        confirmBtn.style.opacity = selectedPersonalColor ? '1' : '0.5';
    }
}

function confirmColorSelection() {
    if (!selectedPersonalColor) return;
    
    userProfile.personalColor = selectedPersonalColor;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    updatePersonalColorDisplay();
    cancelColorTest();
    
    showToast('퍼스널 컬러가 설정되었습니다!', 'success');
}

function cancelColorTest() {
    document.getElementById('colorOptions').style.display = 'none';
    selectedPersonalColor = null;
}

// 모달 관리
function showConfirmModal(title, message, action = null) {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmTitle');
    const messageEl = document.getElementById('confirmMessage');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    pendingAction = action;
    modal.style.display = 'flex';
}

function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
    pendingAction = null;
}

function executeConfirmAction() {
    if (pendingAction && typeof pendingAction === 'function') {
        pendingAction();
    }
    closeConfirmModal();
}

// 토스트 메시지
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#667eea'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 300px;
    `;
    
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span style="margin-left: 8px;">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// 전역 함수들
window.switchTab = switchTab;
window.resetProfile = resetProfile;
window.startColorTest = startColorTest;
window.selectPersonalColor = selectPersonalColor;
window.confirmColorSelection = confirmColorSelection;
window.cancelColorTest = cancelColorTest;
window.closeConfirmModal = closeConfirmModal;
window.executeConfirmAction = executeConfirmAction;

// 스토리지 변경 감지
window.addEventListener('storage', function(e) {
    if (e.key === 'userProfile') {
        loadUserData();
    }
});

// 페이지 가시성 변경 시 데이터 새로고침
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        loadUserData();
    }
});

console.log('Settings script loaded successfully');