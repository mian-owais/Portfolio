// Main JavaScript File for Portfolio Website

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
});

// Update Last Modified Date
function updateLastModifiedDate() {
    const lastUpdate = document.getElementById('lastUpdate');
    if (lastUpdate) {
        const today = new Date();
        lastUpdate.textContent = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="_subject"]');
    const replyToInput = form.querySelector('input[name="_replyto"]');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const senderName = (nameInput?.value || '').trim();
    const senderEmail = (emailInput?.value || '').trim();

    if (subjectInput) {
        subjectInput.value = senderName
            ? `New portfolio contact request from ${senderName}`
            : 'New portfolio contact request';
    }

    if (replyToInput) {
        replyToInput.value = senderEmail;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.textContent || 'Send Message';
    const formData = new FormData(form);

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    }

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to send contact message.');
        }

        // Reset form
        form.reset();

        // Show success message
        showNotification('Message sent successfully. I will get back to you soon.', 'success');
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification('Error sending message. Please try again in a minute.', 'error');
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease;
        z-index: 9999;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Intersection Observer for Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navigation Link Active State
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 2px;
    }
`;
document.head.appendChild(style);

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll to Top Button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.id = 'scrollToTop';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLastModifiedDate();
    createScrollToTopButton();
    initializeContactForm();
    initializeCertificateUploads();
    loadDynamicItems();
    initializeDynamicAddButtons();
    initializeDynamicDeleteButtons();
});

// Contact Form Improvements
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '#ddd';
        });
    });
}

function initializeCertificateUploads() {
    const uploadInputs = document.querySelectorAll('.certificate-upload-input');

    uploadInputs.forEach((input) => {
        if (input.dataset.bound === 'true') return;
        input.dataset.bound = 'true';

        input.addEventListener('change', (event) => {
            const file = event.target.files && event.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                showNotification('Please choose an image file only.', 'error');
                event.target.value = '';
                return;
            }

            const card = event.target.closest('.certificate-card');
            const image = card?.querySelector('.certificate-image');

            if (!image) return;

            image.src = URL.createObjectURL(file);
            image.style.display = 'block';
        });
    });
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function askRequired(label) {
    let value = '';
    while (!value) {
        const input = window.prompt(label);
        if (input === null) return null;
        value = input.trim();
        if (!value) {
            showNotification(`${label} is required.`, 'error');
        }
    }
    return value;
}

function askOptional(label, fallback = '') {
    const input = window.prompt(label, fallback);
    if (input === null) return null;
    return input.trim();
}

const dynamicStorageKeys = {
    projects: 'portfolio.dynamic.projects',
    certificates: 'portfolio.dynamic.certificates',
    experience: 'portfolio.dynamic.experience',
    skills: 'portfolio.dynamic.skills'
};

function generateDynamicId() {
    return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function getDynamicItems(section) {
    const key = dynamicStorageKeys[section];
    if (!key) return [];
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function setDynamicItems(section, items) {
    const key = dynamicStorageKeys[section];
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(items));
}

function normalizeDynamicItems(section) {
    let changed = false;
    let items = getDynamicItems(section);

    items = items
        .filter((item) => {
            // Remove the accidental extra skill card added from UI previously.
            if (
                section === 'skills' &&
                String(item?.title || '').trim().toLowerCase() === 'blockchain'
            ) {
                changed = true;
                return false;
            }
            return true;
        })
        .map((item) => {
            if (!item.id) {
                changed = true;
                return { ...item, id: generateDynamicId() };
            }
            return item;
        });

    if (changed) {
        setDynamicItems(section, items);
    }

    return items;
}

function createProjectCardHtml(item) {
    const techItems = (item.tech || []).map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('');
    const imageBlock = item.image
        ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} project preview" class="project-image-file">`
        : '';

    return `
<div class="project-card" data-dynamic-section="projects" data-dynamic-id="${escapeHtml(item.id)}">
    <div class="project-image">
        ${imageBlock}
        <div class="project-placeholder">WEB</div>
    </div>
    <div class="project-content">
        <div class="dynamic-item-actions">
            <button type="button" class="delete-item-btn" data-section="projects" data-id="${escapeHtml(item.id)}">Delete</button>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="project-tech">${techItems}</div>
        <div class="project-links">
            <a href="${escapeHtml(item.liveDemo || '#')}" class="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>
            <a href="${escapeHtml(item.sourceCode || '#')}" class="project-link" target="_blank" rel="noopener noreferrer">Source Code</a>
        </div>
    </div>
</div>`;
}

function createCertificateCardHtml(item, id) {
    const inputId = `certificateUploadDynamic${id}`;
    const imageBlock = item.image
        ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} certificate preview" class="certificate-image">`
        : '<img src="" alt="Certificate preview" class="certificate-image" style="display:none">';

    return `
<article class="credential-card certificate-card" data-dynamic-section="certificates" data-dynamic-id="${escapeHtml(item.id)}">
    <div class="certificate-preview">
        ${imageBlock}
        <div class="certificate-fallback">Certificate Image</div>
    </div>
    <div class="certificate-upload">
        <label for="${inputId}" class="upload-button">Upload Image</label>
        <input type="file" id="${inputId}" class="certificate-upload-input" accept="image/*">
    </div>
    <div class="dynamic-item-actions">
        <button type="button" class="delete-item-btn" data-section="certificates" data-id="${escapeHtml(item.id)}">Delete</button>
    </div>
    <div class="credential-meta">${escapeHtml(item.year)} • ${escapeHtml(item.issuer)}</div>
    <h3>${escapeHtml(item.title)}</h3>
    <a href="${escapeHtml(item.link || '#')}" target="_blank" rel="noopener noreferrer" class="issuer-button">View Certificate</a>
</article>`;
}

function createExperienceCardHtml(item) {
    return `
<article class="timeline-item" data-dynamic-section="experience" data-dynamic-id="${escapeHtml(item.id)}">
    <div class="dynamic-item-actions">
        <button type="button" class="delete-item-btn" data-section="experience" data-id="${escapeHtml(item.id)}">Delete</button>
    </div>
    <div class="timeline-period">${escapeHtml(item.period)}</div>
    <h3>${escapeHtml(item.role)}</h3>
    <h4>${escapeHtml(item.organization)}</h4>
    <p>${escapeHtml(item.description)}</p>
    <a href="${escapeHtml(item.link || '#')}" target="_blank" rel="noopener noreferrer" class="resource-link">View Internship Link</a>
</article>`;
}

function createSkillCategoryHtml(item) {
    const skills = (item.skills || []).map((skill) => `<li>${escapeHtml(skill)}</li>`).join('');
    return `
<div class="skill-category" data-dynamic-section="skills" data-dynamic-id="${escapeHtml(item.id)}">
    <div class="dynamic-item-actions">
        <button type="button" class="delete-item-btn" data-section="skills" data-id="${escapeHtml(item.id)}">Delete</button>
    </div>
    <h3>${escapeHtml(item.title)}</h3>
    <ul class="skill-list">${skills}</ul>
</div>`;
}

function appendDynamicItem(section, item) {
    if (section === 'projects') {
        const list = document.getElementById('projectsList');
        if (!list) return;
        list.insertAdjacentHTML('beforeend', createProjectCardHtml(item));
        return;
    }

    if (section === 'certificates') {
        const list = document.getElementById('certificatesList');
        if (!list) return;
        const uniqueId = generateDynamicId();
        list.insertAdjacentHTML('beforeend', createCertificateCardHtml(item, uniqueId));
        initializeCertificateUploads();
        initializeDynamicDeleteButtons();
        return;
    }

    if (section === 'experience') {
        const list = document.getElementById('experienceList');
        if (!list) return;
        list.insertAdjacentHTML('beforeend', createExperienceCardHtml(item));
        return;
    }

    if (section === 'skills') {
        const list = document.getElementById('skillsList');
        if (!list) return;
        list.insertAdjacentHTML('beforeend', createSkillCategoryHtml(item));
        initializeDynamicDeleteButtons();
    }

    if (section === 'projects' || section === 'experience') {
        initializeDynamicDeleteButtons();
    }
}

function saveDynamicItem(section, item) {
    const existing = getDynamicItems(section);
    existing.push(item);
    setDynamicItems(section, existing);
}

function loadDynamicItems() {
    Object.keys(dynamicStorageKeys).forEach((section) => {
        const items = normalizeDynamicItems(section);
        items.forEach((item) => appendDynamicItem(section, item));
    });
}

function removeDynamicItem(section, id) {
    const items = getDynamicItems(section).filter((item) => String(item.id) !== String(id));
    setDynamicItems(section, items);

    const element = document.querySelector(`[data-dynamic-section="${section}"][data-dynamic-id="${id}"]`);
    if (element) {
        element.remove();
    }
}

function addProject() {
    const title = askRequired('Project title');
    if (title === null) return;

    const description = askRequired('Project description');
    if (description === null) return;

    const techRaw = askRequired('Technologies (comma separated)');
    if (techRaw === null) return;

    const liveDemo = askOptional('Live demo URL (optional)', '#');
    if (liveDemo === null) return;

    const sourceCode = askOptional('Source code URL (optional)', '#');
    if (sourceCode === null) return;

    const image = askOptional('Project image URL/path (optional)', '');
    if (image === null) return;

    const item = {
        id: generateDynamicId(),
        title,
        description,
        tech: techRaw.split(',').map((value) => value.trim()).filter(Boolean),
        liveDemo: liveDemo || '#',
        sourceCode: sourceCode || '#',
        image
    };

    appendDynamicItem('projects', item);
    saveDynamicItem('projects', item);
    showNotification('Project added successfully.', 'success');
}

function addCertificate() {
    const title = askRequired('Certificate title');
    if (title === null) return;

    const issuer = askRequired('Issuer (Udemy/Coursera/etc.)');
    if (issuer === null) return;

    const year = askRequired('Year');
    if (year === null) return;

    const link = askRequired('Certificate verification URL');
    if (link === null) return;

    const image = askOptional('Certificate image URL/path (optional)', '');
    if (image === null) return;

    const item = { id: generateDynamicId(), title, issuer, year, link, image };
    appendDynamicItem('certificates', item);
    saveDynamicItem('certificates', item);
    showNotification('Certificate added successfully.', 'success');
}

function addExperience() {
    const role = askRequired('Role / Position');
    if (role === null) return;

    const organization = askRequired('Organization name');
    if (organization === null) return;

    const period = askRequired('Period (e.g. Jan 2025 - Jun 2025)');
    if (period === null) return;

    const description = askRequired('Short description of your work');
    if (description === null) return;

    const link = askOptional('Reference URL (optional)', '#');
    if (link === null) return;

    const item = { id: generateDynamicId(), role, organization, period, description, link: link || '#' };
    appendDynamicItem('experience', item);
    saveDynamicItem('experience', item);
    showNotification('Experience added successfully.', 'success');
}

function addSkillCategory() {
    const title = askRequired('Skill category title');
    if (title === null) return;

    const skillsRaw = askRequired('Skills (comma separated)');
    if (skillsRaw === null) return;

    const item = {
        id: generateDynamicId(),
        title,
        skills: skillsRaw.split(',').map((value) => value.trim()).filter(Boolean)
    };

    appendDynamicItem('skills', item);
    saveDynamicItem('skills', item);
    showNotification('Skill category added successfully.', 'success');
}

function initializeDynamicAddButtons() {
    document.querySelectorAll('.add-item-btn').forEach((button) => {
        if (button.dataset.bound === 'true') return;
        button.dataset.bound = 'true';

        button.addEventListener('click', () => {
            const section = button.dataset.section;
            if (section === 'projects') addProject();
            if (section === 'certificates') addCertificate();
            if (section === 'experience') addExperience();
            if (section === 'skills') addSkillCategory();
        });
    });
}

function initializeDynamicDeleteButtons() {
    document.querySelectorAll('.delete-item-btn').forEach((button) => {
        if (button.dataset.bound === 'true') return;
        button.dataset.bound = 'true';

        button.addEventListener('click', () => {
            const section = button.dataset.section;
            const id = button.dataset.id;
            if (!section || !id) return;

            const shouldDelete = window.confirm('Delete this item?');
            if (!shouldDelete) return;

            removeDynamicItem(section, id);
            showNotification('Item deleted.', 'success');
        });
    });
}

// Performance Monitoring
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                console.log('Performance:', entry.name, entry.duration);
            });
        });
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        console.log('Performance observation not supported');
    }
}

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
});

// Print Portfolio
function printPortfolio() {
    window.print();
}

// Share Portfolio Function
function sharePortfolio() {
    if (navigator.share) {
        navigator.share({
            title: 'My Portfolio',
            text: 'Check out my portfolio website!',
            url: window.location.href
        }).catch(err => console.log('Share failed:', err));
    } else {
        const url = window.location.href;
        const text = `Check out my portfolio: ${url}`;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Portfolio link copied to clipboard!', 'success');
        });
    }
}

// Make functions available globally
window.scrollToSection = scrollToSection;
window.printPortfolio = printPortfolio;
window.sharePortfolio = sharePortfolio;
window.showNotification = showNotification;
