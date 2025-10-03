// 전역 변수
let currentEditingId = null;
let selectedClothing = { top: null, bottom: null };
let currentClothingType = '';
let allCodiHistory = [];

// 샘플 옷장 데이터 (실제로는 로컬스토리지나 서버에서 가져와야 함)
const sampleClothing = {
    tops: [
        { id: 1, name: '화이트 셔츠', image: '/static/image/mainpage/sample1.png', color: '#ffffff' },
        { id: 2, name: '데님 재킷', image: '/static/image/mainpage/sample2.png', color: '#4682b4' },
        { id: 3, name: '플라워 블라우스', image: '/static/image/mainpage/sample3.png', color: '#ffc0cb' },
        { id: 4, name: '그레이 니트', image: '/static/image/mainpage/sample4.png', color: '#808080' }
    ],
    bottoms: [
        { id: 5, name: '네이비 슬랙스', image: '/static/image/mainpage/sample5.png', color: '#1e3a8a' },
        { id: 6, name: '블랙 청바지', image: '/static/image/mainpage/sample6.png', color: '#000000' },
        { id: 7, name: '베이지 스커트', image: '/static/image/mainpage/sample7.png', color: '#d2b48c' },
        { id: 8, name: '와이드 팬츠', image: '/static/image/mainpage/sample8.png', color: '#556b2f' }
    ]
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeCodiHistory();
    loadCodiHistoryData();
    updateStats();
    setupEventListeners();
    
    // 오늘 날짜를 기본값으로 설정
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('wearDate').value = today;
});

// 코디 히스토리 초기화
function initializeCodiHistory() {
    console.log('코디 히스토리 페이지 초기화');
}

function setupEventListeners() {
    // 코디 등록 버튼
    const addCodiBtn = document.getElementById('addCodiBtn');
    if (addCodiBtn) {
        addCodiBtn.addEventListener('click', () => openCodiModal('add'));
    }

    // 모달 닫기 버튼들
    const closeModal = document.getElementById('closeModal');
    if (closeModal) closeModal.addEventListener('click', closeCodiModal);

    // 올바른 코드
    const closeClothingModalBtn = document.getElementById('closeClothingModal');
    if (closeClothingModalBtn) closeClothingModalBtn.addEventListener('click', closeClothingModal);

    const closeDetailModalBtn = document.getElementById('closeDetailModal');
    if (closeDetailModalBtn) closeDetailModalBtn.addEventListener('click', closeDetailModal);

    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) cancelBtn.addEventListener('click', closeCodiModal);

    // 모달 외부 클릭시 닫기
    window.addEventListener('click', (event) => {
        const codiModal = document.getElementById('codiModal');
        const clothingModal = document.getElementById('clothingSelectModal');
        const detailModal = document.getElementById('detailModal');
        
        if (event.target === codiModal) closeCodiModal();
        if (event.target === clothingModal) closeClothingModal();
        if (event.target === detailModal) closeDetailModal();
    });

    // 폼 제출
    const codiForm = document.getElementById('codiForm');
    if (codiForm) codiForm.addEventListener('submit', handleFormSubmit);

    // 별점 클릭
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = parseInt(e.target.dataset.rating);
            setRating(rating);
        });
        
        star.addEventListener('mouseenter', (e) => {
            const rating = parseInt(e.target.dataset.rating);
            highlightStars(rating);
        });
    });

    // 별점 영역에서 마우스 떠날 때
    const ratingInput = document.getElementById('ratingInput');
    if (ratingInput) {
        ratingInput.addEventListener('mouseleave', () => {
            const currentRating = parseInt(document.getElementById('satisfactionValue').value);
            highlightStars(currentRating);
        });
    }

    // 의류 선택 버튼
    document.querySelectorAll('.select-clothing-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            openClothingSelectModal(type);
        });
    });

    // 필터 변경 이벤트
    const periodFilter = document.getElementById('periodFilter');
    if (periodFilter) periodFilter.addEventListener('change', applyFilters);

    const themeFilter = document.getElementById('themeFilter');
    if (themeFilter) themeFilter.addEventListener('change', applyFilters);

    const ratingFilter = document.getElementById('ratingFilter');
    if (ratingFilter) ratingFilter.addEventListener('change', applyFilters);
    
    // 검색 기능
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) searchBtn.addEventListener('click', applyFilters);

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }

    // 더보기 버튼 (존재하지 않으므로 체크)
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreHistory);
    }

    // 카드 액션 버튼들
    const historyGrid = document.getElementById('historyGrid');
    if (historyGrid) {
        historyGrid.addEventListener('click', handleCardAction);
    }
}

// 코디 히스토리 데이터 로드
function loadCodiHistoryData() {
    // 로컬 스토리지에서 데이터 로드 (없으면 샘플 데이터 사용)
    const savedData = localStorage.getItem('codiHistory');
    
    if (savedData) {
        allCodiHistory = JSON.parse(savedData);
    } else {
        // 샘플 데이터 생성
        allCodiHistory = generateSampleData();
        localStorage.setItem('codiHistory', JSON.stringify(allCodiHistory));
    }
    
    renderCodiHistory();
}

// 샘플 데이터 생성
function generateSampleData() {
    const sampleData = [
        {
            id: 1,
            codiName: '클래식 비즈니스 룩',
            wearDate: '2025-09-20',
            theme: 'business',
            topId: 1,
            bottomId: 5,
            topName: '화이트 셔츠',
            bottomName: '네이비 슬랙스',
            topImage: '/static/image/mainpage/sample1.png',
            bottomImage: '/static/image/mainpage/sample5.png',
            satisfaction: 5,
            temperature: 22,
            weatherCondition: 'sunny',
            memo: '중요한 프레젠테이션이 있어서 깔끔하고 신뢰감 있는 룩으로 선택했습니다. 회사 동료들에게 좋은 반응을 받았어요!',
            favorite: true,
            createdAt: '2025-09-20T09:00:00'
        },
        {
            id: 2,
            codiName: '편안한 주말 룩',
            wearDate: '2025-09-19',
            theme: 'casual',
            topId: 2,
            bottomId: 6,
            topName: '데님 재킷',
            bottomName: '블랙 청바지',
            topImage: '/static/image/mainpage/sample2.png',
            bottomImage: '/static/image/mainpage/sample6.png',
            satisfaction: 4,
            temperature: 18,
            weatherCondition: 'cloudy',
            memo: '친구들과 카페 가는 날 편안하면서도 스타일리시한 룩을 원해서 선택했어요.',
            favorite: false,
            createdAt: '2025-09-19T08:30:00'
        },
        {
            id: 3,
            codiName: '로맨틱 데이트 룩',
            wearDate: '2025-09-18',
            theme: 'date',
            topId: 3,
            bottomId: 7,
            topName: '플라워 블라우스',
            bottomName: '베이지 스커트',
            topImage: '/static/image/mainpage/sample3.png',
            bottomImage: '/static/image/mainpage/sample7.png',
            satisfaction: 5,
            temperature: 25,
            weatherCondition: 'sunny',
            memo: '첫 데이트라서 여성스럽고 로맨틱한 느낌으로 골랐어요. 상대방이 정말 예쁘다고 해주셨어요!',
            favorite: true,
            createdAt: '2025-09-18T19:00:00'
        }
    ];
    
    return sampleData;
}

// 코디 히스토리 렌더링
function renderCodiHistory(data = allCodiHistory) {
    const grid = document.getElementById('historyGrid');
    
    if (data.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tshirt"></i>
                <h3>아직 등록된 코디가 없어요</h3>
                <p>첫 번째 코디를 등록해보세요!</p>
                <button class="add-codi-btn" onclick="openCodiModal('add')">
                    <i class="fas fa-plus"></i> 코디 등록하기
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = data.map(codi => `
        <div class="history-card" data-theme="${codi.theme}" data-rating="${codi.satisfaction}" data-date="${codi.wearDate}">
            <div class="card-header">
                <div class="date-info">
                    <div class="date">${formatDate(codi.wearDate)}</div>
                    <div class="weather-info">
                        <i class="fas ${getWeatherIcon(codi.weatherCondition)}"></i>
                        <span>${codi.temperature}°C</span>
                    </div>
                </div>
                <div class="theme-badge ${codi.theme}">${getThemeText(codi.theme)}</div>
                <button class="favorite-btn" data-favorite="${codi.favorite}" data-id="${codi.id}">
                    <i class="fas ${codi.favorite ? 'fa-heart' : 'far fa-heart'}"></i>
                </button>
            </div>
            <div class="codi-preview">
                <div class="outfit-combination">
                    <div class="clothing-item top">
                        <img src="${codi.topImage}" alt="${codi.topName}">
                        <span>${codi.topName}</span>
                    </div>
                    <div class="plus-icon">+</div>
                    <div class="clothing-item bottom">
                        <img src="${codi.bottomImage}" alt="${codi.bottomName}">
                        <span>${codi.bottomName}</span>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <h3 class="codi-name">${codi.codiName}</h3>
                <div class="rating">
                    <div class="stars">${'★'.repeat(codi.satisfaction)}${'☆'.repeat(5 - codi.satisfaction)}</div>
                    <span class="rating-text">${getRatingText(codi.satisfaction)}</span>
                </div>
                <p class="memo">${codi.memo || '메모가 없습니다.'}</p>
            </div>
            <div class="card-actions">
                <button class="action-btn detail-btn" data-action="detail" data-id="${codi.id}">
                    <i class="fas fa-eye"></i> 상세보기
                </button>
                <button class="action-btn edit-btn" data-action="edit" data-id="${codi.id}">
                    <i class="fas fa-edit"></i> 수정
                </button>
                <button class="action-btn delete-btn" data-action="delete" data-id="${codi.id}">
                    <i class="fas fa-trash"></i> 삭제
                </button>
            </div>
        </div>
    `).join('');

    // 즐겨찾기 버튼 이벤트 추가
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.dataset.id));
        });
    });
}

// 카드 액션 핸들러
function handleCardAction(event) {
    const button = event.target.closest('.action-btn');
    if (!button) return;

    const action = button.dataset.action;
    const id = parseInt(button.dataset.id);

    switch (action) {
        case 'detail':
            showCodiDetail(id);
            break;
        case 'edit':
            openCodiModal('edit', id);
            break;
        case 'delete':
            deleteCodiHistory(id);
            break;
    }
}

// 코디 모달 열기
function openCodiModal(mode, codiId = null) {
    const modal = document.getElementById('codiModal');
    const title = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');

    currentEditingId = codiId;

    if (mode === 'add') {
        title.textContent = '새 코디 등록하기';
        submitBtn.textContent = '등록하기';
        resetForm();
    } else if (mode === 'edit') {
        title.textContent = '코디 수정하기';
        submitBtn.textContent = '수정하기';
        loadCodiData(codiId);
    }

    modal.classList.add('active');
    modal.style.display = 'flex';
}

// 코디 모달 닫기
function closeCodiModal() {
    const modal = document.getElementById('codiModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    resetForm();
    currentEditingId = null;
}

// 의류 선택 모달 열기
function openClothingSelectModal(type) {
    const modal = document.getElementById('clothingSelectModal');
    const title = document.getElementById('clothingModalTitle');
    const grid = document.getElementById('clothingGrid');
    const noClothingMsg = document.getElementById('noClothingMessage');

    currentClothingType = type;
    title.textContent = type === 'top' ? '상의 선택' : '하의 선택';

    // 옷장 데이터 로드 (실제로는 서버나 로컬스토리지에서)
    const clothingData = type === 'top' ? 
        (JSON.parse(localStorage.getItem('tops')) || sampleClothing.tops) : 
        (JSON.parse(localStorage.getItem('bottoms')) || sampleClothing.bottoms);

    if (clothingData.length === 0) {
        grid.style.display = 'none';
        noClothingMsg.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        noClothingMsg.style.display = 'none';
        
        grid.innerHTML = clothingData.map(item => `
            <div class="clothing-grid-item" data-id="${item.id}" data-name="${item.name}" data-image="${item.image}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-name">${item.name}</div>
            </div>
        `).join('');

        // 클릭 이벤트 추가
        grid.querySelectorAll('.clothing-grid-item').forEach(item => {
            item.addEventListener('click', () => {
                selectClothing(item);
            });
        });
    }

    modal.classList.add('active');
    modal.style.display = 'flex';
}

// 의류 선택 모달 닫기
function closeClothingModal() {
    const modal = document.getElementById('clothingSelectModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
}

// 의류 선택
function selectClothing(item) {
    const id = parseInt(item.dataset.id);
    const name = item.dataset.name;
    const image = item.dataset.image;

    selectedClothing[currentClothingType] = { id, name, image };
    
    // UI 업데이트
    updateSelectedClothingUI(currentClothingType, { id, name, image });
    
    closeClothingModal();
}

// 선택된 의류 UI 업데이트
function updateSelectedClothingUI(type, clothing) {
    const container = document.getElementById(type === 'top' ? 'selectedTop' : 'selectedBottom');
    
    container.innerHTML = `
        <img src="${clothing.image}" alt="">
    `;
    container.parentElement.classList.add('has-item');
}

// 폼 리셋
function resetForm() {
    document.getElementById('codiForm').reset();
    document.getElementById('satisfactionValue').value = '0';
    setRating(0);
    
    // 선택된 의류 초기화
    selectedClothing = { top: null, bottom: null };
    
    ['selectedTop', 'selectedBottom'].forEach(id => {
        const element = document.getElementById(id);
        element.innerHTML = `
            <div class="placeholder">
                <i class="fas fa-plus"></i>
                <span>${id === 'selectedTop' ? '상의' : '하의'} 선택</span>
            </div>
        `;
        element.parentElement.classList.remove('has-item');
    });

    // 오늘 날짜를 기본값으로 설정
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('wearDate').value = today;
}

// 코디 데이터 로드 (수정 모드용)
function loadCodiData(codiId) {
    const codi = allCodiHistory.find(item => item.id === codiId);
    if (!codi) return;

    // 폼 필드 채우기
    document.getElementById('codiName').value = codi.codiName;
    document.getElementById('wearDate').value = codi.wearDate;
    document.getElementById('themeSelect').value = codi.theme;
    document.getElementById('temperature').value = codi.temperature;
    document.getElementById('weatherCondition').value = codi.weatherCondition;
    document.getElementById('memo').value = codi.memo || '';
    
    // 별점 설정
    setRating(codi.satisfaction);
    
    // 선택된 의류 설정
    selectedClothing.top = { id: codi.topId, name: codi.topName, image: codi.topImage };
    selectedClothing.bottom = { id: codi.bottomId, name: codi.bottomName, image: codi.bottomImage };
    
    updateSelectedClothingUI('top', selectedClothing.top);
    updateSelectedClothingUI('bottom', selectedClothing.bottom);
}

// 별점 설정
function setRating(rating) {
    document.getElementById('satisfactionValue').value = rating;
    highlightStars(rating);
    updateRatingText(rating);
}

// 별점 하이라이트
function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// 별점 텍스트 업데이트
function updateRatingText(rating) {
    const textElement = document.querySelector('.rating-text');
    const texts = ['만족도를 선택해주세요', '매우 불만족', '불만족', '보통', '만족', '매우 만족'];
    textElement.textContent = texts[rating] || texts[0];
}

// 폼 제출 처리
function handleFormSubmit(event) {
    event.preventDefault();

    // 폼 데이터 수집
    const formData = new FormData(event.target);
    const codiData = {
        codiName: formData.get('codiName'),
        wearDate: formData.get('wearDate'),
        theme: formData.get('theme'),
        temperature: parseInt(formData.get('temperature')) || 20,
        weatherCondition: formData.get('weatherCondition'),
        satisfaction: parseInt(document.getElementById('satisfactionValue').value),
        memo: formData.get('memo') || ''
    };

    // 필수 필드 검증
    if (!codiData.codiName || !codiData.wearDate || !codiData.theme || codiData.satisfaction === 0) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
    }

    if (!selectedClothing.top || !selectedClothing.bottom) {
        alert('상의와 하의를 모두 선택해주세요.');
        return;
    }

    // 코디 데이터 완성
    const newCodi = {
        ...codiData,
        topId: selectedClothing.top.id,
        bottomId: selectedClothing.bottom.id,
        topName: selectedClothing.top.name,
        bottomName: selectedClothing.bottom.name,
        topImage: selectedClothing.top.image,
        bottomImage: selectedClothing.bottom.image,
        favorite: false,
        createdAt: new Date().toISOString()
    };

    if (currentEditingId) {
        // 수정 모드
        newCodi.id = currentEditingId;
        const index = allCodiHistory.findIndex(item => item.id === currentEditingId);
        allCodiHistory[index] = newCodi;
        showToast('코디가 성공적으로 수정되었습니다!');
    } else {
        // 등록 모드
        newCodi.id = Date.now();
        allCodiHistory.unshift(newCodi);
        showToast('새 코디가 성공적으로 등록되었습니다!');
    }

    // 로컬 스토리지에 저장
    localStorage.setItem('codiHistory', JSON.stringify(allCodiHistory));

    // UI 업데이트
    renderCodiHistory();
    updateStats();
    closeCodiModal();
}

// 즐겨찾기 토글
function toggleFavorite(codiId) {
    const codiIndex = allCodiHistory.findIndex(item => item.id === codiId);
    if (codiIndex === -1) return;

    allCodiHistory[codiIndex].favorite = !allCodiHistory[codiIndex].favorite;
    localStorage.setItem('codiHistory', JSON.stringify(allCodiHistory));
    
    renderCodiHistory();
    updateStats();
    
    const message = allCodiHistory[codiIndex].favorite ? '즐겨찾기에 추가되었습니다!' : '즐겨찾기에서 제거되었습니다!';
    showToast(message);
}

// 코디 삭제
function deleteCodiHistory(codiId) {
    if (!confirm('정말로 이 코디를 삭제하시겠습니까?')) return;

    allCodiHistory = allCodiHistory.filter(item => item.id !== codiId);
    localStorage.setItem('codiHistory', JSON.stringify(allCodiHistory));
    
    renderCodiHistory();
    updateStats();
    showToast('코디가 삭제되었습니다.');
}

// 코디 상세보기
function showCodiDetail(codiId) {
    const codi = allCodiHistory.find(item => item.id === codiId);
    if (!codi) return;

    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');
    
    content.innerHTML = `
        <div class="detail-header">
            <div class="detail-title">
                <h3>${codi.codiName}</h3>
                <div class="detail-badges">
                    <span class="theme-badge ${codi.theme}">${getThemeText(codi.theme)}</span>
                    ${codi.favorite ? '<span class="favorite-badge"><i class="fas fa-heart"></i> 즐겨찾기</span>' : ''}
                </div>
            </div>
            <div class="detail-date">
                <div class="date-large">${formatDate(codi.wearDate)}</div>
                <div class="weather-detail">
                    <i class="fas ${getWeatherIcon(codi.weatherCondition)}"></i>
                    ${codi.temperature}°C, ${getWeatherText(codi.weatherCondition)}
                </div>
            </div>
        </div>
        
        <div class="detail-outfit">
            <h4>착용 의류</h4>
            <div class="outfit-detail">
                <div class="clothing-detail">
                    <img src="${codi.topImage}" alt="${codi.topName}">
                    <div class="clothing-info">
                        <div class="clothing-category">상의</div>
                        <div class="clothing-name-detail">${codi.topName}</div>
                    </div>
                </div>
                <div class="clothing-detail">
                    <img src="${codi.bottomImage}" alt="${codi.bottomName}">
                    <div class="clothing-info">
                        <div class="clothing-category">하의</div>
                        <div class="clothing-name-detail">${codi.bottomName}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="detail-rating">
            <h4>만족도</h4>
            <div class="rating-detail">
                <div class="stars-large">${'★'.repeat(codi.satisfaction)}${'☆'.repeat(5 - codi.satisfaction)}</div>
                <div class="rating-text-large">${getRatingText(codi.satisfaction)} (${codi.satisfaction}/5)</div>
            </div>
        </div>
        
        ${codi.memo ? `
        <div class="detail-memo">
            <h4>메모</h4>
            <div class="memo-content">${codi.memo}</div>
        </div>
        ` : ''}
        
        <div class="detail-actions">
            <button class="detail-action-btn edit" onclick="closeDetailModal(); openCodiModal('edit', ${codi.id});">
                <i class="fas fa-edit"></i> 수정하기
            </button>
            <button class="detail-action-btn favorite ${codi.favorite ? 'active' : ''}" onclick="toggleFavorite(${codi.id}); closeDetailModal();">
                <i class="fas fa-heart"></i> ${codi.favorite ? '즐겨찾기 해제' : '즐겨찾기'}
            </button>
        </div>
    `;

    modal.classList.add('active');
    modal.style.display = 'flex';
}

// 상세보기 모달 닫기
function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
}

// 필터 적용
function applyFilters() {
    const periodFilter = document.getElementById('periodFilter').value;
    const themeFilter = document.getElementById('themeFilter').value;
    const ratingFilter = document.getElementById('ratingFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    let filteredData = [...allCodiHistory];

    // 기간 필터
    if (periodFilter !== 'all') {
        const now = new Date();
        const filterDate = new Date();
        
        switch (periodFilter) {
            case 'week':
                filterDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                filterDate.setMonth(now.getMonth() - 1);
                break;
            case '3month':
                filterDate.setMonth(now.getMonth() - 3);
                break;
        }
        
        filteredData = filteredData.filter(codi => new Date(codi.wearDate) >= filterDate);
    }

    // 테마 필터
    if (themeFilter !== 'all') {
        filteredData = filteredData.filter(codi => codi.theme === themeFilter);
    }

    // 만족도 필터
    if (ratingFilter !== 'all') {
        filteredData = filteredData.filter(codi => codi.satisfaction === parseInt(ratingFilter));
    }

    // 검색 필터
    if (searchInput) {
        filteredData = filteredData.filter(codi => 
            codi.codiName.toLowerCase().includes(searchInput) ||
            (codi.memo && codi.memo.toLowerCase().includes(searchInput))
        );
    }

    renderCodiHistory(filteredData);
}

// 더 많은 히스토리 로드
function loadMoreHistory() {
    showToast('모든 코디를 표시했습니다.');
    // 실제로는 서버에서 추가 데이터를 가져와야 함
}

// 통계 업데이트
function updateStats() {
    const totalCodis = allCodiHistory.length;
    const avgRating = totalCodis > 0 ? 
        (allCodiHistory.reduce((sum, codi) => sum + codi.satisfaction, 0) / totalCodis).toFixed(1) : 0;
    const favoriteCodis = allCodiHistory.filter(codi => codi.favorite).length;
    
    // 이번 달 코디 수
    const now = new Date();
    const thisMonth = allCodiHistory.filter(codi => {
        const codiDate = new Date(codi.wearDate);
        return codiDate.getMonth() === now.getMonth() && codiDate.getFullYear() === now.getFullYear();
    }).length;

    document.getElementById('totalCodis').textContent = totalCodis;
    document.getElementById('avgRating').textContent = avgRating;
    document.getElementById('favoriteCodis').textContent = favoriteCodis;
    document.getElementById('thisMonthCodis').textContent = thisMonth;
}

// 유틸리티 함수들
function formatDate(dateString) {
    return dateString.split('-').join('.');
}

function getWeatherIcon(condition) {
    const icons = {
        sunny: 'fa-sun',
        cloudy: 'fa-cloud',
        rainy: 'fa-cloud-rain',
        snowy: 'fa-snowflake'
    };
    return icons[condition] || 'fa-sun';
}

function getWeatherText(condition) {
    const texts = {
        sunny: '맑음',
        cloudy: '흐림',
        rainy: '비',
        snowy: '눈'
    };
    return texts[condition] || '맑음';
}

function getThemeText(theme) {
    const themes = {
        business: '비즈니스',
        casual: '캐주얼',
        date: '데이트',
        formal: '포멀',
        exercise: '운동',
        party: '파티',
        travel: '여행',
        school: '학교'
    };
    return themes[theme] || theme;
}

function getRatingText(rating) {
    const texts = ['', '매우 불만족', '불만족', '보통', '만족', '매우 만족'];
    return texts[rating] || '보통';
}

// 토스트 메시지 표시
function showToast(message) {
    // 기존 토스트가 있으면 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 9999;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        font-weight: 500;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 옷장으로 이동
function goToCloset() {
    window.location.href = '/templates/closet/closet.html';
}

// CSS 애니메이션 추가 (동적으로)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        color: #718096;
    }
    
    .empty-state i {
        font-size: 4rem;
        margin-bottom: 20px;
        color: #cbd5e0;
    }
    
    .empty-state h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: #4a5568;
    }
    
    .empty-state p {
        margin-bottom: 30px;
        font-size: 1.1rem;
    }
    
    /* 상세보기 모달 스타일 */
    .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .detail-title h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: #2d3748;
    }
    
    .detail-badges {
        display: flex;
        gap: 10px;
    }
    
    .favorite-badge {
        background: #fed7d7;
        color: #c53030;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
    }
    
    .date-large {
        font-size: 1.2rem;
        font-weight: 600;
        color: #2d3748;
    }
    
    .weather-detail {
        font-size: 0.9rem;
        color: #718096;
        margin-top: 5px;
    }
    
    .detail-outfit h4,
    .detail-rating h4,
    .detail-memo h4 {
        font-size: 1.1rem;
        margin-bottom: 15px;
        color: #2d3748;
        border-bottom: 2px solid #667eea;
        padding-bottom: 5px;
        display: inline-block;
    }
    
    .outfit-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .clothing-detail {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #f7fafc;
        border-radius: 10px;
    }
    
    .clothing-detail img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
    }
    
    .clothing-category {
        font-size: 0.8rem;
        color: #718096;
        margin-bottom: 5px;
    }
    
    .clothing-name-detail {
        font-weight: 600;
        color: #2d3748;
    }
    
    .rating-detail {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .stars-large {
        font-size: 2rem;
        color: #ffd700;
        margin-bottom: 10px;
    }
    
    .rating-text-large {
        font-size: 1.1rem;
        color: #4a5568;
    }
    
    .memo-content {
        background: #f7fafc;
        padding: 20px;
        border-radius: 10px;
        line-height: 1.6;
        color: #4a5568;
        margin-bottom: 30px;
    }
    
    .detail-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
    }
    
    .detail-action-btn {
        padding: 12px 24px;
        border: 2px solid #667eea;
        background: white;
        color: #667eea;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .detail-action-btn:hover {
        background: #667eea;
        color: white;
    }
    
    .detail-action-btn.favorite.active {
        background: #e53e3e;
        border-color: #e53e3e;
        color: white;
    }
`;

document.head.appendChild(style);