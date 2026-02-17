// Formulaire 
document.addEventListener('DOMContentLoaded', function() {
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('whatsappName').value.trim();
            const email = document.getElementById('whatsappEmail').value.trim();
            const subject = document.getElementById('whatsappSubject').value;
            const message = document.getElementById('whatsappMessage').value.trim();
            if (!name || !subject || !message) {
                showNotification('Veuillez remplir tous les champs obligatoires (*)', 'error');
                return;
            }
            const formattedMessage = formatWhatsAppMessage(name, email, subject, message);
            const encodedMessage = encodeURIComponent(formattedMessage);
            const phoneNumber = '22957832677';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            showNotification('Redirection vers WhatsApp...', 'success');
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                whatsappForm.reset();
            }, 1500);
        });
    }
    function formatWhatsAppMessage(name, email, subject, message) {
        let formatted = `Bonjour Junior,\n\n`;
        formatted += `Je m'appelle *${name}*.\n`;
        if (email) {
            formatted += `Mon email : ${email}\n`;
        }
        formatted += `\n*Sujet* : ${subject}\n`;
        formatted += `\n*Message* :\n${message}\n`;
        formatted += `\n---\n`;
        formatted += `Message envoyé depuis votre portfolio`;
        return formatted;
    }
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in flex items-center`;
        if (type === 'success') {
            notification.className += ' bg-green-600 text-white';
            notification.innerHTML = `
                <i class="fab fa-whatsapp text-xl mr-3"></i>
                <div>
                    <p class="font-semibold">${message}</p>
                    <p class="text-sm opacity-90">Préparation du message...</p>
                </div>
            `;
        } else if (type === 'error') {
            notification.className += ' bg-red-600 text-white';
            notification.innerHTML = `
                <i class="fas fa-exclamation-circle text-xl mr-3"></i>
                <div>
                    <p class="font-semibold">${message}</p>
                </div>
            `;
        } else {
            notification.className += ' bg-blue-600 text-white';
            notification.innerHTML = `
                <i class="fas fa-info-circle text-xl mr-3"></i>
                <div>
                    <p class="font-semibold">${message}</p>
                </div>
            `;
        }
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    const style = document.createElement('style');
    style.textContent = `
        .btn-whatsapp {
            background: linear-gradient(90deg, #25D366, #128C7E);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            border: none;
        }
        .btn-whatsapp:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
        }
        .btn-whatsapp::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.7s ease;
        }
        .btn-whatsapp:hover::after {
            left: 100%;
        }
        select:focus {
            outline: none;
            ring: 2px;
            ring-color: #10B981;
        }
    `;
    document.head.appendChild(style);
});

// Désactiver clic droit
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

// Désactiver certaines touches
document.addEventListener("keydown", function(e) {
    // F12
    if (e.key === "F12") {
        e.preventDefault();
    }
    // CTRL+U
    if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
    }
    // CTRL+SHIFT+I (inspect)
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
    }
});
