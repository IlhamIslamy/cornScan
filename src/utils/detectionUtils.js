// Cek heuristik sederhana apakah gambar didominasi warna hijau (daun)
export const isLikelyLeaf = (img) => {
  const w = 100;
  const h = 100;
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const ctx = off.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  let leafPixels = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Simple check for greenish pixels
    if (g > r + 20 && g > b + 20) {
      leafPixels++;
    }
  }
  return leafPixels / (w * h) > 0.10; // more than 10% green pixels
};

// Cek apakah perangkat adalah mobile
export const isMobileDevice = () => {
  const ua = navigator.userAgent || "";
  const isiOS = /iPhone|iPad|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);
  const isPortrait = window.innerWidth < window.innerHeight;
  return isiOS || isAndroid || isPortrait;
};