/* ProntUp Remesas – comparador de costos de envío (EE. UU. → Centroamérica y México).
   Datos verificados el 29 sep 2026. Para actualizar precios, edita PROVIDERS más abajo. */
(function () {
  'use strict';

  var STRINGS = {
    es: {
      tag: 'Remesas', title1: 'Envía más.', title2: 'Paga menos.',
      sub: 'Compara lo que de verdad cuesta enviar dinero a tu familia: comisión y tipo de cambio, juntos.',
      qCountry: '¿A dónde envías?', qAmount: '¿Cuánto envías?', qFund: '¿Cómo pagas?', qRecv: '¿Cómo recibe tu familia?', qCur: 'Recibe en',
      fundBank: 'Cuenta o tarjeta', fundCash: 'Efectivo', recvBank: 'Cuenta bancaria', recvCash: 'Retiro en efectivo',
      curLocal: 'Moneda local', curUsd: 'Dólares (USD)',
      resultsTitle: 'Opciones para enviar {amt} a {country}',
      sortedBy: 'Ordenado por costo total: comisión + tipo de cambio.',
      best: 'Más barato', bestConfirmed: 'Mejor precio confirmado', pending: 'Por confirmar',
      totalLabel: 'Costo total', feeLabel: 'Comisión', fromLabel: 'Desde',
      fxCost: 'tipo de cambio', noMargin: 'sin margen de tipo de cambio', fxUnmeasured: 'margen de tipo de cambio aún sin medir',
      quote: 'Cotiza en su sitio', onlyAt1000: 'Tarifa publicada solo para $1,000. Cotiza tu monto en su sitio.',
      cashTax: 'incluye 1% de impuesto federal',
      verified: 'Verificado en {site}, 29 sep 2026', wbFx: ' · tipo de cambio: Banco Mundial, ago 2025',
      bank: 'Depósito a cuenta', cash: 'Retiro en efectivo', go: 'Ir a {name}',
      cashBanner: 'Pagar en efectivo suma 1% de impuesto federal de EE. UU. Con cuenta bancaria o tarjeta no pagas ese impuesto.',
      cashEmpty: 'Las opciones más baratas se pagan con cuenta o tarjeta. Para pagar en efectivo, cotiza en las agencias de abajo.',
      noOptions: 'Todavía no tenemos precios verificados para esta combinación. Cotiza con los proveedores de abajo.',
      hnCash: 'En Honduras, el retiro en efectivo siempre se paga en lempiras. Cambia a "Moneda local" para ver opciones.',
      hnUsd: 'En Honduras, los dólares solo se depositan en una cuenta en dólares a nombre de quien recibe.',
      others: 'También disponibles · precio por confirmar',
      othersNote: 'Operan en este país. Estamos verificando sus precios.',
      eduTag: 'Guía', eduTitle: '¿Vale la pena dejar Western Union?',
      eduBody: 'Si tu familia recibe en cuenta bancaria, casi siempre sí. Si retira en efectivo en una agencia cercana, depende. Te explicamos cuándo conviene cambiar.',
      eduCta: 'Leer la guía',
      guideTitle: '¿Cuándo conviene cambiar de servicio?',
      guide: [
        ['Mira el costo total, no solo la comisión.', 'Muchos servicios cobran poca comisión pero te dan un tipo de cambio peor. En Guatemala, Honduras, México y Costa Rica, esa diferencia suele costar más que la comisión.'],
        ['Si tu familia tiene cuenta bancaria, casi siempre ahorras.', 'Los depósitos a cuenta de servicios digitales suelen salir más baratos que el retiro en agencia.'],
        ['Si retiran en efectivo, compara antes de cambiar.', 'Lo importante es que haya un punto de retiro cerca y seguro. Un ahorro de un dólar no vale un viaje largo.'],
        ['Paga con cuenta o tarjeta.', 'Desde enero de 2026, pagar un envío en efectivo en EE. UU. suma 1% de impuesto federal. Con cuenta bancaria o tarjeta no lo pagas.'],
        ['Haz un envío pequeño de prueba.', 'Antes de mover una cantidad grande con un servicio nuevo, prueba con poco y confirma que llegó bien.']
      ],
      disclosure: 'Podemos ganar una comisión si usas nuestros enlaces. Esto no cambia tu precio ni el orden de los resultados.',
      updated: 'Cada precio muestra la fecha en que lo verificamos. Las promociones para clientes nuevos no se incluyen. Confirma siempre el monto final en el sitio del proveedor.',
      notAdvice: 'Información general, no asesoría financiera.',
      privacy: 'Privacidad',
      names: { SV: 'El Salvador', GT: 'Guatemala', HN: 'Honduras', MX: 'México', NI: 'Nicaragua', CR: 'Costa Rica' },
      langAria: 'Cambiar idioma a'
    },
    en: {
      tag: 'Remittances', title1: 'Send more.', title2: 'Pay less.',
      sub: 'Compare what it really costs to send money home: fee and exchange rate, together.',
      qCountry: 'Where are you sending?', qAmount: 'How much?', qFund: 'How do you pay?', qRecv: 'How does your family receive it?', qCur: 'Receive in',
      fundBank: 'Bank or card', fundCash: 'Cash', recvBank: 'Bank account', recvCash: 'Cash pickup',
      curLocal: 'Local currency', curUsd: 'US dollars',
      resultsTitle: 'Options to send {amt} to {country}',
      sortedBy: 'Sorted by total cost: fee + exchange rate.',
      best: 'Cheapest', bestConfirmed: 'Best confirmed price', pending: 'To be confirmed',
      totalLabel: 'Total cost', feeLabel: 'Fee', fromLabel: 'From',
      fxCost: 'exchange rate', noMargin: 'no exchange-rate markup', fxUnmeasured: 'exchange-rate markup not yet measured',
      quote: 'Get a quote on their site', onlyAt1000: 'Fee published for $1,000 only. Quote your amount on their site.',
      cashTax: 'includes 1% federal tax',
      verified: 'Verified on {site}, Sep 29, 2026', wbFx: ' · exchange rate: World Bank, Aug 2025',
      bank: 'Bank deposit', cash: 'Cash pickup', go: 'Go to {name}',
      cashBanner: 'Paying in cash adds a 1% US federal tax. Pay from a bank account or card and you skip it.',
      cashEmpty: 'The cheapest options require a bank account or card. To pay in cash, get quotes from the agencies below.',
      noOptions: "We don't have verified prices for this combination yet. Get quotes from the providers below.",
      hnCash: 'In Honduras, cash pickup is always paid in lempiras. Switch to "Local currency" to see options.',
      hnUsd: "In Honduras, dollars can only be deposited into a USD account in the recipient's name.",
      others: 'Also available · price being confirmed',
      othersNote: "They operate in this country. We're verifying their prices.",
      eduTag: 'Guide', eduTitle: 'Is it worth leaving Western Union?',
      eduBody: "If your family receives into a bank account, almost always. If they pick up cash nearby, it depends. Here's when switching pays off.",
      eduCta: 'Read the guide',
      guideTitle: 'When is it worth switching?',
      guide: [
        ['Look at the total cost, not just the fee.', 'Many services charge a small fee but give you a worse exchange rate. In Guatemala, Honduras, Mexico and Costa Rica, that gap often costs more than the fee.'],
        ['If your family has a bank account, you almost always save.', 'Bank deposits through digital services are usually cheaper than picking up cash at an agent.'],
        ['If they pick up cash, compare before switching.', 'What matters most is a pickup point that is close and safe. Saving a dollar is not worth a long trip.'],
        ['Pay from a bank account or card.', 'Since January 2026, paying for a transfer in cash in the US adds a 1% federal tax. Bank accounts and cards are exempt.'],
        ['Send a small test transfer first.', 'Before moving a large amount with a new service, try a small one and confirm it arrived.']
      ],
      disclosure: "We may earn a commission when you use our links. It doesn't change your price or the order of results.",
      updated: "Each price shows the date we verified it. New-customer promotions are not included. Always confirm the final amount on the provider's site.",
      notAdvice: 'General information, not financial advice.',
      privacy: 'Privacy',
      names: { SV: 'El Salvador', GT: 'Guatemala', HN: 'Honduras', MX: 'Mexico', NI: 'Nicaragua', CR: 'Costa Rica' },
      langAria: 'Switch language to'
    }
  };

  // Fee data. fees = [$100, $500, $1,000, $2,000]; flat = same fee at every amount; m = FX margin (null = not measured).
  var R = 'https://www.remitly.com', W = 'https://wise.com', F = 'https://www.felixpago.com';
  var PROVIDERS = {
    SV: { code: 'USD', usdOption: false, providers: [
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'bank', cur: 'any', fees: [5.21, 7.49, 10.99, 17.99], m: 0 },
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'cash', cur: 'any', fees: [6.21, 8.49, 11.99, 18.99], m: 0 },
      { name: 'Wise', site: 'Wise', url: W, recv: 'bank', cur: 'any', fees: [null, null, 4.61, null], m: 0, only1000: true }
    ], others: ['MoneyGram', 'Western Union', 'Intermex', 'Viamericas', 'Ria', 'Xoom', 'Pangea', 'Vigo'] },
    GT: { code: 'GTQ', usdOption: true, providers: [
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'bank', cur: 'local', flat: 1.99, m: 0.0216, wb: true },
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'cash', cur: 'local', flat: 2.99, m: 0.0216, wb: true },
      { name: 'Wise', site: 'Wise', url: W, recv: 'bank', cur: 'local', fees: [null, null, 36.04, null], m: 0, only1000: true },
      { name: 'Félix Pago', site: 'Félix Pago', url: F, recv: 'bank', cur: 'local', flat: 2.99, m: null },
      { name: 'Félix Pago', site: 'Félix Pago', url: F, recv: 'cash', cur: 'local', flat: 4.98, m: null },
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'bank', cur: 'usd', fees: [4.99, 8.99, 13.99, 23.99], m: 0 }
    ], others: ['MoneyGram', 'Western Union', 'Ria', 'Xoom', 'Intermex', 'Vigo', 'Pangea'] },
    HN: { code: 'HNL', usdOption: true, providers: [
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'bank', cur: 'local', fees: [4.09, 8.49, 13.99, 24.99], m: null },
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'cash', cur: 'local', fees: [5.34, 10.74, 17.49, 30.99], m: null },
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'bank', cur: 'usd', fees: [4.09, 8.49, 13.99, 24.99], m: 0 }
    ], others: ['Ria'] },
    MX: { code: 'MXN', usdOption: false, providers: [
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'bank', cur: 'any', fees: [1.99, 0.99, 0.99, 0.99], m: null },
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'cash', cur: 'any', fees: [3.99, 2.99, 2.99, 2.99], m: null },
      { name: 'Wise', site: 'Wise', url: W, recv: 'bank', cur: 'any', fees: [null, null, 7.67, null], m: 0, only1000: true },
      { name: 'Finabien Paisano', site: 'gob.mx/finabien', url: 'https://www.gob.mx/finabien', recv: 'bank', cur: 'any', flat: 2.99, m: null },
      { name: 'Walmart2Walmart', site: 'Walmart', url: 'https://www.walmart.com/cp/send-money-to-mexico/6148944', recv: 'cash', cur: 'any', flat: 2.5, m: null, from: true, cashOK: true }
    ], others: ['Ria', 'MoneyGram', 'Western Union', 'Xoom', 'Intermex', 'Viamericas', 'Vigo'] },
    NI: { code: 'USD', usdOption: false, providers: [
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'bank', cur: 'any', fees: [5.09, 9.24, 14.49, 24.99], m: 0 },
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'cash', cur: 'any', fees: [5.09, 9.49, 14.99, 25.99], m: 0 }
    ], others: [] },
    CR: { code: 'CRC', usdOption: true, providers: [
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'bank', cur: 'local', flat: 3.99, m: null },
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'cash', cur: 'local', flat: 3.99, m: null },
      { name: 'Wise', site: 'Wise', url: W, recv: 'bank', cur: 'local', fees: [null, null, 20.57, null], m: 0, only1000: true },
      { name: 'Félix Pago', site: 'Félix Pago', url: F, recv: 'bank', cur: 'local', flat: 2.99, m: null },
      { name: 'Félix Pago', site: 'Félix Pago', url: F, recv: 'cash', cur: 'local', flat: 4.98, m: null },
      { name: 'Remitly', site: 'Remitly', url: R, recv: 'bank', cur: 'usd', fees: [2.99, 4.99, 8.99, 9.99], m: 0 }
    ], others: ['Xoom', 'Western Union', 'Ria', 'MoneyGram', 'Boss Money', 'WorldRemit'] }
  };

  var AMOUNTS = [100, 500, 1000, 2000];
  var COUNTRIES = ['SV', 'GT', 'HN', 'MX', 'NI', 'CR'];

  function money(x) { return '$' + x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function whole(x) { return '$' + x.toLocaleString('en-US'); }

  // Pure: state → view model. Kept free of the DOM so it can be tested.
  function compute(s) {
    var T = STRINGS[s.lang];
    var cty = PROVIDERS[s.country];
    var idx = AMOUNTS.indexOf(s.amount);
    var cur = cty.usdOption ? s.cur : 'any';
    var hnCashUsd = s.country === 'HN' && s.recv === 'cash' && cur === 'usd';

    var list = cty.providers.filter(function (p) { return p.recv === s.recv && (p.cur === 'any' || p.cur === cur); });
    if (s.fund === 'cash') list = list.filter(function (p) { return p.cashOK; });
    if (hnCashUsd) list = [];

    var rows = list.map(function (p) {
      var fee = p.flat != null ? p.flat : p.fees[idx];
      var fx = null, total = null;
      if (fee != null && p.m != null) { fx = s.amount * p.m; total = fee + fx; }
      var tax = s.fund === 'cash' ? s.amount * 0.01 : 0;
      if (total != null) total += tax;
      var tier = total != null ? 0 : fee != null ? 1 : 2;
      return { p: p, fee: fee, fx: fx, total: total, tier: tier, tax: tax, key: total != null ? total : fee != null ? fee : 0 };
    }).sort(function (a, b) { return a.tier - b.tier || a.key - b.key; });

    var allPriced = rows.every(function (x) { return x.tier === 0; });
    var results = rows.map(function (r, i) {
      var p = r.p, from = p.from ? T.fromLabel + ' ' : '', totalText, breakdown;
      if (r.tier === 0) {
        totalText = from + money(r.total);
        breakdown = T.feeLabel + ' ' + money(r.fee) + ' · ' +
          (p.m > 0 ? T.fxCost + ' ' + money(r.fx) + ' (' + (p.m * 100).toFixed(2) + '%)' : T.noMargin) +
          (r.tax ? ' · ' + T.cashTax : '');
      } else if (r.tier === 1) {
        totalText = T.pending;
        breakdown = T.feeLabel + ' ' + from.toLowerCase() + money(r.fee) + ' · ' + T.fxUnmeasured;
      } else {
        totalText = T.quote;
        breakdown = p.only1000 ? T.onlyAt1000 : T.quote;
      }
      var isBest = i === 0 && r.tier === 0;
      return {
        rank: i + 1, name: p.name, url: p.url, isBest: isBest, pending: r.tier !== 0,
        bestLabel: allPriced ? T.best : T.bestConfirmed,
        meta: (p.recv === 'bank' ? T.bank : T.cash) + ' · ' + (cur === 'usd' || cty.code === 'USD' ? 'USD' : cty.code),
        totalText: totalText, breakdown: breakdown,
        src: T.verified.replace('{site}', p.site) + (p.wb ? T.wbFx : ''),
        cta: T.go.replace('{name}', p.name)
      };
    });

    var note = hnCashUsd ? T.hnCash : (s.country === 'HN' && cur === 'usd' ? T.hnUsd : '');
    var empty = !hnCashUsd && results.length === 0 ? (s.fund === 'cash' ? T.cashEmpty : T.noOptions) : '';
    return {
      T: T, cty: cty, results: results, note: note, empty: empty,
      title: T.resultsTitle.replace('{amt}', whole(s.amount)).replace('{country}', T.names[s.country])
    };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { compute: compute, STRINGS: STRINGS, PROVIDERS: PROVIDERS, AMOUNTS: AMOUNTS, COUNTRIES: COUNTRIES };
  }
  if (typeof document === 'undefined') return;

  // ---------- DOM ----------
  var state = { lang: 'es', country: 'SV', amount: 500, fund: 'bank', recv: 'bank', cur: 'local' };
  try { var saved = localStorage.getItem('prontup-lang'); if (saved === 'en' || saved === 'es') state.lang = saved; } catch (e) {}

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function $(id) { return document.getElementById(id); }

  function choices(container, items, current, onPick) {
    container.textContent = '';
    items.forEach(function (it) {
      var b = el('button', 'chip', it[1]);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(current === it[0]));
      b.addEventListener('click', function () { onPick(it[0]); });
      container.appendChild(b);
    });
  }

  function set(patch) { for (var k in patch) state[k] = patch[k]; render(); }

  function render() {
    var v = compute(state), T = v.T;
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-t]').forEach(function (n) { n.textContent = T[n.getAttribute('data-t')]; });

    choices($('langs'), [['es', 'ES'], ['en', 'EN']], state.lang, function (k) {
      try { localStorage.setItem('prontup-lang', k); } catch (e) {}
      set({ lang: k });
    });
    Array.prototype.forEach.call($('langs').children, function (b, i) {
      b.setAttribute('aria-label', T.langAria + ' ' + (i === 0 ? 'español' : 'English'));
    });
    choices($('countries'), COUNTRIES.map(function (k) { return [k, T.names[k]]; }), state.country, function (k) { set({ country: k, cur: 'local' }); });
    choices($('amounts'), AMOUNTS.map(function (a) { return [a, whole(a)]; }), state.amount, function (a) { set({ amount: a }); });
    choices($('funds'), [['bank', T.fundBank], ['cash', T.fundCash]], state.fund, function (k) { set({ fund: k }); });
    choices($('recvs'), [['bank', T.recvBank], ['cash', T.recvCash]], state.recv, function (k) { set({ recv: k }); });
    $('curBlock').hidden = !v.cty.usdOption;
    choices($('curs'), [['local', T.curLocal + ' (' + v.cty.code + ')'], ['usd', T.curUsd]], state.cur, function (k) { set({ cur: k }); });
    $('amountText').textContent = whole(state.amount);

    $('cashBanner').hidden = state.fund !== 'cash';
    $('note').hidden = !v.note; $('note').textContent = v.note;
    $('resultsTitle').textContent = v.title;

    var box = $('results'); box.textContent = '';
    v.results.forEach(function (r) {
      var card = el('article', 'card' + (r.isBest ? ' best' : ''));
      var head = el('div', 'card-head');
      var who = el('div', 'who');
      who.appendChild(el('span', 'rank', String(r.rank)));
      var nm = el('div', 'names'); nm.appendChild(el('span', 'pname', r.name)); nm.appendChild(el('span', 'meta', r.meta));
      who.appendChild(nm); head.appendChild(who);
      if (r.isBest) head.appendChild(el('span', 'badge', r.bestLabel));
      card.appendChild(head);
      var tot = el('div', 'total');
      tot.appendChild(el('span', 'total-label', T.totalLabel));
      tot.appendChild(el('span', 'total-value' + (r.pending ? ' pending' : ''), r.totalText));
      card.appendChild(tot);
      card.appendChild(el('p', 'breakdown', r.breakdown));
      card.appendChild(el('p', 'src', r.src));
      var a = el('a', 'cta', r.cta);
      a.href = r.url; a.target = '_blank'; a.rel = 'noopener sponsored';
      card.appendChild(a);
      box.appendChild(card);
    });

    $('empty').hidden = !v.empty; $('empty').textContent = v.empty;
    var others = v.cty.others;
    $('othersBlock').hidden = others.length === 0;
    var ol = $('others'); ol.textContent = '';
    others.forEach(function (n) { ol.appendChild(el('li', 'pill', n)); });

    var g = $('guideList'); g.textContent = '';
    T.guide.forEach(function (item) {
      var li = el('li');
      li.appendChild(el('strong', null, item[0] + ' '));
      li.appendChild(document.createTextNode(item[1]));
      g.appendChild(li);
    });
  }

  render();
})();
