 // Simple interactive helpers for nav, hero slideshow,
 document.addEventListener('DOMContentLoaded', function () { // set footer year 
 const yearEls = [document.getElementById('year'), document.getElementById('yearShop'), document.getElementById('yearAbout'),
 document.getElementById('yearContact')]; yearEls.forEach(el => { if (el) el.textContent = new Date().getFullYear();
 }) } );
 // mobile nav toggle 
 const toggles = document.querySelectorAll('.nav-toggle'); toggles.forEach(t => {
 t.addEventListener('click', () => { const mobileNav = document.getElementById('mobileNav'); const expanded =
 t.getAttribute('aria-expanded') === 'true'; t.setAttribute('aria-expanded', String(!expanded)); if (mobileNav) { if
 (mobileNav.hidden) mobileNav.hidden = false; else mobileNav.hidden = true; } }); });
 // hero slideshow 
 (function heroCarousel(){ const slides = document.querySelectorAll('.slide'); const indicators =
 document.querySelectorAll('#carouselIndicators button'); if (!slides.length) return; let current = 0; const setSlide =
 (index) => { slides.forEach((s,i) => s.setAttribute('aria-hidden', i !== index)); indicators.forEach((b,i) =>
 {b.classList.toggle('active', i === index);}); current = index; }; indicators.forEach(btn => { btn.addEventListener('click',
 () => setSlide(Number(btn.dataset.slide))); });
 // auto advance
 setInterval(() => { const next = (current + 1) %
 slides.length; setSlide(next); }, 6000); setSlide(0);})(); 
// simple product card click -> preview (optional)
 document.querySelectorAll('.product-card').forEach(card => { card.addEventListener('click', (e) => {
// avoid if click on WhatsApp or view buttons
const t = e.target; if (t.closest('a')) return; const img = card.getAttribute('data-image'); if (!img) return;
// open basic modal
const modal = document.createElement('div'); modal.style.position =
 'fixed'; modal.style.inset = 0; modal.style.background = 'rgba(0,0,0,0.7)'; modal.style.display = 'flex';
 modal.style.alignItems = 'center'; modal.style.justifyContent = 'center'; modal.style.zIndex = 9999;
 modal.innerHTML = ` <div style="max-width:820px;width:92%;background:#fff;border-radius:10px;overflow:hidden"> <img src="${img}" alt="" style="width:100%;height:auto;display:block" /> <div
 style="padding:12px;text-align:right"> <button id="closeModal" style="background:var(--alpha
orange);border:0;padding:8px 12px;border-radius:8px;color:#fff;font-weight:700">Close</button> </div> </div> `;
 document.body.appendChild(modal); modal.querySelector('#closeModal').addEventListener('click', () =>
modal.remove()); modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.remove(); }); }); });
 //basic filter (shop page)
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const grid = document.querySelector(".product-grid");
const products = Array.from(document.querySelectorAll(".product-card"));
const noResults = document.getElementById("no-results");
function updateProducts(){
let filtered = products.filter(product =>{const name = product.querySelector("h4").textContent.toLowerCase();
    const category = product.dataset.category; const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categorySelect.value; const matchesSearch = name.includes(searchValue);
    const matchesCategory = categoryValue === "all" || category === categoryValue;
    return matchesSearch && matchesCategory;
});
if(sortSelect.value === "price-low"){ filtered.sort((a,b)=>{
    const priceA = parseFloat(a.querySelector(".price").textContent.replace("R",""));
    const priceB = parseFloat(b.querySelector(".price").textContent.replace("R",""));
    return priceA - priceB;
}); }
if(sortSelect.value === "price-high"){ filtered.sort((a,b)=>{
    const priceA = parseFloat(a.querySelector(".price").textContent.replace("R",""));
    const priceB = parseFloat(b.querySelector(".price").textContent.replace("R",""));
    return priceB - priceA;
}); }
grid.innerHTML = "";
filtered.forEach(product => grid.appendChild(product));
if(filtered.length === 0){ noResults.style.display = "block";} else{noResults.style.display = "none";} }
searchInput.addEventListener("input", updateProducts);
categorySelect.addEventListener("change", updateProducts);
sortSelect.addEventListener("change", updateProducts);

const menuToggle=document.getElementById("menu-toggle"); const navLinks=document.getElementById("nav");
menuToggle.addEventListener("click", function(){navLinks.classList.toggle("active");});
/*
const homeSearch = document.getElementById("home-search");
if(homeSearch !== ""){const homeGrid = document.querySelector(".product-grid");
    const homeProducts = Array.from(document.querySelectorAll(".product-card"));
    const homeNoResults = document.getElementById("home-no-results");
homeSearch.addEventListener("input", function(){ const searchValue = homeSearch.value.toLowerCase(); let visibleCount = 0;
    homeProducts.forEach(product =>{const name = product.querySelector("h4").textContent.toLowerCase();
        if(name.includes(value)){product.style.display ="", visibleCount++;} else{product.style.display="none";}
        return name.includes(searchValue);
    });
    if(visibleCount === 0){homeNoResults.style.display ="block";} else{homeNoResults.style.display="none";} }); }
*/