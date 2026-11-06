const express = require('express');
const app = express();
const port = 5000;
app.use(express.static(__dirname));

function layout(titre, contenu, extra=""){
return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${titre} - Maison de Paix</title>
<style>
body{margin:0;font-family:sans-serif;background:#fdf6f0;color:#5a4a4a;line-height:1.8}
.nav{position:sticky;top:0;background:white;padding:14px 22px;display:flex;justify-content:space-between;box-shadow:0 2px 12px rgba(0,0,0,.06)}
.nav a{text-decoration:none;color:#b06b6b;font-weight:800}
.container{max-width:780px;margin:0 auto;padding:24px 18px}
h1{color:#b06b6b;text-align:center}
.slogan{text-align:center;background:#fff1ee;border-radius:30px;padding:12px 18px;margin:14px auto;max-width:560px;color:#b06b6b;font-weight:700}
.card{background:white;border-radius:20px;padding:24px;box-shadow:0 8px 24px rgba(0,0,0,.06);margin:20px 0}
.probleme{background:#fff1ee;border-left:5px solid #e89a90;padding:18px;border-radius:16px;margin:18px 0}
.solution{background:white;border-left:5px solid #8ec9a5;padding:20px;border-radius:16px;margin:18px 0;box-shadow:0 6px 18px rgba(0,0,0,.05);line-height:1.9}
.btn{display:inline-block;background:#e89a90;color:white;padding:13px 24px;border-radius:30px;text-decoration:none;font-weight:800;margin:6px;border:none;cursor:pointer}
.btn-outline{background:white;color:#b06b6b;border:2px solid #e89a90}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.cat-card{background:white;border-radius:20px;padding:22px;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.06);text-decoration:none;color:#5a4a4a;display:block}
.cat-card b{display:block;margin:8px 0;color:#b06b6b}
.cover{background:linear-gradient(135deg,#fff1ee 0%,#ffe4de 100%);border-radius:28px;padding:32px 22px;text-align:center;margin:10px 0 22px 0;border:2px solid #ffe4de}
.cover h1{font-size:32px;margin:10px 0}
.cover p{font-size:16px}
.quiz-q{font-weight:800;margin:24px 0 10px 0}
.quiz-opt{display:block;width:100%;text-align:left;background:#fff;padding:14px 16px;border:2px solid #ffe4de;border-radius:14px;margin:8px 0;cursor:pointer}
.progress{height:10px;background:#ffe4de;border-radius:10px;overflow:hidden;margin:14px 0}
.progress div{height:100%;background:#e89a90;width:0%;transition:.4s}
.sexe-box{display:flex;gap:12px;justify-content:center;margin:18px 0}
.sexe-btn{padding:14px 30px;border-radius:30px;border:2px solid #e89a90;background:white;cursor:pointer;font-weight:800}
.sexe-btn.active{background:#e89a90;color:white}
.q-start{background:#fff8f6;border:2px solid #ffe4de;border-radius:16px;padding:16px;margin:12px 0;display:flex;justify-content:space-between;align-items:center}
@media(max-width:600px){.grid2{grid-template-columns:1fr}}
</style>
<script>
function getSexe(){return localStorage.getItem('sexe')||'femme';}
function setSexe(s){localStorage.setItem('sexe',s);document.querySelectorAll('.sexe-btn').forEach(b=>b.classList.remove('active'));let btn=document.getElementById('btn-'+s);if(btn)btn.classList.add('active');let a=document.getElementById('accroche');if(a)a.innerText=s==='femme'?'Ma chérie, dépose ton sac ici':'Mon frère, dépose ton sac ici';let p=document.getElementById('prenom');if(p)p.innerText=s==='femme'?'Ma chérie':'Mon frère';let a2=document.getElementById('accroche2');if(a2)a2.innerText=s==='femme'?'Ma chérie, choisis ta maison':'Mon frère, choisis ta maison';}
function startQuiz(id, questions){
let i=0,score=0;const box=document.getElementById(id);const prog=document.getElementById('prog-'+id);
function show(){
if(!box)return;
if(i>=questions.length){box.innerHTML='<div style="text-align:center;padding:20px"><h2>💖 Résultat: '+score+' / '+questions.length+'</h2><p>Ici tu t\\'es senti(e) à l\\'aise et tu ressors plus fort(e).</p><button class="btn" onclick="location.reload()">Recommencer</button></div>';return;}
if(prog)prog.style.width=(i/questions.length*100)+'%';let q=questions[i];let html='<div class="quiz-q">'+(i+1)+'. '+q.q+'</div>';q.options.forEach((opt,idx)=>{html+='<button class="quiz-opt" onclick="window.choose'+id+'('+idx+')">'+opt+'</button>';});box.innerHTML=html;
}
window['choose'+id]=function(idx){if(questions[i].good.includes(idx))score++;i++;show();}
show();
}
</script>
</head><body>
<div class="nav"><a href="/">Maison de Paix</a><a href="/maison">Maisons</a></div>
<div class="container">${contenu}</div>
${extra}
</body></html>`;
}

// PAGE D'ACCUEIL - PREMIERE DE COUVERTURE
app.get('/', (req,res)=>{
res.send(layout("Accueil", `
<div class="cover">
<img src="/logo.jpg" style="width:130px;height:130px;border-radius:50%;border:4px solid white;box-shadow:0 8px 20px rgba(0,0,0,.1)" onerror="this.style.display='none'">
<h1>Maison de Paix 🇨🇲</h1>
<div class="slogan">🇨🇲 Ici sentez-vous à l'aise et en ressortez plus fort(e) 🇨🇲</div>
<p><b>Fait avec le cœur au Cameroun, pour les jeunes du Cameroun</b><br>Un refuge doux pour filles et garçons hypersensibles, qui portent trop lourd dans le silence.</p>
</div>

<div class="card">
<h2 style="text-align:center">D'abord, tu es ?</h2>
<div class="sexe-box">
<button id="btn-femme" class="sexe-btn active" onclick="setSexe('femme')">👩 Femme</button>
<button id="btn-homme" class="sexe-btn" onclick="setSexe('homme')">👨 Homme</button>
</div>
<p id="accroche" style="text-align:center;font-weight:800;color:#b06b6b;margin-top:12px;font-size:18px">Ma chérie, dépose ton sac ici</p>
<p style="text-align:center;opacity:.7;font-size:14px">On ne te juge pas ici. On t'écoute.</p>
</div>

<div class="card">
<h2>Dis-moi, où est ta douleur aujourd'hui ? Clique, je t'écoute :</h2>
<div class="q-start"><span>❤️ Tu te sens en dépression, vide ?</span><a class="btn" href="/depression">Oui c'est moi</a></div>
<div class="q-start"><span>🌙 Tu veux oublier une douleur qui te pèse ?</span><a class="btn" href="/maison">Aide-moi</a></div>
<div class="q-start"><span>💔 Relation qui te fait plus mal que du bien ?</span><a class="btn" href="/amour">C'est moi</a></div>
<div class="q-start"><span>🤲 Besoin d'être écouté sans jugement ?</span><a class="btn" href="/maison">J'écoute</a></div>
<p style="margin-top:22px;text-align:center"><b><span id="prenom">Ma chérie</span>, si tu as cliqué oui, reste ici. On va respirer ensemble.</b></p>
<div style="text-align:center;margin-top:16px"><a class="btn" style="padding:16px 32px;font-size:18px" href="/maison">Entrer dans la Maison de Paix ❤️🇨🇲</a></div>
</div>
<script>setSexe(getSexe());</script>
`));
});

app.get('/maison',(req,res)=>{
res.send(layout("Les 4 Maisons", `
<div style="text-align:center"><h1 id="accroche2">Ma chérie, choisis ta maison 🇨🇲</h1><div class="slogan">4 refuges, 4 douleurs, un même cœur de jeune qui veut guérir</div></div>
<div class="grid2">
<a class="cat-card" href="/famille">🏠<b>Problèmes de famille</b><br>Quand la maison t'étouffe</a>
<a class="cat-card" href="/amour">💔<b>Goumin d'amour</b><br>Quand le cœur est chiffonné</a>
<a class="cat-card" href="/harcelement">🛡️<b>Harcèlement corps</b><br>Quand on insulte ton poids, ta taille</a>
<a class="cat-card" href="/depression">🌧️<b>Dépression</b><br>Quand tu es vide et fatigué(e)</a>
</div>
<div style="text-align:center;margin-top:24px"><a class="btn btn-outline" href="/">← Retour accueil 🇨🇲</a></div>
<script>setSexe(getSexe());</script>
`));
});

// CONSEILS VRAIMENT DIFFERENTS POUR CHAQUE MAISON

app.get('/famille',(req,res)=>{
const conseils=`<b>🏠 CONSEILS QUAND LA MAISON T'ÉTOUFFE</b><br><br>
<b>1. Si tu te sens seule, appelle une copine ou une amie</b><br>Quand ça crie trop fort et que tu veux disparaître, ne reste pas seule. Appelle ta copine sûre, 2 minutes de vocal ça libère.<br><br>
<b>2. Sors avec tes amies pour respirer</b><br>Prends ton sac, sors marcher 15 min avec tes amies. Allez au carrefour, achetez un jus, parlez d'autre chose. Le dehors te rappelle que tu existes ailleurs.<br><br>
<b>3. Frappe un coussin pour sortir la colère</b><br>T'es énervée ? Prends ton oreiller, frappe fort, crie dedans. Tu libères sans casser.<br><br>
<b>4. Mets la musique que tu aimes même si c'est le Biam</b><br>Biam, Bikutsi, ce que tu veux, mets à fond et transforme ta chambre en studio de paix. Danse.<br><br>
<b>5. 🙏 Et surtout prie ton DIEU</b><br>Dis "Seigneur, ramène la paix dans cette maison et dans mon cœur".`;
const quiz=[{q:"Quand ça crie fort chez toi, tu te sens comment ?",options:["C'est de ma faute","J'ai peur mais ce n'est pas à moi de porter tout","Je dois crier plus fort"],good:[1]},{q:"Si ta famille était une série télé ?",options:["Les pleurs de 20h","On a caché la télécommande","L'argent du marché a disparu"],good:[0,1,2]},{q:"Si tu pouvais mettre ta famille en silencieux ?",options:["Mode avion direct !","Vibreur seulement bonnes nouvelles","Je laisse sonner"],good:[0,1,2]},{q:"Tu as le droit de dire non ?",options:["Non jamais","Oui avec respect","Seulement malade"],good:[1]},{q:"Quelle phrase tu te répètes ce soir ?",options:["Je suis le problème","Je fais de mon mieux et ce n'est pas ma faute","Je dois être parfait(e)"],good:[1]}];
const extra=`<script>const data=${JSON.stringify(quiz)};window.addEventListener('load',()=>{setTimeout(()=>{setSexe(getSexe());startQuiz('quiz',data);},400);});</script>`;
res.send(layout("Famille", `<h1>🏠 Quand la maison t'étouffe</h1><div class="probleme">Tu entends les cris. On te demande d'être grande alors que toi-même tu es jeune.</div><div class="solution">${conseils}</div><div class="card"><div class="progress"><div id="prog-quiz"></div></div><div id="quiz">Chargement...</div></div><a class="btn btn-outline" href="/maison">← Retour</a>`, extra));
});

app.get('/amour',(req,res)=>{
const conseils=`<b>💔 CONSEILS QUAND LE GOUMIN TE CHIFFONNE</b><br><br>
<b>1. Si tu te sens seule, appelle une copine ou une amie</b><br>Ton cœur vient de se briser ? N'écris pas à ton ex. Appelle ta copine anti-goumin.<br><br>
<b>2. Sors avec tes amies pour oublier</b><br>Faites-vous belles POUR VOUS. Sortez, mangez du poisson braisé, faites des TikTok, riez fort.<br><br>
<b>3. Frappe un coussin quand tu penses à lui</b><br>Son visage revient ? Prends ton coussin, frappe, dis tout ce que tu aurais voulu lui dire.<br><br>
<b>4. Mets la musique que tu aimes même si c'est le Biam</b><br>Playlist Goumin Exit : une triste pour pleurer, puis une qui te fait danser le Biam à fond.<br><br>
<b>5. 🙏 Et surtout prie ton DIEU</b><br>Dis "Seigneur, guéris mon cœur". Il va te relever.`;
const quiz=[{q:"Si tu as donné ton corps et tu regrettes, tu es gâté(e) ?",options:["Oui pour toujours","Non, ta valeur n'a pas bougé","Les gens vont dire oui"],good:[1]},{q:"Si ton ex était une appli ?",options:["Indisponible","Mode avion","Version d'essai expirée"],good:[0,1,2]},{q:"Si l'amour était un plat camerounais, ton ex c'était ?",options:["Piment sans eau","Achu sans soupe","Ndolè amer"],good:[0,1,2]},{q:"Phrase qui guérit ce soir ?",options:["Je suis fini(e)","J'ai aimé, je me suis trompé(e), je reste précieux(se)","Je ne vaux rien"],good:[1]},{q:"Demain tu fais quoi pour toi ?",options:["Rien","Me faire belle, sortir, rire","J'attends son message"],good:[1]}];
const extra=`<script>const data=${JSON.stringify(quiz)};window.addEventListener('load',()=>{setTimeout(()=>{setSexe(getSexe());startQuiz('quiz',data);},400);});</script>`;
res.send(layout("Amour", `<h1>💔 Le goumin</h1><div class="probleme">Tu as tout donné, corps et âme. Maintenant tu regrettes. Il/Elle est distant(e).</div><div class="solution">${conseils}</div><div class="card"><div class="progress"><div id="prog-quiz"></div></div><div id="quiz">Chargement...</div></div><a class="btn btn-outline" href="/maison">← Retour</a>`, extra));
});

app.get('/harcelement',(req,res)=>{
const conseils=`<b>🛡️ CONSEILS QUAND ON INSULTE TON CORPS</b><br><br>
<b>1. Si tu te sens seule, appelle une copine ou une amie</b><br>On s'est moqué de ton poids à l'école ? Appelle ta copine qui ne commente jamais ton corps.<br><br>
<b>2. Sors avec tes amies qui t'aiment comme tu es</b><br>Sors avec ton vrai crew, celles qui t'aiment en crop top ou en boubou. Allez vous balader, riez.<br><br>
<b>3. Frappe un coussin quand leurs mots te blessent</b><br>Leurs insultes tournent dans ta tête ? Prends ton coussin, frappe et dis "ce n'est pas moi, c'est leur méchanceté".<br><br>
<b>4. Mets la musique que tu aimes même si c'est le Biam</b><br>Mets-toi devant ton miroir avec la musique qui te donne confiance, même Biam qui te fait te sentir reine. Danse.<br><br>
<b>5. 🙏 Et surtout prie ton DIEU</b><br>Ton corps est créé par Dieu parfaitement. Dis "Seigneur, aide-moi à l'aimer".`;
const quiz=[{q:"On se moque de ton poids, ça dit quoi sur toi ?",options:["Que je ne vaux rien","Rien sur toi, tout sur leur méchanceté","Que je dois changer"],good:[1]},{q:"Si les moqueurs étaient des commentateurs sportifs ?",options:["Et voilà, il/elle marche !","Analyse de la démarche","Ils commentent même quand tu bois de l'eau"],good:[0,1,2]},{q:"Si ton corps pouvait parler aux moqueurs ?",options:["Laissez-moi tranquille","Je grandis à mon rythme","Avis non demandé"],good:[0,1,2]},{q:"Ta valeur dépend de ton poids ?",options:["Oui à 100%","Non, ta valeur c'est ton cœur","Un peu"],good:[1]},{q:"Demain, quelle douceur pour ton corps ?",options:["L'insulter","Le laver doucement, mettre un habit que tu aimes pour TOI","L'ignorer"],good:[1]}];
const extra=`<script>const data=${JSON.stringify(quiz)};window.addEventListener('load',()=>{setTimeout(()=>{setSexe(getSexe());startQuiz('quiz',data);},400);});</script>`;
res.send(layout("Harcelement", `<h1>🛡️ Quand on insulte ton corps</h1><div class="probleme">On se moque de ton poids, ta taille, ton teint. Tu n'as rien demandé.</div><div class="solution">${conseils}</div><div class="card"><div class="progress"><div id="prog-quiz"></div></div><div id="quiz">Chargement...</div></div><a class="btn btn-outline" href="/maison">← Retour</a>`, extra));
});

app.get('/depression',(req,res)=>{
const conseils=`<b>🌧️ CONSEILS QUAND TU ES VIDE ET FATIGUÉ(E)</b><br><br>
<b>1. Si tu te sens seule, appelle une copine ou une amie</b><br>Tu te sens vide ? Envoie juste "je ne vais pas bien" à ta copine sûre. Être à deux au téléphone, ça réchauffe.<br><br>
<b>2. Sors avec tes amies, même 10 minutes</b><br>Même si t'as pas envie, sors 10 min avec tes amies. Voir le ciel, marcher, le soleil et les rires c'est un médicament.<br><br>
<b>3. Frappe un coussin quand tout est trop lourd</b><br>T'es énervée contre la vie ? Prends ton coussin, frappe, pleure dedans.<br><br>
<b>4. Mets la musique que tu aimes même si c'est le Biam</b><br>Mets une musique douce qui t'accompagne, même Biam mélancolique qui te comprend.<br><br>
<b>5. 🙏 Et surtout prie ton DIEU</b><br>Dis juste "Jésus, je suis fatiguée, prends ma main". Dieu est ton refuge quand tout est sombre.`;
const quiz=[{q:"Tu te sens vide même après avoir dormi ?",options:["Non je suis paresseux(se)","Oui, c'est ton corps qui porte trop lourd","Je suis le seul au monde"],good:[1]},{q:"Si ta dépression était une météo ?",options:["Pluie fine","Brouillard","Nuit à 14h"],good:[0,1,2]},{q:"Si ton lit était un personnage ?",options:["Bon, on reste encore 5h ?","Va boire un peu d'eau","Abonnement VIP"],good:[0,1,2]},{q:"Qu'est-ce qui apaise 5 minutes ?",options:["Respirer 4 sec + eau fraîche","Marcher 10 minutes dehors","Écouter une voix douce"],good:[0,1,2]},{q:"Demain, tu t'offres quoi ?",options:["Rien","Laver ton visage avec de l'eau fraîche, ouvrir la fenêtre 2 min","Attendre que ça passe"],good:[1]}];
const extra=`<script>const data=${JSON.stringify(quiz)};window.addEventListener('load',()=>{setTimeout(()=>{setSexe(getSexe());startQuiz('quiz',data);},400);});</script>`;
res.send(layout("Depression", `<h1>🌧️ Quand tu es vide</h1><div class="probleme">Tu te sens vide, même après avoir dormi. Tu n'as plus envie de rien. Tu n'es pas seul(e).</div><div class="solution">${conseils}</div><div class="card"><div class="progress"><div id="prog-quiz"></div></div><div id="quiz">Chargement...</div></div><a class="btn btn-outline" href="/maison">← Retour</a>`, extra));
});

app.listen(port, ()=>console.log("Maison de Paix avec COUVERTURE sur http://localhost:"+port));