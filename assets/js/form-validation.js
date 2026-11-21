
(()=>{
  const successMessage="Thank you! Your enquiry has been sent. We'll get back to you soon.";
  const errorMessage='Sorry, something went wrong. Please email us at info@hkwholesaleaccessories.com.au or call 0420 721 502.';
  const pageLoadedAt=Math.floor(Date.now()/1000);
  const validEmail=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const hiddenField=(form,name,value='')=>{
    let field=form.querySelector(`input[name="${name}"]`);
    if(!field){field=document.createElement('input');field.type='hidden';field.name=name;form.append(field)}
    field.value=value;
  };
  const prepare=form=>{
    form.action='send-mail.php';
    form.method='post';
    hiddenField(form,'website');
    hiddenField(form,'timestamp',String(pageLoadedAt));
    hiddenField(form,'page_url',window.location.href);
  };
  const bind=form=>{
    if(!form||form.dataset.bound)return;
    form.dataset.bound='true';
    prepare(form);
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      let valid=true;
      form.querySelectorAll('[required]').forEach(element=>{
        const field=element.closest('.field')||element.closest('.checkbox-row')||element.parentElement;
        const invalid=element.type==='checkbox'?!element.checked:!element.value.trim()||(element.type==='email'&&!validEmail(element.value.trim()));
        field?.classList.toggle('invalid',invalid);
        if(invalid)valid=false;
      });
      const status=form.querySelector('.form-status');
      if(!valid){
        if(status){status.className='form-status error';status.textContent='Please complete the required fields.'}
        form.querySelector('.invalid input,.invalid select,.invalid textarea')?.focus();
        return;
      }
      const submitButton=form.querySelector('[type="submit"]');
      const originalLabel=submitButton?.textContent||'';
      if(submitButton){submitButton.disabled=true;submitButton.textContent='Sending...'}
      if(status){status.className='form-status';status.textContent=''}
      try{
        const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
        const result=await response.json();
        if(!response.ok||!result.success)throw new Error(result.message||'Request failed');
        if(status){status.className='form-status success';status.textContent=successMessage}
        form.reset();
        hiddenField(form,'timestamp',String(Math.floor(Date.now()/1000)));
        hiddenField(form,'page_url',window.location.href);
      }catch(error){
        if(status){status.className='form-status error';status.textContent=errorMessage}
      }finally{
        if(submitButton){submitButton.disabled=false;submitButton.textContent=originalLabel}
      }
    });
    form.querySelectorAll('input,select,textarea').forEach(element=>element.addEventListener('input',()=>element.closest('.field,.checkbox-row')?.classList.remove('invalid')));
  };
  window.HKForms={bind};
  document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('.enquiry-form').forEach(bind));
})();
