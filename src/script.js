  /* =========================================================
       PAGE SWITCHING
       ========================================================= */
    function switchToPage(name) {
      document.getElementById('page-sales').classList.toggle('active', name === 'sales');
      document.getElementById('page-payment').classList.toggle('active', name === 'payment');
      document.getElementById('navbar-search-wrap').classList.toggle('hidden', name !== 'sales');
      if (name !== 'sales') closeNavbarSearch();
    }

    /* ---------- Navbar: Back ---------- */
    document.getElementById('nav-back-btn').addEventListener('click', () => switchToPage('sales'));

    /* =========================================================
       PAGE 1 — SALES / MENU / CART
       ========================================================= */
    const THEMES = ['theme-terracotta', 'theme-teal', 'theme-marigold', 'theme-cobalt', 'theme-amazon', 'theme-plum'];
    const PILL_COLORS = {
      'theme-terracotta': '#e64a19',
      'theme-teal': '#0d5c75',
      'theme-marigold': '#f2a134',
      'theme-cobalt': '#2e5b9b',
      'theme-amazon': '#3b7a57',
      'theme-plum': '#6a4c93',
    };

    const MENU = [
      { category: 'Alcohol', items: [
          { name: 'Bud Light', price: 5.00 },
          { name: 'Coors Light', price: 5.00 },
          { name: 'Corona', price: 6.00 },
          { name: 'House Wine', price: 8.00 },
          { name: 'Margarita', price: 9.00 },
          { name: 'Mojito', price: 9.50 },
        ]
      },
      { category: 'Attractions', items: [
          { name: 'Zipline Pass', price: 25.00 },
          { name: 'Wave Pool Access', price: 15.00 },
          { name: 'Lazy River Tube', price: 10.00 },
          { name: 'Rock Wall Climb', price: 12.00 },
          { name: 'Mini Golf Round', price: 8.00 },
          { name: 'VR Experience', price: 18.00 },
        ]
      },
      { category: 'Burgers', items: [
          { name: 'Classic Cheeseburger', price: 8.50, allergens: ['dairy', 'gluten'] },
          { name: 'Bacon Burger', price: 10.00, allergens: ['dairy', 'gluten'] },
          { name: 'Veggie Burger', price: 9.00, allergens: ['gluten', 'soy'] },
          { name: 'Double Stack', price: 12.00, allergens: ['dairy', 'gluten'] },
          { name: 'BBQ Burger', price: 10.50, allergens: ['dairy', 'gluten'] },
          { name: 'Mushroom Swiss', price: 10.00, allergens: ['dairy', 'gluten'] },
        ]
      },
      { category: 'Drinks', items: [
          { name: 'Fountain Soda', price: 3.00 },
          { name: 'Iced Tea', price: 3.00 },
          { name: 'Lemonade', price: 3.50 },
          { name: 'Bottled Water', price: 2.00 },
          { name: 'Coffee', price: 2.50 },
          { name: 'Milkshake', price: 5.50, allergens: ['peanuts', 'dairy'] },
        ]
      },
      { category: 'Food', items: [
          { name: 'Chicken Tenders', price: 7.00, allergens: ['gluten'] },
          { name: 'Nachos', price: 6.50, allergens: ['dairy'] },
          { name: 'French Fries', price: 4.00 },
          { name: 'Onion Rings', price: 4.50, allergens: ['gluten', 'soy'] },
          { name: 'Hot Dog', price: 5.00, allergens: ['gluten'] },
          { name: 'Loaded Fries', price: 7.50, allergens: ['dairy'] },
        ]
      },
      { category: 'Pizza', items: [
          { name: 'Cheese Slice', price: 4.00, allergens: ['dairy', 'gluten'] },
          { name: 'Pepperoni Slice', price: 4.50, allergens: ['dairy', 'gluten'] },
          { name: 'Veggie Slice', price: 4.50, allergens: ['dairy', 'gluten'] },
          { name: 'Supreme Slice', price: 5.00, allergens: ['dairy', 'gluten'] },
          { name: 'Whole Cheese Pizza', price: 16.00, allergens: ['dairy', 'gluten'] },
          { name: 'Whole Pepperoni Pizza', price: 18.00, allergens: ['dairy', 'gluten'] },
        ]
      },
      { category: 'Rentals', items: [
          { name: 'Beach Umbrella', price: 10.00 },
          { name: 'Lounge Chair', price: 8.00 },
          { name: 'Tube Rental', price: 6.00 },
          { name: 'Locker Rental', price: 5.00 },
          { name: 'Towel Rental', price: 3.00 },
          { name: 'Cabana Half-Day', price: 45.00 },
        ]
      },
      { category: 'Salads', items: [
          { name: 'Garden Salad', price: 6.50 },
          { name: 'Caesar Salad', price: 7.00, allergens: ['dairy', 'eggs', 'gluten'] },
          { name: 'Cobb Salad', price: 8.50, allergens: ['dairy', 'eggs'] },
          { name: 'Side Salad', price: 4.50 },
          { name: 'Fruit Cup', price: 4.00 },
        ]
      },
      { category: 'Treats', items: [
          { name: 'Cookies', price: 5.00, allergens: ['peanuts', 'gluten', 'eggs', 'tree_nuts'] },
          { name: 'Ice Cream Cone', price: 4.50, allergens: ['peanuts', 'dairy'] },
          { name: 'Funnel Cake', price: 7.00, allergens: ['gluten', 'eggs'] },
          { name: 'Cotton Candy', price: 4.00 },
          { name: 'Churro', price: 3.50, allergens: ['gluten', 'eggs'] },
          { name: 'Soft Serve Sundae', price: 5.50, allergens: ['peanuts', 'dairy', 'tree_nuts'] },
        ]
      },
    ];

    MENU.forEach((cat, i) => { cat.theme = THEMES[i % THEMES.length]; });
    const itemLookup = {};
    MENU.forEach((cat) => cat.items.forEach((item, idx) => {
      itemLookup[item.name] = { ...item, category: cat.category, theme: THEMES[idx % THEMES.length] };
    }));

    let activeCategory = MENU[0].category;
    let activeAllergenFilter = '';
    const cart = {};
    const fulfillment = {};

    const categoriesEl = document.getElementById('categories');
    function renderCategories() {
      categoriesEl.innerHTML = '';
      MENU.forEach((cat) => {
        const pill = document.createElement('div');
        pill.className = 'category-pill' + (cat.category === activeCategory ? ' active' : '');
        pill.textContent = cat.category;
        pill.style.setProperty('--pill-color', PILL_COLORS[cat.theme]);
        pill.addEventListener('click', () => {
          activeCategory = cat.category;
          renderCategories();
          renderItems();
        });
        categoriesEl.appendChild(pill);
      });
    }

    const itemsGrid = document.getElementById('items-grid');
    const HOLD_DURATION = 450;

    function renderItems() {
      itemsGrid.innerHTML = '';
      const cat = MENU.find((c) => c.category === activeCategory);
      const filtered = cat.items;

      if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = `No ${activeCategory.toLowerCase()} items yet`;
        itemsGrid.appendChild(empty);
        return;
      }

      filtered.forEach((item, idx) => {
        const card = document.createElement('div');
        const qty = cart[item.name] ? cart[item.name].qty : 0;
        const inCart = qty > 0;
        const theme = THEMES[idx % THEMES.length];
        const isFlagged = activeAllergenFilter && Array.isArray(item.allergens) && item.allergens.includes(activeAllergenFilter);
        card.className = `item-card ${theme}` + (inCart ? ' in-cart' : '') + (isFlagged ? ' allergen-flag' : '');

        const top = document.createElement('div');
        top.className = 'item-card-top';

        const name = document.createElement('div');
        name.className = 'item-name';
        name.textContent = item.name;

        const price = document.createElement('div');
        price.className = 'item-price';
        price.textContent = `$${item.price.toFixed(2)}`;

        top.appendChild(name);
        top.appendChild(price);

        const qtyBar = document.createElement('div');
        qtyBar.className = 'item-qty-bar' + (inCart ? ' has-count' : '');
        qtyBar.textContent = String(qty);

        card.appendChild(top);
        card.appendChild(qtyBar);

        let pressTimer = null;
        card.longPressFired = false;
        const startPress = () => {
          card.longPressFired = false;
          pressTimer = setTimeout(() => {
            card.longPressFired = true;
            openQtyKeypad(item.name);
          }, HOLD_DURATION);
        };
        const cancelPress = () => clearTimeout(pressTimer);
        card.addEventListener('pointerdown', startPress);
        card.addEventListener('pointerup', cancelPress);
        card.addEventListener('pointerleave', cancelPress);
        card.addEventListener('pointercancel', cancelPress);

        top.addEventListener('click', () => {
          if (card.longPressFired) { card.longPressFired = false; return; }
          addToCart(item.name);
        });

        qtyBar.addEventListener('click', () => {
          if (card.longPressFired) { card.longPressFired = false; return; }
          if (cart[item.name] && cart[item.name].qty > 0) {
            decrementCart(item.name);
          }
        });

        itemsGrid.appendChild(card);
      });
    }

    /* ---------- Navbar allergen filter (highlights matching items dark red) ---------- */
    const navbarFilterSelect = document.getElementById('navbar-filter-select');
    navbarFilterSelect.addEventListener('change', (e) => {
      activeAllergenFilter = e.target.value;
      renderItems();
    });

    /* ---------- Navbar item search (live results list, sales page only) ---------- */
    const navbarSearchInput = document.getElementById('navbar-search');
    const navbarSearchResults = document.getElementById('navbar-search-results');
    const navbarSearchWrap = document.getElementById('navbar-search-wrap');

    function renderNavbarSearchResults(term) {
      navbarSearchResults.innerHTML = '';

      if (!term) {
        navbarSearchResults.classList.remove('open');
        return;
      }

      const matches = Object.values(itemLookup).filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );

      if (matches.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'navbar-search-empty';
        empty.textContent = `No items match "${term}"`;
        navbarSearchResults.appendChild(empty);
      } else {
        matches.forEach((item) => {
          const row = document.createElement('div');
          row.className = 'navbar-search-result-item';

          const name = document.createElement('span');
          name.textContent = item.name;

          const price = document.createElement('span');
          price.className = 'navbar-search-result-price';
          price.textContent = `$${item.price.toFixed(2)}`;

          row.appendChild(name);
          row.appendChild(price);
          row.addEventListener('click', () => {
            addToCart(item.name);
            navbarSearchInput.value = '';
            renderNavbarSearchResults('');
          });

          navbarSearchResults.appendChild(row);
        });
      }

      navbarSearchResults.classList.add('open');
    }

    navbarSearchInput.addEventListener('input', (e) => {
      renderNavbarSearchResults(e.target.value.trim());
    });

    document.addEventListener('click', (e) => {
      if (!navbarSearchWrap.contains(e.target)) {
        navbarSearchResults.classList.remove('open');
      }
    });

    function closeNavbarSearch() {
      navbarSearchInput.value = '';
      renderNavbarSearchResults('');
    }

    function addToCart(name) {
      const item = itemLookup[name];
      if (!cart[name]) {
        cart[name] = { name: item.name, price: item.price, theme: item.theme, qty: 0 };
        if (!(name in fulfillment)) fulfillment[name] = false;
      }
      cart[name].qty += 1;
      renderAll();
    }

    function decrementCart(name) {
      if (!cart[name]) return;
      cart[name].qty -= 1;
      if (cart[name].qty <= 0) {
        delete cart[name];
        delete fulfillment[name];
      }
      renderAll();
    }

    function incrementCart(name) {
      cart[name].qty += 1;
      renderAll();
    }

    function removeFromCart(name) {
      delete cart[name];
      delete fulfillment[name];
      renderAll();
    }

    function clearCart() {
      Object.keys(cart).forEach((k) => delete cart[k]);
      Object.keys(fulfillment).forEach((k) => delete fulfillment[k]);
      renderAll();
    }

    function toggleFulfillment(name) {
      fulfillment[name] = !fulfillment[name];
      renderChecklist();
      renderPayChecklist();
    }

    const cartList = document.getElementById('cart-list');
    const cartEmpty = document.getElementById('cart-empty');
    const TAX_RATE = 0.08;

    function fmt(n) { return `$${n.toFixed(2)}`; }
    function fmtAbs(n) { return `$${Math.abs(n).toFixed(2)}`; }

    function renderCart() {
      cartList.innerHTML = '';
      const entries = Object.values(cart);

      if (entries.length === 0) {
        cartList.appendChild(cartEmpty);
        return;
      }

      entries.forEach((line) => {
        const row = document.createElement('div');
        row.className = 'cart-row';

        const info = document.createElement('div');
        info.className = 'cart-row-info';
        const nameEl = document.createElement('div');
        nameEl.className = 'cart-row-name';
        nameEl.textContent = line.name;
        const unitEl = document.createElement('div');
        unitEl.className = 'cart-row-unit';
        unitEl.textContent = `${fmt(line.price)} each`;
        info.appendChild(nameEl);
        info.appendChild(unitEl);

        const qtyWrap = document.createElement('div');
        qtyWrap.className = 'cart-row-qty';
        const minusBtn = document.createElement('button');
        minusBtn.type = 'button';
        minusBtn.className = 'qty-btn';
        minusBtn.textContent = '−';
        minusBtn.addEventListener('click', () => decrementCart(line.name));
        const qtyVal = document.createElement('span');
        qtyVal.className = 'qty-value';
        qtyVal.textContent = line.qty;
        const plusBtn = document.createElement('button');
        plusBtn.type = 'button';
        plusBtn.className = 'qty-btn';
        plusBtn.textContent = '+';
        plusBtn.addEventListener('click', () => incrementCart(line.name));
        qtyWrap.appendChild(minusBtn);
        qtyWrap.appendChild(qtyVal);
        qtyWrap.appendChild(plusBtn);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'cart-row-remove';
        removeBtn.textContent = '✕';
        removeBtn.title = 'Remove item';
        removeBtn.addEventListener('click', () => removeFromCart(line.name));

        row.appendChild(info);
        row.appendChild(qtyWrap);
        row.appendChild(removeBtn);
        cartList.appendChild(row);
      });
    }

    const totalValue = document.getElementById('total-value');
    const payButton = document.getElementById('pay-button');

    function currentOrderTotal() {
      const subtotal = Object.values(cart).reduce((sum, l) => sum + l.price * l.qty, 0);
      return subtotal * (1 + TAX_RATE);
    }

    function renderTotals() {
      const total = currentOrderTotal();

      totalValue.textContent = fmt(total);
      payButton.textContent = `Pay ${fmt(total)}`;
      payButton.disabled = total <= 0;
    }

    function renderAll() {
      renderItems();
      renderCart();
      renderTotals();
      renderChecklist();
    }

    const checklistList = document.getElementById('checklist-list');
    const checklistEmpty = document.getElementById('checklist-empty');

    function renderChecklist() {
      checklistList.innerHTML = '';
      const entries = Object.values(cart);

      if (entries.length === 0) {
        checklistList.appendChild(checklistEmpty);
        return;
      }

      entries.forEach((line) => {
        const isChecked = !!fulfillment[line.name];
        const label = document.createElement('label');
        label.className = `checklist-item ${line.theme}` + (isChecked ? ' checked' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isChecked;
        checkbox.addEventListener('change', () => toggleFulfillment(line.name));

        const text = document.createElement('span');
        text.textContent = line.name;

        const qty = document.createElement('span');
        qty.className = 'checklist-item-qty';
        qty.textContent = `×${line.qty}`;

        label.appendChild(checkbox);
        label.appendChild(text);
        label.appendChild(qty);

        checklistList.appendChild(label);
      });
    }

    /* Pay button now navigates to the payment page instead of opening a modal */
    payButton.addEventListener('click', () => {
      const total = currentOrderTotal();
      if (total <= 0) return;
      goToPaymentPage(total);
    });

    /* ---------- HOLD-TO-SET-QUANTITY KEYPAD (sales page) ---------- */
    const qtyKeypadOverlay = document.getElementById('qty-keypad-overlay');
    const qtyKeypadTitle = document.getElementById('qty-keypad-title');
    const qtyKeypadDisplay = document.getElementById('qty-keypad-display');
    const qtyKeypadCancel = document.getElementById('qty-keypad-cancel');
    const qtyKeypadConfirm = document.getElementById('qty-keypad-confirm');
    let activeQtyItemName = null;
    let qtyKeypadValue = '';

    function refreshQtyKeypadDisplay() {
      qtyKeypadDisplay.textContent = qtyKeypadValue || '0';
    }

    function openQtyKeypad(name) {
      activeQtyItemName = name;
      qtyKeypadValue = cart[name] ? String(cart[name].qty) : '';
      qtyKeypadTitle.textContent = `${name} — quantity`;
      refreshQtyKeypadDisplay();
      qtyKeypadOverlay.classList.add('open');
    }

    function closeQtyKeypad() {
      qtyKeypadOverlay.classList.remove('open');
      activeQtyItemName = null;
      qtyKeypadValue = '';
    }

    qtyKeypadOverlay.querySelectorAll('.keypad-key').forEach((key) => {
      key.addEventListener('click', () => {
        const action = key.dataset.key;
        if (action === 'clear') {
          qtyKeypadValue = '';
        } else if (action === 'back') {
          qtyKeypadValue = qtyKeypadValue.slice(0, -1);
        } else if (qtyKeypadValue.length < 3) {
          qtyKeypadValue += action;
        }
        refreshQtyKeypadDisplay();
      });
    });

    qtyKeypadCancel.addEventListener('click', closeQtyKeypad);

    qtyKeypadConfirm.addEventListener('click', () => {
      if (activeQtyItemName) {
        const qty = parseInt(qtyKeypadValue || '0', 10);
        const item = itemLookup[activeQtyItemName];
        if (qty <= 0) {
          delete cart[activeQtyItemName];
          delete fulfillment[activeQtyItemName];
        } else {
          if (!cart[activeQtyItemName]) {
            cart[activeQtyItemName] = { name: item.name, price: item.price, theme: item.theme, qty: 0 };
            if (!(activeQtyItemName in fulfillment)) fulfillment[activeQtyItemName] = false;
          }
          cart[activeQtyItemName].qty = qty;
        }
        renderAll();
      }
      closeQtyKeypad();
    });

    qtyKeypadOverlay.addEventListener('click', (e) => {
      if (e.target === qtyKeypadOverlay) closeQtyKeypad();
    });

    renderCategories();
    renderAll();

    /* =========================================================
       PAGE 2 — PAYMENT
       ========================================================= */
    let orderTotal = 0;
    let manualCashTotal = null;
    let cashEntries = [];
    let creditPaid = 0;
    let checkPaid = 0;

    const rowCash = document.getElementById('row-cash');
    const receiptCash = document.getElementById('receipt-cash');
    const cashEntriesList = document.getElementById('cash-entries-list');
    const rowCredit = document.getElementById('row-credit');
    const receiptCredit = document.getElementById('receipt-credit');
    const rowCheck = document.getElementById('row-check');
    const receiptCheck = document.getElementById('receipt-check');
    const rowBalance = document.getElementById('row-balance');
    const balanceLabel = document.getElementById('balance-label');
    const receiptBalance = document.getElementById('receipt-balance');
    const totalPanel = document.getElementById('total-panel');
    const cashButtonLabel = document.getElementById('cash-button-label');
    const cashEnterBtn = document.getElementById('cash-enter-btn');
    const completeSaleBtn = document.getElementById('complete-sale-btn');

    function formatLabel(value) {
      return value < 1 ? `${Math.round(value * 100)}¢` : `$${value}`;
    }

    /* ---------- Lock the total card's height to match the cash/coin panel exactly ---------- */
    const moneySelectorPanel = document.getElementById('money-selector-panel');

    function syncTotalPanelHeight() {
      if (!moneySelectorPanel || !totalPanel) return;
      const sideBySide = window.innerWidth > 600;
      if (!sideBySide) {
        totalPanel.style.height = '';
        return;
      }
      const h = moneySelectorPanel.offsetHeight;
      if (h > 0) totalPanel.style.height = `${h}px`;
    }

    if (window.ResizeObserver) {
      new ResizeObserver(syncTotalPanelHeight).observe(moneySelectorPanel);
    }
    window.addEventListener('resize', syncTotalPanelHeight);

    function goToPaymentPage(total) {
      orderTotal = total;
      switchToPage('payment');
      renderTotal();
      renderPayChecklist();
      requestAnimationFrame(syncTotalPanelHeight);
    }

    const currencyButtons = Array.from(document.querySelectorAll('.pos-btn-card'));

    function cashFromDenominations() {
      let sum = 0;
      currencyButtons.forEach((btn) => { sum += parseFloat(btn.dataset.value) * btn.clickCount; });
      return sum;
    }

    function cashEnteredTotal() {
      return cashEntries.reduce((sum, amount) => sum + amount, 0);
    }

    function renderCashEntries() {
      cashEntriesList.innerHTML = '';
      cashEntriesList.style.display = cashEntries.length > 0 ? '' : 'none';
      cashEntries.forEach((amount) => {
        const row = document.createElement('div');
        row.className = 'pay-receipt-row';
        const label = document.createElement('span');
        label.className = 'pay-receipt-label';
        label.textContent = 'Cash';
        const value = document.createElement('span');
        value.className = 'pay-receipt-value';
        value.textContent = `- ${fmt(amount)}`;
        row.appendChild(label);
        row.appendChild(value);
        cashEntriesList.appendChild(row);
      });
    }

    function renderTotal() {
      const pendingCash = cashFromDenominations();
      const cashPaid = manualCashTotal !== null ? manualCashTotal : (cashEnteredTotal() + pendingCash);
      const totalPaid = cashPaid + creditPaid + checkPaid;
      const balance = orderTotal - totalPaid;

      cashEnterBtn.disabled = manualCashTotal !== null || pendingCash <= 0;

      renderCashEntries();

      if (manualCashTotal !== null && manualCashTotal > 0) { rowCash.style.display = ''; receiptCash.textContent = `- ${fmt(manualCashTotal)}`; }
      else if (manualCashTotal === null && pendingCash > 0) { rowCash.style.display = ''; receiptCash.textContent = `- ${fmt(pendingCash)}`; }
      else { rowCash.style.display = 'none'; }

      if (creditPaid > 0) { rowCredit.style.display = ''; receiptCredit.textContent = `- ${fmt(creditPaid)}`; }
      else { rowCredit.style.display = 'none'; }

      if (checkPaid > 0) { rowCheck.style.display = ''; receiptCheck.textContent = `- ${fmt(checkPaid)}`; }
      else { rowCheck.style.display = 'none'; }

      if (balance > 0.004) {
        balanceLabel.textContent = 'Balance Due';
        receiptBalance.textContent = fmtAbs(balance);
        rowBalance.className = 'pay-receipt-row pay-receipt-balance pay-balance-due';
        completeSaleBtn.disabled = true;
        completeSaleBtn.textContent = `Balance Due ${fmtAbs(balance)}`;
      } else if (balance < -0.004) {
        balanceLabel.textContent = 'Change Due';
        receiptBalance.textContent = fmtAbs(balance);
        rowBalance.className = 'pay-receipt-row pay-receipt-balance pay-balance-settled';
        completeSaleBtn.disabled = false;
        completeSaleBtn.textContent = `Complete Sale (Change ${fmtAbs(balance)})`;
      } else {
        balanceLabel.textContent = 'Balance Due';
        receiptBalance.textContent = '$0.00';
        rowBalance.className = 'pay-receipt-row pay-receipt-balance pay-balance-settled';
        completeSaleBtn.disabled = orderTotal <= 0;
        completeSaleBtn.textContent = 'Complete Sale';
      }

      totalPanel.classList.toggle('has-value', totalPaid > 0);
    }

    function updateButtonUI(button) {
      const bottomHalf = button.querySelector('.text');
      bottomHalf.textContent = button.clickCount;
      bottomHalf.classList.toggle('has-count', button.clickCount > 0);
      renderTotal();
    }

    currencyButtons.forEach((button) => {
      button.clickCount = 0;
      const topHalf = button.querySelector('.card-main-val');
      const bottomHalf = button.querySelector('.text');
      topHalf.addEventListener('click', () => {
        if (button.longPressFired) { button.longPressFired = false; return; }
        button.clickCount++;
        updateButtonUI(button);
      });
      bottomHalf.addEventListener('click', () => {
        if (button.longPressFired) { button.longPressFired = false; return; }
        if (button.clickCount > 0) {
          button.clickCount--;
          updateButtonUI(button);
        }
      });
    });

    function resetPaymentState() {
      currencyButtons.forEach((button) => { button.clickCount = 0; updateButtonUI(button); });
      manualCashTotal = null;
      cashEntries = [];
      creditPaid = 0;
      checkPaid = 0;
      cashButtonLabel.textContent = 'Cash';
      switchToMainMenu();
      renderTotal();
    }

    cashEnterBtn.addEventListener('click', () => {
      const pending = cashFromDenominations();
      if (pending <= 0) return;

      cashEntries.push(pending);
      currencyButtons.forEach((button) => { button.clickCount = 0; updateButtonUI(button); });
      renderTotal();

      const balanceNow = orderTotal - (cashEnteredTotal() + creditPaid + checkPaid);
      if (balanceNow <= 0.004) {
        clearCart();
        resetPaymentState();
        switchToPage('sales');
      }
    });

    completeSaleBtn.addEventListener('click', () => {
      if (completeSaleBtn.disabled) return;
      clearCart();
      resetPaymentState();
      switchToPage('sales');
    });

    /* ---------- SUBMENU NAVIGATION (Other / Back, and Credit / Credit Manual / Check) ---------- */
    const btn1 = document.getElementById('btn-pos-1');
    const btn2 = document.getElementById('btn-pos-2');
    const btn3 = document.getElementById('btn-pos-3');
    const btn4 = document.getElementById('btn-pos-4');

    function switchToSubmenu() {
      btn1.className = 'pos-btn-card1234 btn-coupons1234';
      btn1.setAttribute('data-value', 'coupons');
      btn1.querySelector('.card-main-val1234').textContent = 'Coupons';
      btn2.className = 'pos-btn-card1234 btn-gift1234';
      btn2.setAttribute('data-value', 'gift_card');
      btn2.querySelector('.card-main-val1234').textContent = 'Gift Card';
      btn3.className = 'pos-btn-card1234 btn-discounts1234';
      btn3.setAttribute('data-value', 'discounts');
      btn3.querySelector('.card-main-val1234').textContent = 'Discounts';
      btn4.className = 'pos-btn-card1234 btn-back1234';
      btn4.setAttribute('data-value', 'back');
      btn4.querySelector('.card-main-val1234').textContent = 'Back';
    }

    function switchToMainMenu() {
      btn1.className = 'pos-btn-card1234 btn-credit1234';
      btn1.setAttribute('data-value', 'credit');
      btn1.querySelector('.card-main-val1234').textContent = 'Credit';
      btn2.className = 'pos-btn-card1234 btn-credit-manual1234';
      btn2.setAttribute('data-value', 'credit_manual');
      btn2.querySelector('.card-main-val1234').textContent = 'Credit Manual';
      btn3.className = 'pos-btn-card1234 btn-check1234';
      btn3.setAttribute('data-value', 'check');
      btn3.querySelector('.card-main-val1234').textContent = 'Check';
      btn4.className = 'pos-btn-card1234 btn-other1234';
      btn4.setAttribute('data-value', 'other');
      btn4.querySelector('.card-main-val1234').textContent = 'Other';
    }

    btn4.addEventListener('click', () => {
      const currentMode = btn4.getAttribute('data-value');
      if (currentMode === 'other') switchToSubmenu();
      else if (currentMode === 'back') switchToMainMenu();
    });

    /* Credit = charge the full remaining balance instantly (like a card tap) */
    btn1.addEventListener('click', () => {
      if (btn1.getAttribute('data-value') !== 'credit') return;
      const cashPaid = manualCashTotal !== null ? manualCashTotal : cashFromDenominations();
      const remaining = orderTotal - (cashPaid + creditPaid + checkPaid);
      if (remaining > 0) {
        creditPaid += remaining;
        renderTotal();
      }
    });

    /* Credit Manual = type a specific credit amount */
    btn2.addEventListener('click', () => {
      if (btn2.getAttribute('data-value') !== 'credit_manual') return;
      openCreditKeypad();
    });

    /* Check = type a specific check amount */
    btn3.addEventListener('click', () => {
      if (btn3.getAttribute('data-value') !== 'check') return;
      openCheckKeypad();
    });

    const wideLayoutQuery = window.matchMedia('(min-width: 1400px)');
    function syncActionGridToLayout(event) { if (event.matches) switchToMainMenu(); }
    wideLayoutQuery.addEventListener('change', syncActionGridToLayout);
    syncActionGridToLayout(wideLayoutQuery);

    const phoneLayoutQuery = window.matchMedia('(max-width: 600px)');
    function syncActionGridToPhone(event) { if (event.matches) switchToMainMenu(); }
    phoneLayoutQuery.addEventListener('change', syncActionGridToPhone);
    syncActionGridToPhone(phoneLayoutQuery);

    /* ---------- KEYPAD (denomination count / cash total / credit / check) ---------- */
    const keypadOverlay = document.getElementById('keypad-overlay');
    const keypadTitle = document.getElementById('keypad-title');
    const keypadDisplay = document.getElementById('keypad-display');
    const keypadCancelBtn = document.getElementById('keypad-cancel');
    const keypadConfirmBtn = document.getElementById('keypad-confirm');
    let activeKeypadButton = null;
    let keypadValue = '';
    let keypadMode = null; // 'count' | 'cash_total' | 'credit' | 'check'

    function formatCentsAsCurrency(digits) {
      const cents = parseInt(digits || '0', 10);
      return `$${(cents / 100).toFixed(2)}`;
    }

    function refreshKeypadDisplay() {
      keypadDisplay.textContent = keypadMode === 'count'
        ? (keypadValue || '0')
        : formatCentsAsCurrency(keypadValue);
    }

    function openKeypad(button) {
      keypadMode = 'count';
      activeKeypadButton = button;
      keypadValue = String(button.clickCount || '');
      keypadTitle.textContent = formatLabel(parseFloat(button.dataset.value)) + ' count';
      refreshKeypadDisplay();
      keypadOverlay.classList.add('open');
    }

    function openCashTotalKeypad() {
      keypadMode = 'cash_total';
      activeKeypadButton = null;
      keypadValue = manualCashTotal !== null ? String(Math.round(manualCashTotal * 100)) : '';
      keypadTitle.textContent = 'Cash total';
      refreshKeypadDisplay();
      keypadOverlay.classList.add('open');
    }

    function openCreditKeypad() {
      keypadMode = 'credit';
      activeKeypadButton = null;
      keypadValue = '';
      keypadTitle.textContent = 'Credit amount';
      refreshKeypadDisplay();
      keypadOverlay.classList.add('open');
    }

    function openCheckKeypad() {
      keypadMode = 'check';
      activeKeypadButton = null;
      keypadValue = '';
      keypadTitle.textContent = 'Check amount';
      refreshKeypadDisplay();
      keypadOverlay.classList.add('open');
    }

    function closeKeypad() {
      keypadOverlay.classList.remove('open');
      activeKeypadButton = null;
      keypadMode = null;
      keypadValue = '';
    }

    keypadOverlay.querySelectorAll('.keypad-key').forEach((key) => {
      key.addEventListener('click', () => {
        const action = key.dataset.key;
        const maxDigits = keypadMode === 'count' ? 4 : 6;
        if (action === 'clear') {
          keypadValue = '';
        } else if (action === 'back') {
          keypadValue = keypadValue.slice(0, -1);
        } else if (keypadValue.length < maxDigits) {
          keypadValue += action;
        }
        refreshKeypadDisplay();
      });
    });

    keypadCancelBtn.addEventListener('click', closeKeypad);

    keypadConfirmBtn.addEventListener('click', () => {
      if (keypadMode === 'cash_total') {
        manualCashTotal = parseInt(keypadValue || '0', 10) / 100;
        cashButtonLabel.textContent = `Cash $${manualCashTotal.toFixed(2)}`;
        renderTotal();
      } else if (keypadMode === 'credit') {
        creditPaid += parseInt(keypadValue || '0', 10) / 100;
        renderTotal();
      } else if (keypadMode === 'check') {
        checkPaid += parseInt(keypadValue || '0', 10) / 100;
        renderTotal();
      } else if (keypadMode === 'count' && activeKeypadButton) {
        activeKeypadButton.clickCount = parseInt(keypadValue || '0', 10);
        updateButtonUI(activeKeypadButton);
      }
      closeKeypad();
    });

    keypadOverlay.addEventListener('click', (e) => {
      if (e.target === keypadOverlay) closeKeypad();
    });

    const cashTotalButton = document.getElementById('btn-pos-cash');
    cashTotalButton.addEventListener('click', openCashTotalKeypad);

    currencyButtons.forEach((button) => {
      let pressTimer = null;
      button.longPressFired = false;
      const startPress = () => {
        button.longPressFired = false;
        pressTimer = setTimeout(() => {
          button.longPressFired = true;
          openKeypad(button);
        }, HOLD_DURATION);
      };
      const cancelPress = () => clearTimeout(pressTimer);
      button.addEventListener('pointerdown', startPress);
      button.addEventListener('pointerup', cancelPress);
      button.addEventListener('pointerleave', cancelPress);
      button.addEventListener('pointercancel', cancelPress);
    });

    /* ---------- Customer fulfillment checklist (mirrors the order's Fulfillment Checklist) ---------- */
    const payChecklistContainer = document.getElementById('checklist-container');
    const payChecklist = document.getElementById('checklist');

    function renderPayChecklist() {
      payChecklist.innerHTML = '';
      const entries = Object.values(cart);

      if (entries.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'checklist-empty';
        empty.textContent = 'No items to prep for this order';
        payChecklist.appendChild(empty);
        payChecklistContainer.classList.remove('all-complete');
        return;
      }

      entries.forEach((line) => {
        const isChecked = !!fulfillment[line.name];
        const label = document.createElement('label');
        label.className = `pay-checklist-item ${line.theme}` + (isChecked ? ' checked' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isChecked;
        checkbox.addEventListener('change', () => toggleFulfillment(line.name));

        const textSpan = document.createElement('span');
        textSpan.textContent = line.name;

        const qty = document.createElement('span');
        qty.className = 'checklist-item-qty';
        qty.textContent = `×${line.qty}`;

        label.appendChild(checkbox);
        label.appendChild(textSpan);
        label.appendChild(qty);
        payChecklist.appendChild(label);
      });

      const allChecked = entries.every((line) => !!fulfillment[line.name]);
      payChecklistContainer.classList.toggle('all-complete', allChecked);
    }

    renderTotal();
