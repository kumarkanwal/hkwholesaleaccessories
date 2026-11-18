
document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header'); const toggle=document.querySelector('.menu-toggle'); const mobile=document.querySelector('.mobile-nav');
  const closeMenu=()=>{ if(!toggle||!mobile)return; toggle.classList.remove('open');mobile.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('is-locked'); };
  toggle?.addEventListener('click',()=>{const open=!mobile.classList.contains('open');toggle.classList.toggle('open',open);mobile.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('is-locked',open);});
  mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  window.addEventListener('resize',()=>{if(innerWidth>1050)closeMenu()});
  const onScroll=()=>{header?.classList.toggle('scrolled',scrollY>20);document.querySelector('.back-top')?.classList.toggle('show',scrollY>500)}; onScroll();addEventListener('scroll',onScroll,{passive:true});
  const page=(location.pathname.split('/').pop()||'index.html').split('?')[0];
  document.querySelectorAll('[data-nav]').forEach(a=>{if(a.getAttribute('href')===page)a.classList.add('active')});
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  document.querySelector('.back-top')?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.13});
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el=>observer.observe(el));
  document.querySelectorAll('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')==='true';document.querySelectorAll('.faq-question').forEach(b=>{b.setAttribute('aria-expanded','false');b.nextElementSibling.style.maxHeight=null});btn.setAttribute('aria-expanded',String(!open));const a=btn.nextElementSibling;if(!open)a.style.maxHeight=a.scrollHeight+'px'}));
  document.addEventListener('error',e=>{const img=e.target;if(img?.tagName==='IMG'&&!img.dataset.fallback){img.dataset.fallback='true';img.src='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f3efe7"/><rect x="35" y="35" width="730" height="730" rx="28" fill="none" stroke="#e8d9b7" stroke-width="5"/><text x="400" y="365" text-anchor="middle" font-family="Arial" font-size="120" font-weight="700" fill="#b89146">HK</text><text x="400" y="440" text-anchor="middle" font-family="Arial" font-size="26" fill="#646464">Wholesale product image</text></svg>`)}},true);
});
