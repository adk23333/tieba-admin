(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver(r => {
    for (const o of r) if (o.type === "childList") for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && s(i)
  }).observe(document, {childList: !0, subtree: !0});

  function n(r) {
    const o = {};
    return r.integrity && (o.integrity = r.integrity), r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy), r.crossOrigin === "use-credentials" ? o.credentials = "include" : r.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
  }

  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o)
  }
})();

/**
 * @vue/shared v3.4.11
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/function Ji(e, t) {
  const n = new Set(e.split(","));
  return t ? s => n.has(s.toLowerCase()) : s => n.has(s)
}

const Ie = {}, ss = [], bt = () => {
    }, Fh = () => !1,
    no = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    Xi = e => e.startsWith("onUpdate:"), De = Object.assign, Zi = (e, t) => {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1)
    }, Hh = Object.prototype.hasOwnProperty, ve = (e, t) => Hh.call(e, t), ne = Array.isArray,
    rs = e => so(e) === "[object Map]", lc = e => so(e) === "[object Set]", oe = e => typeof e == "function",
    Me = e => typeof e == "string", ms = e => typeof e == "symbol", Re = e => e !== null && typeof e == "object",
    uc = e => (Re(e) || oe(e)) && oe(e.then) && oe(e.catch), cc = Object.prototype.toString, so = e => cc.call(e),
    jh = e => so(e).slice(8, -1), fc = e => so(e) === "[object Object]",
    Qi = e => Me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Tr = Ji(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    ro = e => {
      const t = Object.create(null);
      return n => t[n] || (t[n] = e(n))
    }, Uh = /-(\w)/g, Et = ro(e => e.replace(Uh, (t, n) => n ? n.toUpperCase() : "")), zh = /\B([A-Z])/g,
    vs = ro(e => e.replace(zh, "-$1").toLowerCase()), gs = ro(e => e.charAt(0).toUpperCase() + e.slice(1)),
    Pr = ro(e => e ? `on${gs(e)}` : ""), wn = (e, t) => !Object.is(e, t), Ho = (e, t) => {
      for (let n = 0; n < e.length; n++) e[n](t)
    }, Mr = (e, t, n) => {
      Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
    }, Wh = e => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t
    }, Kh = e => {
      const t = Me(e) ? Number(e) : NaN;
      return isNaN(t) ? e : t
    };
let Xa;
const dc = () => Xa || (Xa = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function er(e) {
  if (ne(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = Me(s) ? Jh(s) : er(s);
      if (r) for (const o in r) t[o] = r[o]
    }
    return t
  } else if (Me(e) || Re(e)) return e
}

const Gh = /;(?![^(]*\))/g, qh = /:([^]+)/, Yh = /\/\*[^]*?\*\//g;

function Jh(e) {
  const t = {};
  return e.replace(Yh, "").split(Gh).forEach(n => {
    if (n) {
      const s = n.split(qh);
      s.length > 1 && (t[s[0].trim()] = s[1].trim())
    }
  }), t
}

function Cn(e) {
  let t = "";
  if (Me(e)) t = e; else if (ne(e)) for (let n = 0; n < e.length; n++) {
    const s = Cn(e[n]);
    s && (t += s + " ")
  } else if (Re(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim()
}

const Xh = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Zh = Ji(Xh);

function hc(e) {
  return !!e || e === ""
}

const Wn = e => Me(e) ? e : e == null ? "" : ne(e) || Re(e) && (e.toString === cc || !oe(e.toString)) ? JSON.stringify(e, mc, 2) : String(e),
    mc = (e, t) => t && t.__v_isRef ? mc(e, t.value) : rs(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r], o) => (n[jo(s, o) + " =>"] = r, n), {})} : lc(t) ? {[`Set(${t.size})`]: [...t.values()].map(n => jo(n))} : ms(t) ? jo(t) : Re(t) && !ne(t) && !fc(t) ? String(t) : t,
    jo = (e, t = "") => {
      var n;
      return ms(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
    };
/**
 * @vue/reactivity v3.4.11
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/let lt;

class vc {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = lt, !t && lt && (this.index = (lt.scopes || (lt.scopes = [])).push(this) - 1)
  }

  get active() {
    return this._active
  }

  run(t) {
    if (this._active) {
      const n = lt;
      try {
        return lt = this, t()
      } finally {
        lt = n
      }
    }
  }

  on() {
    lt = this
  }

  off() {
    lt = this.parent
  }

  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes) for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index)
      }
      this.parent = void 0, this._active = !1
    }
  }
}

function ea(e) {
  return new vc(e)
}

function Qh(e, t = lt) {
  t && t.active && t.effects.push(e)
}

function gc() {
  return lt
}

function oo(e) {
  lt && lt.cleanups.push(e)
}

let jn;

class ta {
  constructor(t, n, s, r) {
    this.fn = t, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 3, this._trackId = 0, this._runnings = 0, this._queryings = 0, this._depsLength = 0, Qh(this, r)
  }

  get dirty() {
    if (this._dirtyLevel === 1) {
      this._dirtyLevel = 0, this._queryings++, Kn();
      for (const t of this.deps) if (t.computed && (em(t.computed), this._dirtyLevel >= 2)) break;
      Gn(), this._queryings--
    }
    return this._dirtyLevel >= 2
  }

  set dirty(t) {
    this._dirtyLevel = t ? 3 : 0
  }

  run() {
    if (this._dirtyLevel = 0, !this.active) return this.fn();
    let t = yn, n = jn;
    try {
      return yn = !0, jn = this, this._runnings++, Za(this), this.fn()
    } finally {
      Qa(this), this._runnings--, jn = n, yn = t
    }
  }

  stop() {
    var t;
    this.active && (Za(this), Qa(this), (t = this.onStop) == null || t.call(this), this.active = !1)
  }
}

function em(e) {
  return e.value
}

function Za(e) {
  e._trackId++, e._depsLength = 0
}

function Qa(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) pc(e.deps[t], e);
    e.deps.length = e._depsLength
  }
}

function pc(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup())
}

let yn = !0, di = 0;
const yc = [];

function Kn() {
  yc.push(yn), yn = !1
}

function Gn() {
  const e = yc.pop();
  yn = e === void 0 ? !0 : e
}

function na() {
  di++
}

function sa() {
  for (di--; !di && hi.length;) hi.shift()()
}

function bc(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && pc(s, e), e.deps[e._depsLength++] = t) : e._depsLength++
  }
}

const hi = [];

function Sc(e, t, n) {
  na();
  for (const s of e.keys()) if (!(!s.allowRecurse && s._runnings) && s._dirtyLevel < t && (!s._runnings || s.allowRecurse || t !== 2)) {
    const r = s._dirtyLevel;
    s._dirtyLevel = t, r === 0 && (!s._queryings || t !== 2) && (s.trigger(), s.scheduler && hi.push(s.scheduler))
  }
  sa()
}

const _c = (e, t) => {
  const n = new Map;
  return n.cleanup = e, n.computed = t, n
}, $r = new WeakMap, Un = Symbol(""), mi = Symbol("");

function ot(e, t, n) {
  if (yn && jn) {
    let s = $r.get(e);
    s || $r.set(e, s = new Map);
    let r = s.get(n);
    r || s.set(n, r = _c(() => s.delete(n))), bc(jn, r)
  }
}

function Yt(e, t, n, s, r, o) {
  const i = $r.get(e);
  if (!i) return;
  let a = [];
  if (t === "clear") a = [...i.values()]; else if (n === "length" && ne(e)) {
    const l = Number(s);
    i.forEach((c, u) => {
      (u === "length" || !ms(u) && u >= l) && a.push(c)
    })
  } else switch (n !== void 0 && a.push(i.get(n)), t) {
    case"add":
      ne(e) ? Qi(n) && a.push(i.get("length")) : (a.push(i.get(Un)), rs(e) && a.push(i.get(mi)));
      break;
    case"delete":
      ne(e) || (a.push(i.get(Un)), rs(e) && a.push(i.get(mi)));
      break;
    case"set":
      rs(e) && a.push(i.get(Un));
      break
  }
  na();
  for (const l of a) l && Sc(l, 3);
  sa()
}

function tm(e, t) {
  var n;
  return (n = $r.get(e)) == null ? void 0 : n.get(t)
}

const nm = Ji("__proto__,__v_isRef,__isVue"),
    wc = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(ms)),
    el = sm();

function sm() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
    e[t] = function (...n) {
      const s = ie(this);
      for (let o = 0, i = this.length; o < i; o++) ot(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(ie)) : r
    }
  }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
    e[t] = function (...n) {
      Kn(), na();
      const s = ie(this)[t].apply(this, n);
      return sa(), Gn(), s
    }
  }), e
}

function rm(e) {
  const t = ie(this);
  return ot(t, "has", e), t.hasOwnProperty(e)
}

class Cc {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._shallow = n
  }

  get(t, n, s) {
    const r = this._isReadonly, o = this._shallow;
    if (n === "__v_isReactive") return !r;
    if (n === "__v_isReadonly") return r;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw") return s === (r ? o ? pm : Tc : o ? Ac : xc).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = ne(t);
    if (!r) {
      if (i && ve(el, n)) return Reflect.get(el, n, s);
      if (n === "hasOwnProperty") return rm
    }
    const a = Reflect.get(t, n, s);
    return (ms(n) ? wc.has(n) : nm(n)) || (r || ot(t, "get", n), o) ? a : Oe(a) ? i && Qi(n) ? a : a.value : Re(a) ? r ? ao(a) : ze(a) : a
  }
}

class Ec extends Cc {
  constructor(t = !1) {
    super(!1, t)
  }

  set(t, n, s, r) {
    let o = t[n];
    if (!this._shallow) {
      const l = ls(o);
      if (!Nr(s) && !ls(s) && (o = ie(o), s = ie(s)), !ne(t) && Oe(o) && !Oe(s)) return l ? !1 : (o.value = s, !0)
    }
    const i = ne(t) && Qi(n) ? Number(n) < t.length : ve(t, n), a = Reflect.set(t, n, s, r);
    return t === ie(r) && (i ? wn(s, o) && Yt(t, "set", n, s) : Yt(t, "add", n, s)), a
  }

  deleteProperty(t, n) {
    const s = ve(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Yt(t, "delete", n, void 0), r
  }

  has(t, n) {
    const s = Reflect.has(t, n);
    return (!ms(n) || !wc.has(n)) && ot(t, "has", n), s
  }

  ownKeys(t) {
    return ot(t, "iterate", ne(t) ? "length" : Un), Reflect.ownKeys(t)
  }
}

class om extends Cc {
  constructor(t = !1) {
    super(!0, t)
  }

  set(t, n) {
    return !0
  }

  deleteProperty(t, n) {
    return !0
  }
}

const im = new Ec, am = new om, lm = new Ec(!0), ra = e => e, io = e => Reflect.getPrototypeOf(e);

function mr(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = ie(e), o = ie(t);
  n || (wn(t, o) && ot(r, "get", t), ot(r, "get", o));
  const {has: i} = io(r), a = s ? ra : n ? aa : Ns;
  if (i.call(r, t)) return a(e.get(t));
  if (i.call(r, o)) return a(e.get(o));
  e !== r && e.get(t)
}

function vr(e, t = !1) {
  const n = this.__v_raw, s = ie(n), r = ie(e);
  return t || (wn(e, r) && ot(s, "has", e), ot(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r)
}

function gr(e, t = !1) {
  return e = e.__v_raw, !t && ot(ie(e), "iterate", Un), Reflect.get(e, "size", e)
}

function tl(e) {
  e = ie(e);
  const t = ie(this);
  return io(t).has.call(t, e) || (t.add(e), Yt(t, "add", e, e)), this
}

function nl(e, t) {
  t = ie(t);
  const n = ie(this), {has: s, get: r} = io(n);
  let o = s.call(n, e);
  o || (e = ie(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? wn(t, i) && Yt(n, "set", e, t) : Yt(n, "add", e, t), this
}

function sl(e) {
  const t = ie(this), {has: n, get: s} = io(t);
  let r = n.call(t, e);
  r || (e = ie(e), r = n.call(t, e)), s && s.call(t, e);
  const o = t.delete(e);
  return r && Yt(t, "delete", e, void 0), o
}

function rl() {
  const e = ie(this), t = e.size !== 0, n = e.clear();
  return t && Yt(e, "clear", void 0, void 0), n
}

function pr(e, t) {
  return function (s, r) {
    const o = this, i = o.__v_raw, a = ie(i), l = t ? ra : e ? aa : Ns;
    return !e && ot(a, "iterate", Un), i.forEach((c, u) => s.call(r, l(c), l(u), o))
  }
}

function yr(e, t, n) {
  return function (...s) {
    const r = this.__v_raw, o = ie(r), i = rs(o), a = e === "entries" || e === Symbol.iterator && i,
        l = e === "keys" && i, c = r[e](...s), u = n ? ra : t ? aa : Ns;
    return !t && ot(o, "iterate", l ? mi : Un), {
      next() {
        const {value: f, done: d} = c.next();
        return d ? {value: f, done: d} : {value: a ? [u(f[0]), u(f[1])] : u(f), done: d}
      }, [Symbol.iterator]() {
        return this
      }
    }
  }
}

function an(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this
  }
}

function um() {
  const e = {
    get(o) {
      return mr(this, o)
    }, get size() {
      return gr(this)
    }, has: vr, add: tl, set: nl, delete: sl, clear: rl, forEach: pr(!1, !1)
  }, t = {
    get(o) {
      return mr(this, o, !1, !0)
    }, get size() {
      return gr(this)
    }, has: vr, add: tl, set: nl, delete: sl, clear: rl, forEach: pr(!1, !0)
  }, n = {
    get(o) {
      return mr(this, o, !0)
    }, get size() {
      return gr(this, !0)
    }, has(o) {
      return vr.call(this, o, !0)
    }, add: an("add"), set: an("set"), delete: an("delete"), clear: an("clear"), forEach: pr(!0, !1)
  }, s = {
    get(o) {
      return mr(this, o, !0, !0)
    }, get size() {
      return gr(this, !0)
    }, has(o) {
      return vr.call(this, o, !0)
    }, add: an("add"), set: an("set"), delete: an("delete"), clear: an("clear"), forEach: pr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
    e[o] = yr(o, !1, !1), n[o] = yr(o, !0, !1), t[o] = yr(o, !1, !0), s[o] = yr(o, !0, !0)
  }), [e, n, t, s]
}

const [cm, fm, dm, hm] = um();

function oa(e, t) {
  const n = t ? e ? hm : dm : e ? fm : cm;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(ve(n, r) && r in s ? n : s, r, o)
}

const mm = {get: oa(!1, !1)}, vm = {get: oa(!1, !0)}, gm = {get: oa(!0, !1)}, xc = new WeakMap, Ac = new WeakMap,
    Tc = new WeakMap, pm = new WeakMap;

function ym(e) {
  switch (e) {
    case"Object":
    case"Array":
      return 1;
    case"Map":
    case"Set":
    case"WeakMap":
    case"WeakSet":
      return 2;
    default:
      return 0
  }
}

function bm(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ym(jh(e))
}

function ze(e) {
  return ls(e) ? e : ia(e, !1, im, mm, xc)
}

function Pc(e) {
  return ia(e, !1, lm, vm, Ac)
}

function ao(e) {
  return ia(e, !0, am, gm, Tc)
}

function ia(e, t, n, s, r) {
  if (!Re(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = r.get(e);
  if (o) return o;
  const i = bm(e);
  if (i === 0) return e;
  const a = new Proxy(e, i === 2 ? s : n);
  return r.set(e, a), a
}

function Jt(e) {
  return ls(e) ? Jt(e.__v_raw) : !!(e && e.__v_isReactive)
}

function ls(e) {
  return !!(e && e.__v_isReadonly)
}

function Nr(e) {
  return !!(e && e.__v_isShallow)
}

function Rc(e) {
  return Jt(e) || ls(e)
}

function ie(e) {
  const t = e && e.__v_raw;
  return t ? ie(t) : e
}

function lo(e) {
  return Mr(e, "__v_skip", !0), e
}

const Ns = e => Re(e) ? ze(e) : e, aa = e => Re(e) ? ao(e) : e;

class Oc {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ta(() => t(this._value), () => vi(this, 1)), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s
  }

  get value() {
    const t = ie(this);
    return kc(t), (!t._cacheable || t.effect.dirty) && wn(t._value, t._value = t.effect.run()) && vi(t, 2), t._value
  }

  set value(t) {
    this._setter(t)
  }

  get _dirty() {
    return this.effect.dirty
  }

  set _dirty(t) {
    this.effect.dirty = t
  }
}

function Sm(e, t, n = !1) {
  let s, r;
  const o = oe(e);
  return o ? (s = e, r = bt) : (s = e.get, r = e.set), new Oc(s, r, o || !r, n)
}

function kc(e) {
  yn && jn && (e = ie(e), bc(jn, e.dep || (e.dep = _c(() => e.dep = void 0, e instanceof Oc ? e : void 0))))
}

function vi(e, t = 3, n) {
  e = ie(e);
  const s = e.dep;
  s && Sc(s, t)
}

function Oe(e) {
  return !!(e && e.__v_isRef === !0)
}

function Z(e) {
  return Ic(e, !1)
}

function pe(e) {
  return Ic(e, !0)
}

function Ic(e, t) {
  return Oe(e) ? e : new _m(e, t)
}

class _m {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : ie(t), this._value = n ? t : Ns(t)
  }

  get value() {
    return kc(this), this._value
  }

  set value(t) {
    const n = this.__v_isShallow || Nr(t) || ls(t);
    t = n ? t : ie(t), wn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Ns(t), vi(this, 3))
  }
}

function be(e) {
  return Oe(e) ? e.value : e
}

const wm = {
  get: (e, t, n) => be(Reflect.get(e, t, n)), set: (e, t, n, s) => {
    const r = e[t];
    return Oe(r) && !Oe(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s)
  }
};

function Vc(e) {
  return Jt(e) ? e : new Proxy(e, wm)
}

function uo(e) {
  const t = ne(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Bc(e, n);
  return t
}

class Cm {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0
  }

  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t
  }

  set value(t) {
    this._object[this._key] = t
  }

  get dep() {
    return tm(ie(this._object), this._key)
  }
}

class Em {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0
  }

  get value() {
    return this._getter()
  }
}

function ue(e, t, n) {
  return Oe(e) ? e : oe(e) ? new Em(e) : Re(e) && arguments.length > 1 ? Bc(e, t, n) : Z(e)
}

function Bc(e, t, n) {
  const s = e[t];
  return Oe(s) ? s : new Cm(e, t, n)
}

/**
 * @vue/runtime-core v3.4.11
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/function bn(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e()
  } catch (o) {
    tr(o, t, n)
  }
  return r
}

function _t(e, t, n, s) {
  if (oe(e)) {
    const o = bn(e, t, n, s);
    return o && uc(o) && o.catch(i => {
      tr(i, t, n)
    }), o
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(_t(e[o], t, n, s));
  return r
}

function tr(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, a = `https://vuejs.org/errors/#runtime-${n}`;
    for (; o;) {
      const c = o.ec;
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, i, a) === !1) return
      }
      o = o.parent
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      bn(l, null, 10, [e, i, a]);
      return
    }
  }
  xm(e, n, r, s)
}

function xm(e, t, n, s = !0) {
  console.error(e)
}

let Ds = !1, gi = !1;
const Ze = [];
let Nt = 0;
const os = [];
let hn = null, Mn = 0;
const Lc = Promise.resolve();
let la = null;

function mt(e) {
  const t = la || Lc;
  return e ? t.then(this ? e.bind(this) : e) : t
}

function Am(e) {
  let t = Nt + 1, n = Ze.length;
  for (; t < n;) {
    const s = t + n >>> 1, r = Ze[s], o = Fs(r);
    o < e || o === e && r.pre ? t = s + 1 : n = s
  }
  return t
}

function co(e) {
  (!Ze.length || !Ze.includes(e, Ds && e.allowRecurse ? Nt + 1 : Nt)) && (e.id == null ? Ze.push(e) : Ze.splice(Am(e.id), 0, e), Mc())
}

function Mc() {
  !Ds && !gi && (gi = !0, la = Lc.then(Nc))
}

function Tm(e) {
  const t = Ze.indexOf(e);
  t > Nt && Ze.splice(t, 1)
}

function Pm(e) {
  ne(e) ? os.push(...e) : (!hn || !hn.includes(e, e.allowRecurse ? Mn + 1 : Mn)) && os.push(e), Mc()
}

function ol(e, t, n = Ds ? Nt + 1 : 0) {
  for (; n < Ze.length; n++) {
    const s = Ze[n];
    if (s && s.pre) {
      if (e && s.id !== e.uid) continue;
      Ze.splice(n, 1), n--, s()
    }
  }
}

function $c(e) {
  if (os.length) {
    const t = [...new Set(os)].sort((n, s) => Fs(n) - Fs(s));
    if (os.length = 0, hn) {
      hn.push(...t);
      return
    }
    for (hn = t, Mn = 0; Mn < hn.length; Mn++) hn[Mn]();
    hn = null, Mn = 0
  }
}

const Fs = e => e.id == null ? 1 / 0 : e.id, Rm = (e, t) => {
  const n = Fs(e) - Fs(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1
  }
  return n
};

function Nc(e) {
  gi = !1, Ds = !0, Ze.sort(Rm);
  try {
    for (Nt = 0; Nt < Ze.length; Nt++) {
      const t = Ze[Nt];
      t && t.active !== !1 && bn(t, null, 14)
    }
  } finally {
    Nt = 0, Ze.length = 0, $c(), Ds = !1, la = null, (Ze.length || os.length) && Nc()
  }
}

function Om(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Ie;
  let r = n;
  const o = t.startsWith("update:"), i = o && t.slice(7);
  if (i && i in s) {
    const u = `${i === "modelValue" ? "model" : i}Modifiers`, {number: f, trim: d} = s[u] || Ie;
    d && (r = n.map(m => Me(m) ? m.trim() : m)), f && (r = n.map(Wh))
  }
  let a, l = s[a = Pr(t)] || s[a = Pr(Et(t))];
  !l && o && (l = s[a = Pr(vs(t))]), l && _t(l, e, 6, r);
  const c = s[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {}; else if (e.emitted[a]) return;
    e.emitted[a] = !0, _t(c, e, 6, r)
  }
}

function Dc(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {}, a = !1;
  if (!oe(e)) {
    const l = c => {
      const u = Dc(c, t, !0);
      u && (a = !0, De(i, u))
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l)
  }
  return !o && !a ? (Re(e) && s.set(e, null), null) : (ne(o) ? o.forEach(l => i[l] = null) : De(i, o), Re(e) && s.set(e, i), i)
}

function fo(e, t) {
  return !e || !no(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ve(e, t[0].toLowerCase() + t.slice(1)) || ve(e, vs(t)) || ve(e, t))
}

let Ne = null, ho = null;

function Dr(e) {
  const t = Ne;
  return Ne = e, ho = e && e.type.__scopeId || null, t
}

function km(e) {
  ho = e
}

function Im() {
  ho = null
}

function ge(e, t = Ne, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && bl(-1);
    const o = Dr(t);
    let i;
    try {
      i = e(...r)
    } finally {
      Dr(o), s._d && bl(1)
    }
    return i
  };
  return s._n = !0, s._c = !0, s._d = !0, s
}

function Uo(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: a,
    attrs: l,
    emit: c,
    render: u,
    renderCache: f,
    data: d,
    setupState: m,
    ctx: h,
    inheritAttrs: g
  } = e;
  let w, S;
  const _ = Dr(e);
  try {
    if (n.shapeFlag & 4) {
      const V = r || s, R = V;
      w = $t(u.call(R, V, f, o, m, d, h)), S = l
    } else {
      const V = t;
      w = $t(V.length > 1 ? V(o, {attrs: l, slots: a, emit: c}) : V(o, null)), S = t.props ? l : Vm(l)
    }
  } catch (V) {
    Vs.length = 0, tr(V, e, 1), w = v(ht)
  }
  let T = w;
  if (S && g !== !1) {
    const V = Object.keys(S), {shapeFlag: R} = T;
    V.length && R & 7 && (i && V.some(Xi) && (S = Bm(S, i)), T = en(T, S))
  }
  return n.dirs && (T = en(T), T.dirs = T.dirs ? T.dirs.concat(n.dirs) : n.dirs), n.transition && (T.transition = n.transition), w = T, Dr(_), w
}

const Vm = e => {
  let t;
  for (const n in e) (n === "class" || n === "style" || no(n)) && ((t || (t = {}))[n] = e[n]);
  return t
}, Bm = (e, t) => {
  const n = {};
  for (const s in e) (!Xi(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n
};

function Lm(e, t, n) {
  const {props: s, children: r, component: o} = e, {props: i, children: a, patchFlag: l} = t, c = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return s ? il(s, i, c) : !!i;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const d = u[f];
        if (i[d] !== s[d] && !fo(c, d)) return !0
      }
    }
  } else return (r || a) && (!a || !a.$stable) ? !0 : s === i ? !1 : s ? i ? il(s, i, c) : !0 : !!i;
  return !1
}

function il(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !fo(n, o)) return !0
  }
  return !1
}

function Mm({vnode: e, parent: t}, n) {
  for (; t;) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e) (e = t.vnode).el = n, t = t.parent; else break
  }
}

const ua = "components", $m = "directives";

function is(e, t) {
  return ca(ua, e, !0, t) || e
}

const Fc = Symbol.for("v-ndc");

function nr(e) {
  return Me(e) ? ca(ua, e, !1) || e : e || Fc
}

function ps(e) {
  return ca($m, e)
}

function ca(e, t, n = !0, s = !1) {
  const r = Ne || je;
  if (r) {
    const o = r.type;
    if (e === ua) {
      const a = kv(o, !1);
      if (a && (a === t || a === Et(t) || a === gs(Et(t)))) return o
    }
    const i = al(r[e] || o[e], t) || al(r.appContext[e], t);
    return !i && s ? o : i
  }
}

function al(e, t) {
  return e && (e[t] || e[Et(t)] || e[gs(Et(t))])
}

const Nm = e => e.__isSuspense;

function Dm(e, t) {
  t && t.pendingBranch ? ne(e) ? t.effects.push(...e) : t.effects.push(e) : Pm(e)
}

const Fm = Symbol.for("v-scx"), Hm = () => Pe(Fm);

function sr(e, t) {
  return fa(e, null, t)
}

const br = {};

function Ee(e, t, n) {
  return fa(e, t, n)
}

function fa(e, t, {immediate: n, deep: s, flush: r, once: o, onTrack: i, onTrigger: a} = Ie) {
  if (t && o) {
    const x = t;
    t = (...B) => {
      x(...B), R()
    }
  }
  const l = je, c = x => s === !0 ? x : Dn(x, s === !1 ? 1 : void 0);
  let u, f = !1, d = !1;
  if (Oe(e) ? (u = () => e.value, f = Nr(e)) : Jt(e) ? (u = () => c(e), f = !0) : ne(e) ? (d = !0, f = e.some(x => Jt(x) || Nr(x)), u = () => e.map(x => {
    if (Oe(x)) return x.value;
    if (Jt(x)) return c(x);
    if (oe(x)) return bn(x, l, 2)
  })) : oe(e) ? t ? u = () => bn(e, l, 2) : u = () => (m && m(), _t(e, l, 3, [h])) : u = bt, t && s) {
    const x = u;
    u = () => Dn(x())
  }
  let m, h = x => {
    m = T.onStop = () => {
      bn(x, l, 4), m = T.onStop = void 0
    }
  }, g;
  if (ar) if (h = bt, t ? n && _t(t, l, 3, [u(), d ? [] : void 0, h]) : u(), r === "sync") {
    const x = Hm();
    g = x.__watcherHandles || (x.__watcherHandles = [])
  } else return bt;
  let w = d ? new Array(e.length).fill(br) : br;
  const S = () => {
    if (!(!T.active || !T.dirty)) if (t) {
      const x = T.run();
      (s || f || (d ? x.some((B, E) => wn(B, w[E])) : wn(x, w))) && (m && m(), _t(t, l, 3, [x, w === br ? void 0 : d && w[0] === br ? [] : w, h]), w = x)
    } else T.run()
  };
  S.allowRecurse = !!t;
  let _;
  r === "sync" ? _ = S : r === "post" ? _ = () => rt(S, l && l.suspense) : (S.pre = !0, l && (S.id = l.uid), _ = () => co(S));
  const T = new ta(u, bt, _), V = gc(), R = () => {
    T.stop(), V && Zi(V.effects, T)
  };
  return t ? n ? S() : w = T.run() : r === "post" ? rt(T.run.bind(T), l && l.suspense) : T.run(), g && g.push(R), R
}

function jm(e, t, n) {
  const s = this.proxy, r = Me(e) ? e.includes(".") ? Hc(s, e) : () => s[e] : e.bind(s, s);
  let o;
  oe(t) ? o = t : (o = t.handler, n = t);
  const i = ir(this), a = fa(r, o.bind(s), n);
  return i(), a
}

function Hc(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s
  }
}

function Dn(e, t, n = 0, s) {
  if (!Re(e) || e.__v_skip) return e;
  if (t && t > 0) {
    if (n >= t) return e;
    n++
  }
  if (s = s || new Set, s.has(e)) return e;
  if (s.add(e), Oe(e)) Dn(e.value, t, n, s); else if (ne(e)) for (let r = 0; r < e.length; r++) Dn(e[r], t, n, s); else if (lc(e) || rs(e)) e.forEach(r => {
    Dn(r, t, n, s)
  }); else if (fc(e)) for (const r in e) Dn(e[r], t, n, s);
  return e
}

function jt(e, t) {
  if (Ne === null) return e;
  const n = yo(Ne) || Ne.proxy, s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, a, l = Ie] = t[r];
    o && (oe(o) && (o = {mounted: o, updated: o}), o.deep && Dn(i), s.push({
      dir: o,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: a,
      modifiers: l
    }))
  }
  return e
}

function kn(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    o && (a.oldValue = o[i].value);
    let l = a.dir[s];
    l && (Kn(), _t(l, n, 8, [e.el, a, e, t]), Gn())
  }
}

const mn = Symbol("_leaveCb"), Sr = Symbol("_enterCb");

function jc() {
  const e = {isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map};
  return Ut(() => {
    e.isMounted = !0
  }), vt(() => {
    e.isUnmounting = !0
  }), e
}

const yt = [Function, Array], Uc = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: yt,
  onEnter: yt,
  onAfterEnter: yt,
  onEnterCancelled: yt,
  onBeforeLeave: yt,
  onLeave: yt,
  onAfterLeave: yt,
  onLeaveCancelled: yt,
  onBeforeAppear: yt,
  onAppear: yt,
  onAfterAppear: yt,
  onAppearCancelled: yt
}, Um = {
  name: "BaseTransition", props: Uc, setup(e, {slots: t}) {
    const n = po(), s = jc();
    let r;
    return () => {
      const o = t.default && da(t.default(), !0);
      if (!o || !o.length) return;
      let i = o[0];
      if (o.length > 1) {
        for (const g of o) if (g.type !== ht) {
          i = g;
          break
        }
      }
      const a = ie(e), {mode: l} = a;
      if (s.isLeaving) return zo(i);
      const c = ll(i);
      if (!c) return zo(i);
      const u = Hs(c, a, s, n);
      js(c, u);
      const f = n.subTree, d = f && ll(f);
      let m = !1;
      const {getTransitionKey: h} = c.type;
      if (h) {
        const g = h();
        r === void 0 ? r = g : g !== r && (r = g, m = !0)
      }
      if (d && d.type !== ht && (!$n(c, d) || m)) {
        const g = Hs(d, a, s, n);
        if (js(d, g), l === "out-in") return s.isLeaving = !0, g.afterLeave = () => {
          s.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update())
        }, zo(i);
        l === "in-out" && c.type !== ht && (g.delayLeave = (w, S, _) => {
          const T = zc(s, d);
          T[String(d.key)] = d, w[mn] = () => {
            S(), w[mn] = void 0, delete u.delayedLeave
          }, u.delayedLeave = _
        })
      }
      return i
    }
  }
}, zm = Um;

function zc(e, t) {
  const {leavingVNodes: n} = e;
  let s = n.get(t.type);
  return s || (s = Object.create(null), n.set(t.type, s)), s
}

function Hs(e, t, n, s) {
  const {
    appear: r,
    mode: o,
    persisted: i = !1,
    onBeforeEnter: a,
    onEnter: l,
    onAfterEnter: c,
    onEnterCancelled: u,
    onBeforeLeave: f,
    onLeave: d,
    onAfterLeave: m,
    onLeaveCancelled: h,
    onBeforeAppear: g,
    onAppear: w,
    onAfterAppear: S,
    onAppearCancelled: _
  } = t, T = String(e.key), V = zc(n, e), R = (E, C) => {
    E && _t(E, s, 9, C)
  }, x = (E, C) => {
    const P = C[1];
    R(E, C), ne(E) ? E.every(F => F.length <= 1) && P() : E.length <= 1 && P()
  }, B = {
    mode: o, persisted: i, beforeEnter(E) {
      let C = a;
      if (!n.isMounted) if (r) C = g || a; else return;
      E[mn] && E[mn](!0);
      const P = V[T];
      P && $n(e, P) && P.el[mn] && P.el[mn](), R(C, [E])
    }, enter(E) {
      let C = l, P = c, F = u;
      if (!n.isMounted) if (r) C = w || l, P = S || c, F = _ || u; else return;
      let M = !1;
      const z = E[Sr] = te => {
        M || (M = !0, te ? R(F, [E]) : R(P, [E]), B.delayedLeave && B.delayedLeave(), E[Sr] = void 0)
      };
      C ? x(C, [E, z]) : z()
    }, leave(E, C) {
      const P = String(e.key);
      if (E[Sr] && E[Sr](!0), n.isUnmounting) return C();
      R(f, [E]);
      let F = !1;
      const M = E[mn] = z => {
        F || (F = !0, C(), z ? R(h, [E]) : R(m, [E]), E[mn] = void 0, V[P] === e && delete V[P])
      };
      V[P] = e, d ? x(d, [E, M]) : M()
    }, clone(E) {
      return Hs(E, t, n, s)
    }
  };
  return B
}

function zo(e) {
  if (rr(e)) return e = en(e), e.children = null, e
}

function ll(e) {
  return rr(e) ? e.children ? e.children[0] : void 0 : e
}

function js(e, t) {
  e.shapeFlag & 6 && e.component ? js(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function da(e, t = !1, n) {
  let s = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === Se ? (i.patchFlag & 128 && r++, s = s.concat(da(i.children, t, a))) : (t || i.type !== ht) && s.push(a != null ? en(i, {key: a}) : i)
  }
  if (r > 1) for (let o = 0; o < s.length; o++) s[o].patchFlag = -2;
  return s
}/*! #__NO_SIDE_EFFECTS__ */
function Ke(e, t) {
  return oe(e) ? De({name: e.name}, t, {setup: e}) : e
}

const Os = e => !!e.type.__asyncLoader;/*! #__NO_SIDE_EFFECTS__ */
function Wm(e) {
  oe(e) && (e = {loader: e});
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: s,
    delay: r = 200,
    timeout: o,
    suspensible: i = !0,
    onError: a
  } = e;
  let l = null, c, u = 0;
  const f = () => (u++, l = null, d()), d = () => {
    let m;
    return l || (m = l = t().catch(h => {
      if (h = h instanceof Error ? h : new Error(String(h)), a) return new Promise((g, w) => {
        a(h, () => g(f()), () => w(h), u + 1)
      });
      throw h
    }).then(h => m !== l && l ? l : (h && (h.__esModule || h[Symbol.toStringTag] === "Module") && (h = h.default), c = h, h)))
  };
  return Ke({
    name: "AsyncComponentWrapper", __asyncLoader: d, get __asyncResolved() {
      return c
    }, setup() {
      const m = je;
      if (c) return () => Wo(c, m);
      const h = _ => {
        l = null, tr(_, m, 13, !s)
      };
      if (i && m.suspense || ar) return d().then(_ => () => Wo(_, m)).catch(_ => (h(_), () => s ? v(s, {error: _}) : null));
      const g = Z(!1), w = Z(), S = Z(!!r);
      return r && setTimeout(() => {
        S.value = !1
      }, r), o != null && setTimeout(() => {
        if (!g.value && !w.value) {
          const _ = new Error(`Async component timed out after ${o}ms.`);
          h(_), w.value = _
        }
      }, o), d().then(() => {
        g.value = !0, m.parent && rr(m.parent.vnode) && (m.parent.effect.dirty = !0, co(m.parent.update))
      }).catch(_ => {
        h(_), w.value = _
      }), () => {
        if (g.value && c) return Wo(c, m);
        if (w.value && s) return v(s, {error: w.value});
        if (n && !S.value) return v(n)
      }
    }
  })
}

function Wo(e, t) {
  const {ref: n, props: s, children: r, ce: o} = t.vnode, i = v(e, s, r);
  return i.ref = n, i.ce = o, delete t.vnode.ce, i
}

const rr = e => e.type.__isKeepAlive;

function Wc(e, t) {
  Gc(e, "a", t)
}

function Kc(e, t) {
  Gc(e, "da", t)
}

function Gc(e, t, n = je) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r;) {
      if (r.isDeactivated) return;
      r = r.parent
    }
    return e()
  });
  if (mo(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent;) rr(r.parent.vnode) && Km(s, t, n, r), r = r.parent
  }
}

function Km(e, t, n, s) {
  const r = mo(t, e, s, !0);
  Yc(() => {
    Zi(s[t], r)
  }, n)
}

function mo(e, t, n = je, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted) return;
      Kn();
      const a = ir(n), l = _t(t, n, e, i);
      return a(), Gn(), l
    });
    return s ? r.unshift(o) : r.push(o), o
  }
}

const sn = e => (t, n = je) => (!ar || e === "sp") && mo(e, (...s) => t(...s), n), vo = sn("bm"), Ut = sn("m"),
    Gm = sn("bu"), qc = sn("u"), vt = sn("bum"), Yc = sn("um"), qm = sn("sp"), Ym = sn("rtg"), Jm = sn("rtc");

function Xm(e, t = je) {
  mo("ec", e, t)
}

function Fr(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (ne(e) || Me(e)) {
    r = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++) r[i] = t(e[i], i, void 0, o && o[i])
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i])
  } else if (Re(e)) if (e[Symbol.iterator]) r = Array.from(e, (i, a) => t(i, a, void 0, o && o[a])); else {
    const i = Object.keys(e);
    r = new Array(i.length);
    for (let a = 0, l = i.length; a < l; a++) {
      const c = i[a];
      r[a] = t(e[c], c, a, o && o[a])
    }
  } else r = [];
  return n && (n[s] = r), r
}

function Zm(e, t, n = {}, s, r) {
  if (Ne.isCE || Ne.parent && Os(Ne.parent) && Ne.parent.isCE) return t !== "default" && (n.name = t), v("slot", n, s && s());
  let o = e[t];
  o && o._c && (o._d = !1), _e();
  const i = o && Jc(o(n)),
      a = We(Se, {key: n.key || i && i.key || `_${t}`}, i || (s ? s() : []), i && e._ === 1 ? 64 : -2);
  return !r && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), o && o._c && (o._d = !0), a
}

function Jc(e) {
  return e.some(t => Ws(t) ? !(t.type === ht || t.type === Se && !Jc(t.children)) : !0) ? e : null
}

function Qm(e, t) {
  const n = {};
  for (const s in e) n[t && /[A-Z]/.test(s) ? `on:${s}` : Pr(s)] = e[s];
  return n
}

const pi = e => e ? uf(e) ? yo(e) || e.proxy : pi(e.parent) : null, ks = De(Object.create(null), {
  $: e => e,
  $el: e => e.vnode.el,
  $data: e => e.data,
  $props: e => e.props,
  $attrs: e => e.attrs,
  $slots: e => e.slots,
  $refs: e => e.refs,
  $parent: e => pi(e.parent),
  $root: e => pi(e.root),
  $emit: e => e.emit,
  $options: e => ha(e),
  $forceUpdate: e => e.f || (e.f = () => {
    e.effect.dirty = !0, co(e.update)
  }),
  $nextTick: e => e.n || (e.n = mt.bind(e.proxy)),
  $watch: e => jm.bind(e)
}), Ko = (e, t) => e !== Ie && !e.__isScriptSetup && ve(e, t), ev = {
  get({_: e}, t) {
    const {ctx: n, setupState: s, data: r, props: o, accessCache: i, type: a, appContext: l} = e;
    let c;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0) switch (m) {
        case 1:
          return s[t];
        case 2:
          return r[t];
        case 4:
          return n[t];
        case 3:
          return o[t]
      } else {
        if (Ko(s, t)) return i[t] = 1, s[t];
        if (r !== Ie && ve(r, t)) return i[t] = 2, r[t];
        if ((c = e.propsOptions[0]) && ve(c, t)) return i[t] = 3, o[t];
        if (n !== Ie && ve(n, t)) return i[t] = 4, n[t];
        yi && (i[t] = 0)
      }
    }
    const u = ks[t];
    let f, d;
    if (u) return t === "$attrs" && ot(e, "get", t), u(e);
    if ((f = a.__cssModules) && (f = f[t])) return f;
    if (n !== Ie && ve(n, t)) return i[t] = 4, n[t];
    if (d = l.config.globalProperties, ve(d, t)) return d[t]
  }, set({_: e}, t, n) {
    const {data: s, setupState: r, ctx: o} = e;
    return Ko(r, t) ? (r[t] = n, !0) : s !== Ie && ve(s, t) ? (s[t] = n, !0) : ve(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0)
  }, has({_: {data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o}}, i) {
    let a;
    return !!n[i] || e !== Ie && ve(e, i) || Ko(t, i) || (a = o[0]) && ve(a, i) || ve(s, i) || ve(ks, i) || ve(r.config.globalProperties, i)
  }, defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ve(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
  }
};

function ul(e) {
  return ne(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
}

let yi = !0;

function tv(e) {
  const t = ha(e), n = e.proxy, s = e.ctx;
  yi = !1, t.beforeCreate && cl(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: a,
    provide: l,
    inject: c,
    created: u,
    beforeMount: f,
    mounted: d,
    beforeUpdate: m,
    updated: h,
    activated: g,
    deactivated: w,
    beforeDestroy: S,
    beforeUnmount: _,
    destroyed: T,
    unmounted: V,
    render: R,
    renderTracked: x,
    renderTriggered: B,
    errorCaptured: E,
    serverPrefetch: C,
    expose: P,
    inheritAttrs: F,
    components: M,
    directives: z,
    filters: te
  } = t;
  if (c && nv(c, s, null), i) for (const Q in i) {
    const q = i[Q];
    oe(q) && (s[Q] = q.bind(n))
  }
  if (r) {
    const Q = r.call(n, n);
    Re(Q) && (e.data = ze(Q))
  }
  if (yi = !0, o) for (const Q in o) {
    const q = o[Q], Te = oe(q) ? q.bind(n, n) : oe(q.get) ? q.get.bind(n, n) : bt,
        de = !oe(q) && oe(q.set) ? q.set.bind(n) : bt, ke = b({get: Te, set: de});
    Object.defineProperty(s, Q, {enumerable: !0, configurable: !0, get: () => ke.value, set: we => ke.value = we})
  }
  if (a) for (const Q in a) Xc(a[Q], s, n, Q);
  if (l) {
    const Q = oe(l) ? l.call(n) : l;
    Reflect.ownKeys(Q).forEach(q => {
      Ye(q, Q[q])
    })
  }
  u && cl(u, e, "c");

  function J(Q, q) {
    ne(q) ? q.forEach(Te => Q(Te.bind(n))) : q && Q(q.bind(n))
  }

  if (J(vo, f), J(Ut, d), J(Gm, m), J(qc, h), J(Wc, g), J(Kc, w), J(Xm, E), J(Jm, x), J(Ym, B), J(vt, _), J(Yc, V), J(qm, C), ne(P)) if (P.length) {
    const Q = e.exposed || (e.exposed = {});
    P.forEach(q => {
      Object.defineProperty(Q, q, {get: () => n[q], set: Te => n[q] = Te})
    })
  } else e.exposed || (e.exposed = {});
  R && e.render === bt && (e.render = R), F != null && (e.inheritAttrs = F), M && (e.components = M), z && (e.directives = z)
}

function nv(e, t, n = bt) {
  ne(e) && (e = bi(e));
  for (const s in e) {
    const r = e[s];
    let o;
    Re(r) ? "default" in r ? o = Pe(r.from || s, r.default, !0) : o = Pe(r.from || s) : o = Pe(r), Oe(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: i => o.value = i
    }) : t[s] = o
  }
}

function cl(e, t, n) {
  _t(ne(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function Xc(e, t, n, s) {
  const r = s.includes(".") ? Hc(n, s) : () => n[s];
  if (Me(e)) {
    const o = t[e];
    oe(o) && Ee(r, o)
  } else if (oe(e)) Ee(r, e.bind(n)); else if (Re(e)) if (ne(e)) e.forEach(o => Xc(o, t, n, s)); else {
    const o = oe(e.handler) ? e.handler.bind(n) : t[e.handler];
    oe(o) && Ee(r, o, e)
  }
}

function ha(e) {
  const t = e.type, {mixins: n, extends: s} = t, {
    mixins: r,
    optionsCache: o,
    config: {optionMergeStrategies: i}
  } = e.appContext, a = o.get(t);
  let l;
  return a ? l = a : !r.length && !n && !s ? l = t : (l = {}, r.length && r.forEach(c => Hr(l, c, i, !0)), Hr(l, t, i)), Re(t) && o.set(t, l), l
}

function Hr(e, t, n, s = !1) {
  const {mixins: r, extends: o} = t;
  o && Hr(e, o, n, !0), r && r.forEach(i => Hr(e, i, n, !0));
  for (const i in t) if (!(s && i === "expose")) {
    const a = sv[i] || n && n[i];
    e[i] = a ? a(e[i], t[i]) : t[i]
  }
  return e
}

const sv = {
  data: fl,
  props: dl,
  emits: dl,
  methods: Rs,
  computed: Rs,
  beforeCreate: et,
  created: et,
  beforeMount: et,
  mounted: et,
  beforeUpdate: et,
  updated: et,
  beforeDestroy: et,
  beforeUnmount: et,
  destroyed: et,
  unmounted: et,
  activated: et,
  deactivated: et,
  errorCaptured: et,
  serverPrefetch: et,
  components: Rs,
  directives: Rs,
  watch: ov,
  provide: fl,
  inject: rv
};

function fl(e, t) {
  return t ? e ? function () {
    return De(oe(e) ? e.call(this, this) : e, oe(t) ? t.call(this, this) : t)
  } : t : e
}

function rv(e, t) {
  return Rs(bi(e), bi(t))
}

function bi(e) {
  if (ne(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t
  }
  return e
}

function et(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}

function Rs(e, t) {
  return e ? De(Object.create(null), e, t) : t
}

function dl(e, t) {
  return e ? ne(e) && ne(t) ? [...new Set([...e, ...t])] : De(Object.create(null), ul(e), ul(t ?? {})) : t
}

function ov(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = De(Object.create(null), e);
  for (const s in t) n[s] = et(e[s], t[s]);
  return n
}

function Zc() {
  return {
    app: null,
    config: {
      isNativeTag: Fh,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}

let iv = 0;

function av(e, t) {
  return function (s, r = null) {
    oe(s) || (s = De({}, s)), r != null && !Re(r) && (r = null);
    const o = Zc(), i = new WeakSet;
    let a = !1;
    const l = o.app = {
      _uid: iv++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Vv,
      get config() {
        return o.config
      },
      set config(c) {
      },
      use(c, ...u) {
        return i.has(c) || (c && oe(c.install) ? (i.add(c), c.install(l, ...u)) : oe(c) && (i.add(c), c(l, ...u))), l
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), l
      },
      component(c, u) {
        return u ? (o.components[c] = u, l) : o.components[c]
      },
      directive(c, u) {
        return u ? (o.directives[c] = u, l) : o.directives[c]
      },
      mount(c, u, f) {
        if (!a) {
          const d = v(s, r);
          return d.appContext = o, f === !0 ? f = "svg" : f === !1 && (f = void 0), u && t ? t(d, c) : e(d, c, f), a = !0, l._container = c, c.__vue_app__ = l, yo(d.component) || d.component.proxy
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__)
      },
      provide(c, u) {
        return o.provides[c] = u, l
      },
      runWithContext(c) {
        Us = l;
        try {
          return c()
        } finally {
          Us = null
        }
      }
    };
    return l
  }
}

let Us = null;

function Ye(e, t) {
  if (je) {
    let n = je.provides;
    const s = je.parent && je.parent.provides;
    s === n && (n = je.provides = Object.create(s)), n[e] = t
  }
}

function Pe(e, t, n = !1) {
  const s = je || Ne;
  if (s || Us) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Us._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && oe(t) ? t.call(s && s.proxy) : t
  }
}

function lv() {
  return !!(je || Ne || Us)
}

function uv(e, t, n, s = !1) {
  const r = {}, o = {};
  Mr(o, go, 1), e.propsDefaults = Object.create(null), Qc(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? e.props = s ? r : Pc(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o
}

function cv(e, t, n, s) {
  const {props: r, attrs: o, vnode: {patchFlag: i}} = e, a = ie(r), [l] = e.propsOptions;
  let c = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let d = u[f];
        if (fo(e.emitsOptions, d)) continue;
        const m = t[d];
        if (l) if (ve(o, d)) m !== o[d] && (o[d] = m, c = !0); else {
          const h = Et(d);
          r[h] = Si(l, a, h, m, e, !1)
        } else m !== o[d] && (o[d] = m, c = !0)
      }
    }
  } else {
    Qc(e, t, r, o) && (c = !0);
    let u;
    for (const f in a) (!t || !ve(t, f) && ((u = vs(f)) === f || !ve(t, u))) && (l ? n && (n[f] !== void 0 || n[u] !== void 0) && (r[f] = Si(l, a, f, void 0, e, !0)) : delete r[f]);
    if (o !== a) for (const f in o) (!t || !ve(t, f)) && (delete o[f], c = !0)
  }
  c && Yt(e, "set", "$attrs")
}

function Qc(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, a;
  if (t) for (let l in t) {
    if (Tr(l)) continue;
    const c = t[l];
    let u;
    r && ve(r, u = Et(l)) ? !o || !o.includes(u) ? n[u] = c : (a || (a = {}))[u] = c : fo(e.emitsOptions, l) || (!(l in s) || c !== s[l]) && (s[l] = c, i = !0)
  }
  if (o) {
    const l = ie(n), c = a || Ie;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      n[f] = Si(r, l, f, c[f], e, !ve(c, f))
    }
  }
  return i
}

function Si(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const a = ve(i, "default");
    if (a && s === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && oe(l)) {
        const {propsDefaults: c} = r;
        if (n in c) s = c[n]; else {
          const u = ir(r);
          s = c[n] = l.call(null, t), u()
        }
      } else s = l
    }
    i[0] && (o && !a ? s = !1 : i[1] && (s === "" || s === vs(n)) && (s = !0))
  }
  return s
}

function ef(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r) return r;
  const o = e.props, i = {}, a = [];
  let l = !1;
  if (!oe(e)) {
    const u = f => {
      l = !0;
      const [d, m] = ef(f, t, !0);
      De(i, d), m && a.push(...m)
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
  }
  if (!o && !l) return Re(e) && s.set(e, ss), ss;
  if (ne(o)) for (let u = 0; u < o.length; u++) {
    const f = Et(o[u]);
    hl(f) && (i[f] = Ie)
  } else if (o) for (const u in o) {
    const f = Et(u);
    if (hl(f)) {
      const d = o[u], m = i[f] = ne(d) || oe(d) ? {type: d} : De({}, d);
      if (m) {
        const h = gl(Boolean, m.type), g = gl(String, m.type);
        m[0] = h > -1, m[1] = g < 0 || h < g, (h > -1 || ve(m, "default")) && a.push(f)
      }
    }
  }
  const c = [i, a];
  return Re(e) && s.set(e, c), c
}

function hl(e) {
  return e[0] !== "$"
}

function ml(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : ""
}

function vl(e, t) {
  return ml(e) === ml(t)
}

function gl(e, t) {
  return ne(t) ? t.findIndex(n => vl(n, e)) : oe(t) && vl(t, e) ? 0 : -1
}

const tf = e => e[0] === "_" || e === "$stable", ma = e => ne(e) ? e.map($t) : [$t(e)], fv = (e, t, n) => {
  if (t._n) return t;
  const s = ge((...r) => ma(t(...r)), n);
  return s._c = !1, s
}, nf = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (tf(r)) continue;
    const o = e[r];
    if (oe(o)) t[r] = fv(r, o, s); else if (o != null) {
      const i = ma(o);
      t[r] = () => i
    }
  }
}, sf = (e, t) => {
  const n = ma(t);
  e.slots.default = () => n
}, dv = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = ie(t), Mr(t, "_", n)) : nf(t, e.slots = {})
  } else e.slots = {}, t && sf(e, t);
  Mr(e.slots, go, 1)
}, hv = (e, t, n) => {
  const {vnode: s, slots: r} = e;
  let o = !0, i = Ie;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? o = !1 : (De(r, t), !n && a === 1 && delete r._) : (o = !t.$stable, nf(t, r)), i = t
  } else t && (sf(e, t), i = {default: 1});
  if (o) for (const a in r) !tf(a) && i[a] == null && delete r[a]
};

function _i(e, t, n, s, r = !1) {
  if (ne(e)) {
    e.forEach((d, m) => _i(d, t && (ne(t) ? t[m] : t), n, s, r));
    return
  }
  if (Os(s) && !r) return;
  const o = s.shapeFlag & 4 ? yo(s.component) || s.component.proxy : s.el, i = r ? null : o, {i: a, r: l} = e,
      c = t && t.r, u = a.refs === Ie ? a.refs = {} : a.refs, f = a.setupState;
  if (c != null && c !== l && (Me(c) ? (u[c] = null, ve(f, c) && (f[c] = null)) : Oe(c) && (c.value = null)), oe(l)) bn(l, a, 12, [i, u]); else {
    const d = Me(l), m = Oe(l);
    if (d || m) {
      const h = () => {
        if (e.f) {
          const g = d ? ve(f, l) ? f[l] : u[l] : l.value;
          r ? ne(g) && Zi(g, o) : ne(g) ? g.includes(o) || g.push(o) : d ? (u[l] = [o], ve(f, l) && (f[l] = u[l])) : (l.value = [o], e.k && (u[e.k] = l.value))
        } else d ? (u[l] = i, ve(f, l) && (f[l] = i)) : m && (l.value = i, e.k && (u[e.k] = i))
      };
      i ? (h.id = -1, rt(h, n)) : h()
    }
  }
}

const rt = Dm;

function mv(e) {
  return vv(e)
}

function vv(e, t) {
  const n = dc();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: a,
    createComment: l,
    setText: c,
    setElementText: u,
    parentNode: f,
    nextSibling: d,
    setScopeId: m = bt,
    insertStaticContent: h
  } = e, g = (p, y, A, L = null, k = null, D = null, U = void 0, N = null, H = !!y.dynamicChildren) => {
    if (p === y) return;
    p && !$n(p, y) && (L = O(p), we(p, k, D, !0), p = null), y.patchFlag === -2 && (H = !1, y.dynamicChildren = null);
    const {type: $, ref: K, shapeFlag: ee} = y;
    switch ($) {
      case or:
        w(p, y, A, L);
        break;
      case ht:
        S(p, y, A, L);
        break;
      case qo:
        p == null && _(y, A, L, U);
        break;
      case Se:
        M(p, y, A, L, k, D, U, N, H);
        break;
      default:
        ee & 1 ? R(p, y, A, L, k, D, U, N, H) : ee & 6 ? z(p, y, A, L, k, D, U, N, H) : (ee & 64 || ee & 128) && $.process(p, y, A, L, k, D, U, N, H, Y)
    }
    K != null && k && _i(K, p && p.ref, D, y || p, !y)
  }, w = (p, y, A, L) => {
    if (p == null) s(y.el = a(y.children), A, L); else {
      const k = y.el = p.el;
      y.children !== p.children && c(k, y.children)
    }
  }, S = (p, y, A, L) => {
    p == null ? s(y.el = l(y.children || ""), A, L) : y.el = p.el
  }, _ = (p, y, A, L) => {
    [p.el, p.anchor] = h(p.children, y, A, L, p.el, p.anchor)
  }, T = ({el: p, anchor: y}, A, L) => {
    let k;
    for (; p && p !== y;) k = d(p), s(p, A, L), p = k;
    s(y, A, L)
  }, V = ({el: p, anchor: y}) => {
    let A;
    for (; p && p !== y;) A = d(p), r(p), p = A;
    r(y)
  }, R = (p, y, A, L, k, D, U, N, H) => {
    y.type === "svg" ? U = "svg" : y.type === "math" && (U = "mathml"), p == null ? x(y, A, L, k, D, U, N, H) : C(p, y, k, D, U, N, H)
  }, x = (p, y, A, L, k, D, U, N) => {
    let H, $;
    const {props: K, shapeFlag: ee, transition: X, dirs: re} = p;
    if (H = p.el = i(p.type, D, K && K.is, K), ee & 8 ? u(H, p.children) : ee & 16 && E(p.children, H, null, L, k, Go(p, D), U, N), re && kn(p, null, L, "created"), B(H, p, p.scopeId, U, L), K) {
      for (const Ae in K) Ae !== "value" && !Tr(Ae) && o(H, Ae, null, K[Ae], D, p.children, L, k, le);
      "value" in K && o(H, "value", null, K.value, D), ($ = K.onVnodeBeforeMount) && Mt($, L, p)
    }
    re && kn(p, null, L, "beforeMount");
    const ce = gv(k, X);
    ce && X.beforeEnter(H), s(H, y, A), (($ = K && K.onVnodeMounted) || ce || re) && rt(() => {
      $ && Mt($, L, p), ce && X.enter(H), re && kn(p, null, L, "mounted")
    }, k)
  }, B = (p, y, A, L, k) => {
    if (A && m(p, A), L) for (let D = 0; D < L.length; D++) m(p, L[D]);
    if (k) {
      let D = k.subTree;
      if (y === D) {
        const U = k.vnode;
        B(p, U, U.scopeId, U.slotScopeIds, k.parent)
      }
    }
  }, E = (p, y, A, L, k, D, U, N, H = 0) => {
    for (let $ = H; $ < p.length; $++) {
      const K = p[$] = N ? vn(p[$]) : $t(p[$]);
      g(null, K, y, A, L, k, D, U, N)
    }
  }, C = (p, y, A, L, k, D, U) => {
    const N = y.el = p.el;
    let {patchFlag: H, dynamicChildren: $, dirs: K} = y;
    H |= p.patchFlag & 16;
    const ee = p.props || Ie, X = y.props || Ie;
    let re;
    if (A && In(A, !1), (re = X.onVnodeBeforeUpdate) && Mt(re, A, y, p), K && kn(y, p, A, "beforeUpdate"), A && In(A, !0), $ ? P(p.dynamicChildren, $, N, A, L, Go(y, k), D) : U || q(p, y, N, null, A, L, Go(y, k), D, !1), H > 0) {
      if (H & 16) F(N, y, ee, X, A, L, k); else if (H & 2 && ee.class !== X.class && o(N, "class", null, X.class, k), H & 4 && o(N, "style", ee.style, X.style, k), H & 8) {
        const ce = y.dynamicProps;
        for (let Ae = 0; Ae < ce.length; Ae++) {
          const Be = ce[Ae], Ue = ee[Be], xt = X[Be];
          (xt !== Ue || Be === "value") && o(N, Be, Ue, xt, k, p.children, A, L, le)
        }
      }
      H & 1 && p.children !== y.children && u(N, y.children)
    } else !U && $ == null && F(N, y, ee, X, A, L, k);
    ((re = X.onVnodeUpdated) || K) && rt(() => {
      re && Mt(re, A, y, p), K && kn(y, p, A, "updated")
    }, L)
  }, P = (p, y, A, L, k, D, U) => {
    for (let N = 0; N < y.length; N++) {
      const H = p[N], $ = y[N], K = H.el && (H.type === Se || !$n(H, $) || H.shapeFlag & 70) ? f(H.el) : A;
      g(H, $, K, null, L, k, D, U, !0)
    }
  }, F = (p, y, A, L, k, D, U) => {
    if (A !== L) {
      if (A !== Ie) for (const N in A) !Tr(N) && !(N in L) && o(p, N, A[N], null, U, y.children, k, D, le);
      for (const N in L) {
        if (Tr(N)) continue;
        const H = L[N], $ = A[N];
        H !== $ && N !== "value" && o(p, N, $, H, U, y.children, k, D, le)
      }
      "value" in L && o(p, "value", A.value, L.value, U)
    }
  }, M = (p, y, A, L, k, D, U, N, H) => {
    const $ = y.el = p ? p.el : a(""), K = y.anchor = p ? p.anchor : a("");
    let {patchFlag: ee, dynamicChildren: X, slotScopeIds: re} = y;
    re && (N = N ? N.concat(re) : re), p == null ? (s($, A, L), s(K, A, L), E(y.children || [], A, K, k, D, U, N, H)) : ee > 0 && ee & 64 && X && p.dynamicChildren ? (P(p.dynamicChildren, X, A, k, D, U, N), (y.key != null || k && y === k.subTree) && va(p, y, !0)) : q(p, y, A, K, k, D, U, N, H)
  }, z = (p, y, A, L, k, D, U, N, H) => {
    y.slotScopeIds = N, p == null ? y.shapeFlag & 512 ? k.ctx.activate(y, A, L, U, H) : te(y, A, L, k, D, U, H) : se(p, y, H)
  }, te = (p, y, A, L, k, D, U) => {
    const N = p.component = Av(p, L, k);
    if (rr(p) && (N.ctx.renderer = Y), Tv(N), N.asyncDep) {
      if (k && k.registerDep(N, J), !p.el) {
        const H = N.subTree = v(ht);
        S(null, H, y, A)
      }
    } else J(N, p, y, A, k, D, U)
  }, se = (p, y, A) => {
    const L = y.component = p.component;
    if (Lm(p, y, A)) if (L.asyncDep && !L.asyncResolved) {
      Q(L, y, A);
      return
    } else L.next = y, Tm(L.update), L.effect.dirty = !0, L.update(); else y.el = p.el, L.vnode = y
  }, J = (p, y, A, L, k, D, U) => {
    const N = () => {
      if (p.isMounted) {
        let {next: K, bu: ee, u: X, parent: re, vnode: ce} = p;
        {
          const Jn = rf(p);
          if (Jn) {
            K && (K.el = ce.el, Q(p, K, U)), Jn.asyncDep.then(() => {
              p.isUnmounted || N()
            });
            return
          }
        }
        let Ae = K, Be;
        In(p, !1), K ? (K.el = ce.el, Q(p, K, U)) : K = ce, ee && Ho(ee), (Be = K.props && K.props.onVnodeBeforeUpdate) && Mt(Be, re, K, ce), In(p, !0);
        const Ue = Uo(p), xt = p.subTree;
        p.subTree = Ue, g(xt, Ue, f(xt.el), O(xt), p, k, D), K.el = Ue.el, Ae === null && Mm(p, Ue.el), X && rt(X, k), (Be = K.props && K.props.onVnodeUpdated) && rt(() => Mt(Be, re, K, ce), k)
      } else {
        let K;
        const {el: ee, props: X} = y, {bm: re, m: ce, parent: Ae} = p, Be = Os(y);
        if (In(p, !1), re && Ho(re), !Be && (K = X && X.onVnodeBeforeMount) && Mt(K, Ae, y), In(p, !0), ee && Ve) {
          const Ue = () => {
            p.subTree = Uo(p), Ve(ee, p.subTree, p, k, null)
          };
          Be ? y.type.__asyncLoader().then(() => !p.isUnmounted && Ue()) : Ue()
        } else {
          const Ue = p.subTree = Uo(p);
          g(null, Ue, A, L, p, k, D), y.el = Ue.el
        }
        if (ce && rt(ce, k), !Be && (K = X && X.onVnodeMounted)) {
          const Ue = y;
          rt(() => Mt(K, Ae, Ue), k)
        }
        (y.shapeFlag & 256 || Ae && Os(Ae.vnode) && Ae.vnode.shapeFlag & 256) && p.a && rt(p.a, k), p.isMounted = !0, y = A = L = null
      }
    }, H = p.effect = new ta(N, bt, () => co($), p.scope), $ = p.update = () => {
      H.dirty && H.run()
    };
    $.id = p.uid, In(p, !0), $()
  }, Q = (p, y, A) => {
    y.component = p;
    const L = p.vnode.props;
    p.vnode = y, p.next = null, cv(p, y.props, L, A), hv(p, y.children, A), Kn(), ol(p), Gn()
  }, q = (p, y, A, L, k, D, U, N, H = !1) => {
    const $ = p && p.children, K = p ? p.shapeFlag : 0, ee = y.children, {patchFlag: X, shapeFlag: re} = y;
    if (X > 0) {
      if (X & 128) {
        de($, ee, A, L, k, D, U, N, H);
        return
      } else if (X & 256) {
        Te($, ee, A, L, k, D, U, N, H);
        return
      }
    }
    re & 8 ? (K & 16 && le($, k, D), ee !== $ && u(A, ee)) : K & 16 ? re & 16 ? de($, ee, A, L, k, D, U, N, H) : le($, k, D, !0) : (K & 8 && u(A, ""), re & 16 && E(ee, A, L, k, D, U, N, H))
  }, Te = (p, y, A, L, k, D, U, N, H) => {
    p = p || ss, y = y || ss;
    const $ = p.length, K = y.length, ee = Math.min($, K);
    let X;
    for (X = 0; X < ee; X++) {
      const re = y[X] = H ? vn(y[X]) : $t(y[X]);
      g(p[X], re, A, null, k, D, U, N, H)
    }
    $ > K ? le(p, k, D, !0, !1, ee) : E(y, A, L, k, D, U, N, H, ee)
  }, de = (p, y, A, L, k, D, U, N, H) => {
    let $ = 0;
    const K = y.length;
    let ee = p.length - 1, X = K - 1;
    for (; $ <= ee && $ <= X;) {
      const re = p[$], ce = y[$] = H ? vn(y[$]) : $t(y[$]);
      if ($n(re, ce)) g(re, ce, A, null, k, D, U, N, H); else break;
      $++
    }
    for (; $ <= ee && $ <= X;) {
      const re = p[ee], ce = y[X] = H ? vn(y[X]) : $t(y[X]);
      if ($n(re, ce)) g(re, ce, A, null, k, D, U, N, H); else break;
      ee--, X--
    }
    if ($ > ee) {
      if ($ <= X) {
        const re = X + 1, ce = re < K ? y[re].el : L;
        for (; $ <= X;) g(null, y[$] = H ? vn(y[$]) : $t(y[$]), A, ce, k, D, U, N, H), $++
      }
    } else if ($ > X) for (; $ <= ee;) we(p[$], k, D, !0), $++; else {
      const re = $, ce = $, Ae = new Map;
      for ($ = ce; $ <= X; $++) {
        const at = y[$] = H ? vn(y[$]) : $t(y[$]);
        at.key != null && Ae.set(at.key, $)
      }
      let Be, Ue = 0;
      const xt = X - ce + 1;
      let Jn = !1, qa = 0;
      const Es = new Array(xt);
      for ($ = 0; $ < xt; $++) Es[$] = 0;
      for ($ = re; $ <= ee; $++) {
        const at = p[$];
        if (Ue >= xt) {
          we(at, k, D, !0);
          continue
        }
        let Lt;
        if (at.key != null) Lt = Ae.get(at.key); else for (Be = ce; Be <= X; Be++) if (Es[Be - ce] === 0 && $n(at, y[Be])) {
          Lt = Be;
          break
        }
        Lt === void 0 ? we(at, k, D, !0) : (Es[Lt - ce] = $ + 1, Lt >= qa ? qa = Lt : Jn = !0, g(at, y[Lt], A, null, k, D, U, N, H), Ue++)
      }
      const Ya = Jn ? pv(Es) : ss;
      for (Be = Ya.length - 1, $ = xt - 1; $ >= 0; $--) {
        const at = ce + $, Lt = y[at], Ja = at + 1 < K ? y[at + 1].el : L;
        Es[$] === 0 ? g(null, Lt, A, Ja, k, D, U, N, H) : Jn && (Be < 0 || $ !== Ya[Be] ? ke(Lt, A, Ja, 2) : Be--)
      }
    }
  }, ke = (p, y, A, L, k = null) => {
    const {el: D, type: U, transition: N, children: H, shapeFlag: $} = p;
    if ($ & 6) {
      ke(p.component.subTree, y, A, L);
      return
    }
    if ($ & 128) {
      p.suspense.move(y, A, L);
      return
    }
    if ($ & 64) {
      U.move(p, y, A, Y);
      return
    }
    if (U === Se) {
      s(D, y, A);
      for (let ee = 0; ee < H.length; ee++) ke(H[ee], y, A, L);
      s(p.anchor, y, A);
      return
    }
    if (U === qo) {
      T(p, y, A);
      return
    }
    if (L !== 2 && $ & 1 && N) if (L === 0) N.beforeEnter(D), s(D, y, A), rt(() => N.enter(D), k); else {
      const {leave: ee, delayLeave: X, afterLeave: re} = N, ce = () => s(D, y, A), Ae = () => {
        ee(D, () => {
          ce(), re && re()
        })
      };
      X ? X(D, ce, Ae) : Ae()
    } else s(D, y, A)
  }, we = (p, y, A, L = !1, k = !1) => {
    const {type: D, props: U, ref: N, children: H, dynamicChildren: $, shapeFlag: K, patchFlag: ee, dirs: X} = p;
    if (N != null && _i(N, null, A, p, !0), K & 256) {
      y.ctx.deactivate(p);
      return
    }
    const re = K & 1 && X, ce = !Os(p);
    let Ae;
    if (ce && (Ae = U && U.onVnodeBeforeUnmount) && Mt(Ae, y, p), K & 6) pt(p.component, A, L); else {
      if (K & 128) {
        p.suspense.unmount(A, L);
        return
      }
      re && kn(p, null, y, "beforeUnmount"), K & 64 ? p.type.remove(p, y, A, k, Y, L) : $ && (D !== Se || ee > 0 && ee & 64) ? le($, y, A, !1, !0) : (D === Se && ee & 384 || !k && K & 16) && le(H, y, A), L && He(p)
    }
    (ce && (Ae = U && U.onVnodeUnmounted) || re) && rt(() => {
      Ae && Mt(Ae, y, p), re && kn(p, null, y, "unmounted")
    }, A)
  }, He = p => {
    const {type: y, el: A, anchor: L, transition: k} = p;
    if (y === Se) {
      qe(A, L);
      return
    }
    if (y === qo) {
      V(p);
      return
    }
    const D = () => {
      r(A), k && !k.persisted && k.afterLeave && k.afterLeave()
    };
    if (p.shapeFlag & 1 && k && !k.persisted) {
      const {leave: U, delayLeave: N} = k, H = () => U(A, D);
      N ? N(p.el, D, H) : H()
    } else D()
  }, qe = (p, y) => {
    let A;
    for (; p !== y;) A = d(p), r(p), p = A;
    r(y)
  }, pt = (p, y, A) => {
    const {bum: L, scope: k, update: D, subTree: U, um: N} = p;
    L && Ho(L), k.stop(), D && (D.active = !1, we(U, p, y, A)), N && rt(N, y), rt(() => {
      p.isUnmounted = !0
    }, y), y && y.pendingBranch && !y.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve())
  }, le = (p, y, A, L = !1, k = !1, D = 0) => {
    for (let U = D; U < p.length; U++) we(p[U], y, A, L, k)
  }, O = p => p.shapeFlag & 6 ? O(p.component.subTree) : p.shapeFlag & 128 ? p.suspense.next() : d(p.anchor || p.el);
  let W = !1;
  const j = (p, y, A) => {
    p == null ? y._vnode && we(y._vnode, null, null, !0) : g(y._vnode || null, p, y, null, null, null, A), W || (W = !0, ol(), $c(), W = !1), y._vnode = p
  }, Y = {p: g, um: we, m: ke, r: He, mt: te, mc: E, pc: q, pbc: P, n: O, o: e};
  let Ce, Ve;
  return t && ([Ce, Ve] = t(Y)), {render: j, hydrate: Ce, createApp: av(j, Ce)}
}

function Go({type: e, props: t}, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n
}

function In({effect: e, update: t}, n) {
  e.allowRecurse = t.allowRecurse = n
}

function gv(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted
}

function va(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (ne(s) && ne(r)) for (let o = 0; o < s.length; o++) {
    const i = s[o];
    let a = r[o];
    a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[o] = vn(r[o]), a.el = i.el), n || va(i, a)), a.type === or && (a.el = i.el)
  }
}

function pv(e) {
  const t = e.slice(), n = [0];
  let s, r, o, i, a;
  const l = e.length;
  for (s = 0; s < l; s++) {
    const c = e[s];
    if (c !== 0) {
      if (r = n[n.length - 1], e[r] < c) {
        t[s] = r, n.push(s);
        continue
      }
      for (o = 0, i = n.length - 1; o < i;) a = o + i >> 1, e[n[a]] < c ? o = a + 1 : i = a;
      c < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s)
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0;) n[o] = i, i = t[i];
  return n
}

function rf(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : rf(t)
}

const yv = e => e.__isTeleport, Is = e => e && (e.disabled || e.disabled === ""),
    pl = e => typeof SVGElement < "u" && e instanceof SVGElement,
    yl = e => typeof MathMLElement == "function" && e instanceof MathMLElement, wi = (e, t) => {
      const n = e && e.to;
      return Me(n) ? t ? t(n) : null : n
    }, bv = {
      name: "Teleport", __isTeleport: !0, process(e, t, n, s, r, o, i, a, l, c) {
        const {mc: u, pc: f, pbc: d, o: {insert: m, querySelector: h, createText: g, createComment: w}} = c,
            S = Is(t.props);
        let {shapeFlag: _, children: T, dynamicChildren: V} = t;
        if (e == null) {
          const R = t.el = g(""), x = t.anchor = g("");
          m(R, n, s), m(x, n, s);
          const B = t.target = wi(t.props, h), E = t.targetAnchor = g("");
          B && (m(E, B), i === "svg" || pl(B) ? i = "svg" : (i === "mathml" || yl(B)) && (i = "mathml"));
          const C = (P, F) => {
            _ & 16 && u(T, P, F, r, o, i, a, l)
          };
          S ? C(n, x) : B && C(B, E)
        } else {
          t.el = e.el;
          const R = t.anchor = e.anchor, x = t.target = e.target, B = t.targetAnchor = e.targetAnchor, E = Is(e.props),
              C = E ? n : x, P = E ? R : B;
          if (i === "svg" || pl(x) ? i = "svg" : (i === "mathml" || yl(x)) && (i = "mathml"), V ? (d(e.dynamicChildren, V, C, r, o, i, a), va(e, t, !0)) : l || f(e, t, C, P, r, o, i, a, !1), S) E ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : _r(t, n, R, c, 1); else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
            const F = t.target = wi(t.props, h);
            F && _r(t, F, null, c, 0)
          } else E && _r(t, x, B, c, 1)
        }
        of(t)
      }, remove(e, t, n, s, {um: r, o: {remove: o}}, i) {
        const {shapeFlag: a, children: l, anchor: c, targetAnchor: u, target: f, props: d} = e;
        if (f && o(u), i && o(c), a & 16) {
          const m = i || !Is(d);
          for (let h = 0; h < l.length; h++) {
            const g = l[h];
            r(g, t, n, m, !!g.dynamicChildren)
          }
        }
      }, move: _r, hydrate: Sv
    };

function _r(e, t, n, {o: {insert: s}, m: r}, o = 2) {
  o === 0 && s(e.targetAnchor, t, n);
  const {el: i, anchor: a, shapeFlag: l, children: c, props: u} = e, f = o === 2;
  if (f && s(i, t, n), (!f || Is(u)) && l & 16) for (let d = 0; d < c.length; d++) r(c[d], t, n, 2);
  f && s(a, t, n)
}

function Sv(e, t, n, s, r, o, {o: {nextSibling: i, parentNode: a, querySelector: l}}, c) {
  const u = t.target = wi(t.props, l);
  if (u) {
    const f = u._lpa || u.firstChild;
    if (t.shapeFlag & 16) if (Is(t.props)) t.anchor = c(i(e), t, a(e), n, s, r, o), t.targetAnchor = f; else {
      t.anchor = i(e);
      let d = f;
      for (; d;) if (d = i(d), d && d.nodeType === 8 && d.data === "teleport anchor") {
        t.targetAnchor = d, u._lpa = t.targetAnchor && i(t.targetAnchor);
        break
      }
      c(f, t, u, n, s, r, o)
    }
    of(t)
  }
  return t.anchor && i(t.anchor)
}

const hw = bv;

function of(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor;) n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut()
  }
}

const Se = Symbol.for("v-fgt"), or = Symbol.for("v-txt"), ht = Symbol.for("v-cmt"), qo = Symbol.for("v-stc"), Vs = [];
let Pt = null;

function _e(e = !1) {
  Vs.push(Pt = e ? null : [])
}

function _v() {
  Vs.pop(), Pt = Vs[Vs.length - 1] || null
}

let zs = 1;

function bl(e) {
  zs += e
}

function af(e) {
  return e.dynamicChildren = zs > 0 ? Pt || ss : null, _v(), zs > 0 && Pt && Pt.push(e), e
}

function dt(e, t, n, s, r, o) {
  return af(kt(e, t, n, s, r, o, !0))
}

function We(e, t, n, s, r) {
  return af(v(e, t, n, s, r, !0))
}

function Ws(e) {
  return e ? e.__v_isVNode === !0 : !1
}

function $n(e, t) {
  return e.type === t.type && e.key === t.key
}

const go = "__vInternal", lf = ({key: e}) => e ?? null, Rr = ({
                                                                ref: e,
                                                                ref_key: t,
                                                                ref_for: n
                                                              }) => (typeof e == "number" && (e = "" + e), e != null ? Me(e) || Oe(e) || oe(e) ? {
  i: Ne,
  r: e,
  k: t,
  f: !!n
} : e : null);

function kt(e, t = null, n = null, s = 0, r = null, o = e === Se ? 0 : 1, i = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && lf(t),
    ref: t && Rr(t),
    scopeId: ho,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne
  };
  return a ? (ga(l, n), o & 128 && e.normalize(l)) : n && (l.shapeFlag |= Me(n) ? 8 : 16), zs > 0 && !i && Pt && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 && Pt.push(l), l
}

const v = wv;

function wv(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Fc) && (e = ht), Ws(e)) {
    const a = en(e, t, !0);
    return n && ga(a, n), zs > 0 && !o && Pt && (a.shapeFlag & 6 ? Pt[Pt.indexOf(e)] = a : Pt.push(a)), a.patchFlag |= -2, a
  }
  if (Iv(e) && (e = e.__vccOpts), t) {
    t = Cv(t);
    let {class: a, style: l} = t;
    a && !Me(a) && (t.class = Cn(a)), Re(l) && (Rc(l) && !ne(l) && (l = De({}, l)), t.style = er(l))
  }
  const i = Me(e) ? 1 : Nm(e) ? 128 : yv(e) ? 64 : Re(e) ? 4 : oe(e) ? 2 : 0;
  return kt(e, t, n, s, r, i, o, !0)
}

function Cv(e) {
  return e ? Rc(e) || go in e ? De({}, e) : e : null
}

function en(e, t, n = !1) {
  const {props: s, ref: r, patchFlag: o, children: i} = e, a = t ? $e(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && lf(a),
    ref: t && t.ref ? n && r ? ne(r) ? r.concat(Rr(t)) : [r, Rr(t)] : Rr(t) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Se ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && en(e.ssContent),
    ssFallback: e.ssFallback && en(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  }
}

function nt(e = " ", t = 0) {
  return v(or, null, e, t)
}

function Yo(e = "", t = !1) {
  return t ? (_e(), We(ht, null, e)) : v(ht, null, e)
}

function $t(e) {
  return e == null || typeof e == "boolean" ? v(ht) : ne(e) ? v(Se, null, e.slice()) : typeof e == "object" ? vn(e) : v(or, null, String(e))
}

function vn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : en(e)
}

function ga(e, t) {
  let n = 0;
  const {shapeFlag: s} = e;
  if (t == null) t = null; else if (ne(t)) n = 16; else if (typeof t == "object") if (s & 65) {
    const r = t.default;
    r && (r._c && (r._d = !1), ga(e, r()), r._c && (r._d = !0));
    return
  } else {
    n = 32;
    const r = t._;
    !r && !(go in t) ? t._ctx = Ne : r === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
  } else oe(t) ? (t = {default: t, _ctx: Ne}, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [nt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n
}

function $e(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s) if (r === "class") t.class !== s.class && (t.class = Cn([t.class, s.class])); else if (r === "style") t.style = er([t.style, s.style]); else if (no(r)) {
      const o = t[r], i = s[r];
      i && o !== i && !(ne(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i)
    } else r !== "" && (t[r] = s[r])
  }
  return t
}

function Mt(e, t, n, s = null) {
  _t(e, t, 7, [n, s])
}

const Ev = Zc();
let xv = 0;

function Av(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || Ev, o = {
    uid: xv++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new vc(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: ef(s, r),
    emitsOptions: Dc(s, r),
    emit: null,
    emitted: null,
    propsDefaults: Ie,
    inheritAttrs: s.inheritAttrs,
    ctx: Ie,
    data: Ie,
    props: Ie,
    attrs: Ie,
    slots: Ie,
    refs: Ie,
    setupState: Ie,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = {_: o}, o.root = t ? t.root : o, o.emit = Om.bind(null, o), e.ce && e.ce(o), o
}

let je = null;
const po = () => je || Ne;
let jr, Ci;
{
  const e = dc(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), o => {
      r.length > 1 ? r.forEach(i => i(o)) : r[0](o)
    }
  };
  jr = t("__VUE_INSTANCE_SETTERS__", n => je = n), Ci = t("__VUE_SSR_SETTERS__", n => ar = n)
}
const ir = e => {
  const t = je;
  return jr(e), e.scope.on(), () => {
    e.scope.off(), jr(t)
  }
}, Sl = () => {
  je && je.scope.off(), jr(null)
};

function uf(e) {
  return e.vnode.shapeFlag & 4
}

let ar = !1;

function Tv(e, t = !1) {
  t && Ci(t);
  const {props: n, children: s} = e.vnode, r = uf(e);
  uv(e, n, r, t), dv(e, s);
  const o = r ? Pv(e, t) : void 0;
  return t && Ci(!1), o
}

function Pv(e, t) {
  const n = e.type;
  e.accessCache = Object.create(null), e.proxy = lo(new Proxy(e.ctx, ev));
  const {setup: s} = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? Ov(e) : null, o = ir(e);
    Kn();
    const i = bn(s, e, 0, [e.props, r]);
    if (Gn(), o(), uc(i)) {
      if (i.then(Sl, Sl), t) return i.then(a => {
        _l(e, a, t)
      }).catch(a => {
        tr(a, e, 0)
      });
      e.asyncDep = i
    } else _l(e, i, t)
  } else cf(e, t)
}

function _l(e, t, n) {
  oe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Re(t) && (e.setupState = Vc(t)), cf(e, n)
}

let wl;

function cf(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && wl && !s.render) {
      const r = s.template || ha(e).template;
      if (r) {
        const {isCustomElement: o, compilerOptions: i} = e.appContext.config, {delimiters: a, compilerOptions: l} = s,
            c = De(De({isCustomElement: o, delimiters: a}, i), l);
        s.render = wl(r, c)
      }
    }
    e.render = s.render || bt
  }
  {
    const r = ir(e);
    Kn();
    try {
      tv(e)
    } finally {
      Gn(), r()
    }
  }
}

function Rv(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
    get(t, n) {
      return ot(e, "get", "$attrs"), t[n]
    }
  }))
}

function Ov(e) {
  const t = n => {
    e.exposed = n || {}
  };
  return {
    get attrs() {
      return Rv(e)
    }, slots: e.slots, emit: e.emit, expose: t
  }
}

function yo(e) {
  if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(Vc(lo(e.exposed)), {
    get(t, n) {
      if (n in t) return t[n];
      if (n in ks) return ks[n](e)
    }, has(t, n) {
      return n in t || n in ks
    }
  }))
}

function kv(e, t = !0) {
  return oe(e) ? e.displayName || e.name : e.name || t && e.__name
}

function Iv(e) {
  return oe(e) && "__vccOpts" in e
}

const b = (e, t) => Sm(e, t, ar);

function En(e, t, n) {
  const s = arguments.length;
  return s === 2 ? Re(t) && !ne(t) ? Ws(t) ? v(e, null, [t]) : v(e, t) : v(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Ws(n) && (n = [n]), v(e, t, n))
}

const Vv = "3.4.11";
/**
 * @vue/runtime-dom v3.4.11
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/const Bv = "http://www.w3.org/2000/svg", Lv = "http://www.w3.org/1998/Math/MathML",
    gn = typeof document < "u" ? document : null, Cl = gn && gn.createElement("template"), Mv = {
      insert: (e, t, n) => {
        t.insertBefore(e, n || null)
      },
      remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e)
      },
      createElement: (e, t, n, s) => {
        const r = t === "svg" ? gn.createElementNS(Bv, e) : t === "mathml" ? gn.createElementNS(Lv, e) : gn.createElement(e, n ? {is: n} : void 0);
        return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r
      },
      createText: e => gn.createTextNode(e),
      createComment: e => gn.createComment(e),
      setText: (e, t) => {
        e.nodeValue = t
      },
      setElementText: (e, t) => {
        e.textContent = t
      },
      parentNode: e => e.parentNode,
      nextSibling: e => e.nextSibling,
      querySelector: e => gn.querySelector(e),
      setScopeId(e, t) {
        e.setAttribute(t, "")
      },
      insertStaticContent(e, t, n, s, r, o) {
        const i = n ? n.previousSibling : t.lastChild;
        if (r && (r === o || r.nextSibling)) for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling));) ; else {
          Cl.innerHTML = s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e;
          const a = Cl.content;
          if (s === "svg" || s === "mathml") {
            const l = a.firstChild;
            for (; l.firstChild;) a.appendChild(l.firstChild);
            a.removeChild(l)
          }
          t.insertBefore(a, n)
        }
        return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
      }
    }, ln = "transition", xs = "animation", us = Symbol("_vtc"), qn = (e, {slots: t}) => En(zm, df(e), t);
qn.displayName = "Transition";
const ff = {
  name: String,
  type: String,
  css: {type: Boolean, default: !0},
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, $v = qn.props = De({}, Uc, ff), Vn = (e, t = []) => {
  ne(e) ? e.forEach(n => n(...t)) : e && e(...t)
}, El = e => e ? ne(e) ? e.some(t => t.length > 1) : e.length > 1 : !1;

function df(e) {
  const t = {};
  for (const M in e) M in ff || (t[M] = e[M]);
  if (e.css === !1) return t;
  const {
    name: n = "v",
    type: s,
    duration: r,
    enterFromClass: o = `${n}-enter-from`,
    enterActiveClass: i = `${n}-enter-active`,
    enterToClass: a = `${n}-enter-to`,
    appearFromClass: l = o,
    appearActiveClass: c = i,
    appearToClass: u = a,
    leaveFromClass: f = `${n}-leave-from`,
    leaveActiveClass: d = `${n}-leave-active`,
    leaveToClass: m = `${n}-leave-to`
  } = e, h = Nv(r), g = h && h[0], w = h && h[1], {
    onBeforeEnter: S,
    onEnter: _,
    onEnterCancelled: T,
    onLeave: V,
    onLeaveCancelled: R,
    onBeforeAppear: x = S,
    onAppear: B = _,
    onAppearCancelled: E = T
  } = t, C = (M, z, te) => {
    fn(M, z ? u : a), fn(M, z ? c : i), te && te()
  }, P = (M, z) => {
    M._isLeaving = !1, fn(M, f), fn(M, m), fn(M, d), z && z()
  }, F = M => (z, te) => {
    const se = M ? B : _, J = () => C(z, M, te);
    Vn(se, [z, J]), xl(() => {
      fn(z, M ? l : o), Gt(z, M ? u : a), El(se) || Al(z, s, g, J)
    })
  };
  return De(t, {
    onBeforeEnter(M) {
      Vn(S, [M]), Gt(M, o), Gt(M, i)
    }, onBeforeAppear(M) {
      Vn(x, [M]), Gt(M, l), Gt(M, c)
    }, onEnter: F(!1), onAppear: F(!0), onLeave(M, z) {
      M._isLeaving = !0;
      const te = () => P(M, z);
      Gt(M, f), mf(), Gt(M, d), xl(() => {
        M._isLeaving && (fn(M, f), Gt(M, m), El(V) || Al(M, s, w, te))
      }), Vn(V, [M, te])
    }, onEnterCancelled(M) {
      C(M, !1), Vn(T, [M])
    }, onAppearCancelled(M) {
      C(M, !0), Vn(E, [M])
    }, onLeaveCancelled(M) {
      P(M), Vn(R, [M])
    }
  })
}

function Nv(e) {
  if (e == null) return null;
  if (Re(e)) return [Jo(e.enter), Jo(e.leave)];
  {
    const t = Jo(e);
    return [t, t]
  }
}

function Jo(e) {
  return Kh(e)
}

function Gt(e, t) {
  t.split(/\s+/).forEach(n => n && e.classList.add(n)), (e[us] || (e[us] = new Set)).add(t)
}

function fn(e, t) {
  t.split(/\s+/).forEach(s => s && e.classList.remove(s));
  const n = e[us];
  n && (n.delete(t), n.size || (e[us] = void 0))
}

function xl(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e)
  })
}

let Dv = 0;

function Al(e, t, n, s) {
  const r = e._endId = ++Dv, o = () => {
    r === e._endId && s()
  };
  if (n) return setTimeout(o, n);
  const {type: i, timeout: a, propCount: l} = hf(e, t);
  if (!i) return s();
  const c = i + "end";
  let u = 0;
  const f = () => {
    e.removeEventListener(c, d), o()
  }, d = m => {
    m.target === e && ++u >= l && f()
  };
  setTimeout(() => {
    u < l && f()
  }, a + 1), e.addEventListener(c, d)
}

function hf(e, t) {
  const n = window.getComputedStyle(e), s = h => (n[h] || "").split(", "), r = s(`${ln}Delay`), o = s(`${ln}Duration`),
      i = Tl(r, o), a = s(`${xs}Delay`), l = s(`${xs}Duration`), c = Tl(a, l);
  let u = null, f = 0, d = 0;
  t === ln ? i > 0 && (u = ln, f = i, d = o.length) : t === xs ? c > 0 && (u = xs, f = c, d = l.length) : (f = Math.max(i, c), u = f > 0 ? i > c ? ln : xs : null, d = u ? u === ln ? o.length : l.length : 0);
  const m = u === ln && /\b(transform|all)(,|$)/.test(s(`${ln}Property`).toString());
  return {type: u, timeout: f, propCount: d, hasTransform: m}
}

function Tl(e, t) {
  for (; e.length < t.length;) e = e.concat(e);
  return Math.max(...t.map((n, s) => Pl(n) + Pl(e[s])))
}

function Pl(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3
}

function mf() {
  return document.body.offsetHeight
}

function Fv(e, t, n) {
  const s = e[us];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}

const pa = Symbol("_vod"), bo = {
  beforeMount(e, {value: t}, {transition: n}) {
    e[pa] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : As(e, t)
  }, mounted(e, {value: t}, {transition: n}) {
    n && t && n.enter(e)
  }, updated(e, {value: t, oldValue: n}, {transition: s}) {
    !t != !n && (s ? t ? (s.beforeEnter(e), As(e, !0), s.enter(e)) : s.leave(e, () => {
      As(e, !1)
    }) : As(e, t))
  }, beforeUnmount(e, {value: t}) {
    As(e, t)
  }
};

function As(e, t) {
  e.style.display = t ? e[pa] : "none"
}

const Hv = Symbol("");

function jv(e, t, n) {
  const s = e.style, r = s.display, o = Me(n);
  if (n && !o) {
    if (t && !Me(t)) for (const i in t) n[i] == null && Ei(s, i, "");
    for (const i in n) Ei(s, i, n[i])
  } else if (o) {
    if (t !== n) {
      const i = s[Hv];
      i && (n += ";" + i), s.cssText = n
    }
  } else t && e.removeAttribute("style");
  pa in e && (s.display = r)
}

const Rl = /\s*!important$/;

function Ei(e, t, n) {
  if (ne(n)) n.forEach(s => Ei(e, t, s)); else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
    const s = Uv(e, t);
    Rl.test(n) ? e.setProperty(vs(s), n.replace(Rl, ""), "important") : e[s] = n
  }
}

const Ol = ["Webkit", "Moz", "ms"], Xo = {};

function Uv(e, t) {
  const n = Xo[t];
  if (n) return n;
  let s = Et(t);
  if (s !== "filter" && s in e) return Xo[t] = s;
  s = gs(s);
  for (let r = 0; r < Ol.length; r++) {
    const o = Ol[r] + s;
    if (o in e) return Xo[t] = o
  }
  return t
}

const kl = "http://www.w3.org/1999/xlink";

function zv(e, t, n, s, r) {
  if (s && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(kl, t.slice(6, t.length)) : e.setAttributeNS(kl, t, n); else {
    const o = Zh(t);
    n == null || o && !hc(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
  }
}

function Wv(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), e[t] = n ?? "";
    return
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
    e._value = n;
    const c = a === "OPTION" ? e.getAttribute("value") : e.value, u = n ?? "";
    c !== u && (e.value = u), n == null && e.removeAttribute(t);
    return
  }
  let l = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean" ? n = hc(n) : n == null && c === "string" ? (n = "", l = !0) : c === "number" && (n = 0, l = !0)
  }
  try {
    e[t] = n
  } catch {
  }
  l && e.removeAttribute(t)
}

function Kv(e, t, n, s) {
  e.addEventListener(t, n, s)
}

function Gv(e, t, n, s) {
  e.removeEventListener(t, n, s)
}

const Il = Symbol("_vei");

function qv(e, t, n, s, r = null) {
  const o = e[Il] || (e[Il] = {}), i = o[t];
  if (s && i) i.value = s; else {
    const [a, l] = Yv(t);
    if (s) {
      const c = o[t] = Zv(s, r);
      Kv(e, a, c, l)
    } else i && (Gv(e, a, i, l), o[t] = void 0)
  }
}

const Vl = /(?:Once|Passive|Capture)$/;

function Yv(e) {
  let t;
  if (Vl.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Vl);) e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0
  }
  return [e[2] === ":" ? e.slice(3) : vs(e.slice(2)), t]
}

let Zo = 0;
const Jv = Promise.resolve(), Xv = () => Zo || (Jv.then(() => Zo = 0), Zo = Date.now());

function Zv(e, t) {
  const n = s => {
    if (!s._vts) s._vts = Date.now(); else if (s._vts <= n.attached) return;
    _t(Qv(s, n.value), t, 5, [s])
  };
  return n.value = e, n.attached = Xv(), n
}

function Qv(e, t) {
  if (ne(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0
    }, t.map(s => r => !r._stopped && s && s(r))
  } else return t
}

const Bl = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    eg = (e, t, n, s, r, o, i, a, l) => {
      const c = r === "svg";
      t === "class" ? Fv(e, s, c) : t === "style" ? jv(e, n, s) : no(t) ? Xi(t) || qv(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : tg(e, t, s, c)) ? Wv(e, t, s, o, i, a, l) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), zv(e, t, s, c))
    };

function tg(e, t, n, s) {
  if (s) return !!(t === "innerHTML" || t === "textContent" || t in e && Bl(t) && oe(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE") return !1
  }
  return Bl(t) && Me(n) ? !1 : t in e
}

const vf = new WeakMap, gf = new WeakMap, Ur = Symbol("_moveCb"), Ll = Symbol("_enterCb"), pf = {
  name: "TransitionGroup", props: De({}, $v, {tag: String, moveClass: String}), setup(e, {slots: t}) {
    const n = po(), s = jc();
    let r, o;
    return qc(() => {
      if (!r.length) return;
      const i = e.moveClass || `${e.name || "v"}-move`;
      if (!ig(r[0].el, n.vnode.el, i)) return;
      r.forEach(sg), r.forEach(rg);
      const a = r.filter(og);
      mf(), a.forEach(l => {
        const c = l.el, u = c.style;
        Gt(c, i), u.transform = u.webkitTransform = u.transitionDuration = "";
        const f = c[Ur] = d => {
          d && d.target !== c || (!d || /transform$/.test(d.propertyName)) && (c.removeEventListener("transitionend", f), c[Ur] = null, fn(c, i))
        };
        c.addEventListener("transitionend", f)
      })
    }), () => {
      const i = ie(e), a = df(i);
      let l = i.tag || Se;
      r = o, o = t.default ? da(t.default()) : [];
      for (let c = 0; c < o.length; c++) {
        const u = o[c];
        u.key != null && js(u, Hs(u, a, s, n))
      }
      if (r) for (let c = 0; c < r.length; c++) {
        const u = r[c];
        js(u, Hs(u, a, s, n)), vf.set(u, u.el.getBoundingClientRect())
      }
      return v(l, null, o)
    }
  }
}, ng = e => delete e.mode;
pf.props;
const yf = pf;

function sg(e) {
  const t = e.el;
  t[Ur] && t[Ur](), t[Ll] && t[Ll]()
}

function rg(e) {
  gf.set(e, e.el.getBoundingClientRect())
}

function og(e) {
  const t = vf.get(e), n = gf.get(e), s = t.left - n.left, r = t.top - n.top;
  if (s || r) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${s}px,${r}px)`, o.transitionDuration = "0s", e
  }
}

function ig(e, t, n) {
  const s = e.cloneNode(), r = e[us];
  r && r.forEach(a => {
    a.split(/\s+/).forEach(l => l && s.classList.remove(l))
  }), n.split(/\s+/).forEach(a => a && s.classList.add(a)), s.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(s);
  const {hasTransform: i} = hf(s);
  return o.removeChild(s), i
}

const ag = ["ctrl", "shift", "alt", "meta"], lg = {
  stop: e => e.stopPropagation(),
  prevent: e => e.preventDefault(),
  self: e => e.target !== e.currentTarget,
  ctrl: e => !e.ctrlKey,
  shift: e => !e.shiftKey,
  alt: e => !e.altKey,
  meta: e => !e.metaKey,
  left: e => "button" in e && e.button !== 0,
  middle: e => "button" in e && e.button !== 1,
  right: e => "button" in e && e.button !== 2,
  exact: (e, t) => ag.some(n => e[`${n}Key`] && !t.includes(n))
}, So = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const a = lg[t[i]];
      if (a && a(r, t)) return
    }
    return e(r, ...o)
  })
}, ug = De({patchProp: eg}, Mv);
let Ml;

function cg() {
  return Ml || (Ml = mv(ug))
}

const bf = (...e) => {
  const t = cg().createApp(...e), {mount: n} = t;
  return t.mount = s => {
    const r = dg(s);
    if (!r) return;
    const o = t._component;
    !oe(o) && !o.render && !o.template && (o.template = r.innerHTML), r.innerHTML = "";
    const i = n(r, !1, fg(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i
  }, t
};

function fg(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml"
}

function dg(e) {
  return Me(e) ? document.querySelector(e) : e
}

const hg = {
  badge: "Badge",
  open: "Open",
  close: "Close",
  confirmEdit: {ok: "OK", cancel: "Cancel"},
  dataIterator: {noResultsText: "No matching records found", loadingText: "Loading items..."},
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  dateRangeInput: {divider: "to"},
  datePicker: {
    itemsSelected: "{0} selected",
    range: {title: "Select dates", header: "Enter dates"},
    title: "Select date",
    header: "Enter date",
    input: {placeholder: "Enter date"}
  },
  noDataText: "No data available",
  carousel: {prev: "Previous visual", next: "Next visual", ariaLabel: {delimiter: "Carousel slide {0} of {1}"}},
  calendar: {moreEvents: "{0} more", today: "Today"},
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Please enter OTP character {0}"
  },
  fileInput: {counter: "{0} files", counterSize: "{0} files ({1} in total)"},
  timePicker: {am: "AM", pm: "PM"},
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page"
    }
  },
  stepper: {next: "Next", prev: "Previous"},
  rating: {ariaLabel: {item: "Rating {0} of {1}"}},
  loading: "Loading...",
  infiniteScroll: {loadMore: "Load more", empty: "No more"}
}, mg = {
  af: !1,
  ar: !0,
  bg: !1,
  ca: !1,
  ckb: !1,
  cs: !1,
  de: !1,
  el: !1,
  en: !1,
  es: !1,
  et: !1,
  fa: !0,
  fi: !1,
  fr: !1,
  hr: !1,
  hu: !1,
  he: !0,
  id: !1,
  it: !1,
  ja: !1,
  ko: !1,
  lv: !1,
  lt: !1,
  nl: !1,
  no: !1,
  pl: !1,
  pt: !1,
  ro: !1,
  ru: !1,
  sk: !1,
  sl: !1,
  srCyrl: !1,
  srLatn: !1,
  sv: !1,
  th: !1,
  tr: !1,
  az: !1,
  uk: !1,
  vi: !1,
  zhHans: !1,
  zhHant: !1
};

function as(e, t) {
  let n;

  function s() {
    n = ea(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), s()
    }) : t())
  }

  Ee(e, r => {
    r && !n ? s() : r || (n == null || n.stop(), n = void 0)
  }, {immediate: !0}), oo(() => {
    n == null || n.stop()
  })
}

const tt = typeof window < "u", ya = tt && "IntersectionObserver" in window,
    vg = tt && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);

function $l(e, t, n) {
  gg(e, t), t.set(e, n)
}

function gg(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
}

function pg(e, t, n) {
  var s = Sf(e, t, "set");
  return yg(e, s, n), n
}

function yg(e, t, n) {
  if (t.set) t.set.call(e, n); else {
    if (!t.writable) throw new TypeError("attempted to set read only private field");
    t.value = n
  }
}

function Bn(e, t) {
  var n = Sf(e, t, "get");
  return bg(e, n)
}

function Sf(e, t, n) {
  if (!t.has(e)) throw new TypeError("attempted to " + n + " private field on non-instance");
  return t.get(e)
}

function bg(e, t) {
  return t.get ? t.get.call(e) : t.value
}

function _f(e, t, n) {
  const s = t.length - 1;
  if (s < 0) return e === void 0 ? n : e;
  for (let r = 0; r < s; r++) {
    if (e == null) return n;
    e = e[t[r]]
  }
  return e == null || e[t[s]] === void 0 ? n : e[t[s]]
}

function lr(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t)) return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every(s => lr(e[s], t[s]))
}

function xi(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), _f(e, t.split("."), n))
}

function qt(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const r = t(e, n);
    return typeof r > "u" ? n : r
  }
  if (typeof t == "string") return xi(e, t, n);
  if (Array.isArray(t)) return _f(e, t, n);
  if (typeof t != "function") return n;
  const s = t(e, n);
  return typeof s > "u" ? n : s
}

function wf(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({length: e}, (n, s) => t + s)
}

function he(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === "")) return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0
}

function Ai(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e)
}

function Nl(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t
  }
  return e
}

const Dl = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});

function Qo(e, t) {
  return t.every(n => e.hasOwnProperty(n))
}

function Cf(e, t) {
  const n = {}, s = new Set(Object.keys(e));
  for (const r of t) s.has(r) && (n[r] = e[r]);
  return n
}

function Fl(e, t, n) {
  const s = Object.create(null), r = Object.create(null);
  for (const o in e) t.some(i => i instanceof RegExp ? i.test(o) : i === o) && !(n != null && n.some(i => i === o)) ? s[o] = e[o] : r[o] = e[o];
  return [s, r]
}

function ba(e, t) {
  const n = {...e};
  return t.forEach(s => delete n[s]), n
}

const Ef = /^on[^a-z]/, Sg = e => Ef.test(e),
    _g = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"],
    wg = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Enter", "Escape", "Tab", " "];

function mw(e) {
  return e.isComposing && wg.includes(e.key)
}

function Sa(e) {
  const [t, n] = Fl(e, [Ef]), s = ba(t, _g), [r, o] = Fl(n, ["class", "style", "id", /^data-/]);
  return Object.assign(r, t), Object.assign(o, s), [r, o]
}

function Sn(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e]
}

function vw(e, t) {
  let n = 0;
  const s = function () {
    for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
    clearTimeout(n), n = setTimeout(() => e(...o), be(t))
  };
  return s.clear = () => {
    clearTimeout(n)
  }, s.immediate = e, s
}

function Cg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e))
}

function Hl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length))
}

function jl(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e
}

function Eg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let s = 0;
  for (; s < e.length;) n.push(e.substr(s, t)), s += t;
  return n
}

function St() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = arguments.length > 2 ? arguments[2] : void 0;
  const s = {};
  for (const r in e) s[r] = e[r];
  for (const r in t) {
    const o = e[r], i = t[r];
    if (Ai(o) && Ai(i)) {
      s[r] = St(o, i, n);
      continue
    }
    if (Array.isArray(o) && Array.isArray(i) && n) {
      s[r] = n(o, i);
      continue
    }
    s[r] = i
  }
  return s
}

function xf(e) {
  return e.map(t => t.type === Se ? xf(t.children) : t).flat()
}

function zn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (zn.cache.has(e)) return zn.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return zn.cache.set(e, t), t
}

zn.cache = new Map;

function Bs(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t)) return t.map(n => Bs(e, n)).flat(1);
  if (Array.isArray(t.children)) return t.children.map(n => Bs(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e)) return [t.component];
    if (t.component.subTree) return Bs(e, t.component.subTree).flat(1)
  }
  return []
}

var wr = new WeakMap, Xn = new WeakMap;

class xg {
  constructor(t) {
    $l(this, wr, {writable: !0, value: []}), $l(this, Xn, {writable: !0, value: 0}), this.size = t
  }

  push(t) {
    Bn(this, wr)[Bn(this, Xn)] = t, pg(this, Xn, (Bn(this, Xn) + 1) % this.size)
  }

  values() {
    return Bn(this, wr).slice(Bn(this, Xn)).concat(Bn(this, wr).slice(0, Bn(this, Xn)))
  }
}

function Af(e) {
  const t = ze({}), n = b(e);
  return sr(() => {
    for (const s in n.value) t[s] = n.value[s]
  }, {flush: "sync"}), uo(t)
}

function zr(e, t) {
  return e.includes(t)
}

function gw(e) {
  return e[2].toLowerCase() + e.slice(3)
}

const _n = () => [Function, Array];

function Ul(e, t) {
  return t = "on" + gs(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`])
}

function Ag(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) n[s - 1] = arguments[s];
  if (Array.isArray(e)) for (const r of e) r(...n); else typeof e == "function" && e(...n)
}

function Tg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map(s => `${s}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)]
}

function Pg(e, t, n) {
  let s, r = e.indexOf(document.activeElement);
  const o = t === "next" ? 1 : -1;
  do r += o, s = e[r]; while ((!s || s.offsetParent == null || !((n == null ? void 0 : n(s)) ?? !0)) && r < e.length && r >= 0);
  return s
}

function Tf(e, t) {
  var s, r, o, i;
  const n = Tg(e);
  if (!t) (e === document.activeElement || !e.contains(document.activeElement)) && ((s = n[0]) == null || s.focus()); else if (t === "first") (r = n[0]) == null || r.focus(); else if (t === "last") (o = n.at(-1)) == null || o.focus(); else if (typeof t == "number") (i = n[t]) == null || i.focus(); else {
    const a = Pg(n, t);
    a ? a.focus() : Tf(e, t === "next" ? "first" : "last")
  }
}

function pw() {
}

function Rg(e, t) {
  if (!(tt && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t)
  } catch {
    return null
  }
}

function Og(e) {
  return e.some(t => Ws(t) ? t.type === ht ? !1 : t.type !== Se || Og(t.children) : !0) ? e : null
}

function yw(e, t) {
  if (!tt || e === 0) return t(), () => {
  };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n)
}

const Pf = ["top", "bottom"], kg = ["start", "end", "left", "right"];

function Ig(e, t) {
  let [n, s] = e.split(" ");
  return s || (s = zr(Pf, n) ? "start" : zr(kg, n) ? "top" : "center"), {side: Ti(n, t), align: Ti(s, t)}
}

function Ti(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e
}

function bw(e) {
  return {side: {center: "center", top: "bottom", bottom: "top", left: "right", right: "left"}[e.side], align: e.align}
}

function Sw(e) {
  return {side: e.side, align: {center: "center", top: "bottom", bottom: "top", left: "right", right: "left"}[e.align]}
}

function _w(e) {
  return {side: e.align, align: e.side}
}

function ww(e) {
  return zr(Pf, e.side) ? "y" : "x"
}

class Or {
  constructor(t) {
    let {x: n, y: s, width: r, height: o} = t;
    this.x = n, this.y = s, this.width = r, this.height = o
  }

  get top() {
    return this.y
  }

  get bottom() {
    return this.y + this.height
  }

  get left() {
    return this.x
  }

  get right() {
    return this.x + this.width
  }
}

function Cw(e, t) {
  return {
    x: {before: Math.max(0, t.left - e.left), after: Math.max(0, e.right - t.right)},
    y: {before: Math.max(0, t.top - e.top), after: Math.max(0, e.bottom - t.bottom)}
  }
}

function Ew(e) {
  return Array.isArray(e) ? new Or({x: e[0], y: e[1], width: 0, height: 0}) : e.getBoundingClientRect()
}

function Vg(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), s = n.transform;
  if (s) {
    let r, o, i, a, l;
    if (s.startsWith("matrix3d(")) r = s.slice(9, -1).split(/, /), o = +r[0], i = +r[5], a = +r[12], l = +r[13]; else if (s.startsWith("matrix(")) r = s.slice(7, -1).split(/, /), o = +r[0], i = +r[3], a = +r[4], l = +r[5]; else return new Or(t);
    const c = n.transformOrigin, u = t.x - a - (1 - o) * parseFloat(c),
        f = t.y - l - (1 - i) * parseFloat(c.slice(c.indexOf(" ") + 1)), d = o ? t.width / o : e.offsetWidth + 1,
        m = i ? t.height / i : e.offsetHeight + 1;
    return new Or({x: u, y: f, width: d, height: m})
  } else return new Or(t)
}

function Bg(e, t, n) {
  if (typeof e.animate > "u") return {finished: Promise.resolve()};
  let s;
  try {
    s = e.animate(t, n)
  } catch {
    return {finished: Promise.resolve()}
  }
  return typeof s.finished > "u" && (s.finished = new Promise(r => {
    s.onfinish = () => {
      r(s)
    }
  })), s
}

const Zn = 2.4, zl = .2126729, Wl = .7151522, Kl = .072175, Lg = .55, Mg = .58, $g = .57, Ng = .62, Cr = .03, Gl = 1.45,
    Dg = 5e-4, Fg = 1.25, Hg = 1.25, ql = .078, Yl = 12.82051282051282, Er = .06, Jl = .001;

function Xl(e, t) {
  const n = (e.r / 255) ** Zn, s = (e.g / 255) ** Zn, r = (e.b / 255) ** Zn, o = (t.r / 255) ** Zn,
      i = (t.g / 255) ** Zn, a = (t.b / 255) ** Zn;
  let l = n * zl + s * Wl + r * Kl, c = o * zl + i * Wl + a * Kl;
  if (l <= Cr && (l += (Cr - l) ** Gl), c <= Cr && (c += (Cr - c) ** Gl), Math.abs(c - l) < Dg) return 0;
  let u;
  if (c > l) {
    const f = (c ** Lg - l ** Mg) * Fg;
    u = f < Jl ? 0 : f < ql ? f - f * Yl * Er : f - Er
  } else {
    const f = (c ** Ng - l ** $g) * Hg;
    u = f > -Jl ? 0 : f > -ql ? f - f * Yl * Er : f + Er
  }
  return u * 100
}

function jg(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map(n => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`
}

const Wr = .20689655172413793, Ug = e => e > Wr ** 3 ? Math.cbrt(e) : e / (3 * Wr ** 2) + 4 / 29,
    zg = e => e > Wr ? e ** 3 : 3 * Wr ** 2 * (e - 4 / 29);

function Rf(e) {
  const t = Ug, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / .95047) - n), 200 * (n - t(e[2] / 1.08883))]
}

function Of(e) {
  const t = zg, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * .95047, t(n), t(n - e[2] / 200) * 1.08883]
}

const Wg = [[3.2406, -1.5372, -.4986], [-.9689, 1.8758, .0415], [.0557, -.204, 1.057]],
    Kg = e => e <= .0031308 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - .055,
    Gg = [[.4124, .3576, .1805], [.2126, .7152, .0722], [.0193, .1192, .9505]],
    qg = e => e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4;

function kf(e) {
  const t = Array(3), n = Kg, s = Wg;
  for (let r = 0; r < 3; ++r) t[r] = Math.round(Cg(n(s[r][0] * e[0] + s[r][1] * e[1] + s[r][2] * e[2])) * 255);
  return {r: t[0], g: t[1], b: t[2]}
}

function _a(e) {
  let {r: t, g: n, b: s} = e;
  const r = [0, 0, 0], o = qg, i = Gg;
  t = o(t / 255), n = o(n / 255), s = o(s / 255);
  for (let a = 0; a < 3; ++a) r[a] = i[a][0] * t + i[a][1] * n + i[a][2] * s;
  return r
}

function Pi(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e)
}

function Yg(e) {
  return Pi(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e)
}

const Zl = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Jg = {
  rgb: (e, t, n, s) => ({r: e, g: t, b: n, a: s}),
  rgba: (e, t, n, s) => ({r: e, g: t, b: n, a: s}),
  hsl: (e, t, n, s) => Ql({h: e, s: t, l: n, a: s}),
  hsla: (e, t, n, s) => Ql({h: e, s: t, l: n, a: s}),
  hsv: (e, t, n, s) => Ks({h: e, s: t, v: n, a: s}),
  hsva: (e, t, n, s) => Ks({h: e, s: t, v: n, a: s})
};

function Dt(e) {
  if (typeof e == "number") return {r: (e & 16711680) >> 16, g: (e & 65280) >> 8, b: e & 255};
  if (typeof e == "string" && Zl.test(e)) {
    const {groups: t} = e.match(Zl), {fn: n, values: s} = t,
        r = s.split(/,\s*/).map(o => o.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(o) / 100 : parseFloat(o));
    return Jg[n](...r)
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map(n => n + n).join("") : [6, 8].includes(t.length), Zg(t)
  } else if (typeof e == "object") {
    if (Qo(e, ["r", "g", "b"])) return e;
    if (Qo(e, ["h", "s", "l"])) return Ks(If(e));
    if (Qo(e, ["h", "s", "v"])) return Ks(e)
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`)
}

function Ks(e) {
  const {h: t, s: n, v: s, a: r} = e, o = a => {
    const l = (a + t / 60) % 6;
    return s - s * n * Math.max(Math.min(l, 4 - l, 1), 0)
  }, i = [o(5), o(3), o(1)].map(a => Math.round(a * 255));
  return {r: i[0], g: i[1], b: i[2], a: r}
}

function Ql(e) {
  return Ks(If(e))
}

function If(e) {
  const {h: t, s: n, l: s, a: r} = e, o = s + n * Math.min(s, 1 - s), i = o === 0 ? 0 : 2 - 2 * s / o;
  return {h: t, s: i, v: o, a: r}
}

function xr(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase()
}

function Xg(e) {
  let {r: t, g: n, b: s, a: r} = e;
  return `#${[xr(t), xr(n), xr(s), r !== void 0 ? xr(Math.round(r * 255)) : ""].join("")}`
}

function Zg(e) {
  e = Qg(e);
  let [t, n, s, r] = Eg(e, 2).map(o => parseInt(o, 16));
  return r = r === void 0 ? r : r / 255, {r: t, g: n, b: s, a: r}
}

function Qg(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map(t => t + t).join("")), e.length !== 6 && (e = Hl(Hl(e, 6), 8, "F")), e
}

function ep(e, t) {
  const n = Rf(_a(e));
  return n[0] = n[0] + t * 10, kf(Of(n))
}

function tp(e, t) {
  const n = Rf(_a(e));
  return n[0] = n[0] - t * 10, kf(Of(n))
}

function np(e) {
  const t = Dt(e);
  return _a(t)[1]
}

function Vf(e) {
  const t = Math.abs(Xl(Dt(0), Dt(e)));
  return Math.abs(Xl(Dt(16777215), Dt(e))) > Math.min(t, 50) ? "#fff" : "#000"
}

function G(e, t) {
  return n => Object.keys(e).reduce((s, r) => {
    const i = typeof e[r] == "object" && e[r] != null && !Array.isArray(e[r]) ? e[r] : {type: e[r]};
    return n && r in n ? s[r] = {...i, default: n[r]} : s[r] = i, t && !s[r].source && (s[r].source = t), s
  }, {})
}

const ye = G({class: [String, Array], style: {type: [String, Array, Object], default: null}}, "component"),
    cs = Symbol.for("vuetify:defaults");

function sp(e) {
  return Z(e)
}

function wa() {
  const e = Pe(cs);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e
}

function Yn(e, t) {
  const n = wa(), s = Z(e), r = b(() => {
    if (be(t == null ? void 0 : t.disabled)) return n.value;
    const i = be(t == null ? void 0 : t.scoped), a = be(t == null ? void 0 : t.reset),
        l = be(t == null ? void 0 : t.root);
    if (s.value == null && !(i || a || l)) return n.value;
    let c = St(s.value, {prev: n.value});
    if (i) return c;
    if (a || l) {
      const u = Number(a || 1 / 0);
      for (let f = 0; f <= u && !(!c || !("prev" in c)); f++) c = c.prev;
      return c && typeof l == "string" && l in c && (c = St(St(c, {prev: c}), c[l])), c
    }
    return c.prev ? St(c.prev, c) : c
  });
  return Ye(cs, r), r
}

function rp(e, t) {
  var n, s;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((s = e.props) == null ? void 0 : s[zn(t)]) < "u"
}

function op() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 ? arguments[1] : void 0,
      n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : wa();
  const s = Qe("useDefaults");
  if (t = t ?? s.type.name ?? s.type.__name, !t) throw new Error("[Vuetify] Could not determine component name");
  const r = b(() => {
    var l;
    return (l = n.value) == null ? void 0 : l[e._as ?? t]
  }), o = new Proxy(e, {
    get(l, c) {
      var f, d, m, h;
      const u = Reflect.get(l, c);
      return c === "class" || c === "style" ? [(f = r.value) == null ? void 0 : f[c], u].filter(g => g != null) : typeof c == "string" && !rp(s.vnode, c) ? ((d = r.value) == null ? void 0 : d[c]) ?? ((h = (m = n.value) == null ? void 0 : m.global) == null ? void 0 : h[c]) ?? u : u
    }
  }), i = pe();
  sr(() => {
    if (r.value) {
      const l = Object.entries(r.value).filter(c => {
        let [u] = c;
        return u.startsWith(u[0].toUpperCase())
      });
      i.value = l.length ? Object.fromEntries(l) : void 0
    } else i.value = void 0
  });

  function a() {
    const l = ap(cs, s);
    Ye(cs, b(() => i.value ? St((l == null ? void 0 : l.value) ?? {}, i.value) : l == null ? void 0 : l.value))
  }

  return {props: o, provideSubDefaults: a}
}

function ys(e) {
  if (e._setup = e._setup ?? e.setup, !e.name) return e;
  if (e._setup) {
    e.props = G(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter(n => n !== "class" && n !== "style");
    e.filterProps = function (s) {
      return Cf(s, t)
    }, e.props._as = String, e.setup = function (s, r) {
      const o = wa();
      if (!o.value) return e._setup(s, r);
      const {props: i, provideSubDefaults: a} = op(s, s._as ?? e.name, o), l = e._setup(i, r);
      return a(), l
    }
  }
  return e
}

function ae() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return t => (e ? ys : Ke)(t)
}

function bs(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div",
      n = arguments.length > 2 ? arguments[2] : void 0;
  return ae()({
    name: n ?? gs(Et(e.replace(/__/g, "-"))),
    props: {tag: {type: String, default: t}, ...ye()},
    setup(s, r) {
      let {slots: o} = r;
      return () => {
        var i;
        return En(s.tag, {class: [e, s.class], style: s.style}, (i = o.default) == null ? void 0 : i.call(o))
      }
    }
  })
}

const ip = "cubic-bezier(0.4, 0, 0.2, 1)", xw = "cubic-bezier(0.0, 0, 0.2, 1)", Aw = "cubic-bezier(0.4, 0, 1, 1)";

function Qe(e, t) {
  const n = po();
  if (!n) throw new Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
  return n
}

function zt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Qe(e).type;
  return zn((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name))
}

let Bf = 0, kr = new WeakMap;

function It() {
  const e = Qe("getUid");
  if (kr.has(e)) return kr.get(e);
  {
    const t = Bf++;
    return kr.set(e, t), t
  }
}

It.reset = () => {
  Bf = 0, kr = new WeakMap
};

function ap(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Qe("injectSelf");
  const {provides: n} = t;
  if (n && e in n) return n[e]
}

function fe(e) {
  const t = Qe("useRender");
  t.render = e
}

function it(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : f => f,
      r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : f => f;
  const o = Qe("useProxiedModel"), i = Z(e[t] !== void 0 ? e[t] : n), a = zn(t), c = b(a !== t ? () => {
    var f, d, m, h;
    return e[t], !!(((f = o.vnode.props) != null && f.hasOwnProperty(t) || (d = o.vnode.props) != null && d.hasOwnProperty(a)) && ((m = o.vnode.props) != null && m.hasOwnProperty(`onUpdate:${t}`) || (h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${a}`)))
  } : () => {
    var f, d;
    return e[t], !!((f = o.vnode.props) != null && f.hasOwnProperty(t) && ((d = o.vnode.props) != null && d.hasOwnProperty(`onUpdate:${t}`)))
  });
  as(() => !c.value, () => {
    Ee(() => e[t], f => {
      i.value = f
    })
  });
  const u = b({
    get() {
      const f = e[t];
      return s(c.value ? f : i.value)
    }, set(f) {
      const d = r(f), m = ie(c.value ? e[t] : i.value);
      m === d || s(m) === f || (i.value = d, o == null || o.emit(`update:${t}`, d))
    }
  });
  return Object.defineProperty(u, "externalValue", {get: () => c.value ? e[t] : i.value}), u
}

const eu = "$vuetify.", tu = (e, t) => e.replace(/\{(\d+)\}/g, (n, s) => String(t[+s])),
    Lf = (e, t, n) => function (s) {
      for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) o[i - 1] = arguments[i];
      if (!s.startsWith(eu)) return tu(s, o);
      const a = s.replace(eu, ""), l = e.value && n.value[e.value], c = t.value && n.value[t.value];
      let u = xi(l, a, null);
      return u || (`${s}${e.value}`, u = xi(c, a, null)), u || (u = s), typeof u != "string" && (u = s), tu(u, o)
    };

function Mf(e, t) {
  return (n, s) => new Intl.NumberFormat([e.value, t.value], s).format(n)
}

function ei(e, t, n) {
  const s = it(e, t, e[t] ?? n.value);
  return s.value = e[t] ?? n.value, Ee(n, r => {
    e[t] == null && (s.value = n.value)
  }), s
}

function $f(e) {
  return t => {
    const n = ei(t, "locale", e.current), s = ei(t, "fallback", e.fallback), r = ei(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: s,
      messages: r,
      t: Lf(n, s, r),
      n: Mf(n, s),
      provide: $f({current: n, fallback: s, messages: r})
    }
  }
}

function lp(e) {
  const t = pe((e == null ? void 0 : e.locale) ?? "en"), n = pe((e == null ? void 0 : e.fallback) ?? "en"),
      s = Z({en: hg, ...e == null ? void 0 : e.messages});
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: s,
    t: Lf(t, n, s),
    n: Mf(t, n),
    provide: $f({current: t, fallback: n, messages: s})
  }
}

const Kr = Symbol.for("vuetify:locale");

function up(e) {
  return e.name != null
}

function cp(e) {
  const t = e != null && e.adapter && up(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : lp(e),
      n = dp(t, e);
  return {...t, ...n}
}

function fp() {
  const e = Pe(Kr);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e
}

function dp(e, t) {
  const n = Z((t == null ? void 0 : t.rtl) ?? mg), s = b(() => n.value[e.current.value] ?? !1);
  return {isRtl: s, rtl: n, rtlClasses: b(() => `v-locale--is-${s.value ? "rtl" : "ltr"}`)}
}

function xn() {
  const e = Pe(Kr);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {isRtl: e.isRtl, rtlClasses: e.rtlClasses}
}

const Ri = {
  "001": 1,
  AD: 1,
  AE: 6,
  AF: 6,
  AG: 0,
  AI: 1,
  AL: 1,
  AM: 1,
  AN: 1,
  AR: 1,
  AS: 0,
  AT: 1,
  AU: 1,
  AX: 1,
  AZ: 1,
  BA: 1,
  BD: 0,
  BE: 1,
  BG: 1,
  BH: 6,
  BM: 1,
  BN: 1,
  BR: 0,
  BS: 0,
  BT: 0,
  BW: 0,
  BY: 1,
  BZ: 0,
  CA: 0,
  CH: 1,
  CL: 1,
  CM: 1,
  CN: 1,
  CO: 0,
  CR: 1,
  CY: 1,
  CZ: 1,
  DE: 1,
  DJ: 6,
  DK: 1,
  DM: 0,
  DO: 0,
  DZ: 6,
  EC: 1,
  EE: 1,
  EG: 6,
  ES: 1,
  ET: 0,
  FI: 1,
  FJ: 1,
  FO: 1,
  FR: 1,
  GB: 1,
  "GB-alt-variant": 0,
  GE: 1,
  GF: 1,
  GP: 1,
  GR: 1,
  GT: 0,
  GU: 0,
  HK: 0,
  HN: 0,
  HR: 1,
  HU: 1,
  ID: 0,
  IE: 1,
  IL: 0,
  IN: 0,
  IQ: 6,
  IR: 6,
  IS: 1,
  IT: 1,
  JM: 0,
  JO: 6,
  JP: 0,
  KE: 0,
  KG: 1,
  KH: 0,
  KR: 0,
  KW: 6,
  KZ: 1,
  LA: 0,
  LB: 1,
  LI: 1,
  LK: 1,
  LT: 1,
  LU: 1,
  LV: 1,
  LY: 6,
  MC: 1,
  MD: 1,
  ME: 1,
  MH: 0,
  MK: 1,
  MM: 0,
  MN: 1,
  MO: 0,
  MQ: 1,
  MT: 0,
  MV: 5,
  MX: 0,
  MY: 1,
  MZ: 0,
  NI: 0,
  NL: 1,
  NO: 1,
  NP: 0,
  NZ: 1,
  OM: 6,
  PA: 0,
  PE: 0,
  PH: 0,
  PK: 0,
  PL: 1,
  PR: 0,
  PT: 0,
  PY: 0,
  QA: 6,
  RE: 1,
  RO: 1,
  RS: 1,
  RU: 1,
  SA: 0,
  SD: 6,
  SE: 1,
  SG: 0,
  SI: 1,
  SK: 1,
  SM: 1,
  SV: 0,
  SY: 6,
  TH: 0,
  TJ: 1,
  TM: 1,
  TR: 1,
  TT: 0,
  TW: 0,
  UA: 1,
  UM: 0,
  US: 0,
  UY: 1,
  UZ: 1,
  VA: 1,
  VE: 0,
  VI: 0,
  VN: 1,
  WS: 0,
  XK: 1,
  YE: 0,
  ZA: 0,
  ZW: 0
};

function hp(e, t) {
  const n = [];
  let s = [];
  const r = Nf(e), o = Df(e), i = (r.getDay() - Ri[t.slice(-2).toUpperCase()] + 7) % 7,
      a = (o.getDay() - Ri[t.slice(-2).toUpperCase()] + 7) % 7;
  for (let l = 0; l < i; l++) {
    const c = new Date(r);
    c.setDate(c.getDate() - (i - l)), s.push(c)
  }
  for (let l = 1; l <= o.getDate(); l++) {
    const c = new Date(e.getFullYear(), e.getMonth(), l);
    s.push(c), s.length === 7 && (n.push(s), s = [])
  }
  for (let l = 1; l < 7 - a; l++) {
    const c = new Date(o);
    c.setDate(c.getDate() + l), s.push(c)
  }
  return s.length > 0 && n.push(s), n
}

function mp(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0;) t.setDate(t.getDate() - 1);
  return t
}

function vp(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6;) t.setDate(t.getDate() + 1);
  return t
}

function Nf(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1)
}

function Df(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0)
}

function gp(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2])
}

const pp = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;

function Ff(e) {
  if (e == null) return new Date;
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (pp.test(e)) return gp(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t)
  }
  return null
}

const nu = new Date(2e3, 0, 2);

function yp(e) {
  const t = Ri[e.slice(-2).toUpperCase()];
  return wf(7).map(n => {
    const s = new Date(nu);
    s.setDate(nu.getDate() + t + n);
    const r = new Intl.DateTimeFormat(e, {weekday: "short"}).format(s);
    return r.charAt(0).toUpperCase() + r.slice(1)
  })
}

function bp(e, t, n, s) {
  const r = Ff(e) ?? new Date, o = s == null ? void 0 : s[t];
  if (typeof o == "function") return o(r, t, n);
  let i = {};
  switch (t) {
    case"fullDateWithWeekday":
      i = {weekday: "long", day: "numeric", month: "long", year: "numeric"};
      break;
    case"hours12h":
      i = {hour: "numeric", hour12: !0};
      break;
    case"normalDateWithWeekday":
      i = {weekday: "short", day: "numeric", month: "short"};
      break;
    case"keyboardDate":
      i = {day: "2-digit", month: "2-digit", year: "numeric"};
      break;
    case"monthAndDate":
      i = {month: "long", day: "numeric"};
      break;
    case"monthAndYear":
      i = {month: "long", year: "numeric"};
      break;
    case"month":
      i = {month: "long"};
      break;
    case"monthShort":
      i = {month: "short"};
      break;
    case"dayOfMonth":
      i = {day: "numeric"};
      break;
    case"shortDate":
      i = {year: "2-digit", month: "numeric", day: "numeric"};
      break;
    case"weekdayShort":
      i = {weekday: "short"};
      break;
    case"year":
      i = {year: "numeric"};
      break;
    default:
      i = o ?? {timeZone: "UTC", timeZoneName: "short"}
  }
  return new Intl.DateTimeFormat(n, i).format(r)
}

function Sp(e, t) {
  const n = e.toJsDate(t), s = n.getFullYear(), r = jl(String(n.getMonth() + 1), 2, "0"),
      o = jl(String(n.getDate()), 2, "0");
  return `${s}-${r}-${o}`
}

function _p(e) {
  const [t, n, s] = e.split("-").map(Number);
  return new Date(t, n - 1, s)
}

function wp(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n
}

function Cp(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n
}

function Ep(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n
}

function xp(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n
}

function Ap(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n
}

function Tp(e) {
  return e.getFullYear()
}

function Pp(e) {
  return e.getMonth()
}

function Rp(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1)
}

function Op(e) {
  return e.getHours()
}

function kp(e) {
  return e.getMinutes()
}

function Ip(e) {
  return new Date(e.getFullYear(), 0, 1)
}

function Vp(e) {
  return new Date(e.getFullYear(), 11, 31)
}

function Bp(e, t) {
  return Oi(e, t[0]) && Mp(e, t[1])
}

function Lp(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime())
}

function Oi(e, t) {
  return e.getTime() > t.getTime()
}

function Mp(e, t) {
  return e.getTime() < t.getTime()
}

function su(e, t) {
  return e.getTime() === t.getTime()
}

function $p(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear()
}

function Np(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear()
}

function Dp(e, t, n) {
  const s = new Date(e), r = new Date(t);
  return n === "month" ? s.getMonth() - r.getMonth() + (s.getFullYear() - r.getFullYear()) * 12 : Math.floor((s.getTime() - r.getTime()) / (1e3 * 60 * 60 * 24))
}

function Fp(e, t) {
  const n = new Date(e);
  return n.setHours(t), n
}

function Hp(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n
}

function jp(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n
}

function Up(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n
}

function zp(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate())
}

function Wp(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999)
}

class Kp {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats
  }

  date(t) {
    return Ff(t)
  }

  toJsDate(t) {
    return t
  }

  toISO(t) {
    return Sp(this, t)
  }

  parseISO(t) {
    return _p(t)
  }

  addMinutes(t, n) {
    return wp(t, n)
  }

  addHours(t, n) {
    return Cp(t, n)
  }

  addDays(t, n) {
    return Ep(t, n)
  }

  addWeeks(t, n) {
    return xp(t, n)
  }

  addMonths(t, n) {
    return Ap(t, n)
  }

  getWeekArray(t) {
    return hp(t, this.locale)
  }

  startOfWeek(t) {
    return mp(t)
  }

  endOfWeek(t) {
    return vp(t)
  }

  startOfMonth(t) {
    return Nf(t)
  }

  endOfMonth(t) {
    return Df(t)
  }

  format(t, n) {
    return bp(t, n, this.locale, this.formats)
  }

  isEqual(t, n) {
    return su(t, n)
  }

  isValid(t) {
    return Lp(t)
  }

  isWithinRange(t, n) {
    return Bp(t, n)
  }

  isAfter(t, n) {
    return Oi(t, n)
  }

  isBefore(t, n) {
    return !Oi(t, n) && !su(t, n)
  }

  isSameDay(t, n) {
    return $p(t, n)
  }

  isSameMonth(t, n) {
    return Np(t, n)
  }

  setMinutes(t, n) {
    return Hp(t, n)
  }

  setHours(t, n) {
    return Fp(t, n)
  }

  setMonth(t, n) {
    return jp(t, n)
  }

  setYear(t, n) {
    return Up(t, n)
  }

  getDiff(t, n, s) {
    return Dp(t, n, s)
  }

  getWeekdays() {
    return yp(this.locale)
  }

  getYear(t) {
    return Tp(t)
  }

  getMonth(t) {
    return Pp(t)
  }

  getNextMonth(t) {
    return Rp(t)
  }

  getHours(t) {
    return Op(t)
  }

  getMinutes(t) {
    return kp(t)
  }

  startOfDay(t) {
    return zp(t)
  }

  endOfDay(t) {
    return Wp(t)
  }

  startOfYear(t) {
    return Ip(t)
  }

  endOfYear(t) {
    return Vp(t)
  }
}

const Gp = Symbol.for("vuetify:date-options"), ru = Symbol.for("vuetify:date-adapter");

function qp(e, t) {
  const n = St({
    adapter: Kp,
    locale: {
      af: "af-ZA",
      bg: "bg-BG",
      ca: "ca-ES",
      ckb: "",
      cs: "cs-CZ",
      de: "de-DE",
      el: "el-GR",
      en: "en-US",
      et: "et-EE",
      fa: "fa-IR",
      fi: "fi-FI",
      hr: "hr-HR",
      hu: "hu-HU",
      he: "he-IL",
      id: "id-ID",
      it: "it-IT",
      ja: "ja-JP",
      ko: "ko-KR",
      lv: "lv-LV",
      lt: "lt-LT",
      nl: "nl-NL",
      no: "no-NO",
      pl: "pl-PL",
      pt: "pt-PT",
      ro: "ro-RO",
      ru: "ru-RU",
      sk: "sk-SK",
      sl: "sl-SI",
      srCyrl: "sr-SP",
      srLatn: "sr-SP",
      sv: "sv-SE",
      th: "th-TH",
      tr: "tr-TR",
      az: "az-AZ",
      uk: "uk-UA",
      vi: "vi-VN",
      zhHans: "zh-CN",
      zhHant: "zh-TW"
    }
  }, e);
  return {options: n, instance: Yp(n, t)}
}

function Yp(e, t) {
  const n = ze(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return Ee(t.current, s => {
    n.locale = e.locale[s] ?? s ?? n.locale
  }), n
}

const Tw = ["sm", "md", "lg", "xl", "xxl"], ki = Symbol.for("vuetify:display"),
    ou = {mobileBreakpoint: "lg", thresholds: {xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560}},
    Jp = function () {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ou;
      return St(ou, e)
    };

function iu(e) {
  return tt && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0
}

function au(e) {
  return tt && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0
}

function lu(e) {
  const t = tt && !e ? window.navigator.userAgent : "ssr";

  function n(h) {
    return !!t.match(h)
  }

  const s = n(/android/i), r = n(/iphone|ipad|ipod/i), o = n(/cordova/i), i = n(/electron/i), a = n(/chrome/i),
      l = n(/edge/i), c = n(/firefox/i), u = n(/opera/i), f = n(/win/i), d = n(/mac/i), m = n(/linux/i);
  return {
    android: s,
    ios: r,
    cordova: o,
    electron: i,
    chrome: a,
    edge: l,
    firefox: c,
    opera: u,
    win: f,
    mac: d,
    linux: m,
    touch: vg,
    ssr: t === "ssr"
  }
}

function Xp(e, t) {
  const {thresholds: n, mobileBreakpoint: s} = Jp(e), r = pe(au(t)), o = pe(lu(t)), i = ze({}), a = pe(iu(t));

  function l() {
    r.value = au(), a.value = iu()
  }

  function c() {
    l(), o.value = lu()
  }

  return sr(() => {
    const u = a.value < n.sm, f = a.value < n.md && !u, d = a.value < n.lg && !(f || u),
        m = a.value < n.xl && !(d || f || u), h = a.value < n.xxl && !(m || d || f || u), g = a.value >= n.xxl,
        w = u ? "xs" : f ? "sm" : d ? "md" : m ? "lg" : h ? "xl" : "xxl", S = typeof s == "number" ? s : n[s],
        _ = a.value < S;
    i.xs = u, i.sm = f, i.md = d, i.lg = m, i.xl = h, i.xxl = g, i.smAndUp = !u, i.mdAndUp = !(u || f), i.lgAndUp = !(u || f || d), i.xlAndUp = !(u || f || d || m), i.smAndDown = !(d || m || h || g), i.mdAndDown = !(m || h || g), i.lgAndDown = !(h || g), i.xlAndDown = !g, i.name = w, i.height = r.value, i.width = a.value, i.mobile = _, i.mobileBreakpoint = s, i.platform = o.value, i.thresholds = n
  }), tt && window.addEventListener("resize", l, {passive: !0}), {...uo(i), update: c, ssr: !!t}
}

const Zp = G({mobileBreakpoint: [Number, String]}, "display");

function Qp() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  const n = Pe(ki);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const s = b(() => {
    if (!e.mobileBreakpoint) return n.mobile.value;
    const o = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < o
  }), r = b(() => t ? {[`${t}--mobile`]: s.value} : {});
  return {...n, displayClasses: r, mobile: s}
}

const ey = {
      collapse: "mdi-chevron-up",
      complete: "mdi-check",
      cancel: "mdi-close-circle",
      close: "mdi-close",
      delete: "mdi-close-circle",
      clear: "mdi-close-circle",
      success: "mdi-check-circle",
      info: "mdi-information",
      warning: "mdi-alert-circle",
      error: "mdi-close-circle",
      prev: "mdi-chevron-left",
      next: "mdi-chevron-right",
      checkboxOn: "mdi-checkbox-marked",
      checkboxOff: "mdi-checkbox-blank-outline",
      checkboxIndeterminate: "mdi-minus-box",
      delimiter: "mdi-circle",
      sortAsc: "mdi-arrow-up",
      sortDesc: "mdi-arrow-down",
      expand: "mdi-chevron-down",
      menu: "mdi-menu",
      subgroup: "mdi-menu-down",
      dropdown: "mdi-menu-down",
      radioOn: "mdi-radiobox-marked",
      radioOff: "mdi-radiobox-blank",
      edit: "mdi-pencil",
      ratingEmpty: "mdi-star-outline",
      ratingFull: "mdi-star",
      ratingHalf: "mdi-star-half-full",
      loading: "mdi-cached",
      first: "mdi-page-first",
      last: "mdi-page-last",
      unfold: "mdi-unfold-more-horizontal",
      file: "mdi-paperclip",
      plus: "mdi-plus",
      minus: "mdi-minus",
      calendar: "mdi-calendar",
      eyeDropper: "mdi-eyedropper"
    }, ty = {component: e => En(jf, {...e, class: "mdi"})}, Le = [String, Function, Object, Array],
    Ii = Symbol.for("vuetify:icons"), _o = G({icon: {type: Le}, tag: {type: String, required: !0}}, "icon"), uu = ae()({
      name: "VComponentIcon", props: _o(), setup(e, t) {
        let {slots: n} = t;
        return () => {
          const s = e.icon;
          return v(e.tag, null, {
            default: () => {
              var r;
              return [e.icon ? v(s, null, null) : (r = n.default) == null ? void 0 : r.call(n)]
            }
          })
        }
      }
    }), Hf = ys({
      name: "VSvgIcon", inheritAttrs: !1, props: _o(), setup(e, t) {
        let {attrs: n} = t;
        return () => v(e.tag, $e(n, {style: null}), {
          default: () => [v("svg", {
            class: "v-icon__svg",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            role: "img",
            "aria-hidden": "true"
          }, [Array.isArray(e.icon) ? e.icon.map(s => Array.isArray(s) ? v("path", {
            d: s[0],
            "fill-opacity": s[1]
          }, null) : v("path", {d: s}, null)) : v("path", {d: e.icon}, null)])]
        })
      }
    });
ys({
  name: "VLigatureIcon", props: _o(), setup(e) {
    return () => v(e.tag, null, {default: () => [e.icon]})
  }
});
const jf = ys({
  name: "VClassIcon", props: _o(), setup(e) {
    return () => v(e.tag, {class: e.icon}, null)
  }
}), ny = {svg: {component: Hf}, class: {component: jf}};

function sy(e) {
  return St({
    defaultSet: "mdi",
    sets: {...ny, mdi: ty},
    aliases: {
      ...ey,
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", .6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
    }
  }, e)
}

const ry = e => {
  const t = Pe(Ii);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: b(() => {
      var l;
      const s = be(e);
      if (!s) return {component: uu};
      let r = s;
      if (typeof r == "string" && (r = r.trim(), r.startsWith("$") && (r = (l = t.aliases) == null ? void 0 : l[r.slice(1)])), !r) throw new Error(`Could not find aliased icon "${s}"`);
      if (Array.isArray(r)) return {component: Hf, icon: r};
      if (typeof r != "string") return {component: uu, icon: r};
      const o = Object.keys(t.sets).find(c => typeof r == "string" && r.startsWith(`${c}:`)),
          i = o ? r.slice(o.length + 1) : r;
      return {component: t.sets[o ?? t.defaultSet].component, icon: i}
    })
  }
}, Gr = Symbol.for("vuetify:theme"), Je = G({theme: String}, "theme");

function cu() {
  return {
    defaultTheme: "light", variations: {colors: [], lighten: 0, darken: 0}, themes: {
      light: {
        dark: !1,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-bright": "#FFFFFF",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#1867C0",
          "primary-darken-1": "#1F5592",
          secondary: "#48A9A6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#000000",
          "border-opacity": .12,
          "high-emphasis-opacity": .87,
          "medium-emphasis-opacity": .6,
          "disabled-opacity": .38,
          "idle-opacity": .04,
          "hover-opacity": .04,
          "focus-opacity": .12,
          "selected-opacity": .08,
          "activated-opacity": .12,
          "pressed-opacity": .12,
          "dragged-opacity": .08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#F5F5F5",
          "theme-on-code": "#000000"
        }
      },
      dark: {
        dark: !0,
        colors: {
          background: "#121212",
          surface: "#212121",
          "surface-bright": "#ccbfd6",
          "surface-variant": "#a3a3a3",
          "on-surface-variant": "#424242",
          primary: "#2196F3",
          "primary-darken-1": "#277CC1",
          secondary: "#54B6B2",
          "secondary-darken-1": "#48A9A6",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#FFFFFF",
          "border-opacity": .12,
          "high-emphasis-opacity": 1,
          "medium-emphasis-opacity": .7,
          "disabled-opacity": .5,
          "idle-opacity": .1,
          "hover-opacity": .04,
          "focus-opacity": .12,
          "selected-opacity": .08,
          "activated-opacity": .12,
          "pressed-opacity": .16,
          "dragged-opacity": .08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#343434",
          "theme-on-code": "#CCCCCC"
        }
      }
    }
  }
}

function oy() {
  var s, r;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : cu();
  const t = cu();
  if (!e) return {...t, isDisabled: !0};
  const n = {};
  for (const [o, i] of Object.entries(e.themes ?? {})) {
    const a = i.dark || o === "dark" ? (s = t.themes) == null ? void 0 : s.dark : (r = t.themes) == null ? void 0 : r.light;
    n[o] = St(a, i)
  }
  return St(t, {...e, themes: n})
}

function iy(e) {
  const t = oy(e), n = Z(t.defaultTheme), s = Z(t.themes), r = b(() => {
    const u = {};
    for (const [f, d] of Object.entries(s.value)) {
      const m = u[f] = {...d, colors: {...d.colors}};
      if (t.variations) for (const h of t.variations.colors) {
        const g = m.colors[h];
        if (g) for (const w of ["lighten", "darken"]) {
          const S = w === "lighten" ? ep : tp;
          for (const _ of wf(t.variations[w], 1)) m.colors[`${h}-${w}-${_}`] = Xg(S(Dt(g), _))
        }
      }
      for (const h of Object.keys(m.colors)) {
        if (/^on-[a-z]/.test(h) || m.colors[`on-${h}`]) continue;
        const g = `on-${h}`, w = Dt(m.colors[h]);
        m.colors[g] = Vf(w)
      }
    }
    return u
  }), o = b(() => r.value[n.value]), i = b(() => {
    const u = [];
    o.value.dark && Ln(u, ":root", ["color-scheme: dark"]), Ln(u, ":root", fu(o.value));
    for (const [h, g] of Object.entries(r.value)) Ln(u, `.v-theme--${h}`, [`color-scheme: ${g.dark ? "dark" : "normal"}`, ...fu(g)]);
    const f = [], d = [], m = new Set(Object.values(r.value).flatMap(h => Object.keys(h.colors)));
    for (const h of m) /^on-[a-z]/.test(h) ? Ln(d, `.${h}`, [`color: rgb(var(--v-theme-${h})) !important`]) : (Ln(f, `.bg-${h}`, [`--v-theme-overlay-multiplier: var(--v-theme-${h}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${h})) !important`, `color: rgb(var(--v-theme-on-${h})) !important`]), Ln(d, `.text-${h}`, [`color: rgb(var(--v-theme-${h})) !important`]), Ln(d, `.border-${h}`, [`--v-border-color: var(--v-theme-${h})`]));
    return u.push(...f, ...d), u.map((h, g) => g === 0 ? h : `    ${h}`).join("")
  });

  function a() {
    return {style: [{children: i.value, id: "vuetify-theme-stylesheet", nonce: t.cspNonce || !1}]}
  }

  function l(u) {
    if (t.isDisabled) return;
    const f = u._context.provides.usehead;
    if (f) if (f.push) {
      const d = f.push(a);
      tt && Ee(i, () => {
        d.patch(a)
      })
    } else tt ? (f.addHeadObjs(b(a)), sr(() => f.updateDOM())) : f.addHeadObjs(a()); else {
      let m = function () {
        if (typeof document < "u" && !d) {
          const h = document.createElement("style");
          h.type = "text/css", h.id = "vuetify-theme-stylesheet", t.cspNonce && h.setAttribute("nonce", t.cspNonce), d = h, document.head.appendChild(d)
        }
        d && (d.innerHTML = i.value)
      }, d = tt ? document.getElementById("vuetify-theme-stylesheet") : null;
      tt ? Ee(i, m, {immediate: !0}) : m()
    }
  }

  const c = b(() => t.isDisabled ? void 0 : `v-theme--${n.value}`);
  return {
    install: l,
    isDisabled: t.isDisabled,
    name: n,
    themes: s,
    current: o,
    computedThemes: r,
    themeClasses: c,
    styles: i,
    global: {name: n, current: o}
  }
}

function st(e) {
  Qe("provideTheme");
  const t = Pe(Gr, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = b(() => e.theme ?? t.name.value), s = b(() => t.themes.value[n.value]),
      r = b(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {...t, name: n, current: s, themeClasses: r};
  return Ye(Gr, o), o
}

function Ln(e, t, n) {
  e.push(`${t} {
`, ...n.map(s => `  ${s};
`), `}
`)
}

function fu(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, s = [];
  for (const [r, o] of Object.entries(e.colors)) {
    const i = Dt(o);
    s.push(`--v-theme-${r}: ${i.r},${i.g},${i.b}`), r.startsWith("on-") || s.push(`--v-theme-${r}-overlay-multiplier: ${np(o) > .18 ? t : n}`)
  }
  for (const [r, o] of Object.entries(e.variables)) {
    const i = typeof o == "string" && o.startsWith("#") ? Dt(o) : void 0, a = i ? `${i.r}, ${i.g}, ${i.b}` : void 0;
    s.push(`--v-${r}: ${a ?? o}`)
  }
  return s
}

function Uf(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = Z(), s = Z();
  if (tt) {
    const r = new ResizeObserver(o => {
      e == null || e(o, r), o.length && (t === "content" ? s.value = o[0].contentRect : s.value = o[0].target.getBoundingClientRect())
    });
    vt(() => {
      r.disconnect()
    }), Ee(n, (o, i) => {
      i && (r.unobserve(Nl(i)), s.value = void 0), o && r.observe(Nl(o))
    }, {flush: "post"})
  }
  return {resizeRef: n, contentRect: ao(s)}
}

const qr = Symbol.for("vuetify:layout"), zf = Symbol.for("vuetify:layout-item"), du = 1e3,
    ay = G({overlaps: {type: Array, default: () => []}, fullHeight: Boolean}, "layout"),
    ly = G({name: {type: String}, order: {type: [Number, String], default: 0}, absolute: Boolean}, "layout-item");

function uy() {
  const e = Pe(qr);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {getLayoutItem: e.getLayoutItem, mainRect: e.mainRect, mainStyles: e.mainStyles}
}

function cy(e) {
  const t = Pe(qr);
  if (!t) throw new Error("[Vuetify] Could not find injected layout");
  const n = e.id ?? `layout-item-${It()}`, s = Qe("useLayoutItem");
  Ye(zf, {id: n});
  const r = pe(!1);
  Kc(() => r.value = !0), Wc(() => r.value = !1);
  const {layoutItemStyles: o, layoutItemScrimStyles: i} = t.register(s, {
    ...e,
    active: b(() => r.value ? !1 : e.active.value),
    id: n
  });
  return vt(() => t.unregister(n)), {layoutItemStyles: o, layoutRect: t.layoutRect, layoutItemScrimStyles: i}
}

const fy = (e, t, n, s) => {
  let r = {top: 0, left: 0, right: 0, bottom: 0};
  const o = [{id: "", layer: {...r}}];
  for (const i of e) {
    const a = t.get(i), l = n.get(i), c = s.get(i);
    if (!a || !l || !c) continue;
    const u = {...r, [a.value]: parseInt(r[a.value], 10) + (c.value ? parseInt(l.value, 10) : 0)};
    o.push({id: i, layer: u}), r = u
  }
  return o
};

function dy(e) {
  const t = Pe(qr, null), n = b(() => t ? t.rootZIndex.value - 100 : du), s = Z([]), r = ze(new Map), o = ze(new Map),
      i = ze(new Map), a = ze(new Map), l = ze(new Map), {resizeRef: c, contentRect: u} = Uf(), f = b(() => {
        const x = new Map, B = e.overlaps ?? [];
        for (const E of B.filter(C => C.includes(":"))) {
          const [C, P] = E.split(":");
          if (!s.value.includes(C) || !s.value.includes(P)) continue;
          const F = r.get(C), M = r.get(P), z = o.get(C), te = o.get(P);
          !F || !M || !z || !te || (x.set(P, {
            position: F.value,
            amount: parseInt(z.value, 10)
          }), x.set(C, {position: M.value, amount: -parseInt(te.value, 10)}))
        }
        return x
      }), d = b(() => {
        const x = [...new Set([...i.values()].map(E => E.value))].sort((E, C) => E - C), B = [];
        for (const E of x) {
          const C = s.value.filter(P => {
            var F;
            return ((F = i.get(P)) == null ? void 0 : F.value) === E
          });
          B.push(...C)
        }
        return fy(B, r, o, a)
      }), m = b(() => !Array.from(l.values()).some(x => x.value)), h = b(() => d.value[d.value.length - 1].layer),
      g = b(() => ({
        "--v-layout-left": he(h.value.left),
        "--v-layout-right": he(h.value.right),
        "--v-layout-top": he(h.value.top),
        "--v-layout-bottom": he(h.value.bottom), ...m.value ? void 0 : {transition: "none"}
      })), w = b(() => d.value.slice(1).map((x, B) => {
        let {id: E} = x;
        const {layer: C} = d.value[B], P = o.get(E), F = r.get(E);
        return {id: E, ...C, size: Number(P.value), position: F.value}
      })), S = x => w.value.find(B => B.id === x), _ = Qe("createLayout"), T = pe(!1);
  Ut(() => {
    T.value = !0
  }), Ye(qr, {
    register: (x, B) => {
      let {
        id: E,
        order: C,
        position: P,
        layoutSize: F,
        elementSize: M,
        active: z,
        disableTransitions: te,
        absolute: se
      } = B;
      i.set(E, C), r.set(E, P), o.set(E, F), a.set(E, z), te && l.set(E, te);
      const Q = Bs(zf, _ == null ? void 0 : _.vnode).indexOf(x);
      Q > -1 ? s.value.splice(Q, 0, E) : s.value.push(E);
      const q = b(() => w.value.findIndex(we => we.id === E)), Te = b(() => n.value + d.value.length * 2 - q.value * 2),
          de = b(() => {
            const we = P.value === "left" || P.value === "right", He = P.value === "right", qe = P.value === "bottom",
                pt = {
                  [P.value]: 0,
                  zIndex: Te.value,
                  transform: `translate${we ? "X" : "Y"}(${(z.value ? 0 : -110) * (He || qe ? -1 : 1)}%)`,
                  position: se.value || n.value !== du ? "absolute" : "fixed", ...m.value ? void 0 : {transition: "none"}
                };
            if (!T.value) return pt;
            const le = w.value[q.value];
            if (!le) throw new Error(`[Vuetify] Could not find layout item "${E}"`);
            const O = f.value.get(E);
            return O && (le[O.position] += O.amount), {
              ...pt,
              height: we ? `calc(100% - ${le.top}px - ${le.bottom}px)` : M.value ? `${M.value}px` : void 0,
              left: He ? void 0 : `${le.left}px`,
              right: He ? `${le.right}px` : void 0,
              top: P.value !== "bottom" ? `${le.top}px` : void 0,
              bottom: P.value !== "top" ? `${le.bottom}px` : void 0,
              width: we ? M.value ? `${M.value}px` : void 0 : `calc(100% - ${le.left}px - ${le.right}px)`
            }
          }), ke = b(() => ({zIndex: Te.value - 1}));
      return {layoutItemStyles: de, layoutItemScrimStyles: ke, zIndex: Te}
    }, unregister: x => {
      i.delete(x), r.delete(x), o.delete(x), a.delete(x), l.delete(x), s.value = s.value.filter(B => B !== x)
    }, mainRect: h, mainStyles: g, getLayoutItem: S, items: w, layoutRect: u, rootZIndex: n
  });
  const V = b(() => ["v-layout", {"v-layout--full-height": e.fullHeight}]),
      R = b(() => ({zIndex: t ? n.value : void 0, position: t ? "relative" : void 0, overflow: t ? "hidden" : void 0}));
  return {layoutClasses: V, layoutStyles: R, getLayoutItem: S, items: w, layoutRect: u, layoutRef: c}
}

function Wf() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {blueprint: t, ...n} = e, s = St(t, n), {aliases: r = {}, components: o = {}, directives: i = {}} = s,
      a = sp(s.defaults), l = Xp(s.display, s.ssr), c = iy(s.theme), u = sy(s.icons), f = cp(s.locale),
      d = qp(s.date, f);
  return {
    install: h => {
      for (const g in i) h.directive(g, i[g]);
      for (const g in o) h.component(g, o[g]);
      for (const g in r) h.component(g, ys({...r[g], name: g, aliasName: r[g].name}));
      if (c.install(h), h.provide(cs, a), h.provide(ki, l), h.provide(Gr, c), h.provide(Ii, u), h.provide(Kr, f), h.provide(Gp, d.options), h.provide(ru, d.instance), tt && s.ssr) if (h.$nuxt) h.$nuxt.hook("app:suspense:resolve", () => {
        l.update()
      }); else {
        const {mount: g} = h;
        h.mount = function () {
          const w = g(...arguments);
          return mt(() => l.update()), h.mount = g, w
        }
      }
      It.reset(), h.mixin({
        computed: {
          $vuetify() {
            return ze({
              defaults: Qn.call(this, cs),
              display: Qn.call(this, ki),
              theme: Qn.call(this, Gr),
              icons: Qn.call(this, Ii),
              locale: Qn.call(this, Kr),
              date: Qn.call(this, ru)
            })
          }
        }
      })
    }, defaults: a, display: l, theme: c, icons: u, locale: f, date: d
  }
}

const hy = "3.4.10";
Wf.version = hy;

function Qn(e) {
  var s, r;
  const t = this.$,
      n = ((s = t.parent) == null ? void 0 : s.provides) ?? ((r = t.vnode.appContext) == null ? void 0 : r.provides);
  if (n && e in n) return n[e]
}

const my = Wf({theme: {themes: {light: {colors: {}}}}}), vy = "modulepreload", gy = function (e) {
  return "/" + e
}, hu = {}, py = function (t, n, s) {
  let r = Promise.resolve();
  if (n && n.length > 0) {
    const o = document.getElementsByTagName("link");
    r = Promise.all(n.map(i => {
      if (i = gy(i), i in hu) return;
      hu[i] = !0;
      const a = i.endsWith(".css"), l = a ? '[rel="stylesheet"]' : "";
      if (!!s) for (let f = o.length - 1; f >= 0; f--) {
        const d = o[f];
        if (d.href === i && (!a || d.rel === "stylesheet")) return
      } else if (document.querySelector(`link[href="${i}"]${l}`)) return;
      const u = document.createElement("link");
      if (u.rel = a ? "stylesheet" : vy, a || (u.as = "script", u.crossOrigin = ""), u.href = i, document.head.appendChild(u), a) return new Promise((f, d) => {
        u.addEventListener("load", f), u.addEventListener("error", () => d(new Error(`Unable to preload CSS for ${i}`)))
      })
    }))
  }
  return r.then(() => t()).catch(o => {
    const i = new Event("vite:preloadError", {cancelable: !0});
    if (i.payload = o, window.dispatchEvent(i), !i.defaultPrevented) throw o
  })
};
var yy = !1;/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let Kf;
const wo = e => Kf = e, Gf = Symbol();

function Vi(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function"
}

var Ls;
(function (e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function"
})(Ls || (Ls = {}));

function by() {
  const e = ea(!0), t = e.run(() => Z({}));
  let n = [], s = [];
  const r = lo({
    install(o) {
      wo(r), r._a = o, o.provide(Gf, r), o.config.globalProperties.$pinia = r, s.forEach(i => n.push(i)), s = []
    }, use(o) {
      return !this._a && !yy ? s.push(o) : n.push(o), this
    }, _p: n, _a: null, _e: e, _s: new Map, state: t
  });
  return r
}

const qf = () => {
};

function mu(e, t, n, s = qf) {
  e.push(t);
  const r = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), s())
  };
  return !n && gc() && oo(r), r
}

function es(e, ...t) {
  e.slice().forEach(n => {
    n(...t)
  })
}

const Sy = e => e();

function Bi(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, s) => e.set(s, n)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const s = t[n], r = e[n];
    Vi(r) && Vi(s) && e.hasOwnProperty(n) && !Oe(s) && !Jt(s) ? e[n] = Bi(r, s) : e[n] = s
  }
  return e
}

const _y = Symbol();

function wy(e) {
  return !Vi(e) || !e.hasOwnProperty(_y)
}

const {assign: dn} = Object;

function Cy(e) {
  return !!(Oe(e) && e.effect)
}

function Ey(e, t, n, s) {
  const {state: r, actions: o, getters: i} = t, a = n.state.value[e];
  let l;

  function c() {
    a || (n.state.value[e] = r ? r() : {});
    const u = uo(n.state.value[e]);
    return dn(u, o, Object.keys(i || {}).reduce((f, d) => (f[d] = lo(b(() => {
      wo(n);
      const m = n._s.get(e);
      return i[d].call(m, m)
    })), f), {}))
  }

  return l = Yf(e, c, t, n, s, !0), l
}

function Yf(e, t, n = {}, s, r, o) {
  let i;
  const a = dn({actions: {}}, n), l = {deep: !0};
  let c, u, f = [], d = [], m;
  const h = s.state.value[e];
  !o && !h && (s.state.value[e] = {}), Z({});
  let g;

  function w(E) {
    let C;
    c = u = !1, typeof E == "function" ? (E(s.state.value[e]), C = {
      type: Ls.patchFunction,
      storeId: e,
      events: m
    }) : (Bi(s.state.value[e], E), C = {type: Ls.patchObject, payload: E, storeId: e, events: m});
    const P = g = Symbol();
    mt().then(() => {
      g === P && (c = !0)
    }), u = !0, es(f, C, s.state.value[e])
  }

  const S = o ? function () {
    const {state: C} = n, P = C ? C() : {};
    this.$patch(F => {
      dn(F, P)
    })
  } : qf;

  function _() {
    i.stop(), f = [], d = [], s._s.delete(e)
  }

  function T(E, C) {
    return function () {
      wo(s);
      const P = Array.from(arguments), F = [], M = [];

      function z(J) {
        F.push(J)
      }

      function te(J) {
        M.push(J)
      }

      es(d, {args: P, name: E, store: R, after: z, onError: te});
      let se;
      try {
        se = C.apply(this && this.$id === e ? this : R, P)
      } catch (J) {
        throw es(M, J), J
      }
      return se instanceof Promise ? se.then(J => (es(F, J), J)).catch(J => (es(M, J), Promise.reject(J))) : (es(F, se), se)
    }
  }

  const V = {
    _p: s, $id: e, $onAction: mu.bind(null, d), $patch: w, $reset: S, $subscribe(E, C = {}) {
      const P = mu(f, E, C.detached, () => F()), F = i.run(() => Ee(() => s.state.value[e], M => {
        (C.flush === "sync" ? u : c) && E({storeId: e, type: Ls.direct, events: m}, M)
      }, dn({}, l, C)));
      return P
    }, $dispose: _
  }, R = ze(V);
  s._s.set(e, R);
  const B = (s._a && s._a.runWithContext || Sy)(() => s._e.run(() => (i = ea()).run(t)));
  for (const E in B) {
    const C = B[E];
    if (Oe(C) && !Cy(C) || Jt(C)) o || (h && wy(C) && (Oe(C) ? C.value = h[E] : Bi(C, h[E])), s.state.value[e][E] = C); else if (typeof C == "function") {
      const P = T(E, C);
      B[E] = P, a.actions[E] = C
    }
  }
  return dn(R, B), dn(ie(R), B), Object.defineProperty(R, "$state", {
    get: () => s.state.value[e], set: E => {
      w(C => {
        dn(C, E)
      })
    }
  }), s._p.forEach(E => {
    dn(R, i.run(() => E({store: R, app: s._a, pinia: s, options: a})))
  }), h && o && n.hydrate && n.hydrate(R.$state, h), c = !0, u = !0, R
}

function xy(e, t, n) {
  let s, r;
  const o = typeof t == "function";
  typeof e == "string" ? (s = e, r = o ? n : t) : (r = e, s = e.id);

  function i(a, l) {
    const c = lv();
    return a = a || (c ? Pe(Gf, null) : null), a && wo(a), a = Kf, a._s.has(s) || (o ? Yf(s, t, r, a) : Ey(s, r, a)), a._s.get(s)
  }

  return i.$id = s, i
}

function Li(e) {
  {
    e = ie(e);
    const t = {};
    for (const n in e) {
      const s = e[n];
      (Oe(s) || Jt(s)) && (t[n] = ue(e, n))
    }
    return t
  }
}

const rn = xy("app", {
  state: () => ({title: "概览", user: {token: "", uid: 0, tuid: 0, username: "", permission: ""}}),
  actions: {
    set_title(e) {
      this.title = e
    }, set_token_login(e, t) {
      let n = `${e}:${t}`;
      this.user.token = `Basic ${window.btoa(n)}`
    }, set_token_access(e) {
      this.user.token = "Bearer " + e
    }, set_user(e) {
      this.user.uid = e.uid, this.user.tuid = e.tuid, this.user.username = e.username, this.user.permission = e.permission
    }
  },
  persist: {storage: window.localStorage, paths: ["user.token"]}
});

function Jf(e, t) {
  return function () {
    return e.apply(t, arguments)
  }
}

const {toString: Ay} = Object.prototype, {getPrototypeOf: Ca} = Object, Co = (e => t => {
      const n = Ay.call(t);
      return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
    })(Object.create(null)), Wt = e => (e = e.toLowerCase(), t => Co(t) === e),
    Eo = e => t => typeof t === e, {isArray: Ss} = Array, Gs = Eo("undefined");

function Ty(e) {
  return e !== null && !Gs(e) && e.constructor !== null && !Gs(e.constructor) && wt(e.constructor.isBuffer) && e.constructor.isBuffer(e)
}

const Xf = Wt("ArrayBuffer");

function Py(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Xf(e.buffer), t
}

const Ry = Eo("string"), wt = Eo("function"), Zf = Eo("number"), xo = e => e !== null && typeof e == "object",
    Oy = e => e === !0 || e === !1, Ir = e => {
      if (Co(e) !== "object") return !1;
      const t = Ca(e);
      return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
    }, ky = Wt("Date"), Iy = Wt("File"), Vy = Wt("Blob"), By = Wt("FileList"), Ly = e => xo(e) && wt(e.pipe), My = e => {
      let t;
      return e && (typeof FormData == "function" && e instanceof FormData || wt(e.append) && ((t = Co(e)) === "formdata" || t === "object" && wt(e.toString) && e.toString() === "[object FormData]"))
    }, $y = Wt("URLSearchParams"), Ny = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function ur(e, t, {allOwnKeys: n = !1} = {}) {
  if (e === null || typeof e > "u") return;
  let s, r;
  if (typeof e != "object" && (e = [e]), Ss(e)) for (s = 0, r = e.length; s < r; s++) t.call(null, e[s], s, e); else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let a;
    for (s = 0; s < i; s++) a = o[s], t.call(null, e[a], a, e)
  }
}

function Qf(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0;) if (r = n[s], t === r.toLowerCase()) return r;
  return null
}

const ed = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global,
    td = e => !Gs(e) && e !== ed;

function Mi() {
  const {caseless: e} = td(this) && this || {}, t = {}, n = (s, r) => {
    const o = e && Qf(t, r) || r;
    Ir(t[o]) && Ir(s) ? t[o] = Mi(t[o], s) : Ir(s) ? t[o] = Mi({}, s) : Ss(s) ? t[o] = s.slice() : t[o] = s
  };
  for (let s = 0, r = arguments.length; s < r; s++) arguments[s] && ur(arguments[s], n);
  return t
}

const Dy = (e, t, n, {allOwnKeys: s} = {}) => (ur(t, (r, o) => {
      n && wt(r) ? e[o] = Jf(r, n) : e[o] = r
    }, {allOwnKeys: s}), e), Fy = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Hy = (e, t, n, s) => {
      e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {value: t.prototype}), n && Object.assign(e.prototype, n)
    }, jy = (e, t, n, s) => {
      let r, o, i;
      const a = {};
      if (t = t || {}, e == null) return t;
      do {
        for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0;) i = r[o], (!s || s(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
        e = n !== !1 && Ca(e)
      } while (e && (!n || n(e, t)) && e !== Object.prototype);
      return t
    }, Uy = (e, t, n) => {
      e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
      const s = e.indexOf(t, n);
      return s !== -1 && s === n
    }, zy = e => {
      if (!e) return null;
      if (Ss(e)) return e;
      let t = e.length;
      if (!Zf(t)) return null;
      const n = new Array(t);
      for (; t-- > 0;) n[t] = e[t];
      return n
    }, Wy = (e => t => e && t instanceof e)(typeof Uint8Array < "u" && Ca(Uint8Array)), Ky = (e, t) => {
      const s = (e && e[Symbol.iterator]).call(e);
      let r;
      for (; (r = s.next()) && !r.done;) {
        const o = r.value;
        t.call(e, o[0], o[1])
      }
    }, Gy = (e, t) => {
      let n;
      const s = [];
      for (; (n = e.exec(t)) !== null;) s.push(n);
      return s
    }, qy = Wt("HTMLFormElement"), Yy = e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, s, r) {
      return s.toUpperCase() + r
    }), vu = (({hasOwnProperty: e}) => (t, n) => e.call(t, n))(Object.prototype), Jy = Wt("RegExp"), nd = (e, t) => {
      const n = Object.getOwnPropertyDescriptors(e), s = {};
      ur(n, (r, o) => {
        let i;
        (i = t(r, o, e)) !== !1 && (s[o] = i || r)
      }), Object.defineProperties(e, s)
    }, Xy = e => {
      nd(e, (t, n) => {
        if (wt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1) return !1;
        const s = e[n];
        if (wt(s)) {
          if (t.enumerable = !1, "writable" in t) {
            t.writable = !1;
            return
          }
          t.set || (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'")
          })
        }
      })
    }, Zy = (e, t) => {
      const n = {}, s = r => {
        r.forEach(o => {
          n[o] = !0
        })
      };
      return Ss(e) ? s(e) : s(String(e).split(t)), n
    }, Qy = () => {
    }, eb = (e, t) => (e = +e, Number.isFinite(e) ? e : t), ti = "abcdefghijklmnopqrstuvwxyz", gu = "0123456789",
    sd = {DIGIT: gu, ALPHA: ti, ALPHA_DIGIT: ti + ti.toUpperCase() + gu}, tb = (e = 16, t = sd.ALPHA_DIGIT) => {
      let n = "";
      const {length: s} = t;
      for (; e--;) n += t[Math.random() * s | 0];
      return n
    };

function nb(e) {
  return !!(e && wt(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator])
}

const sb = e => {
  const t = new Array(10), n = (s, r) => {
    if (xo(s)) {
      if (t.indexOf(s) >= 0) return;
      if (!("toJSON" in s)) {
        t[r] = s;
        const o = Ss(s) ? [] : {};
        return ur(s, (i, a) => {
          const l = n(i, r + 1);
          !Gs(l) && (o[a] = l)
        }), t[r] = void 0, o
      }
    }
    return s
  };
  return n(e, 0)
}, rb = Wt("AsyncFunction"), ob = e => e && (xo(e) || wt(e)) && wt(e.then) && wt(e.catch), I = {
  isArray: Ss,
  isArrayBuffer: Xf,
  isBuffer: Ty,
  isFormData: My,
  isArrayBufferView: Py,
  isString: Ry,
  isNumber: Zf,
  isBoolean: Oy,
  isObject: xo,
  isPlainObject: Ir,
  isUndefined: Gs,
  isDate: ky,
  isFile: Iy,
  isBlob: Vy,
  isRegExp: Jy,
  isFunction: wt,
  isStream: Ly,
  isURLSearchParams: $y,
  isTypedArray: Wy,
  isFileList: By,
  forEach: ur,
  merge: Mi,
  extend: Dy,
  trim: Ny,
  stripBOM: Fy,
  inherits: Hy,
  toFlatObject: jy,
  kindOf: Co,
  kindOfTest: Wt,
  endsWith: Uy,
  toArray: zy,
  forEachEntry: Ky,
  matchAll: Gy,
  isHTMLForm: qy,
  hasOwnProperty: vu,
  hasOwnProp: vu,
  reduceDescriptors: nd,
  freezeMethods: Xy,
  toObjectSet: Zy,
  toCamelCase: Yy,
  noop: Qy,
  toFiniteNumber: eb,
  findKey: Qf,
  global: ed,
  isContextDefined: td,
  ALPHABET: sd,
  generateString: tb,
  isSpecCompliantForm: nb,
  toJSONObject: sb,
  isAsyncFn: rb,
  isThenable: ob
};

function me(e, t, n, s, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r)
}

I.inherits(me, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: I.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    }
  }
});
const rd = me.prototype, od = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => {
  od[e] = {value: e}
});
Object.defineProperties(me, od);
Object.defineProperty(rd, "isAxiosError", {value: !0});
me.from = (e, t, n, s, r, o) => {
  const i = Object.create(rd);
  return I.toFlatObject(e, i, function (l) {
    return l !== Error.prototype
  }, a => a !== "isAxiosError"), me.call(i, e.message, t, n, s, r), i.cause = e, i.name = e.name, o && Object.assign(i, o), i
};
const ib = null;

function $i(e) {
  return I.isPlainObject(e) || I.isArray(e)
}

function id(e) {
  return I.endsWith(e, "[]") ? e.slice(0, -2) : e
}

function pu(e, t, n) {
  return e ? e.concat(t).map(function (r, o) {
    return r = id(r), !n && o ? "[" + r + "]" : r
  }).join(n ? "." : "") : t
}

function ab(e) {
  return I.isArray(e) && !e.some($i)
}

const lb = I.toFlatObject(I, {}, null, function (t) {
  return /^is[A-Z]/.test(t)
});

function Ao(e, t, n) {
  if (!I.isObject(e)) throw new TypeError("target must be an object");
  t = t || new FormData, n = I.toFlatObject(n, {metaTokens: !0, dots: !1, indexes: !1}, !1, function (g, w) {
    return !I.isUndefined(w[g])
  });
  const s = n.metaTokens, r = n.visitor || u, o = n.dots, i = n.indexes,
      l = (n.Blob || typeof Blob < "u" && Blob) && I.isSpecCompliantForm(t);
  if (!I.isFunction(r)) throw new TypeError("visitor must be a function");

  function c(h) {
    if (h === null) return "";
    if (I.isDate(h)) return h.toISOString();
    if (!l && I.isBlob(h)) throw new me("Blob is not supported. Use a Buffer instead.");
    return I.isArrayBuffer(h) || I.isTypedArray(h) ? l && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h
  }

  function u(h, g, w) {
    let S = h;
    if (h && !w && typeof h == "object") {
      if (I.endsWith(g, "{}")) g = s ? g : g.slice(0, -2), h = JSON.stringify(h); else if (I.isArray(h) && ab(h) || (I.isFileList(h) || I.endsWith(g, "[]")) && (S = I.toArray(h))) return g = id(g), S.forEach(function (T, V) {
        !(I.isUndefined(T) || T === null) && t.append(i === !0 ? pu([g], V, o) : i === null ? g : g + "[]", c(T))
      }), !1
    }
    return $i(h) ? !0 : (t.append(pu(w, g, o), c(h)), !1)
  }

  const f = [], d = Object.assign(lb, {defaultVisitor: u, convertValue: c, isVisitable: $i});

  function m(h, g) {
    if (!I.isUndefined(h)) {
      if (f.indexOf(h) !== -1) throw Error("Circular reference detected in " + g.join("."));
      f.push(h), I.forEach(h, function (S, _) {
        (!(I.isUndefined(S) || S === null) && r.call(t, S, I.isString(_) ? _.trim() : _, g, d)) === !0 && m(S, g ? g.concat(_) : [_])
      }), f.pop()
    }
  }

  if (!I.isObject(e)) throw new TypeError("data must be an object");
  return m(e), t
}

function yu(e) {
  const t = {"!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0"};
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (s) {
    return t[s]
  })
}

function Ea(e, t) {
  this._pairs = [], e && Ao(e, this, t)
}

const ad = Ea.prototype;
ad.append = function (t, n) {
  this._pairs.push([t, n])
};
ad.toString = function (t) {
  const n = t ? function (s) {
    return t.call(this, s, yu)
  } : yu;
  return this._pairs.map(function (r) {
    return n(r[0]) + "=" + n(r[1])
  }, "").join("&")
};

function ub(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function ld(e, t, n) {
  if (!t) return e;
  const s = n && n.encode || ub, r = n && n.serialize;
  let o;
  if (r ? o = r(t, n) : o = I.isURLSearchParams(t) ? t.toString() : new Ea(t, n).toString(s), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o
  }
  return e
}

class bu {
  constructor() {
    this.handlers = []
  }

  use(t, n, s) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1
  }

  eject(t) {
    this.handlers[t] && (this.handlers[t] = null)
  }

  clear() {
    this.handlers && (this.handlers = [])
  }

  forEach(t) {
    I.forEach(this.handlers, function (s) {
      s !== null && t(s)
    })
  }
}

const ud = {silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1},
    cb = typeof URLSearchParams < "u" ? URLSearchParams : Ea, fb = typeof FormData < "u" ? FormData : null,
    db = typeof Blob < "u" ? Blob : null, hb = {
      isBrowser: !0,
      classes: {URLSearchParams: cb, FormData: fb, Blob: db},
      protocols: ["http", "https", "file", "blob", "url", "data"]
    }, cd = typeof window < "u" && typeof document < "u",
    mb = (e => cd && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product),
    vb = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function",
    gb = Object.freeze(Object.defineProperty({
      __proto__: null,
      hasBrowserEnv: cd,
      hasStandardBrowserEnv: mb,
      hasStandardBrowserWebWorkerEnv: vb
    }, Symbol.toStringTag, {value: "Module"})), Ft = {...gb, ...hb};

function pb(e, t) {
  return Ao(e, new Ft.classes.URLSearchParams, Object.assign({
    visitor: function (n, s, r, o) {
      return Ft.isNode && I.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments)
    }
  }, t))
}

function yb(e) {
  return I.matchAll(/\w+|\[(\w*)]/g, e).map(t => t[0] === "[]" ? "" : t[1] || t[0])
}

function bb(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++) o = n[s], t[o] = e[o];
  return t
}

function fd(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), l = o >= n.length;
    return i = !i && I.isArray(r) ? r.length : i, l ? (I.hasOwnProp(r, i) ? r[i] = [r[i], s] : r[i] = s, !a) : ((!r[i] || !I.isObject(r[i])) && (r[i] = []), t(n, s, r[i], o) && I.isArray(r[i]) && (r[i] = bb(r[i])), !a)
  }

  if (I.isFormData(e) && I.isFunction(e.entries)) {
    const n = {};
    return I.forEachEntry(e, (s, r) => {
      t(yb(s), r, n, 0)
    }), n
  }
  return null
}

function Sb(e, t, n) {
  if (I.isString(e)) try {
    return (t || JSON.parse)(e), I.trim(e)
  } catch (s) {
    if (s.name !== "SyntaxError") throw s
  }
  return (n || JSON.stringify)(e)
}

const xa = {
  transitional: ud,
  adapter: ["xhr", "http"],
  transformRequest: [function (t, n) {
    const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, o = I.isObject(t);
    if (o && I.isHTMLForm(t) && (t = new FormData(t)), I.isFormData(t)) return r && r ? JSON.stringify(fd(t)) : t;
    if (I.isArrayBuffer(t) || I.isBuffer(t) || I.isStream(t) || I.isFile(t) || I.isBlob(t)) return t;
    if (I.isArrayBufferView(t)) return t.buffer;
    if (I.isURLSearchParams(t)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (o) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1) return pb(t, this.formSerializer).toString();
      if ((a = I.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Ao(a ? {"files[]": t} : t, l && new l, this.formSerializer)
      }
    }
    return o || r ? (n.setContentType("application/json", !1), Sb(t)) : t
  }],
  transformResponse: [function (t) {
    const n = this.transitional || xa.transitional, s = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (t && I.isString(t) && (s && !this.responseType || r)) {
      const i = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t)
      } catch (a) {
        if (i) throw a.name === "SyntaxError" ? me.from(a, me.ERR_BAD_RESPONSE, this, null, this.response) : a
      }
    }
    return t
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {FormData: Ft.classes.FormData, Blob: Ft.classes.Blob},
  validateStatus: function (t) {
    return t >= 200 && t < 300
  },
  headers: {common: {Accept: "application/json, text/plain, */*", "Content-Type": void 0}}
};
I.forEach(["delete", "get", "head", "post", "put", "patch"], e => {
  xa.headers[e] = {}
});
const Aa = xa,
    _b = I.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
    wb = e => {
      const t = {};
      let n, s, r;
      return e && e.split(`
`).forEach(function (i) {
        r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), s = i.substring(r + 1).trim(), !(!n || t[n] && _b[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s)
      }), t
    }, Su = Symbol("internals");

function Ts(e) {
  return e && String(e).trim().toLowerCase()
}

function Vr(e) {
  return e === !1 || e == null ? e : I.isArray(e) ? e.map(Vr) : String(e)
}

function Cb(e) {
  const t = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e);) t[s[1]] = s[2];
  return t
}

const Eb = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());

function ni(e, t, n, s, r) {
  if (I.isFunction(s)) return s.call(this, t, n);
  if (r && (t = n), !!I.isString(t)) {
    if (I.isString(s)) return t.indexOf(s) !== -1;
    if (I.isRegExp(s)) return s.test(t)
  }
}

function xb(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s)
}

function Ab(e, t) {
  const n = I.toCamelCase(" " + t);
  ["get", "set", "has"].forEach(s => {
    Object.defineProperty(e, s + n, {
      value: function (r, o, i) {
        return this[s].call(this, t, r, o, i)
      }, configurable: !0
    })
  })
}

class To {
  constructor(t) {
    t && this.set(t)
  }

  set(t, n, s) {
    const r = this;

    function o(a, l, c) {
      const u = Ts(l);
      if (!u) throw new Error("header name must be a non-empty string");
      const f = I.findKey(r, u);
      (!f || r[f] === void 0 || c === !0 || c === void 0 && r[f] !== !1) && (r[f || l] = Vr(a))
    }

    const i = (a, l) => I.forEach(a, (c, u) => o(c, u, l));
    return I.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : I.isString(t) && (t = t.trim()) && !Eb(t) ? i(wb(t), n) : t != null && o(n, t, s), this
  }

  get(t, n) {
    if (t = Ts(t), t) {
      const s = I.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n) return r;
        if (n === !0) return Cb(r);
        if (I.isFunction(n)) return n.call(this, r, s);
        if (I.isRegExp(n)) return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function")
      }
    }
  }

  has(t, n) {
    if (t = Ts(t), t) {
      const s = I.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || ni(this, this[s], s, n)))
    }
    return !1
  }

  delete(t, n) {
    const s = this;
    let r = !1;

    function o(i) {
      if (i = Ts(i), i) {
        const a = I.findKey(s, i);
        a && (!n || ni(s, s[a], a, n)) && (delete s[a], r = !0)
      }
    }

    return I.isArray(t) ? t.forEach(o) : o(t), r
  }

  clear(t) {
    const n = Object.keys(this);
    let s = n.length, r = !1;
    for (; s--;) {
      const o = n[s];
      (!t || ni(this, this[o], o, t, !0)) && (delete this[o], r = !0)
    }
    return r
  }

  normalize(t) {
    const n = this, s = {};
    return I.forEach(this, (r, o) => {
      const i = I.findKey(s, o);
      if (i) {
        n[i] = Vr(r), delete n[o];
        return
      }
      const a = t ? xb(o) : String(o).trim();
      a !== o && delete n[o], n[a] = Vr(r), s[a] = !0
    }), this
  }

  concat(...t) {
    return this.constructor.concat(this, ...t)
  }

  toJSON(t) {
    const n = Object.create(null);
    return I.forEach(this, (s, r) => {
      s != null && s !== !1 && (n[r] = t && I.isArray(s) ? s.join(", ") : s)
    }), n
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]()
  }

  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`)
  }

  get [Symbol.toStringTag]() {
    return "AxiosHeaders"
  }

  static from(t) {
    return t instanceof this ? t : new this(t)
  }

  static concat(t, ...n) {
    const s = new this(t);
    return n.forEach(r => s.set(r)), s
  }

  static accessor(t) {
    const s = (this[Su] = this[Su] = {accessors: {}}).accessors, r = this.prototype;

    function o(i) {
      const a = Ts(i);
      s[a] || (Ab(r, i), s[a] = !0)
    }

    return I.isArray(t) ? t.forEach(o) : o(t), this
  }
}

To.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
I.reduceDescriptors(To.prototype, ({value: e}, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e, set(s) {
      this[n] = s
    }
  }
});
I.freezeMethods(To);
const Xt = To;

function si(e, t) {
  const n = this || Aa, s = t || n, r = Xt.from(s.headers);
  let o = s.data;
  return I.forEach(e, function (a) {
    o = a.call(n, o, r.normalize(), t ? t.status : void 0)
  }), r.normalize(), o
}

function dd(e) {
  return !!(e && e.__CANCEL__)
}

function cr(e, t, n) {
  me.call(this, e ?? "canceled", me.ERR_CANCELED, t, n), this.name = "CanceledError"
}

I.inherits(cr, me, {__CANCEL__: !0});

function Tb(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new me("Request failed with status code " + n.status, [me.ERR_BAD_REQUEST, me.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
}

const Pb = Ft.hasStandardBrowserEnv ? {
  write(e, t, n, s, r, o) {
    const i = [e + "=" + encodeURIComponent(t)];
    I.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()), I.isString(s) && i.push("path=" + s), I.isString(r) && i.push("domain=" + r), o === !0 && i.push("secure"), document.cookie = i.join("; ")
  }, read(e) {
    const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
    return t ? decodeURIComponent(t[3]) : null
  }, remove(e) {
    this.write(e, "", Date.now() - 864e5)
  }
} : {
  write() {
  }, read() {
    return null
  }, remove() {
  }
};

function Rb(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}

function Ob(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e
}

function hd(e, t) {
  return e && !Rb(t) ? Ob(e, t) : t
}

const kb = Ft.hasStandardBrowserEnv ? function () {
  const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
  let s;

  function r(o) {
    let i = o;
    return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
      href: n.href,
      protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
      host: n.host,
      search: n.search ? n.search.replace(/^\?/, "") : "",
      hash: n.hash ? n.hash.replace(/^#/, "") : "",
      hostname: n.hostname,
      port: n.port,
      pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
    }
  }

  return s = r(window.location.href), function (i) {
    const a = I.isString(i) ? r(i) : i;
    return a.protocol === s.protocol && a.host === s.host
  }
}() : function () {
  return function () {
    return !0
  }
}();

function Ib(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || ""
}

function Vb(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let r = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function (l) {
    const c = Date.now(), u = s[o];
    i || (i = c), n[r] = l, s[r] = c;
    let f = o, d = 0;
    for (; f !== r;) d += n[f++], f = f % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), c - i < t) return;
    const m = u && c - u;
    return m ? Math.round(d * 1e3 / m) : void 0
  }
}

function _u(e, t) {
  let n = 0;
  const s = Vb(50, 250);
  return r => {
    const o = r.loaded, i = r.lengthComputable ? r.total : void 0, a = o - n, l = s(a), c = o <= i;
    n = o;
    const u = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: a,
      rate: l || void 0,
      estimated: l && i && c ? (i - o) / l : void 0,
      event: r
    };
    u[t ? "download" : "upload"] = !0, e(u)
  }
}

const Bb = typeof XMLHttpRequest < "u", Lb = Bb && function (e) {
  return new Promise(function (n, s) {
    let r = e.data;
    const o = Xt.from(e.headers).normalize();
    let {responseType: i, withXSRFToken: a} = e, l;

    function c() {
      e.cancelToken && e.cancelToken.unsubscribe(l), e.signal && e.signal.removeEventListener("abort", l)
    }

    let u;
    if (I.isFormData(r)) {
      if (Ft.hasStandardBrowserEnv || Ft.hasStandardBrowserWebWorkerEnv) o.setContentType(!1); else if ((u = o.getContentType()) !== !1) {
        const [g, ...w] = u ? u.split(";").map(S => S.trim()).filter(Boolean) : [];
        o.setContentType([g || "multipart/form-data", ...w].join("; "))
      }
    }
    let f = new XMLHttpRequest;
    if (e.auth) {
      const g = e.auth.username || "", w = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(g + ":" + w))
    }
    const d = hd(e.baseURL, e.url);
    f.open(e.method.toUpperCase(), ld(d, e.params, e.paramsSerializer), !0), f.timeout = e.timeout;

    function m() {
      if (!f) return;
      const g = Xt.from("getAllResponseHeaders" in f && f.getAllResponseHeaders()), S = {
        data: !i || i === "text" || i === "json" ? f.responseText : f.response,
        status: f.status,
        statusText: f.statusText,
        headers: g,
        config: e,
        request: f
      };
      Tb(function (T) {
        n(T), c()
      }, function (T) {
        s(T), c()
      }, S), f = null
    }

    if ("onloadend" in f ? f.onloadend = m : f.onreadystatechange = function () {
      !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.indexOf("file:") === 0) || setTimeout(m)
    }, f.onabort = function () {
      f && (s(new me("Request aborted", me.ECONNABORTED, e, f)), f = null)
    }, f.onerror = function () {
      s(new me("Network Error", me.ERR_NETWORK, e, f)), f = null
    }, f.ontimeout = function () {
      let w = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const S = e.transitional || ud;
      e.timeoutErrorMessage && (w = e.timeoutErrorMessage), s(new me(w, S.clarifyTimeoutError ? me.ETIMEDOUT : me.ECONNABORTED, e, f)), f = null
    }, Ft.hasStandardBrowserEnv && (a && I.isFunction(a) && (a = a(e)), a || a !== !1 && kb(d))) {
      const g = e.xsrfHeaderName && e.xsrfCookieName && Pb.read(e.xsrfCookieName);
      g && o.set(e.xsrfHeaderName, g)
    }
    r === void 0 && o.setContentType(null), "setRequestHeader" in f && I.forEach(o.toJSON(), function (w, S) {
      f.setRequestHeader(S, w)
    }), I.isUndefined(e.withCredentials) || (f.withCredentials = !!e.withCredentials), i && i !== "json" && (f.responseType = e.responseType), typeof e.onDownloadProgress == "function" && f.addEventListener("progress", _u(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && f.upload && f.upload.addEventListener("progress", _u(e.onUploadProgress)), (e.cancelToken || e.signal) && (l = g => {
      f && (s(!g || g.type ? new cr(null, e, f) : g), f.abort(), f = null)
    }, e.cancelToken && e.cancelToken.subscribe(l), e.signal && (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
    const h = Ib(d);
    if (h && Ft.protocols.indexOf(h) === -1) {
      s(new me("Unsupported protocol " + h + ":", me.ERR_BAD_REQUEST, e));
      return
    }
    f.send(r || null)
  })
}, Ni = {http: ib, xhr: Lb};
I.forEach(Ni, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", {value: t})
    } catch {
    }
    Object.defineProperty(e, "adapterName", {value: t})
  }
});
const wu = e => `- ${e}`, Mb = e => I.isFunction(e) || e === null || e === !1, md = {
  getAdapter: e => {
    e = I.isArray(e) ? e : [e];
    const {length: t} = e;
    let n, s;
    const r = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let i;
      if (s = n, !Mb(n) && (s = Ni[(i = String(n)).toLowerCase()], s === void 0)) throw new me(`Unknown adapter '${i}'`);
      if (s) break;
      r[i || "#" + o] = s
    }
    if (!s) {
      const o = Object.entries(r).map(([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build"));
      let i = t ? o.length > 1 ? `since :
` + o.map(wu).join(`
`) : " " + wu(o[0]) : "as no adapter specified";
      throw new me("There is no suitable adapter to dispatch the request " + i, "ERR_NOT_SUPPORT")
    }
    return s
  }, adapters: Ni
};

function ri(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new cr(null, e)
}

function Cu(e) {
  return ri(e), e.headers = Xt.from(e.headers), e.data = si.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), md.getAdapter(e.adapter || Aa.adapter)(e).then(function (s) {
    return ri(e), s.data = si.call(e, e.transformResponse, s), s.headers = Xt.from(s.headers), s
  }, function (s) {
    return dd(s) || (ri(e), s && s.response && (s.response.data = si.call(e, e.transformResponse, s.response), s.response.headers = Xt.from(s.response.headers))), Promise.reject(s)
  })
}

const Eu = e => e instanceof Xt ? e.toJSON() : e;

function fs(e, t) {
  t = t || {};
  const n = {};

  function s(c, u, f) {
    return I.isPlainObject(c) && I.isPlainObject(u) ? I.merge.call({caseless: f}, c, u) : I.isPlainObject(u) ? I.merge({}, u) : I.isArray(u) ? u.slice() : u
  }

  function r(c, u, f) {
    if (I.isUndefined(u)) {
      if (!I.isUndefined(c)) return s(void 0, c, f)
    } else return s(c, u, f)
  }

  function o(c, u) {
    if (!I.isUndefined(u)) return s(void 0, u)
  }

  function i(c, u) {
    if (I.isUndefined(u)) {
      if (!I.isUndefined(c)) return s(void 0, c)
    } else return s(void 0, u)
  }

  function a(c, u, f) {
    if (f in t) return s(c, u);
    if (f in e) return s(void 0, c)
  }

  const l = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (c, u) => r(Eu(c), Eu(u), !0)
  };
  return I.forEach(Object.keys(Object.assign({}, e, t)), function (u) {
    const f = l[u] || r, d = f(e[u], t[u], u);
    I.isUndefined(d) && f !== a || (n[u] = d)
  }), n
}

const vd = "1.6.5", Ta = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ta[e] = function (s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e
  }
});
const xu = {};
Ta.transitional = function (t, n, s) {
  function r(o, i) {
    return "[Axios v" + vd + "] Transitional option '" + o + "'" + i + (s ? ". " + s : "")
  }

  return (o, i, a) => {
    if (t === !1) throw new me(r(i, " has been removed" + (n ? " in " + n : "")), me.ERR_DEPRECATED);
    return n && !xu[i] && (xu[i] = !0, console.warn(r(i, " has been deprecated since v" + n + " and will be removed in the near future"))), t ? t(o, i, a) : !0
  }
};

function $b(e, t, n) {
  if (typeof e != "object") throw new me("options must be an object", me.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0;) {
    const o = s[r], i = t[o];
    if (i) {
      const a = e[o], l = a === void 0 || i(a, o, e);
      if (l !== !0) throw new me("option " + o + " must be " + l, me.ERR_BAD_OPTION_VALUE);
      continue
    }
    if (n !== !0) throw new me("Unknown option " + o, me.ERR_BAD_OPTION)
  }
}

const Di = {assertOptions: $b, validators: Ta}, un = Di.validators;

class Yr {
  constructor(t) {
    this.defaults = t, this.interceptors = {request: new bu, response: new bu}
  }

  request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = fs(this.defaults, n);
    const {transitional: s, paramsSerializer: r, headers: o} = n;
    s !== void 0 && Di.assertOptions(s, {
      silentJSONParsing: un.transitional(un.boolean),
      forcedJSONParsing: un.transitional(un.boolean),
      clarifyTimeoutError: un.transitional(un.boolean)
    }, !1), r != null && (I.isFunction(r) ? n.paramsSerializer = {serialize: r} : Di.assertOptions(r, {
      encode: un.function,
      serialize: un.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && I.merge(o.common, o[n.method]);
    o && I.forEach(["delete", "get", "head", "post", "put", "patch", "common"], h => {
      delete o[h]
    }), n.headers = Xt.concat(i, o);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function (g) {
      typeof g.runWhen == "function" && g.runWhen(n) === !1 || (l = l && g.synchronous, a.unshift(g.fulfilled, g.rejected))
    });
    const c = [];
    this.interceptors.response.forEach(function (g) {
      c.push(g.fulfilled, g.rejected)
    });
    let u, f = 0, d;
    if (!l) {
      const h = [Cu.bind(this), void 0];
      for (h.unshift.apply(h, a), h.push.apply(h, c), d = h.length, u = Promise.resolve(n); f < d;) u = u.then(h[f++], h[f++]);
      return u
    }
    d = a.length;
    let m = n;
    for (f = 0; f < d;) {
      const h = a[f++], g = a[f++];
      try {
        m = h(m)
      } catch (w) {
        g.call(this, w);
        break
      }
    }
    try {
      u = Cu.call(this, m)
    } catch (h) {
      return Promise.reject(h)
    }
    for (f = 0, d = c.length; f < d;) u = u.then(c[f++], c[f++]);
    return u
  }

  getUri(t) {
    t = fs(this.defaults, t);
    const n = hd(t.baseURL, t.url);
    return ld(n, t.params, t.paramsSerializer)
  }
}

I.forEach(["delete", "get", "head", "options"], function (t) {
  Yr.prototype[t] = function (n, s) {
    return this.request(fs(s || {}, {method: t, url: n, data: (s || {}).data}))
  }
});
I.forEach(["post", "put", "patch"], function (t) {
  function n(s) {
    return function (o, i, a) {
      return this.request(fs(a || {}, {
        method: t,
        headers: s ? {"Content-Type": "multipart/form-data"} : {},
        url: o,
        data: i
      }))
    }
  }

  Yr.prototype[t] = n(), Yr.prototype[t + "Form"] = n(!0)
});
const Br = Yr;

class Pa {
  constructor(t) {
    if (typeof t != "function") throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o
    });
    const s = this;
    this.promise.then(r => {
      if (!s._listeners) return;
      let o = s._listeners.length;
      for (; o-- > 0;) s._listeners[o](r);
      s._listeners = null
    }), this.promise.then = r => {
      let o;
      const i = new Promise(a => {
        s.subscribe(a), o = a
      }).then(r);
      return i.cancel = function () {
        s.unsubscribe(o)
      }, i
    }, t(function (o, i, a) {
      s.reason || (s.reason = new cr(o, i, a), n(s.reason))
    })
  }

  throwIfRequested() {
    if (this.reason) throw this.reason
  }

  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t]
  }

  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1)
  }

  static source() {
    let t;
    return {
      token: new Pa(function (r) {
        t = r
      }), cancel: t
    }
  }
}

const Nb = Pa;

function Db(e) {
  return function (n) {
    return e.apply(null, n)
  }
}

function Fb(e) {
  return I.isObject(e) && e.isAxiosError === !0
}

const Fi = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Fi).forEach(([e, t]) => {
  Fi[t] = e
});
const Hb = Fi;

function gd(e) {
  const t = new Br(e), n = Jf(Br.prototype.request, t);
  return I.extend(n, Br.prototype, t, {allOwnKeys: !0}), I.extend(n, t, null, {allOwnKeys: !0}), n.create = function (r) {
    return gd(fs(e, r))
  }, n
}

const Fe = gd(Aa);
Fe.Axios = Br;
Fe.CanceledError = cr;
Fe.CancelToken = Nb;
Fe.isCancel = dd;
Fe.VERSION = vd;
Fe.toFormData = Ao;
Fe.AxiosError = me;
Fe.Cancel = Fe.CanceledError;
Fe.all = function (t) {
  return Promise.all(t)
};
Fe.spread = Db;
Fe.isAxiosError = Fb;
Fe.mergeConfig = fs;
Fe.AxiosHeaders = Xt;
Fe.formToJSON = e => fd(I.isHTMLForm(e) ? new FormData(e) : e);
Fe.getAdapter = md.getAdapter;
Fe.HttpStatusCode = Hb;
Fe.default = Fe;
var jb = Object.defineProperty, Au = Object.getOwnPropertySymbols, Ub = Object.prototype.hasOwnProperty,
    zb = Object.prototype.propertyIsEnumerable,
    Tu = (e, t, n) => t in e ? jb(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[t] = n,
    pd = (e, t) => {
      for (var n in t || (t = {})) Ub.call(t, n) && Tu(e, n, t[n]);
      if (Au) for (var n of Au(t)) zb.call(t, n) && Tu(e, n, t[n]);
      return e
    }, Po = e => typeof e == "function", Ro = e => typeof e == "string", yd = e => Ro(e) && e.trim().length > 0,
    Wb = e => typeof e == "number", Fn = e => typeof e > "u", qs = e => typeof e == "object" && e !== null,
    Kb = e => Ht(e, "tag") && yd(e.tag), bd = e => window.TouchEvent && e instanceof TouchEvent,
    Sd = e => Ht(e, "component") && _d(e.component), Gb = e => Po(e) || qs(e),
    _d = e => !Fn(e) && (Ro(e) || Gb(e) || Sd(e)),
    Pu = e => qs(e) && ["height", "width", "right", "left", "top", "bottom"].every(t => Wb(e[t])),
    Ht = (e, t) => (qs(e) || Po(e)) && t in e, qb = (e => () => e++)(0);

function oi(e) {
  return bd(e) ? e.targetTouches[0].clientX : e.clientX
}

function Ru(e) {
  return bd(e) ? e.targetTouches[0].clientY : e.clientY
}

var Yb = e => {
  Fn(e.remove) ? e.parentNode && e.parentNode.removeChild(e) : e.remove()
}, fr = e => Sd(e) ? fr(e.component) : Kb(e) ? Ke({
  render() {
    return e
  }
}) : typeof e == "string" ? e : ie(be(e)), Jb = e => {
  if (typeof e == "string") return e;
  const t = Ht(e, "props") && qs(e.props) ? e.props : {}, n = Ht(e, "listeners") && qs(e.listeners) ? e.listeners : {};
  return {component: fr(e), props: t, listeners: n}
}, Xb = () => typeof window < "u", Ra = class {
  constructor() {
    this.allHandlers = {}
  }

  getHandlers(e) {
    return this.allHandlers[e] || []
  }

  on(e, t) {
    const n = this.getHandlers(e);
    n.push(t), this.allHandlers[e] = n
  }

  off(e, t) {
    const n = this.getHandlers(e);
    n.splice(n.indexOf(t) >>> 0, 1)
  }

  emit(e, t) {
    this.getHandlers(e).forEach(s => s(t))
  }
}, Zb = e => ["on", "off", "emit"].every(t => Ht(e, t) && Po(e[t])), ut;
(function (e) {
  e.SUCCESS = "success", e.ERROR = "error", e.WARNING = "warning", e.INFO = "info", e.DEFAULT = "default"
})(ut || (ut = {}));
var Jr;
(function (e) {
  e.TOP_LEFT = "top-left", e.TOP_CENTER = "top-center", e.TOP_RIGHT = "top-right", e.BOTTOM_LEFT = "bottom-left", e.BOTTOM_CENTER = "bottom-center", e.BOTTOM_RIGHT = "bottom-right"
})(Jr || (Jr = {}));
var ct;
(function (e) {
  e.ADD = "add", e.DISMISS = "dismiss", e.UPDATE = "update", e.CLEAR = "clear", e.UPDATE_DEFAULTS = "update_defaults"
})(ct || (ct = {}));
var Rt = "Vue-Toastification", Tt = {
      type: {type: String, default: ut.DEFAULT},
      classNames: {type: [String, Array], default: () => []},
      trueBoolean: {type: Boolean, default: !0}
    }, wd = {type: Tt.type, customIcon: {type: [String, Boolean, Object, Function], default: !0}}, Lr = {
      component: {type: [String, Object, Function, Boolean], default: "button"},
      classNames: Tt.classNames,
      showOnHover: {type: Boolean, default: !1},
      ariaLabel: {type: String, default: "close"}
    }, Hi = {
      timeout: {type: [Number, Boolean], default: 5e3},
      hideProgressBar: {type: Boolean, default: !1},
      isRunning: {type: Boolean, default: !1}
    }, Cd = {transition: {type: [Object, String], default: `${Rt}__bounce`}}, Qb = {
      position: {type: String, default: Jr.TOP_RIGHT},
      draggable: Tt.trueBoolean,
      draggablePercent: {type: Number, default: .6},
      pauseOnFocusLoss: Tt.trueBoolean,
      pauseOnHover: Tt.trueBoolean,
      closeOnClick: Tt.trueBoolean,
      timeout: Hi.timeout,
      hideProgressBar: Hi.hideProgressBar,
      toastClassName: Tt.classNames,
      bodyClassName: Tt.classNames,
      icon: wd.customIcon,
      closeButton: Lr.component,
      closeButtonClassName: Lr.classNames,
      showCloseButtonOnHover: Lr.showOnHover,
      accessibility: {type: Object, default: () => ({toastRole: "alert", closeButtonLabel: "close"})},
      rtl: {type: Boolean, default: !1},
      eventBus: {type: Object, required: !1, default: () => new Ra}
    }, e0 = {
      id: {type: [String, Number], required: !0, default: 0},
      type: Tt.type,
      content: {type: [String, Object, Function], required: !0, default: ""},
      onClick: {type: Function, default: void 0},
      onClose: {type: Function, default: void 0}
    }, t0 = {
      container: {type: [Object, Function], default: () => document.body},
      newestOnTop: Tt.trueBoolean,
      maxToasts: {type: Number, default: 20},
      transition: Cd.transition,
      toastDefaults: Object,
      filterBeforeCreate: {type: Function, default: e => e},
      filterToasts: {type: Function, default: e => e},
      containerClassName: Tt.classNames,
      onMounted: Function,
      shareAppContext: [Boolean, Object]
    }, Zt = {CORE_TOAST: Qb, TOAST: e0, CONTAINER: t0, PROGRESS_BAR: Hi, ICON: wd, TRANSITION: Cd, CLOSE_BUTTON: Lr},
    Ed = Ke({
      name: "VtProgressBar", props: Zt.PROGRESS_BAR, data() {
        return {hasClass: !0}
      }, computed: {
        style() {
          return {
            animationDuration: `${this.timeout}ms`,
            animationPlayState: this.isRunning ? "running" : "paused",
            opacity: this.hideProgressBar ? 0 : 1
          }
        }, cpClass() {
          return this.hasClass ? `${Rt}__progress-bar` : ""
        }
      }, watch: {
        timeout() {
          this.hasClass = !1, this.$nextTick(() => this.hasClass = !0)
        }
      }, mounted() {
        this.$el.addEventListener("animationend", this.animationEnded)
      }, beforeUnmount() {
        this.$el.removeEventListener("animationend", this.animationEnded)
      }, methods: {
        animationEnded() {
          this.$emit("close-toast")
        }
      }
    });

function n0(e, t) {
  return _e(), dt("div", {style: er(e.style), class: Cn(e.cpClass)}, null, 6)
}

Ed.render = n0;
var s0 = Ed, xd = Ke({
  name: "VtCloseButton", props: Zt.CLOSE_BUTTON, computed: {
    buttonComponent() {
      return this.component !== !1 ? fr(this.component) : "button"
    }, classes() {
      const e = [`${Rt}__close-button`];
      return this.showOnHover && e.push("show-on-hover"), e.concat(this.classNames)
    }
  }
}), r0 = nt(" × ");

function o0(e, t) {
  return _e(), We(nr(e.buttonComponent), $e({
    "aria-label": e.ariaLabel,
    class: e.classes
  }, e.$attrs), {default: ge(() => [r0]), _: 1}, 16, ["aria-label", "class"])
}

xd.render = o0;
var i0 = xd, Ad = {}, a0 = {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "check-circle",
  class: "svg-inline--fa fa-check-circle fa-w-16",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, l0 = kt("path", {
  fill: "currentColor",
  d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
}, null, -1), u0 = [l0];

function c0(e, t) {
  return _e(), dt("svg", a0, u0)
}

Ad.render = c0;
var f0 = Ad, Td = {}, d0 = {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "info-circle",
  class: "svg-inline--fa fa-info-circle fa-w-16",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, h0 = kt("path", {
  fill: "currentColor",
  d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
}, null, -1), m0 = [h0];

function v0(e, t) {
  return _e(), dt("svg", d0, m0)
}

Td.render = v0;
var Ou = Td, Pd = {}, g0 = {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "exclamation-circle",
  class: "svg-inline--fa fa-exclamation-circle fa-w-16",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, p0 = kt("path", {
  fill: "currentColor",
  d: "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
}, null, -1), y0 = [p0];

function b0(e, t) {
  return _e(), dt("svg", g0, y0)
}

Pd.render = b0;
var S0 = Pd, Rd = {}, _0 = {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "exclamation-triangle",
  class: "svg-inline--fa fa-exclamation-triangle fa-w-18",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 576 512"
}, w0 = kt("path", {
  fill: "currentColor",
  d: "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
}, null, -1), C0 = [w0];

function E0(e, t) {
  return _e(), dt("svg", _0, C0)
}

Rd.render = E0;
var x0 = Rd, Od = Ke({
  name: "VtIcon", props: Zt.ICON, computed: {
    customIconChildren() {
      return Ht(this.customIcon, "iconChildren") ? this.trimValue(this.customIcon.iconChildren) : ""
    }, customIconClass() {
      return Ro(this.customIcon) ? this.trimValue(this.customIcon) : Ht(this.customIcon, "iconClass") ? this.trimValue(this.customIcon.iconClass) : ""
    }, customIconTag() {
      return Ht(this.customIcon, "iconTag") ? this.trimValue(this.customIcon.iconTag, "i") : "i"
    }, hasCustomIcon() {
      return this.customIconClass.length > 0
    }, component() {
      return this.hasCustomIcon ? this.customIconTag : _d(this.customIcon) ? fr(this.customIcon) : this.iconTypeComponent
    }, iconTypeComponent() {
      return {[ut.DEFAULT]: Ou, [ut.INFO]: Ou, [ut.SUCCESS]: f0, [ut.ERROR]: x0, [ut.WARNING]: S0}[this.type]
    }, iconClasses() {
      const e = [`${Rt}__icon`];
      return this.hasCustomIcon ? e.concat(this.customIconClass) : e
    }
  }, methods: {
    trimValue(e, t = "") {
      return yd(e) ? e.trim() : t
    }
  }
});

function A0(e, t) {
  return _e(), We(nr(e.component), {class: Cn(e.iconClasses)}, {
    default: ge(() => [nt(Wn(e.customIconChildren), 1)]),
    _: 1
  }, 8, ["class"])
}

Od.render = A0;
var T0 = Od, kd = Ke({
  name: "VtToast",
  components: {ProgressBar: s0, CloseButton: i0, Icon: T0},
  inheritAttrs: !1,
  props: Object.assign({}, Zt.CORE_TOAST, Zt.TOAST),
  data() {
    return {isRunning: !0, disableTransitions: !1, beingDragged: !1, dragStart: 0, dragPos: {x: 0, y: 0}, dragRect: {}}
  },
  computed: {
    classes() {
      const e = [`${Rt}__toast`, `${Rt}__toast--${this.type}`, `${this.position}`].concat(this.toastClassName);
      return this.disableTransitions && e.push("disable-transition"), this.rtl && e.push(`${Rt}__toast--rtl`), e
    }, bodyClasses() {
      return [`${Rt}__toast-${Ro(this.content) ? "body" : "component-body"}`].concat(this.bodyClassName)
    }, draggableStyle() {
      return this.dragStart === this.dragPos.x ? {} : this.beingDragged ? {
        transform: `translateX(${this.dragDelta}px)`,
        opacity: 1 - Math.abs(this.dragDelta / this.removalDistance)
      } : {transition: "transform 0.2s, opacity 0.2s", transform: "translateX(0)", opacity: 1}
    }, dragDelta() {
      return this.beingDragged ? this.dragPos.x - this.dragStart : 0
    }, removalDistance() {
      return Pu(this.dragRect) ? (this.dragRect.right - this.dragRect.left) * this.draggablePercent : 0
    }
  },
  mounted() {
    this.draggable && this.draggableSetup(), this.pauseOnFocusLoss && this.focusSetup()
  },
  beforeUnmount() {
    this.draggable && this.draggableCleanup(), this.pauseOnFocusLoss && this.focusCleanup()
  },
  methods: {
    hasProp: Ht, getVueComponentFromObj: fr, closeToast() {
      this.eventBus.emit(ct.DISMISS, this.id)
    }, clickHandler() {
      this.onClick && this.onClick(this.closeToast), this.closeOnClick && (!this.beingDragged || this.dragStart === this.dragPos.x) && this.closeToast()
    }, timeoutHandler() {
      this.closeToast()
    }, hoverPause() {
      this.pauseOnHover && (this.isRunning = !1)
    }, hoverPlay() {
      this.pauseOnHover && (this.isRunning = !0)
    }, focusPause() {
      this.isRunning = !1
    }, focusPlay() {
      this.isRunning = !0
    }, focusSetup() {
      addEventListener("blur", this.focusPause), addEventListener("focus", this.focusPlay)
    }, focusCleanup() {
      removeEventListener("blur", this.focusPause), removeEventListener("focus", this.focusPlay)
    }, draggableSetup() {
      const e = this.$el;
      e.addEventListener("touchstart", this.onDragStart, {passive: !0}), e.addEventListener("mousedown", this.onDragStart), addEventListener("touchmove", this.onDragMove, {passive: !1}), addEventListener("mousemove", this.onDragMove), addEventListener("touchend", this.onDragEnd), addEventListener("mouseup", this.onDragEnd)
    }, draggableCleanup() {
      const e = this.$el;
      e.removeEventListener("touchstart", this.onDragStart), e.removeEventListener("mousedown", this.onDragStart), removeEventListener("touchmove", this.onDragMove), removeEventListener("mousemove", this.onDragMove), removeEventListener("touchend", this.onDragEnd), removeEventListener("mouseup", this.onDragEnd)
    }, onDragStart(e) {
      this.beingDragged = !0, this.dragPos = {
        x: oi(e),
        y: Ru(e)
      }, this.dragStart = oi(e), this.dragRect = this.$el.getBoundingClientRect()
    }, onDragMove(e) {
      this.beingDragged && (e.preventDefault(), this.isRunning && (this.isRunning = !1), this.dragPos = {
        x: oi(e),
        y: Ru(e)
      })
    }, onDragEnd() {
      this.beingDragged && (Math.abs(this.dragDelta) >= this.removalDistance ? (this.disableTransitions = !0, this.$nextTick(() => this.closeToast())) : setTimeout(() => {
        this.beingDragged = !1, Pu(this.dragRect) && this.pauseOnHover && this.dragRect.bottom >= this.dragPos.y && this.dragPos.y >= this.dragRect.top && this.dragRect.left <= this.dragPos.x && this.dragPos.x <= this.dragRect.right ? this.isRunning = !1 : this.isRunning = !0
      }))
    }
  }
}), P0 = ["role"];

function R0(e, t) {
  const n = is("Icon"), s = is("CloseButton"), r = is("ProgressBar");
  return _e(), dt("div", {
    class: Cn(e.classes),
    style: er(e.draggableStyle),
    onClick: t[0] || (t[0] = (...o) => e.clickHandler && e.clickHandler(...o)),
    onMouseenter: t[1] || (t[1] = (...o) => e.hoverPause && e.hoverPause(...o)),
    onMouseleave: t[2] || (t[2] = (...o) => e.hoverPlay && e.hoverPlay(...o))
  }, [e.icon ? (_e(), We(n, {
    key: 0,
    "custom-icon": e.icon,
    type: e.type
  }, null, 8, ["custom-icon", "type"])) : Yo("v-if", !0), kt("div", {
    role: e.accessibility.toastRole || "alert",
    class: Cn(e.bodyClasses)
  }, [typeof e.content == "string" ? (_e(), dt(Se, {key: 0}, [nt(Wn(e.content), 1)], 2112)) : (_e(), We(nr(e.getVueComponentFromObj(e.content)), $e({
    key: 1,
    "toast-id": e.id
  }, e.hasProp(e.content, "props") ? e.content.props : {}, Qm(e.hasProp(e.content, "listeners") ? e.content.listeners : {}), {onCloseToast: e.closeToast}), null, 16, ["toast-id", "onCloseToast"]))], 10, P0), e.closeButton ? (_e(), We(s, {
    key: 1,
    component: e.closeButton,
    "class-names": e.closeButtonClassName,
    "show-on-hover": e.showCloseButtonOnHover,
    "aria-label": e.accessibility.closeButtonLabel,
    onClick: So(e.closeToast, ["stop"])
  }, null, 8, ["component", "class-names", "show-on-hover", "aria-label", "onClick"])) : Yo("v-if", !0), e.timeout ? (_e(), We(r, {
    key: 2,
    "is-running": e.isRunning,
    "hide-progress-bar": e.hideProgressBar,
    timeout: e.timeout,
    onCloseToast: e.timeoutHandler
  }, null, 8, ["is-running", "hide-progress-bar", "timeout", "onCloseToast"])) : Yo("v-if", !0)], 38)
}

kd.render = R0;
var O0 = kd, Id = Ke({
  name: "VtTransition", props: Zt.TRANSITION, emits: ["leave"], methods: {
    hasProp: Ht, leave(e) {
      e instanceof HTMLElement && (e.style.left = e.offsetLeft + "px", e.style.top = e.offsetTop + "px", e.style.width = getComputedStyle(e).width, e.style.position = "absolute")
    }
  }
});

function k0(e, t) {
  return _e(), We(yf, {
    tag: "div",
    "enter-active-class": e.transition.enter ? e.transition.enter : `${e.transition}-enter-active`,
    "move-class": e.transition.move ? e.transition.move : `${e.transition}-move`,
    "leave-active-class": e.transition.leave ? e.transition.leave : `${e.transition}-leave-active`,
    onLeave: e.leave
  }, {
    default: ge(() => [Zm(e.$slots, "default")]),
    _: 3
  }, 8, ["enter-active-class", "move-class", "leave-active-class", "onLeave"])
}

Id.render = k0;
var I0 = Id, Vd = Ke({
  name: "VueToastification",
  devtools: {hide: !0},
  components: {Toast: O0, VtTransition: I0},
  props: Object.assign({}, Zt.CORE_TOAST, Zt.CONTAINER, Zt.TRANSITION),
  data() {
    return {count: 0, positions: Object.values(Jr), toasts: {}, defaults: {}}
  },
  computed: {
    toastArray() {
      return Object.values(this.toasts)
    }, filteredToasts() {
      return this.defaults.filterToasts(this.toastArray)
    }
  },
  beforeMount() {
    const e = this.eventBus;
    e.on(ct.ADD, this.addToast), e.on(ct.CLEAR, this.clearToasts), e.on(ct.DISMISS, this.dismissToast), e.on(ct.UPDATE, this.updateToast), e.on(ct.UPDATE_DEFAULTS, this.updateDefaults), this.defaults = this.$props
  },
  mounted() {
    this.setup(this.container)
  },
  methods: {
    async setup(e) {
      Po(e) && (e = await e()), Yb(this.$el), e.appendChild(this.$el)
    }, setToast(e) {
      Fn(e.id) || (this.toasts[e.id] = e)
    }, addToast(e) {
      e.content = Jb(e.content);
      const t = Object.assign({}, this.defaults, e.type && this.defaults.toastDefaults && this.defaults.toastDefaults[e.type], e),
          n = this.defaults.filterBeforeCreate(t, this.toastArray);
      n && this.setToast(n)
    }, dismissToast(e) {
      const t = this.toasts[e];
      !Fn(t) && !Fn(t.onClose) && t.onClose(), delete this.toasts[e]
    }, clearToasts() {
      Object.keys(this.toasts).forEach(e => {
        this.dismissToast(e)
      })
    }, getPositionToasts(e) {
      const t = this.filteredToasts.filter(n => n.position === e).slice(0, this.defaults.maxToasts);
      return this.defaults.newestOnTop ? t.reverse() : t
    }, updateDefaults(e) {
      Fn(e.container) || this.setup(e.container), this.defaults = Object.assign({}, this.defaults, e)
    }, updateToast({id: e, options: t, create: n}) {
      this.toasts[e] ? (t.timeout && t.timeout === this.toasts[e].timeout && t.timeout++, this.setToast(Object.assign({}, this.toasts[e], t))) : n && this.addToast(Object.assign({}, {id: e}, t))
    }, getClasses(e) {
      return [`${Rt}__container`, e].concat(this.defaults.containerClassName)
    }
  }
});

function V0(e, t) {
  const n = is("Toast"), s = is("VtTransition");
  return _e(), dt("div", null, [(_e(!0), dt(Se, null, Fr(e.positions, r => (_e(), dt("div", {key: r}, [v(s, {
    transition: e.defaults.transition,
    class: Cn(e.getClasses(r))
  }, {
    default: ge(() => [(_e(!0), dt(Se, null, Fr(e.getPositionToasts(r), o => (_e(), We(n, $e({key: o.id}, o), null, 16))), 128))]),
    _: 2
  }, 1032, ["transition", "class"])]))), 128))])
}

Vd.render = V0;
var B0 = Vd, ku = (e = {}, t = !0) => {
  const n = e.eventBus = e.eventBus || new Ra;
  t && mt(() => {
    const o = bf(B0, pd({}, e)), i = o.mount(document.createElement("div")), a = e.onMounted;
    if (Fn(a) || a(i, o), e.shareAppContext) {
      const l = e.shareAppContext;
      l === !0 ? console.warn(`[${Rt}] App to share context with was not provided.`) : (o._context.components = l._context.components, o._context.directives = l._context.directives, o._context.mixins = l._context.mixins, o._context.provides = l._context.provides, o.config.globalProperties = l.config.globalProperties)
    }
  });
  const s = (o, i) => {
    const a = Object.assign({}, {id: qb(), type: ut.DEFAULT}, i, {content: o});
    return n.emit(ct.ADD, a), a.id
  };
  s.clear = () => n.emit(ct.CLEAR, void 0), s.updateDefaults = o => {
    n.emit(ct.UPDATE_DEFAULTS, o)
  }, s.dismiss = o => {
    n.emit(ct.DISMISS, o)
  };

  function r(o, {content: i, options: a}, l = !1) {
    const c = Object.assign({}, a, {content: i});
    n.emit(ct.UPDATE, {id: o, options: c, create: l})
  }

  return s.update = r, s.success = (o, i) => s(o, Object.assign({}, i, {type: ut.SUCCESS})), s.info = (o, i) => s(o, Object.assign({}, i, {type: ut.INFO})), s.error = (o, i) => s(o, Object.assign({}, i, {type: ut.ERROR})), s.warning = (o, i) => s(o, Object.assign({}, i, {type: ut.WARNING})), s
}, L0 = () => {
  const e = () => console.warn(`[${Rt}] This plugin does not support SSR!`);
  return new Proxy(e, {
    get() {
      return e
    }
  })
};

function ji(e) {
  return Xb() ? Zb(e) ? ku({eventBus: e}, !1) : ku(e, !0) : L0()
}

var Bd = Symbol("VueToastification"), Ld = new Ra, M0 = (e, t) => {
  (t == null ? void 0 : t.shareAppContext) === !0 && (t.shareAppContext = e);
  const n = ji(pd({eventBus: Ld}, t));
  e.provide(Bd, n)
}, $0 = e => {
  if (e) return ji(e);
  const t = po() ? Pe(Bd, void 0) : void 0;
  return t || ji(Ld)
}, N0 = M0;
const D0 = {maxToasts: 3, timeout: 3e3}, Ys = $0(),
    Ge = Fe.create({baseURL: "/api", timeout: 1e4, withCredentials: !1});
Ge.interceptors.request.use(e => {
  const t = rn();
  return e.headers.Authorization = t.user.token, e.headers["content-type"] || (e.method === "post" ? e.headers["content-type"] = "application/x-www-form-urlencoded" : e.headers["content-type"] = "application/json"), e
}, e => Promise.reject(e));
Ge.interceptors.response.use(e => (e.data, e), e => {
  let t = "", n = rn();
  if (e && e.response) switch (e.response.status) {
    case 302:
      console.log(e);
      break;
    case 400:
      t = "参数不正确！";
      break;
    case 401:
      t = e.response.data.msg;
      break;
    case 403:
      if (t = "您没有权限操作！", e.response.data.is_first == !0) return n.set_title("初始化配置"), hr.push("/first_login"), Promise.reject(!1);
      break;
    case 404:
      t = `请求地址出错: ${e.response.config.url}`;
      break;
    case 408:
      t = "请求超时！";
      break;
    case 409:
      t = "系统已存在相同数据！";
      break;
    case 500:
      t = "服务器内部错误！";
      break;
    case 501:
      t = "服务未实现！";
      break;
    case 502:
      t = "网关错误！";
      break;
    case 503:
      t = "服务不可用！";
      break;
    case 504:
      t = "服务暂时无法访问，请稍后再试！";
      break;
    case 505:
      t = "HTTP 版本不受支持！";
      break;
    default:
      t = "异常问题，请联系管理员！";
      break
  }
  return e.code === "ERR_NETWORK" && (t = "请连接网络"), Ys.error(t), Promise.reject(t)
});
const F0 = () => Ge({url: "/auth", method: "post"}), H0 = () => Ge({url: "/auth/self", method: "get"}),
    j0 = e => Ge({url: "/first_login", method: "post", data: e}), U0 = () => Ge.get("/self/portrait"),
    z0 = () => Ge({url: "/plugins", method: "get"}), W0 = (e = null, t = null) => {
      let n;
      switch (e) {
        case!0: {
          n = 1;
          break
        }
        case!1: {
          n = 0;
          break
        }
        default:
          n = null
      }
      return Ge.postForm("/plugins/status", {status: n, plugin: t})
    }, K0 = (e = null) => Ge.get("/plugins/status?plugin=" + e), G0 = e => Ge.get(`/${e}/info`),
    Pw = (e = null, t = null) => {
      let n;
      return e == null || t == null || (n = JSON.stringify({fname: e, enable: t})), Ge.post("/review/forum", n)
    }, Rw = () => Ge.get("/review/forum"), Ow = (e = null) => {
      let t;
      switch (e) {
        case!0: {
          t = 1;
          break
        }
        case!1: {
          t = 0;
          break
        }
        default:
          t = null
      }
      return Ge.postForm("/review/no_exec", {bool: t})
    }, kw = () => Ge.get("/review/no_exec"), Iw = (e = null) => Ge.post("/review/keyword", JSON.stringify(e)),
    Vw = () => Ge.get("/review/keyword"), Bw = (e = null, t = null, n = null) => {
      let s;
      return e == null || t == null || n == null || (s = JSON.stringify({
        function: e,
        fname: t,
        enable: n
      })), Ge.post("/review/function", s)
    }, Lw = () => Ge.get("/review/function"), An = G({border: [Boolean, Number, String]}, "border");

function Tn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {
    borderClasses: b(() => {
      const s = Oe(e) ? e.value : e.border, r = [];
      if (s === !0 || s === "") r.push(`${t}--border`); else if (typeof s == "string" || s === 0) for (const o of String(s).split(" ")) r.push(`border-${o}`);
      return r
    })
  }
}

const q0 = [null, "default", "comfortable", "compact"],
    on = G({density: {type: String, default: "default", validator: e => q0.includes(e)}}, "density");

function Pn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {densityClasses: b(() => `${t}--density-${e.density}`)}
}

const Rn = G({
  elevation: {
    type: [Number, String], validator(e) {
      const t = parseInt(e);
      return !isNaN(t) && t >= 0 && t <= 24
    }
  }
}, "elevation");

function On(e) {
  return {
    elevationClasses: b(() => {
      const n = Oe(e) ? e.value : e.elevation, s = [];
      return n == null || s.push(`elevation-${n}`), s
    })
  }
}

const Vt = G({rounded: {type: [Boolean, Number, String], default: void 0}}, "rounded");

function Bt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {
    roundedClasses: b(() => {
      const s = Oe(e) ? e.value : e.rounded, r = [];
      if (s === !0 || s === "") r.push(`${t}--rounded`); else if (typeof s == "string" || s === 0) for (const o of String(s).split(" ")) r.push(`rounded-${o}`);
      return r
    })
  }
}

const Xe = G({tag: {type: String, default: "div"}}, "tag");

function Oa(e) {
  return Af(() => {
    const t = [], n = {};
    if (e.value.background) if (Pi(e.value.background)) {
      if (n.backgroundColor = e.value.background, !e.value.text && Yg(e.value.background)) {
        const s = Dt(e.value.background);
        if (s.a == null || s.a === 1) {
          const r = Vf(s);
          n.color = r, n.caretColor = r
        }
      }
    } else t.push(`bg-${e.value.background}`);
    return e.value.text && (Pi(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    }
  })
}

function tn(e, t) {
  const n = b(() => ({text: Oe(e) ? e.value : t ? e[t] : null})), {colorClasses: s, colorStyles: r} = Oa(n);
  return {textColorClasses: s, textColorStyles: r}
}

function nn(e, t) {
  const n = b(() => ({background: Oe(e) ? e.value : t ? e[t] : null})), {colorClasses: s, colorStyles: r} = Oa(n);
  return {backgroundColorClasses: s, backgroundColorStyles: r}
}

const Y0 = ["elevated", "flat", "tonal", "outlined", "text", "plain"];

function Oo(e, t) {
  return v(Se, null, [e && v("span", {key: "overlay", class: `${t}__overlay`}, null), v("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)])
}

const _s = G({color: String, variant: {type: String, default: "elevated", validator: e => Y0.includes(e)}}, "variant");

function ko(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  const n = b(() => {
    const {variant: o} = be(e);
    return `${t}--variant-${o}`
  }), {colorClasses: s, colorStyles: r} = Oa(b(() => {
    const {variant: o, color: i} = be(e);
    return {[["elevated", "flat"].includes(o) ? "background" : "text"]: i}
  }));
  return {colorClasses: s, colorStyles: r, variantClasses: n}
}

const Md = G({divided: Boolean, ...An(), ...ye(), ...on(), ...Rn(), ...Vt(), ...Xe(), ...Je(), ..._s()}, "VBtnGroup"),
    Iu = ae()({
      name: "VBtnGroup", props: Md(), setup(e, t) {
        let {slots: n} = t;
        const {themeClasses: s} = st(e), {densityClasses: r} = Pn(e), {borderClasses: o} = Tn(e), {elevationClasses: i} = On(e), {roundedClasses: a} = Bt(e);
        Yn({
          VBtn: {
            height: "auto",
            color: ue(e, "color"),
            density: ue(e, "density"),
            flat: !0,
            variant: ue(e, "variant")
          }
        }), fe(() => v(e.tag, {
          class: ["v-btn-group", {"v-btn-group--divided": e.divided}, s.value, o.value, r.value, i.value, a.value, e.class],
          style: e.style
        }, n))
      }
    }), J0 = G({
      modelValue: {type: null, default: void 0},
      multiple: Boolean,
      mandatory: [Boolean, String],
      max: Number,
      selectedClass: String,
      disabled: Boolean
    }, "group"), X0 = G({value: null, disabled: Boolean, selectedClass: String}, "group-item");

function Z0(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const s = Qe("useGroupItem");
  if (!s) throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const r = It();
  Ye(Symbol.for(`${t.description}:id`), r);
  const o = Pe(t, null);
  if (!o) {
    if (!n) return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`)
  }
  const i = ue(e, "value"), a = b(() => !!(o.disabled.value || e.disabled));
  o.register({id: r, value: i, disabled: a}, s), vt(() => {
    o.unregister(r)
  });
  const l = b(() => o.isSelected(r)), c = b(() => l.value && [o.selectedClass.value, e.selectedClass]);
  return Ee(l, u => {
    s.emit("group:selected", {value: u})
  }), {
    id: r,
    isSelected: l,
    toggle: () => o.select(r, !l.value),
    select: u => o.select(r, u),
    selectedClass: c,
    value: i,
    disabled: a,
    group: o
  }
}

function Q0(e, t) {
  let n = !1;
  const s = ze([]), r = it(e, "modelValue", [], d => d == null ? [] : $d(s, Sn(d)), d => {
    const m = tS(s, d);
    return e.multiple ? m : m[0]
  }), o = Qe("useGroup");

  function i(d, m) {
    const h = d, g = Symbol.for(`${t.description}:id`), S = Bs(g, o == null ? void 0 : o.vnode).indexOf(m);
    S > -1 ? s.splice(S, 0, h) : s.push(h)
  }

  function a(d) {
    if (n) return;
    l();
    const m = s.findIndex(h => h.id === d);
    s.splice(m, 1)
  }

  function l() {
    const d = s.find(m => !m.disabled);
    d && e.mandatory === "force" && !r.value.length && (r.value = [d.id])
  }

  Ut(() => {
    l()
  }), vt(() => {
    n = !0
  });

  function c(d, m) {
    const h = s.find(g => g.id === d);
    if (!(m && (h != null && h.disabled))) if (e.multiple) {
      const g = r.value.slice(), w = g.findIndex(_ => _ === d), S = ~w;
      if (m = m ?? !S, S && e.mandatory && g.length <= 1 || !S && e.max != null && g.length + 1 > e.max) return;
      w < 0 && m ? g.push(d) : w >= 0 && !m && g.splice(w, 1), r.value = g
    } else {
      const g = r.value.includes(d);
      if (e.mandatory && g) return;
      r.value = m ?? !g ? [d] : []
    }
  }

  function u(d) {
    if (e.multiple, r.value.length) {
      const m = r.value[0], h = s.findIndex(S => S.id === m);
      let g = (h + d) % s.length, w = s[g];
      for (; w.disabled && g !== h;) g = (g + d) % s.length, w = s[g];
      if (w.disabled) return;
      r.value = [s[g].id]
    } else {
      const m = s.find(h => !h.disabled);
      m && (r.value = [m.id])
    }
  }

  const f = {
    register: i,
    unregister: a,
    selected: r,
    select: c,
    disabled: ue(e, "disabled"),
    prev: () => u(s.length - 1),
    next: () => u(1),
    isSelected: d => r.value.includes(d),
    selectedClass: b(() => e.selectedClass),
    items: b(() => s),
    getItemIndex: d => eS(s, d)
  };
  return Ye(t, f), f
}

function eS(e, t) {
  const n = $d(e, [t]);
  return n.length ? e.findIndex(s => s.id === n[0]) : -1
}

function $d(e, t) {
  const n = [];
  return t.forEach(s => {
    const r = e.find(i => lr(s, i.value)), o = e[s];
    (r == null ? void 0 : r.value) != null ? n.push(r.id) : o != null && n.push(o.id)
  }), n
}

function tS(e, t) {
  const n = [];
  return t.forEach(s => {
    const r = e.findIndex(o => o.id === s);
    if (~r) {
      const o = e[r];
      n.push(o.value != null ? o.value : r)
    }
  }), n
}

const Nd = Symbol.for("vuetify:v-btn-toggle"), nS = G({...Md(), ...J0()}, "VBtnToggle");
ae()({
  name: "VBtnToggle", props: nS(), emits: {"update:modelValue": e => !0}, setup(e, t) {
    let {slots: n} = t;
    const {isSelected: s, next: r, prev: o, select: i, selected: a} = Q0(e, Nd);
    return fe(() => {
      const l = Iu.filterProps(e);
      return v(Iu, $e({class: ["v-btn-toggle", e.class]}, l, {style: e.style}), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: s,
            next: r,
            prev: o,
            select: i,
            selected: a
          })]
        }
      })
    }), {next: r, prev: o, select: i}
  }
});
const sS = G({
      defaults: Object,
      disabled: Boolean,
      reset: [Number, String],
      root: [Boolean, String],
      scoped: Boolean
    }, "VDefaultsProvider"), Ct = ae(!1)({
      name: "VDefaultsProvider", props: sS(), setup(e, t) {
        let {slots: n} = t;
        const {defaults: s, disabled: r, reset: o, root: i, scoped: a} = uo(e);
        return Yn(s, {reset: o, root: i, scoped: a, disabled: r}), () => {
          var l;
          return (l = n.default) == null ? void 0 : l.call(n)
        }
      }
    }), rS = ["x-small", "small", "default", "large", "x-large"],
    Io = G({size: {type: [String, Number], default: "default"}}, "size");

function Vo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return Af(() => {
    let n, s;
    return zr(rS, e.size) ? n = `${t}--size-${e.size}` : e.size && (s = {
      width: he(e.size),
      height: he(e.size)
    }), {sizeClasses: n, sizeStyles: s}
  })
}

const oS = G({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Le, ...ye(), ...Io(), ...Xe({tag: "i"}), ...Je()
}, "VIcon"), Qt = ae()({
  name: "VIcon", props: oS(), setup(e, t) {
    let {attrs: n, slots: s} = t;
    const r = Z(), {themeClasses: o} = st(e), {iconData: i} = ry(b(() => r.value || e.icon)), {sizeClasses: a} = Vo(e), {
      textColorClasses: l,
      textColorStyles: c
    } = tn(ue(e, "color"));
    return fe(() => {
      var f, d;
      const u = (f = s.default) == null ? void 0 : f.call(s);
      return u && (r.value = (d = xf(u).filter(m => m.type === or && m.children && typeof m.children == "string")[0]) == null ? void 0 : d.children), v(i.value.component, {
        tag: e.tag,
        icon: i.value.icon,
        class: ["v-icon", "notranslate", o.value, a.value, l.value, {
          "v-icon--clickable": !!n.onClick,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [a.value ? void 0 : {fontSize: he(e.size), height: he(e.size), width: he(e.size)}, c.value, e.style],
        role: n.onClick ? "button" : void 0,
        "aria-hidden": !n.onClick
      }, {default: () => [u]})
    }), {}
  }
});

function Dd(e, t) {
  const n = Z(), s = pe(!1);
  if (ya) {
    const r = new IntersectionObserver(o => {
      e == null || e(o, r), s.value = !!o.find(i => i.isIntersecting)
    }, t);
    vt(() => {
      r.disconnect()
    }), Ee(n, (o, i) => {
      i && (r.unobserve(i), s.value = !1), o && r.observe(o)
    }, {flush: "post"})
  }
  return {intersectionRef: n, isIntersecting: s}
}

const iS = G({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {type: [Number, String], default: 0},
  rotate: {type: [Number, String], default: 0},
  width: {type: [Number, String], default: 4}, ...ye(), ...Io(), ...Xe({tag: "div"}), ...Je()
}, "VProgressCircular"), Fd = ae()({
  name: "VProgressCircular", props: iS(), setup(e, t) {
    let {slots: n} = t;
    const s = 20, r = 2 * Math.PI * s, o = Z(), {themeClasses: i} = st(e), {
          sizeClasses: a,
          sizeStyles: l
        } = Vo(e), {textColorClasses: c, textColorStyles: u} = tn(ue(e, "color")), {
          textColorClasses: f,
          textColorStyles: d
        } = tn(ue(e, "bgColor")), {intersectionRef: m, isIntersecting: h} = Dd(), {resizeRef: g, contentRect: w} = Uf(),
        S = b(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), _ = b(() => Number(e.width)),
        T = b(() => l.value ? Number(e.size) : w.value ? w.value.width : Math.max(_.value, 32)),
        V = b(() => s / (1 - _.value / T.value) * 2), R = b(() => _.value / T.value * V.value),
        x = b(() => he((100 - S.value) / 100 * r));
    return sr(() => {
      m.value = o.value, g.value = o.value
    }), fe(() => v(e.tag, {
      ref: o,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": h.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, i.value, a.value, c.value, e.class],
      style: [l.value, u.value, e.style],
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : S.value
    }, {
      default: () => [v("svg", {
        style: {transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`},
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${V.value} ${V.value}`
      }, [v("circle", {
        class: ["v-progress-circular__underlay", f.value],
        style: d.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: s,
        "stroke-width": R.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": 0
      }, null), v("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: s,
        "stroke-width": R.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": x.value
      }, null)]), n.default && v("div", {class: "v-progress-circular__content"}, [n.default({value: S.value})])]
    })), {}
  }
}), ws = G({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");

function Cs(e) {
  return {
    dimensionStyles: b(() => ({
      height: he(e.height),
      maxHeight: he(e.maxHeight),
      maxWidth: he(e.maxWidth),
      minHeight: he(e.minHeight),
      minWidth: he(e.minWidth),
      width: he(e.width)
    }))
  }
}

const Vu = {center: "center", top: "bottom", bottom: "top", left: "right", right: "left"},
    Bo = G({location: String}, "location");

function Lo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
      n = arguments.length > 2 ? arguments[2] : void 0;
  const {isRtl: s} = xn();
  return {
    locationStyles: b(() => {
      if (!e.location) return {};
      const {side: o, align: i} = Ig(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, s.value);

      function a(c) {
        return n ? n(c) : 0
      }

      const l = {};
      return o !== "center" && (t ? l[Vu[o]] = `calc(100% - ${a(o)}px)` : l[o] = 0), i !== "center" ? t ? l[Vu[i]] = `calc(100% - ${a(i)}px)` : l[i] = 0 : (o === "center" ? l.top = l.left = "50%" : l[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[o]] = "50%", l.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[o]), l
    })
  }
}

const aS = G({
  absolute: Boolean,
  active: {type: Boolean, default: !0},
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {type: [Number, String], default: 0},
  clickable: Boolean,
  color: String,
  height: {type: [Number, String], default: 4},
  indeterminate: Boolean,
  max: {type: [Number, String], default: 100},
  modelValue: {type: [Number, String], default: 0},
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean, ...ye(), ...Bo({location: "top"}), ...Vt(), ...Xe(), ...Je()
}, "VProgressLinear"), lS = ae()({
  name: "VProgressLinear", props: aS(), emits: {"update:modelValue": e => !0}, setup(e, t) {
    let {slots: n} = t;
    const s = it(e, "modelValue"), {
          isRtl: r,
          rtlClasses: o
        } = xn(), {themeClasses: i} = st(e), {locationStyles: a} = Lo(e), {
          textColorClasses: l,
          textColorStyles: c
        } = tn(e, "color"), {
          backgroundColorClasses: u,
          backgroundColorStyles: f
        } = nn(b(() => e.bgColor || e.color)), {
          backgroundColorClasses: d,
          backgroundColorStyles: m
        } = nn(e, "color"), {roundedClasses: h} = Bt(e), {intersectionRef: g, isIntersecting: w} = Dd(),
        S = b(() => parseInt(e.max, 10)), _ = b(() => parseInt(e.height, 10)),
        T = b(() => parseFloat(e.bufferValue) / S.value * 100), V = b(() => parseFloat(s.value) / S.value * 100),
        R = b(() => r.value !== e.reverse), x = b(() => e.indeterminate ? "fade-transition" : "slide-x-transition"),
        B = b(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));

    function E(C) {
      if (!g.value) return;
      const {left: P, right: F, width: M} = g.value.getBoundingClientRect(),
          z = R.value ? M - C.clientX + (F - M) : C.clientX - P;
      s.value = Math.round(z / M * S.value)
    }

    return fe(() => v(e.tag, {
      ref: g,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && w.value,
        "v-progress-linear--reverse": R.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, h.value, i.value, o.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? he(_.value) : 0,
        "--v-progress-linear-height": he(_.value), ...a.value
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : V.value,
      onClick: e.clickable && E
    }, {
      default: () => [e.stream && v("div", {
        key: "stream",
        class: ["v-progress-linear__stream", l.value],
        style: {
          ...c.value,
          [R.value ? "left" : "right"]: he(-_.value),
          borderTop: `${he(_.value / 2)} dotted`,
          opacity: B.value,
          top: `calc(50% - ${he(_.value / 4)})`,
          width: he(100 - T.value, "%"),
          "--v-progress-linear-stream-to": he(_.value * (R.value ? 1 : -1))
        }
      }, null), v("div", {
        class: ["v-progress-linear__background", u.value],
        style: [f.value, {opacity: B.value, width: he(e.stream ? T.value : 100, "%")}]
      }, null), v(qn, {name: x.value}, {
        default: () => [e.indeterminate ? v("div", {class: "v-progress-linear__indeterminate"}, [["long", "short"].map(C => v("div", {
          key: C,
          class: ["v-progress-linear__indeterminate", C, d.value],
          style: m.value
        }, null))]) : v("div", {
          class: ["v-progress-linear__determinate", d.value],
          style: [m.value, {width: he(V.value, "%")}]
        }, null)]
      }), n.default && v("div", {class: "v-progress-linear__content"}, [n.default({value: V.value, buffer: T.value})])]
    })), {}
  }
}), ka = G({loading: [Boolean, String]}, "loader");

function Mo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {loaderClasses: b(() => ({[`${t}--loading`]: e.loading}))}
}

function Ia(e, t) {
  var s;
  let {slots: n} = t;
  return v("div", {class: `${e.name}__loader`}, [((s = n.default) == null ? void 0 : s.call(n, {
    color: e.color,
    isActive: e.active
  })) || v(lS, {absolute: e.absolute, active: e.active, color: e.color, height: "2", indeterminate: !0}, null)])
}

const uS = ["static", "relative", "fixed", "absolute", "sticky"],
    Va = G({position: {type: String, validator: e => uS.includes(e)}}, "position");

function Ba(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {positionClasses: b(() => e.position ? `${t}--${e.position}` : void 0)}
}

function cS() {
  const e = Qe("useRoute");
  return b(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route
  })
}

function fS() {
  var e, t;
  return (t = (e = Qe("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router
}

function La(e, t) {
  const n = nr("RouterLink"), s = b(() => !!(e.href || e.to)),
      r = b(() => (s == null ? void 0 : s.value) || Ul(t, "click") || Ul(e, "click"));
  if (typeof n == "string") return {isLink: s, isClickable: r, href: ue(e, "href")};
  const o = e.to ? n.useLink(e) : void 0, i = cS();
  return {
    isLink: s,
    isClickable: r,
    route: o == null ? void 0 : o.route,
    navigate: o == null ? void 0 : o.navigate,
    isActive: o && b(() => {
      var a, l, c;
      return e.exact ? i.value ? ((c = o.isExactActive) == null ? void 0 : c.value) && lr(o.route.value.query, i.value.query) : (l = o.isExactActive) == null ? void 0 : l.value : (a = o.isActive) == null ? void 0 : a.value
    }),
    href: b(() => e.to ? o == null ? void 0 : o.route.value.href : e.href)
  }
}

const Ma = G({href: String, replace: Boolean, to: [String, Object], exact: Boolean}, "router");
let ii = !1;

function Mw(e, t) {
  let n = !1, s, r;
  tt && (mt(() => {
    window.addEventListener("popstate", o), s = e == null ? void 0 : e.beforeEach((i, a, l) => {
      ii ? n ? t(l) : l() : setTimeout(() => n ? t(l) : l()), ii = !0
    }), r = e == null ? void 0 : e.afterEach(() => {
      ii = !1
    })
  }), oo(() => {
    window.removeEventListener("popstate", o), s == null || s(), r == null || r()
  }));

  function o(i) {
    var a;
    (a = i.state) != null && a.replaced || (n = !0, setTimeout(() => n = !1))
  }
}

function dS(e, t) {
  Ee(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value
  }, n => {
    e.isLink.value && n && t && mt(() => {
      t(!0)
    })
  }, {immediate: !0})
}

const Ui = Symbol("rippleStop"), hS = 80;

function Bu(e, t) {
  e.style.transform = t, e.style.webkitTransform = t
}

function zi(e) {
  return e.constructor.name === "TouchEvent"
}

function Hd(e) {
  return e.constructor.name === "KeyboardEvent"
}

const mS = function (e, t) {
  var f;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = 0, r = 0;
  if (!Hd(e)) {
    const d = t.getBoundingClientRect(), m = zi(e) ? e.touches[e.touches.length - 1] : e;
    s = m.clientX - d.left, r = m.clientY - d.top
  }
  let o = 0, i = .3;
  (f = t._ripple) != null && f.circle ? (i = .15, o = t.clientWidth / 2, o = n.center ? o : o + Math.sqrt((s - o) ** 2 + (r - o) ** 2) / 4) : o = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const a = `${(t.clientWidth - o * 2) / 2}px`, l = `${(t.clientHeight - o * 2) / 2}px`,
      c = n.center ? a : `${s - o}px`, u = n.center ? l : `${r - o}px`;
  return {radius: o, scale: i, x: c, y: u, centerX: a, centerY: l}
}, Xr = {
  show(e, t) {
    var m;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((m = t == null ? void 0 : t._ripple) != null && m.enabled)) return;
    const s = document.createElement("span"), r = document.createElement("span");
    s.appendChild(r), s.className = "v-ripple__container", n.class && (s.className += ` ${n.class}`);
    const {radius: o, scale: i, x: a, y: l, centerX: c, centerY: u} = mS(e, t, n), f = `${o * 2}px`;
    r.className = "v-ripple__animation", r.style.width = f, r.style.height = f, t.appendChild(s);
    const d = window.getComputedStyle(t);
    d && d.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), r.classList.add("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--visible"), Bu(r, `translate(${a}, ${l}) scale3d(${i},${i},${i})`), r.dataset.activated = String(performance.now()), setTimeout(() => {
      r.classList.remove("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--in"), Bu(r, `translate(${c}, ${u}) scale3d(1,1,1)`)
    }, 0)
  }, hide(e) {
    var o;
    if (!((o = e == null ? void 0 : e._ripple) != null && o.enabled)) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = t[t.length - 1];
    if (n.dataset.isHiding) return;
    n.dataset.isHiding = "true";
    const s = performance.now() - Number(n.dataset.activated), r = Math.max(250 - s, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var a;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((a = n.parentNode) == null ? void 0 : a.parentNode) === e && e.removeChild(n.parentNode)
      }, 300)
    }, r)
  }
};

function jd(e) {
  return typeof e > "u" || !!e
}

function Js(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[Ui])) {
    if (e[Ui] = !0, zi(e)) n._ripple.touched = !0, n._ripple.isTouch = !0; else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || Hd(e), n._ripple.class && (t.class = n._ripple.class), zi(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        Xr.show(e, n, t)
      }, n._ripple.showTimer = window.setTimeout(() => {
        var s;
        (s = n == null ? void 0 : n._ripple) != null && s.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null)
      }, hS)
    } else Xr.show(e, n, t)
  }
}

function Lu(e) {
  e[Ui] = !0
}

function ft(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        ft(e)
      });
      return
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1)
    }), Xr.hide(t)
  }
}

function Ud(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer))
}

let Xs = !1;

function zd(e) {
  !Xs && (e.keyCode === Dl.enter || e.keyCode === Dl.space) && (Xs = !0, Js(e))
}

function Wd(e) {
  Xs = !1, ft(e)
}

function Kd(e) {
  Xs && (Xs = !1, ft(e))
}

function Gd(e, t, n) {
  const {value: s, modifiers: r} = t, o = jd(s);
  if (o || Xr.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = r.center, e._ripple.circle = r.circle, Ai(s) && s.class && (e._ripple.class = s.class), o && !n) {
    if (r.stop) {
      e.addEventListener("touchstart", Lu, {passive: !0}), e.addEventListener("mousedown", Lu);
      return
    }
    e.addEventListener("touchstart", Js, {passive: !0}), e.addEventListener("touchend", ft, {passive: !0}), e.addEventListener("touchmove", Ud, {passive: !0}), e.addEventListener("touchcancel", ft), e.addEventListener("mousedown", Js), e.addEventListener("mouseup", ft), e.addEventListener("mouseleave", ft), e.addEventListener("keydown", zd), e.addEventListener("keyup", Wd), e.addEventListener("blur", Kd), e.addEventListener("dragstart", ft, {passive: !0})
  } else !o && n && qd(e)
}

function qd(e) {
  e.removeEventListener("mousedown", Js), e.removeEventListener("touchstart", Js), e.removeEventListener("touchend", ft), e.removeEventListener("touchmove", Ud), e.removeEventListener("touchcancel", ft), e.removeEventListener("mouseup", ft), e.removeEventListener("mouseleave", ft), e.removeEventListener("keydown", zd), e.removeEventListener("keyup", Wd), e.removeEventListener("dragstart", ft), e.removeEventListener("blur", Kd)
}

function vS(e, t) {
  Gd(e, t, !1)
}

function gS(e) {
  delete e._ripple, qd(e)
}

function pS(e, t) {
  if (t.value === t.oldValue) return;
  const n = jd(t.oldValue);
  Gd(e, t, n)
}

const $o = {mounted: vS, unmounted: gS, updated: pS}, Yd = G({
  active: {type: Boolean, default: void 0},
  symbol: {type: null, default: Nd},
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: Le,
  appendIcon: Le,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {type: [Boolean, Object], default: !0},
  text: String, ...An(), ...ye(), ...on(), ...ws(), ...Rn(), ...X0(), ...ka(), ...Bo(), ...Va(), ...Vt(), ...Ma(), ...Io(), ...Xe({tag: "button"}), ...Je(), ..._s({variant: "elevated"})
}, "VBtn"), No = ae()({
  name: "VBtn", directives: {Ripple: $o}, props: Yd(), emits: {"group:selected": e => !0}, setup(e, t) {
    let {attrs: n, slots: s} = t;
    const {themeClasses: r} = st(e), {borderClasses: o} = Tn(e), {
          colorClasses: i,
          colorStyles: a,
          variantClasses: l
        } = ko(e), {densityClasses: c} = Pn(e), {dimensionStyles: u} = Cs(e), {elevationClasses: f} = On(e), {loaderClasses: d} = Mo(e), {locationStyles: m} = Lo(e), {positionClasses: h} = Ba(e), {roundedClasses: g} = Bt(e), {
          sizeClasses: w,
          sizeStyles: S
        } = Vo(e), _ = Z0(e, e.symbol, !1), T = La(e, n), V = b(() => {
          var C;
          return e.active !== void 0 ? e.active : T.isLink.value ? (C = T.isActive) == null ? void 0 : C.value : _ == null ? void 0 : _.isSelected.value
        }), R = b(() => (_ == null ? void 0 : _.disabled.value) || e.disabled),
        x = b(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), B = b(() => {
          if (!(e.value === void 0 || typeof e.value == "symbol")) return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value
        });

    function E(C) {
      var P;
      R.value || T.isLink.value && (C.metaKey || C.ctrlKey || C.shiftKey || C.button !== 0 || n.target === "_blank") || ((P = T.navigate) == null || P.call(T, C), _ == null || _.toggle())
    }

    return dS(T, _ == null ? void 0 : _.select), fe(() => {
      var te, se;
      const C = T.isLink.value ? "a" : e.tag, P = !!(e.prependIcon || s.prepend), F = !!(e.appendIcon || s.append),
          M = !!(e.icon && e.icon !== !0),
          z = (_ == null ? void 0 : _.isSelected.value) && (!T.isLink.value || ((te = T.isActive) == null ? void 0 : te.value)) || !_ || ((se = T.isActive) == null ? void 0 : se.value);
      return jt(v(C, {
        type: C === "a" ? void 0 : "button",
        class: ["v-btn", _ == null ? void 0 : _.selectedClass.value, {
          "v-btn--active": V.value,
          "v-btn--block": e.block,
          "v-btn--disabled": R.value,
          "v-btn--elevated": x.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, r.value, o.value, z ? i.value : void 0, c.value, f.value, d.value, h.value, g.value, w.value, l.value, e.class],
        style: [z ? a.value : void 0, u.value, m.value, S.value, e.style],
        disabled: R.value || void 0,
        href: T.href.value,
        onClick: E,
        value: B.value
      }, {
        default: () => {
          var J;
          return [Oo(!0, "v-btn"), !e.icon && P && v("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [s.prepend ? v(Ct, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {VIcon: {icon: e.prependIcon}}
          }, s.prepend) : v(Qt, {key: "prepend-icon", icon: e.prependIcon}, null)]), v("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!s.default && M ? v(Qt, {key: "content-icon", icon: e.icon}, null) : v(Ct, {
            key: "content-defaults",
            disabled: !M,
            defaults: {VIcon: {icon: e.icon}}
          }, {
            default: () => {
              var Q;
              return [((Q = s.default) == null ? void 0 : Q.call(s)) ?? e.text]
            }
          })]), !e.icon && F && v("span", {
            key: "append",
            class: "v-btn__append"
          }, [s.append ? v(Ct, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {VIcon: {icon: e.appendIcon}}
          }, s.append) : v(Qt, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && v("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((J = s.loader) == null ? void 0 : J.call(s)) ?? v(Fd, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])]
        }
      }), [[ps("ripple"), !R.value && e.ripple, null]])
    }), {}
  }
}), Jd = ae()({
  name: "VCardActions", props: ye(), setup(e, t) {
    let {slots: n} = t;
    return Yn({VBtn: {slim: !0, variant: "text"}}), fe(() => {
      var s;
      return v("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(s = n.default) == null ? void 0 : s.call(n)])
    }), {}
  }
}), yS = bs("v-card-subtitle"), dr = bs("v-card-title");

function bS(e) {
  return {
    aspectStyles: b(() => {
      const t = Number(e.aspectRatio);
      return t ? {paddingBottom: String(1 / t * 100) + "%"} : void 0
    })
  }
}

const Xd = G({aspectRatio: [String, Number], contentClass: String, inline: Boolean, ...ye(), ...ws()}, "VResponsive"),
    Mu = ae()({
      name: "VResponsive", props: Xd(), setup(e, t) {
        let {slots: n} = t;
        const {aspectStyles: s} = bS(e), {dimensionStyles: r} = Cs(e);
        return fe(() => {
          var o;
          return v("div", {
            class: ["v-responsive", {"v-responsive--inline": e.inline}, e.class],
            style: [r.value, e.style]
          }, [v("div", {
            class: "v-responsive__sizer",
            style: s.value
          }, null), (o = n.additional) == null ? void 0 : o.call(n), n.default && v("div", {class: ["v-responsive__content", e.contentClass]}, [n.default()])])
        }), {}
      }
    }), $a = G({
      transition: {
        type: [Boolean, String, Object],
        default: "fade-transition",
        validator: e => e !== !0
      }
    }, "transition"), Hn = (e, t) => {
      let {slots: n} = t;
      const {transition: s, disabled: r, ...o} = e, {component: i = qn, ...a} = typeof s == "object" ? s : {};
      return En(i, $e(typeof s == "string" ? {name: r ? "" : s} : a, o, {disabled: r}), n)
    };

function SS(e, t) {
  if (!ya) return;
  const n = t.modifiers || {}, s = t.value, {handler: r, options: o} = typeof s == "object" ? s : {
    handler: s,
    options: {}
  }, i = new IntersectionObserver(function () {
    var f;
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
        l = arguments.length > 1 ? arguments[1] : void 0;
    const c = (f = e._observe) == null ? void 0 : f[t.instance.$.uid];
    if (!c) return;
    const u = a.some(d => d.isIntersecting);
    r && (!n.quiet || c.init) && (!n.once || u || c.init) && r(u, a, l), u && n.once ? Zd(e, t) : c.init = !0
  }, o);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {init: !1, observer: i}, i.observe(e)
}

function Zd(e, t) {
  var s;
  const n = (s = e._observe) == null ? void 0 : s[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid])
}

const _S = {mounted: SS, unmounted: Zd}, Qd = _S, wS = G({
      alt: String,
      cover: Boolean,
      draggable: {type: [Boolean, String], default: void 0},
      eager: Boolean,
      gradient: String,
      lazySrc: String,
      options: {type: Object, default: () => ({root: void 0, rootMargin: void 0, threshold: void 0})},
      sizes: String,
      src: {type: [String, Object], default: ""},
      crossorigin: String,
      referrerpolicy: String,
      srcset: String,
      position: String, ...Xd(), ...ye(), ...$a()
    }, "VImg"), Na = ae()({
      name: "VImg",
      directives: {intersect: Qd},
      props: wS(),
      emits: {loadstart: e => !0, load: e => !0, error: e => !0},
      setup(e, t) {
        let {emit: n, slots: s} = t;
        const r = Qe("VImg"), o = pe(""), i = Z(), a = pe(e.eager ? "loading" : "idle"), l = pe(), c = pe(),
            u = b(() => e.src && typeof e.src == "object" ? {
              src: e.src.src,
              srcset: e.srcset || e.src.srcset,
              lazySrc: e.lazySrc || e.src.lazySrc,
              aspect: Number(e.aspectRatio || e.src.aspect || 0)
            } : {src: e.src, srcset: e.srcset, lazySrc: e.lazySrc, aspect: Number(e.aspectRatio || 0)}),
            f = b(() => u.value.aspect || l.value / c.value || 0);
        Ee(() => e.src, () => {
          d(a.value !== "idle")
        }), Ee(f, (C, P) => {
          !C && P && i.value && S(i.value)
        }), vo(() => d());

        function d(C) {
          if (!(e.eager && C) && !(ya && !C && !e.eager)) {
            if (a.value = "loading", u.value.lazySrc) {
              const P = new Image;
              P.src = u.value.lazySrc, S(P, null)
            }
            u.value.src && mt(() => {
              var P;
              n("loadstart", ((P = i.value) == null ? void 0 : P.currentSrc) || u.value.src), setTimeout(() => {
                var F;
                if (!r.isUnmounted) if ((F = i.value) != null && F.complete) {
                  if (i.value.naturalWidth || h(), a.value === "error") return;
                  f.value || S(i.value, null), a.value === "loading" && m()
                } else f.value || S(i.value), g()
              })
            })
          }
        }

        function m() {
          var C;
          r.isUnmounted || (g(), S(i.value), a.value = "loaded", n("load", ((C = i.value) == null ? void 0 : C.currentSrc) || u.value.src))
        }

        function h() {
          var C;
          r.isUnmounted || (a.value = "error", n("error", ((C = i.value) == null ? void 0 : C.currentSrc) || u.value.src))
        }

        function g() {
          const C = i.value;
          C && (o.value = C.currentSrc || C.src)
        }

        let w = -1;
        vt(() => {
          clearTimeout(w)
        });

        function S(C) {
          let P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
          const F = () => {
            if (clearTimeout(w), r.isUnmounted) return;
            const {naturalHeight: M, naturalWidth: z} = C;
            M || z ? (l.value = z, c.value = M) : !C.complete && a.value === "loading" && P != null ? w = window.setTimeout(F, P) : (C.currentSrc.endsWith(".svg") || C.currentSrc.startsWith("data:image/svg+xml")) && (l.value = 1, c.value = 1)
          };
          F()
        }

        const _ = b(() => ({"v-img__img--cover": e.cover, "v-img__img--contain": !e.cover})), T = () => {
              var F;
              if (!u.value.src || a.value === "idle") return null;
              const C = v("img", {
                class: ["v-img__img", _.value],
                style: {objectPosition: e.position},
                src: u.value.src,
                srcset: u.value.srcset,
                alt: e.alt,
                crossorigin: e.crossorigin,
                referrerpolicy: e.referrerpolicy,
                draggable: e.draggable,
                sizes: e.sizes,
                ref: i,
                onLoad: m,
                onError: h
              }, null), P = (F = s.sources) == null ? void 0 : F.call(s);
              return v(Hn, {
                transition: e.transition,
                appear: !0
              }, {default: () => [jt(P ? v("picture", {class: "v-img__picture"}, [P, C]) : C, [[bo, a.value === "loaded"]])]})
            }, V = () => v(Hn, {transition: e.transition}, {
              default: () => [u.value.lazySrc && a.value !== "loaded" && v("img", {
                class: ["v-img__img", "v-img__img--preload", _.value],
                style: {objectPosition: e.position},
                src: u.value.lazySrc,
                alt: e.alt,
                crossorigin: e.crossorigin,
                referrerpolicy: e.referrerpolicy,
                draggable: e.draggable
              }, null)]
            }), R = () => s.placeholder ? v(Hn, {
              transition: e.transition,
              appear: !0
            }, {default: () => [(a.value === "loading" || a.value === "error" && !s.error) && v("div", {class: "v-img__placeholder"}, [s.placeholder()])]}) : null,
            x = () => s.error ? v(Hn, {
              transition: e.transition,
              appear: !0
            }, {default: () => [a.value === "error" && v("div", {class: "v-img__error"}, [s.error()])]}) : null,
            B = () => e.gradient ? v("div", {
              class: "v-img__gradient",
              style: {backgroundImage: `linear-gradient(${e.gradient})`}
            }, null) : null, E = pe(!1);
        {
          const C = Ee(f, P => {
            P && (requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                E.value = !0
              })
            }), C())
          })
        }
        return fe(() => {
          const C = Mu.filterProps(e);
          return jt(v(Mu, $e({
            class: ["v-img", {"v-img--booting": !E.value}, e.class],
            style: [{width: he(e.width === "auto" ? l.value : e.width)}, e.style]
          }, C, {
            aspectRatio: f.value,
            "aria-label": e.alt,
            role: e.alt ? "img" : void 0
          }), {
            additional: () => v(Se, null, [v(T, null, null), v(V, null, null), v(B, null, null), v(R, null, null), v(x, null, null)]),
            default: s.default
          }), [[ps("intersect"), {handler: d, options: e.options}, null, {once: !0}]])
        }), {currentSrc: o, image: i, state: a, naturalWidth: l, naturalHeight: c}
      }
    }), CS = G({
      start: Boolean,
      end: Boolean,
      icon: Le,
      image: String,
      text: String, ...ye(), ...on(), ...Vt(), ...Io(), ...Xe(), ...Je(), ..._s({variant: "flat"})
    }, "VAvatar"), Zr = ae()({
      name: "VAvatar", props: CS(), setup(e, t) {
        let {slots: n} = t;
        const {themeClasses: s} = st(e), {
          colorClasses: r,
          colorStyles: o,
          variantClasses: i
        } = ko(e), {densityClasses: a} = Pn(e), {roundedClasses: l} = Bt(e), {sizeClasses: c, sizeStyles: u} = Vo(e);
        return fe(() => v(e.tag, {
          class: ["v-avatar", {
            "v-avatar--start": e.start,
            "v-avatar--end": e.end
          }, s.value, r.value, a.value, l.value, c.value, i.value, e.class], style: [o.value, u.value, e.style]
        }, {
          default: () => {
            var f;
            return [e.image ? v(Na, {key: "image", src: e.image, alt: "", cover: !0}, null) : e.icon ? v(Qt, {
              key: "icon",
              icon: e.icon
            }, null) : ((f = n.default) == null ? void 0 : f.call(n)) ?? e.text, Oo(!1, "v-avatar")]
          }
        })), {}
      }
    }), ES = G({
      appendAvatar: String,
      appendIcon: Le,
      prependAvatar: String,
      prependIcon: Le,
      subtitle: [String, Number],
      title: [String, Number], ...ye(), ...on()
    }, "VCardItem"), xS = ae()({
      name: "VCardItem", props: ES(), setup(e, t) {
        let {slots: n} = t;
        return fe(() => {
          var c;
          const s = !!(e.prependAvatar || e.prependIcon), r = !!(s || n.prepend), o = !!(e.appendAvatar || e.appendIcon),
              i = !!(o || n.append), a = !!(e.title != null || n.title), l = !!(e.subtitle != null || n.subtitle);
          return v("div", {class: ["v-card-item", e.class], style: e.style}, [r && v("div", {
            key: "prepend",
            class: "v-card-item__prepend"
          }, [n.prepend ? v(Ct, {
            key: "prepend-defaults",
            disabled: !s,
            defaults: {VAvatar: {density: e.density, icon: e.prependIcon, image: e.prependAvatar}}
          }, n.prepend) : s && v(Zr, {
            key: "prepend-avatar",
            density: e.density,
            icon: e.prependIcon,
            image: e.prependAvatar
          }, null)]), v("div", {class: "v-card-item__content"}, [a && v(dr, {key: "title"}, {
            default: () => {
              var u;
              return [((u = n.title) == null ? void 0 : u.call(n)) ?? e.title]
            }
          }), l && v(yS, {key: "subtitle"}, {
            default: () => {
              var u;
              return [((u = n.subtitle) == null ? void 0 : u.call(n)) ?? e.subtitle]
            }
          }), (c = n.default) == null ? void 0 : c.call(n)]), i && v("div", {
            key: "append",
            class: "v-card-item__append"
          }, [n.append ? v(Ct, {
            key: "append-defaults",
            disabled: !o,
            defaults: {VAvatar: {density: e.density, icon: e.appendIcon, image: e.appendAvatar}}
          }, n.append) : o && v(Zr, {
            key: "append-avatar",
            density: e.density,
            icon: e.appendIcon,
            image: e.appendAvatar
          }, null)])])
        }), {}
      }
    }), Da = bs("v-card-text"), AS = G({
      appendAvatar: String,
      appendIcon: Le,
      disabled: Boolean,
      flat: Boolean,
      hover: Boolean,
      image: String,
      link: {type: Boolean, default: void 0},
      prependAvatar: String,
      prependIcon: Le,
      ripple: {type: [Boolean, Object], default: !0},
      subtitle: [String, Number],
      text: [String, Number],
      title: [String, Number], ...An(), ...ye(), ...on(), ...ws(), ...Rn(), ...ka(), ...Bo(), ...Va(), ...Vt(), ...Ma(), ...Xe(), ...Je(), ..._s({variant: "elevated"})
    }, "VCard"), Do = ae()({
      name: "VCard", directives: {Ripple: $o}, props: AS(), setup(e, t) {
        let {attrs: n, slots: s} = t;
        const {themeClasses: r} = st(e), {borderClasses: o} = Tn(e), {
              colorClasses: i,
              colorStyles: a,
              variantClasses: l
            } = ko(e), {densityClasses: c} = Pn(e), {dimensionStyles: u} = Cs(e), {elevationClasses: f} = On(e), {loaderClasses: d} = Mo(e), {locationStyles: m} = Lo(e), {positionClasses: h} = Ba(e), {roundedClasses: g} = Bt(e),
            w = La(e, n), S = b(() => e.link !== !1 && w.isLink.value),
            _ = b(() => !e.disabled && e.link !== !1 && (e.link || w.isClickable.value));
        return fe(() => {
          const T = S.value ? "a" : e.tag, V = !!(s.title || e.title != null), R = !!(s.subtitle || e.subtitle != null),
              x = V || R, B = !!(s.append || e.appendAvatar || e.appendIcon),
              E = !!(s.prepend || e.prependAvatar || e.prependIcon), C = !!(s.image || e.image), P = x || E || B,
              F = !!(s.text || e.text != null);
          return jt(v(T, {
            class: ["v-card", {
              "v-card--disabled": e.disabled,
              "v-card--flat": e.flat,
              "v-card--hover": e.hover && !(e.disabled || e.flat),
              "v-card--link": _.value
            }, r.value, o.value, i.value, c.value, f.value, d.value, h.value, g.value, l.value, e.class],
            style: [a.value, u.value, m.value, e.style],
            href: w.href.value,
            onClick: _.value && w.navigate,
            tabindex: e.disabled ? -1 : void 0
          }, {
            default: () => {
              var M;
              return [C && v("div", {key: "image", class: "v-card__image"}, [s.image ? v(Ct, {
                key: "image-defaults",
                disabled: !e.image,
                defaults: {VImg: {cover: !0, src: e.image}}
              }, s.image) : v(Na, {key: "image-img", cover: !0, src: e.image}, null)]), v(Ia, {
                name: "v-card",
                active: !!e.loading,
                color: typeof e.loading == "boolean" ? void 0 : e.loading
              }, {default: s.loader}), P && v(xS, {
                key: "item",
                prependAvatar: e.prependAvatar,
                prependIcon: e.prependIcon,
                title: e.title,
                subtitle: e.subtitle,
                appendAvatar: e.appendAvatar,
                appendIcon: e.appendIcon
              }, {
                default: s.item,
                prepend: s.prepend,
                title: s.title,
                subtitle: s.subtitle,
                append: s.append
              }), F && v(Da, {key: "text"}, {
                default: () => {
                  var z;
                  return [((z = s.text) == null ? void 0 : z.call(s)) ?? e.text]
                }
              }), (M = s.default) == null ? void 0 : M.call(s), s.actions && v(Jd, null, {default: s.actions}), Oo(_.value, "v-card")]
            }
          }), [[ps("ripple"), _.value && e.ripple]])
        }), {}
      }
    }), TS = G({
      color: String,
      inset: Boolean,
      length: [Number, String],
      thickness: [Number, String],
      vertical: Boolean, ...ye(), ...Je()
    }, "VDivider"), Fa = ae()({
      name: "VDivider", props: TS(), setup(e, t) {
        let {attrs: n} = t;
        const {themeClasses: s} = st(e), {textColorClasses: r, textColorStyles: o} = tn(ue(e, "color")), i = b(() => {
          const a = {};
          return e.length && (a[e.vertical ? "maxHeight" : "maxWidth"] = he(e.length)), e.thickness && (a[e.vertical ? "borderRightWidth" : "borderTopWidth"] = he(e.thickness)), a
        });
        return fe(() => v("hr", {
          class: [{
            "v-divider": !0,
            "v-divider--inset": e.inset,
            "v-divider--vertical": e.vertical
          }, s.value, r.value, e.class],
          style: [i.value, o.value, e.style],
          "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
          role: `${n.role || "separator"}`
        }, null)), {}
      }
    }), PS = G({fluid: {type: Boolean, default: !1}, ...ye(), ...Xe()}, "VContainer"), Ha = ae()({
      name: "VContainer", props: PS(), setup(e, t) {
        let {slots: n} = t;
        const {rtlClasses: s} = xn();
        return fe(() => v(e.tag, {
          class: ["v-container", {"v-container--fluid": e.fluid}, s.value, e.class],
          style: e.style
        }, n)), {}
      }
    }), RS = bs("v-spacer", "div", "VSpacer"),
    OS = G({color: String, ...An(), ...ye(), ...ws(), ...Rn(), ...Bo(), ...Va(), ...Vt(), ...Xe(), ...Je()}, "VSheet"),
    eh = ae()({
      name: "VSheet", props: OS(), setup(e, t) {
        let {slots: n} = t;
        const {themeClasses: s} = st(e), {
          backgroundColorClasses: r,
          backgroundColorStyles: o
        } = nn(ue(e, "color")), {borderClasses: i} = Tn(e), {dimensionStyles: a} = Cs(e), {elevationClasses: l} = On(e), {locationStyles: c} = Lo(e), {positionClasses: u} = Ba(e), {roundedClasses: f} = Bt(e);
        return fe(() => v(e.tag, {
          class: ["v-sheet", s.value, r.value, i.value, l.value, u.value, f.value, e.class],
          style: [o.value, a.value, c.value, e.style]
        }, n)), {}
      }
    }), kS = G({
      disabled: Boolean,
      group: Boolean,
      hideOnLeave: Boolean,
      leaveAbsolute: Boolean,
      mode: String,
      origin: String
    }, "transition");

function gt(e, t, n) {
  return ae()({
    name: e, props: kS({mode: n, origin: t}), setup(s, r) {
      let {slots: o} = r;
      const i = {
        onBeforeEnter(a) {
          s.origin && (a.style.transformOrigin = s.origin)
        }, onLeave(a) {
          if (s.leaveAbsolute) {
            const {offsetTop: l, offsetLeft: c, offsetWidth: u, offsetHeight: f} = a;
            a._transitionInitialStyles = {
              position: a.style.position,
              top: a.style.top,
              left: a.style.left,
              width: a.style.width,
              height: a.style.height
            }, a.style.position = "absolute", a.style.top = `${l}px`, a.style.left = `${c}px`, a.style.width = `${u}px`, a.style.height = `${f}px`
          }
          s.hideOnLeave && a.style.setProperty("display", "none", "important")
        }, onAfterLeave(a) {
          if (s.leaveAbsolute && (a != null && a._transitionInitialStyles)) {
            const {position: l, top: c, left: u, width: f, height: d} = a._transitionInitialStyles;
            delete a._transitionInitialStyles, a.style.position = l || "", a.style.top = c || "", a.style.left = u || "", a.style.width = f || "", a.style.height = d || ""
          }
        }
      };
      return () => {
        const a = s.group ? yf : qn;
        return En(a, {
          name: s.disabled ? "" : e,
          css: !s.disabled, ...s.group ? void 0 : {mode: s.mode}, ...s.disabled ? {} : i
        }, o.default)
      }
    }
  })
}

function th(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return ae()({
    name: e, props: {mode: {type: String, default: n}, disabled: Boolean}, setup(s, r) {
      let {slots: o} = r;
      return () => En(qn, {name: s.disabled ? "" : e, css: !s.disabled, ...s.disabled ? {} : t}, o.default)
    }
  })
}

function nh() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height",
      s = Et(`offset-${n}`);
  return {
    onBeforeEnter(i) {
      i._parent = i.parentNode, i._initialStyle = {
        transition: i.style.transition,
        overflow: i.style.overflow,
        [n]: i.style[n]
      }
    }, onEnter(i) {
      const a = i._initialStyle;
      i.style.setProperty("transition", "none", "important"), i.style.overflow = "hidden";
      const l = `${i[s]}px`;
      i.style[n] = "0", i.offsetHeight, i.style.transition = a.transition, e && i._parent && i._parent.classList.add(e), requestAnimationFrame(() => {
        i.style[n] = l
      })
    }, onAfterEnter: o, onEnterCancelled: o, onLeave(i) {
      i._initialStyle = {
        transition: "",
        overflow: i.style.overflow,
        [n]: i.style[n]
      }, i.style.overflow = "hidden", i.style[n] = `${i[s]}px`, i.offsetHeight, requestAnimationFrame(() => i.style[n] = "0")
    }, onAfterLeave: r, onLeaveCancelled: r
  };

  function r(i) {
    e && i._parent && i._parent.classList.remove(e), o(i)
  }

  function o(i) {
    const a = i._initialStyle[n];
    i.style.overflow = i._initialStyle.overflow, a != null && (i.style[n] = a), delete i._initialStyle
  }
}

gt("fab-transition", "center center", "out-in");
gt("dialog-bottom-transition");
gt("dialog-top-transition");
gt("fade-transition");
const IS = gt("scale-transition");
gt("scroll-x-transition");
gt("scroll-x-reverse-transition");
gt("scroll-y-transition");
gt("scroll-y-reverse-transition");
gt("slide-x-transition");
const $w = gt("slide-x-reverse-transition"), sh = gt("slide-y-transition");
gt("slide-y-reverse-transition");
const rh = th("expand-transition", nh()), VS = th("expand-x-transition", nh("", !0));

function oh(e) {
  const {t} = fp();

  function n(s) {
    let {name: r} = s;
    const o = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[r], i = e[`onClick:${r}`], a = i && o ? t(`$vuetify.input.${o}`, e.label ?? "") : void 0;
    return v(Qt, {icon: e[`${r}Icon`], "aria-label": a, onClick: i}, null)
  }

  return {InputIcon: n}
}

const BS = G({
  active: Boolean,
  color: String,
  messages: {type: [Array, String], default: () => []}, ...ye(), ...$a({
    transition: {
      component: sh,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), LS = ae()({
  name: "VMessages", props: BS(), setup(e, t) {
    let {slots: n} = t;
    const s = b(() => Sn(e.messages)), {textColorClasses: r, textColorStyles: o} = tn(b(() => e.color));
    return fe(() => v(Hn, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", r.value, e.class],
      style: [o.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && s.value.map((i, a) => v("div", {
        class: "v-messages__message",
        key: `${a}-${s.value}`
      }, [n.message ? n.message({message: i}) : i]))]
    })), {}
  }
}), ih = G({focused: Boolean, "onUpdate:focused": _n()}, "focus");

function ja(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  const n = it(e, "focused"), s = b(() => ({[`${t}--focused`]: n.value}));

  function r() {
    n.value = !0
  }

  function o() {
    n.value = !1
  }

  return {focusClasses: s, isFocused: n, focus: r, blur: o}
}

const ah = Symbol.for("vuetify:form"), MS = G({
  disabled: Boolean,
  fastFail: Boolean,
  readonly: Boolean,
  modelValue: {type: Boolean, default: null},
  validateOn: {type: String, default: "input"}
}, "form");

function $S(e) {
  const t = it(e, "modelValue"), n = b(() => e.disabled), s = b(() => e.readonly), r = pe(!1), o = Z([]), i = Z([]);

  async function a() {
    const u = [];
    let f = !0;
    i.value = [], r.value = !0;
    for (const d of o.value) {
      const m = await d.validate();
      if (m.length > 0 && (f = !1, u.push({id: d.id, errorMessages: m})), !f && e.fastFail) break
    }
    return i.value = u, r.value = !1, {valid: f, errors: i.value}
  }

  function l() {
    o.value.forEach(u => u.reset())
  }

  function c() {
    o.value.forEach(u => u.resetValidation())
  }

  return Ee(o, () => {
    let u = 0, f = 0;
    const d = [];
    for (const m of o.value) m.isValid === !1 ? (f++, d.push({
      id: m.id,
      errorMessages: m.errorMessages
    })) : m.isValid === !0 && u++;
    i.value = d, t.value = f > 0 ? !1 : u === o.value.length ? !0 : null
  }, {deep: !0}), Ye(ah, {
    register: u => {
      let {id: f, validate: d, reset: m, resetValidation: h} = u;
      o.value.some(g => g.id === f), o.value.push({
        id: f,
        validate: d,
        reset: m,
        resetValidation: h,
        isValid: null,
        errorMessages: []
      })
    }, unregister: u => {
      o.value = o.value.filter(f => f.id !== u)
    }, update: (u, f, d) => {
      const m = o.value.find(h => h.id === u);
      m && (m.isValid = f, m.errorMessages = d)
    }, isDisabled: n, isReadonly: s, isValidating: r, isValid: t, items: o, validateOn: ue(e, "validateOn")
  }), {
    errors: i,
    isDisabled: n,
    isReadonly: s,
    isValidating: r,
    isValid: t,
    items: o,
    validate: a,
    reset: l,
    resetValidation: c
  }
}

function NS() {
  return Pe(ah, null)
}

const DS = G({
  disabled: {type: Boolean, default: null},
  error: Boolean,
  errorMessages: {type: [Array, String], default: () => []},
  maxErrors: {type: [Number, String], default: 1},
  name: String,
  label: String,
  readonly: {type: Boolean, default: null},
  rules: {type: Array, default: () => []},
  modelValue: null,
  validateOn: String,
  validationValue: null, ...ih()
}, "validation");

function FS(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt(),
      n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : It();
  const s = it(e, "modelValue"), r = b(() => e.validationValue === void 0 ? s.value : e.validationValue), o = NS(),
      i = Z([]), a = pe(!0),
      l = b(() => !!(Sn(s.value === "" ? null : s.value).length || Sn(r.value === "" ? null : r.value).length)),
      c = b(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))),
      u = b(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), f = b(() => {
        var V;
        return (V = e.errorMessages) != null && V.length ? Sn(e.errorMessages).concat(i.value).slice(0, Math.max(0, +e.maxErrors)) : i.value
      }), d = b(() => {
        let V = (e.validateOn ?? (o == null ? void 0 : o.validateOn.value)) || "input";
        V === "lazy" && (V = "input lazy");
        const R = new Set((V == null ? void 0 : V.split(" ")) ?? []);
        return {blur: R.has("blur") || R.has("input"), input: R.has("input"), submit: R.has("submit"), lazy: R.has("lazy")}
      }), m = b(() => {
        var V;
        return e.error || (V = e.errorMessages) != null && V.length ? !1 : e.rules.length ? a.value ? i.value.length || d.value.lazy ? null : !0 : !i.value.length : !0
      }), h = pe(!1), g = b(() => ({
        [`${t}--error`]: m.value === !1,
        [`${t}--dirty`]: l.value,
        [`${t}--disabled`]: c.value,
        [`${t}--readonly`]: u.value
      })), w = b(() => e.name ?? be(n));
  vo(() => {
    o == null || o.register({id: w.value, validate: T, reset: S, resetValidation: _})
  }), vt(() => {
    o == null || o.unregister(w.value)
  }), Ut(async () => {
    d.value.lazy || await T(!0), o == null || o.update(w.value, m.value, f.value)
  }), as(() => d.value.input, () => {
    Ee(r, () => {
      if (r.value != null) T(); else if (e.focused) {
        const V = Ee(() => e.focused, R => {
          R || T(), V()
        })
      }
    })
  }), as(() => d.value.blur, () => {
    Ee(() => e.focused, V => {
      V || T()
    })
  }), Ee(m, () => {
    o == null || o.update(w.value, m.value, f.value)
  });

  function S() {
    s.value = null, mt(_)
  }

  function _() {
    a.value = !0, d.value.lazy ? i.value = [] : T(!0)
  }

  async function T() {
    let V = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const R = [];
    h.value = !0;
    for (const x of e.rules) {
      if (R.length >= +(e.maxErrors ?? 1)) break;
      const E = await (typeof x == "function" ? x : () => x)(r.value);
      if (E !== !0) {
        if (E !== !1 && typeof E != "string") {
          console.warn(`${E} is not a valid value. Rule functions must return boolean true or a string.`);
          continue
        }
        R.push(E || "")
      }
    }
    return i.value = R, h.value = !1, a.value = V, i.value
  }

  return {
    errorMessages: f,
    isDirty: l,
    isDisabled: c,
    isReadonly: u,
    isPristine: a,
    isValid: m,
    isValidating: h,
    reset: S,
    resetValidation: _,
    validate: T,
    validationClasses: g
  }
}

const Ua = G({
  id: String,
  appendIcon: Le,
  centerAffix: {type: Boolean, default: !0},
  prependIcon: Le,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {type: [Array, String], default: () => []},
  direction: {type: String, default: "horizontal", validator: e => ["horizontal", "vertical"].includes(e)},
  "onClick:prepend": _n(),
  "onClick:append": _n(), ...ye(), ...on(), ...DS()
}, "VInput"), Qr = ae()({
  name: "VInput", props: {...Ua()}, emits: {"update:modelValue": e => !0}, setup(e, t) {
    let {attrs: n, slots: s, emit: r} = t;
    const {densityClasses: o} = Pn(e), {rtlClasses: i} = xn(), {InputIcon: a} = oh(e), l = It(),
        c = b(() => e.id || `input-${l}`), u = b(() => `${c.value}-messages`), {
          errorMessages: f,
          isDirty: d,
          isDisabled: m,
          isReadonly: h,
          isPristine: g,
          isValid: w,
          isValidating: S,
          reset: _,
          resetValidation: T,
          validate: V,
          validationClasses: R
        } = FS(e, "v-input", c), x = b(() => ({
          id: c,
          messagesId: u,
          isDirty: d,
          isDisabled: m,
          isReadonly: h,
          isPristine: g,
          isValid: w,
          isValidating: S,
          reset: _,
          resetValidation: T,
          validate: V
        })), B = b(() => {
          var E;
          return (E = e.errorMessages) != null && E.length || !g.value && f.value.length ? f.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages
        });
    return fe(() => {
      var M, z, te, se;
      const E = !!(s.prepend || e.prependIcon), C = !!(s.append || e.appendIcon), P = B.value.length > 0,
          F = !e.hideDetails || e.hideDetails === "auto" && (P || !!s.details);
      return v("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, i.value, R.value, e.class], style: e.style
      }, [E && v("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(M = s.prepend) == null ? void 0 : M.call(s, x.value), e.prependIcon && v(a, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), s.default && v("div", {class: "v-input__control"}, [(z = s.default) == null ? void 0 : z.call(s, x.value)]), C && v("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && v(a, {
        key: "append-icon",
        name: "append"
      }, null), (te = s.append) == null ? void 0 : te.call(s, x.value)]), F && v("div", {class: "v-input__details"}, [v(LS, {
        id: u.value,
        active: P,
        messages: B.value
      }, {message: s.message}), (se = s.details) == null ? void 0 : se.call(s, x.value)])])
    }), {reset: _, resetValidation: T, validate: V, isValid: w, errorMessages: f}
  }
}), HS = G({text: String, clickable: Boolean, ...ye(), ...Je()}, "VLabel"), lh = ae()({
  name: "VLabel", props: HS(), setup(e, t) {
    let {slots: n} = t;
    return fe(() => {
      var s;
      return v("label", {
        class: ["v-label", {"v-label--clickable": e.clickable}, e.class],
        style: e.style
      }, [e.text, (s = n.default) == null ? void 0 : s.call(n)])
    }), {}
  }
}), uh = Symbol.for("vuetify:selection-control-group"), ch = G({
  color: String,
  disabled: {type: Boolean, default: null},
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: Le,
  trueIcon: Le,
  ripple: {type: Boolean, default: !0},
  multiple: {type: Boolean, default: null},
  name: String,
  readonly: {type: Boolean, default: null},
  modelValue: null,
  type: String,
  valueComparator: {type: Function, default: lr}, ...ye(), ...on(), ...Je()
}, "SelectionControlGroup"), jS = G({...ch({defaultsTarget: "VSelectionControl"})}, "VSelectionControlGroup");
ae()({
  name: "VSelectionControlGroup", props: jS(), emits: {"update:modelValue": e => !0}, setup(e, t) {
    let {slots: n} = t;
    const s = it(e, "modelValue"), r = It(), o = b(() => e.id || `v-selection-control-group-${r}`),
        i = b(() => e.name || o.value), a = new Set;
    return Ye(uh, {
      modelValue: s, forceUpdate: () => {
        a.forEach(l => l())
      }, onForceUpdate: l => {
        a.add(l), oo(() => {
          a.delete(l)
        })
      }
    }), Yn({
      [e.defaultsTarget]: {
        color: ue(e, "color"),
        disabled: ue(e, "disabled"),
        density: ue(e, "density"),
        error: ue(e, "error"),
        inline: ue(e, "inline"),
        modelValue: s,
        multiple: b(() => !!e.multiple || e.multiple == null && Array.isArray(s.value)),
        name: i,
        falseIcon: ue(e, "falseIcon"),
        trueIcon: ue(e, "trueIcon"),
        readonly: ue(e, "readonly"),
        ripple: ue(e, "ripple"),
        type: ue(e, "type"),
        valueComparator: ue(e, "valueComparator")
      }
    }), fe(() => {
      var l;
      return v("div", {
        class: ["v-selection-control-group", {"v-selection-control-group--inline": e.inline}, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(l = n.default) == null ? void 0 : l.call(n)])
    }), {}
  }
});
const fh = G({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null, ...ye(), ...ch()
}, "VSelectionControl");

function US(e) {
  const t = Pe(uh, void 0), {densityClasses: n} = Pn(e), s = it(e, "modelValue"),
      r = b(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0),
      o = b(() => e.falseValue !== void 0 ? e.falseValue : !1),
      i = b(() => !!e.multiple || e.multiple == null && Array.isArray(s.value)), a = b({
        get() {
          const m = t ? t.modelValue.value : s.value;
          return i.value ? Sn(m).some(h => e.valueComparator(h, r.value)) : e.valueComparator(m, r.value)
        }, set(m) {
          if (e.readonly) return;
          const h = m ? r.value : o.value;
          let g = h;
          i.value && (g = m ? [...Sn(s.value), h] : Sn(s.value).filter(w => !e.valueComparator(w, r.value))), t ? t.modelValue.value = g : s.value = g
        }
      }), {textColorClasses: l, textColorStyles: c} = tn(b(() => {
        if (!(e.error || e.disabled)) return a.value ? e.color : e.baseColor
      })), {
        backgroundColorClasses: u,
        backgroundColorStyles: f
      } = nn(b(() => a.value && !e.error && !e.disabled ? e.color : void 0)),
      d = b(() => a.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: r,
    falseValue: o,
    model: a,
    textColorClasses: l,
    textColorStyles: c,
    backgroundColorClasses: u,
    backgroundColorStyles: f,
    icon: d
  }
}

const $u = ae()({
  name: "VSelectionControl",
  directives: {Ripple: $o},
  inheritAttrs: !1,
  props: fh(),
  emits: {"update:modelValue": e => !0},
  setup(e, t) {
    let {attrs: n, slots: s} = t;
    const {
      group: r,
      densityClasses: o,
      icon: i,
      model: a,
      textColorClasses: l,
      textColorStyles: c,
      backgroundColorClasses: u,
      backgroundColorStyles: f,
      trueValue: d
    } = US(e), m = It(), h = b(() => e.id || `input-${m}`), g = pe(!1), w = pe(!1), S = Z();
    r == null || r.onForceUpdate(() => {
      S.value && (S.value.checked = a.value)
    });

    function _(R) {
      g.value = !0, Rg(R.target, ":focus-visible") !== !1 && (w.value = !0)
    }

    function T() {
      g.value = !1, w.value = !1
    }

    function V(R) {
      e.readonly && r && mt(() => r.forceUpdate()), a.value = R.target.checked
    }

    return fe(() => {
      var C, P;
      const R = s.label ? s.label({label: e.label, props: {for: h.value}}) : e.label, [x, B] = Sa(n),
          E = v("input", $e({
            ref: S,
            checked: a.value,
            disabled: !!(e.readonly || e.disabled),
            id: h.value,
            onBlur: T,
            onFocus: _,
            onInput: V,
            "aria-disabled": !!(e.readonly || e.disabled),
            type: e.type,
            value: d.value,
            name: e.name,
            "aria-checked": e.type === "checkbox" ? a.value : void 0
          }, B), null);
      return v("div", $e({
        class: ["v-selection-control", {
          "v-selection-control--dirty": a.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": w.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, x, {style: e.style}), [v("div", {
        class: ["v-selection-control__wrapper", l.value],
        style: c.value
      }, [(C = s.default) == null ? void 0 : C.call(s, {
        backgroundColorClasses: u,
        backgroundColorStyles: f
      }), jt(v("div", {class: ["v-selection-control__input"]}, [((P = s.input) == null ? void 0 : P.call(s, {
        model: a,
        textColorClasses: l,
        textColorStyles: c,
        backgroundColorClasses: u,
        backgroundColorStyles: f,
        inputNode: E,
        icon: i.value,
        props: {onFocus: _, onBlur: T, id: h.value}
      })) ?? v(Se, null, [i.value && v(Qt, {
        key: "icon",
        icon: i.value
      }, null), E])]), [[ps("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), R && v(lh, {
        for: h.value,
        clickable: !0,
        onClick: F => F.stopPropagation()
      }, {default: () => [R]})])
    }), {isFocused: g, input: S}
  }
}), zS = G({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {type: [Boolean, String], default: !1}, ...Ua(), ...fh()
}, "VSwitch"), WS = ae()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: zS(),
  emits: {"update:focused": e => !0, "update:modelValue": e => !0, "update:indeterminate": e => !0},
  setup(e, t) {
    let {attrs: n, slots: s} = t;
    const r = it(e, "indeterminate"), o = it(e, "modelValue"), {loaderClasses: i} = Mo(e), {
          isFocused: a,
          focus: l,
          blur: c
        } = ja(e), u = Z(), f = b(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), d = It(),
        m = b(() => e.id || `switch-${d}`);

    function h() {
      r.value && (r.value = !1)
    }

    function g(w) {
      var S, _;
      w.stopPropagation(), w.preventDefault(), (_ = (S = u.value) == null ? void 0 : S.input) == null || _.click()
    }

    return fe(() => {
      const [w, S] = Sa(n), _ = Qr.filterProps(e), T = $u.filterProps(e);
      return v(Qr, $e({class: ["v-switch", {"v-switch--inset": e.inset}, {"v-switch--indeterminate": r.value}, i.value, e.class]}, w, _, {
        modelValue: o.value,
        "onUpdate:modelValue": V => o.value = V,
        id: m.value,
        focused: a.value,
        style: e.style
      }), {
        ...s, default: V => {
          let {id: R, messagesId: x, isDisabled: B, isReadonly: E, isValid: C} = V;
          return v($u, $e({ref: u}, T, {
            modelValue: o.value,
            "onUpdate:modelValue": [P => o.value = P, h],
            id: R.value,
            "aria-describedby": x.value,
            type: "checkbox",
            "aria-checked": r.value ? "mixed" : void 0,
            disabled: B.value,
            readonly: E.value,
            onFocus: l,
            onBlur: c
          }, S), {
            ...s, default: P => {
              let {backgroundColorClasses: F, backgroundColorStyles: M} = P;
              return v("div", {class: ["v-switch__track", ...F.value], style: M.value, onClick: g}, null)
            }, input: P => {
              let {inputNode: F, icon: M, backgroundColorClasses: z, backgroundColorStyles: te} = P;
              return v(Se, null, [F, v("div", {
                class: ["v-switch__thumb", {"v-switch__thumb--filled": M || e.loading}, e.inset ? void 0 : z.value],
                style: e.inset ? void 0 : te.value
              }, [v(IS, null, {
                default: () => [e.loading ? v(Ia, {
                  name: "v-switch",
                  active: !0,
                  color: C.value === !1 ? void 0 : f.value
                }, {
                  default: se => s.loader ? s.loader(se) : v(Fd, {
                    active: se.isActive,
                    color: se.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : M && v(Qt, {key: M, icon: M, size: "x-small"}, null)]
              })])])
            }
          })
        }
      })
    }), {}
  }
}), KS = Ke({
  __name: "Module", setup(e) {
    rn().set_title("功能管理");
    const n = ze(new Map), s = o => {
      let i = n.get(o);
      W0(!i.status, i.plugin).then(a => {
        i.status = a.data.data.status, n.set(i.plugin, i), Ys.success(a.data.msg)
      })
    }, r = o => {
      let i;
      switch (o) {
        case"review": {
          i = py(() => import("./Reviewer-5zyDHVrW.js"), __vite__mapDeps([0, 1]));
          break
        }
        default:
          return null
      }
      return Wm(() => i)
    };
    return Ut(() => {
      z0().then(o => {
        o.data.data.forEach((i, a) => {
          G0(i).then(l => {
            n.set(l.data.data.plugin, l.data.data), K0(i).then(c => {
              let u = n.get(i);
              u != null && (u.status = c.data.data.status, n.set(i, u))
            })
          })
        })
      })
    }), (o, i) => (_e(), We(eh, {
      class: "d-flex flex-wrap justify-center",
      color: "#fff0"
    }, {
      default: ge(() => [(_e(!0), dt(Se, null, Fr(n.values(), a => (_e(), We(Do, {
        class: "ma-3",
        "max-width": "240",
        rounded: "lg",
        hover: ""
      }, {
        default: ge(() => [v(dr, null, {
          default: ge(() => [nt(Wn(a.name), 1)]),
          _: 2
        }, 1024), v(Da, null, {
          default: ge(() => [nt(Wn(a.desc), 1)]),
          _: 2
        }, 1024), v(Fa, {class: "mx-3"}), v(Jd, null, {
          default: ge(() => [v(No, {color: "#660092"}, {
            default: ge(() => [nt("设置 "), (_e(), We(nr(r(a.plugin))))]),
            _: 2
          }, 1024), v(RS), v(WS, {
            "onUpdate:modelValue": [l => s(a.plugin), l => a.status = l],
            modelValue: a.status,
            class: "mr-n16 mb-n5",
            color: "green"
          }, null, 8, ["onUpdate:modelValue", "modelValue"])]), _: 2
        }, 1024)]), _: 2
      }, 1024))), 256))]), _: 1
    }))
  }
}), GS = kt("br", null, null, -1), Nu = Ke({
  __name: "Profile", setup(e) {
    const t = rn(), {user: n} = Li(t);
    return t.set_title("基本信息"), H0().then(s => {
      t.set_user(s.data.me)
    }).catch(s => {
      s && hr.push("/login")
    }), (s, r) => (_e(), We(eh, {
      class: "d-flex flex-wrap justify-start",
      color: "#fff0"
    }, {
      default: ge(() => [v(Do, {
        class: "ma-3",
        "max-width": "240",
        rounded: "lg",
        hover: ""
      }, {
        default: ge(() => [v(dr, null, {
          default: ge(() => [nt("管理员")]),
          _: 1
        }), v(Da, null, {
          default: ge(() => [kt("a", null, [nt("UID: " + Wn(be(n).tuid) + " ", 1), GS, nt("NAME: " + Wn(be(n).username), 1)])]),
          _: 1
        })]), _: 1
      })]), _: 1
    }))
  }
}), qS = Ke({
  __name: "Logcat", setup(e) {
    return rn().set_title("日志"), (n, s) => " 日志界面 todo "
  }
}), YS = Ke({
  __name: "Manager", setup(e) {
    return rn().set_title("人员管理"), (n, s) => " 人员管理 todo "
  }
});/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const ns = typeof window < "u";

function JS(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module"
}

const xe = Object.assign;

function ai(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = Ot(r) ? r.map(e) : e(r)
  }
  return n
}

const Ms = () => {
}, Ot = Array.isArray, XS = /\/$/, ZS = e => e.replace(XS, "");

function li(e, t, n = "/") {
  let s, r = {}, o = "", i = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return a < l && a >= 0 && (l = -1), l > -1 && (s = t.slice(0, l), o = t.slice(l + 1, a > -1 ? a : t.length), r = e(o)), a > -1 && (s = s || t.slice(0, a), i = t.slice(a, t.length)), s = n_(s ?? t, n), {
    fullPath: s + (o && "?") + o + i,
    path: s,
    query: r,
    hash: i
  }
}

function QS(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "")
}

function Du(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}

function e_(e, t, n) {
  const s = t.matched.length - 1, r = n.matched.length - 1;
  return s > -1 && s === r && ds(t.matched[s], n.matched[r]) && dh(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}

function ds(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}

function dh(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!t_(e[n], t[n])) return !1;
  return !0
}

function t_(e, t) {
  return Ot(e) ? Fu(e, t) : Ot(t) ? Fu(t, e) : e === t
}

function Fu(e, t) {
  return Ot(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t
}

function n_(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"), s = e.split("/"), r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1, i, a;
  for (i = 0; i < s.length; i++) if (a = s[i], a !== ".") if (a === "..") o > 1 && o--; else break;
  return n.slice(0, o).join("/") + "/" + s.slice(i - (i === s.length ? 1 : 0)).join("/")
}

var Zs;
(function (e) {
  e.pop = "pop", e.push = "push"
})(Zs || (Zs = {}));
var $s;
(function (e) {
  e.back = "back", e.forward = "forward", e.unknown = ""
})($s || ($s = {}));

function s_(e) {
  if (!e) if (ns) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "")
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), ZS(e)
}

const r_ = /^[^#]+#/;

function o_(e, t) {
  return e.replace(r_, "#") + t
}

function i_(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {behavior: t.behavior, left: s.left - n.left - (t.left || 0), top: s.top - n.top - (t.top || 0)}
}

const Fo = () => ({left: window.pageXOffset, top: window.pageYOffset});

function a_(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"),
        r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) return;
    t = i_(r, e)
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}

function Hu(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}

const Wi = new Map;

function l_(e, t) {
  Wi.set(e, t)
}

function u_(e) {
  const t = Wi.get(e);
  return Wi.delete(e), t
}

let c_ = () => location.protocol + "//" + location.host;

function hh(e, t) {
  const {pathname: n, search: s, hash: r} = t, o = e.indexOf("#");
  if (o > -1) {
    let a = r.includes(e.slice(o)) ? e.slice(o).length : 1, l = r.slice(a);
    return l[0] !== "/" && (l = "/" + l), Du(l, "")
  }
  return Du(n, e) + s + r
}

function f_(e, t, n, s) {
  let r = [], o = [], i = null;
  const a = ({state: d}) => {
    const m = hh(e, location), h = n.value, g = t.value;
    let w = 0;
    if (d) {
      if (n.value = m, t.value = d, i && i === h) {
        i = null;
        return
      }
      w = g ? d.position - g.position : 0
    } else s(m);
    r.forEach(S => {
      S(n.value, h, {delta: w, type: Zs.pop, direction: w ? w > 0 ? $s.forward : $s.back : $s.unknown})
    })
  };

  function l() {
    i = n.value
  }

  function c(d) {
    r.push(d);
    const m = () => {
      const h = r.indexOf(d);
      h > -1 && r.splice(h, 1)
    };
    return o.push(m), m
  }

  function u() {
    const {history: d} = window;
    d.state && d.replaceState(xe({}, d.state, {scroll: Fo()}), "")
  }

  function f() {
    for (const d of o) d();
    o = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", u)
  }

  return window.addEventListener("popstate", a), window.addEventListener("beforeunload", u, {passive: !0}), {
    pauseListeners: l,
    listen: c,
    destroy: f
  }
}

function ju(e, t, n, s = !1, r = !1) {
  return {back: e, current: t, forward: n, replaced: s, position: window.history.length, scroll: r ? Fo() : null}
}

function d_(e) {
  const {history: t, location: n} = window, s = {value: hh(e, n)}, r = {value: t.state};
  r.value || o(s.value, {
    back: null,
    current: s.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);

  function o(l, c, u) {
    const f = e.indexOf("#"),
        d = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l : c_() + e + l;
    try {
      t[u ? "replaceState" : "pushState"](c, "", d), r.value = c
    } catch (m) {
      console.error(m), n[u ? "replace" : "assign"](d)
    }
  }

  function i(l, c) {
    const u = xe({}, t.state, ju(r.value.back, l, r.value.forward, !0), c, {position: r.value.position});
    o(l, u, !0), s.value = l
  }

  function a(l, c) {
    const u = xe({}, r.value, t.state, {forward: l, scroll: Fo()});
    o(u.current, u, !0);
    const f = xe({}, ju(s.value, l, null), {position: u.position + 1}, c);
    o(l, f, !1), s.value = l
  }

  return {location: s, state: r, push: a, replace: i}
}

function h_(e) {
  e = s_(e);
  const t = d_(e), n = f_(e, t.state, t.location, t.replace);

  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o)
  }

  const r = xe({location: "", base: e, go: s, createHref: o_.bind(null, e)}, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {enumerable: !0, get: () => t.state.value}), r
}

function m_(e) {
  return typeof e == "string" || e && typeof e == "object"
}

function mh(e) {
  return typeof e == "string" || typeof e == "symbol"
}

const cn = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, vh = Symbol("");
var Uu;
(function (e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated"
})(Uu || (Uu = {}));

function hs(e, t) {
  return xe(new Error, {type: e, [vh]: !0}, t)
}

function Kt(e, t) {
  return e instanceof Error && vh in e && (t == null || !!(e.type & t))
}

const zu = "[^/]+?", v_ = {sensitive: !1, strict: !1, start: !0, end: !0}, g_ = /[.+*?^${}()[\]/\\]/g;

function p_(e, t) {
  const n = xe({}, v_, t), s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const c of e) {
    const u = c.length ? [] : [90];
    n.strict && !c.length && (r += "/");
    for (let f = 0; f < c.length; f++) {
      const d = c[f];
      let m = 40 + (n.sensitive ? .25 : 0);
      if (d.type === 0) f || (r += "/"), r += d.value.replace(g_, "\\$&"), m += 40; else if (d.type === 1) {
        const {value: h, repeatable: g, optional: w, regexp: S} = d;
        o.push({name: h, repeatable: g, optional: w});
        const _ = S || zu;
        if (_ !== zu) {
          m += 10;
          try {
            new RegExp(`(${_})`)
          } catch (V) {
            throw new Error(`Invalid custom RegExp for param "${h}" (${_}): ` + V.message)
          }
        }
        let T = g ? `((?:${_})(?:/(?:${_}))*)` : `(${_})`;
        f || (T = w && c.length < 2 ? `(?:/${T})` : "/" + T), w && (T += "?"), r += T, m += 20, w && (m += -8), g && (m += -20), _ === ".*" && (m += -50)
      }
      u.push(m)
    }
    s.push(u)
  }
  if (n.strict && n.end) {
    const c = s.length - 1;
    s[c][s[c].length - 1] += .7000000000000001
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");

  function a(c) {
    const u = c.match(i), f = {};
    if (!u) return null;
    for (let d = 1; d < u.length; d++) {
      const m = u[d] || "", h = o[d - 1];
      f[h.name] = m && h.repeatable ? m.split("/") : m
    }
    return f
  }

  function l(c) {
    let u = "", f = !1;
    for (const d of e) {
      (!f || !u.endsWith("/")) && (u += "/"), f = !1;
      for (const m of d) if (m.type === 0) u += m.value; else if (m.type === 1) {
        const {value: h, repeatable: g, optional: w} = m, S = h in c ? c[h] : "";
        if (Ot(S) && !g) throw new Error(`Provided param "${h}" is an array but it is not repeatable (* or + modifiers)`);
        const _ = Ot(S) ? S.join("/") : S;
        if (!_) if (w) d.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : f = !0); else throw new Error(`Missing required param "${h}"`);
        u += _
      }
    }
    return u || "/"
  }

  return {re: i, score: s, keys: o, parse: a, stringify: l}
}

function y_(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length;) {
    const s = t[n] - e[n];
    if (s) return s;
    n++
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0
}

function b_(e, t) {
  let n = 0;
  const s = e.score, r = t.score;
  for (; n < s.length && n < r.length;) {
    const o = y_(s[n], r[n]);
    if (o) return o;
    n++
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (Wu(s)) return 1;
    if (Wu(r)) return -1
  }
  return r.length - s.length
}

function Wu(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0
}

const S_ = {type: 0, value: ""}, __ = /[a-zA-Z0-9_]/;

function w_(e) {
  if (!e) return [[]];
  if (e === "/") return [[S_]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

  function t(m) {
    throw new Error(`ERR (${n})/"${c}": ${m}`)
  }

  let n = 0, s = n;
  const r = [];
  let o;

  function i() {
    o && r.push(o), o = []
  }

  let a = 0, l, c = "", u = "";

  function f() {
    c && (n === 0 ? o.push({
      type: 0,
      value: c
    }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), o.push({
      type: 1,
      value: c,
      regexp: u,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), c = "")
  }

  function d() {
    c += l
  }

  for (; a < e.length;) {
    if (l = e[a++], l === "\\" && n !== 2) {
      s = n, n = 4;
      continue
    }
    switch (n) {
      case 0:
        l === "/" ? (c && f(), i()) : l === ":" ? (f(), n = 1) : d();
        break;
      case 4:
        d(), n = s;
        break;
      case 1:
        l === "(" ? n = 2 : __.test(l) ? d() : (f(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + l : n = 3 : u += l;
        break;
      case 3:
        f(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--, u = "";
        break;
      default:
        t("Unknown state");
        break
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), f(), i(), r
}

function C_(e, t, n) {
  const s = p_(w_(e.path), n), r = xe(s, {record: e, parent: t, children: [], alias: []});
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r
}

function E_(e, t) {
  const n = [], s = new Map;
  t = qu({strict: !1, end: !0, sensitive: !1}, t);

  function r(u) {
    return s.get(u)
  }

  function o(u, f, d) {
    const m = !d, h = x_(u);
    h.aliasOf = d && d.record;
    const g = qu(t, u), w = [h];
    if ("alias" in u) {
      const T = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const V of T) w.push(xe({}, h, {
        components: d ? d.record.components : h.components,
        path: V,
        aliasOf: d ? d.record : h
      }))
    }
    let S, _;
    for (const T of w) {
      const {path: V} = T;
      if (f && V[0] !== "/") {
        const R = f.record.path, x = R[R.length - 1] === "/" ? "" : "/";
        T.path = f.record.path + (V && x + V)
      }
      if (S = C_(T, f, g), d ? d.alias.push(S) : (_ = _ || S, _ !== S && _.alias.push(S), m && u.name && !Gu(S) && i(u.name)), h.children) {
        const R = h.children;
        for (let x = 0; x < R.length; x++) o(R[x], S, d && d.children[x])
      }
      d = d || S, (S.record.components && Object.keys(S.record.components).length || S.record.name || S.record.redirect) && l(S)
    }
    return _ ? () => {
      i(_)
    } : Ms
  }

  function i(u) {
    if (mh(u)) {
      const f = s.get(u);
      f && (s.delete(u), n.splice(n.indexOf(f), 1), f.children.forEach(i), f.alias.forEach(i))
    } else {
      const f = n.indexOf(u);
      f > -1 && (n.splice(f, 1), u.record.name && s.delete(u.record.name), u.children.forEach(i), u.alias.forEach(i))
    }
  }

  function a() {
    return n
  }

  function l(u) {
    let f = 0;
    for (; f < n.length && b_(u, n[f]) >= 0 && (u.record.path !== n[f].record.path || !gh(u, n[f]));) f++;
    n.splice(f, 0, u), u.record.name && !Gu(u) && s.set(u.record.name, u)
  }

  function c(u, f) {
    let d, m = {}, h, g;
    if ("name" in u && u.name) {
      if (d = s.get(u.name), !d) throw hs(1, {location: u});
      g = d.record.name, m = xe(Ku(f.params, d.keys.filter(_ => !_.optional).map(_ => _.name)), u.params && Ku(u.params, d.keys.map(_ => _.name))), h = d.stringify(m)
    } else if ("path" in u) h = u.path, d = n.find(_ => _.re.test(h)), d && (m = d.parse(h), g = d.record.name); else {
      if (d = f.name ? s.get(f.name) : n.find(_ => _.re.test(f.path)), !d) throw hs(1, {
        location: u,
        currentLocation: f
      });
      g = d.record.name, m = xe({}, f.params, u.params), h = d.stringify(m)
    }
    const w = [];
    let S = d;
    for (; S;) w.unshift(S.record), S = S.parent;
    return {name: g, path: h, params: m, matched: w, meta: T_(w)}
  }

  return e.forEach(u => o(u)), {addRoute: o, resolve: c, removeRoute: i, getRoutes: a, getRecordMatcher: r}
}

function Ku(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n
}

function x_(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: A_(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set,
    updateGuards: new Set,
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && {default: e.component}
  }
}

function A_(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n; else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t
}

function Gu(e) {
  for (; e;) {
    if (e.record.aliasOf) return !0;
    e = e.parent
  }
  return !1
}

function T_(e) {
  return e.reduce((t, n) => xe(t, n.meta), {})
}

function qu(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n
}

function gh(e, t) {
  return t.children.some(n => n === e || gh(e, n))
}

const ph = /#/g, P_ = /&/g, R_ = /\//g, O_ = /=/g, k_ = /\?/g, yh = /\+/g, I_ = /%5B/g, V_ = /%5D/g, bh = /%5E/g,
    B_ = /%60/g, Sh = /%7B/g, L_ = /%7C/g, _h = /%7D/g, M_ = /%20/g;

function za(e) {
  return encodeURI("" + e).replace(L_, "|").replace(I_, "[").replace(V_, "]")
}

function $_(e) {
  return za(e).replace(Sh, "{").replace(_h, "}").replace(bh, "^")
}

function Ki(e) {
  return za(e).replace(yh, "%2B").replace(M_, "+").replace(ph, "%23").replace(P_, "%26").replace(B_, "`").replace(Sh, "{").replace(_h, "}").replace(bh, "^")
}

function N_(e) {
  return Ki(e).replace(O_, "%3D")
}

function D_(e) {
  return za(e).replace(ph, "%23").replace(k_, "%3F")
}

function F_(e) {
  return e == null ? "" : D_(e).replace(R_, "%2F")
}

function eo(e) {
  try {
    return decodeURIComponent("" + e)
  } catch {
  }
  return "" + e
}

function H_(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(yh, " "), i = o.indexOf("="), a = eo(i < 0 ? o : o.slice(0, i)),
        l = i < 0 ? null : eo(o.slice(i + 1));
    if (a in t) {
      let c = t[a];
      Ot(c) || (c = t[a] = [c]), c.push(l)
    } else t[a] = l
  }
  return t
}

function Yu(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = N_(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue
    }
    (Ot(s) ? s.map(o => o && Ki(o)) : [s && Ki(s)]).forEach(o => {
      o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o))
    })
  }
  return t
}

function j_(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = Ot(s) ? s.map(r => r == null ? null : "" + r) : s == null ? s : "" + s)
  }
  return t
}

const U_ = Symbol(""), Ju = Symbol(""), Wa = Symbol(""), wh = Symbol(""), Gi = Symbol("");

function Ps() {
  let e = [];

  function t(s) {
    return e.push(s), () => {
      const r = e.indexOf(s);
      r > -1 && e.splice(r, 1)
    }
  }

  function n() {
    e = []
  }

  return {add: t, list: () => e.slice(), reset: n}
}

function pn(e, t, n, s, r) {
  const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () => new Promise((i, a) => {
    const l = f => {
      f === !1 ? a(hs(4, {from: n, to: t})) : f instanceof Error ? a(f) : m_(f) ? a(hs(2, {
        from: t,
        to: f
      })) : (o && s.enterCallbacks[r] === o && typeof f == "function" && o.push(f), i())
    }, c = e.call(s && s.instances[r], t, n, l);
    let u = Promise.resolve(c);
    e.length < 3 && (u = u.then(l)), u.catch(f => a(f))
  })
}

function ui(e, t, n, s) {
  const r = [];
  for (const o of e) for (const i in o.components) {
    let a = o.components[i];
    if (!(t !== "beforeRouteEnter" && !o.instances[i])) if (z_(a)) {
      const c = (a.__vccOpts || a)[t];
      c && r.push(pn(c, n, s, o, i))
    } else {
      let l = a();
      r.push(() => l.then(c => {
        if (!c) return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`));
        const u = JS(c) ? c.default : c;
        o.components[i] = u;
        const d = (u.__vccOpts || u)[t];
        return d && pn(d, n, s, o, i)()
      }))
    }
  }
  return r
}

function z_(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e
}

function Xu(e) {
  const t = Pe(Wa), n = Pe(wh), s = b(() => t.resolve(be(e.to))), r = b(() => {
        const {matched: l} = s.value, {length: c} = l, u = l[c - 1], f = n.matched;
        if (!u || !f.length) return -1;
        const d = f.findIndex(ds.bind(null, u));
        if (d > -1) return d;
        const m = Zu(l[c - 2]);
        return c > 1 && Zu(u) === m && f[f.length - 1].path !== m ? f.findIndex(ds.bind(null, l[c - 2])) : d
      }), o = b(() => r.value > -1 && q_(n.params, s.value.params)),
      i = b(() => r.value > -1 && r.value === n.matched.length - 1 && dh(n.params, s.value.params));

  function a(l = {}) {
    return G_(l) ? t[be(e.replace) ? "replace" : "push"](be(e.to)).catch(Ms) : Promise.resolve()
  }

  return {route: s, href: b(() => s.value.href), isActive: o, isExactActive: i, navigate: a}
}

const W_ = Ke({
  name: "RouterLink",
  compatConfig: {MODE: 3},
  props: {
    to: {type: [String, Object], required: !0},
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {type: String, default: "page"}
  },
  useLink: Xu,
  setup(e, {slots: t}) {
    const n = ze(Xu(e)), {options: s} = Pe(Wa), r = b(() => ({
      [Qu(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      [Qu(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const o = t.default && t.default(n);
      return e.custom ? o : En("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: r.value
      }, o)
    }
  }
}), K_ = W_;

function G_(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}

function q_(e, t) {
  for (const n in t) {
    const s = t[n], r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1
    } else if (!Ot(r) || r.length !== s.length || s.some((o, i) => o !== r[i])) return !1
  }
  return !0
}

function Zu(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}

const Qu = (e, t, n) => e ?? t ?? n, Y_ = Ke({
  name: "RouterView",
  inheritAttrs: !1,
  props: {name: {type: String, default: "default"}, route: Object},
  compatConfig: {MODE: 3},
  setup(e, {attrs: t, slots: n}) {
    const s = Pe(Gi), r = b(() => e.route || s.value), o = Pe(Ju, 0), i = b(() => {
      let c = be(o);
      const {matched: u} = r.value;
      let f;
      for (; (f = u[c]) && !f.components;) c++;
      return c
    }), a = b(() => r.value.matched[i.value]);
    Ye(Ju, b(() => i.value + 1)), Ye(U_, a), Ye(Gi, r);
    const l = Z();
    return Ee(() => [l.value, a.value, e.name], ([c, u, f], [d, m, h]) => {
      u && (u.instances[f] = c, m && m !== u && c && c === d && (u.leaveGuards.size || (u.leaveGuards = m.leaveGuards), u.updateGuards.size || (u.updateGuards = m.updateGuards))), c && u && (!m || !ds(u, m) || !d) && (u.enterCallbacks[f] || []).forEach(g => g(c))
    }, {flush: "post"}), () => {
      const c = r.value, u = e.name, f = a.value, d = f && f.components[u];
      if (!d) return ec(n.default, {Component: d, route: c});
      const m = f.props[u], h = m ? m === !0 ? c.params : typeof m == "function" ? m(c) : m : null,
          w = En(d, xe({}, h, t, {
            onVnodeUnmounted: S => {
              S.component.isUnmounted && (f.instances[u] = null)
            }, ref: l
          }));
      return ec(n.default, {Component: w, route: c}) || w
    }
  }
});

function ec(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n
}

const J_ = Y_;

function X_(e) {
  const t = E_(e.routes, e), n = e.parseQuery || H_, s = e.stringifyQuery || Yu, r = e.history, o = Ps(), i = Ps(),
      a = Ps(), l = pe(cn);
  let c = cn;
  ns && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u = ai.bind(null, O => "" + O), f = ai.bind(null, F_), d = ai.bind(null, eo);

  function m(O, W) {
    let j, Y;
    return mh(O) ? (j = t.getRecordMatcher(O), Y = W) : Y = O, t.addRoute(Y, j)
  }

  function h(O) {
    const W = t.getRecordMatcher(O);
    W && t.removeRoute(W)
  }

  function g() {
    return t.getRoutes().map(O => O.record)
  }

  function w(O) {
    return !!t.getRecordMatcher(O)
  }

  function S(O, W) {
    if (W = xe({}, W || l.value), typeof O == "string") {
      const y = li(n, O, W.path), A = t.resolve({path: y.path}, W), L = r.createHref(y.fullPath);
      return xe(y, A, {params: d(A.params), hash: eo(y.hash), redirectedFrom: void 0, href: L})
    }
    let j;
    if ("path" in O) j = xe({}, O, {path: li(n, O.path, W.path).path}); else {
      const y = xe({}, O.params);
      for (const A in y) y[A] == null && delete y[A];
      j = xe({}, O, {params: f(y)}), W.params = f(W.params)
    }
    const Y = t.resolve(j, W), Ce = O.hash || "";
    Y.params = u(d(Y.params));
    const Ve = QS(s, xe({}, O, {hash: $_(Ce), path: Y.path})), p = r.createHref(Ve);
    return xe({fullPath: Ve, hash: Ce, query: s === Yu ? j_(O.query) : O.query || {}}, Y, {
      redirectedFrom: void 0,
      href: p
    })
  }

  function _(O) {
    return typeof O == "string" ? li(n, O, l.value.path) : xe({}, O)
  }

  function T(O, W) {
    if (c !== O) return hs(8, {from: W, to: O})
  }

  function V(O) {
    return B(O)
  }

  function R(O) {
    return V(xe(_(O), {replace: !0}))
  }

  function x(O) {
    const W = O.matched[O.matched.length - 1];
    if (W && W.redirect) {
      const {redirect: j} = W;
      let Y = typeof j == "function" ? j(O) : j;
      return typeof Y == "string" && (Y = Y.includes("?") || Y.includes("#") ? Y = _(Y) : {path: Y}, Y.params = {}), xe({
        query: O.query,
        hash: O.hash,
        params: "path" in Y ? {} : O.params
      }, Y)
    }
  }

  function B(O, W) {
    const j = c = S(O), Y = l.value, Ce = O.state, Ve = O.force, p = O.replace === !0, y = x(j);
    if (y) return B(xe(_(y), {state: typeof y == "object" ? xe({}, Ce, y.state) : Ce, force: Ve, replace: p}), W || j);
    const A = j;
    A.redirectedFrom = W;
    let L;
    return !Ve && e_(s, Y, j) && (L = hs(16, {
      to: A,
      from: Y
    }), ke(Y, Y, !0, !1)), (L ? Promise.resolve(L) : P(A, Y)).catch(k => Kt(k) ? Kt(k, 2) ? k : de(k) : q(k, A, Y)).then(k => {
      if (k) {
        if (Kt(k, 2)) return B(xe({replace: p}, _(k.to), {
          state: typeof k.to == "object" ? xe({}, Ce, k.to.state) : Ce,
          force: Ve
        }), W || A)
      } else k = M(A, Y, !0, p, Ce);
      return F(A, Y, k), k
    })
  }

  function E(O, W) {
    const j = T(O, W);
    return j ? Promise.reject(j) : Promise.resolve()
  }

  function C(O) {
    const W = qe.values().next().value;
    return W && typeof W.runWithContext == "function" ? W.runWithContext(O) : O()
  }

  function P(O, W) {
    let j;
    const [Y, Ce, Ve] = Z_(O, W);
    j = ui(Y.reverse(), "beforeRouteLeave", O, W);
    for (const y of Y) y.leaveGuards.forEach(A => {
      j.push(pn(A, O, W))
    });
    const p = E.bind(null, O, W);
    return j.push(p), le(j).then(() => {
      j = [];
      for (const y of o.list()) j.push(pn(y, O, W));
      return j.push(p), le(j)
    }).then(() => {
      j = ui(Ce, "beforeRouteUpdate", O, W);
      for (const y of Ce) y.updateGuards.forEach(A => {
        j.push(pn(A, O, W))
      });
      return j.push(p), le(j)
    }).then(() => {
      j = [];
      for (const y of Ve) if (y.beforeEnter) if (Ot(y.beforeEnter)) for (const A of y.beforeEnter) j.push(pn(A, O, W)); else j.push(pn(y.beforeEnter, O, W));
      return j.push(p), le(j)
    }).then(() => (O.matched.forEach(y => y.enterCallbacks = {}), j = ui(Ve, "beforeRouteEnter", O, W), j.push(p), le(j))).then(() => {
      j = [];
      for (const y of i.list()) j.push(pn(y, O, W));
      return j.push(p), le(j)
    }).catch(y => Kt(y, 8) ? y : Promise.reject(y))
  }

  function F(O, W, j) {
    a.list().forEach(Y => C(() => Y(O, W, j)))
  }

  function M(O, W, j, Y, Ce) {
    const Ve = T(O, W);
    if (Ve) return Ve;
    const p = W === cn, y = ns ? history.state : {};
    j && (Y || p ? r.replace(O.fullPath, xe({scroll: p && y && y.scroll}, Ce)) : r.push(O.fullPath, Ce)), l.value = O, ke(O, W, j, p), de()
  }

  let z;

  function te() {
    z || (z = r.listen((O, W, j) => {
      if (!pt.listening) return;
      const Y = S(O), Ce = x(Y);
      if (Ce) {
        B(xe(Ce, {replace: !0}), Y).catch(Ms);
        return
      }
      c = Y;
      const Ve = l.value;
      ns && l_(Hu(Ve.fullPath, j.delta), Fo()), P(Y, Ve).catch(p => Kt(p, 12) ? p : Kt(p, 2) ? (B(p.to, Y).then(y => {
        Kt(y, 20) && !j.delta && j.type === Zs.pop && r.go(-1, !1)
      }).catch(Ms), Promise.reject()) : (j.delta && r.go(-j.delta, !1), q(p, Y, Ve))).then(p => {
        p = p || M(Y, Ve, !1), p && (j.delta && !Kt(p, 8) ? r.go(-j.delta, !1) : j.type === Zs.pop && Kt(p, 20) && r.go(-1, !1)), F(Y, Ve, p)
      }).catch(Ms)
    }))
  }

  let se = Ps(), J = Ps(), Q;

  function q(O, W, j) {
    de(O);
    const Y = J.list();
    return Y.length ? Y.forEach(Ce => Ce(O, W, j)) : console.error(O), Promise.reject(O)
  }

  function Te() {
    return Q && l.value !== cn ? Promise.resolve() : new Promise((O, W) => {
      se.add([O, W])
    })
  }

  function de(O) {
    return Q || (Q = !O, te(), se.list().forEach(([W, j]) => O ? j(O) : W()), se.reset()), O
  }

  function ke(O, W, j, Y) {
    const {scrollBehavior: Ce} = e;
    if (!ns || !Ce) return Promise.resolve();
    const Ve = !j && u_(Hu(O.fullPath, 0)) || (Y || !j) && history.state && history.state.scroll || null;
    return mt().then(() => Ce(O, W, Ve)).then(p => p && a_(p)).catch(p => q(p, O, W))
  }

  const we = O => r.go(O);
  let He;
  const qe = new Set, pt = {
    currentRoute: l,
    listening: !0,
    addRoute: m,
    removeRoute: h,
    hasRoute: w,
    getRoutes: g,
    resolve: S,
    options: e,
    push: V,
    replace: R,
    go: we,
    back: () => we(-1),
    forward: () => we(1),
    beforeEach: o.add,
    beforeResolve: i.add,
    afterEach: a.add,
    onError: J.add,
    isReady: Te,
    install(O) {
      const W = this;
      O.component("RouterLink", K_), O.component("RouterView", J_), O.config.globalProperties.$router = W, Object.defineProperty(O.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => be(l)
      }), ns && !He && l.value === cn && (He = !0, V(r.location).catch(Ce => {
      }));
      const j = {};
      for (const Ce in cn) Object.defineProperty(j, Ce, {get: () => l.value[Ce], enumerable: !0});
      O.provide(Wa, W), O.provide(wh, Pc(j)), O.provide(Gi, l);
      const Y = O.unmount;
      qe.add(O), O.unmount = function () {
        qe.delete(O), qe.size < 1 && (c = cn, z && z(), z = null, l.value = cn, He = !1, Q = !1), Y()
      }
    }
  };

  function le(O) {
    return O.reduce((W, j) => W.then(() => C(j)), Promise.resolve())
  }

  return pt
}

function Z_(e, t) {
  const n = [], s = [], r = [], o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const a = t.matched[i];
    a && (e.matched.find(c => ds(c, a)) ? s.push(a) : n.push(a));
    const l = e.matched[i];
    l && (t.matched.find(c => ds(c, l)) || r.push(l))
  }
  return [n, s, r]
}

const At = {
  required: e => !!e || "必填项",
  numberMatch: e => /^\d+$/.test(e) || "必须是数字",
  passwordMatch: e => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!/]).*$/g.test(e) || "必须包含大小写字母、数字和特殊字符",
  min: e => e.length >= 8 || "最少8位",
  max: e => e.length <= 32 || "最多32位"
}, ci = Symbol("Forwarded refs");

function fi(e, t) {
  let n = e;
  for (; n;) {
    const s = Reflect.getOwnPropertyDescriptor(n, t);
    if (s) return s;
    n = Object.getPrototypeOf(n)
  }
}

function Ch(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) n[s - 1] = arguments[s];
  return e[ci] = n, new Proxy(e, {
    get(r, o) {
      if (Reflect.has(r, o)) return Reflect.get(r, o);
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const i of n) if (i.value && Reflect.has(i.value, o)) {
          const a = Reflect.get(i.value, o);
          return typeof a == "function" ? a.bind(i.value) : a
        }
      }
    }, has(r, o) {
      if (Reflect.has(r, o)) return !0;
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__")) return !1;
      for (const i of n) if (i.value && Reflect.has(i.value, o)) return !0;
      return !1
    }, set(r, o, i) {
      if (Reflect.has(r, o)) return Reflect.set(r, o, i);
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__")) return !1;
      for (const a of n) if (a.value && Reflect.has(a.value, o)) return Reflect.set(a.value, o, i);
      return !1
    }, getOwnPropertyDescriptor(r, o) {
      var a;
      const i = Reflect.getOwnPropertyDescriptor(r, o);
      if (i) return i;
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const l of n) {
          if (!l.value) continue;
          const c = fi(l.value, o) ?? ("_" in l.value ? fi((a = l.value._) == null ? void 0 : a.setupState, o) : void 0);
          if (c) return c
        }
        for (const l of n) {
          const c = l.value && l.value[ci];
          if (!c) continue;
          const u = c.slice();
          for (; u.length;) {
            const f = u.shift(), d = fi(f.value, o);
            if (d) return d;
            const m = f.value && f.value[ci];
            m && u.push(...m)
          }
        }
      }
    }
  })
}

const Q_ = G({...ye(), ...MS()}, "VForm"), Eh = ae()({
  name: "VForm", props: Q_(), emits: {"update:modelValue": e => !0, submit: e => !0}, setup(e, t) {
    let {slots: n, emit: s} = t;
    const r = $S(e), o = Z();

    function i(l) {
      l.preventDefault(), r.reset()
    }

    function a(l) {
      const c = l, u = r.validate();
      c.then = u.then.bind(u), c.catch = u.catch.bind(u), c.finally = u.finally.bind(u), s("submit", c), c.defaultPrevented || u.then(f => {
        var m;
        let {valid: d} = f;
        d && ((m = o.value) == null || m.submit())
      }), c.preventDefault()
    }

    return fe(() => {
      var l;
      return v("form", {
        ref: o,
        class: ["v-form", e.class],
        style: e.style,
        novalidate: !0,
        onReset: i,
        onSubmit: a
      }, [(l = n.default) == null ? void 0 : l.call(n, r)])
    }), Ch(r, o)
  }
}), e1 = G({
  active: Boolean,
  max: [Number, String],
  value: {type: [Number, String], default: 0}, ...ye(), ...$a({transition: {component: sh}})
}, "VCounter"), t1 = ae()({
  name: "VCounter", functional: !0, props: e1(), setup(e, t) {
    let {slots: n} = t;
    const s = b(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return fe(() => v(Hn, {transition: e.transition}, {
      default: () => [jt(v("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({counter: s.value, max: e.max, value: e.value}) : s.value]), [[bo, e.active]])]
    })), {}
  }
}), n1 = G({floating: Boolean, ...ye()}, "VFieldLabel"), Ar = ae()({
  name: "VFieldLabel", props: n1(), setup(e, t) {
    let {slots: n} = t;
    return fe(() => v(lh, {
      class: ["v-field-label", {"v-field-label--floating": e.floating}, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {}
  }
}), s1 = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], xh = G({
  appendInnerIcon: Le,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {type: Le, default: "$clear"},
  active: Boolean,
  centerAffix: {type: Boolean, default: void 0},
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {type: Boolean, default: null},
  error: Boolean,
  flat: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: Le,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {type: String, default: "filled", validator: e => s1.includes(e)},
  "onClick:clear": _n(),
  "onClick:appendInner": _n(),
  "onClick:prependInner": _n(), ...ye(), ...ka(), ...Vt(), ...Je()
}, "VField"), Ah = ae()({
  name: "VField",
  inheritAttrs: !1,
  props: {id: String, ...ih(), ...xh()},
  emits: {"update:focused": e => !0, "update:modelValue": e => !0},
  setup(e, t) {
    let {attrs: n, emit: s, slots: r} = t;
    const {themeClasses: o} = st(e), {loaderClasses: i} = Mo(e), {
          focusClasses: a,
          isFocused: l,
          focus: c,
          blur: u
        } = ja(e), {InputIcon: f} = oh(e), {roundedClasses: d} = Bt(e), {rtlClasses: m} = xn(),
        h = b(() => e.dirty || e.active), g = b(() => !e.singleLine && !!(e.label || r.label)), w = It(),
        S = b(() => e.id || `input-${w}`), _ = b(() => `${S.value}-messages`), T = Z(), V = Z(), R = Z(),
        x = b(() => ["plain", "underlined"].includes(e.variant)), {
          backgroundColorClasses: B,
          backgroundColorStyles: E
        } = nn(ue(e, "bgColor")), {
          textColorClasses: C,
          textColorStyles: P
        } = tn(b(() => e.error || e.disabled ? void 0 : h.value && l.value ? e.color : e.baseColor));
    Ee(h, z => {
      if (g.value) {
        const te = T.value.$el, se = V.value.$el;
        requestAnimationFrame(() => {
          const J = Vg(te), Q = se.getBoundingClientRect(), q = Q.x - J.x,
              Te = Q.y - J.y - (J.height / 2 - Q.height / 2), de = Q.width / .75,
              ke = Math.abs(de - J.width) > 1 ? {maxWidth: he(de)} : void 0, we = getComputedStyle(te),
              He = getComputedStyle(se), qe = parseFloat(we.transitionDuration) * 1e3 || 150,
              pt = parseFloat(He.getPropertyValue("--v-field-label-scale")), le = He.getPropertyValue("color");
          te.style.visibility = "visible", se.style.visibility = "hidden", Bg(te, {
            transform: `translate(${q}px, ${Te}px) scale(${pt})`,
            color: le, ...ke
          }, {duration: qe, easing: ip, direction: z ? "normal" : "reverse"}).finished.then(() => {
            te.style.removeProperty("visibility"), se.style.removeProperty("visibility")
          })
        })
      }
    }, {flush: "post"});
    const F = b(() => ({isActive: h, isFocused: l, controlRef: R, blur: u, focus: c}));

    function M(z) {
      z.target !== document.activeElement && z.preventDefault()
    }

    return fe(() => {
      var q, Te, de;
      const z = e.variant === "outlined", te = r["prepend-inner"] || e.prependInnerIcon,
          se = !!(e.clearable || r.clear), J = !!(r["append-inner"] || e.appendInnerIcon || se),
          Q = () => r.label ? r.label({...F.value, label: e.label, props: {for: S.value}}) : e.label;
      return v("div", $e({
        class: ["v-field", {
          "v-field--active": h.value,
          "v-field--appended": J,
          "v-field--center-affix": e.centerAffix ?? !x.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": te,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !Q(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, B.value, a.value, i.value, d.value, m.value, e.class], style: [E.value, e.style], onClick: M
      }, n), [v("div", {class: "v-field__overlay"}, null), v(Ia, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {default: r.loader}), te && v("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && v(f, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (q = r["prepend-inner"]) == null ? void 0 : q.call(r, F.value)]), v("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && g.value && v(Ar, {
        key: "floating-label",
        ref: V,
        class: [C.value],
        floating: !0,
        for: S.value,
        style: P.value
      }, {default: () => [Q()]}), v(Ar, {
        ref: T,
        for: S.value
      }, {default: () => [Q()]}), (Te = r.default) == null ? void 0 : Te.call(r, {
        ...F.value,
        props: {id: S.value, class: "v-field__input", "aria-describedby": _.value},
        focus: c,
        blur: u
      })]), se && v(VS, {key: "clear"}, {
        default: () => [jt(v("div", {
          class: "v-field__clearable", onMousedown: ke => {
            ke.preventDefault(), ke.stopPropagation()
          }
        }, [r.clear ? r.clear() : v(f, {name: "clear"}, null)]), [[bo, e.dirty]])]
      }), J && v("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(de = r["append-inner"]) == null ? void 0 : de.call(r, F.value), e.appendInnerIcon && v(f, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), v("div", {
        class: ["v-field__outline", C.value],
        style: P.value
      }, [z && v(Se, null, [v("div", {class: "v-field__outline__start"}, null), g.value && v("div", {class: "v-field__outline__notch"}, [v(Ar, {
        ref: V,
        floating: !0,
        for: S.value
      }, {default: () => [Q()]})]), v("div", {class: "v-field__outline__end"}, null)]), x.value && g.value && v(Ar, {
        ref: V,
        floating: !0,
        for: S.value
      }, {default: () => [Q()]})])])
    }), {controlRef: R}
  }
});

function r1(e) {
  const t = Object.keys(Ah.props).filter(n => !Sg(n) && n !== "class" && n !== "style");
  return Cf(e, t)
}

const o1 = ["color", "file", "time", "date", "datetime-local", "week", "month"], i1 = G({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {type: String, default: "text"},
  modelModifiers: Object, ...Ua(), ...xh()
}, "VTextField"), Nn = ae()({
  name: "VTextField",
  directives: {Intersect: Qd},
  inheritAttrs: !1,
  props: i1(),
  emits: {
    "click:control": e => !0,
    "mousedown:control": e => !0,
    "update:focused": e => !0,
    "update:modelValue": e => !0
  },
  setup(e, t) {
    let {attrs: n, emit: s, slots: r} = t;
    const o = it(e, "modelValue"), {isFocused: i, focus: a, blur: l} = ja(e),
        c = b(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length),
        u = b(() => {
          if (n.maxlength) return n.maxlength;
          if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string")) return e.counter
        }), f = b(() => ["plain", "underlined"].includes(e.variant));

    function d(x, B) {
      var E, C;
      !e.autofocus || !x || (C = (E = B[0].target) == null ? void 0 : E.focus) == null || C.call(E)
    }

    const m = Z(), h = Z(), g = Z(), w = b(() => o1.includes(e.type) || e.persistentPlaceholder || i.value || e.active);

    function S() {
      var x;
      g.value !== document.activeElement && ((x = g.value) == null || x.focus()), i.value || a()
    }

    function _(x) {
      s("mousedown:control", x), x.target !== g.value && (S(), x.preventDefault())
    }

    function T(x) {
      S(), s("click:control", x)
    }

    function V(x) {
      x.stopPropagation(), S(), mt(() => {
        o.value = null, Ag(e["onClick:clear"], x)
      })
    }

    function R(x) {
      var E;
      const B = x.target;
      if (o.value = B.value, (E = e.modelModifiers) != null && E.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const C = [B.selectionStart, B.selectionEnd];
        mt(() => {
          B.selectionStart = C[0], B.selectionEnd = C[1]
        })
      }
    }

    return fe(() => {
      const x = !!(r.counter || e.counter !== !1 && e.counter != null),
          B = !!(x || r.details), [E, C] = Sa(n), {modelValue: P, ...F} = Qr.filterProps(e), M = r1(e);
      return v(Qr, $e({
        ref: m,
        modelValue: o.value,
        "onUpdate:modelValue": z => o.value = z,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": f.value
        }, e.class],
        style: e.style
      }, E, F, {centerAffix: !f.value, focused: i.value}), {
        ...r, default: z => {
          let {id: te, isDisabled: se, isDirty: J, isReadonly: Q, isValid: q} = z;
          return v(Ah, $e({
            ref: h,
            onMousedown: _,
            onClick: T,
            "onClick:clear": V,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, M, {
            id: te.value,
            active: w.value || J.value,
            dirty: J.value || e.dirty,
            disabled: se.value,
            focused: i.value,
            error: q.value === !1
          }), {
            ...r, default: Te => {
              let {props: {class: de, ...ke}} = Te;
              const we = jt(v("input", $e({
                ref: g,
                value: o.value,
                onInput: R,
                autofocus: e.autofocus,
                readonly: Q.value,
                disabled: se.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: S,
                onBlur: l
              }, ke, C), null), [[ps("intersect"), {handler: d}, null, {once: !0}]]);
              return v(Se, null, [e.prefix && v("span", {class: "v-text-field__prefix"}, [v("span", {class: "v-text-field__prefix__text"}, [e.prefix])]), r.default ? v("div", {
                class: de,
                "data-no-activator": ""
              }, [r.default(), we]) : en(we, {class: de}), e.suffix && v("span", {class: "v-text-field__suffix"}, [v("span", {class: "v-text-field__suffix__text"}, [e.suffix])])])
            }
          })
        }, details: B ? z => {
          var te;
          return v(Se, null, [(te = r.details) == null ? void 0 : te.call(r, z), x && v(Se, null, [v("span", null, null), v(t1, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: u.value
          }, r.counter)])])
        } : void 0
      })
    }), Ch({}, m, h, g)
  }
}), a1 = e => (km("data-v-76085f0b"), e = e(), Im(), e), l1 = a1(() => kt("br", null, null, -1)), u1 = Ke({
  __name: "Login", setup(e) {
    const t = rn();
    t.set_title("登录");
    const n = ze({uid: "", password: ""}), s = Z(!1), r = Z(!1), o = Z(!1);

    function i() {
      r.value = !0, t.set_token_login(n.uid, n.password), F0().then(a => {
        t.set_token_access(a.data.access_token), Ys.success("登录成功，3s后进行跳转"), setTimeout(() => {
          hr.push("/")
        }, 3e3)
      }).finally(() => {
        r.value = !1
      })
    }

    return (a, l) => (_e(), We(Ha, {class: "justify-center align-center fill-height"}, {
      default: ge(() => [v(Do, {
        width: "344",
        class: "pa-4"
      }, {
        default: ge(() => [v(dr, {class: "text-center"}, {
          default: ge(() => [nt(" 登录 ")]),
          _: 1
        }), v(Eh, {
          modelValue: s.value,
          "onUpdate:modelValue": l[3] || (l[3] = c => s.value = c),
          onSubmit: So(i, ["prevent"])
        }, {
          default: ge(() => [v(Nn, {
            density: "compact",
            variant: "outlined",
            modelValue: n.uid,
            "onUpdate:modelValue": l[0] || (l[0] = c => n.uid = c),
            readonly: r.value,
            rules: [be(At).required, be(At).numberMatch],
            class: "mb-2",
            label: "贴吧UID"
          }, null, 8, ["modelValue", "readonly", "rules"]), v(Nn, {
            density: "compact",
            variant: "outlined",
            modelValue: n.password,
            "onUpdate:modelValue": l[1] || (l[1] = c => n.password = c),
            readonly: r.value,
            "append-inner-icon": o.value ? "mdi-eye-off" : "mdi-eye",
            type: o.value ? "text" : "password",
            "onClick:appendInner": l[2] || (l[2] = c => o.value = !o.value),
            rules: [be(At).required],
            label: "密码"
          }, null, 8, ["modelValue", "readonly", "append-inner-icon", "type", "rules"]), l1, v(No, {
            disabled: !s.value,
            loading: r.value,
            block: "",
            color: "success",
            size: "large",
            type: "submit"
          }, {default: ge(() => [nt(" 登录 ")]), _: 1}, 8, ["disabled", "loading"])]), _: 1
        }, 8, ["modelValue"])]), _: 1
      })]), _: 1
    }))
  }
}), Th = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t) n[s] = r;
  return n
}, c1 = Th(u1, [["__scopeId", "data-v-76085f0b"]]), f1 = kt("br", null, null, -1), d1 = Ke({
  __name: "FirstLogin", setup(e) {
    rn().set_title("创建管理员");
    const n = Z(!1), s = ze({BDUSS: "", password: "", fname: "", STOKEN: ""}), r = Z(""), o = Z(!1), i = Z(!1),
        a = Z(!1);

    function l() {
      j0(s).then(u => {
        Ys.success(u.data.msg), setTimeout(() => {
          hr.push("/profile")
        }, 3e3)
      }).catch(u => {
        Ys.error(u.data.msg)
      })
    }

    const c = u => u === s.password || "两次密码必须一致";
    return (u, f) => (_e(), We(Ha, {class: "justify-center align-center fill-height"}, {
      default: ge(() => [v(Do, {width: "344", class: "pa-4"}, {
        default: ge(() => [v(dr, {class: "text-center"}, {
          default: ge(() => [nt(" 注册管理员 ")]),
          _: 1
        }), v(Eh, {
          modelValue: n.value,
          "onUpdate:modelValue": f[7] || (f[7] = d => n.value = d),
          onSubmit: So(l, ["prevent"])
        }, {
          default: ge(() => [v(Nn, {
            density: "compact",
            variant: "outlined",
            modelValue: s.BDUSS,
            "onUpdate:modelValue": f[0] || (f[0] = d => s.BDUSS = d),
            readonly: o.value,
            rules: [be(At).required],
            class: "mb-2",
            label: "BDUSS"
          }, null, 8, ["modelValue", "readonly", "rules"]), v(Nn, {
            density: "compact",
            variant: "outlined",
            modelValue: s.STOKEN,
            "onUpdate:modelValue": f[1] || (f[1] = d => s.STOKEN = d),
            readonly: o.value,
            rules: [be(At).required],
            class: "mb-2",
            label: "STOKEN"
          }, null, 8, ["modelValue", "readonly", "rules"]), v(Nn, {
            density: "compact",
            variant: "outlined",
            modelValue: s.fname,
            "onUpdate:modelValue": f[2] || (f[2] = d => s.fname = d),
            readonly: o.value,
            rules: [be(At).required],
            class: "mb-2",
            label: "贴吧吧名"
          }, null, 8, ["modelValue", "readonly", "rules"]), v(Nn, {
            class: "mt-2",
            density: "compact",
            variant: "outlined",
            modelValue: s.password,
            "onUpdate:modelValue": f[3] || (f[3] = d => s.password = d),
            readonly: o.value,
            "append-inner-icon": i.value ? "mdi-eye-off" : "mdi-eye",
            type: i.value ? "text" : "password",
            "onClick:appendInner": f[4] || (f[4] = d => i.value = !i.value),
            rules: [be(At).required, be(At).passwordMatch, be(At).min, be(At).max],
            label: "密码"
          }, null, 8, ["modelValue", "readonly", "append-inner-icon", "type", "rules"]), v(Nn, {
            class: "mt-2",
            density: "compact",
            variant: "outlined",
            modelValue: r.value,
            "onUpdate:modelValue": f[5] || (f[5] = d => r.value = d),
            readonly: o.value,
            "append-inner-icon": a.value ? "mdi-eye-off" : "mdi-eye",
            type: a.value ? "text" : "password",
            "onClick:appendInner": f[6] || (f[6] = d => a.value = !a.value),
            rules: [be(At).required, c],
            label: "再次输入密码"
          }, null, 8, ["modelValue", "readonly", "append-inner-icon", "type", "rules"]), f1, v(No, {
            disabled: !n.value,
            loading: o.value,
            block: "",
            color: "success",
            size: "large",
            type: "submit"
          }, {default: ge(() => [nt(" 登录 ")]), _: 1}, 8, ["disabled", "loading"])]), _: 1
        }, 8, ["modelValue"])]), _: 1
      })]), _: 1
    }))
  }
});
var h1 = {};
const m1 = [{path: "/", component: Nu}, {path: "/modules", component: KS}, {
  path: "/profile",
  component: Nu
}, {path: "/logcat", component: qS}, {path: "/manager", component: YS}, {
  path: "/login",
  component: c1
}, {path: "/first_login", component: d1}], v1 = X_({history: h_(h1.BASE_URL), routes: m1}), hr = v1;

function g1(e) {
  return typeof e == "object" && e !== null
}

function tc(e, t) {
  return e = g1(e) ? e : Object.create(null), new Proxy(e, {
    get(n, s, r) {
      return s === "key" ? Reflect.get(n, s, r) : Reflect.get(n, s, r) || Reflect.get(t, s, r)
    }
  })
}

function p1(e, t) {
  return t.reduce((n, s) => n == null ? void 0 : n[s], e)
}

function y1(e, t, n) {
  return t.slice(0, -1).reduce((s, r) => /^(__proto__)$/.test(r) ? {} : s[r] = s[r] || {}, e)[t[t.length - 1]] = n, e
}

function b1(e, t) {
  return t.reduce((n, s) => {
    const r = s.split(".");
    return y1(n, r, p1(e, r))
  }, {})
}

function S1(e, t) {
  return n => {
    var s;
    try {
      const {
        storage: r = localStorage,
        beforeRestore: o = void 0,
        afterRestore: i = void 0,
        serializer: a = {serialize: JSON.stringify, deserialize: JSON.parse},
        key: l = t.$id,
        paths: c = null,
        debug: u = !1
      } = n;
      return {
        storage: r,
        beforeRestore: o,
        afterRestore: i,
        serializer: a,
        key: ((s = e.key) != null ? s : f => f)(typeof l == "string" ? l : l(t.$id)),
        paths: c,
        debug: u
      }
    } catch (r) {
      return n.debug && console.error("[pinia-plugin-persistedstate]", r), null
    }
  }
}

function nc(e, {storage: t, serializer: n, key: s, debug: r}) {
  try {
    const o = t == null ? void 0 : t.getItem(s);
    o && e.$patch(n == null ? void 0 : n.deserialize(o))
  } catch (o) {
    r && console.error("[pinia-plugin-persistedstate]", o)
  }
}

function sc(e, {storage: t, serializer: n, key: s, paths: r, debug: o}) {
  try {
    const i = Array.isArray(r) ? b1(e, r) : e;
    t.setItem(s, n.serialize(i))
  } catch (i) {
    o && console.error("[pinia-plugin-persistedstate]", i)
  }
}

function _1(e = {}) {
  return t => {
    const {auto: n = !1} = e, {options: {persist: s = n}, store: r, pinia: o} = t;
    if (!s) return;
    if (!(r.$id in o.state.value)) {
      const a = o._s.get(r.$id.replace("__hot:", ""));
      a && Promise.resolve().then(() => a.$persist());
      return
    }
    const i = (Array.isArray(s) ? s.map(a => tc(a, e)) : [tc(s, e)]).map(S1(e, r)).filter(Boolean);
    r.$persist = () => {
      i.forEach(a => {
        sc(r.$state, a)
      })
    }, r.$hydrate = ({runHooks: a = !0} = {}) => {
      i.forEach(l => {
        const {beforeRestore: c, afterRestore: u} = l;
        a && (c == null || c(t)), nc(r, l), a && (u == null || u(t))
      })
    }, i.forEach(a => {
      const {beforeRestore: l, afterRestore: c} = a;
      l == null || l(t), nc(r, a), c == null || c(t), r.$subscribe((u, f) => {
        sc(f, a)
      }, {detached: !0})
    })
  }
}

var w1 = _1();
const Ph = by();
Ph.use(w1);

function C1(e) {
  e.use(my).use(hr).use(Ph).use(N0, D0)
}

const E1 = G({...ye(), ...ay({fullHeight: !0}), ...Je()}, "VApp"), x1 = ae()({
  name: "VApp", props: E1(), setup(e, t) {
    let {slots: n} = t;
    const s = st(e), {layoutClasses: r, getLayoutItem: o, items: i, layoutRef: a} = dy(e), {rtlClasses: l} = xn();
    return fe(() => {
      var c;
      return v("div", {
        ref: a,
        class: ["v-application", s.themeClasses.value, r.value, l.value, e.class],
        style: [e.style]
      }, [v("div", {class: "v-application__wrap"}, [(c = n.default) == null ? void 0 : c.call(n)])])
    }), {getLayoutItem: o, items: i, theme: s}
  }
}), A1 = G({text: String, ...ye(), ...Xe()}, "VToolbarTitle"), Rh = ae()({
  name: "VToolbarTitle", props: A1(), setup(e, t) {
    let {slots: n} = t;
    return fe(() => {
      const s = !!(n.default || n.text || e.text);
      return v(e.tag, {class: ["v-toolbar-title", e.class], style: e.style}, {
        default: () => {
          var r;
          return [s && v("div", {class: "v-toolbar-title__placeholder"}, [n.text ? n.text() : e.text, (r = n.default) == null ? void 0 : r.call(n)])]
        }
      })
    }), {}
  }
}), T1 = [null, "prominent", "default", "comfortable", "compact"], P1 = G({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {type: String, default: "default", validator: e => T1.includes(e)},
  extended: Boolean,
  extensionHeight: {type: [Number, String], default: 48},
  flat: Boolean,
  floating: Boolean,
  height: {type: [Number, String], default: 64},
  image: String,
  title: String, ...An(), ...ye(), ...Rn(), ...Vt(), ...Xe({tag: "header"}), ...Je()
}, "VToolbar"), R1 = ae()({
  name: "VToolbar", props: P1(), setup(e, t) {
    var m;
    let {slots: n} = t;
    const {
          backgroundColorClasses: s,
          backgroundColorStyles: r
        } = nn(ue(e, "color")), {borderClasses: o} = Tn(e), {elevationClasses: i} = On(e), {roundedClasses: a} = Bt(e), {themeClasses: l} = st(e), {rtlClasses: c} = xn(),
        u = pe(!!(e.extended || (m = n.extension) != null && m.call(n))),
        f = b(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)),
        d = b(() => u.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return Yn({VBtn: {variant: "text"}}), fe(() => {
      var S;
      const h = !!(e.title || n.title), g = !!(n.image || e.image), w = (S = n.extension) == null ? void 0 : S.call(n);
      return u.value = !!(e.extended || w), v(e.tag, {
        class: ["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, s.value, o.value, i.value, a.value, l.value, c.value, e.class], style: [r.value, e.style]
      }, {
        default: () => [g && v("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [n.image ? v(Ct, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {VImg: {cover: !0, src: e.image}}
        }, n.image) : v(Na, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), v(Ct, {defaults: {VTabs: {height: he(f.value)}}}, {
          default: () => {
            var _, T, V;
            return [v("div", {
              class: "v-toolbar__content",
              style: {height: he(f.value)}
            }, [n.prepend && v("div", {class: "v-toolbar__prepend"}, [(_ = n.prepend) == null ? void 0 : _.call(n)]), h && v(Rh, {
              key: "title",
              text: e.title
            }, {text: n.title}), (T = n.default) == null ? void 0 : T.call(n), n.append && v("div", {class: "v-toolbar__append"}, [(V = n.append) == null ? void 0 : V.call(n)])])]
          }
        }), v(Ct, {defaults: {VTabs: {height: he(d.value)}}}, {
          default: () => [v(rh, null, {
            default: () => [u.value && v("div", {
              class: "v-toolbar__extension",
              style: {height: he(d.value)}
            }, [w])]
          })]
        })]
      })
    }), {contentHeight: f, extensionHeight: d}
  }
});

function Ka() {
  const e = pe(!1);
  return Ut(() => {
    window.requestAnimationFrame(() => {
      e.value = !0
    })
  }), {ssrBootStyles: b(() => e.value ? void 0 : {transition: "none !important"}), isBooted: ao(e)}
}

const O1 = G({...Yd({icon: "$menu", variant: "text"})}, "VAppBarNavIcon"), k1 = ae()({
  name: "VAppBarNavIcon", props: O1(), setup(e, t) {
    let {slots: n} = t;
    return fe(() => v(No, $e(e, {class: ["v-app-bar-nav-icon"]}), n)), {}
  }
}), qi = Symbol.for("vuetify:list");

function Oh() {
  const e = Pe(qi, {hasPrepend: pe(!1), updateHasPrepend: () => null}), t = {
    hasPrepend: pe(!1), updateHasPrepend: n => {
      n && (t.hasPrepend.value = n)
    }
  };
  return Ye(qi, t), e
}

function kh() {
  return Pe(qi, null)
}

const I1 = {
      open: e => {
        let {id: t, value: n, opened: s, parents: r} = e;
        if (n) {
          const o = new Set;
          o.add(t);
          let i = r.get(t);
          for (; i != null;) o.add(i), i = r.get(i);
          return o
        } else return s.delete(t), s
      }, select: () => null
    }, Ih = {
      open: e => {
        let {id: t, value: n, opened: s, parents: r} = e;
        if (n) {
          let o = r.get(t);
          for (s.add(t); o != null && o !== t;) s.add(o), o = r.get(o);
          return s
        } else s.delete(t);
        return s
      }, select: () => null
    }, V1 = {
      open: Ih.open, select: e => {
        let {id: t, value: n, opened: s, parents: r} = e;
        if (!n) return s;
        const o = [];
        let i = r.get(t);
        for (; i != null;) o.push(i), i = r.get(i);
        return new Set(o)
      }
    }, Ga = e => {
      const t = {
        select: n => {
          let {id: s, value: r, selected: o} = n;
          if (s = ie(s), e && !r) {
            const i = Array.from(o.entries()).reduce((a, l) => {
              let [c, u] = l;
              return u === "on" ? [...a, c] : a
            }, []);
            if (i.length === 1 && i[0] === s) return o
          }
          return o.set(s, r ? "on" : "off"), o
        }, in: (n, s, r) => {
          let o = new Map;
          for (const i of n || []) o = t.select({id: i, value: !0, selected: new Map(o), children: s, parents: r});
          return o
        }, out: n => {
          const s = [];
          for (const [r, o] of n.entries()) o === "on" && s.push(r);
          return s
        }
      };
      return t
    }, Vh = e => {
      const t = Ga(e);
      return {
        select: s => {
          let {selected: r, id: o, ...i} = s;
          o = ie(o);
          const a = r.has(o) ? new Map([[o, r.get(o)]]) : new Map;
          return t.select({...i, id: o, selected: a})
        }, in: (s, r, o) => {
          let i = new Map;
          return s != null && s.length && (i = t.in(s.slice(0, 1), r, o)), i
        }, out: (s, r, o) => t.out(s, r, o)
      }
    }, B1 = e => {
      const t = Ga(e);
      return {
        select: s => {
          let {id: r, selected: o, children: i, ...a} = s;
          return r = ie(r), i.has(r) ? o : t.select({id: r, selected: o, children: i, ...a})
        }, in: t.in, out: t.out
      }
    }, L1 = e => {
      const t = Vh(e);
      return {
        select: s => {
          let {id: r, selected: o, children: i, ...a} = s;
          return r = ie(r), i.has(r) ? o : t.select({id: r, selected: o, children: i, ...a})
        }, in: t.in, out: t.out
      }
    }, M1 = e => {
      const t = {
        select: n => {
          let {id: s, value: r, selected: o, children: i, parents: a} = n;
          s = ie(s);
          const l = new Map(o), c = [s];
          for (; c.length;) {
            const f = c.shift();
            o.set(f, r ? "on" : "off"), i.has(f) && c.push(...i.get(f))
          }
          let u = a.get(s);
          for (; u;) {
            const f = i.get(u), d = f.every(h => o.get(h) === "on"), m = f.every(h => !o.has(h) || o.get(h) === "off");
            o.set(u, d ? "on" : m ? "off" : "indeterminate"), u = a.get(u)
          }
          return e && !r && Array.from(o.entries()).reduce((d, m) => {
            let [h, g] = m;
            return g === "on" ? [...d, h] : d
          }, []).length === 0 ? l : o
        }, in: (n, s, r) => {
          let o = new Map;
          for (const i of n || []) o = t.select({id: i, value: !0, selected: new Map(o), children: s, parents: r});
          return o
        }, out: (n, s) => {
          const r = [];
          for (const [o, i] of n.entries()) i === "on" && !s.has(o) && r.push(o);
          return r
        }
      };
      return t
    }, Qs = Symbol.for("vuetify:nested"), Bh = {
      id: pe(),
      root: {
        register: () => null,
        unregister: () => null,
        parents: Z(new Map),
        children: Z(new Map),
        open: () => null,
        openOnSelect: () => null,
        select: () => null,
        opened: Z(new Set),
        selected: Z(new Map),
        selectedValues: Z([])
      }
    }, $1 = G({
      selectStrategy: [String, Function],
      openStrategy: [String, Object],
      opened: Array,
      selected: Array,
      mandatory: Boolean
    }, "nested"), N1 = e => {
      let t = !1;
      const n = Z(new Map), s = Z(new Map), r = it(e, "opened", e.opened, f => new Set(f), f => [...f.values()]),
          o = b(() => {
            if (typeof e.selectStrategy == "object") return e.selectStrategy;
            switch (e.selectStrategy) {
              case"single-leaf":
                return L1(e.mandatory);
              case"leaf":
                return B1(e.mandatory);
              case"independent":
                return Ga(e.mandatory);
              case"single-independent":
                return Vh(e.mandatory);
              case"classic":
              default:
                return M1(e.mandatory)
            }
          }), i = b(() => {
            if (typeof e.openStrategy == "object") return e.openStrategy;
            switch (e.openStrategy) {
              case"list":
                return V1;
              case"single":
                return I1;
              case"multiple":
              default:
                return Ih
            }
          }), a = it(e, "selected", e.selected, f => o.value.in(f, n.value, s.value), f => o.value.out(f, n.value, s.value));
      vt(() => {
        t = !0
      });

      function l(f) {
        const d = [];
        let m = f;
        for (; m != null;) d.unshift(m), m = s.value.get(m);
        return d
      }

      const c = Qe("nested"), u = {
        id: pe(), root: {
          opened: r, selected: a, selectedValues: b(() => {
            const f = [];
            for (const [d, m] of a.value.entries()) m === "on" && f.push(d);
            return f
          }), register: (f, d, m) => {
            d && f !== d && s.value.set(f, d), m && n.value.set(f, []), d != null && n.value.set(d, [...n.value.get(d) || [], f])
          }, unregister: f => {
            if (t) return;
            n.value.delete(f);
            const d = s.value.get(f);
            if (d) {
              const m = n.value.get(d) ?? [];
              n.value.set(d, m.filter(h => h !== f))
            }
            s.value.delete(f), r.value.delete(f)
          }, open: (f, d, m) => {
            c.emit("click:open", {id: f, value: d, path: l(f), event: m});
            const h = i.value.open({
              id: f,
              value: d,
              opened: new Set(r.value),
              children: n.value,
              parents: s.value,
              event: m
            });
            h && (r.value = h)
          }, openOnSelect: (f, d, m) => {
            const h = i.value.select({
              id: f,
              value: d,
              selected: new Map(a.value),
              opened: new Set(r.value),
              children: n.value,
              parents: s.value,
              event: m
            });
            h && (r.value = h)
          }, select: (f, d, m) => {
            c.emit("click:select", {id: f, value: d, path: l(f), event: m});
            const h = o.value.select({
              id: f,
              value: d,
              selected: new Map(a.value),
              children: n.value,
              parents: s.value,
              event: m
            });
            h && (a.value = h), u.root.openOnSelect(f, d, m)
          }, children: n, parents: s
        }
      };
      return Ye(Qs, u), u.root
    }, Lh = (e, t) => {
      const n = Pe(Qs, Bh), s = Symbol(It()), r = b(() => e.value !== void 0 ? e.value : s), o = {
        ...n,
        id: r,
        open: (i, a) => n.root.open(r.value, i, a),
        openOnSelect: (i, a) => n.root.openOnSelect(r.value, i, a),
        isOpen: b(() => n.root.opened.value.has(r.value)),
        parent: b(() => n.root.parents.value.get(r.value)),
        select: (i, a) => n.root.select(r.value, i, a),
        isSelected: b(() => n.root.selected.value.get(ie(r.value)) === "on"),
        isIndeterminate: b(() => n.root.selected.value.get(r.value) === "indeterminate"),
        isLeaf: b(() => !n.root.children.value.get(r.value)),
        isGroupActivator: n.isGroupActivator
      };
      return !n.isGroupActivator && n.root.register(r.value, n.id.value, t), vt(() => {
        !n.isGroupActivator && n.root.unregister(r.value)
      }), t && Ye(Qs, o), o
    }, D1 = () => {
      const e = Pe(Qs, Bh);
      Ye(Qs, {...e, isGroupActivator: !0})
    }, F1 = ys({
      name: "VListGroupActivator", setup(e, t) {
        let {slots: n} = t;
        return D1(), () => {
          var s;
          return (s = n.default) == null ? void 0 : s.call(n)
        }
      }
    }), H1 = G({
      activeColor: String,
      baseColor: String,
      color: String,
      collapseIcon: {type: Le, default: "$collapse"},
      expandIcon: {type: Le, default: "$expand"},
      prependIcon: Le,
      appendIcon: Le,
      fluid: Boolean,
      subgroup: Boolean,
      title: String,
      value: null, ...ye(), ...Xe()
    }, "VListGroup"), rc = ae()({
      name: "VListGroup", props: H1(), setup(e, t) {
        let {slots: n} = t;
        const {isOpen: s, open: r, id: o} = Lh(ue(e, "value"), !0), i = b(() => `v-list-group--id-${String(o.value)}`),
            a = kh(), {isBooted: l} = Ka();

        function c(m) {
          r(!s.value, m)
        }

        const u = b(() => ({onClick: c, class: "v-list-group__header", id: i.value})),
            f = b(() => s.value ? e.collapseIcon : e.expandIcon), d = b(() => ({
              VListItem: {
                active: s.value,
                activeColor: e.activeColor,
                baseColor: e.baseColor,
                color: e.color,
                prependIcon: e.prependIcon || e.subgroup && f.value,
                appendIcon: e.appendIcon || !e.subgroup && f.value,
                title: e.title,
                value: e.value
              }
            }));
        return fe(() => v(e.tag, {
          class: ["v-list-group", {
            "v-list-group--prepend": a == null ? void 0 : a.hasPrepend.value,
            "v-list-group--fluid": e.fluid,
            "v-list-group--subgroup": e.subgroup,
            "v-list-group--open": s.value
          }, e.class], style: e.style
        }, {
          default: () => [n.activator && v(Ct, {defaults: d.value}, {
            default: () => [v(F1, null, {
              default: () => [n.activator({
                props: u.value,
                isOpen: s.value
              })]
            })]
          }), v(Hn, {transition: {component: rh}, disabled: !l.value}, {
            default: () => {
              var m;
              return [jt(v("div", {
                class: "v-list-group__items",
                role: "group",
                "aria-labelledby": i.value
              }, [(m = n.default) == null ? void 0 : m.call(n)]), [[bo, s.value]])]
            }
          })]
        })), {}
      }
    }), j1 = bs("v-list-item-subtitle"), U1 = bs("v-list-item-title"), z1 = G({
      active: {type: Boolean, default: void 0},
      activeClass: String,
      activeColor: String,
      appendAvatar: String,
      appendIcon: Le,
      baseColor: String,
      disabled: Boolean,
      lines: String,
      link: {type: Boolean, default: void 0},
      nav: Boolean,
      prependAvatar: String,
      prependIcon: Le,
      ripple: {type: [Boolean, Object], default: !0},
      slim: Boolean,
      subtitle: [String, Number],
      title: [String, Number],
      value: null,
      onClick: _n(),
      onClickOnce: _n(), ...An(), ...ye(), ...on(), ...ws(), ...Rn(), ...Vt(), ...Ma(), ...Xe(), ...Je(), ..._s({variant: "text"})
    }, "VListItem"), to = ae()({
      name: "VListItem", directives: {Ripple: $o}, props: z1(), emits: {click: e => !0}, setup(e, t) {
        let {attrs: n, slots: s, emit: r} = t;
        const o = La(e, n), i = b(() => e.value === void 0 ? o.href.value : e.value), {
              select: a,
              isSelected: l,
              isIndeterminate: c,
              isGroupActivator: u,
              root: f,
              parent: d,
              openOnSelect: m
            } = Lh(i, !1), h = kh(), g = b(() => {
              var q;
              return e.active !== !1 && (e.active || ((q = o.isActive) == null ? void 0 : q.value) || l.value)
            }), w = b(() => e.link !== !1 && o.isLink.value),
            S = b(() => !e.disabled && e.link !== !1 && (e.link || o.isClickable.value || e.value != null && !!h)),
            _ = b(() => e.rounded || e.nav), T = b(() => e.color ?? e.activeColor),
            V = b(() => ({color: g.value ? T.value ?? e.baseColor : e.baseColor, variant: e.variant}));
        Ee(() => {
          var q;
          return (q = o.isActive) == null ? void 0 : q.value
        }, q => {
          q && d.value != null && f.open(d.value, !0), q && m(q)
        }, {immediate: !0});
        const {themeClasses: R} = st(e), {borderClasses: x} = Tn(e), {
              colorClasses: B,
              colorStyles: E,
              variantClasses: C
            } = ko(V), {densityClasses: P} = Pn(e), {dimensionStyles: F} = Cs(e), {elevationClasses: M} = On(e), {roundedClasses: z} = Bt(_),
            te = b(() => e.lines ? `v-list-item--${e.lines}-line` : void 0),
            se = b(() => ({isActive: g.value, select: a, isSelected: l.value, isIndeterminate: c.value}));

        function J(q) {
          var Te;
          r("click", q), !(u || !S.value) && ((Te = o.navigate) == null || Te.call(o, q), e.value != null && a(!l.value, q))
        }

        function Q(q) {
          (q.key === "Enter" || q.key === " ") && (q.preventDefault(), J(q))
        }

        return fe(() => {
          const q = w.value ? "a" : e.tag, Te = s.title || e.title != null, de = s.subtitle || e.subtitle != null,
              ke = !!(e.appendAvatar || e.appendIcon), we = !!(ke || s.append), He = !!(e.prependAvatar || e.prependIcon),
              qe = !!(He || s.prepend);
          return h == null || h.updateHasPrepend(qe), e.activeColor && jg("active-color", ["color", "base-color"]), jt(v(q, {
            class: ["v-list-item", {
              "v-list-item--active": g.value,
              "v-list-item--disabled": e.disabled,
              "v-list-item--link": S.value,
              "v-list-item--nav": e.nav,
              "v-list-item--prepend": !qe && (h == null ? void 0 : h.hasPrepend.value),
              "v-list-item--slim": e.slim,
              [`${e.activeClass}`]: e.activeClass && g.value
            }, R.value, x.value, B.value, P.value, M.value, te.value, z.value, C.value, e.class],
            style: [E.value, F.value, e.style],
            href: o.href.value,
            tabindex: S.value ? h ? -2 : 0 : void 0,
            onClick: J,
            onKeydown: S.value && !w.value && Q
          }, {
            default: () => {
              var pt;
              return [Oo(S.value || g.value, "v-list-item"), qe && v("div", {
                key: "prepend",
                class: "v-list-item__prepend"
              }, [s.prepend ? v(Ct, {
                key: "prepend-defaults",
                disabled: !He,
                defaults: {
                  VAvatar: {density: e.density, image: e.prependAvatar},
                  VIcon: {density: e.density, icon: e.prependIcon},
                  VListItemAction: {start: !0}
                }
              }, {
                default: () => {
                  var le;
                  return [(le = s.prepend) == null ? void 0 : le.call(s, se.value)]
                }
              }) : v(Se, null, [e.prependAvatar && v(Zr, {
                key: "prepend-avatar",
                density: e.density,
                image: e.prependAvatar
              }, null), e.prependIcon && v(Qt, {
                key: "prepend-icon",
                density: e.density,
                icon: e.prependIcon
              }, null)]), v("div", {class: "v-list-item__spacer"}, null)]), v("div", {
                class: "v-list-item__content",
                "data-no-activator": ""
              }, [Te && v(U1, {key: "title"}, {
                default: () => {
                  var le;
                  return [((le = s.title) == null ? void 0 : le.call(s, {title: e.title})) ?? e.title]
                }
              }), de && v(j1, {key: "subtitle"}, {
                default: () => {
                  var le;
                  return [((le = s.subtitle) == null ? void 0 : le.call(s, {subtitle: e.subtitle})) ?? e.subtitle]
                }
              }), (pt = s.default) == null ? void 0 : pt.call(s, se.value)]), we && v("div", {
                key: "append",
                class: "v-list-item__append"
              }, [s.append ? v(Ct, {
                key: "append-defaults",
                disabled: !ke,
                defaults: {
                  VAvatar: {density: e.density, image: e.appendAvatar},
                  VIcon: {density: e.density, icon: e.appendIcon},
                  VListItemAction: {end: !0}
                }
              }, {
                default: () => {
                  var le;
                  return [(le = s.append) == null ? void 0 : le.call(s, se.value)]
                }
              }) : v(Se, null, [e.appendIcon && v(Qt, {
                key: "append-icon",
                density: e.density,
                icon: e.appendIcon
              }, null), e.appendAvatar && v(Zr, {
                key: "append-avatar",
                density: e.density,
                image: e.appendAvatar
              }, null)]), v("div", {class: "v-list-item__spacer"}, null)])]
            }
          }), [[ps("ripple"), S.value && e.ripple]])
        }), {}
      }
    }), W1 = G({color: String, inset: Boolean, sticky: Boolean, title: String, ...ye(), ...Xe()}, "VListSubheader"),
    K1 = ae()({
      name: "VListSubheader", props: W1(), setup(e, t) {
        let {slots: n} = t;
        const {textColorClasses: s, textColorStyles: r} = tn(ue(e, "color"));
        return fe(() => {
          const o = !!(n.default || e.title);
          return v(e.tag, {
            class: ["v-list-subheader", {
              "v-list-subheader--inset": e.inset,
              "v-list-subheader--sticky": e.sticky
            }, s.value, e.class], style: [{textColorStyles: r}, e.style]
          }, {
            default: () => {
              var i;
              return [o && v("div", {class: "v-list-subheader__text"}, [((i = n.default) == null ? void 0 : i.call(n)) ?? e.title])]
            }
          })
        }), {}
      }
    }), G1 = G({items: Array, returnObject: Boolean}, "VListChildren"), Mh = ae()({
      name: "VListChildren", props: G1(), setup(e, t) {
        let {slots: n} = t;
        return Oh(), () => {
          var s, r;
          return ((s = n.default) == null ? void 0 : s.call(n)) ?? ((r = e.items) == null ? void 0 : r.map(o => {
            var d, m;
            let {children: i, props: a, type: l, raw: c} = o;
            if (l === "divider") return ((d = n.divider) == null ? void 0 : d.call(n, {props: a})) ?? v(Fa, a, null);
            if (l === "subheader") return ((m = n.subheader) == null ? void 0 : m.call(n, {props: a})) ?? v(K1, a, null);
            const u = {
              subtitle: n.subtitle ? h => {
                var g;
                return (g = n.subtitle) == null ? void 0 : g.call(n, {...h, item: c})
              } : void 0, prepend: n.prepend ? h => {
                var g;
                return (g = n.prepend) == null ? void 0 : g.call(n, {...h, item: c})
              } : void 0, append: n.append ? h => {
                var g;
                return (g = n.append) == null ? void 0 : g.call(n, {...h, item: c})
              } : void 0, title: n.title ? h => {
                var g;
                return (g = n.title) == null ? void 0 : g.call(n, {...h, item: c})
              } : void 0
            }, f = rc.filterProps(a);
            return i ? v(rc, $e({value: a == null ? void 0 : a.value}, f), {
              activator: h => {
                let {props: g} = h;
                const w = {...a, ...g, value: e.returnObject ? c : a.value};
                return n.header ? n.header({props: w}) : v(to, w, u)
              }, default: () => v(Mh, {items: i}, n)
            }) : n.item ? n.item({props: a}) : v(to, $e(a, {value: e.returnObject ? c : a.value}), u)
          }))
        }
      }
    }), q1 = G({
      items: {type: Array, default: () => []},
      itemTitle: {type: [String, Array, Function], default: "title"},
      itemValue: {type: [String, Array, Function], default: "value"},
      itemChildren: {type: [Boolean, String, Array, Function], default: "children"},
      itemProps: {type: [Boolean, String, Array, Function], default: "props"},
      returnObject: Boolean,
      valueComparator: {type: Function, default: lr}
    }, "list-items");

function Yi(e, t) {
  const n = qt(t, e.itemTitle, t), s = qt(t, e.itemValue, n), r = qt(t, e.itemChildren),
      o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? ba(t, ["children"]) : t : void 0 : qt(t, e.itemProps),
      i = {title: n, value: s, ...o};
  return {
    title: String(i.title ?? ""),
    value: i.value,
    props: i,
    children: Array.isArray(r) ? $h(e, r) : void 0,
    raw: t
  }
}

function $h(e, t) {
  const n = [];
  for (const s of t) n.push(Yi(e, s));
  return n
}

function Nw(e) {
  const t = b(() => $h(e, e.items)), n = b(() => t.value.some(o => o.value === null));

  function s(o) {
    return n.value || (o = o.filter(i => i !== null)), o.map(i => e.returnObject && typeof i == "string" ? Yi(e, i) : t.value.find(a => e.valueComparator(i, a.value)) || Yi(e, i))
  }

  function r(o) {
    return e.returnObject ? o.map(i => {
      let {raw: a} = i;
      return a
    }) : o.map(i => {
      let {value: a} = i;
      return a
    })
  }

  return {items: t, transformIn: s, transformOut: r}
}

function Y1(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean"
}

function J1(e, t) {
  const n = qt(t, e.itemType, "item"), s = Y1(t) ? t : qt(t, e.itemTitle), r = qt(t, e.itemValue, void 0),
      o = qt(t, e.itemChildren), i = e.itemProps === !0 ? ba(t, ["children"]) : qt(t, e.itemProps),
      a = {title: s, value: r, ...i};
  return {type: n, title: a.title, value: a.value, props: a, children: n === "item" && o ? Nh(e, o) : void 0, raw: t}
}

function Nh(e, t) {
  const n = [];
  for (const s of t) n.push(J1(e, s));
  return n
}

function X1(e) {
  return {items: b(() => Nh(e, e.items))}
}

const Z1 = G({
  baseColor: String,
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  lines: {type: [Boolean, String], default: "one"},
  slim: Boolean,
  nav: Boolean, ...$1({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }), ...An(), ...ye(), ...on(), ...ws(), ...Rn(),
  itemType: {type: String, default: "type"}, ...q1(), ...Vt(), ...Xe(), ...Je(), ..._s({variant: "text"})
}, "VList"), oc = ae()({
  name: "VList",
  props: Z1(),
  emits: {"update:selected": e => !0, "update:opened": e => !0, "click:open": e => !0, "click:select": e => !0},
  setup(e, t) {
    let {slots: n} = t;
    const {items: s} = X1(e), {themeClasses: r} = st(e), {
          backgroundColorClasses: o,
          backgroundColorStyles: i
        } = nn(ue(e, "bgColor")), {borderClasses: a} = Tn(e), {densityClasses: l} = Pn(e), {dimensionStyles: c} = Cs(e), {elevationClasses: u} = On(e), {roundedClasses: f} = Bt(e), {
          open: d,
          select: m
        } = N1(e), h = b(() => e.lines ? `v-list--${e.lines}-line` : void 0), g = ue(e, "activeColor"),
        w = ue(e, "baseColor"), S = ue(e, "color");
    Oh(), Yn({
      VListGroup: {activeColor: g, baseColor: w, color: S},
      VListItem: {
        activeClass: ue(e, "activeClass"),
        activeColor: g,
        baseColor: w,
        color: S,
        density: ue(e, "density"),
        disabled: ue(e, "disabled"),
        lines: ue(e, "lines"),
        nav: ue(e, "nav"),
        slim: ue(e, "slim"),
        variant: ue(e, "variant")
      }
    });
    const _ = pe(!1), T = Z();

    function V(P) {
      _.value = !0
    }

    function R(P) {
      _.value = !1
    }

    function x(P) {
      var F;
      !_.value && !(P.relatedTarget && ((F = T.value) != null && F.contains(P.relatedTarget))) && C()
    }

    function B(P) {
      if (T.value) {
        if (P.key === "ArrowDown") C("next"); else if (P.key === "ArrowUp") C("prev"); else if (P.key === "Home") C("first"); else if (P.key === "End") C("last"); else return;
        P.preventDefault()
      }
    }

    function E(P) {
      _.value = !0
    }

    function C(P) {
      if (T.value) return Tf(T.value, P)
    }

    return fe(() => v(e.tag, {
      ref: T,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, r.value, o.value, a.value, l.value, u.value, h.value, f.value, e.class],
      style: [i.value, c.value, e.style],
      tabindex: e.disabled || _.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: V,
      onFocusout: R,
      onFocus: x,
      onKeydown: B,
      onMousedown: E
    }, {default: () => [v(Mh, {items: s.value, returnObject: e.returnObject}, n)]})), {open: d, select: m, focus: C}
  }
}), Q1 = G({scrollable: Boolean, ...ye(), ...Xe({tag: "main"})}, "VMain"), ew = ae()({
  name: "VMain", props: Q1(), setup(e, t) {
    let {slots: n} = t;
    const {mainStyles: s} = uy(), {ssrBootStyles: r} = Ka();
    return fe(() => v(e.tag, {
      class: ["v-main", {"v-main--scrollable": e.scrollable}, e.class],
      style: [s.value, r.value, e.style]
    }, {
      default: () => {
        var o, i;
        return [e.scrollable ? v("div", {class: "v-main__scroller"}, [(o = n.default) == null ? void 0 : o.call(n)]) : (i = n.default) == null ? void 0 : i.call(n)]
      }
    })), {}
  }
});

function tw(e) {
  let {rootEl: t, isSticky: n, layoutItemStyles: s} = e;
  const r = pe(!1), o = pe(0), i = b(() => {
    const c = typeof r.value == "boolean" ? "top" : r.value;
    return [n.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, r.value ? {[c]: he(o.value)} : {top: s.value.top}]
  });
  Ut(() => {
    Ee(n, c => {
      c ? window.addEventListener("scroll", l, {passive: !0}) : window.removeEventListener("scroll", l)
    }, {immediate: !0})
  }), vt(() => {
    window.removeEventListener("scroll", l)
  });
  let a = 0;

  function l() {
    const c = a > window.scrollY ? "up" : "down", u = t.value.getBoundingClientRect(), f = parseFloat(s.value.top ?? 0),
        d = window.scrollY - Math.max(0, o.value - f),
        m = u.height + Math.max(o.value, f) - window.scrollY - window.innerHeight,
        h = parseFloat(getComputedStyle(t.value).getPropertyValue("--v-body-scroll-y")) || 0;
    u.height < window.innerHeight - f ? (r.value = "top", o.value = f) : c === "up" && r.value === "bottom" || c === "down" && r.value === "top" ? (o.value = window.scrollY + u.top - h, r.value = !0) : c === "down" && m <= 0 ? (o.value = 0, r.value = "bottom") : c === "up" && d <= 0 && (h ? r.value !== "top" && (o.value = -d + h + f, r.value = "top") : (o.value = u.top + d, r.value = "top")), a = window.scrollY
  }

  return {isStuck: r, stickyStyles: i}
}

const nw = 100, sw = 20;

function ic(e) {
  return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * 1.41421356237
}

function ac(e) {
  if (e.length < 2) return 0;
  if (e.length === 2) return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
  let t = 0;
  for (let n = e.length - 1; n > 0; n--) {
    if (e[n].t === e[n - 1].t) continue;
    const s = ic(t), r = (e[n].d - e[n - 1].d) / (e[n].t - e[n - 1].t);
    t += (r - s) * Math.abs(r), n === e.length - 1 && (t *= .5)
  }
  return ic(t) * 1e3
}

function rw() {
  const e = {};

  function t(r) {
    Array.from(r.changedTouches).forEach(o => {
      (e[o.identifier] ?? (e[o.identifier] = new xg(sw))).push([r.timeStamp, o])
    })
  }

  function n(r) {
    Array.from(r.changedTouches).forEach(o => {
      delete e[o.identifier]
    })
  }

  function s(r) {
    var c;
    const o = (c = e[r]) == null ? void 0 : c.values().reverse();
    if (!o) throw new Error(`No samples for touch id ${r}`);
    const i = o[0], a = [], l = [];
    for (const u of o) {
      if (i[0] - u[0] > nw) break;
      a.push({t: u[0], d: u[1].clientX}), l.push({t: u[0], d: u[1].clientY})
    }
    return {
      x: ac(a), y: ac(l), get direction() {
        const {x: u, y: f} = this, [d, m] = [Math.abs(u), Math.abs(f)];
        return d > m && u >= 0 ? "right" : d > m && u <= 0 ? "left" : m > d && f >= 0 ? "down" : m > d && f <= 0 ? "up" : ow()
      }
    }
  }

  return {addMovement: t, endTouch: n, getVelocity: s}
}

function ow() {
  throw new Error
}

function iw(e) {
  let {isActive: t, isTemporary: n, width: s, touchless: r, position: o} = e;
  Ut(() => {
    window.addEventListener("touchstart", S, {passive: !0}), window.addEventListener("touchmove", _, {passive: !1}), window.addEventListener("touchend", T, {passive: !0})
  }), vt(() => {
    window.removeEventListener("touchstart", S), window.removeEventListener("touchmove", _), window.removeEventListener("touchend", T)
  });
  const i = b(() => ["left", "right"].includes(o.value)), {addMovement: a, endTouch: l, getVelocity: c} = rw();
  let u = !1;
  const f = pe(!1), d = pe(0), m = pe(0);
  let h;

  function g(R, x) {
    return (o.value === "left" ? R : o.value === "right" ? document.documentElement.clientWidth - R : o.value === "top" ? R : o.value === "bottom" ? document.documentElement.clientHeight - R : ts()) - (x ? s.value : 0)
  }

  function w(R) {
    let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const B = o.value === "left" ? (R - m.value) / s.value : o.value === "right" ? (document.documentElement.clientWidth - R - m.value) / s.value : o.value === "top" ? (R - m.value) / s.value : o.value === "bottom" ? (document.documentElement.clientHeight - R - m.value) / s.value : ts();
    return x ? Math.max(0, Math.min(1, B)) : B
  }

  function S(R) {
    if (r.value) return;
    const x = R.changedTouches[0].clientX, B = R.changedTouches[0].clientY, E = 25,
        C = o.value === "left" ? x < E : o.value === "right" ? x > document.documentElement.clientWidth - E : o.value === "top" ? B < E : o.value === "bottom" ? B > document.documentElement.clientHeight - E : ts(),
        P = t.value && (o.value === "left" ? x < s.value : o.value === "right" ? x > document.documentElement.clientWidth - s.value : o.value === "top" ? B < s.value : o.value === "bottom" ? B > document.documentElement.clientHeight - s.value : ts());
    (C || P || t.value && n.value) && (u = !0, h = [x, B], m.value = g(i.value ? x : B, t.value), d.value = w(i.value ? x : B), l(R), a(R))
  }

  function _(R) {
    const x = R.changedTouches[0].clientX, B = R.changedTouches[0].clientY;
    if (u) {
      if (!R.cancelable) {
        u = !1;
        return
      }
      const C = Math.abs(x - h[0]), P = Math.abs(B - h[1]);
      (i.value ? C > P && C > 3 : P > C && P > 3) ? (f.value = !0, u = !1) : (i.value ? P : C) > 3 && (u = !1)
    }
    if (!f.value) return;
    R.preventDefault(), a(R);
    const E = w(i.value ? x : B, !1);
    d.value = Math.max(0, Math.min(1, E)), E > 1 ? m.value = g(i.value ? x : B, !0) : E < 0 && (m.value = g(i.value ? x : B, !1))
  }

  function T(R) {
    if (u = !1, !f.value) return;
    a(R), f.value = !1;
    const x = c(R.changedTouches[0].identifier), B = Math.abs(x.x), E = Math.abs(x.y);
    (i.value ? B > E && B > 400 : E > B && E > 3) ? t.value = x.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[o.value] || ts()) : t.value = d.value > .5
  }

  const V = b(() => f.value ? {
    transform: o.value === "left" ? `translateX(calc(-100% + ${d.value * s.value}px))` : o.value === "right" ? `translateX(calc(100% - ${d.value * s.value}px))` : o.value === "top" ? `translateY(calc(-100% + ${d.value * s.value}px))` : o.value === "bottom" ? `translateY(calc(100% - ${d.value * s.value}px))` : ts(),
    transition: "none"
  } : void 0);
  return {isDragging: f, dragProgress: d, dragStyles: V}
}

function ts() {
  throw new Error
}

function aw() {
  const t = Qe("useScopeId").vnode.scopeId;
  return {scopeId: t ? {[t]: ""} : void 0}
}

const lw = ["start", "end", "left", "right", "top", "bottom"], uw = G({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {type: Boolean, default: null},
  permanent: Boolean,
  rail: {type: Boolean, default: null},
  railWidth: {type: [Number, String], default: 56},
  scrim: {type: [Boolean, String], default: !0},
  image: String,
  temporary: Boolean,
  touchless: Boolean,
  width: {type: [Number, String], default: 256},
  location: {type: String, default: "start", validator: e => lw.includes(e)},
  sticky: Boolean, ...An(), ...ye(), ...Zp(), ...Rn(), ...ly(), ...Vt(), ...Xe({tag: "nav"}), ...Je()
}, "VNavigationDrawer"), cw = ae()({
  name: "VNavigationDrawer", props: uw(), emits: {"update:modelValue": e => !0, "update:rail": e => !0}, setup(e, t) {
    let {attrs: n, emit: s, slots: r} = t;
    const {isRtl: o} = xn(), {themeClasses: i} = st(e), {borderClasses: a} = Tn(e), {
          backgroundColorClasses: l,
          backgroundColorStyles: c
        } = nn(ue(e, "color")), {elevationClasses: u} = On(e), {
          displayClasses: f,
          mobile: d
        } = Qp(e), {roundedClasses: m} = Bt(e), h = fS(),
        g = it(e, "modelValue", null, de => !!de), {ssrBootStyles: w} = Ka(), {scopeId: S} = aw(), _ = Z(), T = pe(!1),
        V = b(() => e.rail && e.expandOnHover && T.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)),
        R = b(() => Ti(e.location, o.value)), x = b(() => !e.permanent && (d.value || e.temporary)),
        B = b(() => e.sticky && !x.value && R.value !== "bottom");
    as(() => e.expandOnHover && e.rail != null, () => {
      Ee(T, de => s("update:rail", !de))
    }), as(() => !e.disableResizeWatcher, () => {
      Ee(x, de => !e.permanent && mt(() => g.value = !de))
    }), as(() => !e.disableRouteWatcher && !!h, () => {
      Ee(h.currentRoute, () => x.value && (g.value = !1))
    }), Ee(() => e.permanent, de => {
      de && (g.value = !0)
    }), vo(() => {
      e.modelValue != null || x.value || (g.value = e.permanent || !d.value)
    });
    const {isDragging: E, dragProgress: C, dragStyles: P} = iw({
          isActive: g,
          isTemporary: x,
          width: V,
          touchless: ue(e, "touchless"),
          position: R
        }), F = b(() => {
          const de = x.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : V.value;
          return E.value ? de * C.value : de
        }), {layoutItemStyles: M, layoutItemScrimStyles: z} = cy({
          id: e.name,
          order: b(() => parseInt(e.order, 10)),
          position: R,
          layoutSize: F,
          elementSize: V,
          active: b(() => g.value || E.value),
          disableTransitions: b(() => E.value),
          absolute: b(() => e.absolute || B.value && typeof te.value != "string")
        }), {isStuck: te, stickyStyles: se} = tw({rootEl: _, isSticky: B, layoutItemStyles: M}),
        J = nn(b(() => typeof e.scrim == "string" ? e.scrim : null)),
        Q = b(() => ({...E.value ? {opacity: C.value * .2, transition: "none"} : void 0, ...z.value}));
    Yn({VList: {bgColor: "transparent"}});

    function q() {
      T.value = !0
    }

    function Te() {
      T.value = !1
    }

    return fe(() => {
      const de = r.image || e.image;
      return v(Se, null, [v(e.tag, $e({
        ref: _,
        onMouseenter: q,
        onMouseleave: Te,
        class: ["v-navigation-drawer", `v-navigation-drawer--${R.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": T.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": x.value,
          "v-navigation-drawer--active": g.value,
          "v-navigation-drawer--sticky": B.value
        }, i.value, l.value, a.value, f.value, u.value, m.value, e.class],
        style: [c.value, M.value, P.value, w.value, se.value, e.style]
      }, S, n), {
        default: () => {
          var ke, we, He, qe;
          return [de && v("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [r.image ? (ke = r.image) == null ? void 0 : ke.call(r, {image: e.image}) : v("img", {
            src: e.image,
            alt: ""
          }, null)]), r.prepend && v("div", {class: "v-navigation-drawer__prepend"}, [(we = r.prepend) == null ? void 0 : we.call(r)]), v("div", {class: "v-navigation-drawer__content"}, [(He = r.default) == null ? void 0 : He.call(r)]), r.append && v("div", {class: "v-navigation-drawer__append"}, [(qe = r.append) == null ? void 0 : qe.call(r)])]
        }
      }), v(qn, {name: "fade-transition"}, {
        default: () => [x.value && (E.value || g.value) && !!e.scrim && v("div", $e({
          class: ["v-navigation-drawer__scrim", J.backgroundColorClasses.value],
          style: [Q.value, J.backgroundColorStyles.value],
          onClick: () => g.value = !1
        }, S), null)]
      })])
    }), {isStuck: te}
  }
}), fw = Ke({
  __name: "App", setup(e) {
    const t = rn(),
        n = Z([["profile", "概览", ""], ["modules", "功能管理", "mdi-pencil"], ["logcat", "操作日志", "mdi-history"], ["manager", "成员管理", "mdi-account-cog"]]),
        s = Z(!0), {user: r} = Li(t), {title: o} = Li(t);
    return Ut(() => {
      U0().then(i => {
        n.value[0][2] = "https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/" + i.data.data
      })
    }), (i, a) => {
      const l = is("router-view");
      return _e(), We(x1, null, {
        default: ge(() => [v(ew, null, {
          default: ge(() => [v(R1, {
            border: "",
            density: "compact",
            color: "white"
          }, {
            default: ge(() => [v(k1, {
              class: "d-sm-none",
              onClick: a[0] || (a[0] = So(c => s.value = !s.value, ["stop"]))
            }), v(Rh, null, {default: ge(() => [nt(Wn(be(o)), 1)]), _: 1})]), _: 1
          }), v(Ha, null, {
            default: ge(() => [v(cw, {
              "mobile-breakpoint": "sm",
              modelValue: s.value,
              "onUpdate:modelValue": a[1] || (a[1] = c => s.value = c),
              "expand-on-hover": "",
              rail: "",
              width: "260"
            }, {
              default: ge(() => [v(oc, null, {
                default: ge(() => [v(to, {
                  "prepend-avatar": n.value[0][2],
                  title: be(r).username,
                  subtitle: be(r).permission,
                  to: "/" + n.value[0][0]
                }, null, 8, ["prepend-avatar", "title", "subtitle", "to"])]), _: 1
              }), v(Fa), v(oc, {
                density: "compact",
                nav: ""
              }, {
                default: ge(() => [(_e(!0), dt(Se, null, Fr(n.value.slice(1), c => (_e(), We(to, {
                  "prepend-icon": c[2],
                  title: c[1],
                  value: c[0],
                  key: c[0],
                  to: "/" + c[0]
                }, null, 8, ["prepend-icon", "title", "value", "to"]))), 128))]), _: 1
              })]), _: 1
            }, 8, ["modelValue"]), v(l)]), _: 1
          })]), _: 1
        })]), _: 1
      })
    }
  }
}), dw = Th(fw, [["__scopeId", "data-v-3991b708"]]), Dh = bf(dw);
C1(Dh);
Dh.mount("#app");
export {
  Oo as $,
  st as A,
  Q0 as B,
  Yn as C,
  ue as D,
  _n as E,
  An as F,
  on as G,
  Rn as H,
  Le as I,
  X0 as J,
  Vt as K,
  Ma as L,
  Io as M,
  fp as N,
  Tn as O,
  ko as P,
  Pn as Q,
  $o as R,
  On as S,
  qn as T,
  Bt as U,
  $u as V,
  Vo as W,
  Z0 as X,
  La as Y,
  jt as Z,
  ps as _,
  Xe as a,
  Sn as a$,
  VS as a0,
  Qt as a1,
  Ct as a2,
  bo as a3,
  Se as a4,
  Zr as a5,
  Z as a6,
  tt as a7,
  as as a8,
  Ee as a9,
  ws as aA,
  $a as aB,
  xn as aC,
  nn as aD,
  Cs as aE,
  aw as aF,
  vt as aG,
  fS as aH,
  hw as aI,
  Hn as aJ,
  Mw as aK,
  It as aL,
  Ch as aM,
  Tg as aN,
  Pg as aO,
  Tf as aP,
  Uf as aQ,
  vw as aR,
  q1 as aS,
  i1 as aT,
  Nw as aU,
  NS as aV,
  Nn as aW,
  oc as aX,
  to as aY,
  Og as aZ,
  nt as a_,
  oo as aa,
  Af as ab,
  Ig as ac,
  bw as ad,
  Sw as ae,
  _w as af,
  mt as ag,
  Or as ah,
  ww as ai,
  Cw as aj,
  he as ak,
  Cg as al,
  sr as am,
  ea as an,
  yw as ao,
  Qe as ap,
  Pe as aq,
  Nl as ar,
  Rg as as,
  pe as at,
  Qp as au,
  Ut as av,
  ze as aw,
  Ye as ax,
  ie as ay,
  ao as az,
  Tw as b,
  be as b0,
  qt as b1,
  tn as b2,
  pw as b3,
  Yi as b4,
  mw as b5,
  Ke as b6,
  Rw as b7,
  kw as b8,
  Vw as b9,
  Lw as ba,
  _e as bb,
  We as bc,
  ge as bd,
  Do as be,
  Da as bf,
  WS as bg,
  $w as bh,
  Wn as bi,
  eh as bj,
  Yo as bk,
  Fr as bl,
  dt as bm,
  Iw as bn,
  Ys as bo,
  Ow as bp,
  Pw as bq,
  Bw as br,
  gs as c,
  b as d,
  gw as e,
  v as f,
  ae as g,
  En as h,
  Sg as i,
  $e as j,
  Bg as k,
  xw as l,
  ye as m,
  Aw as n,
  Ew as o,
  G as p,
  Vg as q,
  fh as r,
  ip as s,
  fe as t,
  it as u,
  ba as v,
  lr as w,
  J0 as x,
  Je as y,
  _s as z
};

function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Reviewer-5zyDHVrW.js", "assets/Reviewer-wyAgAzPA.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
