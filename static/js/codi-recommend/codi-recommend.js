// 전역 변수
let selectedOption = 'color';
let currentStep = 1;
let selectedCombination = null;
let selectedTopColor = null;
let selectedBottomColor = null;
let selectedSituation = null;
let selectedSeason = null;
let selectedTags = [];

// 색상 조합 데이터 (이미지 참고)
const colorCombinations = [
    {
        id: 1,
        name: '클래식 모노톤',
        desc: '세련되고 깔끔한 조합',
        colors: [
            { name: '화이트', korean: '흰색', hex: '#ffffff' },
            { name: '블랙', korean: '검은색', hex: '#000000' }
        ]
    },
    {
        id: 2,
        name: '네이비 베이직',
        desc: '안정감 있는 기본 조합',
        colors: [
            { name: '네이비', korean: '남색', hex: '#1e3a8a' },
            { name: '베이지', korean: '베이지', hex: '#d2b48c' }
        ]
    },
    {
        id: 3,
        name: '어스톤 내추럴',
        desc: '자연스럽고 따뜻한 조합',
        colors: [
            { name: '브라운', korean: '갈색', hex: '#8b4513' },
            { name: '베이지', korean: '베이지', hex: '#d2b48c' }
        ]
    },
    {
        id: 4,
        name: '소프트 페미닌',
        desc: '부드럽고 여성스러운 조합',
        colors: [
            { name: '핑크', korean: '분홍색', hex: '#ffc0cb' },
            { name: '라벤더', korean: '라벤더', hex: '#e6e6fa' }
        ]
    },
    {
        id: 5,
        name: '데님 캐주얼',
        desc: '편안하고 활동적인 조합',
        colors: [
            { name: '데님 블루', korean: '데님 블루', hex: '#4682b4' },
            { name: '화이트', korean: '흰색', hex: '#ffffff' }
        ]
    },
    {
        id: 6,
        name: '그레이 모던',
        desc: '현대적이고 세련된 조합',
        colors: [
            { name: '차콜 그레이', korean: '차콜 그레이', hex: '#36454f' },
            { name: '라이트 그레이', korean: '연한 회색', hex: '#d3d3d3' }
        ]
    },
    {
        id: 7,
        name: '올리브 내추럴',
        desc: '차분하고 자연스러운 조합',
        colors: [
            { name: '올리브', korean: '올리브색', hex: '#808000' },
            { name: '크림', korean: '크림색', hex: '#fffdd0' }
        ]
    },
    {
        id: 8,
        name: '버건디 엘레간트',
        desc: '고급스럽고 우아한 조합',
        colors: [
            { name: '버건디', korean: '버건디', hex: '#800020' },
            { name: '골드', korean: '골드', hex: '#ffd700' }
        ]
    },
    {
        id: 9,
        name: '카키 아웃도어',
        desc: '활동적이고 실용적인 조합',
        colors: [
            { name: '카키', korean: '카키색', hex: '#f0e68c' },
            { name: '다크 그린', korean: '다크 그린', hex: '#006400' }
        ]
    }
];

// 샘플 추천 결과
const sampleRecommendations = [
    {
        id: 1,
        title: '클래식 모노톤 룩',
        description: '화이트 셔츠 + 블랙 슬랙스 + 로퍼',
        image: '/static/image/mainpage/sample1.png',
        colors: ['#ffffff', '#000000', '#8b4513'],
        matchScore: 95,
        tags: ['business', 'classic']
    },
    {
        id: 2,
        title: '캐주얼 데님 스타일',
        description: '그레이 니트 + 다크 데님 + 스니커즈',
        image: '/static/image/mainpage/sample2.png',
        colors: ['#6b7280', '#1e40af', '#ffffff'],
        matchScore: 89,
        tags: ['casual', 'comfortable']
    },
    {
        id: 3,
        title: '소프트 페미닌 룩',
        description: '핑크 블라우스 + 베이지 스커트 + 플랫슈즈',
        image: '/static/image/mainpage/sample3.png',
        colors: ['#ffc0cb', '#d2b48c', '#8b4513'],
        matchScore: 92,
        tags: ['feminine', 'soft']
    },
    {
        id: 4,
        title: '트렌디 레이어드 룩',
        description: '스트라이프 셔츠 + 베스트 + 와이드 팬츠',
        image: '/static/image/mainpage/sample4.png',
        colors: ['#4f46e5', '#000000', '#374151'],
        matchScore: 87,
        tags: ['trendy', 'layered']
    }
];

// ✅ 계절별 추천 데이터 추가
const seasonRecommendations = {
    spring: [
        {
            id: 101,
            title: '봄날의 로맨틱 룩',
            description: '라벤더 가디건 + 베이지 팬츠 + 로퍼',
            image: '/static/image/mainpage/sample1.png',
            colors: ['#e6e6fa', '#d2b48c', '#8b4513'],
            matchScore: 94,
            tags: ['spring', 'romantic']
        },
        {
            id: 102,
            title: '캐주얼 봄 코디',
            description: '화이트 셔츠 + 데님 재킷 + 스니커즈',
            image: '/static/image/mainpage/sample2.png',
            colors: ['#ffffff', '#4682b4', '#000000'],
            matchScore: 91,
            tags: ['spring', 'casual']
        }
    ],
    summer: [
        {
            id: 201,
            title: '시원한 여름 룩',
            description: '린넨 셔츠 + 화이트 쇼츠 + 샌들',
            image: '/static/image/mainpage/sample3.png',
            colors: ['#87ceeb', '#ffffff', '#daa520'],
            matchScore: 96,
            tags: ['summer', 'cool']
        },
        {
            id: 202,
            title: '여름 비즈니스 캐주얼',
            description: '민트 폴로셔츠 + 베이지 치노팬츠 + 로퍼',
            image: '/static/image/mainpage/sample4.png',
            colors: ['#98fb98', '#d2b48c', '#8b4513'],
            matchScore: 88,
            tags: ['summer', 'business']
        }
    ],
    autumn: [
        {
            id: 301,
            title: '가을 감성 룩',
            description: '버건디 니트 + 브라운 팬츠 + 부츠',
            image: '/static/image/mainpage/sample1.png',
            colors: ['#800020', '#8b4513', '#2f4f4f'],
            matchScore: 93,
            tags: ['autumn', 'warm']
        },
        {
            id: 302,
            title: '레이어드 가을 스타일',
            description: '체크셔츠 + 카디건 + 데님 + 스니커즈',
            image: '/static/image/mainpage/sample2.png',
            colors: ['#daa520', '#556b2f', '#4682b4'],
            matchScore: 89,
            tags: ['autumn', 'layered']
        }
    ],
    winter: [
        {
            id: 401,
            title: '겨울 코트 룩',
            description: '울 코트 + 터틀넥 + 부츠',
            image: '/static/image/mainpage/sample3.png',
            colors: ['#2f4f4f', '#000000', '#8b4513'],
            matchScore: 97,
            tags: ['winter', 'warm']
        },
        {
            id: 402,
            title: '캐주얼 겨울 스타일',
            description: '패딩 + 후드티 + 조거팬츠 + 스니커즈',
            image: '/static/image/mainpage/sample4.png',
            colors: ['#000080', '#708090', '#000000'],
            matchScore: 85,
            tags: ['winter', 'casual']
        }
    ]
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadColorCombinations();
    updateWeatherInfo();
    suggestSeasonFromWeather();
    
    // URL 파라미터 확인해서 해당 옵션 자동 선택
    handleUrlParameters();
});

// URL 파라미터 처리 함수
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const option = urlParams.get('option');
    const hash = window.location.hash.substring(1); // # 제거
    
    if (option && ['color', 'weather', 'situation'].includes(option)) {
        // 옵션 선택
        selectOption(option);
        
        // 약간의 지연 후 스크롤 (DOM 업데이트 대기)
        setTimeout(() => {
            let targetElement;
            
            if (hash) {
                // 해시가 있으면 해당 요소로 스크롤
                targetElement = document.getElementById(hash);
            } else {
                // 해시가 없으면 해당 옵션의 폼으로 스크롤
                const formIds = {
                    'color': 'colorForm',
                    'weather': 'weatherForm', 
                    'situation': 'situationForm'
                };
                targetElement = document.getElementById(formIds[option]);
            }
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300);
    }
}

// 색상 조합 로드
function loadColorCombinations() {
    const container = document.getElementById('colorCombinations');
    if (!container) return;
    
    container.innerHTML = '';
    
    colorCombinations.forEach(combination => {
        const combinationElement = document.createElement('div');
        combinationElement.className = 'color-combination';
        combinationElement.onclick = () => selectColorCombination(combination);
        
        const colorsHtml = combination.colors.map(color => 
            `<div class="color-circle" style="background-color: ${color.hex};" title="${color.korean}"></div>`
        ).join('');
        
        combinationElement.innerHTML = `
            <div class="combination-colors">
                ${colorsHtml}
            </div>
            <div class="combination-name">${combination.name}</div>
            <div class="combination-desc">${combination.desc}</div>
        `;
        
        container.appendChild(combinationElement);
    });
}

// 색상 조합 선택
function selectColorCombination(combination) {
    selectedCombination = combination;
    
    // 모든 조합에서 selected 클래스 제거
    document.querySelectorAll('.color-combination').forEach(el => {
        el.classList.remove('selected');
    });
    
    // 선택된 조합에 selected 클래스 추가
    event.target.closest('.color-combination').classList.add('selected');
    
    // 2단계로 이동
    setTimeout(() => {
        goToStep(2);
        loadTopColorOptions();
    }, 500);
}

// 상의 색상 옵션 로드
function loadTopColorOptions() {
    const container = document.getElementById('topColorOptions');
    const selectedCombinationDiv = document.getElementById('selectedCombination');
    
    if (!selectedCombination || !container || !selectedCombinationDiv) return;
    
    // 선택된 조합 표시
    const colorsHtml = selectedCombination.colors.map(color => 
        `<div class="color-circle large" style="background-color: ${color.hex};" title="${color.korean}"></div>`
    ).join('');
    
    selectedCombinationDiv.innerHTML = `
        <div class="combination-colors">
            ${colorsHtml}
        </div>
        <div class="combination-name">${selectedCombination.name}</div>
        <div class="combination-desc">${selectedCombination.desc}</div>
    `;
    
    // 상의 색상 옵션 표시
    container.innerHTML = '';
    selectedCombination.colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.onclick = () => selectTopColor(color);
        
        colorOption.innerHTML = `
            <div class="color-circle large" style="background-color: ${color.hex};"></div>
            <div class="color-name">${color.name}</div>
            <div class="color-korean">${color.korean}</div>
        `;
        
        container.appendChild(colorOption);
    });
}

// 상의 색상 선택
function selectTopColor(color) {
    selectedTopColor = color;
    
    // 모든 색상 옵션에서 selected 클래스 제거
    document.querySelectorAll('#topColorOptions .color-option').forEach(el => {
        el.classList.remove('selected');
    });
    
    // 선택된 색상에 selected 클래스 추가
    event.target.closest('.color-option').classList.add('selected');
    
    // 3단계로 이동
    setTimeout(() => {
        goToStep(3);
        loadBottomColorOptions();
    }, 500);
}

function loadBottomColorOptions() {
    const container = document.getElementById('bottomColorOptions');
    const selectedColorsDiv = document.getElementById('selectedColors');
    
    if (!selectedTopColor || !container || !selectedColorsDiv) return;

    // 상의 색상 표시
    selectedColorsDiv.innerHTML = `
        <div class="color-selection">
            <div class="selected-color-item">
                <div class="color-label">상의</div>
                <div class="color-circle large" style="background-color: ${selectedTopColor.hex};"></div>
                <div class="color-name">${selectedTopColor.korean}</div>
            </div>
            <div class="arrow-icon">→</div>
            <div class="selected-color-item">
                <div class="color-label">하의</div>
                <div class="color-circle large" style="background-color: #f0f0f0; border: 2px dashed #ccc;"></div>
                <div class="color-name">선택해주세요</div>
            </div>
        </div>
    `;

    container.innerHTML = '';

    // 하의 후보 색상들을 담을 배열 (중복 방지 위해 Set 사용)
    const bottomColors = new Map();

    // 조합에 있는 색상 중 상의 제외
    selectedCombination.colors.forEach(color => {
        if (color.hex !== selectedTopColor.hex) {
            bottomColors.set(color.hex, color);
        }
    });

    // 추가 매칭 색상 불러오기
    const additionalColors = getMatchingColors(selectedTopColor);
    additionalColors.forEach(color => {
        if (color.hex !== selectedTopColor.hex && !bottomColors.has(color.hex)) {
            bottomColors.set(color.hex, color);
        }
    });

    // 최종 후보 렌더링
    bottomColors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.onclick = () => selectBottomColor(color);

        colorOption.innerHTML = `
            <div class="color-circle large" style="background-color: ${color.hex};"></div>
            <div class="color-name">${color.name}</div>
            <div class="color-korean">${color.korean}</div>
        `;

        container.appendChild(colorOption);
    });
}


// 상의 색상에 어울리는 추가 색상들 반환
function getMatchingColors(topColor) {
    const matchingColorData = {
        '#ffffff': [ // 화이트
            { name: '네이비', korean: '남색', hex: '#1e3a8a' },
            { name: '데님 블루', korean: '데님 블루', hex: '#4682b4' },
            { name: '카키', korean: '카키색', hex: '#f0e68c' }
        ],
        '#000000': [ // 블랙
            { name: '화이트', korean: '흰색', hex: '#ffffff' },
            { name: '라이트 그레이', korean: '연한 회색', hex: '#d3d3d3' },
            { name: '베이지', korean: '베이지', hex: '#d2b48c' }
        ],
        '#1e3a8a': [ // 네이비
            { name: '화이트', korean: '흰색', hex: '#ffffff' },
            { name: '베이지', korean: '베이지', hex: '#d2b48c' },
            { name: '라이트 그레이', korean: '연한 회색', hex: '#d3d3d3' }
        ],
        '#ffc0cb': [ // 핑크
            { name: '네이비', korean: '남색', hex: '#1e3a8a' },
            { name: '차콜 그레이', korean: '차콜 그레이', hex: '#36454f' },
            { name: '화이트', korean: '흰색', hex: '#ffffff' }
        ]
    };
    
    return matchingColorData[topColor.hex] || [];
}

// 하의 색상 선택
function selectBottomColor(color) {
    selectedBottomColor = color;
    
    // 모든 색상 옵션에서 selected 클래스 제거
    document.querySelectorAll('#bottomColorOptions .color-option').forEach(el => {
        el.classList.remove('selected');
    });
    
    // 선택된 색상에 selected 클래스 추가
    event.target.closest('.color-option').classList.add('selected');
    
    // 선택된 하의 색상 업데이트
    const selectedColorsDiv = document.getElementById('selectedColors');
    if (selectedColorsDiv) {
        selectedColorsDiv.innerHTML = `
            <div class="color-selection">
                <div class="selected-color-item">
                    <div class="color-label">상의</div>
                    <div class="color-circle large" style="background-color: ${selectedTopColor.hex};"></div>
                    <div class="color-name">${selectedTopColor.korean}</div>
                </div>
                <div class="arrow-icon">→</div>
                <div class="selected-color-item">
                    <div class="color-label">하의</div>
                    <div class="color-circle large" style="background-color: ${selectedBottomColor.hex};"></div>
                    <div class="color-name">${selectedBottomColor.korean}</div>
                </div>
            </div>
        `;
    }
    
    // 4단계로 이동
    setTimeout(() => {
        goToStep(4);
        showFinalSelection();
    }, 500);
}

// 최종 선택 표시
function showFinalSelection() {
    const finalSelectionDiv = document.getElementById('finalSelection');
    
    if (!selectedTopColor || !selectedBottomColor || !finalSelectionDiv) return;
    
    finalSelectionDiv.innerHTML = `
        <div class="color-selection">
            <div class="selected-color-item">
                <div class="color-label">상의</div>
                <div class="color-circle large" style="background-color: ${selectedTopColor.hex};"></div>
                <div class="color-name">${selectedTopColor.korean}</div>
            </div>
            <div class="arrow-icon">+</div>
            <div class="selected-color-item">
                <div class="color-label">하의</div>
                <div class="color-circle large" style="background-color: ${selectedBottomColor.hex};"></div>
                <div class="color-name">${selectedBottomColor.korean}</div>
            </div>
        </div>
        <div style="margin-top: 20px;">
            <h4 style="color: #2d3748; margin-bottom: 10px;">선택하신 색상 조합</h4>
            <p style="color: #718096; font-size: 1.1rem;">
                ${selectedTopColor.korean} 상의와 ${selectedBottomColor.korean} 하의의 완벽한 조합입니다!
            </p>
        </div>
    `;
}

// 단계 이동
function goToStep(step) {
    // 현재 단계에서 active 제거
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.color-step').forEach(s => s.classList.remove('active'));
    
    // 완료된 단계들에 completed 클래스 추가
    for (let i = 1; i < step; i++) {
        const stepEl = document.getElementById(`step${i}`);
        if (stepEl) stepEl.classList.add('completed');
    }
    
    // 새로운 단계 활성화
    const newStepEl = document.getElementById(`step${step}`);
    const newContentEl = document.getElementById(`step${step}Content`);
    
    if (newStepEl) newStepEl.classList.add('active');
    if (newContentEl) newContentEl.classList.add('active');
    
    currentStep = step;
    
    // 해당 섹션으로 스크롤
    if (newContentEl) {
        newContentEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 이전 단계로 이동
function goToPrevStep() {
    if (currentStep > 1) {
        // 현재 단계의 선택 초기화
        if (currentStep === 2) {
            selectedCombination = null;
        } else if (currentStep === 3) {
            selectedTopColor = null;
        } else if (currentStep === 4) {
            selectedBottomColor = null;
        }
        
        goToStep(currentStep - 1);
    }
}

// 추천 옵션 선택
function selectOption(option) {
    selectedOption = option;
    
    // 모든 옵션 카드에서 active 클래스 제거
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // 선택된 옵션에 active 클래스 추가
    const optionCard = document.querySelector(`[data-option="${option}"]`);
    if (optionCard) optionCard.classList.add('active');
    
    // 모든 폼 숨기기
    document.querySelectorAll('.recommend-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // 선택된 폼 보이기
    const selectedForm = document.getElementById(`${option}Form`);
    if (selectedForm) selectedForm.classList.add('active');
    
    // 결과 섹션 숨기기
    const resultsSection = document.getElementById('recommendationResults');
    if (resultsSection) resultsSection.style.display = 'none';
    
    // 색상 매칭 선택 시 초기화
    if (option === 'color') {
        currentStep = 1;
        selectedCombination = null;
        selectedTopColor = null;
        selectedBottomColor = null;
        goToStep(1);
    }
}

// 태그 토글
function toggleTag(tagElement) {
    const value = tagElement.dataset.value;
    
    if (tagElement.classList.contains('active')) {
        tagElement.classList.remove('active');
        selectedTags = selectedTags.filter(tag => tag !== value);
    } else {
        tagElement.classList.add('active');
        selectedTags.push(value);
    }
}

// 상황 선택
function selectSituation(situation) {
    selectedSituation = situation;
    
    // 모든 상황 카드에서 selected 클래스 제거
    document.querySelectorAll('.situation-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 선택된 상황에 selected 클래스 추가
    const situationCard = document.querySelector(`[data-situation="${situation}"]`);
    if (situationCard) situationCard.classList.add('selected');
    
    // 자동으로 추천받기
    setTimeout(() => {
        getSituationRecommendation();
    }, 500);
}

// ✅ 날씨 정보 업데이트 (중복 제거 및 수정)
function updateWeatherInfo() {
    // 실제로는 API에서 가져와야 하지만, 샘플 데이터 사용
    const weatherInfo = {
        location: '서울시',
        temperature: 22,
        condition: '맑음',
        humidity: 65,
        icon: '🌤️'
    };
    
    const weatherCard = document.querySelector('.weather-card');
    if (weatherCard) {
        weatherCard.innerHTML = `
            <div class="weather-icon">${weatherInfo.icon}</div>
            <div class="weather-details">
                <h4>${weatherInfo.location} 현재 날씨</h4>
                <p class="temperature">${weatherInfo.temperature}°C</p>
                <p class="weather-desc">${weatherInfo.condition}, 습도 ${weatherInfo.humidity}%</p>
            </div>
        `;
    }
}

// 온도 기반 계절 제안
function suggestSeasonFromWeather() {
    const temperature = 22; // 실제로는 weatherInfo에서 가져와야 함
    
    // 온도에 따라 추천 계절 결정
    let suggestedSeason = '';
    if (temperature >= 25) {
        suggestedSeason = 'summer';
    } else if (temperature >= 15) {
        suggestedSeason = 'spring';
    } else if (temperature >= 5) {
        suggestedSeason = 'autumn';
    } else {
        suggestedSeason = 'winter';
    }
    
    // 추천 계절에 시각적 힌트 추가
    setTimeout(() => {
        const recommendedCard = document.querySelector(`[data-season="${suggestedSeason}"]`);
        if (recommendedCard) {
            recommendedCard.style.borderColor = '#ffd700';
            recommendedCard.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.3)';
            
            // 추천 배지 추가
            const badge = document.createElement('div');
            badge.className = 'season-recommended-badge';
            badge.textContent = '추천';
            badge.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: #ffd700;
                color: #333;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.7rem;
                font-weight: bold;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            `;
            recommendedCard.style.position = 'relative';
            recommendedCard.appendChild(badge);
        }
    }, 500);
}

// 계절 선택
function selectSeason(season) {
    selectedSeason = season;
    
    // 모든 계절 카드에서 selected 클래스 제거
    document.querySelectorAll('.season-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 선택된 계절에 selected 클래스 추가
    const seasonCard = document.querySelector(`[data-season="${season}"]`);
    if (seasonCard) seasonCard.classList.add('selected');
    
    // 계절별 추천받기
    setTimeout(() => {
        getSeasonRecommendation();
    }, 500);
}

// ✅ 계절별 추천 가져오기 (수정됨)
function getSeasonRecommendation() {
    if (!selectedSeason) {
        alert('계절을 먼저 선택해주세요!');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showRecommendationResults('season');
    }, 2000);
}

// 색상 매칭 추천
function getColorRecommendation() {
    if (!selectedTopColor || !selectedBottomColor) {
        alert('색상을 모두 선택해주세요!');
        return;
    }
    
    showLoading();
    
    // 2초 후 결과 표시 (실제로는 API 호출)
    setTimeout(() => {
        hideLoading();
        showRecommendationResults('color');
    }, 2000);
}

// ✅ 날씨 기반 추천 (수정됨)
function getWeatherRecommendation() {
    // 현재 온도를 기반으로 자동으로 계절 결정
    const temperature = 22; // 실제로는 API에서 가져와야 함
    
    let autoSeason = '';
    if (temperature >= 25) {
        autoSeason = 'summer';
    } else if (temperature >= 15) {
        autoSeason = 'spring';
    } else if (temperature >= 5) {
        autoSeason = 'autumn';
    } else {
        autoSeason = 'winter';
    }
    
    selectedSeason = autoSeason;
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showRecommendationResults('weather');
    }, 2000);
}

// 상황별 추천
function getSituationRecommendation() {
    if (!selectedSituation) {
        alert('상황을 먼저 선택해주세요!');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showRecommendationResults('situation');
    }, 2000);
}

// ✅ 추천 결과 표시 (수정됨)
function showRecommendationResults(type) {
    const resultsSection = document.getElementById('recommendationResults');
    const resultsGrid = document.getElementById('resultsGrid');
    
    if (!resultsSection || !resultsGrid) return;
    
    resultsGrid.innerHTML = '';
    
    // 타입에 따라 다른 결과 표시
    let filteredRecommendations = sampleRecommendations;
    
    if (type === 'situation' && selectedSituation) {
        filteredRecommendations = sampleRecommendations.filter(rec => 
            rec.tags.includes(selectedSituation)
        );
    } else if ((type === 'season' || type === 'weather') && selectedSeason) {
        // ✅ 계절별 추천 데이터 사용
        filteredRecommendations = seasonRecommendations[selectedSeason] || sampleRecommendations;
    }
    
    if (filteredRecommendations.length === 0) {
        filteredRecommendations = sampleRecommendations.slice(0, 2);
    }
    
    filteredRecommendations.forEach((rec, index) => {
        const coordItem = document.createElement('div');
        coordItem.className = 'coord-item';
        coordItem.setAttribute('data-category', rec.tags[0] || 'all');
        
        // 계절별/날씨별 추천일 때는 해당 계절 아이콘과 온도 범위 표시
        let weatherIcon, tempRange;
        if (type === 'season' || type === 'weather') {
            const seasonData = {
                spring: { icon: '🌸', temp: '15-25°C' },
                summer: { icon: '☀️', temp: '25-35°C' },
                autumn: { icon: '🍂', temp: '10-20°C' },
                winter: { icon: '❄️', temp: '-5-15°C' }
            };
            weatherIcon = seasonData[selectedSeason]?.icon || '🌤️';
            tempRange = seasonData[selectedSeason]?.temp || '20°C';
        } else {
            // 기존 랜덤 날씨 생성
            const weatherIcons = ['☀️', '🌤️', '☁️', '🌸', '🌙', '🌅', '🌊'];
            const temperatures = ['18°C', '20°C', '22°C', '19°C', '21°C', '16°C', '23°C'];
            weatherIcon = weatherIcons[Math.floor(Math.random() * weatherIcons.length)];
            tempRange = temperatures[Math.floor(Math.random() * temperatures.length)];
        }
        
        coordItem.innerHTML = `
            <div class="coord-image" style="background-image: url('${rec.image}'); background-size: cover; background-position: center;">
                <div class="coord-badge">${index + 1}</div>
                <div class="weather-badge">${weatherIcon} ${tempRange}</div>
                <div class="coord-overlay"></div>
            </div>
            <div class="coord-info">
                <h3 class="coord-title">${rec.title}</h3>
                <p class="coord-desc">${rec.description}</p>
                <div class="rating">
                    <span class="stars">${'★'.repeat(Math.floor(rec.matchScore/20))}${'☆'.repeat(5-Math.floor(rec.matchScore/20))}</span>
                    <span class="rating-text">매칭도 ${rec.matchScore}%</span>
                </div>
                <div class="coord-actions" style="margin-top: 15px; display: flex; gap: 8px;">
                    <button class="action-btn-small" onclick="saveToFavorites(${rec.id})" style="flex: 1; padding: 8px 12px; border: 1px solid #667eea; background: white; color: #667eea; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">즐겨찾기</button>
                    <button class="action-btn-small primary" onclick="viewDetails(${rec.id})" style="flex: 1; padding: 8px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">상세보기</button>
                </div>
            </div>
        `;
        
        resultsGrid.appendChild(coordItem);
    });
    
    resultsSection.style.display = 'block';
    
    // 결과 섹션으로 스크롤
    resultsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// 로딩 표시
function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';
}

// 로딩 숨기기
function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'none';
}

// 즐겨찾기 저장
function saveToFavorites(id) {
    // 실제로는 서버에 저장
    alert('즐겨찾기에 저장되었습니다!');
}

// 상세보기
function viewDetails(id) {
    const coord = ALL_COORDS.find(c => c.id === id);
    
    if (coord) {
        showCoordDetailModal(coord);
    } else {
        showNotification('코디 정보를 찾을 수 없습니다. (ID: ' + id + ')');
    }
} 
function showCoordDetailModal(coord) {
    // ⚠️ 주의: 이 함수는 스크린샷 이미지에 보이는 레이아웃을 반영하도록 재작성됩니다. ⚠️
    
    // 1. 기존 모달 제거
    const existingModal = document.querySelector('.coord-detail-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 2. 데이터 가공 (태그, 별점)
    const tagNames = {
        'elegant': '우아한', 'autumn': '가을', 'business': '비즈니스',
        'classic': '클래식', 'romantic': '로맨틱', 'spring': '봄',
        'modern': '모던', 'winter': '겨울', 'casual': '캐주얼',
        'energetic': '활기찬', 'warm': '따뜻한', 'comfortable': '편안한',
        'sophisticated': '세련된', 'bright': '밝은', 'soft': '부드러운',
        'feminine': '여성스러운', 'fresh': '신선한', 'summer': '여름',
        'luxury': '고급스러운', 'natural': '자연스러운', 'calm': '차분한',
        'cool': '시원한', 'chic': '시크한'
    };
    
    const colorsHtml = coord.colors.map(color => 
        `<div class="modal-color-circle" style="background-color: ${color};"></div>`
    ).join('');
    
    const tagsHtml = coord.tags.map(tag => {
        return `<span class="modal-tag">${tagNames[tag] || tag}</span>`;
    }).join('');

    const fullStars = Math.floor(coord.matchScore / 20);
    const emptyStars = 5 - fullStars;
    const starsHtml = '★'.repeat(fullStars) + '☆'.repeat(emptyStars);

    // 3. 모달 HTML (스크린샷 레이아웃에 맞춰서 수정)
    const modalHtml = `
        <div class="coord-detail-modal active" id="coordDetailModal">
            <div class="modal-content-screenshot"> 
                
                <button class="modal-close-btn" onclick="closeCoordDetailModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                
                <div class="modal-image-section" style="background-image: url('${coord.image}');">
                    <div class="modal-image-overlay">
                        <h2 class="modal-coord-title-screenshot">${coord.title}</h2>
                        <span class="modal-coord-subtitle-screenshot">코디 추천</span>
                    </div>
                </div>
                
                <div class="modal-info-section">
                    
                    <div class="info-group">
                        <span class="info-label">코디 구성</span>
                        <span class="info-value">${coord.description}</span>
                    </div>
                    
                    <div class="info-group">
                        <span class="info-label">매칭도</span>
                        <div class="info-rating">
                            <span class="info-stars">${starsHtml}</span>
                            <span class="info-score">${coord.matchScore}%</span>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <span class="info-label">사용된 색상</span>
                        <div class="info-colors-palette">
                            ${colorsHtml}
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <span class="info-label">코디 번호</span>
                        <span class="info-value">#${coord.id}</span>
                    </div>

                    <div class="tip-separator"></div>
                    
                    <h3 class="styling-tip-title">스타일링 팁</h3>
                    <p class="styling-tip-text">
                        이 코디는 ${coord.tags.map(t => tagNames[t] || t).join(', ')} 스타일을 중심으로 추천됩니다. 
                        ${coord.description}의 조합은 ${coord.matchScore}%의 높은 매칭도를 자랑합니다.
                    </p>
                    <div class="styling-tip-tags">
                        ${tagsHtml}
                    </div>
                </div>
                
                <div class="modal-action-buttons">
                    <button class="action-btn-screenshot favorite-btn" id="favoriteBtn-${coord.id}" onclick="toggleFavorite(${coord.id})">
                        <span id="favoriteText-${coord.id}">♡ 즐겨찾기</span>
                    </button>
                    <button class="action-btn-screenshot close-btn" onclick="closeCoordDetailModal()">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // 4. 모달 추가 및 이벤트 처리
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleModalEsc);
}


// (4) 모달 닫기 함수
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

// (5) ESC 키 이벤트 처리
function handleModalEsc(e) {
    if (e.key === 'Escape') {
        closeCoordDetailModal();
    }
}

// (6) 모달 외부 클릭 시 닫기
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('coord-detail-modal')) {
        closeCoordDetailModal();
    }
});

// (7) 즐겨찾기 토글 (임시)
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

// (8) 공유하기 (임시)
function shareCoord(id) {
    showNotification('코디 링크가 클립보드에 복사되었습니다!');
    // 실제로는 window.location.origin + '/coord-detail.html?id=' + id 등을 클립보드에 복사
}

// (9) 알림 표시 함수 (Notification)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'coord-notification';
    notification.textContent = message;
    
    // CSS 인라인 스타일 대신 클래스를 사용하도록 수정
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
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

// (10) 애니메이션 스타일 추가 (이미 CSS에 있다면 생략 가능)
const style = document.createElement('style');
style.textContent += `
    @keyframes slideUpNotif {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideDownNotif {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }
`;
document.head.appendChild(style);

// 애니메이션 효과
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
    
    // 애니메이션 대상 요소들 관찰
    document.querySelectorAll('.option-card, .result-card, .situation-card, .color-combination').forEach(el => {
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

// 키보드 이벤트 처리
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideLoading();
    }
});

// 반응형 처리
function handleResize() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        // 모바일에서 특별 처리가 필요한 경우
        document.querySelectorAll('.progress-steps').forEach(steps => {
            steps.style.flexDirection = 'column';
            steps.style.gap = '10px';
        });
    } else {
        document.querySelectorAll('.progress-steps').forEach(steps => {
            steps.style.flexDirection = 'row';
            steps.style.gap = '0';
        });
    }
}

// **색상 조합 데이터와 코디 추천 데이터는 그대로 유지합니다.**

// 전체 코디 데이터를 통합하여 ID로 찾기 쉽게 만드는 함수
function getAllCoords() {
    let allCoords = [];
    
    // sampleRecommendations 추가
    allCoords.push(...sampleRecommendations);
    
    // seasonRecommendations 추가
    for (const key in seasonRecommendations) {
        allCoords.push(...seasonRecommendations[key]);
    }
    
    return allCoords;
}

// 통합된 코디 데이터 (페이지 로드시 사용 가능)
const ALL_COORDS = getAllCoords();



window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);