const now = new Date();
const inicioDoExpediente = new Date();
const fimDoExpediente = new Date();
const background = document.getElementById('body');
const icon = document.getElementById("icon");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const btn = document.getElementById("share");

inicioDoExpediente.setHours(8, 0, 0, 0);
fimDoExpediente.setHours(17, 0, 0, 0);

const tempoDeExpediente = Math.floor((fimDoExpediente - inicioDoExpediente) / (1000 * 60));
const tempoAteJaTaPodendo = Math.floor((fimDoExpediente - now) / (1000 * 60));
const taxaDeJaTaPodendo = Math.round((1 - tempoAteJaTaPodendo/tempoDeExpediente)*100);
const tempoEmHHMM = `${Math.floor(tempoAteJaTaPodendo / 60)}h ${tempoAteJaTaPodendo % 60}m`

const trocarIcone = (className) => {
  icon.className = className;
  icon.style.display = 'none';
  setTimeout(() => {
    icon.style.display = 'inline-block';
  }, 10);
}

const resultado = (textoFinal, corDeFundo, classeDoBotao, corDaBarra) => {
  result.innerHTML = textoFinal;
  background.classList.add(corDeFundo);
  btn.classList.add(classeDoBotao);
  progress.style.width = `${taxaDeJaTaPodendo}%`;
  progress.classList.add(corDaBarra);
}

const compartilhar = () => {
  const texto = result.innerText;
  const url = window.location.href;
  window.open(`https://api.whatsapp.com/send?text=${texto} - ${url}`, '_blank');
}

if (taxaDeJaTaPodendo >= 100 || now.getDay() === 0 || now.getDay() === 6) {
  resultado("Já pode!", "bg-success-subtle", "btn-success", "bg-success");
  trocarIcone("fi fi-rr-social-network display-3 text-success");
}else if (taxaDeJaTaPodendo >= 80) {
  resultado(`Calma que já tá quase podendo! Faltam ${tempoEmHHMM}.`, "bg-warning-subtle", "btn-warning", "bg-warning");
  trocarIcone("fi fi-rr-hand-sparkles display-3 text-warning");
}else{
  resultado(`Ainda não pode! Faltam ${tempoEmHHMM}.`, "bg-danger-subtle", "btn-danger", "bg-danger");
  trocarIcone("fi fi-rr-hand display-3 text-danger");
}

