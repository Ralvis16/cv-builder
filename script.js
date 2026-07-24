// ----------------------------------------------------
// ProCV - JavaScript Logic for Live Preview and PDF Export
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Form Fields
    const inputFullname = document.getElementById('input-fullname');
    const inputTitle = document.getElementById('input-title');
    const inputEmail = document.getElementById('input-email');
    const inputPhone = document.getElementById('input-phone');
    const inputLink = document.getElementById('input-link');
    const inputLinkedin = document.getElementById('input-linkedin');
    const inputWebsite = document.getElementById('input-website');
    const inputLocation = document.getElementById('input-location');
    const inputSummary = document.getElementById('input-summary');

    const skillsList = document.getElementById('skills-list');
    const btnAddSkill = document.getElementById('btn-add-skill');
    const previewSkillsDynamic = document.getElementById('preview-skills-dynamic');
    
    const languagesList = document.getElementById('languages-list');
    const btnAddLanguage = document.getElementById('btn-add-language');
    const previewLanguagesList = document.getElementById('preview-languages-list');

    // Section Titles
    const inputTitleProfile = document.getElementById('input-title-profile');
    const inputTitleExperience = document.getElementById('input-title-experience');
    const inputTitleProjects = document.getElementById('input-title-projects');
    const inputTitleEducation = document.getElementById('input-title-education');
    const inputTitleSkills = document.getElementById('input-title-skills');
    const inputTitleSoftSkills = document.getElementById('input-title-softskills');
    const inputSoftSkillsDesc = document.getElementById('input-softskills-desc');
    const inputTitleLanguages = document.getElementById('input-title-languages');

    const previewTitleProfile = document.querySelector('#preview-title-profile-header span');
    const previewTitleExperience = document.querySelector('#preview-title-experience-header span');
    const previewTitleProjects = document.querySelector('#preview-title-projects-header span');
    const previewTitleEducation = document.querySelector('#preview-title-education-header span');
    const previewTitleSkills = document.querySelector('#preview-title-skills-header span');
    const previewTitleSoftSkills = document.querySelector('#preview-title-softskills-header span');
    const previewSoftSkillsDesc = document.getElementById('preview-softskills-desc');
    const previewTitleLanguages = document.querySelector('#preview-title-languages-header span');

    // Photo Elements
    const inputPhoto = document.getElementById('input-photo');
    const btnRemovePhoto = document.getElementById('btn-remove-photo');
    const previewPhoto = document.getElementById('preview-photo');
    let currentPhoto = null;

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
    const btnImportJson = document.getElementById('btn-import-json');
    const btnExportJson = document.getElementById('btn-export-json');
    const inputJsonFile = document.getElementById('input-json-file');

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
    let skillIdCounter = 0;
    let langIdCounter = 0;

    // ----------------------------------------------------
    // Dynamic List Management
    // ----------------------------------------------------

    function createDynamicItemContainer(id, innerHtml) {
        return `
            <div class="dynamic-item" id="${id}">
                <div class="item-controls">
                    <button type="button" class="btn-item-control btn-move-up" title="Subir"><i data-lucide="arrow-up"></i></button>
                    <button type="button" class="btn-item-control btn-move-down" title="Bajar"><i data-lucide="arrow-down"></i></button>
                    <button type="button" class="btn-remove-item" title="Eliminar"><i data-lucide="x"></i></button>
                </div>
                ${innerHtml}
            </div>
        `;
    }

    // Add Work Experience Form Group
    function addExperienceField(data = {}) {
        const id = `exp-${expIdCounter++}`;
        const innerHtml = `
                <div class="form-group grid-2">
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
                    <textarea class="exp-desc bullet-textarea" rows="3" placeholder="Ej. Desarrollo de APIs en Java, diseño de vistas responsivas...">${data.desc || ''}</textarea>
                </div>
        `;
        experienceList.insertAdjacentHTML('beforeend', createDynamicItemContainer(id, innerHtml));
        setupItemListeners(id);
        safeCreateIcons();
        updatePreview();
    }

    // Add Project Form Group
    function addProjectField(data = {}) {
        const id = `proj-${projIdCounter++}`;
        const innerHtml = `
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
        `;
        projectsList.insertAdjacentHTML('beforeend', createDynamicItemContainer(id, innerHtml));
        setupItemListeners(id);
        safeCreateIcons();
        updatePreview();
    }

    // Add Education Form Group
    function addEducationField(data = {}) {
        const id = `edu-${eduIdCounter++}`;
        const innerHtml = `
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
        `;
        educationList.insertAdjacentHTML('beforeend', createDynamicItemContainer(id, innerHtml));
        setupItemListeners(id);
        safeCreateIcons();
        updatePreview();
    }

    // Add Skill Form Group
    function addSkillField(name = '', level = '4') {
        const id = `skill-${skillIdCounter++}`;
        const innerHtml = `
                <div class="form-group">
                    <label>Habilidad / Tecnología</label>
                    <input type="text" class="skill-name" value="${name}" placeholder="Ej. Liderazgo, React, Excel">
                </div>
                <input type="hidden" class="skill-level" value="${level}">
        `;
        if(skillsList) skillsList.insertAdjacentHTML('beforeend', createDynamicItemContainer(id, innerHtml));
        setupItemListeners(id);
        safeCreateIcons();
        updatePreview();
    }

    // Add Language Form Group
    function addLanguageField(name = '', level = 'Básico') {
        const id = `lang-${langIdCounter++}`;
        const innerHtml = `
                <div class="form-group grid-2">
                    <div>
                        <label>Idioma</label>
                        <input type="text" class="lang-name" value="${name}" placeholder="Ej. Inglés">
                    </div>
                    <div>
                        <label>Nivel</label>
                        <select class="lang-level">
                            <option value="Básico" ${level === 'Básico' ? 'selected' : ''}>Básico</option>
                            <option value="Intermedio" ${level === 'Intermedio' ? 'selected' : ''}>Intermedio</option>
                            <option value="Avanzado" ${level === 'Avanzado' ? 'selected' : ''}>Avanzado</option>
                            <option value="Bilingüe" ${level === 'Bilingüe' ? 'selected' : ''}>Bilingüe</option>
                            <option value="Nativo" ${level === 'Nativo' ? 'selected' : ''}>Nativo</option>
                        </select>
                    </div>
                </div>
        `;
        if(languagesList) languagesList.insertAdjacentHTML('beforeend', createDynamicItemContainer(id, innerHtml));
        setupItemListeners(id);
        safeCreateIcons();
        updatePreview();
    }

    // Setup input and delete event listeners for a dynamic item
    function setupItemListeners(itemId) {
        const item = document.getElementById(itemId);
        
        // Listen to change inputs
        const inputs = item.querySelectorAll('input, textarea, select');
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

        // Listen to move up button
        const moveUpBtn = item.querySelector('.btn-move-up');
        moveUpBtn.addEventListener('click', () => {
            const prev = item.previousElementSibling;
            if (prev) {
                item.parentNode.insertBefore(item, prev);
                updatePreview();
            }
        });

        // Listen to move down button
        const moveDownBtn = item.querySelector('.btn-move-down');
        moveDownBtn.addEventListener('click', () => {
            const next = item.nextElementSibling;
            if (next) {
                item.parentNode.insertBefore(next, item);
                updatePreview();
            }
        });
    }

    // ----------------------------------------------------
    // Photo Upload Logic
    // ----------------------------------------------------
    if (inputPhoto) {
        inputPhoto.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    currentPhoto = event.target.result;
                    updatePreview();
                    saveToLocalStorage();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnRemovePhoto) {
        btnRemovePhoto.addEventListener('click', () => {
            currentPhoto = null;
            inputPhoto.value = '';
            updatePreview();
            saveToLocalStorage();
        });
    }

    // ----------------------------------------------------
    // Update Preview Logic
    // ----------------------------------------------------

    function updatePhotoPreview() {
        if (currentPhoto) {
            previewPhoto.src = currentPhoto;
            previewPhoto.style.display = 'block';
            if(btnRemovePhoto) btnRemovePhoto.style.display = 'inline-flex';
        } else {
            previewPhoto.src = '';
            previewPhoto.style.display = 'none';
            if(btnRemovePhoto) btnRemovePhoto.style.display = 'none';
            if(inputPhoto) inputPhoto.value = '';
        }
    }

    function updateSectionTitlesPreview() {
        if(previewTitleProfile) previewTitleProfile.textContent = inputTitleProfile.value || 'Perfil Profesional';
        if(previewTitleExperience) previewTitleExperience.textContent = inputTitleExperience.value || 'Experiencia Laboral';
        if(previewTitleProjects) previewTitleProjects.textContent = inputTitleProjects.value || 'Proyectos';
        if(previewTitleEducation) previewTitleEducation.textContent = inputTitleEducation.value || 'Formación';
        if(previewTitleSkills) previewTitleSkills.textContent = inputTitleSkills.value || 'Tecnología';
        if(previewTitleSoftSkills) previewTitleSoftSkills.textContent = inputTitleSoftSkills.value || 'Habilidades';
        if(previewTitleLanguages) previewTitleLanguages.textContent = inputTitleLanguages.value || 'Idiomas';
    }

    function updateTextAndContactPreview() {
        // 1. Personal Info
        setText('preview-fullname', inputFullname.value, 'Nombre Completo');
        setText('preview-title', inputTitle.value, 'Título Profesional / Especialidad');
        setText('preview-summary', inputSummary.value, 'Breve descripción de ti y tus objetivos en tecnología...');

        // 2. Contacts
        setContact('preview-email', 'cv-contact-email-container', inputEmail.value);
        setContact('preview-phone', 'cv-contact-phone-container', inputPhone.value);
        setContact('preview-location', 'cv-contact-location-container', inputLocation.value);
        setContact('preview-website', 'cv-contact-website-container', inputWebsite.value);
        setContact('preview-link', 'cv-contact-link-container', inputLink.value);
        setContact('preview-linkedin', 'cv-contact-linkedin-container', inputLinkedin.value);
    }

    function updateExperiencePreview() {
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
    }

    function updateProjectsPreview() {
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
    }

    function updateEducationPreview() {
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
    }

    function updateSkillsPreview() {
        const skillsItems = skillsList.querySelectorAll('.dynamic-item');
        const skillsSection = document.getElementById('cv-section-skills');
        
        if (skillsItems.length === 0) {
            skillsSection.style.display = 'none';
        } else {
            skillsSection.style.display = 'flex';
            if (previewSkillsDynamic) {
                previewSkillsDynamic.innerHTML = '';
                const tagsContainer = document.createElement('div');
                tagsContainer.className = 'cv-tags';
                
                skillsItems.forEach(item => {
                    const name = item.querySelector('.skill-name').value;
                    
                    if (name) {
                        const skillHtml = `<span class="cv-tag">${name}</span>`;
                        tagsContainer.insertAdjacentHTML('beforeend', skillHtml);
                    }
                });
                previewSkillsDynamic.appendChild(tagsContainer);
            }
        }
    }

    function updateSoftSkillsPreview() {
        const text = inputSoftSkillsDesc.value;
        const softSkillsSection = document.getElementById('cv-section-softskills');
        if (text.trim() === '') {
            softSkillsSection.style.display = 'none';
        } else {
            softSkillsSection.style.display = 'flex';
            if(previewSoftSkillsDesc) {
                previewSoftSkillsDesc.textContent = text;
            }
        }
    }

    function updateLanguagesPreview() {
        if (previewLanguagesList) {
            previewLanguagesList.innerHTML = '';
            let hasLangs = false;
            
            const langItems = document.querySelectorAll('#languages-list .dynamic-item');
            langItems.forEach(item => {
                const name = item.querySelector('.lang-name').value.trim();
                const level = item.querySelector('.lang-level').value.trim();

                if (name) {
                    hasLangs = true;
                    const langDiv = document.createElement('div');
                    langDiv.style.marginBottom = '5px';
                    langDiv.innerHTML = `<strong>${name}:</strong> ${level}`;
                    previewLanguagesList.appendChild(langDiv);
                }
            });

            const langSection = document.getElementById('cv-section-languages');
            if (langSection) {
                if (!hasLangs && langItems.length === 0) {
                    langSection.style.display = 'none';
                } else {
                    langSection.style.display = 'block';
                }
            }
        }
    }

    function updatePreview() {
        updatePhotoPreview();
        updateSectionTitlesPreview();
        updateTextAndContactPreview();
        updateExperiencePreview();
        updateProjectsPreview();
        updateEducationPreview();
        updateSkillsPreview();
        updateSoftSkillsPreview();
        updateLanguagesPreview();
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



    // Bind static form fields to input events
    [
        inputFullname, inputTitle, inputEmail, inputPhone, inputLink,
        inputLinkedin, inputWebsite, inputLocation, inputSummary,
        inputTitleProfile, inputTitleExperience, inputTitleProjects, inputTitleEducation, inputTitleSkills, inputTitleSoftSkills, inputSoftSkillsDesc, inputTitleLanguages
    ].forEach(element => {
        element.addEventListener('input', updatePreview);
    });

    // ----------------------------------------------------
    // Dynamic List Button Actions
    // ----------------------------------------------------
    btnAddExperience.addEventListener('click', () => addExperienceField());
    btnAddProject.addEventListener('click', () => addProjectField());
    btnAddEducation.addEventListener('click', () => addEducationField());
    if(btnAddSkill) {
        btnAddSkill.addEventListener('click', () => {
            addSkillField();
        });
    }

    if(btnAddLanguage) {
        btnAddLanguage.addEventListener('click', () => {
            addLanguageField();
        });
    }

    // ----------------------------------------------------
    // Color Themes
    // ----------------------------------------------------
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const theme = btn.getAttribute('data-theme');
            
            // Remove previous theme classes
            document.body.className = Array.from(document.body.classList)
                .filter(c => !c.startsWith('theme-'))
                .join(' ');
            
            document.body.classList.add(`theme-${theme}`);
            saveToLocalStorage();
        });
    });

    // ----------------------------------------------------
    // Templates (Structure)
    // ----------------------------------------------------
    const templateButtons = document.querySelectorAll('.btn-template');
    templateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            templateButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const template = btn.getAttribute('data-template');
            
            // Remove previous template classes
            document.body.className = Array.from(document.body.classList)
                .filter(c => !c.startsWith('template-'))
                .join(' ');
                
            document.body.classList.add(`template-${template}`);
            saveToLocalStorage();
        });
    });

    // ----------------------------------------------------
    // Section Reordering
    // ----------------------------------------------------
    function moveSection(btn, direction) {
        const item = btn.closest('.accordion-item');
        if (!item) return;
        
        if (direction === 'up' && item.previousElementSibling && item.previousElementSibling.classList.contains('accordion-item')) {
            if (!item.previousElementSibling.hasAttribute('data-fixed')) {
                item.parentNode.insertBefore(item, item.previousElementSibling);
            }
        } else if (direction === 'down' && item.nextElementSibling && item.nextElementSibling.classList.contains('accordion-item')) {
            item.parentNode.insertBefore(item.nextElementSibling, item);
        }
        
        updatePreviewSectionOrder();
        saveToLocalStorage();
    }

    document.querySelectorAll('.btn-section-up').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            moveSection(btn, 'up');
        });
    });

    document.querySelectorAll('.btn-section-down').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            moveSection(btn, 'down');
        });
    });

    // ----------------------------------------------------
    // Drag and Drop Reordering (SortableJS)
    // ----------------------------------------------------
    const accordionContainer = document.querySelector('.editor-accordion');
    if (typeof Sortable !== 'undefined' && accordionContainer) {
        new Sortable(accordionContainer, {
            animation: 150,
            handle: '.accordion-trigger', // Allows dragging from anywhere on the header
            filter: '[data-fixed="true"] .accordion-trigger, input, textarea, select, button, .section-toggle', // Prevent dragging fixed items and inputs
            preventOnFilter: false,
            onMove: function (evt) {
                // Prevent dropping above or below fixed items
                return !evt.related.hasAttribute('data-fixed');
            },
            onEnd: function (evt) {
                // Prevent accordion from toggling open/close right after drag
                const trigger = evt.item.querySelector('.accordion-trigger');
                if (trigger) {
                    const preventClick = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        trigger.removeEventListener('click', preventClick, true);
                    };
                    trigger.addEventListener('click', preventClick, true);
                    setTimeout(() => trigger.removeEventListener('click', preventClick, true), 100);
                }
                
                updatePreviewSectionOrder();
                saveToLocalStorage();
            }
        });
        
        // Add grab cursor to all triggers that are not fixed
        document.querySelectorAll('.accordion-item:not([data-fixed="true"]) .accordion-trigger').forEach(trigger => {
            trigger.style.cursor = 'grab';
        });
    }

    function updatePreviewSectionOrder() {
        // Get ordered section IDs from the editor
        const orderedIds = Array.from(document.querySelectorAll('.section-toggle'))
            .map(toggle => toggle.getAttribute('data-section'))
            .filter(id => id);

        // Use Flexbox order to sort items globally or within columns
        const allSections = document.querySelectorAll('#cv-preview-sheet .cv-section');
        allSections.forEach(sec => {
            const idx = orderedIds.indexOf(sec.id);
            if (idx !== -1) {
                sec.style.order = idx;
            } else {
                sec.style.order = 99;
            }
        });
    }

    function resetSectionOrderToDefault() {
        const defaultOrder = [
            'cv-section-summary',
            'cv-section-projects',
            'cv-section-experience',
            'cv-section-education',
            'cv-section-softskills',
            'cv-section-skills',
            'cv-section-languages'
        ];
        defaultOrder.forEach(sectionId => {
            const toggle = document.querySelector(`.section-toggle[data-section="${sectionId}"]`);
            if (toggle) {
                const item = toggle.closest('.accordion-item');
                if (item && item.parentNode) {
                    item.parentNode.appendChild(item);
                }
            }
        });
        updatePreviewSectionOrder();
        localStorage.removeItem('procv-section-order');
    }

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

        resetSectionOrderToDefault();

        // Load Text fields
        inputFullname.value = 'Alejandro Silva Ramos';
        inputTitle.value = 'Director de Proyectos // Consultor Estratégico';
        inputEmail.value = 'alejandro.silva@correo.com';
        inputPhone.value = '+34 612 345 678';
        inputLocation.value = 'Barcelona, España';
        inputWebsite.value = 'alexsilva.com';
        inputLink.value = 'linkedin.com/in/alexsilva';
        inputLinkedin.value = 'linkedin.com/in/alexsilva';
        inputSummary.value = 'Profesional proactivo con más de 5 años de experiencia liderando equipos multidisciplinares y optimizando procesos operativos. Apasionado por la mejora continua, la analítica de datos y la gestión ágil de proyectos. Enfocado en maximizar la eficiencia y alcanzar los objetivos organizacionales de manera sostenible.';
        
        inputTitleProfile.value = 'Perfil Profesional';
        inputTitleExperience.value = 'Experiencia Laboral';
        inputTitleProjects.value = 'Proyectos';
        inputTitleEducation.value = 'Formación';
        inputTitleSkills.value = 'Tecnología';
        inputTitleSoftSkills.value = 'Habilidades';
        inputSoftSkillsDesc.value = '• Gestión ágil de proyectos (Scrum, Kanban)\n• Liderazgo de equipos multidisciplinares\n• Comunicación efectiva y negociación\n• Resolución de problemas y pensamiento crítico';
        inputTitleLanguages.value = 'Idiomas';

        // Clear dynamic lists first
        experienceList.innerHTML = '';
        projectsList.innerHTML = '';
        educationList.innerHTML = '';
        if(skillsList) skillsList.innerHTML = '';
        if(languagesList) languagesList.innerHTML = '';

        // Load Sample Dynamic Data
        addLanguageField('Español', 'Nativo');
        addLanguageField('Inglés', 'Avanzado');
        addLanguageField('Francés', 'Intermedio');
        
        addSkillField('Gestión Ágil', '5');
        addSkillField('Liderazgo', '4');
        addSkillField('Microsoft Excel Avanzado', '5');
        addSkillField('Negociación', '4');
        addSkillField('Python', '3');
        addExperienceField({
            role: 'Gestor de Proyectos Senior',
            company: 'Innovación Global S.A.',
            dates: 'Mar 2021 - Presente',
            desc: '• Liderazgo de un equipo de 15 personas para la implementación de nuevos procesos operativos.\n• Reducción de costes operativos en un 20% durante el primer año.\n• Planificación y ejecución de presupuestos anuales y reporte de KPIs.'
        });
        addExperienceField({
            role: 'Consultor Junior',
            company: 'Estrategias Empresariales LLC',
            dates: 'Jun 2018 - Feb 2021',
            desc: '• Análisis de mercado y elaboración de informes para clientes clave del sector retail.\n• Asistencia en la reestructuración de departamentos financieros.\n• Optimización de bases de datos internas de la compañía.'
        });

        // Add Projects
        addProjectField({
            title: 'Transformación Digital Departamental',
            tech: 'Gestión del Cambio, ERP, Formación',
            desc: 'Diseño y ejecución de la estrategia de transformación digital para el departamento de ventas, logrando una adopción del 95% del nuevo sistema CRM en un periodo de 3 meses.'
        });
        addProjectField({
            title: 'Optimización de Cadena de Suministro',
            tech: 'Análisis de Datos, Logística, Negociación',
            desc: 'Proyecto de reestructuración logística que resultó en la reducción de tiempos de entrega en un 15% y aumento de la satisfacción general del cliente.'
        });

        // Add Education
        addEducationField({
            degree: 'Máster en Dirección de Empresas (MBA)',
            school: 'Universidad de Barcelona',
            dates: '2016 - 2018'
        });
        addEducationField({
            degree: 'C.F.G.M. en Sistemas Microinformáticos y Redes (SMR)',
            school: 'Colegio Técnico Metropolitano',
            dates: '2022 - 2024'
        });

        currentPhoto = null;
        if(inputPhoto) inputPhoto.value = '';

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

        resetSectionOrderToDefault();

        // Clear inputs
        const textInputs = [
            inputFullname, inputTitle, inputEmail, inputPhone, inputLink,
            inputLinkedin, inputWebsite, inputLocation, inputSummary
        ];
        textInputs.forEach(input => input.value = '');

        inputTitleProfile.value = 'Perfil Profesional';
        inputTitleExperience.value = 'Experiencia Laboral';
        inputTitleProjects.value = 'Proyectos';
        inputTitleEducation.value = 'Formación';
        inputTitleSkills.value = 'Tecnología';
        inputTitleSoftSkills.value = 'Habilidades';
        inputSoftSkillsDesc.value = '';
        inputTitleLanguages.value = 'Idiomas';

        // Clear Dynamic Lists
        experienceList.innerHTML = '';
        projectsList.innerHTML = '';
        educationList.innerHTML = '';
        if(skillsList) skillsList.innerHTML = '';
        if(languagesList) languagesList.innerHTML = '';

        currentPhoto = null;
        if(inputPhoto) inputPhoto.value = '';

        // Update Preview to blank fallback states
        updatePreview();
        
        // Hide modal
        confirmModal.classList.remove('active');
    });

    // ----------------------------------------------------
    // Import / Export JSON
    // ----------------------------------------------------
    if(btnExportJson) {
        btnExportJson.addEventListener('click', () => {
            saveToLocalStorage(); // Ensure latest changes are saved
            const savedStateString = localStorage.getItem('procv-state');
            if (!savedStateString) return;
            const blob = new Blob([savedStateString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            let baseName = inputFullname.value.trim().replace(/\s+/g, '_');
            if (!baseName) baseName = 'Mi_Curriculum';
            a.download = `${baseName}_ProCV.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if(btnImportJson && inputJsonFile) {
        btnImportJson.addEventListener('click', () => {
            inputJsonFile.click();
        });

        inputJsonFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedState = JSON.parse(e.target.result);
                    localStorage.setItem('procv-state', JSON.stringify(importedState));
                    loadFromLocalStorage();
                    alert('Currículum cargado correctamente.');
                } catch (err) {
                    alert('Error al leer el archivo JSON.');
                    console.error(err);
                }
                inputJsonFile.value = '';
            };
            reader.readAsText(file);
        });
    }

    // ----------------------------------------------------
    // Export PDF (Browser Print Trigger)
    // ----------------------------------------------------
    btnExportPdf.addEventListener('click', () => {
        const element = document.getElementById('cv-preview-sheet');
        
        let baseName = inputFullname.value.trim().replace(/\s+/g, '_');
        if (!baseName) baseName = 'Curriculum';
        
        // Temporarily adjust some styles for better PDF output if needed
        const opt = {
            margin:       0,
            filename:     `${baseName}_ProCV.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    });

    // ----------------------------------------------------
    // LocalStorage State Persistence
    // ----------------------------------------------------
    function saveToLocalStorage() {
        const cvData = {
            fullname: inputFullname.value,
            title: inputTitle.value,
            email: inputEmail.value,
            phone: inputPhone.value,
            location: inputLocation.value,
            website: inputWebsite.value,
            link: inputLink.value,
            linkedin: inputLinkedin.value,
            summary: inputSummary.value,
            skills: Array.from(skillsList.querySelectorAll('.dynamic-item')).map(item => ({
                name: item.querySelector('.skill-name').value,
                level: item.querySelector('.skill-level').value
            })),
            titles: {
                profile: inputTitleProfile.value,
                experience: inputTitleExperience.value,
                projects: inputTitleProjects.value,
                education: inputTitleEducation.value,
                skills: inputTitleSkills.value,
                softskills: inputTitleSoftSkills.value,
                languages: inputTitleLanguages.value
            },
            softskillsDesc: inputSoftSkillsDesc.value,
            photo: currentPhoto,
            experience: [],
            projects: [],
            education: [],
            languages: [],
            toggles: {}
        };

        // Extract Languages
        if (languagesList) {
            document.querySelectorAll('#languages-list .dynamic-item').forEach(item => {
                cvData.languages.push({
                    name: item.querySelector('.lang-name').value,
                    level: item.querySelector('.lang-level').value
                });
            });
        }

        // Collect Toggles State
        document.querySelectorAll('.section-toggle').forEach(toggle => {
            cvData.toggles[toggle.getAttribute('data-section')] = toggle.checked;
        });

        // Collect Experience Items
        experienceList.querySelectorAll('.dynamic-item').forEach(item => {
            cvData.experience.push({
                role: item.querySelector('.exp-role').value,
                company: item.querySelector('.exp-company').value,
                dates: item.querySelector('.exp-dates').value,
                desc: item.querySelector('.exp-desc').value
            });
        });

        // Collect Project Items
        projectsList.querySelectorAll('.dynamic-item').forEach(item => {
            cvData.projects.push({
                title: item.querySelector('.proj-title').value,
                tech: item.querySelector('.proj-tech').value,
                desc: item.querySelector('.proj-desc').value
            });
        });

        // Collect Education Items
        educationList.querySelectorAll('.dynamic-item').forEach(item => {
            cvData.education.push({
                degree: item.querySelector('.edu-degree').value,
                school: item.querySelector('.edu-school').value,
                dates: item.querySelector('.edu-dates').value
            });
        });

        // Note: we can't save theme and template inside cvData right now because import/export 
        // doesn't usually override layout, but let's save them to localStorage independently.
        localStorage.setItem('procv-state', JSON.stringify(cvData));
        
        // Save Section Order
        const orderedIds = Array.from(document.querySelectorAll('.section-toggle'))
            .map(toggle => toggle.getAttribute('data-section'))
            .filter(id => id);
        localStorage.setItem('procv-section-order', JSON.stringify(orderedIds));

        const activeThemeBtn = document.querySelector('.theme-btn.active');
        if (activeThemeBtn) {
            localStorage.setItem('procv-theme', activeThemeBtn.getAttribute('data-theme'));
        }
        
        const activeTemplateBtn = document.querySelector('.btn-template.active');
        if (activeTemplateBtn) {
            localStorage.setItem('procv-template', activeTemplateBtn.getAttribute('data-template'));
        }
    }

    function loadFromLocalStorage() {
        // Load Theme
        const savedTheme = localStorage.getItem('procv-theme') || 'sapphire';
        const savedTemplate = localStorage.getItem('procv-template') || 'modern';
        
        document.body.className = '';
        document.body.classList.add(`theme-${savedTheme}`);
        document.body.classList.add(`template-${savedTemplate}`);
        
        // Mark correct theme selector button active
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === savedTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Mark correct template selector button active
        const templateButtons = document.querySelectorAll('.btn-template');
        templateButtons.forEach(btn => {
            if (btn.getAttribute('data-template') === savedTemplate) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Restore Section Order
        const savedOrderStr = localStorage.getItem('procv-section-order');
        if (savedOrderStr) {
            try {
                const savedOrder = JSON.parse(savedOrderStr);
                const container = document.querySelector('.sidebar-content');
                // We find the parent of the accordions. The accordions are inside .sidebar-content
                // Let's reorder them
                savedOrder.forEach(sectionId => {
                    const toggle = document.querySelector(`.section-toggle[data-section="${sectionId}"]`);
                    if (toggle) {
                        const item = toggle.closest('.accordion-item');
                        if (item && item.parentNode) {
                            item.parentNode.appendChild(item); // Move to the end
                        }
                    }
                });
                updatePreviewSectionOrder();
            } catch (e) {
                console.error("Error loading section order", e);
            }
        }

        // Load State
        const savedStateString = localStorage.getItem('procv-state');
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
            inputLink.value = state.link || state.github || '';
            inputLinkedin.value = state.linkedin || '';
            inputSummary.value = state.summary || '';

            if (state.titles) {
                inputTitleProfile.value = state.titles.profile || 'Perfil Profesional';
                inputTitleExperience.value = state.titles.experience || 'Experiencia Laboral';
                inputTitleProjects.value = state.titles.projects || 'Proyectos';
                inputTitleEducation.value = state.titles.education || 'Formación';
                inputTitleSkills.value = state.titles.skills || 'Tecnología';
                inputTitleSoftSkills.value = state.titles.softskills || 'Habilidades';
                inputTitleLanguages.value = state.titles.languages || 'Idiomas';
            } else {
                inputTitleProfile.value = 'Perfil Profesional';
                inputTitleExperience.value = 'Experiencia Laboral';
                inputTitleProjects.value = 'Proyectos';
                inputTitleEducation.value = 'Formación';
                inputTitleSkills.value = 'Tecnología';
        inputTitleSoftSkills.value = 'Habilidades';
        inputSoftSkillsDesc.value = '';
                inputTitleLanguages.value = 'Idiomas';
            }
            currentPhoto = state.photo || null;

            // Clear Dynamic Lists before loadingers
            experienceList.innerHTML = '';
            projectsList.innerHTML = '';
            educationList.innerHTML = '';
            if(skillsList) skillsList.innerHTML = '';
            if(languagesList) languagesList.innerHTML = '';

            if(state.skills) {
                if(skillsList) skillsList.innerHTML = '';
                state.skills.forEach(sk => addSkillField(sk.name, sk.level));
            }
            
            if (Array.isArray(state.languages)) {
                if(languagesList) languagesList.innerHTML = '';
                state.languages.forEach(lg => addLanguageField(lg.name, lg.level));
            }

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
    // Auto-bullet functionality
    // ----------------------------------------------------
    document.addEventListener('keydown', function(e) {
        if (e.target && e.target.classList.contains('bullet-textarea')) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;
                const val = e.target.value;
                const bullet = '\n• ';
                e.target.value = val.substring(0, start) + bullet + val.substring(end);
                e.target.selectionStart = e.target.selectionEnd = start + bullet.length;
                e.target.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    });

    document.addEventListener('input', function(e) {
        if (e.target && e.target.classList.contains('bullet-textarea')) {
            let val = e.target.value;
            if (val.length > 0 && !val.startsWith('• ')) {
                if (val.startsWith('•')) {
                    e.target.value = '• ' + val.substring(1).trimStart();
                } else {
                    e.target.value = '• ' + val;
                }
            }
            // Also ensure that if the user deletes everything except the bullet, and then deletes the bullet, it allows it to be empty.
            if (val === '•' || val === '• ') {
                // If they are trying to delete the bullet, let it become empty
                // Wait, if it's strictly '• ' and they backspace, it becomes '•' which then triggers nothing or we can clear it.
                if (e.inputType === 'deleteContentBackward') {
                    e.target.value = '';
                }
            }
        }
    });

    document.addEventListener('focusin', function(e) {
        if (e.target && e.target.classList.contains('bullet-textarea')) {
            if (e.target.value.trim() === '') {
                e.target.value = '• ';
                e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
                e.target.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    });

    // ----------------------------------------------------
    // Initialization
    // ----------------------------------------------------
    loadFromLocalStorage();
    safeCreateIcons();
});

// ----------------------------------------------------
// Legal Modals
// ----------------------------------------------------
window.openLegalModal = function(modalId) {
    document.getElementById(modalId).classList.add('active');
    // Refresh lucide icons for modal close buttons if needed
    if (typeof lucide !== 'undefined') lucide.createIcons();
};
window.closeLegalModal = function(modalId) {
    document.getElementById(modalId).classList.remove('active');
};
