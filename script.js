// ----------------------------------------------------
// DevCV - JavaScript Logic for Live Preview and PDF Export
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Form Fields
    const inputFullname = document.getElementById('input-fullname');
    const inputTitle = document.getElementById('input-title');
    const inputEmail = document.getElementById('input-email');
    const inputPhone = document.getElementById('input-phone');
    const inputGithub = document.getElementById('input-github');
    const inputLinkedin = document.getElementById('input-linkedin');
    const inputWebsite = document.getElementById('input-website');
    const inputLocation = document.getElementById('input-location');
    const inputSummary = document.getElementById('input-summary');
    const inputLanguages = document.getElementById('input-languages');
    const inputFrameworks = document.getElementById('input-frameworks');
    const inputTools = document.getElementById('input-tools');
    const inputSoftskills = document.getElementById('input-softskills');
    const inputLangNative = document.getElementById('input-lang-native');

    // Dynamic Lists containers in Editor
    const experienceList = document.getElementById('experience-list');
    const projectsList = document.getElementById('projects-list');
    const educationList = document.getElementById('education-list');

    // Action Buttons
    const btnAddExperience = document.getElementById('btn-add-experience');
    const btnAddProject = document.getElementById('btn-add-project');
    const btnAddEducation = document.getElementById('btn-add-education');
    const btnSampleData = document.getElementById('btn-sample-data');
    const btnClearData = document.getElementById('btn-clear-data');
    const btnExportPdf = document.getElementById('btn-export-pdf');

    // Theme Selector Buttons
    const themeButtons = document.querySelectorAll('.theme-btn');

    // Helper to safely trigger Lucide icon creation without breaking execution
    function safeCreateIcons() {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            try {
                lucide.createIcons();
            } catch (e) {
                console.warn('Error rendering Lucide icons:', e);
            }
        }
    }

    // Counter IDs for unique identification
    let expIdCounter = 0;
    let projIdCounter = 0;
    let eduIdCounter = 0;

    // ----------------------------------------------------
    // Dynamic List Management
    // ----------------------------------------------------

    // Add Work Experience Form Group
    function addExperienceField(data = {}) {
        const id = `exp-${expIdCounter++}`;
        const itemHtml = `
            <div class="dynamic-item" id="${id}">
                <button type="button" class="btn-remove-item" title="Eliminar"><i data-lucide="x"></i></button>
                <div class="form-group">
                    <label>Puesto / Cargo</label>
                    <input type="text" class="exp-role" value="${data.role || ''}" placeholder="Ej. Desarrollador Web Prácticas">
                </div>
                <div class="form-group">
                    <label>Empresa</label>
                    <input type="text" class="exp-company" value="${data.company || ''}" placeholder="Ej. Innova Soft S.L.">
                </div>
                <div class="form-group">
                    <label>Periodo (Fechas)</label>
                    <input type="text" class="exp-dates" value="${data.dates || ''}" placeholder="Ej. Ene 2025 - Mar 2026">
                </div>
                <div class="form-group">
                    <label>Descripción / Logros</label>
                    <textarea class="exp-desc" rows="3" placeholder="Ej. Desarrollo de APIs en Java, diseño de vistas responsivas...">${data.desc || ''}</textarea>
                </div>
            </div>
        `;
        experienceList.insertAdjacentHTML('beforeend', itemHtml);
        setupItemListeners(id);
        safeCreateIcons();
        updatePreview();
    }

    // Add Project Form Group
    function addProjectField(data = {}) {
        const id = `proj-${projIdCounter++}`;
        const itemHtml = `
            <div class="dynamic-item" id="${id}">
                <button type="button" class="btn-remove-item" title="Eliminar"><i data-lucide="x"></i></button>
                <div class="form-group">
                    <label>Nombre del Proyecto</label>
                    <input type="text" class="proj-title" value="${data.title || ''}" placeholder="Ej. E-commerce App">
                </div>
                <div class="form-group">
                    <label>Tecnologías (Separadas por comas)</label>
                    <input type="text" class="proj-tech" value="${data.tech || ''}" placeholder="Ej. Flutter, Firebase, Dart">
                </div>
                <div class="form-group">
                    <label>Descripción</label>
                    <textarea class="proj-desc" rows="2" placeholder="Ej. Aplicación móvil de gestión logística con base de datos local y offline...">${data.desc || ''}</textarea>
                </div>
            </div>
        `;
        projectsList.insertAdjacentHTML('beforeend', itemHtml);
        setupItemListeners(id);
        safeCreateIcons();
        updatePreview();
    }

    // Add Education Form Group
    function addEducationField(data = {}) {
        const id = `edu-${eduIdCounter++}`;
        const itemHtml = `
            <div class="dynamic-item" id="${id}">
                <button type="button" class="btn-remove-item" title="Eliminar"><i data-lucide="x"></i></button>
                <div class="form-group">
                    <label>Titulación / Grado / Certificación</label>
                    <input type="text" class="edu-degree" value="${data.degree || ''}" placeholder="Ej. C.F.G.S. Desarrollo de Aplicaciones Web">
                </div>
                <div class="form-group">
                    <label>Centro de Estudios / Institución</label>
                    <input type="text" class="edu-school" value="${data.school || ''}" placeholder="Ej. I.E.S. Tecnológico">
                </div>
                <div class="form-group">
                    <label>Periodo (Fechas)</label>
                    <input type="text" class="edu-dates" value="${data.dates || ''}" placeholder="Ej. 2024 - 2026">
                </div>
            </div>
        `;
        educationList.insertAdjacentHTML('beforeend', itemHtml);
        setupItemListeners(id);
        safeCreateIcons();
        updatePreview();
    }

    // Setup input and delete event listeners for a dynamic item
    function setupItemListeners(itemId) {
        const item = document.getElementById(itemId);
        
        // Listen to change inputs
        const inputs = item.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updatePreview);
        });

        // Listen to delete button
        const deleteBtn = item.querySelector('.btn-remove-item');
        deleteBtn.addEventListener('click', () => {
            item.classList.add('removing');
            // Wait for potential CSS animations before deleting
            setTimeout(() => {
                item.remove();
                updatePreview();
            }, 150);
        });
    }

    // ----------------------------------------------------
    // Update Preview Logic
    // ----------------------------------------------------

    function updatePreview() {
        // 1. Personal Info
        setText('preview-fullname', inputFullname.value, 'Nombre Completo');
        setText('preview-title', inputTitle.value, 'Título Profesional / Especialidad');
        setText('preview-summary', inputSummary.value, 'Breve descripción de ti y tus objetivos en tecnología...');

        // 2. Contacts (Hide preview if field is empty, which keeps the CV super clean)
        setContact('preview-email', 'cv-contact-email-container', inputEmail.value);
        setContact('preview-phone', 'cv-contact-phone-container', inputPhone.value);
        setContact('preview-location', 'cv-contact-location-container', inputLocation.value);
        setContact('preview-website', 'cv-contact-website-container', inputWebsite.value);
        setContact('preview-github', 'cv-contact-github-container', inputGithub.value);
        setContact('preview-linkedin', 'cv-contact-linkedin-container', inputLinkedin.value);

        // 3. Dynamic Lists: Experience
        const experienceContainer = document.getElementById('preview-experience');
        const expItems = experienceList.querySelectorAll('.dynamic-item');
        const expSection = document.getElementById('cv-section-experience');
        
        if (expItems.length === 0) {
            expSection.style.display = 'none';
        } else {
            expSection.style.display = 'flex';
            experienceContainer.innerHTML = '';
            expItems.forEach(item => {
                const role = item.querySelector('.exp-role').value;
                const company = item.querySelector('.exp-company').value;
                const dates = item.querySelector('.exp-dates').value;
                const desc = item.querySelector('.exp-desc').value;

                if (role || company) {
                    const blockHtml = `
                        <div class="cv-item-block">
                            <div class="cv-item-header">
                                <div class="cv-item-title">${role || 'Puesto'}</div>
                                <div class="cv-item-meta">${company || 'Empresa'}</div>
                            </div>
                            <div class="cv-item-dates">${dates || ''}</div>
                            ${desc ? `<div class="cv-item-desc">${desc.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `;
                    experienceContainer.insertAdjacentHTML('beforeend', blockHtml);
                }
            });
        }

        // 4. Dynamic Lists: Projects
        const projectsContainer = document.getElementById('preview-projects');
        const projItems = projectsList.querySelectorAll('.dynamic-item');
        const projSection = document.getElementById('cv-section-projects');

        if (projItems.length === 0) {
            projSection.style.display = 'none';
        } else {
            projSection.style.display = 'flex';
            projectsContainer.innerHTML = '';
            projItems.forEach(item => {
                const title = item.querySelector('.proj-title').value;
                const techString = item.querySelector('.proj-tech').value;
                const desc = item.querySelector('.proj-desc').value;

                if (title) {
                    const techBadges = techString.split(',')
                        .map(t => t.trim())
                        .filter(t => t !== '')
                        .map(t => `<span class="cv-badge-tech">${t}</span>`)
                        .join('');

                    const blockHtml = `
                        <div class="cv-item-block">
                            <div class="cv-item-header">
                                <div class="cv-item-title">${title}</div>
                            </div>
                            ${desc ? `<div class="cv-item-desc">${desc.replace(/\n/g, '<br>')}</div>` : ''}
                            ${techBadges ? `<div class="cv-item-tech">${techBadges}</div>` : ''}
                        </div>
                    `;
                    projectsContainer.insertAdjacentHTML('beforeend', blockHtml);
                }
            });
        }

        // 5. Dynamic Lists: Education
        const educationContainer = document.getElementById('preview-education');
        const eduItems = educationList.querySelectorAll('.dynamic-item');
        const eduSection = document.getElementById('cv-section-education');

        if (eduItems.length === 0) {
            eduSection.style.display = 'none';
        } else {
            eduSection.style.display = 'flex';
            educationContainer.innerHTML = '';
            eduItems.forEach(item => {
                const degree = item.querySelector('.edu-degree').value;
                const school = item.querySelector('.edu-school').value;
                const dates = item.querySelector('.edu-dates').value;

                if (degree || school) {
                    const blockHtml = `
                        <div class="cv-item-block">
                            <div class="cv-item-title">${degree || 'Título'}</div>
                            <div class="cv-item-meta">${school || 'Centro'}</div>
                            <div class="cv-item-dates">${dates || ''}</div>
                        </div>
                    `;
                    educationContainer.insertAdjacentHTML('beforeend', blockHtml);
                }
            });
        }

        // 6. Skills Tags
        renderTags('preview-languages', 'preview-languages-group', inputLanguages.value);
        renderTags('preview-frameworks', 'preview-frameworks-group', inputFrameworks.value);
        renderTags('preview-tools', 'preview-tools-group', inputTools.value);
        renderTags('preview-softskills', 'preview-softskills-group', inputSoftskills.value);

        // Hide main skills container if all tags are empty
        const skillsSection = document.getElementById('cv-section-skills');
        if (!inputLanguages.value && !inputFrameworks.value && !inputTools.value && !inputSoftskills.value) {
            skillsSection.style.display = 'none';
        } else {
            skillsSection.style.display = 'flex';
        }

        // 7. Languages
        const languagesContainer = document.getElementById('preview-languages-list');
        const languagesSection = document.getElementById('cv-section-languages');
        
        if (!inputLangNative.value) {
            languagesSection.style.display = 'none';
        } else {
            languagesSection.style.display = 'flex';
            languagesContainer.innerHTML = '';
            const langs = inputLangNative.value.split(',').map(l => l.trim()).filter(l => l !== '');
            langs.forEach(langStr => {
                // Match patterns like "Spanish (Native)" or "English - B2" or just "Spanish"
                const match = langStr.match(/^([^(]+)(?:\(([^)]+)\))?$/) || [null, langStr, ''];
                const name = match[1].trim();
                const level = match[2] ? match[2].trim() : '';

                const langHtml = `
                    <div class="cv-language-item">
                        <span class="lang-name">${name}</span>
                        ${level ? `<span class="lang-level">${level}</span>` : ''}
                    </div>
                `;
                languagesContainer.insertAdjacentHTML('beforeend', langHtml);
            });
        }

        // Save progress to LocalStorage
        saveToLocalStorage();
    }

    // Helper functions for updating UI
    function setText(id, value, fallback) {
        document.getElementById(id).textContent = value.trim() !== '' ? value : fallback;
    }

    function setContact(id, containerId, value) {
        const container = document.getElementById(containerId);
        if (value.trim() === '') {
            container.style.display = 'none';
        } else {
            container.style.display = 'flex';
            document.getElementById(id).textContent = value;
        }
    }

    function renderTags(containerId, groupId, rawValue) {
        const container = document.getElementById(containerId);
        const group = document.getElementById(groupId);
        
        if (rawValue.trim() === '') {
            group.style.display = 'none';
            container.innerHTML = '';
        } else {
            group.style.display = 'flex';
            const tags = rawValue.split(',')
                .map(t => t.trim())
                .filter(t => t !== '');
            
            if (tags.length === 0) {
                group.style.display = 'none';
            } else {
                container.innerHTML = tags.map(tag => `<span class="cv-tag">${tag}</span>`).join('');
            }
        }
    }

    // Bind static form fields to input events
    [
        inputFullname, inputTitle, inputEmail, inputPhone, inputGithub,
        inputLinkedin, inputWebsite, inputLocation, inputSummary,
        inputLanguages, inputFrameworks, inputTools, inputSoftskills, inputLangNative
    ].forEach(element => {
        element.addEventListener('input', updatePreview);
    });

    // ----------------------------------------------------
    // Dynamic List Button Actions
    // ----------------------------------------------------
    btnAddExperience.addEventListener('click', () => addExperienceField());
    btnAddProject.addEventListener('click', () => addProjectField());
    btnAddEducation.addEventListener('click', () => addEducationField());

    // ----------------------------------------------------
    // Color Themes
    // ----------------------------------------------------
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all theme buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to current
            button.classList.add('active');

            // Remove existing themes from body
            document.body.className = '';
            
            // Set current theme class
            const selectedTheme = button.getAttribute('data-theme');
            document.body.classList.add(`theme-${selectedTheme}`);
            
            // Save theme
            localStorage.setItem('devcv-theme', selectedTheme);
        });
    });

    // ----------------------------------------------------
    // Load Sample Data (For Multiplatform Developer Student)
    // ----------------------------------------------------
    btnSampleData.addEventListener('click', () => {
        // Reset and enable all toggles
        document.querySelectorAll('.section-toggle').forEach(toggle => {
            toggle.checked = true;
            const sectionId = toggle.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            const accordionItem = toggle.closest('.accordion-item');
            if (targetSection) targetSection.classList.remove('hidden-section');
            if (accordionItem) accordionItem.classList.remove('section-disabled');
        });

        // Load Text fields
        inputFullname.value = 'Alejandro Silva Ramos';
        inputTitle.value = 'Desarrollador Multiplataforma Junior // Estudiante DAM';
        inputEmail.value = 'alejandro.silva@devmail.com';
        inputPhone.value = '+34 612 345 678';
        inputLocation.value = 'Barcelona, España';
        inputWebsite.value = 'alexsilva.dev';
        inputGithub.value = 'github.com/alexsilva-dev';
        inputLinkedin.value = 'linkedin.com/in/alexsilva-dev';
        inputSummary.value = 'Estudiante de 2º año de Desarrollo de Aplicaciones Multiplataforma (DAM). Apasionado por el desarrollo de aplicaciones móviles con Flutter y backend con Spring Boot. Domino clean architecture y me motiva crear software robusto, escalable y con gran experiencia de usuario. Buscando prácticas profesionales o mi primer empleo tecnológico.';
        
        inputLanguages.value = 'Java, Kotlin, Dart, JavaScript, SQL, HTML/CSS';
        inputFrameworks.value = 'Flutter, Spring Boot, Android SDK, Express.js';
        inputTools.value = 'Git, GitHub, Docker, Firebase, PostgreSQL, Android Studio, VS Code';
        inputSoftskills.value = 'Trabajo en equipo, Capacidad de aprendizaje, Metodologías Ágiles (Scrum), Clean Code';
        inputLangNative.value = 'Español (Nativo), Catalán (Nativo), Inglés (B2)';

        // Clear dynamic lists first
        experienceList.innerHTML = '';
        projectsList.innerHTML = '';
        educationList.innerHTML = '';

        // Add Experience
        addExperienceField({
            role: 'Desarrollador Flutter Junior (Prácticas)',
            company: 'ByteCrafters Studio',
            dates: 'Mar 2026 - Presente',
            desc: '• Colaboración en el desarrollo móvil multiplataforma de una app e-commerce.\n• Integración de pasarela de pagos Stripe y login con Firebase Auth.\n• Optimización en la persistencia local de datos con Hive reduciendo tiempos de espera.'
        });
        addExperienceField({
            role: 'Soporte Técnico de TI',
            company: 'Soluciones TI Innova',
            dates: 'Jun 2024 - Sep 2025',
            desc: '• Mantenimiento de bases de datos relacionales en MySQL.\n• Resolución de incidencias hardware y software para clientes corporativos.\n• Configuración y administración de entornos de red locales.'
        });

        // Add Projects
        addProjectField({
            title: 'DAM-Cinema App',
            tech: 'Flutter, Dart, Bloc, Clean Architecture, TMDB API',
            desc: 'Aplicación de catálogo de cine con búsqueda en tiempo real, persistencia sin conexión e interfaz nativa adaptada a iOS y Android. Calificada con Matrícula de Honor en el proyecto escolar.'
        });
        addProjectField({
            title: 'TaskFlow Rest API',
            tech: 'Java, Spring Boot, Spring Security, JWT, PostgreSQL, Docker',
            desc: 'Servicio web RESTful para gestión de tareas de equipo. Implementa control de accesos basado en roles (RBAC) con JWT, pruebas unitarias y empaquetado Docker completo.'
        });

        // Add Education
        addEducationField({
            degree: 'C.F.G.S. en Desarrollo de Aplicaciones Multiplataforma (DAM)',
            school: 'Instituto Tecnológico del Siglo XXI',
            dates: '2024 - 2026'
        });
        addEducationField({
            degree: 'C.F.G.M. en Sistemas Microinformáticos y Redes (SMR)',
            school: 'Colegio Técnico Metropolitano',
            dates: '2022 - 2024'
        });

        updatePreview();
    });

    // ----------------------------------------------------
    // Clear Form Data (Custom Modal Triggered)
    // ----------------------------------------------------
    const confirmModal = document.getElementById('confirm-modal');
    const modalBtnCancel = document.getElementById('modal-btn-cancel');
    const modalBtnConfirm = document.getElementById('modal-btn-confirm');

    // Show modal
    btnClearData.addEventListener('click', () => {
        confirmModal.classList.add('active');
    });

    // Hide modal on Cancel
    modalBtnCancel.addEventListener('click', () => {
        confirmModal.classList.remove('active');
    });

    // Hide modal on click outside modal-box
    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            confirmModal.classList.remove('active');
        }
    });

    // Clear and hide on Confirm
    modalBtnConfirm.addEventListener('click', () => {
        // Reset and enable all toggles
        document.querySelectorAll('.section-toggle').forEach(toggle => {
            toggle.checked = true;
            const sectionId = toggle.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            const accordionItem = toggle.closest('.accordion-item');
            if (targetSection) targetSection.classList.remove('hidden-section');
            if (accordionItem) accordionItem.classList.remove('section-disabled');
        });

        // Clear inputs
        const textInputs = [
            inputFullname, inputTitle, inputEmail, inputPhone, inputGithub,
            inputLinkedin, inputWebsite, inputLocation, inputSummary,
            inputLanguages, inputFrameworks, inputTools, inputSoftskills, inputLangNative
        ];
        textInputs.forEach(input => input.value = '');

        // Clear Dynamic Lists
        experienceList.innerHTML = '';
        projectsList.innerHTML = '';
        educationList.innerHTML = '';

        // Update Preview to blank fallback states
        updatePreview();
        
        // Hide modal
        confirmModal.classList.remove('active');
    });

    // ----------------------------------------------------
    // Export PDF (Browser Print Trigger)
    // ----------------------------------------------------
    btnExportPdf.addEventListener('click', () => {
        window.print();
    });

    // ----------------------------------------------------
    // LocalStorage State Persistence
    // ----------------------------------------------------
    function saveToLocalStorage() {
        const state = {
            fullname: inputFullname.value,
            title: inputTitle.value,
            email: inputEmail.value,
            phone: inputPhone.value,
            github: inputGithub.value,
            linkedin: inputLinkedin.value,
            website: inputWebsite.value,
            location: inputLocation.value,
            summary: inputSummary.value,
            languages: inputLanguages.value,
            frameworks: inputFrameworks.value,
            tools: inputTools.value,
            softskills: inputSoftskills.value,
            langNative: inputLangNative.value,
            experience: [],
            projects: [],
            education: [],
            toggles: {}
        };

        // Collect Toggles State
        document.querySelectorAll('.section-toggle').forEach(toggle => {
            state.toggles[toggle.getAttribute('data-section')] = toggle.checked;
        });

        // Collect Experience Items
        experienceList.querySelectorAll('.dynamic-item').forEach(item => {
            state.experience.push({
                role: item.querySelector('.exp-role').value,
                company: item.querySelector('.exp-company').value,
                dates: item.querySelector('.exp-dates').value,
                desc: item.querySelector('.exp-desc').value
            });
        });

        // Collect Project Items
        projectsList.querySelectorAll('.dynamic-item').forEach(item => {
            state.projects.push({
                title: item.querySelector('.proj-title').value,
                tech: item.querySelector('.proj-tech').value,
                desc: item.querySelector('.proj-desc').value
            });
        });

        // Collect Education Items
        educationList.querySelectorAll('.dynamic-item').forEach(item => {
            state.education.push({
                degree: item.querySelector('.edu-degree').value,
                school: item.querySelector('.edu-school').value,
                dates: item.querySelector('.edu-dates').value
            });
        });

        localStorage.setItem('devcv-state', JSON.stringify(state));
    }

    function loadFromLocalStorage() {
        // Load Theme
        const savedTheme = localStorage.getItem('devcv-theme') || 'sapphire';
        document.body.className = '';
        document.body.classList.add(`theme-${savedTheme}`);
        
        // Mark correct theme selector button active
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === savedTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Load State
        const savedStateString = localStorage.getItem('devcv-state');
        if (!savedStateString) {
            // Load Sample Data on first visit to impress the user immediately!
            btnSampleData.click();
            return;
        }

        try {
            const state = JSON.parse(savedStateString);
            if (!state) {
                btnSampleData.click();
                return;
            }
            
            // Populate text inputs
            inputFullname.value = state.fullname || '';
            inputTitle.value = state.title || '';
            inputEmail.value = state.email || '';
            inputPhone.value = state.phone || '';
            inputLocation.value = state.location || '';
            inputWebsite.value = state.website || '';
            inputGithub.value = state.github || '';
            inputLinkedin.value = state.linkedin || '';
            inputSummary.value = state.summary || '';
            inputLanguages.value = state.languages || '';
            inputFrameworks.value = state.frameworks || '';
            inputTools.value = state.tools || '';
            inputSoftskills.value = state.softskills || '';
            inputLangNative.value = state.langNative || '';

            // Clean containers
            experienceList.innerHTML = '';
            projectsList.innerHTML = '';
            educationList.innerHTML = '';

            // Rebuild Experience lists
            if (Array.isArray(state.experience)) {
                state.experience.forEach(exp => addExperienceField(exp));
            }
            // Rebuild Project lists
            if (Array.isArray(state.projects)) {
                state.projects.forEach(proj => addProjectField(proj));
            }
            // Rebuild Education lists
            if (Array.isArray(state.education)) {
                state.education.forEach(edu => addEducationField(edu));
            }

            // Restore toggles state
            if (state.toggles) {
                document.querySelectorAll('.section-toggle').forEach(toggle => {
                    const sectionId = toggle.getAttribute('data-section');
                    if (state.toggles[sectionId] !== undefined) {
                        toggle.checked = state.toggles[sectionId];
                        const targetSection = document.getElementById(sectionId);
                        const accordionItem = toggle.closest('.accordion-item');
                        if (targetSection && accordionItem) {
                            if (toggle.checked) {
                                targetSection.classList.remove('hidden-section');
                                accordionItem.classList.remove('section-disabled');
                            } else {
                                targetSection.classList.add('hidden-section');
                                accordionItem.classList.add('section-disabled');
                            }
                        }
                    }
                });
            }

            updatePreview();
        } catch (e) {
            console.error('Error parsing local storage state, loading default sample data...', e);
            btnSampleData.click();
        }
    }

    // ----------------------------------------------------
    // Section Visibility Toggles
    // ----------------------------------------------------
    const sectionToggles = document.querySelectorAll('.section-toggle');
    
    sectionToggles.forEach(toggle => {
        // Prevent accordion from toggling when clicking the checkbox
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Toggle section in preview
        toggle.addEventListener('change', () => {
            const sectionId = toggle.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            const accordionItem = toggle.closest('.accordion-item');

            if (targetSection && accordionItem) {
                if (toggle.checked) {
                    targetSection.classList.remove('hidden-section');
                    accordionItem.classList.remove('section-disabled');
                } else {
                    targetSection.classList.add('hidden-section');
                    accordionItem.classList.add('section-disabled');
                }
            }
            saveToLocalStorage();
        });
    });

    // ----------------------------------------------------
    // Initialization
    // ----------------------------------------------------
    loadFromLocalStorage();
    safeCreateIcons();
});
