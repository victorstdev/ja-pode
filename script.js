const now = new Date();
const inicioDoExpediente = new Date();
const fimDoExpediente = new Date();
const result = document.getElementById("texto");
const icon = document.getElementById("icon");
let texto = "";

inicioDoExpediente.setHours(8, 0, 0, 0);
fimDoExpediente.setHours(17, 0, 0, 0);

const tempoDeExpediente = Math.floor((fimDoExpediente - inicioDoExpediente) / (1000 * 60));
const tempoAteJaTaPodendo = Math.floor((fimDoExpediente - now) / (1000 * 60));
const taxaDeJaTaPodendo = Math.round((1 - tempoAteJaTaPodendo/tempoDeExpediente)*100);

const r = taxaDeJaTaPodendo < 50 ? 255 : Math.floor(255 - (taxaDeJaTaPodendo - 50) * 5.1);
const g = taxaDeJaTaPodendo < 50 ? Math.floor(taxaDeJaTaPodendo * 5.1) : 255;
const b = 0;
const rgbValue = `rgb(${r},${g},${b})`;

const trocarIcone = (className) => {
  icon.className = className;
  icon.style.display = 'none';
  setTimeout(() => {
    icon.style.display = 'inline-block';
    icon.style.color = rgbValue;
  }, 10);
}

// result.style.color = rgbValue;

if (taxaDeJaTaPodendo >= 100) {
  texto = "Já pode!";
  trocarIcone("fi fi-rr-social-network");
}else if (taxaDeJaTaPodendo >= 50) {
  texto = "Tá quase podendo! Faltam " + tempoAteJaTaPodendo + " minutos.";
  trocarIcone("fi fi-rr-brands-instagram");
}else{
  texto = "Ainda não pode! Faltam " + tempoAteJaTaPodendo + " minutos.";
  trocarIcone("fi fi-rr-hand");
}

result.innerHTML = texto;