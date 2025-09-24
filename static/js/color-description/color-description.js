// 색상 매칭 데이터 (사진을 참고하여 정리)
const colorMatchingData = {
    red: {
        title: '빨강 계열 색상 매칭',
        combinations: [
            {
                topColor: { name: '버건디', hex: '#800020' },
                bottomColors: [
                    { name: '아이보리', hex: '#fffdd0', grade: 'perfect' },
                    { name: '네이비', hex: '#1e3a8a', grade: 'perfect' },
                    { name: '블랙', hex: '#000000', grade: 'good' },
                    { name: '베이지', hex: '#d2b48c', grade: 'good' },
                    { name: '옐로우', hex: '#ffd700', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '레드', hex: '#dc2626' },
                bottomColors: [
                    { name: '딥블루', hex: '#1e40af', grade: 'perfect' },
                    { name: '베이지', hex: '#d2b48c', grade: 'good' },
                    { name: '블랙', hex: '#000000', grade: 'good' },
                    { name: '그린', hex: '#16a34a', grade: 'advanced' }
                ]
            }
        ]
    },
    orange: {
        title: '주황 계열 색상 매칭',
        combinations: [
            {
                topColor: { name: '오렌지', hex: '#ea580c' },
                bottomColors: [
                    { name: '네이비', hex: '#1e3a8a', grade: 'perfect' },
                    { name: '라이트 그레이', hex: '#d3d3d3', grade: 'good' },
                    { name: '브라운', hex: '#8b4513', grade: 'good' },
                    { name: '레드', hex: '#dc2626', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '코랄', hex: '#ff7f50' },
                bottomColors: [
                    { name: '딥블루', hex: '#1e40af', grade: 'perfect' },
                    { name: '라이트 그레이', hex: '#d3d3d3', grade: 'good' },
                    { name: '카키', hex: '#556b2f', grade: 'good' },
                    { name: '오렌지', hex: '#ea580c', grade: 'advanced' }
                ]
            }
        ]
    },
    yellow: {
        title: '노랑 계열 색상 매칭',
        combinations: [
            {
                topColor: { name: '엘로우', hex: '#ffd700' },
                bottomColors: [
                    { name: '스카이 블루', hex: '#87ceeb', grade: 'perfect' },
                    { name: '라이트 그레이', hex: '#d3d3d3', grade: 'good' },
                    { name: '브라운', hex: '#8b4513', grade: 'good' },
                    { name: '오렌지', hex: '#ea580c', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '버터 옐로', hex: '#fff8dc' },
                bottomColors: [
                    { name: '네이비', hex: '#1e3a8a', grade: 'perfect' },
                    { name: '차콜', hex: '#36454f', grade: 'good' },
                    { name: '스카이 블루', hex: '#87ceeb', grade: 'good' },
                    { name: '아이보리', hex: '#fffdd0', grade: 'good' },
                    { name: '라이트 그린', hex: '#90ee90', grade: 'advanced' }
                ]
            }
        ]
    },
    green: {
        title: '초록 계열 색상 매칭',
        combinations: [
            {
                topColor: { name: '카키(올리브)', hex: '#556b2f' },
                bottomColors: [
                    { name: '네이비', hex: '#1e3a8a', grade: 'perfect' },
                    { name: '블랙', hex: '#000000', grade: 'good' },
                    { name: '브라운', hex: '#8b4513', grade: 'good' },
                    { name: '레드', hex: '#dc2626', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '포레스트 그린', hex: '#228b22' },
                bottomColors: [
                    { name: '라이트 그레이', hex: '#d3d3d3', grade: 'perfect' },
                    { name: '베이지', hex: '#d2b48c', grade: 'good' },
                    { name: '레드', hex: '#dc2626', grade: 'good' },
                    { name: '그린', hex: '#16a34a', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '세이지 그린', hex: '#9caf88' },
                bottomColors: [
                    { name: '아이보리', hex: '#fffdd0', grade: 'perfect' },
                    { name: '차콜 그레이', hex: '#36454f', grade: 'good' },
                    { name: '네이비', hex: '#1e3a8a', grade: 'good' },
                    { name: '스카이 블루', hex: '#87ceeb', grade: 'good' },
                    { name: '블랙', hex: '#000000', grade: 'advanced' }
                ]
            }
        ]
    },
    blue: {
        title: '파랑 계열 색상 매칭',
        combinations: [
            {
                topColor: { name: '딥블루', hex: '#1e40af' },
                bottomColors: [
                    { name: '아이보리', hex: '#fffdd0', grade: 'perfect' },
                    { name: '베이지', hex: '#d2b48c', grade: 'good' },
                    { name: '차콜 그레이', hex: '#36454f', grade: 'good' },
                    { name: '옐로우', hex: '#ffd700', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '네이비', hex: '#1e3a8a' },
                bottomColors: [
                    { name: '베이지', hex: '#d2b48c', grade: 'perfect' },
                    { name: '라이트 블루', hex: '#87ceeb', grade: 'good' },
                    { name: '카키', hex: '#556b2f', grade: 'good' },
                    { name: '틸(청록)', hex: '#008080', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '스카이 블루', hex: '#87ceeb' },
                bottomColors: [
                    { name: '차콜', hex: '#36454f', grade: 'perfect' },
                    { name: '라이트 그레이', hex: '#d3d3d3', grade: 'good' },
                    { name: '네이비', hex: '#1e3a8a', grade: 'good' },
                    { name: '버건디', hex: '#800020', grade: 'advanced' }
                ]
            }
        ]
    },
    purple: {
        title: '보라 계열 색상 매칭',
        combinations: [
            {
                topColor: { name: '퍼플', hex: '#7c3aed' },
                bottomColors: [
                    { name: '베이지', hex: '#d2b48c', grade: 'perfect' },
                    { name: '차콜', hex: '#36454f', grade: 'good' },
                    { name: '라이트 그레이', hex: '#d3d3d3', grade: 'good' },
                    { name: '핑크', hex: '#ffc0cb', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '라일락', hex: '#c8a2c8' },
                bottomColors: [
                    { name: '차콜 그레이', hex: '#36454f', grade: 'perfect' },
                    { name: '아이보리', hex: '#fffdd0', grade: 'good' },
                    { name: '네이비', hex: '#1e3a8a', grade: 'good' },
                    { name: '베이지', hex: '#d2b48c', grade: 'good' },
                    { name: '핑크', hex: '#ffc0cb', grade: 'advanced' }
                ]
            }
        ]
    },
    neutral: {
        title: '무채색 색상 매칭',
        combinations: [
            {
                topColor: { name: '화이트', hex: '#ffffff' },
                bottomColors: [
                    { name: '카키', hex: '#556b2f', grade: 'perfect' },
                    { name: '네이비', hex: '#1e3a8a', grade: 'perfect' },
                    { name: '블랙', hex: '#000000', grade: 'perfect' },
                    { name: '스카이 블루', hex: '#87ceeb', grade: 'good' },
                    { name: '오렌지', hex: '#ea580c', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '블랙', hex: '#000000' },
                bottomColors: [
                    { name: '스카이 블루', hex: '#87ceeb', grade: 'perfect' },
                    { name: '카키', hex: '#556b2f', grade: 'good' },
                    { name: '차콜 그레이', hex: '#36454f', grade: 'good' },
                    { name: '옐로우', hex: '#ffd700', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '라이트 그레이', hex: '#d3d3d3' },
                bottomColors: [
                    { name: '네이비', hex: '#1e3a8a', grade: 'perfect' },
                    { name: '카키', hex: '#556b2f', grade: 'good' },
                    { name: '블랙', hex: '#000000', grade: 'good' },
                    { name: '베이지', hex: '#d2b48c', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '차콜', hex: '#36454f' },
                bottomColors: [
                    { name: '아이보리', hex: '#fffdd0', grade: 'perfect' },
                    { name: '베이지', hex: '#d2b48c', grade: 'good' },
                    { name: '카키', hex: '#556b2f', grade: 'good' },
                    { name: '옐로우', hex: '#ffd700', grade: 'advanced' }
                ]
            },
            {
                topColor: { name: '크림', hex: '#fffdd0' },
                bottomColors: [
                    { name: '차콜', hex: '#36454f', grade: 'perfect' },
                    { name: '네이비', hex: '#1e3a8a', grade: 'good' },
                    { name: '카키', hex: '#556b2f', grade: 'good' },
                    { name: '브라운', hex: '#8b4513', grade: 'advanced' }
                ]
            }
        ]
    }
};

let currentCategory = 'red';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadColorCombinations(currentCategory);
});

// 카테고리 선택
function selectCategory(category) {
    currentCategory = category;
    
    // 탭 활성화 상태 변경
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // 색상 조합 로드
    loadColorCombinations(category);
}

// 색상 조합 로드
function loadColorCombinations(category) {
    const data = colorMatchingData[category];
    if (!data) return;

    // 제목 업데이트
    document.getElementById('categoryTitle').textContent = data.title;

    // 조합 표시
    const container = document.getElementById('colorCombinations');
    container.innerHTML = '';

    if (data.combinations.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i>🎨</i>
                <p>해당 색상 계열의 매칭 데이터를 준비 중입니다.</p>
            </div>
        `;
        return;
    }

    data.combinations.forEach(combination => {
        const row = document.createElement('div');
        row.className = 'color-combination-row';

        const bottomColorsHtml = combination.bottomColors.map(bottom => `
            <div class="bottom-color-item" style="position: relative;">
                <div class="bottom-color-circle" style="background-color: ${bottom.hex};"></div>
                <span class="bottom-color-name">${bottom.name}</span>
                <span class="match-grade ${bottom.grade}">
                    ${bottom.grade === 'perfect' ? '찰떡' : bottom.grade === 'good' ? '무난' : '고수의 영역'}
                </span>
            </div>
        `).join('');

        row.innerHTML = `
            <div class="top-color-section">
                <div class="color-circle" style="background-color: ${combination.topColor.hex};"></div>
                <span class="color-name">${combination.topColor.name}</span>
            </div>
            <div class="divider">→</div>
            <div class="bottom-colors-section">
                ${bottomColorsHtml}
            </div>
        `;

        container.appendChild(row);
    });

    // 스크롤 애니메이션 적용
    addScrollAnimations();
}

// 스크롤 애니메이션
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.color-combination-row').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 페이지 로드 완료 후 애니메이션 적용
window.addEventListener('load', () => {
    addScrollAnimations();
});

// 키보드 네비게이션 지원
document.addEventListener('keydown', function(e) {
    const categories = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'neutral'];
    const currentIndex = categories.indexOf(currentCategory);
    
    switch(e.key) {
        case 'ArrowLeft':
            if (currentIndex > 0) {
                selectCategory(categories[currentIndex - 1]);
            }
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (currentIndex < categories.length - 1) {
                selectCategory(categories[currentIndex + 1]);
            }
            e.preventDefault();
            break;
    }
});

// 디버깅용 함수
window.debugColorMatching = function() {
    console.log('=== 색상 매칭 디버그 정보 ===');
    console.log('현재 카테고리:', currentCategory);
    console.log('현재 데이터:', colorMatchingData[currentCategory]);
    console.log('DOM 요소들:', {
        categoryTitle: document.getElementById('categoryTitle'),
        colorCombinations: document.getElementById('colorCombinations'),
        tabs: document.querySelectorAll('.category-tab')
    });
};