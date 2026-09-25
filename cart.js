// Cart management with localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('eurobois_cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('eurobois_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const el = document.getElementById('cart-count');
    if (el) el.textContent = count;
}

/** Nice toast notification (replaces ugly alert) */
function showToast(message, options) {
    options = options || {};
    var existing = document.getElementById('eurobois-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'eurobois-toast';
    toast.setAttribute('role', 'status');
    toast.style.cssText = [
        'position:fixed',
        'left:50%',
        'bottom:28px',
        'transform:translateX(-50%) translateY(20px)',
        'z-index:99999',
        'max-width:min(92vw,420px)',
        'background:#1a3a2a',
        'color:#fff',
        'padding:14px 18px',
        'border-radius:14px',
        'box-shadow:0 10px 40px rgba(0,0,0,.25)',
        'display:flex',
        'align-items:center',
        'gap:12px',
        'font-family:Inter,system-ui,sans-serif',
        'font-size:14px',
        'line-height:1.4',
        'opacity:0',
        'transition:opacity .25s ease, transform .25s ease',
        'pointer-events:auto'
    ].join(';');

    var icon = document.createElement('div');
    icon.style.cssText = 'flex-shrink:0;width:36px;height:36px;border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center;font-size:18px;';
    icon.innerHTML = '✓';

    var text = document.createElement('div');
    text.style.cssText = 'flex:1;min-width:0';
    text.innerHTML = message;

    var close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close');
    close.style.cssText = 'flex-shrink:0;background:transparent;border:0;color:rgba(255,255,255,.7);font-size:18px;cursor:pointer;padding:4px;line-height:1';
    close.innerHTML = '×';
    close.onclick = function () { hide(); };

    toast.appendChild(icon);
    toast.appendChild(text);
    toast.appendChild(close);
    document.body.appendChild(toast);

    // animate in
    requestAnimationFrame(function () {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    var hideTimer = setTimeout(hide, options.duration || 3200);

    function hide() {
        clearTimeout(hideTimer);
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(16px)';
        setTimeout(function () { toast.remove(); }, 280);
    }
}

function addToCart(id, name, price, image, qty = 1) {
    // Get quantity from the nearest qty-value if available
    const btn = event?.target?.closest('button');
    if (btn) {
        const card = btn.closest('.product-card') || btn.closest('.p-4');
        const qtyEl = card?.querySelector('.qty-value');
        if (qtyEl) qty = parseInt(qtyEl.textContent) || 1;
    }

    let cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id, name, price, image, qty });
    }
    saveCart(cart);

    var addedLabel = (typeof t === 'function' && t('cart.added')) ? t('cart.added') : 'added to cart!';
    var viewLabel = (typeof t === 'function' && t('cart.viewCart')) ? t('cart.viewCart') : 'View cart';
    showToast(
        '<strong style="display:block;margin-bottom:2px">' + qty + ' × ' + name + '</strong>' +
        '<span style="opacity:.9">' + addedLabel + '</span> · ' +
        '<a href="panier.html" style="color:#fdba74;text-decoration:underline;font-weight:600">' + viewLabel + '</a>'
    );
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    if (typeof renderCart === 'function') renderCart();
}

function updateQty(id, newQty) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty = Math.max(1, newQty);
        saveCart(cart);
        if (typeof renderCart === 'function') renderCart();
    }
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

// Init on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
