function Alertich() {
    const createAlert = (message, options, alertType) => {
        const defaultOptions = {
            position: 'center',         
            color: '#383052',           
            backgroundColor: '#f5f5ff', 
            width: '300px',             
            timeout: 0                  
        };

        const alertOptions = { ...defaultOptions, ...options };

        const style = document.createElement('style');
        style.innerHTML = `
            .modal {
                position: fixed;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 200ms ease-in-out;
            }

            .modal.show {
                opacity: 1;
            }

            .modal-content {
                padding: 20px;
                border-radius: 3px;
                text-align: center;
                background-color: #f5f5ff;
                width: ${alertOptions.width};
                color: ${alertOptions.color};
                transition: all 0.2s ease;
            }

            .close-btn {
                position: absolute;
                cursor: pointer;
                right: 10px;
            }

            #confirm-btn {
                cursor: pointer;
                padding: 8px 20px;
                border-radius: 3px;
                border: none;
                background-color: #9393f5;
                color: white;
                font-weight: bold;
                font-family: sans-serif;
                transition: all 200ms ease-in-out;
            }

            #confirm-btn:hover {
                background-color: #5e5edb;
            }
        `;
        document.head.appendChild(style);

        const modal = document.createElement('div');
        modal.classList.add('modal');

        let iconSrc = "assets/icons/anim/check-reveal.apng";
        let aMessage = message;
        
        switch (alertType) {
            case 'alert':
                iconSrc = "";
                aMessage = `${message}`;
                break;
            case 'warning':
                iconSrc = "assets/icons/anim/error.apng";
                aMessage = `${message}`;
                break;
            case 'success':
                iconSrc = "assets/icons/anim/check-reveal.apng";
                aMessage = `${message}`;
                break;
        }

            const existingImg = document.querySelector('img');
            if (iconSrc === "" && existingImg) {
                existingImg.remove();
            }

            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </span>
                    <p style="font-size: 1.2rem;">
                        ${iconSrc ? `<img src="${iconSrc}" alt="alert icon" width="50px" style="">` : ""}
                        <br>${aMessage}<br>
                    </p>
                    <button id="confirm-btn">OK</button>
                </div>
            `;

        document.body.appendChild(modal);

        const modalContent = modal.querySelector('.modal-content');

        switch (alertOptions.position) {
            case 'center':
                modalContent.style.transform = 'scale(0.5)';
                modalContent.style.opacity = '0';
                setTimeout(() => {
                    modal.classList.add('show');
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                }, 50);
                break;
            case 'top':
                modalContent.style.position = 'absolute';
                modalContent.style.top = '-100%';
                modalContent.style.left = '50%';
                modalContent.style.transform = 'translateX(-50%)';
                setTimeout(() => {
                    modal.classList.add('show');
                    modal.style.top = '0px';
                    modalContent.style.top = '20px';
                }, 50);
                break;
            case 'bottom':
                modalContent.style.position = 'absolute';
                modalContent.style.bottom = '-100%';
                modalContent.style.left = '50%';
                modalContent.style.transform = 'translateX(-50%)';
                setTimeout(() => {
                    modal.classList.add('show');
                    modalContent.style.bottom = '20px';
                }, 50);
                break;
            default:
                modalContent.style.transform = 'scale(1)';
                modal.classList.add('show');
        }

        function closeModal() {
            switch (alertOptions.position) {
                case 'center':
                    modalContent.style.transform = 'scale(0.5)';
                    modalContent.style.opacity = '0';
                    break;
                case 'top':
                    modalContent.style.top = '-100%';
                    break;
                case 'bottom':
                    modalContent.style.bottom = '-100%';
                    break;
                default:
                    modalContent.style.transform = 'scale(0.5)';
                    modalContent.style.opacity = '0';
            }
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 100);
        }

        switch (alertOptions.position) {
            case 'center':
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                break;
            case 'top':
                modal.style.display = 'block';
                modal.style.top = '20px';
                modal.style.left = '50%';
                modal.style.transform = 'translateX(-50%)';
                break;
            case 'bottom':
                modal.style.display = 'block';
                modal.style.bottom = '20px';
                modal.style.left = '50%';
                modal.style.transform = 'translateX(-50%)';
                break;
            default:
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
        }

        modal.querySelector('.close-btn').onclick = () => {
            closeModal();
        };

        modal.querySelector('#confirm-btn').onclick = () => {
            closeModal();
            if (alertOptions.onConfirm) {
                alertOptions.onConfirm();
            }
        };

        if (alertOptions.timeout > 0) {
            setTimeout(() => {
                closeModal();
            }, alertOptions.timeout);
        }
    };

    this.alert = function (message, options) {
        options = { ...options};
        createAlert(message, options, 'alert');
    };

    this.warning = function (message, options) {
        options = { ...options};
        createAlert(message, options, 'warning');
    };

    this.success = function (message, options) {
        options = { ...options};
        createAlert(message, options, 'success');
    };
}
