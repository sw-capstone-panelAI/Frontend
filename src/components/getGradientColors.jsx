// HEX 문자열에서 steps개수만큼 그라데이션 반환
export function getGradientColors(startColor, endColor, steps) {
  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
    ];
  };
  const rgbToHex = (rgb) =>
    "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
  const [r1, g1, b1] = hexToRgb(startColor);
  const [r2, g2, b2] = hexToRgb(endColor);
  return Array.from({ length: steps }, (_, i) => {
    const r = Math.round(r1 + ((r2 - r1) * i) / (steps - 1));
    const g = Math.round(g1 + ((g2 - g1) * i) / (steps - 1));
    const b = Math.round(b1 + ((b2 - b1) * i) / (steps - 1));
    return rgbToHex([r, g, b]);
  });
}
