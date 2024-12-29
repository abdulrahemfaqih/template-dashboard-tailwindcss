// main.js
const toast = {
    config: {
        duration: 3000,
        position: 'top-right'
    },

    init() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                z-index: 9999;
                top: 24px;
                right: 24px;
                max-width: 380px;
            `;
            document.body.appendChild(container);

            const style = document.createElement('style');
            style.textContent = `
                .toast {
                    padding: 16px;
                    border-radius: 8px;
                    margin-bottom: 12px;
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    background: #ffffff;
                    color: #1a1a1a;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05),
                               0 10px 15px rgba(0, 0, 0, 0.03);
                    opacity: 0;
                    transform: translateX(100%);
                    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    border: 1px solid rgba(0, 0, 0, 0.08);
                }
                .toast.show {
                    opacity: 1;
                    transform: translateX(0);
                }
                .toast-success {
                    border-left: 4px solid #22c55e;
                }
                .toast-error {
                    border-left: 4px solid #ef4444;
                }
                .toast-warning {
                    border-left: 4px solid #f59e0b;
                }
                .toast-info {
                    border-left: 4px solid #3b82f6;
                }
                .toast-icon {
                    margin-right: 12px;
                    font-size: 16px;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.05);
                }
                .toast-content {
                    flex: 1;
                    font-weight: 500;
                    letter-spacing: 0.2px;
                }
                .toast-success .toast-icon {
                    color: #22c55e;
                    background: rgba(34, 197, 94, 0.1);
                }
                .toast-error .toast-icon {
                    color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }
                .toast-warning .toast-icon {
                    color: #f59e0b;
                    background: rgba(245, 158, 11, 0.1);
                }
                .toast-info .toast-icon {
                    color: #3b82f6;
                    background: rgba(59, 130, 246, 0.1);
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },

    createIcon(type) {
        const icons = {
            success: '✓',
            error: '×',
            warning: '!',
            info: 'i'
        };
        return `<div class="toast-icon">${icons[type]}</div>`;
    },

    output({ message, type = 'info', duration = this.config.duration }) {
        this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            ${this.createIcon(type)}
            <div class="toast-content">${message}</div>
        `;

        const container = document.getElementById('toast-container');
        container.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, duration);
    },

    success(message, duration) {
        this.output({ message, type: 'success', duration });
    },

    error(message, duration) {
        this.output({ message, type: 'error', duration });
    },

    warning(message, duration) {
        this.output({ message, type: 'warning', duration });
    },

    info(message, duration) {
        this.output({ message, type: 'info', duration });
    }
};