document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    document.querySelector('.search-bar').appendChild(searchResults);

    // Sample data - In a real application, this would come from your backend
    const searchableContent = {
        services: [
            { title: 'Wedding Ceremony', description: 'Complete wedding ceremony services with experienced pandits', url: 'services.html#wedding' },
            { title: 'House Warming', description: 'Griha Pravesh ceremony with traditional rituals', url: 'services.html#house-warming' },
            { title: 'Birth Ceremony', description: 'Namkaran and other birth-related ceremonies', url: 'services.html#birth' }
        ],
        pandits: [
            { name: 'Pandit Sharma', specialization: 'Wedding Ceremonies', rating: 4.8, url: 'our-pandits.html#sharma' },
            { name: 'Pandit Verma', specialization: 'House Warming', rating: 4.9, url: 'our-pandits.html#verma' },
            { name: 'Pandit Gupta', specialization: 'Birth Ceremonies', rating: 4.7, url: 'our-pandits.html#gupta' }
        ],
        faqs: [
            { question: 'How do I book a pandit?', answer: 'You can book a pandit through our website...', url: 'faq.html#booking' },
            { question: 'What services do you offer?', answer: 'We offer various religious ceremonies...', url: 'faq.html#services' }
        ]
    };

    function performSearch(query) {
        query = query.toLowerCase();
        const results = [];

        // Search in services
        searchableContent.services.forEach(service => {
            if (service.title.toLowerCase().includes(query) || 
                service.description.toLowerCase().includes(query)) {
                results.push({
                    type: 'service',
                    title: service.title,
                    description: service.description,
                    url: service.url
                });
            }
        });

        // Search in pandits
        searchableContent.pandits.forEach(pandit => {
            if (pandit.name.toLowerCase().includes(query) || 
                pandit.specialization.toLowerCase().includes(query)) {
                results.push({
                    type: 'pandit',
                    title: pandit.name,
                    description: `${pandit.specialization} • Rating: ${pandit.rating}`,
                    url: pandit.url
                });
            }
        });

        // Search in FAQs
        searchableContent.faqs.forEach(faq => {
            if (faq.question.toLowerCase().includes(query) || 
                faq.answer.toLowerCase().includes(query)) {
                results.push({
                    type: 'faq',
                    title: faq.question,
                    description: faq.answer.substring(0, 100) + '...',
                    url: faq.url
                });
            }
        });

        return results;
    }

    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            return;
        }

        const resultsList = document.createElement('ul');
        results.forEach(result => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${result.url}">
                    <div class="result-type">${result.type}</div>
                    <div class="result-title">${result.title}</div>
                    <div class="result-description">${result.description}</div>
                </a>
            `;
            resultsList.appendChild(li);
        });

        searchResults.appendChild(resultsList);
    }

    function handleSearch() {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            const results = performSearch(query);
            displayResults(results);
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    }

    // Event listeners
    searchInput.addEventListener('input', handleSearch);
    searchButton.addEventListener('click', handleSearch);

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
            searchResults.style.display = 'none';
        }
    });

    // Handle keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.style.display = 'none';
        }
    });
}); 