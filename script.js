
const transition=document.getElementById("transition");
function navigate(url,title=""){
  if(!transition)return;
  transition.className="transition active";
  setTimeout(()=>location.href=url,550);
}
document.querySelectorAll("a[data-transition]").forEach(a=>{
  a.addEventListener("click",e=>{e.preventDefault();navigate(a.href,a.dataset.transition)})
});

const products={
 hoodie:{name:"Essential Hoodie",price:2450,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85"},
 tee:{name:"Classic Tee",price:1850,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"}
};
let cart=JSON.parse(localStorage.getItem("veltroCart")||"[]");
function save(){localStorage.setItem("veltroCart",JSON.stringify(cart))}
function count(){document.querySelectorAll("[data-cart-count]").forEach(x=>x.textContent=cart.length)}
function add(id){cart.push(products[id]);save();count();alert(products[id].name+" added to bag.");}
document.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>add(b.dataset.add)));
function renderCart(){
 const box=document.getElementById("cartItems"); if(!box)return;
 if(!cart.length){box.innerHTML='<p class="muted">Your bag is empty.</p>';document.getElementById("cartTotal").textContent="৳ 0";return}
 box.innerHTML=cart.map((p,i)=>`<div class="cart-item"><div class="cart-thumb" style="background-image:url('${p.image}')"></div><div><h3>${p.name}</h3><p>৳ ${p.price.toLocaleString()}</p></div><button class="remove" onclick="removeCart(${i})">REMOVE</button></div>`).join("");
 document.getElementById("cartTotal").textContent="৳ "+cart.reduce((a,p)=>a+p.price,0).toLocaleString();
}
function removeCart(i){cart.splice(i,1);save();count();renderCart()}
count();renderCart();
