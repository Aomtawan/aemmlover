const $ = (id) => document.getElementById(id);

const defaultText = {
  siteTitle: "DORAEMON'S LOVE MISSION",
  mainQuestion: "เราอยากเป็นคนพิเศษของเธอได้ไหม?",
  homeMessage: "ถ้าเป็นไปได้... ขอให้กระเป๋าวิเศษพาเราไปอยู่ในใจเธอหน่อยนะ 💙",
  talkButton: "💛 ลองคุยกันนะ",
  friendButton: "ขอเป็นเพื่อนก่อนนะ",
  successTitle: "เย้! งั้นเราไปคุยกันนะ 💙",
  successMessage: "ภารกิจสารภาพรักสำเร็จแล้ว!",
  successSubMessage: "ต่อจากนี้ขอให้มีแต่เรื่องน่ารัก ๆ ระหว่างเรานะ",
  closingMessage: "เราอาจไม่มีกระเป๋าวิเศษ... แต่เราจะตั้งใจทำให้เธอยิ้มได้ทุกวันเลย",
  returnMessage: "แคปหน้าจอนี้แล้วส่งกลับมาหาเราได้นะ 💌"
};

const gallery = [
  "images/photo1.png",
  "images/photo2.jpg",
  "images/photo3.png",
  "images/photo4.jpg",
  "images/photo5.png"
];
let galleryIndex = 0;
let toastTimer;
function showToast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("show"), 2200);
}

setInterval(() => {
  if (!$("homePage").classList.contains("hidden")) {
    galleryIndex = (galleryIndex + 1) % gallery.length;
    $("heroImage").src = gallery[galleryIndex];
  }
}, 2800);

function dodgeButton() {
  const btn = $("friendButton");
  const cardRect = $("homePage").getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const maxX = Math.max(0, Math.min(145, cardRect.width / 2 - btnRect.width / 2));
  const x = (Math.random() * 2 - 1) * maxX;
  const y = (Math.random() * 2 - 1) * 65;
  btn.style.transform = `translate(${x}px, ${y}px) rotate(${(Math.random() * 10 - 5).toFixed(1)}deg)`;
  showToast("แงง ปุ่มนี้เขิน ไม่ให้กดหรอก 🙈");
}
$("friendButton").addEventListener("mouseenter", dodgeButton);
$("friendButton").addEventListener("touchstart", (event) => {
  event.preventDefault();
  dodgeButton();
}, { passive:false });
$("friendButton").addEventListener("click", (event) => { event.preventDefault(); dodgeButton(); });

function launchHearts(amount = 35) {
  const symbols = ["💙","💗","💖","💕","💛","♡","✨"];
  for (let i=0;i<amount;i++) {
    const heart = document.createElement("span");
    heart.className = "heart-float";
    heart.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    heart.style.left = `${Math.random()*100}%`;
    heart.style.setProperty("--duration", `${2.1+Math.random()*2.2}s`);
    heart.style.setProperty("--size", `${18+Math.random()*24}px`);
    heart.style.animationDelay = `${Math.random()*.8}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5200);
  }
}
$("talkButton").addEventListener("click", () => {
  $("homePage").classList.add("hidden");
  $("surprisePage").classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
  launchHearts(28);
  showToast("ภารกิจสำเร็จแล้ว! 💙");
});
$("heartButton").addEventListener("click", () => { launchHearts(65); showToast("ส่งหัวใจให้แล้วนะ 💖"); });
$("backButton").addEventListener("click", () => {
  $("surprisePage").classList.add("hidden");
  $("homePage").classList.remove("hidden");
  $("friendButton").style.transform = "";
  window.scrollTo({top:0,behavior:"smooth"});
});

const music = $("bgMusic");
const musicToggle = $("musicToggle");
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "♫ ปิดเพลง";
      musicToggle.setAttribute("aria-pressed","true");
      $("musicStatus").textContent = "กำลังเล่นเพลง 💙";
    } catch (error) {
      showToast("ใส่ไฟล์เพลงชื่อ music.mp3 ไว้ในโฟลเดอร์เว็บก่อนนะ");
    }
  } else {
    music.pause();
    musicToggle.textContent = "♫ เปิดเพลง";
    musicToggle.setAttribute("aria-pressed","false");
    $("musicStatus").textContent = "หยุดเพลงแล้ว";
  }
});

$("editToggle").addEventListener("click", () => $("editor").classList.toggle("hidden"));
$("closeEditor").addEventListener("click", () => $("editor").classList.add("hidden"));
document.querySelectorAll("[data-edit]").forEach((input) => {
  const key = input.dataset.edit;
  if (defaultText[key]) input.value = defaultText[key];
  input.addEventListener("input", () => {
    $(key).textContent = input.value;
  });
});
$("resetButton").addEventListener("click", () => {
  Object.entries(defaultText).forEach(([key,value]) => {
    const field = document.querySelector(`[data-edit="${key}"]`);
    if (field) field.value = value;
    if ($(key)) $(key).textContent = value;
  });
  $("friendButton").style.transform = "";
  showToast("คืนค่าเริ่มต้นแล้ว");
});
