/**
 * Postman Collection to Pytest Migrator
 * Core Client-side Controller & Theme Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // 1. Core Theme & Theme Toggle Integration
    // -----------------------------------------
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme-preference');
        const themeToggleBtns = document.querySelectorAll('.theme-toggle');
        
        // Default to dark theme or saved choice
        if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark-mode', 'dark');
        } else {
            document.documentElement.classList.add('dark-mode', 'dark');
            localStorage.setItem('theme-preference', 'dark');
        }

        themeToggleBtns.forEach(btn => {
            // Update icon content inside toggle button if needed
            btn.addEventListener('click', () => {
                const isDark = document.documentElement.classList.contains('dark-mode');
                if (isDark) {
                    document.documentElement.classList.remove('dark-mode', 'dark');
                    localStorage.setItem('theme-preference', 'light');
                } else {
                    document.documentElement.classList.add('dark-mode', 'dark');
                    localStorage.setItem('theme-preference', 'dark');
                }
                updateThemeIcons();
            });
        });
        updateThemeIcons();
    };

    const updateThemeIcons = () => {
        const isDark = document.documentElement.classList.contains('dark-mode');
        const sunIcons = document.querySelectorAll('.sun-icon');
        const moonIcons = document.querySelectorAll('.moon-icon');

        if (isDark) {
            sunIcons.forEach(i => i.classList.remove('hidden'));
            moonIcons.forEach(i => i.classList.add('hidden'));
        } else {
            sunIcons.forEach(i => i.classList.add('hidden'));
            moonIcons.forEach(i => i.classList.remove('hidden'));
        }
    };

    initTheme();

    // -----------------------------------------
    // 2. Interactive Password Visibility Toggle
    // -----------------------------------------
    const passwordInput = document.getElementById('login-password');
    const togglePasswordBtn = document.getElementById('toggle-password-btn');
    if (passwordInput && togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            
            // Toggle eye icon SVGs
            const eyeOpen = togglePasswordBtn.querySelector('.eye-open');
            const eyeClosed = togglePasswordBtn.querySelector('.eye-closed');
            if (eyeOpen && eyeClosed) {
                eyeOpen.classList.toggle('hidden');
                eyeClosed.classList.toggle('hidden');
            }
        });
    }

    // -----------------------------------------
    // 3. Floating Particles Generation (Landing Page FX)
    // -----------------------------------------
    const renderParticles = () => {
        const container = document.querySelector('.particles-container');
        if (!container) return;

        const maxParticles = 30;
        for (let i = 0; i < maxParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Randomly designate blue Accent particle
            if (Math.random() > 0.5) {
                particle.classList.add('particle-blue');
            }

            const size = Math.random() * 8 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = `-${Math.random() * 20}%`;
            
            const delay = Math.random() * 8;
            const duration = Math.random() * 6 + 6;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            container.appendChild(particle);
        }
    };
    renderParticles();

    // -----------------------------------------
    // 4. Onboarding Workflow Wizard & State Manager
    // -----------------------------------------
    const onboardingWizard = document.getElementById('onboarding-wizard');
    if (onboardingWizard) {
        let currentStep = 1;
        const totalSteps = 5;
        
        // Cached run states
        let cachedFilePayload = null;
        let cachedCollectionId = null;
        let cachedCacheFilePath = null;
        let cachedFileName = null;

        const stepContainers = document.querySelectorAll('.wizard-step-panel');
        const progressNodes = document.querySelectorAll('.progress-step');
        const progressBarFill = document.getElementById('wizard-progress-bar');
        
        const btnPrev = document.getElementById('btn-wizard-prev');
        const btnNext = document.getElementById('btn-wizard-next');
        const btnSkip = document.getElementById('btn-wizard-skip');

        const updateWizardUI = () => {
            // Toggle Step visibility
            stepContainers.forEach(panel => {
                const stepNum = parseInt(panel.dataset.step);
                if (stepNum === currentStep) {
                    panel.classList.remove('hidden');
                    panel.classList.add('fade-in');
                } else {
                    panel.classList.add('hidden');
                }
            });

            // Update Progress dots
            progressNodes.forEach((node, idx) => {
                const stepIdx = idx + 1;
                if (stepIdx < currentStep) {
                    node.classList.add('bg-orange-500', 'text-white');
                    node.classList.remove('bg-slate-700', 'text-slate-400');
                    node.innerHTML = '✓';
                } else if (stepIdx === currentStep) {
                    node.classList.add('ring-4', 'ring-orange-500/30', 'bg-orange-500', 'text-white');
                    node.classList.remove('bg-slate-700', 'text-slate-400');
                    node.innerHTML = stepIdx;
                } else {
                    node.classList.remove('bg-orange-500', 'ring-4', 'ring-orange-500/30', 'text-white');
                    node.classList.add('bg-slate-700', 'text-slate-400');
                    node.innerHTML = stepIdx;
                }
            });

            // Update horizontal progress bar width percentage
            const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
            if (progressBarFill) {
                progressBarFill.style.width = `${percentage}%`;
            }

            // Button configurations
            if (currentStep === 1) {
                btnPrev.classList.add('hidden');
                btnSkip.classList.remove('hidden');
                btnNext.textContent = 'Get Started';
                btnNext.removeAttribute('disabled');
            } else if (currentStep === 2) {
                btnPrev.classList.remove('hidden');
                btnSkip.classList.add('hidden');
                btnNext.textContent = 'Verify Schema';
                // Disable next button on step 2 unless a file is correctly parsed
                if (!cachedCollectionId) {
                    btnNext.setAttribute('disabled', 'true');
                } else {
                    btnNext.removeAttribute('disabled');
                }
            } else if (currentStep === 3) {
                btnPrev.classList.remove('hidden');
                btnSkip.classList.add('hidden');
                btnNext.textContent = 'Convert collection';
                btnNext.removeAttribute('disabled');
            } else if (currentStep === 4) {
                btnPrev.classList.add('hidden'); // Lock navigation while compiling code
                btnSkip.classList.add('hidden');
                btnNext.textContent = 'Build test suites';
                btnNext.setAttribute('disabled', 'true'); // Driven automatically by script sequence triggers
            } else if (currentStep === 5) {
                btnPrev.classList.add('hidden');
                btnSkip.classList.add('hidden');
                btnNext.textContent = 'Open Dashboard';
                btnNext.removeAttribute('disabled');
            }
        };

        // Drag & Drop event listener declarations
        const dropzone = document.getElementById('collection-dropzone');
        const fileInput = document.getElementById('collection-file-input');
        const selectFileBtn = document.getElementById('btn-select-file');
        const uploadStatusText = document.getElementById('upload-status-text');
        const uploadAlertBox = document.getElementById('upload-alert-box');

        if (dropzone && fileInput && selectFileBtn) {
            selectFileBtn.addEventListener('click', () => fileInput.click());

            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    processFileStream(e.target.files[0]);
                }
            });

            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            });

            ['dragleave', 'dragend'].forEach(evt => {
                dropzone.addEventListener(evt, () => {
                    dropzone.classList.remove('dragover');
                });
            });

            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
                if (e.dataTransfer.files.length > 0) {
                    processFileStream(e.dataTransfer.files[0]);
                }
            });
        }

        const processFileStream = (file) => {
            if (!file.name.endsWith('.json')) {
                showUploadError("Format rejection. Please selection a valid .json Postman collection layout.");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                showUploadError("File size limit exceeded. Choose collections under 5 megabytes.");
                return;
            }

            // Visual loader transitions
            uploadStatusText.innerHTML = `
                <div class="flex items-center justify-center space-x-2">
                    <svg class="animate-spin h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Parsing structure variables...</span>
                </div>
            `;
            uploadAlertBox.classList.add('hidden');

            const formData = new FormData();
            formData.append('file', file);

            // POST /upload HTTP request stream
            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    cachedCollectionId = data.collection_id;
                    cachedCacheFilePath = data.file_cached_path;
                    cachedFileName = file.name;

                    // Success Feedback UI updates
                    uploadStatusText.innerHTML = `
                        <div class="p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg text-teal-400 font-medium text-sm flex items-center justify-between">
                            <span class="flex items-center">
                                <svg class="w-5 h-5 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Authenticated & Linked: <strong>${file.name}</strong> (${data.total_apis} APIs found)
                            </span>
                        </div>
                    `;
                    
                    // Enable next button transition
                    btnNext.removeAttribute('disabled');
                } else {
                    showUploadError(data.error || "Could not digest Postman collection structural components.");
                }
            })
            .catch(error => {
                logger.error("Error processing schema", error);
                showUploadError("Network connection error parsing Postman schemas.");
            });
        };

        const showUploadError = (msg) => {
            uploadStatusText.innerHTML = "";
            uploadAlertBox.querySelector('.error-message-text').textContent = msg;
            uploadAlertBox.classList.remove('hidden');
            btnNext.setAttribute('disabled', 'true');
        };

        // Execution steps flow triggers
        const executeOnboardingStep3 = () => {
            // Trigger POST /extract
            const infoText = document.getElementById('analysis-info-status');
            const scoreNode = document.getElementById('analysis-score-number');
            const tableBody = document.getElementById('analysis-api-table-body');
            const warningsWrapper = document.getElementById('analysis-warnings-wrapper');
            const warningsList = document.getElementById('analysis-warnings-list');

            infoText.innerHTML = "Querying collections schema metrics from db manager...";

            fetch('/extract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection_id: cachedCollectionId,
                    file_cached_path: cachedCacheFilePath
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    infoText.innerHTML = `Synthesized extraction framework: <strong>${data.apis.length} API entries mapped to SQLite stores.</strong>`;
                    
                    // Render API routes to validation table preview
                    tableBody.innerHTML = "";
                    data.apis.forEach(item => {
                        const tr = document.createElement('tr');
                        tr.className = "border-b border-slate-800 text-sm hover:bg-slate-800/40";
                        tr.innerHTML = `
                            <td class="py-3 px-4 font-semibold text-slate-300">${item.api_name}</td>
                            <td class="py-3 px-4">
                                <span class="px-2 py-0.5 rounded text-xs font-bold bg-slate-700 text-slate-300">${item.method}</span>
                            </td>
                            <td class="py-3 px-4 font-mono text-xs text-orange-400 truncate max-w-xs">${item.endpoint}</td>
                            <td class="py-3 px-4 text-center">
                                <span class="bg-teal-500/10 text-teal-400 px-2 py-1 rounded-full text-xs font-semibold">
                                    ${item.assertions_count} Found
                                </span>
                            </td>
                        `;
                        tableBody.appendChild(tr);
                    });

                    // Trigger validation score calculation using direct query
                    return fetch(`/results?collection_id=${cachedCollectionId}&format=json`);
                } else {
                    throw new Error(data.error);
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.stats) {
                    const score = data.stats.collection.score || 100;
                    scoreNode.textContent = score;

                    // Style score box according to rating
                    const scoreContainer = document.getElementById('analysis-score-container');
                    if (score > 80) {
                        scoreContainer.className = "p-6 rounded-2xl glass-card bg-teal-500/10 border-teal-500/30 text-center";
                        scoreNode.className = "text-5xl font-extrabold text-teal-400";
                    } else if (score > 55) {
                        scoreContainer.className = "p-6 rounded-2xl glass-card bg-amber-500/10 border-amber-500/30 text-center";
                        scoreNode.className = "text-5xl font-extrabold text-amber-400";
                    } else {
                        scoreContainer.className = "p-6 rounded-2xl glass-card bg-rose-500/10 border-rose-500/30 text-center";
                        scoreNode.className = "text-5xl font-extrabold text-rose-400";
                    }

                    // Populate warning lists
                    warningsList.innerHTML = "";
                    const warnings = data.stats.collection.warnings || [];
                    if (warnings.length > 0) {
                        warningsWrapper.classList.remove('hidden');
                        warnings.forEach(msg => {
                            const li = document.createElement('li');
                            li.className = "text-xs text-amber-400 bg-amber-500/5 p-2 rounded border border-amber-500/10 flex items-start";
                            li.innerHTML = `
                                <svg class="w-4 h-4 mr-2 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                <span>${msg}</span>
                            `;
                            warningsList.appendChild(li);
                        });
                    } else {
                        warningsWrapper.classList.add('hidden');
                    }
                }
            })
            .catch(error => {
                infoText.innerHTML = `<span class="text-rose-400">Failed analyzing schema metrics: ${error.message}</span>`;
            });
        };

        const executeOnboardingStep4 = () => {
            // Trigger automation compilation chain POST /generate-pytest
            const conversionLoader = document.getElementById('conversion-loading-indicator');
            const conversionConsole = document.getElementById('conversion-console-logs');
            const conversionSuccess = document.getElementById('conversion-success-box');

            conversionConsole.innerHTML = "Initializing Local Rule-Based Translator module...\n";
            
            fetch('/generate-pytest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection_id: cachedCollectionId,
                    file_cached_path: cachedCacheFilePath
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    conversionConsole.innerHTML += `Compiling ${data.generated_scripts.length} standalone test modules...\n`;
                    data.generated_scripts.forEach(script => {
                        const status = script.syntax_valid ? "SUCCESS" : "WARNING";
                        conversionConsole.innerHTML += `>> File Generated: ${script.script_name} [${status}]\n`;
                        if (script.errors && script.errors.length > 0) {
                            conversionConsole.innerHTML += `   └─ AST warning details: ${script.errors.join(', ')}\n`;
                        }
                    });

                    conversionConsole.innerHTML += "Scanning test points for boundary recommendations...\n";

                    // Trigger Recommendations execution step POST /generate-recommendations
                    return fetch('/generate-recommendations', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ collection_id: cachedCollectionId })
                    });
                } else {
                    throw new Error(data.error);
                }
            })
            .then(res => res.json())
            .then(data => {
                // Done converting pipeline successfully
                conversionConsole.innerHTML += ">> Automation blueprints configured with comprehensive test case scopes.\n>> Conversion Pipeline Finished successfully.\n";
                
                conversionLoader.classList.add('hidden');
                conversionSuccess.classList.remove('hidden');
                btnNext.removeAttribute('disabled');
            })
            .catch(error => {
                conversionConsole.innerHTML += `\n>> [CRITICAL SHUTDOWN ERROR] conversion flow aborted: ${error.message}\n`;
                conversionLoader.classList.add('hidden');
            });
        };

        const executeOnboardingStep5 = () => {
            const downloadBtn = document.getElementById('btn-wizard-download-suite');
            if (downloadBtn) {
                downloadBtn.href = `/download?collection_id=${cachedCollectionId}`;
            }
        };

        // Navigation button attachments
        btnNext.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateWizardUI();

                // Trigger specialized step scripts
                if (currentStep === 3) {
                    executeOnboardingStep3();
                } else if (currentStep === 4) {
                    executeOnboardingStep4();
                } else if (currentStep === 5) {
                    executeOnboardingStep5();
                }
            } else {
                // Navigate to results report dashboard
                window.location.href = `/results?collection_id=${cachedCollectionId}`;
            }
        });

        btnPrev.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateWizardUI();
            }
        });

        btnSkip.addEventListener('click', () => {
            currentStep = 2; // Skip intro directly to upload screen
            updateWizardUI();
        });

        // Initialize Wizard layout
        updateWizardUI();
    }

    // -----------------------------------------
    // 5. Interactive Script Selector (Reports View Panel)
    // -----------------------------------------
    const scriptSelector = document.getElementById('report-script-selector');
    const codeOutputBlock = document.getElementById('report-code-block');
    const scriptDownloadBtn = document.getElementById('btn-download-selected-script');
    
    if (scriptSelector && codeOutputBlock && scriptDownloadBtn) {
        const updateCodePreview = () => {
            const selectedOpt = scriptSelector.options[scriptSelector.selectedIndex];
            if (selectedOpt) {
                const code = selectedOpt.dataset.content;
                const scriptId = selectedOpt.value;
                const collectionId = scriptSelector.dataset.collectionId;

                codeOutputBlock.textContent = code;
                scriptDownloadBtn.href = `/download?type=script&collection_id=${collectionId}&script_id=${scriptId}`;
            }
        };

        scriptSelector.addEventListener('change', updateCodePreview);
        // Fire initial setup loading
        updateCodePreview();
    }
});
