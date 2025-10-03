// Wishlist JavaScript

// 전역 변수
let wishlistData = [];
let currentView = 'grid';
let currentFilter = 'all';
let currentSort = 'newest';
let selectedOutfitId = null;

// 사용자 프로필 정보
let userProfile = {
    name: '김상우',
    personalColor: null
};

// 샘플 즐겨찾기 데이터
const sampleWishlistData = [
    {
        id: 1,
        name: '클래식 비즈니스 룩',
        category: 'business',
        top: { name: '화이트 셔츠', color: '#ffffff' },
        bottom: { name: '네이비 슬랙스', color: '#1e3a8a' },
        rating: 5,
        dateAdded: '2025.01.20',
        memo: '중요한 회의나 프레젠테이션에 완벽한 조합'
    },
    {
        id: 2,
        name: '캐주얼 데이트 룩',
        category: 'date',
        top: { name: '베이지 니트', color: '#d2b48c' },
        bottom: { name: '다크 진', color: '#2c3e50' },
        rating: 4,
        dateAdded: '2025.01.18',
        memo: '편안하면서도 세련된 느낌을 주는 코디'
    },
    {
        id: 3,
        name: '주말 캐주얼',
        category: 'casual',
        top: { name: '그레이 후드티', color: '#6b7280' },
        bottom: { name: '블랙 조거팬츠', color: '#1f2937' },
        rating: 5,
        dateAdded: '2025.01.15',
        memo: '집에서 편하게 입기 좋은 조합'
    },
    {
        id: 4,
        name: '파티 스타일',
        category: 'party',
        top: { name: '블랙 셔츠', color: '#000000' },
        bottom: { name: '와이드 팬츠', color: '#2d3748' },
        rating: 4,
        dateAdded: '2025.01.12',
        memo: '특별한 날에 입기 좋은 스타일리시한 룩'
    }
];

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeWishlist();
});

// 즐겨찾기 페이지 초기화
function initializeWishlist() {
    loadUserProfile();
    loadWishlistData();
    setupEventListeners();
    updateStats();
    renderWishlist();
    setupMobileSidebar();
    
    console.log('Wishlist initialized');
}

// 사용자 프로필 로드
function loadUserProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        userProfile = { ...userProfile, ...JSON.parse(savedProfile) };
    }
}

// 즐겨찾기 데이터 로드
function loadWishlistData() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist && JSON.parse(savedWishlist).length > 0) {
        wishlistData = JSON.parse(savedWishlist);
    } else {
        // 샘플 데이터 사용
        wishlistData = [...sampleWishlistData];
        localStorage.setItem('wishlist', JSON.stringify(wishlistData));
    }
    
    console.log('Loaded wishlist data:', wishlistData.length, 'items');
}

// 이벤트 리스너 설정
function setupEventListeners() {
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
    const modal = document.getElementById('outfitModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 통계 업데이트
function updateStats() {
    const totalCount = wishlistData.length;
    const avgRating = totalCount > 0 
        ? (wishlistData.reduce((sum, item) => sum + item.rating, 0) / totalCount).toFixed(1)
        : 0;
    
    // 가장 많은 카테고리 찾기
    const categoryCount = {};
    wishlistData.forEach(item => {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });
    
    const mostCategory = Object.keys(categoryCount).reduce((a, b) => 
        categoryCount[a] > categoryCount[b] ? a : b, '-');
    
    const categoryNames = {
        'casual': '캐주얼',
        'business': '비즈니스',
        'date': '데이트',
        'formal': '포멀',
        'party': '파티'
    };
    
    // DOM 업데이트
    document.getElementById('totalWishlist').textContent = totalCount;
    document.getElementById('avgRating').textContent = avgRating;
    document.getElementById('mostCategory').textContent = categoryNames[mostCategory] || '-';
}

// 즐겨찾기 목록 렌더링
function renderWishlist() {
    const wishlistGrid = document.getElementById('wishlistGrid');
    const emptyState = document.getElementById('emptyWishlist');
    
    if (!wishlistGrid) return;
    
    // 필터링 및 정렬된 데이터 가져오기
    const filteredData = getFilteredAndSortedData();
    
    if (filteredData.length === 0) {
        wishlistGrid.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }
    
    wishlistGrid.style.display = currentView === 'grid' ? 'grid' : 'flex';
    emptyState.style.display = 'none';
    
    // 뷰 클래스 업데이트
    wishlistGrid.className = `wishlist-grid view-${currentView}`;
    
    // 목록 렌더링
    wishlistGrid.innerHTML = '';
    filteredData.forEach((item, index) => {
        const wishlistItem = createWishlistItem(item, index);
        wishlistGrid.appendChild(wishlistItem);
    });
}

// 필터링 및 정렬된 데이터 반환
function getFilteredAndSortedData() {
    let filteredData = [...wishlistData];
    
    // 카테고리 필터링
    if (currentFilter !== 'all') {
        filteredData = filteredData.filter(item => item.category === currentFilter);
    }
    
    // 정렬
    switch (currentSort) {
        case 'newest':
            filteredData.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        case 'oldest':
            filteredData.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
            break;
        case 'rating':
            filteredData.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    return filteredData;
}

// 즐겨찾기 아이템 생성
function createWishlistItem(item, index) {
    const wishlistItem = document.createElement('div');
    wishlistItem.className = `wishlist-item view-${currentView}`;
    wishlistItem.style.animationDelay = `${index * 0.1}s`;
    wishlistItem.onclick = () => openModal(item.id);
    
    const categoryNames = {
        'casual': '캐주얼',
        'business': '비즈니스', 
        'date': '데이트',
        'formal': '포멀',
        'party': '파티'
    };
    
    wishlistItem.innerHTML = `
        <div class="outfit-preview">
            <div class="outfit-items">
                <div class="outfit-item" style="background: linear-gradient(135deg, ${item.top.color}, ${adjustColor(item.top.color, -20)});">
                    <span>${item.top.name}</span>
                </div>
                <div class="outfit-item" style="background: linear-gradient(135deg, ${item.bottom.color}, ${adjustColor(item.bottom.color, -20)});">
                    <span>${item.bottom.name}</span>
                </div>
            </div>
            <button class="wishlist-heart" onclick="removeFromWishlistConfirm(${item.id}, event)">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="outfit-info">
            <h3 class="outfit-name">${item.name}</h3>
            <span class="outfit-category">${categoryNames[item.category]}</span>
            <div class="outfit-meta">
                <span class="outfit-date">${item.dateAdded}</span>
                <div class="outfit-rating">
                    <span class="stars">${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</span>
                    <span class="rating-text">${item.rating}/5</span>
                </div>
            </div>
            ${item.memo ? `<p class="outfit-memo">${item.memo}</p>` : ''}
        </div>
    `;
    
    return wishlistItem;
}

// 색상 조정 함수 (그라데이션용)
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

// 필터 및 정렬 함수들
function filterWishlist() {
    const filterSelect = document.getElementById('categoryFilter');
    currentFilter = filterSelect.value;
    renderWishlist();
}

function sortWishlist() {
    const sortSelect = document.getElementById('sortFilter');
    currentSort = sortSelect.value;
    renderWishlist();
}

function changeView(view) {
    currentView = view;
    
    // 버튼 활성화 상태 변경
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    renderWishlist();
}

// 모달 관련 함수들
function openModal(outfitId) {
    selectedOutfitId = outfitId;
    const outfit = wishlistData.find(item => item.id === outfitId);
    if (!outfit) return;
    
    const categoryNames = {
        'casual': '캐주얼',
        'business': '비즈니스',
        'date': '데이트', 
        'formal': '포멀',
        'party': '파티'
    };
    
    // 모달 내용 업데이트
    document.getElementById('modalTitle').textContent = outfit.name;
    document.getElementById('modalTopItem').style.background = 
        `linear-gradient(135deg, ${outfit.top.color}, ${adjustColor(outfit.top.color, -20)})`;
    document.getElementById('modalTopName').textContent = outfit.top.name;
    document.getElementById('modalBottomItem').style.background = 
        `linear-gradient(135deg, ${outfit.bottom.color}, ${adjustColor(outfit.bottom.color, -20)})`;
    document.getElementById('modalBottomName').textContent = outfit.bottom.name;
    
    document.getElementById('modalOutfitName').textContent = outfit.name;
    document.getElementById('modalCategory').textContent = categoryNames[outfit.category];
    document.getElementById('modalDate').textContent = outfit.dateAdded;
    document.getElementById('modalRating').textContent = 
        '★'.repeat(outfit.rating) + '☆'.repeat(5 - outfit.rating);
    document.getElementById('modalRatingText').textContent = `(${outfit.rating}/5)`;
    document.getElementById('modalMemo').textContent = outfit.memo || '메모 없음';
    
    // 모달 표시
    document.getElementById('outfitModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('outfitModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedOutfitId = null;
}

// 즐겨찾기 해제 확인
function removeFromWishlistConfirm(outfitId, event) {
    event.stopPropagation(); // 부모 클릭 이벤트 방지
    
    const outfit = wishlistData.find(item => item.id === outfitId);
    if (!outfit) return;
    
    if (confirm(`"${outfit.name}" 코디를 즐겨찾기에서 제거하시겠습니까?`)) {
        removeFromWishlistById(outfitId);
    }
}

// 즐겨찾기에서 제거
function removeFromWishlistById(outfitId) {
    wishlistData = wishlistData.filter(item => item.id !== outfitId);
    localStorage.setItem('wishlist', JSON.stringify(wishlistData));
    updateStats();
    renderWishlist();
    closeModal();
    
    // 성공 메시지
    showToast('즐겨찾기에서 제거되었습니다', 'success');
}

// 모달 액션 함수들
function editOutfit() {
    // TODO: 편집 기능 구현
    alert('편집 기능은 준비 중입니다');
}

function removeFromWishlist() {
    if (selectedOutfitId) {
        removeFromWishlistById(selectedOutfitId);
    }
}

function useOutfit() {
    const outfit = wishlistData.find(item => item.id === selectedOutfitId);
    if (!outfit) return;
    
    // 코디 기록에 추가
    const outfitRecord = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        top: outfit.top,
        bottom: outfit.bottom,
        rating: outfit.rating,
        weather: '현재 날씨', // 실제로는 날씨 API에서 가져와야 함
        memo: `즐겨찾기에서 사용: ${outfit.name}`
    };
    
    // 기존 코디 기록에 추가
    let outfitHistory = JSON.parse(localStorage.getItem('outfitHistory')) || [];
    outfitHistory.unshift(outfitRecord);
    localStorage.setItem('outfitHistory', JSON.stringify(outfitHistory));
    
    closeModal();
    showToast('코디를 오늘 착용 기록에 추가했습니다!', 'success');
}

// 네비게이션 함수들
function goToRecommendation() {
    window.location.href = '/templates/codi-recommend/codi-recommend.html';
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

// 토스트 메시지 표시
function showToast(message, type = 'info') {
    // 기존 토스트 제거
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
    `;
    
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span style="margin-left: 8px;">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // 애니메이션
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // 3초 후 제거
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// 검색 기능 (향후 구현)
function searchWishlist(query) {
    const searchResults = wishlistData.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.memo.toLowerCase().includes(query.toLowerCase()) ||
        item.top.name.toLowerCase().includes(query.toLowerCase()) ||
        item.bottom.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return searchResults;
}

// 대량 작업 (향후 구현)
function selectAllItems() {
    // TODO: 전체 선택 기능
}

function deleteSelected() {
    // TODO: 선택된 아이템 삭제 기능
}

function exportWishlist() {
    // TODO: 즐겨찾기 내보내기 기능
    const dataStr = JSON.stringify(wishlistData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'codimate_wishlist.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('즐겨찾기가 내보내기 되었습니다', 'success');
}

// 즐겨찾기 추가 함수 (다른 페이지에서 호출)
function addToWishlist(outfitData) {
    const newWishlistItem = {
        id: Date.now(),
        name: outfitData.name || `코디 ${Date.now()}`,
        category: outfitData.category || 'casual',
        top: outfitData.top,
        bottom: outfitData.bottom,
        rating: outfitData.rating || 5,
        dateAdded: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        memo: outfitData.memo || ''
    };
    
    // 중복 체크 (같은 상의/하의 조합)
    const isDuplicate = wishlistData.some(item => 
        item.top.name === newWishlistItem.top.name && 
        item.bottom.name === newWishlistItem.bottom.name
    );
    
    if (isDuplicate) {
        showToast('이미 즐겨찾기에 등록된 코디입니다', 'error');
        return false;
    }
    
    wishlistData.unshift(newWishlistItem);
    localStorage.setItem('wishlist', JSON.stringify(wishlistData));
    updateStats();
    renderWishlist();
    
    showToast('즐겨찾기에 추가되었습니다!', 'success');
    return true;
}

// 즐겨찾기 여부 확인
function isInWishlist(topName, bottomName) {
    return wishlistData.some(item => 
        item.top.name === topName && item.bottom.name === bottomName
    );
}

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', () => {
    setupMobileSidebar();
});

// 스토리지 변경 감지
window.addEventListener('storage', function(e) {
    if (e.key === 'wishlist') {
        loadWishlistData();
        updateStats();
        renderWishlist();
    }
    if (e.key === 'userProfile') {
        loadUserProfile();
    }
});

// 페이지 가시성 변경 시 데이터 새로고침
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        loadWishlistData();
        updateStats();
        renderWishlist();
    }
});

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F: 검색 (향후 구현)
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        // TODO: 검색 기능 활성화
    }
    
    // G: 그리드 뷰
    if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        changeView('grid');
    }
    
    // L: 리스트 뷰
    if (e.key === 'l' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        changeView('list');
    }
});

// 드래그 앤 드롭 (향후 구현)
function enableDragAndDrop() {
    // TODO: 즐겨찾기 아이템 순서 변경을 위한 드래그 앤 드롭
}

// 다크 모드 지원 준비
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// 테마 로드
function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// 전역 함수들을 window 객체에 노출
window.addToWishlist = addToWishlist;
window.isInWishlist = isInWishlist;
window.filterWishlist = filterWishlist;
window.sortWishlist = sortWishlist;
window.changeView = changeView;
window.openModal = openModal;
window.closeModal = closeModal;
window.editOutfit = editOutfit;
window.removeFromWishlist = removeFromWishlist;
window.useOutfit = useOutfit;
window.goToRecommendation = goToRecommendation;
window.removeFromWishlistConfirm = removeFromWishlistConfirm;

console.log('Wishlist script loaded successfully');