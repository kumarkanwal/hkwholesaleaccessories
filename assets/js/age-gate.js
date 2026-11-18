
document.addEventListener('DOMContentLoaded', () => {
  const key = 'hkWholesaleAgeConfirmed';
  let confirmed = false;
  try { confirmed = localStorage.getItem(key) === 'true'; } catch (_) {}
  if (confirmed) return;

  const gate = document.createElement('div');
  gate.className = 'age-gate';
  gate.setAttribute('role','dialog'); gate.setAttribute('aria-modal','true'); gate.setAttribute('aria-labelledby','age-title');
  const card = document.createElement('div'); card.className='age-card';
  const logo=document.createElement('img'); logo.src='assets/images/branding/hk-logo.svg'; logo.alt='HK Wholesale Accessories';
  const title=document.createElement('h2'); title.id='age-title'; title.textContent='Are you 18 years of age or older?';
  const text=document.createElement('p'); text.textContent='This trade website contains information about age-restricted products. You must be at least 18 years old to continue.';
  const notice=document.createElement('div'); notice.className='age-notice'; notice.textContent='For approved Australian businesses and authorised retailers only.';
  const actions=document.createElement('div'); actions.className='age-actions';
  const yes=document.createElement('button'); yes.className='btn btn-primary'; yes.type='button'; yes.textContent='Yes, I am 18 or older';
  const no=document.createElement('button'); no.className='btn btn-secondary'; no.type='button'; no.textContent='No, I am under 18';
  actions.append(yes,no); card.append(logo,title,text,notice,actions); gate.append(card); document.body.append(gate);
  document.body.classList.add('is-locked'); requestAnimationFrame(()=>gate.classList.add('open')); yes.focus();

  yes.addEventListener('click',()=>{ try{localStorage.setItem(key,'true')}catch(_){} gate.classList.remove('open'); document.body.classList.remove('is-locked'); setTimeout(()=>gate.remove(),250); });
  no.addEventListener('click',()=>{
    card.replaceChildren();
    const h=document.createElement('h2'); h.textContent='Access restricted';
    const p=document.createElement('p'); p.textContent='You must be at least 18 years old to access this website.';
    const leave=document.createElement('button'); leave.className='btn btn-primary'; leave.type='button'; leave.textContent='Leave Website';
    leave.addEventListener('click',()=>{ if(history.length>1) history.back(); else location.replace('about:blank'); });
    card.append(h,p,leave); leave.focus();
  });
});
// Development reset: localStorage.removeItem('hkWholesaleAgeConfirmed');
