document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCategories = document.querySelectorAll('.faq-categories button');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    // Toggle FAQ answers
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            // Close all other answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current answer
            const isOpen = answer.style.maxHeight;
            answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    // Filter FAQ items by category
    faqCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Update active category
            faqCategories.forEach(btn => btn.classList.remove('active'));
            category.classList.add('active');

            const selectedCategory = category.textContent.toLowerCase();
            
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    function searchFAQs() {
        const searchTerm = searchInput.value.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            const answer = item.querySelector('p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', searchFAQs);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchFAQs();
        }
    });

    // Initialize with all FAQs visible
    faqItems.forEach(item => {
        item.style.display = 'block';
    });
}); 