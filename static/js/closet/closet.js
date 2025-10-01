document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 캐싱
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const itemModal = document.getElementById('itemModal');
    const selectModal = document.getElementById('selectModal');
    const closeButtons = document.querySelectorAll('.close-button');
    const itemForm = document.getElementById('itemForm');
    const topGrid = document.getElementById('topGrid');
    const bottomGrid = document.getElementById('bottomGrid');
    const topPreviewBox = document.getElementById('topPreviewBox');
    const bottomPreviewBox = document.getElementById('bottomPreviewBox');
    const topPreviewImg = document.getElementById('topPreviewImg');
    const bottomPreviewImg = document.getElementById('bottomPreviewImg');
    const selectGrid = document.getElementById('selectionGrid');
    const combineBtn = document.getElementById('combineBtn');
    const resetPreviewBtn = document.getElementById('resetPreviewBtn');
    
    const stackedOutfitContainer = document.querySelector('.stacked-outfit-container');
    const stackedTopImage = document.getElementById('stackedTopImage');
    const stackedBottomImage = document.getElementById('stackedBottomImage');

    // 카테고리 정의
    const categories = {
        top: ['티셔츠', '셔츠', '블라우스', '니트', '후드티', '맨투맨', '자켓', '코트', '카디건', '조끼', '패딩', '점퍼'],
        bottom: ['청바지', '슬랙스', '면바지', '반바지', '치마', '레깅스', '와이드팬츠', '조거팬츠', '스커트']
    };

    // 전역 상태 변수
    let currentItemType = '';
    let selectedForPreview = { top: null, bottom: null };
    let selectedCategory = '';
    let selectedColorFamily = '';

    // 로컬 스토리지에서 데이터 로드
    let tops = JSON.parse(localStorage.getItem('tops')) || [];
    let bottoms = JSON.parse(localStorage.getItem('bottoms')) || [];

    // 초기 렌더링
    renderItems('top');
    
    // --- 초기화 버튼 ---
    resetPreviewBtn.addEventListener('click', () => {
        const activeTab = document.querySelector('.tab-button.active');
        const currentTabId = activeTab ? activeTab.dataset.tab : 'preview-tab';
        resetPreviewData();
        maintainCurrentTab(currentTabId);
    });

    // --- 탭 전환 ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(button.dataset.tab).classList.add('active');
            
            const tabName = button.dataset.tab.split('-')[0];
            if (tabName !== 'preview') {
                renderItems(tabName);
            }
        });
    });

    // --- 아이템 추가 버튼 ---
    document.getElementById('addTopBtn').addEventListener('click', () => openModal('top'));
    document.getElementById('addBottomBtn').addEventListener('click', () => openModal('bottom'));

    // --- 모달 닫기 ---
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            itemModal.style.display = 'none';
            selectModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === itemModal) {
            itemModal.style.display = 'none';
        }
        if (event.target === selectModal) {
            selectModal.style.display = 'none';
        }
    });

    // --- 별점 기능 ---
    const stars = document.querySelectorAll('#itemRating .star');
    let ratingValue = 0;
    stars.forEach(star => {
        star.addEventListener('click', () => {
            ratingValue = star.dataset.value;
            stars.forEach(s => s.classList.remove('active'));
            for (let i = 0; i < ratingValue; i++) {
                stars[i].classList.add('active');
            }
        });
    });

    // --- 이미지 미리보기 ---
    document.getElementById('itemImage').addEventListener('change', (event) => {
        const file = event.target.files[0];
        const preview = document.getElementById('imagePreview');
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.innerHTML = `<img src="${e.target.result}" alt="미리보기 이미지">`;
            };
            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = `<p>이미지 미리보기</p>`;
        }
    });

    // --- 폼 제출 ---
    itemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const itemName = document.getElementById('itemName').value;
        const itemImageFile = document.getElementById('itemImage').files[0];

        if (!itemName || !itemImageFile || ratingValue === 0) {
            alert('모든 필드를 채워주세요!');
            return;
        }

        if (!selectedCategory) {
            alert('카테고리를 선택해주세요!');
            return;
        }

        if (!selectedColorFamily) {
            alert('색상 계열을 선택해주세요!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                name: itemName,
                category: selectedCategory,
                colorFamily: selectedColorFamily,
                rating: ratingValue,
                image: e.target.result
            };
            
            if (currentItemType === 'top') {
                tops.push(newItem);
                localStorage.setItem('tops', JSON.stringify(tops));
                renderItems('top');
            } else if (currentItemType === 'bottom') {
                bottoms.push(newItem);
                localStorage.setItem('bottoms', JSON.stringify(bottoms));
                renderItems('bottom');
            }
            
            itemModal.style.display = 'none';
            itemForm.reset();
            stars.forEach(s => s.classList.remove('active'));
            document.getElementById('imagePreview').innerHTML = `<p>이미지 미리보기</p>`;
            ratingValue = 0;
            selectedCategory = '';
            selectedColorFamily = '';
            alert('아이템이 성공적으로 등록되었습니다!');
        };
        reader.readAsDataURL(itemImageFile);
    });

    // --- 미리보기 버튼 ---
    document.getElementById('selectTopBtn').addEventListener('click', () => openSelectModal('top'));
    document.getElementById('selectBottomBtn').addEventListener('click', () => openSelectModal('bottom'));

    combineBtn.addEventListener('click', () => {
        if (selectedForPreview.top && selectedForPreview.bottom) {
            stackImages();
        } else {
            alert('상의와 하의를 모두 선택해주세요!');
        }
    });
function resetPreviewData() {
    selectedForPreview = { top: null, bottom: null };
    
    const topItem = document.getElementById('topOutfitItem');
    const bottomItem = document.getElementById('bottomOutfitItem');
    const outfitInfo = document.getElementById('outfitInfo');
    
    if (topPreviewImg) {
        topPreviewImg.src = '';
        topItem.classList.remove('has-image');
    }
    
    if (bottomPreviewImg) {
        bottomPreviewImg.src = '';
        bottomItem.classList.remove('has-image');
    }
    
    if (outfitInfo) {
        outfitInfo.style.display = 'none';
    }
    
    console.log('미리보기 데이터가 초기화되었습니다.');
}
    /**
     * 현재 탭 상태 유지
     */
    function maintainCurrentTab(tabId) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        const targetTabButton = document.querySelector(`[data-tab="${tabId}"]`);
        const targetTabContent = document.getElementById(tabId);
        
        if (targetTabButton && targetTabContent) {
            targetTabButton.classList.add('active');
            targetTabContent.classList.add('active');
            
            const tabName = tabId.split('-')[0];
            if (tabName !== 'preview') {
                renderItems(tabName);
            }
        }
    }

    /**
     * 아이템 렌더링
     */
    function renderItems(type) {
        const grid = type === 'top' ? topGrid : bottomGrid;
        const items = type === 'top' ? tops : bottoms;
        grid.innerHTML = '';
        
        if (items.length === 0) {
            grid.innerHTML = '<p class="no-item-msg">등록된 아이템이 없습니다.<br> 새로운 옷을 등록해보세요!</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.dataset.id = item.id;
            
            // 색상 계열 한글 변환
            const colorNameMap = {
                'red': '빨강', 'orange': '주황', 'yellow': '노랑', 'green': '초록',
                'blue': '파랑', 'purple': '보라', 'pink': '분홍', 'brown': '갈색',
                'white': '흰색', 'black': '검정', 'gray': '회색', 'beige': '베이지'
            };
            
            const colorName = item.colorFamily ? colorNameMap[item.colorFamily] || item.colorFamily : '';
            const categoryText = item.category || '';
            
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    ${categoryText ? `<div class="item-category">${categoryText}</div>` : ''}
                    ${colorName ? `<div class="item-color">${colorName}</div>` : ''}
                    <div class="item-rating">
                        ${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}
                    </div>
                </div>
                <button class="delete-button" data-id="${item.id}" data-type="${type}">
                    <i class="fas fa-xmark"></i>
                </button>
            `;
            grid.appendChild(card);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = parseInt(event.currentTarget.dataset.id); 
                const itemType = event.currentTarget.dataset.type; 
                if (confirm('정말 삭제하시겠습니까?')) {
                    deleteItem(itemId, itemType);
                }
            });
        });
    }

    /**
     * 아이템 삭제
     */
    function deleteItem(id, type) {
        let items = type === 'top' ? tops : bottoms;
        const newItems = items.filter(item => item.id !== id);

        if (type === 'top') {
            tops = newItems;
            localStorage.setItem('tops', JSON.stringify(tops));
            renderItems('top');
        } else {
            bottoms = newItems;
            localStorage.setItem('bottoms', JSON.stringify(bottoms));
            renderItems('bottom');
        }
        alert('아이템이 삭제되었습니다.');
    }

    /**
     * 등록 모달 열기
     */
    function openModal(type) {
        currentItemType = type;
        selectedCategory = '';
        selectedColorFamily = '';
        
        document.getElementById('modalTitle').textContent = (type === 'top' ? '상의' : '하의') + ' 등록하기';
        
        // 카테고리 체크박스 생성
        const categoryContainer = document.getElementById('categoryCheckboxes');
        categoryContainer.innerHTML = '';
        
        const categoryList = type === 'top' ? categories.top : categories.bottom;
        categoryList.forEach(cat => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'category-checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="cat-${cat}" value="${cat}">
                <label for="cat-${cat}">${cat}</label>
            `;
            categoryContainer.appendChild(checkboxItem);
            
            // 체크박스 이벤트
            const checkbox = checkboxItem.querySelector('input');
            checkbox.addEventListener('change', (e) => {
                // 단일 선택만 가능하도록
                document.querySelectorAll('.category-checkbox-item input').forEach(cb => {
                    if (cb !== e.target) cb.checked = false;
                });
                
                // 선택된 카테고리 업데이트
                selectedCategory = e.target.checked ? e.target.value : '';
                
                // 스타일 업데이트
                document.querySelectorAll('.category-checkbox-item').forEach(item => {
                    item.classList.remove('checked');
                });
                if (e.target.checked) {
                    checkboxItem.classList.add('checked');
                }
            });
        });
        
        // 색상 계열 선택 이벤트
        document.querySelectorAll('.color-family-option').forEach(option => {
            option.classList.remove('selected');
            option.addEventListener('click', function() {
                document.querySelectorAll('.color-family-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                selectedColorFamily = this.dataset.color;
            });
        });
        
        itemModal.style.display = 'flex';
    }

    /**
     * 선택 모달 열기
     */
    function openSelectModal(type) {
        currentItemType = type;
        document.getElementById('selectModalTitle').textContent = (type === 'top' ? '상의' : '하의') + ' 선택';
        const items = type === 'top' ? tops : bottoms;
        selectGrid.innerHTML = '';
        
        items.forEach(item => {
            const selectionItem = document.createElement('div');
            selectionItem.className = 'selection-item';
            selectionItem.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
            selectionItem.dataset.id = item.id;
            
            if (selectedForPreview[type] && selectedForPreview[type].id === item.id) {
                selectionItem.classList.add('selected');
            }
            
            selectionItem.addEventListener('click', () => {
                selectedForPreview[type] = item;
                updatePreview();
                selectModal.style.display = 'none';
            });
            selectGrid.appendChild(selectionItem);
        });

        if (items.length === 0) {
            selectGrid.innerHTML = '<p>등록된 아이템이 없습니다</p>';
        }

        selectModal.style.display = 'flex';
    }
    
    function updatePreview() {
    const topItem = document.getElementById('topOutfitItem');
    const bottomItem = document.getElementById('bottomOutfitItem');
    const outfitInfo = document.getElementById('outfitInfo');
    
    // 색상 맵핑
    const colorNameMap = {
        'red': '빨강', 'orange': '주황', 'yellow': '노랑', 'green': '초록',
        'blue': '파랑', 'purple': '보라', 'pink': '분홍', 'brown': '갈색',
        'white': '흰색', 'black': '검정', 'gray': '회색', 'beige': '베이지'
    };
    
    // 상의 업데이트
    if (selectedForPreview.top) {
        topPreviewImg.src = selectedForPreview.top.image;
        topItem.classList.add('has-image');
        
        document.getElementById('topName').textContent = selectedForPreview.top.name;
        document.getElementById('topCategory').textContent = selectedForPreview.top.category || '-';
        document.getElementById('topColor').textContent = colorNameMap[selectedForPreview.top.colorFamily] || '-';
    } else {
        topPreviewImg.src = '';
        topItem.classList.remove('has-image');
        
        document.getElementById('topName').textContent = '-';
        document.getElementById('topCategory').textContent = '-';
        document.getElementById('topColor').textContent = '-';
    }
    
    // 하의 업데이트
    if (selectedForPreview.bottom) {
        bottomPreviewImg.src = selectedForPreview.bottom.image;
        bottomItem.classList.add('has-image');
        
        document.getElementById('bottomName').textContent = selectedForPreview.bottom.name;
        document.getElementById('bottomCategory').textContent = selectedForPreview.bottom.category || '-';
        document.getElementById('bottomColor').textContent = colorNameMap[selectedForPreview.bottom.colorFamily] || '-';
    } else {
        bottomPreviewImg.src = '';
        bottomItem.classList.remove('has-image');
        
        document.getElementById('bottomName').textContent = '-';
        document.getElementById('bottomCategory').textContent = '-';
        document.getElementById('bottomColor').textContent = '-';
    }
    
    // 정보 표시 여부
    if (selectedForPreview.top || selectedForPreview.bottom) {
        outfitInfo.style.display = 'block';
    } else {
        outfitInfo.style.display = 'none';
    }
}


    /**
     * 이미지 이어 붙이기
     */
    function stackImages() {
        stackedTopImage.src = selectedForPreview.top.image;
        stackedBottomImage.src = selectedForPreview.bottom.image;
        stackedOutfitContainer.style.display = 'flex';
    }
});