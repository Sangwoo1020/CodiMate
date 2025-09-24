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
    
    // 초기화 버튼 이벤트 리스너 수정 - 현재 탭 유지하면서 초기화
    resetPreviewBtn.addEventListener('click', () => {
        // 현재 활성화된 탭 확인
        const activeTab = document.querySelector('.tab-button.active');
        const currentTabId = activeTab ? activeTab.dataset.tab : 'preview-tab';
        
        // 미리보기 관련 데이터만 초기화
        resetPreviewData();
        
        // 현재 탭 상태 유지
        maintainCurrentTab(currentTabId);
        
        console.log(`미리보기가 초기화되었습니다. 현재 탭: ${currentTabId}`);
    });

    // 새로 추가된 요소들
    const stackedOutfitContainer = document.querySelector('.stacked-outfit-container');
    const stackedTopImage = document.getElementById('stackedTopImage');
    const stackedBottomImage = document.getElementById('stackedBottomImage');

    // 전역 상태 변수
    let currentItemType = '';
    let selectedForPreview = { top: null, bottom: null };

    // 로컬 스토리지에서 데이터 로드
    let tops = JSON.parse(localStorage.getItem('tops')) || [];
    let bottoms = JSON.parse(localStorage.getItem('bottoms')) || [];

    // 초기 렌더링
    renderItems('top');
    
    // --- 이벤트 리스너 ---

    // 탭 전환 기능
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

    // 아이템 추가 버튼 클릭 -> 모달 열기
    document.getElementById('addTopBtn').addEventListener('click', () => openModal('top'));
    document.getElementById('addBottomBtn').addEventListener('click', () => openModal('bottom'));

    // 모달 닫기
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

    // 만족도 별점 기능
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

    // 이미지 미리보기
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

    // 폼 제출
    itemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const itemName = document.getElementById('itemName').value;
        const itemImageFile = document.getElementById('itemImage').files[0];

        if (!itemName || !itemImageFile || ratingValue === 0) {
            alert('모든 필드를 채워주세요!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                name: itemName,
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
            alert('아이템이 성공적으로 등록되었습니다!');
        };
        reader.readAsDataURL(itemImageFile);
    });

    // 미리보기 옷 선택 버튼
    document.getElementById('selectTopBtn').addEventListener('click', () => openSelectModal('top'));
    document.getElementById('selectBottomBtn').addEventListener('click', () => openSelectModal('bottom'));

    // '이어 붙이기' 버튼 이벤트 리스너
    combineBtn.addEventListener('click', () => {
        if (selectedForPreview.top && selectedForPreview.bottom) {
            stackImages();
        } else {
            alert('상의와 하의를 모두 선택해주세요!');
        }
    });

    // --- 함수들 ---

    /**
     * 미리보기 관련 데이터만 초기화하는 함수
     */
    function resetPreviewData() {
        // 선택된 미리보기 데이터 초기화
        selectedForPreview = { top: null, bottom: null };
        
        // 미리보기 이미지 초기화
        if (topPreviewImg) {
            topPreviewImg.src = '';
            topPreviewBox.classList.remove('has-image');
        }
        
        if (bottomPreviewImg) {
            bottomPreviewImg.src = '';
            bottomPreviewBox.classList.remove('has-image');
        }
        
        // 합치기 버튼 숨기기
        if (combineBtn) {
            combineBtn.style.display = 'none';
        }
        
        // 이어 붙인 이미지 컨테이너 숨기기
        if (stackedOutfitContainer) {
            stackedOutfitContainer.style.display = 'none';
        }
        
        // 이어 붙인 이미지들 초기화
        if (stackedTopImage) {
            stackedTopImage.src = '';
        }
        
        if (stackedBottomImage) {
            stackedBottomImage.src = '';
        }
        
        console.log('미리보기 데이터가 초기화되었습니다.');
    }

    /**
     * 현재 탭 상태를 유지하는 함수
     * @param {string} tabId - 유지할 탭의 ID
     */
    function maintainCurrentTab(tabId) {
        // 모든 탭 비활성화
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // 지정된 탭 활성화
        const targetTabButton = document.querySelector(`[data-tab="${tabId}"]`);
        const targetTabContent = document.getElementById(tabId);
        
        if (targetTabButton && targetTabContent) {
            targetTabButton.classList.add('active');
            targetTabContent.classList.add('active');
            
            // 미리보기 탭이 아닌 경우 해당 탭의 아이템들 다시 렌더링
            const tabName = tabId.split('-')[0];
            if (tabName !== 'preview') {
                renderItems(tabName);
            }
        }
    }

    /**
     * 특정 유형의 아이템들을 렌더링합니다.
     * @param {string} type - 'top' 또는 'bottom'
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
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
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
     * 아이템을 삭제합니다.
     * @param {number} id - 삭제할 아이템의 ID
     * @param {string} type - 'top' 또는 'bottom'
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
     * 아이템 등록 모달을 엽니다.
     * @param {string} type - 'top' 또는 'bottom'
     */
    function openModal(type) {
        currentItemType = type;
        document.getElementById('modalTitle').textContent = (type === 'top' ? '상의' : '하의') + ' 등록하기';
        itemModal.style.display = 'flex';
    }

    /**
     * 미리보기용 옷 선택 모달을 엽니다.
     * @param {string} type - 'top' 또는 'bottom'
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
            selectGrid.innerHTML = '<p>등록된 아이템 X</p>';
        }

        selectModal.style.display = 'flex';
    }
    
    /**
     * 미리보기 이미지를 업데이트합니다.
     */
    function updatePreview() {
        if (selectedForPreview.top) {
            topPreviewImg.src = selectedForPreview.top.image;
            topPreviewBox.classList.add('has-image');
        } else {
            topPreviewImg.src = '';
            topPreviewBox.classList.remove('has-image');
        }
        
        if (selectedForPreview.bottom) {
            bottomPreviewImg.src = selectedForPreview.bottom.image;
            bottomPreviewBox.classList.add('has-image');
        } else {
            bottomPreviewImg.src = '';
            bottomPreviewBox.classList.remove('has-image');
        }

        // 합치기 버튼 표시/숨김 로직 추가
        if (selectedForPreview.top && selectedForPreview.bottom) {
            combineBtn.style.display = 'inline-block';
        } else {
            combineBtn.style.display = 'none';
            stackedOutfitContainer.style.display = 'none';
        }
    }

    /**
     * 상의와 하의 이미지를 위아래로 이어 붙여서 보여줍니다.
     */
    function stackImages() {
        // 미리보기 박스에 있는 이미지 소스를 가져와서 이어 붙일 이미지 요소에 넣어줍니다.
        stackedTopImage.src = selectedForPreview.top.image;
        stackedBottomImage.src = selectedForPreview.bottom.image;
        
        // 이어 붙인 이미지를 보여주는 컨테이너를 보이게 합니다.
        stackedOutfitContainer.style.display = 'flex';
    }
});