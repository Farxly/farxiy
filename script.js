// Canvas background shooting stars
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;

window.addEventListener('resize', ()=>{ W = canvas.width = innerWidth; H = canvas.height = innerHeight; });

class ShootingStar{
  constructor(){this.reset();}
  reset(){
    this.x=Math.random()*W;
    this.y=Math.random()*H*0.5;
    this.len=80+Math.random()*140;
    this.speed=3+Math.random()*4;
    this.angle=(Math.PI/180)*(120+Math.random()*30);
    this.opacity=0.9;
    this.size=1+Math.random()*1.5;
    this.vx=Math.cos(this.angle)*this.speed;
    this.vy=Math.sin(this.angle)*this.speed;
    this.life=0;
    this.maxLife=200+Math.random()*200;
  }
  update(){this.x+=this.vx; this.y+=this.vy; this.life++; if(this.x<-this.len||this.y>H+50||this.life>this.maxLife)this.reset();}
  draw(ctx){
    ctx.save();
    ctx.globalAlpha=this.opacity*0.9;
    const grad=ctx.createLinearGradient(this.x,this.y,this.x-this.vx*this.len,this.y-this.vy*this.len);
    grad.addColorStop(0,'rgba(255,255,255,1)');
    grad.addColorStop(0.6,'rgba(255,255,255,0.25)');
    grad.addColorStop(1,'rgba(255,255,255,0)');
    ctx.strokeStyle=grad;
    ctx.lineWidth=this.size;
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x-this.vx*this.len,this.y-this.vy*this.len);
    ctx.stroke();
    ctx.restore();
  }
}

const stars=[];
for(let i=0;i<220;i++){stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+0.3,alpha:0.2+Math.random()*0.8});}

const shootingStars=[];
for(let i=0;i<6;i++)shootingStars.push(new ShootingStar());

function drawBackground(){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,'#060217'); g.addColorStop(0.5,'#07021b'); g.addColorStop(1,'#02000a');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  for(let s of stars){ctx.globalAlpha=s.alpha*0.9;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle='white';ctx.fill();}
  for(let ss of shootingStars){ss.update();ss.draw(ctx);}
}
function loop(){ctx.clearRect(0,0,W,H);drawBackground();requestAnimationFrame(loop);}
loop();
canvas.style.pointerEvents='none';

// Live clock
const clock=document.getElementById('liveClock');
setInterval(()=>{const d=new Date(); clock.textContent=d.toLocaleTimeString();},1000);

// Proyek galaxy effect
const projects = document.querySelectorAll('.project');
projects.forEach(p=>{
  p.addEventListener('click', ()=>{
    const effect=document.createElement('div');
    effect.style.position='absolute';
    effect.style.top='0'; effect.style.left='0';
    effect.style.width='100%'; effect.style.height='100%';
    effect.style.background='radial-gradient(circle, rgba(255,255,255,0.3), transparent)';
    effect.style.borderRadius='inherit';
    effect.style.pointerEvents='none';
    p.appendChild(effect);
    setTimeout(()=>{
      effect.style.transition='opacity 0.6s';
      effect.style.opacity='0';
      setTimeout(()=>effect.remove(),600);
    },200);
  });
});
