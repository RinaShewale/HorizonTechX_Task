import './style.css'
/**
 * SciCalc PRO - Advanced Scientific Calculator
 * Mathematical parsing, evaluation, degree/radian mode, history & keyboard bindings.
 */

(function () {
  'use strict';

  // Calculator State
  let currentExpression = '';
  let lastResult = null;
  let ans = 0;
  let memoryValue = 0;
  let isRad = false;
  let isShift = false;
  let justEvaluated = false;
  let history = [];

  // DOM References
  const mainDisplay = document.getElementById('mainDisplay');
  const prevExpressionDisplay = document.getElementById('prevExpressionDisplay');
  const formulaPreview = document.getElementById('formulaPreview');
  const angleModeBtn = document.getElementById('angleModeBtn');
  const shiftModeBtn = document.getElementById('shiftModeBtn');
  const memIndicator = document.getElementById('memIndicator');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const historyToggleBtn = document.getElementById('historyToggleBtn');
  const historyBadge = document.getElementById('historyBadge');
  const historyDrawer = document.getElementById('historyDrawer');
  const closeHistoryBtn = document.getElementById('closeHistoryBtn');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const historyList = document.getElementById('historyList');
  const drawerOverlay = document.getElementById('drawerOverlay');

  // Math Scope for Dynamic Safe Evaluation
  function createMathScope(isRadMode) {
    const toRad = (deg) => deg * (Math.PI / 180);
    const toDeg = (rad) => rad * (180 / Math.PI);

    return {
      pi: Math.PI,
      e: Math.E,
      ANS: ans,
      sin: (x) => {
        if (!isRadMode && x % 180 === 0) return 0;
        return Math.sin(isRadMode ? x : toRad(x));
      },
      cos: (x) => {
        if (!isRadMode && (Math.abs(x) % 360 === 90 || Math.abs(x) % 360 === 270)) return 0;
        return Math.cos(isRadMode ? x : toRad(x));
      },
      tan: (x) => {
        if (!isRadMode && (Math.abs(x) % 180 === 90)) return Infinity;
        return Math.tan(isRadMode ? x : toRad(x));
      },
      asin: (x) => {
        const val = Math.asin(x);
        return isRadMode ? val : toDeg(val);
      },
      acos: (x) => {
        const val = Math.acos(x);
        return isRadMode ? val : toDeg(val);
      },
      atan: (x) => {
        const val = Math.atan(x);
        return isRadMode ? val : toDeg(val);
      },
      sinh: Math.sinh,
      cosh: Math.cosh,
      tanh: Math.tanh,
      asinh: Math.asinh,
      acosh: Math.acosh,
      atanh: Math.atanh,
      log: (x) => Math.log10(x),
      ln: (x) => Math.log(x),
      sqrt: (x) => Math.sqrt(x),
      cbrt: (x) => Math.cbrt(x),
      abs: Math.abs,
      fact: (n) => {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        if (n > 170) return Infinity; // Maximum finite factorial in JS
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
      }
    };
  }

  // Pre-process and format expression for execution
  function preprocessExpression(rawExpr) {
    let s = rawExpr.trim();
    if (!s) return '0';

    // Standardize unicode symbols
    s = s.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    s = s.replace(/π/g, 'pi');
    s = s.replace(/√\(/g, 'sqrt(').replace(/√(\d+(\.\d+)?)/g, 'sqrt($1)');

    // Percentage: 50% => (50*0.01)
    s = s.replace(/(\d+(\.\d+)?)%/g, '($1*0.01)');

    // Factorial: n! => fact(n)
    while (s.includes('!')) {
      const next = s.replace(/(\d+(\.\d+)?|\([^\(\)]+\))!/g, (m, p1) => `fact(${p1})`);
      if (next === s) break;
      s = next;
    }

    // Auto-insert implicit multiplication:
    // 1. Number before '(', 'pi', 'e', 'ANS', or function name
    s = s.replace(/(\d)(\s*)([a-zA-Z\(])/g, '$1*$3');
    // 2. ')' before '(', number, 'pi', 'e', or function
    s = s.replace(/(\))(\s*)([\d\(a-zA-Z])/g, '$1*$3');
    // 3. 'pi' or 'e' before number or '('
    s = s.replace(/(\bpi\b|\be\b)(\s*)([\d\(a-zA-Z])/g, '$1*$3');

    // Powers: ^ => **
    s = s.replace(/\^/g, '**');

    // Auto-close missing parentheses
    let openCount = 0;
    for (let char of s) {
      if (char === '(') openCount++;
      if (char === ')') openCount--;
    }
    if (openCount > 0) {
      s += ')'.repeat(openCount);
    }

    return s;
  }

  // Safe evaluation using generated math scope
  function evaluateExpression(expr, angleIsRad) {
    const processed = preprocessExpression(expr);
    const scope = createMathScope(angleIsRad);
    const keys = Object.keys(scope);
    const values = Object.values(scope);

    const evaluator = new Function(...keys, `"use strict"; return (${processed});`);
    return evaluator(...values);
  }

  // Format numbers cleanly and fix float precision quirks (e.g. 0.1 + 0.2 = 0.3)
  function formatResult(val) {
    if (val === null || val === undefined || isNaN(val)) return 'Error';
    if (!isFinite(val)) return val > 0 ? 'Infinity' : '-Infinity';

    const precision = 12;
    const rounded = Math.round(val * Math.pow(10, precision)) / Math.pow(10, precision);

    if (Math.abs(rounded) >= 1e14 || (Math.abs(rounded) > 0 && Math.abs(rounded) < 1e-9)) {
      return rounded.toExponential(8).replace(/\.?0+e/, 'e');
    }

    return rounded.toString();
  }

  // Display Updates
  function updateDisplay() {
    mainDisplay.value = currentExpression || '0';
    mainDisplay.scrollLeft = mainDisplay.scrollWidth;

    // Real-time calculation preview
    if (currentExpression && !justEvaluated) {
      try {
        const preview = evaluateExpression(currentExpression, isRad);
        if (typeof preview === 'number' && !isNaN(preview) && isFinite(preview)) {
          formulaPreview.textContent = `= ${formatResult(preview)}`;
        } else {
          formulaPreview.textContent = '';
        }
      } catch (e) {
        formulaPreview.textContent = '';
      }
    } else {
      formulaPreview.textContent = '';
    }

    // Memory status chip
    if (memoryValue !== 0) {
      memIndicator.classList.remove('hidden');
    } else {
      memIndicator.classList.add('hidden');
    }
  }

  // Token Insertion
  function insertToken(token) {
    if (justEvaluated) {
      const isOperator = ['+', '−', '×', '÷', '%', '^'].includes(token);
      if (isOperator) {
        currentExpression = (lastResult !== null ? lastResult.toString() : '0') + token;
      } else {
        currentExpression = token;
      }
      justEvaluated = false;
    } else {
      if (currentExpression === '0' && !isNaN(token)) {
        currentExpression = token;
      } else {
        currentExpression += token;
      }
    }
    updateDisplay();
  }

  // Backspace (deletes multi-character tokens like 'sin(' in one tap)
  function deleteLastToken() {
    if (justEvaluated) {
      currentExpression = '';
      justEvaluated = false;
      updateDisplay();
      return;
    }

    const multiCharTokens = [
      'asin(', 'acos(', 'atan(', 'sin(', 'cos(', 'tan(',
      'log(', 'ln(', 'sqrt(', 'cbrt(', 'abs(', '10^(', 'e^('
    ];

    for (const t of multiCharTokens) {
      if (currentExpression.endsWith(t)) {
        currentExpression = currentExpression.slice(0, -t.length);
        updateDisplay();
        return;
      }
    }

    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
  }

  // Clear All
  function clearAll() {
    currentExpression = '';
    prevExpressionDisplay.textContent = '';
    formulaPreview.textContent = '';
    justEvaluated = false;
    updateDisplay();
  }

  // Positive/Negative Toggle (±)
  function toggleNegate() {
    if (!currentExpression || currentExpression === '0') {
      currentExpression = '-';
      updateDisplay();
      return;
    }

    const match = currentExpression.match(/(-?\d+(\.\d+)?)$/);
    if (match) {
      const numStr = match[0];
      const startIdx = match.index;
      if (numStr.startsWith('-')) {
        currentExpression = currentExpression.slice(0, startIdx) + numStr.slice(1);
      } else {
        currentExpression = currentExpression.slice(0, startIdx) + '-' + numStr;
      }
    } else {
      currentExpression += '-';
    }
    updateDisplay();
  }

  // Execute Calculation (=)
  function computeResult() {
    if (!currentExpression.trim()) return;

    try {
      const rawResult = evaluateExpression(currentExpression, isRad);
      const formatted = formatResult(rawResult);

      if (formatted === 'Error') {
        prevExpressionDisplay.textContent = currentExpression + ' =';
        mainDisplay.value = 'Error';
        justEvaluated = true;
        return;
      }

      addHistoryItem(currentExpression, formatted);

      prevExpressionDisplay.textContent = currentExpression + ' =';
      ans = typeof rawResult === 'number' && isFinite(rawResult) ? rawResult : 0;
      lastResult = formatted;
      currentExpression = formatted;
      justEvaluated = true;
      updateDisplay();
    } catch (err) {
      prevExpressionDisplay.textContent = currentExpression + ' =';
      mainDisplay.value = 'Syntax Error';
      justEvaluated = true;
    }
  }

  // History System
  function loadHistory() {
    try {
      const saved = localStorage.getItem('scicalc_pro_history');
      if (saved) history = JSON.parse(saved);
    } catch (e) {
      history = [];
    }
    renderHistory();
  }

  function saveHistory() {
    try {
      localStorage.setItem('scicalc_pro_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  }

  function addHistoryItem(expr, res) {
    const item = {
      id: Date.now(),
      expr: expr,
      res: res,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    history.unshift(item);
    if (history.length > 50) history.pop();
    saveHistory();
    renderHistory();
  }

  function renderHistory() {
    historyBadge.textContent = history.length;
    if (history.length === 0) {
      historyList.innerHTML = '<div class="empty-history-msg">No calculations yet.</div>';
      return;
    }

    historyList.innerHTML = history.map(item => `
      <div class="history-card" data-res="${encodeURIComponent(item.res)}">
        <div class="history-card-header">
          <span>Calculation</span>
          <span>${item.time}</span>
        </div>
        <div class="history-card-expr">${item.expr}</div>
        <div class="history-card-result">= ${item.res}</div>
      </div>
    `).join('');

    historyList.querySelectorAll('.history-card').forEach(card => {
      card.addEventListener('click', () => {
        const recalledResult = decodeURIComponent(card.getAttribute('data-res'));
        currentExpression = recalledResult;
        justEvaluated = true;
        updateDisplay();
        toggleHistoryDrawer(false);
      });
    });
  }

  function clearHistory() {
    history = [];
    saveHistory();
    renderHistory();
  }

  function toggleHistoryDrawer(open) {
    const isOpen = open !== undefined ? open : !historyDrawer.classList.contains('open');
    if (isOpen) {
      historyDrawer.classList.add('open');
      drawerOverlay.classList.add('active');
    } else {
      historyDrawer.classList.remove('open');
      drawerOverlay.classList.remove('active');
    }
  }

  // Memory Functions
  function handleMemory(action) {
    let currentVal = 0;
    try {
      const val = evaluateExpression(currentExpression || '0', isRad);
      currentVal = (typeof val === 'number' && isFinite(val)) ? val : 0;
    } catch (e) {
      currentVal = 0;
    }

    switch (action) {
      case 'mc':
        memoryValue = 0;
        break;
      case 'mr':
        insertToken(formatResult(memoryValue));
        break;
      case 'm-add':
        memoryValue += currentVal;
        justEvaluated = true;
        break;
      case 'm-sub':
        memoryValue -= currentVal;
        justEvaluated = true;
        break;
      case 'ms':
        memoryValue = currentVal;
        justEvaluated = true;
        break;
    }
    updateDisplay();
  }

  // Keypad Event Delegation
  document.querySelector('.keypad').addEventListener('click', (e) => {
    const key = e.target.closest('.key');
    if (!key) return;

    const action = key.getAttribute('data-action');
    const insertNormal = key.getAttribute('data-insert');
    const insertAlt = key.getAttribute('data-alt-insert');

    if (insertNormal !== null) {
      const token = (isShift && insertAlt) ? insertAlt : insertNormal;
      insertToken(token);
      return;
    }

    if (action) {
      switch (action) {
        case 'clear':
          clearAll();
          break;
        case 'del':
          deleteLastToken();
          break;
        case 'equals':
          computeResult();
          break;
        case 'negate':
          toggleNegate();
          break;
        case 'fact':
          insertToken('!');
          break;
        case 'reciprocal':
          if (currentExpression && !justEvaluated) {
            currentExpression = `(1/(${currentExpression}))`;
          } else {
            insertToken('1/(');
          }
          updateDisplay();
          break;
        case 'ans':
          insertToken('ANS');
          break;
      }
    }
  });

  // Memory Bar Listeners
  document.querySelector('.memory-bar').addEventListener('click', (e) => {
    const btn = e.target.closest('.mem-btn');
    if (!btn) return;
    handleMemory(btn.getAttribute('data-action'));
  });

  // Angle Mode (DEG/RAD)
  angleModeBtn.addEventListener('click', () => {
    isRad = !isRad;
    angleModeBtn.textContent = isRad ? 'RAD' : 'DEG';
    angleModeBtn.classList.toggle('active', isRad);
    updateDisplay();
  });

  // 2nd / Shift Mode
  shiftModeBtn.addEventListener('click', () => {
    isShift = !isShift;
    shiftModeBtn.classList.toggle('active', isShift);
    document.body.classList.toggle('shift-active', isShift);
  });

  // Dark/Light Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    themeToggleBtn.querySelector('.theme-icon').textContent = nextTheme === 'light' ? '☀️' : '🌙';
    localStorage.setItem('scicalc_theme', nextTheme);
  });

  const savedTheme = localStorage.getItem('scicalc_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggleBtn.querySelector('.theme-icon').textContent = savedTheme === 'light' ? '☀️' : '🌙';
  }

  // History Drawer Listeners
  historyToggleBtn.addEventListener('click', () => toggleHistoryDrawer());
  closeHistoryBtn.addEventListener('click', () => toggleHistoryDrawer(false));
  clearHistoryBtn.addEventListener('click', clearHistory);
  drawerOverlay.addEventListener('click', () => toggleHistoryDrawer(false));

  // Physical Keyboard Support
  window.addEventListener('keydown', (e) => {
    if (['TEXTAREA', 'INPUT'].includes(document.activeElement.tagName) && document.activeElement !== mainDisplay) return;

    const key = e.key;

    if (!isNaN(key) && key !== ' ') {
      insertToken(key);
      e.preventDefault();
      return;
    }

    switch (key) {
      case '+':
      case '(':
      case ')':
      case '%':
        insertToken(key);
        e.preventDefault();
        break;
      case '-':
        insertToken('−');
        e.preventDefault();
        break;
      case '*':
        insertToken('×');
        e.preventDefault();
        break;
      case '/':
        insertToken('÷');
        e.preventDefault();
        break;
      case '^':
        insertToken('^(');
        e.preventDefault();
        break;
      case '.':
        insertToken('.');
        e.preventDefault();
        break;
      case '!':
        insertToken('!');
        e.preventDefault();
        break;
      case 'Enter':
      case '=':
        computeResult();
        e.preventDefault();
        break;
      case 'Backspace':
        deleteLastToken();
        e.preventDefault();
        break;
      case 'Escape':
        clearAll();
        e.preventDefault();
        break;
      case 's':
        insertToken('sin(');
        e.preventDefault();
        break;
      case 'c':
        insertToken('cos(');
        e.preventDefault();
        break;
      case 't':
        insertToken('tan(');
        e.preventDefault();
        break;
      case 'l':
        insertToken('log(');
        e.preventDefault();
        break;
      case 'n':
        insertToken('ln(');
        e.preventDefault();
        break;
      case 'p':
        insertToken('π');
        e.preventDefault();
        break;
      case 'e':
        insertToken('e');
        e.preventDefault();
        break;
      case 'r':
        insertToken('√(');
        e.preventDefault();
        break;
    }
  });

  // Initialization
  loadHistory();
  updateDisplay();
})();