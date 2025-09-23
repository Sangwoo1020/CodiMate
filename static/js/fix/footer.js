// 간단한 푸터 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 푸터가 로드될 때까지 기다린 후 초기화
    waitForFooterLoad();
});

function waitForFooterLoad() {
    const checkInterval = setInterval(() => {
        const footer = document.querySelector('.footer');
        
        if (footer) {
            clearInterval(checkInterval);
            initializeFooter();
        }
    }, 100);
    
    // 5초 후 타임아웃
    setTimeout(() => {
        clearInterval(checkInterval);
    }, 5000);
}

function initializeFooter() {
    try {
        setupFooterLinks();
        setupResponsiveFooter();
    } catch (error) {
        console.error('푸터 초기화 중 오류:', error);
    }
}

// 푸터 링크 설정
function setupFooterLinks() {
    const telLink = document.querySelector('.footer-cs-tel');
    const emailLink = document.querySelector('.footer-cs-item.email');
    
    // 전화번호 클릭 시
    if (telLink) {
        telLink.addEventListener('click', function(e) {
            e.preventDefault();
            const tel = this.textContent.replace(/[^0-9]/g, '');
            window.open(`tel:${tel}`);
        });
    }
    
    // 이메일 클릭 시
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            window.open(`mailto:${email}`);
        });
    }
}

// 반응형 푸터 조정
function setupResponsiveFooter() {
    function adjustFooterLayout() {
        const footer = document.querySelector('.footer');
        if (!footer) return;
        
        const isSmallScreen = window.innerWidth <= 768;
        const companyInfo = footer.querySelector('.footer-company-info');
        
        if (isSmallScreen) {
            companyInfo.style.textAlign = 'center';
        } else {
            companyInfo.style.textAlign = '';
        }
    }
    
    // 초기 설정
    adjustFooterLayout();
    
    // 윈도우 리사이즈 시 조정
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustFooterLayout, 250);
    });
}

// 푸터 로드 함수 (다른 페이지에서 사용)
async function loadFooter() {
    try {
        const response = await fetch('/templates/fix/footer.html');
        const footerHTML = await response.text();
        document.getElementById('footer-placeholder').innerHTML = footerHTML;
        
        // 푸터 로드 완료 후 초기화
        initializeFooter();
    } catch (error) {
        console.error('푸터 로드 실패:', error);
    }
}