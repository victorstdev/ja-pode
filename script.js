const now = new Date();
const inicioDoExpediente = new Date();
const fimDoExpediente = new Date();
const result = document.getElementById("texto");
const icon = document.getElementById("icon");
const box = document.getElementById("box");
let texto = "";
let rgbValue = "";
let rgbBackground = "";

inicioDoExpediente.setHours(8, 0, 0, 0);
fimDoExpediente.setHours(17, 0, 0, 0);

const tempoDeExpediente = Math.floor((fimDoExpediente - inicioDoExpediente) / (1000 * 60));
const tempoAteJaTaPodendo = Math.floor((fimDoExpediente - now) / (1000 * 60));
const taxaDeJaTaPodendo = Math.round((1 - tempoAteJaTaPodendo/tempoDeExpediente)*100);

const trocarIcone = (className, cor) => {
  icon.className = className;
  icon.style.display = 'none';
  setTimeout(() => {
    icon.style.display = 'inline-block';
    icon.style.color = cor;
  }, 10);
}


if (taxaDeJaTaPodendo >= 100) {
  texto = "Já pode!";
  rgbValue = "#2e7d32";
  rgbBackground = "#e8f5e5";
  trocarIcone("fi fi-rr-social-network", rgbBackground);
}else if (taxaDeJaTaPodendo >= 80) {
  texto = "Calma que já tá quase podendo! Faltam " + tempoAteJaTaPodendo + " minutos.";
  rgbValue = "#f9a825";
  rgbBackground = "#fdecc0";
  trocarIcone("fi fi-rr-hand-sparkles", rgbBackground);
}else{
  texto = "Ainda não pode! Faltam " + tempoAteJaTaPodendo + " minutos.";
  rgbValue = "#b71c1c";
  rgbBackground = "#f4cec2";
  trocarIcone("fi fi-rr-hand", rgbBackground);
}

box.style.backgroundColor = rgbValue;
box.style.color = rgbBackground;
result.style.color = rgbBackground;
result.innerHTML = texto;