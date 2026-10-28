const WA="15551234567"; // <-- client ka WhatsApp/phone number (country code 1 ke sath, + ke baghair)
// pages share this file; $() returns a harmless stand-in when an element is not on the current page
const NIL={classList:{add(){},remove(){},toggle(){},contains(){return false}},style:{},dataset:{},addEventListener(){},querySelectorAll:()=>[],setAttribute(){}};
const $=(s,r=document)=>r.querySelector(s)||NIL,$$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=n=>"$"+Math.round(n).toLocaleString("en-US");
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* data */
const services=[["🏫","Independent School Cafeterias K-12","Nutritious, kid-friendly meals prepared fresh daily and served by a trained cafeteria team."],["🏢","Corporate & Business Dining","On-site dining programs, daily lunches and executive meals for your workplace."],["☕","Branded Coffee Shops","Custom-branded coffee shops with barista-quality drinks, pastries and light bites."],["🍽️","Catering","Full-service catering for meetings, events and gatherings, with fresh menus and friendly staff."]];
const dishes=[
["Smoked BBQ Brisket","BBQ","🥩","Slow-smoked 12 hours with house dry rub. Per person.",16,0],
["BBQ Pulled Pork","BBQ","🍖","Tender hickory-smoked pork with tangy sauce. Per person.",12,0],
["St. Louis Ribs","BBQ","🍖","Fall-off-the-bone ribs, glazed and grilled. Per person.",15,0],
["Herb Roasted Chicken","Mains","🍗","Free-range chicken with garlic, rosemary & lemon. Per person.",13,0],
["Grilled Salmon","Mains","🐟","Atlantic salmon with lemon-dill butter. Per person.",19,0],
["Chicken Alfredo Pasta","Mains","🍝","Creamy parmesan sauce, grilled chicken, fettuccine. Per person.",12,0],
["Mac & Cheese","Sides","🧀","Baked three-cheese mac with crispy crumb topping. Per person.",6,1],
["Garden Salad","Sides","🥗","Fresh seasonal greens with choice of dressing. Per person.",5,1],
["Loaded Mashed Potatoes","Sides","🥔","Creamy mash with butter, chives & cheddar. Per person.",5,1],
["Veggie Lasagna","Veg","🍕","Layered with spinach, ricotta & roasted vegetables. Per person.",11,1],
["Stuffed Portobello","Veg","🍄","Roasted mushroom with herbed quinoa & feta. Per person.",11,1],
["Gourmet Sliders","Appetizers","🍔","Mini beef sliders with cheddar & house sauce. Per dozen.",42,0],
["Caprese Skewers","Appetizers","🍅","Tomato, mozzarella & basil with balsamic glaze. Per dozen.",28,1],
["Buffalo Wings","Appetizers","🍗","Crispy wings with ranch & blue cheese. Per dozen.",24,0],
["New York Cheesecake","Dessert","🍰","Classic creamy cheesecake with berry compote. Per slice.",6,1],
["Chocolate Brownie Bites","Dessert","🍫","Fudgy brownies with sea salt. Per dozen.",26,1],
["Chicken Tenders Meal","Kids Meals","🍗","Crispy baked tenders with fruit cup & veggie sticks.",5,0],
["Whole-Grain Cheese Pizza","Kids Meals","🍕","Whole-grain crust, real mozzarella, served with salad.",4,1],
["Caffè Latte","Coffee","☕","Espresso with steamed milk. Hot or iced.",5,1],
["Cappuccino","Coffee","☕","Rich espresso topped with velvety foam.",5,1],
["Cold Brew","Coffee","🧊","Slow-steeped for 18 hours, smooth and bold.",5,1],
["Butter Croissant","Coffee","🥐","Flaky, baked fresh every morning.",4,1],
["Fresh Lemonade","Drinks","🍋","House-squeezed lemonade by the gallon.",18,1],
["Iced Tea Bar","Drinks","🥤","Sweet & unsweetened tea by the gallon.",16,1]];
const pkgs=[
{n:"Silver",p:35,f:["1 Entrée","2 Sides","Garden Salad","Dinner Rolls","1 Dessert","Lemonade & Iced Tea"]},
{n:"Gold",p:55,pop:1,f:["2 Entrées","BBQ Item","3 Sides","Salad Bar","2 Desserts","Beverage Station","Service Staff"]},
{n:"Platinum",p:85,f:["3 Entrées","Live Carving Station","Appetizer Platter","4 Sides","3 Desserts","Coffee & Beverage Bar","Full Staff & Setup"]}];
const gal=[["🏫","School Cafeteria","school-cafeteria"],["🏢","Corporate Dining","corporate-dining"],["☕","Coffee Bar","cappuccino"],["🥩","BBQ Brisket","smoked-bbq-brisket"],["🥗","Salad Bar","garden-salad"],["🥐","Fresh Pastries","butter-croissant"],["🍔","Slider Platter","gourmet-sliders"],["🍰","Dessert Table","new-york-cheesecake"]];
const reviews=[["Emily Johnson","School Administrator","Our students love the new cafeteria menu. Meals are fresh, healthy and the staff is wonderful with the kids."],["Michael Carter","Corporate Client","Our employees look forward to lunch every day. Reliable, fresh and always on time."],["Sarah Mitchell","Coffee Shop Owner","They built and run our branded coffee shop beautifully. The drinks and pastries get great reviews."],["David Thompson","Event Host","Best catering in town. Fair pricing and very friendly staff."]];
const faqs=[["How early should I book?","For catering we recommend 2–4 weeks ahead. School, corporate and coffee shop programs are set up after a consultation."],["Do you offer custom menus?","Yes! Every package can be fully customized to your taste, budget and dietary needs."],["What is the minimum number of guests?","Our minimum order is 20 guests for packages and 10 for individual dishes."],["Do you provide service staff?","Yes. Gold and Platinum catering packages include service staff, and our dining programs come with a trained on-site team."],["How do I pay?","50% advance to confirm the booking and the remaining balance on event day. Credit/debit cards, ACH, Zelle and checks accepted."]];
const mqText=["🏫 K-12 Cafeterias","🏢 Corporate Dining","☕ Branded Coffee Shops","🍽️ Catering","🥗 Fresh Daily","👨‍🍳 Expert Chefs"];

/* loader / theme */
/* preloader: only on the first page of a visit */
try{sessionStorage.setItem("ycc_seen","1")}catch(e){}
addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("hide"),1500));
const setTheme=t=>{document.documentElement.dataset.theme=t;$("#theme").textContent=t==="dark"?"☀️":"🌙";store.set("theme",t)};
setTheme(store.get("theme","light"));
$("#theme").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");
$("#yr").textContent=new Date().getFullYear();

/* toast */
let tt;const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),2800)};

/* render static */
$("#mq").innerHTML=[...mqText,...mqText].map(t=>`<span>${t}</span>`).join("");
$("#svc").innerHTML=services.map((s,i)=>`<div class="svc rv-el d${i%3+1}"><span class="ic">${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join("");
$("#pkgs").innerHTML=pkgs.map((p,i)=>`<div class="pkg rv-el d${i+1} ${p.pop?"pop":""}">${p.pop?'<span class="tagp">⭐ MOST POPULAR</span>':""}<h3>${p.n}</h3><div class="pr">${money(p.p)}<small> /head</small></div><ul>${p.f.map(x=>`<li>${x}</li>`).join("")}</ul><a href="contact.html?pkg=${p.n}#booking" class="btn" data-pkg="${p.n}">Choose ${p.n}</a></div>`).join("");
$("#gal").innerHTML=gal.map(g=>`<div class="gi rv-el" data-t="${g[1]}" data-e="${g[0]}" data-img="${g[2]}.jpg"><span>${g[0]}</span><img src="${g[2]}.jpg" alt="${g[1]}" loading="lazy" onerror="this.remove()"></div>`).join("");
$("#faq").innerHTML=faqs.map(f=>`<div class="fq"><button>${f[0]}</button><div>${f[1]}</div></div>`).join("");
$("#tt").innerHTML=reviews.map(r=>`<div class="tc"><div><div class="stars">★★★★★</div><p>"${r[2]}"</p><h4>${r[0]}</h4><small style="color:var(--muted)">${r[1]}</small></div></div>`).join("");

/* menu */
const cats=["All",...new Set(dishes.map(d=>d[1]))];let cat="All";
$("#tabs").innerHTML=cats.map(c=>`<button class="tab ${c==="All"?"active":""}" data-cat="${c}">${c}</button>`).join("");
const slug=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function renderDishes(){
  const q=($("#search").value||"").toLowerCase().trim();
  const list=dishes.map((d,i)=>({d,i})).filter(({d})=>(cat==="All"||d[1]===cat)&&(d[0].toLowerCase().includes(q)||d[3].toLowerCase().includes(q)));
  $("#dishes").innerHTML=list.length?list.map(({d,i},k)=>`<div class="dish" style="animation-delay:${k*50}ms"><span class="veg ${d[5]?"":"nv"}">${d[5]?"● VEG":"● NON-VEG"}</span><div class="pic"><span class="em">${d[2]}</span><img src="${slug(d[0])}.jpg" alt="${d[0]}" loading="lazy" onerror="this.remove()"></div><h4>${d[0]}</h4><p>${d[3]}</p><div class="row"><span class="price">${money(d[4])}</span><button class="add" data-i="${i}" aria-label="Add">+</button></div></div>`).join(""):`<p class="empty">No dishes found 😔</p>`;
}
$("#tabs").onclick=e=>{const b=e.target.closest(".tab");if(!b)return;$$(".tab").forEach(t=>t.classList.remove("active"));b.classList.add("active");cat=b.dataset.cat;renderDishes()};
if($("#dishes")!==NIL){$("#search").oninput=renderDishes;renderDishes()}

/* cart */
let cart=store.get("cart",{});
const openCart=o=>{$("#cart").classList.toggle("open",o);$("#overlay").classList.toggle("show",o)};
function renderCart(){
  const ids=Object.keys(cart).filter(i=>dishes[i]);let total=0,count=0;
  $("#cbody").innerHTML=ids.length?ids.map(i=>{const d=dishes[i],q=cart[i];total+=d[4]*q;count+=q;return `<div class="ci2"><span class="e">${d[2]}</span><div class="inf"><h5>${d[0]}</h5><small>${money(d[4]*q)}</small></div><div class="qty"><button data-m="${i}">−</button><b>${q}</b><button data-p="${i}">+</button></div><button class="rm" data-r="${i}">🗑</button></div>`}).join(""):`<div class="ct"><span>🍽️</span>Your cart is empty.<br>Add some tasty dishes!</div>`;
  $("#ctotal").textContent=money(total);$("#cnt").textContent=count;store.set("cart",cart);
}
$("#dishes").onclick=e=>{const b=e.target.closest(".add");if(!b)return;const i=b.dataset.i;cart[i]=(cart[i]||0)+1;renderCart();toast(`${dishes[i][2]} ${dishes[i][0]} added to cart`);const c=$("#cartBtn");c.style.transform="scale(1.3)";setTimeout(()=>c.style.transform="",250)};
$("#cbody").onclick=e=>{const t=e.target;if(t.dataset.p)cart[t.dataset.p]++;else if(t.dataset.m){if(--cart[t.dataset.m]<=0)delete cart[t.dataset.m]}else if(t.dataset.r)delete cart[t.dataset.r];else return;renderCart()};
$("#cartBtn").onclick=()=>openCart(true);$("#cclose").onclick=$("#overlay").onclick=()=>openCart(false);
$("#clear").onclick=()=>{cart={};renderCart()};
$("#checkout").onclick=()=>{
  const ids=Object.keys(cart);if(!ids.length)return toast("Cart is empty!");
  let tot=0;const lines=ids.map(i=>{tot+=dishes[i][4]*cart[i];return `• ${dishes[i][0]} x${cart[i]} = ${money(dishes[i][4]*cart[i])}`});
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hello Your Cuisine Chef! I'd like to order:\n\n"+lines.join("\n")+"\n\nTotal: "+money(tot))}`,"_blank");
};
renderCart();
$("#wa").href=`https://wa.me/${WA}?text=${encodeURIComponent("Hello Your Cuisine Chef! I need catering information.")}`;$("#wa").target="_blank";

/* calculator */
function calc(){
  const g=+$("#guests").value,p=+$("#cpkg").value,m=+$("#cev").value;
  let t=g*p*m+($("#cdec").checked?500:0)+($("#clive").checked?600:0);
  $("#gv").textContent=g;$("#ctot").textContent=money(t);$("#cper").textContent=`≈ ${money(t/g)} per guest`;
}
if($("#guests")!==NIL){$$("#calc input,#calc select").forEach(e=>e.oninput=calc);calc()}
$("#pkgs").addEventListener("click",e=>{const b=e.target.closest("[data-pkg]");if(b){const s=$("#cpkg");[...s.options].forEach((o,i)=>{if(o.text.startsWith(b.dataset.pkg))s.selectedIndex=i});$("#bm").value=`Interested in the ${b.dataset.pkg} package.`;calc()}});

/* gallery lightbox */
$("#gal").onclick=e=>{const g=e.target.closest(".gi");if(!g)return;$("#lbe").textContent=g.dataset.e;$("#lbt").textContent=g.dataset.t;const im=$("#lbi");im.style.display="block";im.onerror=()=>im.style.display="none";im.src=g.dataset.img;$("#lbe").style.display="none";im.onload=()=>$("#lbe").style.display="none";im.onerror=()=>{im.style.display="none";$("#lbe").style.display="block"};$("#lb").classList.add("show")};
$("#lb").onclick=()=>$("#lb").classList.remove("show");
addEventListener("keydown",e=>{if(e.key==="Escape"){$("#lb").classList.remove("show");openCart(false)}});

/* testimonials slider */
let ti=0;const dotsEl=$("#dots");dotsEl.innerHTML=reviews.map((_,i)=>`<i data-i="${i}"></i>`).join("");
function slide(i){ti=(i+reviews.length)%reviews.length;$("#tt").style.transform=`translateX(-${ti*100}%)`;$$("i",dotsEl).forEach((d,k)=>d.classList.toggle("on",k===ti))}
dotsEl.onclick=e=>{if(e.target.dataset.i)slide(+e.target.dataset.i)};slide(0);setInterval(()=>slide(ti+1),5000);

/* faq */
$("#faq").onclick=e=>{const b=e.target.closest("button");if(!b)return;const f=b.parentElement,open=f.classList.contains("open");$$(".fq").forEach(x=>{x.classList.remove("open");x.lastChild.style.maxHeight=0});if(!open){f.classList.add("open");f.lastChild.style.maxHeight=f.lastChild.scrollHeight+40+"px"}};

/* forms */
const bd=$("#bd");bd.min=new Date(Date.now()+864e5).toISOString().split("T")[0];
const mark=(el,ok)=>{el.parentElement.classList.toggle("bad",!ok);return ok};
$("#bform").onsubmit=e=>{
  e.preventDefault();
  const ok=[mark($("#bn"),$("#bn").value.trim().length>1),mark($("#bp"),/^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test($("#bp").value.trim())),mark($("#be"),/^\S+@\S+\.\S+$/.test($("#be").value)),mark(bd,bd.value&&new Date(bd.value)>new Date()),mark($("#bg"),+$("#bg").value>=10)].every(Boolean);
  if(!ok)return toast("Please fix the highlighted fields ⚠️");
  const b={name:$("#bn").value,phone:$("#bp").value,email:$("#be").value,date:bd.value,type:$("#bt").value,guests:$("#bg").value,msg:$("#bm").value,at:new Date().toISOString()};
  const all=store.get("bookings",[]);all.push(b);store.set("bookings",all);
  toast("🎉 Booking received! Opening WhatsApp to confirm...");
  const txt=`New Booking Request\nName: ${b.name}\nPhone: ${b.phone}\nEmail: ${b.email}\nDate: ${b.date}\nEvent: ${b.type}\nGuests: ${b.guests}\nNote: ${b.msg||"-"}`;
  setTimeout(()=>window.open(`https://wa.me/${WA}?text=${encodeURIComponent(txt)}`,"_blank"),900);
  e.target.reset();
};
$("#cform").onsubmit=e=>{e.preventDefault();const ok=[mark($("#cn"),$("#cn").value.trim().length>1),mark($("#ce"),/^\S+@\S+\.\S+$/.test($("#ce").value))].every(Boolean);if(!ok)return;const m=store.get("messages",[]);m.push({n:$("#cn").value,e:$("#ce").value,m:$("#cm").value});store.set("messages",m);toast("✅ Message sent! We'll reply soon.");e.target.reset()};
$("#nl").onsubmit=e=>{e.preventDefault();if(!/^\S+@\S+\.\S+$/.test($("#nle").value))return toast("Enter a valid email");toast("🎉 Subscribed successfully!");e.target.reset()};

/* nav / scroll */
const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
$$("#menu a").forEach(a=>a.classList.toggle("active",(a.getAttribute("href")||"").split(/[?#]/)[0].toLowerCase()===page));
$("#burger").onclick=()=>{const m=$("#menu");m.classList.toggle("open");$("#burger").textContent=m.classList.contains("open")?"✕":"☰"};
$$("#menu a").forEach(a=>a.onclick=()=>{$("#menu").classList.remove("open");$("#burger").textContent="☰"});
addEventListener("scroll",()=>{
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  $("#progress").style.width=y/h*100+"%";
  $("#header").classList.toggle("sticky",y>50);
  $("#up").classList.toggle("show",y>500);
},{passive:true});
$("#up").onclick=()=>scrollTo({top:0,behavior:"smooth"});

/* reveal + counters */
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}}),{threshold:.12});
$$(".rv-el").forEach(el=>io.observe(el));
const co=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const el=en.target,t=+el.dataset.c;let n=0;const step=()=>{n+=Math.ceil(t/60);if(n>=t)n=t;el.textContent=n;if(n<t)requestAnimationFrame(step)};step();co.unobserve(el)}),{threshold:.5});
$$("[data-c]").forEach(el=>{if(!isNaN(+el.dataset.c))co.observe(el)});

/* typed text */
const words=["Meal","Plate","Cup","Bite","Event"];let wi=0,ci=0,del=false;
(function type(){const w=words[wi],el=$("#typed");if(el===NIL)return;el.textContent=w.slice(0,ci);
  if(!del&&ci===w.length){del=true;return setTimeout(type,1400)}
  if(del&&ci===0){del=false;wi=(wi+1)%words.length}
  ci+=del?-1:1;setTimeout(type,del?60:110)})();

/* cursor */
const cur=$("#cursor");addEventListener("mousemove",e=>{cur.style.left=e.clientX+"px";cur.style.top=e.clientY+"px"});
document.addEventListener("mouseover",e=>cur.classList.toggle("big",!!e.target.closest("a,button,.dish,.svc,.gi,.pkg")));

/* hero parallax */
addEventListener("mousemove",e=>{const x=(e.clientX/innerWidth-.5)*30,y=(e.clientY/innerHeight-.5)*30;$$(".float").forEach((f,i)=>f.style.translate=`${x*(i+1)*.4}px ${y*(i+1)*.4}px`)});

/* contact page: prefill package choice from ?pkg= */
(()=>{const p=new URLSearchParams(location.search).get("pkg");if(p&&$("#bm")!==NIL)$("#bm").value=`Interested in the ${p} catering package.`})();
