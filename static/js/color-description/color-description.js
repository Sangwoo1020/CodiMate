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

// 카테고리별 코디 추천 데이터
const categoryCoordinationData = {
    red: [
        {
            id: 1,
            title: '우아한 버건디 룩',
            description: '버건디 니트 + 베이지 와이드팬츠 + 로퍼',
            image: '/static/image/mainpage/sample1.png',
            colors: ['#800020', '#d2b48c', '#8b4513'],
            matchScore: 95,
            tags: ['elegant', 'autumn']
        },
        {
            id: 2,
            title: '클래식 레드 스타일',
            description: '레드 블라우스 + 네이비 슬랙스 + 펌프스',
            image: '/static/image/mainpage/sample2.png',
            colors: ['#dc2626', '#1e40af', '#000000'],
            matchScore: 92,
            tags: ['business', 'classic']
        },
        {
            id: 3,
            title: '로맨틱 핑크 코디',
            description: '핑크 가디건 + 화이트 스커트 + 플랫슈즈',
            image: '/static/image/mainpage/sample3.png',
            colors: ['#ffc0cb', '#ffffff', '#d2b48c'],
            matchScore: 89,
            tags: ['romantic', 'spring']
        },
        {
            id: 4,
            title: '모던 와인 룩',
            description: '와인 재킷 + 블랙 팬츠 + 부츠',
            image: '/static/image/mainpage/sample4.png',
            colors: ['#722f37', '#000000', '#36454f'],
            matchScore: 93,
            tags: ['modern', 'winter']
        }
    ],
    orange: [
        {
            id: 5,
            title: '활기찬 오렌지 룩',
            description: '오렌지 니트 + 네이비 진 + 스니커즈',
            image: '/static/image/mainpage/sample5.png',
            colors: ['#ea580c', '#1e40af', '#ffffff'],
            matchScore: 91,
            tags: ['casual', 'energetic']
        },
        {
            id: 6,
            title: '따뜻한 코랄 스타일',
            description: '코랄 블라우스 + 베이지 팬츠 + 로퍼',
            image: '/static/image/mainpage/sample6.png',
            colors: ['#ff7f50', '#d2b48c', '#8b4513'],
            matchScore: 88,
            tags: ['warm', 'spring']
        },
        {
            id: 7,
            title: '캐주얼 오렌지 코디',
            description: '오렌지 후드 + 카키 조거팬츠 + 운동화',
            image: '/static/image/mainpage/sample7.png',
            colors: ['#ff8c00', '#556b2f', '#000000'],
            matchScore: 85,
            tags: ['casual', 'comfortable']
        },
        {
            id: 8,
            title: '세련된 테라코타 룩',
            description: '테라코타 재킷 + 그레이 팬츠 + 부츠',
            image: '/static/image/mainpage/sample8.png',
            colors: ['#cc8b65', '#d3d3d3', '#36454f'],
            matchScore: 90,
            tags: ['sophisticated', 'autumn']
        }
    ],
    yellow: [
        {
            id: 9,
            title: '밝은 옐로우 룩',
            description: '옐로우 셔츠 + 블루 진 + 로퍼',
            image: '/static/image/mainpage/sample1.png',
            colors: ['#ffd700', '#4682b4', '#8b4513'],
            matchScore: 87,
            tags: ['bright', 'spring']
        },
        {
            id: 10,
            title: '부드러운 버터 룩',
            description: '버터색 니트 + 네이비 스커트 + 플랫슈즈',
            image: '/static/image/mainpage/sample2.png',
            colors: ['#fff8dc', '#1e3a8a', '#d2b48c'],
            matchScore: 91,
            tags: ['soft', 'feminine']
        },
        {
            id: 11,
            title: '활기찬 레몬 스타일',
            description: '레몬 티셔츠 + 그레이 쇼츠 + 스니커즈',
            image: '/static/image/mainpage/sample3.png',
            colors: ['#fffacd', '#d3d3d3', '#ffffff'],
            matchScore: 84,
            tags: ['fresh', 'summer']
        },
        {
            id: 12,
            title: '고급스러운 머스타드 룩',
            description: '머스타드 코트 + 블랙 팬츠 + 부츠',
            image: '/static/image/mainpage/sample4.png',
            colors: ['#ffdb58', '#000000', '#36454f'],
            matchScore: 92,
            tags: ['luxury', 'autumn']
        }
    ],
    green: [
        {
            id: 13,
            title: '자연스러운 올리브 룩',
            description: '올리브 재킷 + 베이지 팬츠 + 로퍼',
            image: '/static/image/mainpage/sample5.png',
            colors: ['#556b2f', '#d2b48c', '#8b4513'],
            matchScore: 94,
            tags: ['natural', 'casual']
        },
        {
            id: 14,
            title: '신선한 민트 스타일',
            description: '민트 블라우스 + 화이트 스커트 + 샌들',
            image: '/static/image/mainpage/sample6.png',
            colors: ['#98fb98', '#ffffff', '#d2b48c'],
            matchScore: 88,
            tags: ['fresh', 'spring']
        },
        {
            id: 15,
            title: '클래식 포레스트 룩',
            description: '포레스트 그린 니트 + 그레이 팬츠 + 부츠',
            image: '/static/image/mainpage/sample7.png',
            colors: ['#228b22', '#d3d3d3', '#36454f'],
            matchScore: 90,
            tags: ['classic', 'winter']
        },
        {
            id: 16,
            title: '차분한 세이지 코디',
            description: '세이지 가디건 + 아이보리 팬츠 + 플랫슈즈',
            image: '/static/image/mainpage/sample8.png',
            colors: ['#9caf88', '#fffdd0', '#d2b48c'],
            matchScore: 93,
            tags: ['calm', 'elegant']
        }
    ],
    blue: [
        {
            id: 17,
            title: '시원한 스카이 블루 룩',
            description: '스카이블루 셔츠 + 화이트 팬츠 + 로퍼',
            image: '/static/image/mainpage/sample1.png',
            colors: ['#87ceeb', '#ffffff', '#8b4513'],
            matchScore: 89,
            tags: ['cool', 'summer']
        },
        {
            id: 18,
            title: '클래식 네이비 스타일',
            description: '네이비 블레이저 + 베이지 팬츠 + 로퍼',
            image: '/static/image/mainpage/sample2.png',
            colors: ['#1e3a8a', '#d2b48c', '#8b4513'],
            matchScore: 95,
            tags: ['classic', 'business']
        },
        {
            id: 19,
            title: '모던 딥블루 룩',
            description: '딥블루 니트 + 그레이 스커트 + 부츠',
            image: '/static/image/mainpage/sample3.png',
            colors: ['#1e40af', '#d3d3d3', '#36454f'],
            matchScore: 92,
            tags: ['modern', 'elegant']
        },
        {
            id: 20,
            title: '로맨틱 파우더 블루 코디',
            description: '파우더블루 블라우스 + 화이트 스커트 + 플랫슈즈',
            image: '/static/image/mainpage/sample4.png',
            colors: ['#b6d7ff', '#ffffff', '#d2b48c'],
            matchScore: 87,
            tags: ['romantic', 'spring']
        }
    ],
    purple: [
        {
            id: 21,
            title: '우아한 퍼플 룩',
            description: '퍼플 블라우스 + 베이지 팬츠 + 펌프스',
            image: '/static/image/mainpage/sample5.png',
            colors: ['#7c3aed', '#d2b48c', '#000000'],
            matchScore: 91,
            tags: ['elegant', 'sophisticated']
        },
        {
            id: 22,
            title: '로맨틱 라벤더 스타일',
            description: '라벤더 가디건 + 화이트 드레스 + 플랫슈즈',
            image: '/static/image/mainpage/sample6.png',
            colors: ['#e6e6fa', '#ffffff', '#d2b48c'],
            matchScore: 88,
            tags: ['romantic', 'feminine']
        },
        {
            id: 23,
            title: '모던 플럼 룩',
            description: '플럼 재킷 + 그레이 팬츠 + 부츠',
            image: '/static/image/mainpage/sample7.png',
            colors: ['#8b008b', '#d3d3d3', '#36454f'],
            matchScore: 90,
            tags: ['modern', 'winter']
        },
        {
            id: 24,
            title: '부드러운 라일락 코디',
            description: '라일락 니트 + 차콜 스커트 + 로퍼',
            image: '/static/image/mainpage/sample8.png',
            colors: ['#c8a2c8', '#36454f', '#8b4513'],
            matchScore: 93,
            tags: ['soft', 'elegant']
        }
    ],
    neutral: [
        {
            id: 25,
            title: '클린 화이트 룩',
            description: '화이트 셔츠 + 네이비 팬츠 + 로퍼',
            image: '/static/image/mainpage/sample1.png',
            colors: ['#ffffff', '#1e3a8a', '#8b4513'],
            matchScore: 96,
            tags: ['clean', 'classic']
        },
        {
            id: 26,
            title: '시크 블랙 스타일',
            description: '블랙 티셔츠 + 그레이 진 + 부츠',
            image: '/static/image/mainpage/sample2.png',
            colors: ['#000000', '#d3d3d3', '#36454f'],
            matchScore: 94,
            tags: ['chic', 'modern']
        },
        {
            id: 27,
            title: '소프트 그레이 룩',
            description: '그레이 니트 + 화이트 스커트 + 스니커즈',
            image: '/static/image/mainpage/sample3.png',
            colors: ['#d3d3d3', '#ffffff', '#ffffff'],
            matchScore: 90,
            tags: ['soft', 'casual']
        },
        {
            id: 28,
            title: '세련된 차콜 코디',
            description: '차콜 재킷 + 아이보리 팬츠 + 로퍼',
            image: '/static/image/mainpage/sample4.png',
            colors: ['#36454f', '#fffdd0', '#8b4513'],
            matchScore: 92,
            tags: ['sophisticated', 'business']
        }
    ]
};

let currentCategory = 'red';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadColorCombinations(currentCategory);
    loadCategoryCoordinations(currentCategory);
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
    
    // 카테고리별 코디 추천 로드
    loadCategoryCoordinations(category);
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

// 카테고리별 코디 추천 로드
function loadCategoryCoordinations(category) {
    const coordTitle = document.getElementById('coordCategoryTitle');
    const coordGrid = document.getElementById('categoryCoordGrid');
    
    if (!coordTitle || !coordGrid) return;
    
    // 카테고리명 업데이트
    const categoryNames = {
        red: '빨강 계열',
        orange: '주황 계열', 
        yellow: '노랑 계열',
        green: '초록 계열',
        blue: '파랑 계열',
        purple: '보라 계열',
        neutral: '무채색'
    };
    
    coordTitle.textContent = categoryNames[category] || '색상';
    
    // 코디 데이터 가져오기
    const coordData = categoryCoordinationData[category] || [];
    
    coordGrid.innerHTML = '';
    
    if (coordData.length === 0) {
        coordGrid.innerHTML = `
            <div class="empty-state">
                <i>👔</i>
                <p>해당 색상 계열의 코디 추천을 준비 중입니다.</p>
            </div>
        `;
        return;
    }
    
    // 4개만 표시
    const displayCoords = coordData.slice(0, 4);
    
    displayCoords.forEach((coord, index) => {
        const coordItem = document.createElement('div');
        coordItem.className = 'coord-item';
        
        const colorsHtml = coord.colors.map(color => 
            `<div class="coord-color-circle" style="background-color: ${color};"></div>`
        ).join('');
        
        coordItem.innerHTML = `
            <div class="coord-image" style="background-image: url('${coord.image}'); background-size: cover; background-position: center;">
                <div class="coord-badge">${index + 1}</div>
                <div class="color-badge">${categoryNames[category]}</div>
                <div class="coord-overlay"></div>
            </div>
            <div class="coord-info">
                <h3 class="coord-title">${coord.title}</h3>
                <p class="coord-desc">${coord.description}</p>
                <div class="coord-colors">
                    ${colorsHtml}
                </div>
                <div class="rating">
                    <span class="stars">${'★'.repeat(Math.floor(coord.matchScore/20))}${'☆'.repeat(5-Math.floor(coord.matchScore/20))}</span>
                    <span class="rating-text">매칭도 ${coord.matchScore}%</span>
                </div>
                <div class="coord-actions">
                    <button class="action-btn-small" onclick="saveToFavorites(${coord.id})">즐겨찾기</button>
                    <button class="action-btn-small primary" onclick="viewCoordDetails(${coord.id})">상세보기</button>
                </div>
            </div>
        `;
        
        coordGrid.appendChild(coordItem);
    });
    
    // 애니메이션 효과 적용
    addCoordScrollAnimations();
}

// 코디 추천 페이지로 이동
function goToCodiRecommend() {
    window.location.href = '/templates/codi-recommend/codi-recommend.html?option=color';
}

// 즐겨찾기 저장
function saveToFavorites(id) {
    alert('즐겨찾기에 저장되었습니다!');
    // 실제로는 서버에 저장하는 로직 구현
}

// 코디 상세보기
function viewCoordDetails(id) {
    // 현재 카테고리에서 해당 코디 찾기
    const coordData = categoryCoordinationData[currentCategory] || [];
    const coord = coordData.find(c => c.id === id);
    
    // 모달 생성
    showCoordDetailModal(coord);
}

function showCoordDetailModal(coord) {
    // 기존 모달 제거
    const existingModal = document.querySelector('.coord-detail-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 색상 팔레트 HTML
    const colorsHtml = coord.colors.map(color => 
        `<div class="modal-color-circle" style="background-color: ${color};"></div>`
    ).join('');
    
    // 태그 HTML
    const tagsHtml = coord.tags.map(tag => {
        const tagNames = {
            'elegant': '우아한',
            'autumn': '가을',
            'business': '비즈니스',
            'classic': '클래식',
            'romantic': '로맨틱',
            'spring': '봄',
            'modern': '모던',
            'winter': '겨울',
            'casual': '캐주얼',
            'energetic': '활기찬',
            'warm': '따뜻한',
            'comfortable': '편안한',
            'sophisticated': '세련된',
            'bright': '밝은',
            'soft': '부드러운',
            'feminine': '여성스러운',
            'fresh': '신선한',
            'summer': '여름',
            'luxury': '고급스러운',
            'natural': '자연스러운',
            'calm': '차분한',
            'cool': '시원한',
            'chic': '시크한'
        };
        return `<span class="modal-tag">${tagNames[tag] || tag}</span>`;
    }).join('');
    
    // 모달 HTML
    const modalHtml = `
        <div class="coord-detail-modal active" id="coordDetailModal">
            <div class="modal-content-detail">
                <button class="modal-close-btn" onclick="closeCoordDetailModal()">×</button>
                
                <div class="modal-header-section" style="background-image: url('${coord.image}');">
                    <div class="modal-header-overlay">
                        <h2 class="modal-coord-title">${coord.title}</h2>
                        <span class="modal-coord-category">코디 추천</span>
                    </div>
                </div>
                
                <div class="modal-body-section">
                    <div class="modal-info-grid">
                        <div class="modal-info-item">
                            <div class="modal-info-label">코디 구성</div>
                            <div class="modal-info-value">${coord.description}</div>
                        </div>
                        
                        <div class="modal-info-item">
                            <div class="modal-info-label">매칭도</div>
                            <div class="modal-rating-display">
                                <span class="modal-stars">${'★'.repeat(Math.floor(coord.matchScore/20))}${'☆'.repeat(5-Math.floor(coord.matchScore/20))}</span>
                                <span class="modal-rating-score">${coord.matchScore}%</span>
                            </div>
                        </div>
                        
                        <div class="modal-info-item">
                            <div class="modal-info-label">사용된 색상</div>
                            <div class="modal-color-palette">
                                ${colorsHtml}
                            </div>
                        </div>
                        
                        <div class="modal-info-item">
                            <div class="modal-info-label">코디 번호</div>
                            <div class="modal-info-value">#${coord.id}</div>
                        </div>
                    </div>
                    
                    <div class="modal-description-section">
                        <h3>스타일링 팁</h3>
                        <p class="modal-description-text">
                            이 코디는 ${coord.tags.includes('elegant') ? '우아하고 세련된' : coord.tags.includes('casual') ? '편안하고 활동적인' : '트렌디하고 감각적인'} 스타일을 추구하는 분들께 추천드립니다. 
                            ${coord.description}의 조합은 ${coord.matchScore}%의 높은 매칭도를 자랑하며, 
                            ${coord.tags.includes('spring') || coord.tags.includes('summer') ? '따뜻한 계절' : '추운 계절'}에 특히 잘 어울립니다.
                        </p>
                    </div>
                    
                    <div class="modal-tags">
                        ${tagsHtml}
                    </div>
                    
                    <div class="modal-actions">
                        <button class="modal-action-btn favorite" id="favoriteBtn-${coord.id}" onclick="toggleFavorite(${coord.id})">
                            <span id="favoriteText-${coord.id}">♡ 즐겨찾기</span>
                        </button>
                    <button class="modal-action-btn share" onclick="closeCoordDetailModal()">
                        닫기
                    </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 모달 추가
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';
    
    // ESC 키로 닫기
    document.addEventListener('keydown', handleModalEsc);
}

function closeCoordDetailModal() {
    const modal = document.querySelector('.coord-detail-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
    document.removeEventListener('keydown', handleModalEsc);
}

function handleModalEsc(e) {
    if (e.key === 'Escape') {
        closeCoordDetailModal();
    }
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('coord-detail-modal')) {
        closeCoordDetailModal();
    }
});

// 즐겨찾기 토글
function toggleFavorite(id) {
    const btn = document.getElementById(`favoriteBtn-${id}`);
    const text = document.getElementById(`favoriteText-${id}`);
    
    if (btn.classList.contains('added')) {
        btn.classList.remove('added');
        text.textContent = '♡ 즐겨찾기';
        showNotification('즐겨찾기에서 제거되었습니다');
    } else {
        btn.classList.add('added');
        text.textContent = '♥ 즐겨찾기 완료';
        showNotification('즐겨찾기에 추가되었습니다!');
    }
}

// 즐겨찾기 저장 (기존 함수 수정)
function saveToFavorites(id) {
    showNotification('즐겨찾기에 추가되었습니다!');
    // TODO: 백엔드 구현 시 서버에 저장
}

// 공유하기
function shareCoord(id) {
    showNotification('링크가 클립보드에 복사되었습니다!');
    // TODO: 실제 공유 기능 구현
}

// 알림 표시
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'coord-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(250, 112, 154, 0.3);
        z-index: 100000;
        animation: slideUpNotif 0.3s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDownNotif 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// 알림 애니메이션
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUpNotif {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideDownNotif {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(style);

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

// 코디 스크롤 애니메이션
function addCoordScrollAnimations() {
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
    
    document.querySelectorAll('.coord-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// 페이지 로드 완료 후 애니메이션 적용
window.addEventListener('load', () => {
    addScrollAnimations();
    addCoordScrollAnimations();
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
    console.log('색상 매칭 데이터:', colorMatchingData[currentCategory]);
    console.log('코디 추천 데이터:', categoryCoordinationData[currentCategory]);
    console.log('DOM 요소들:', {
        categoryTitle: document.getElementById('categoryTitle'),
        colorCombinations: document.getElementById('colorCombinations'),
        coordCategoryTitle: document.getElementById('coordCategoryTitle'),
        categoryCoordGrid: document.getElementById('categoryCoordGrid'),
        tabs: document.querySelectorAll('.category-tab')
    });
};