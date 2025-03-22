export const pastelColors: string[] = [
  "#FFB6C1", "#AEC6CF", "#77DD77", "#FDFD96", "#D8BFD8",
  "#FFB347", "#FF6961", "#99CCCC", "#E6E6FA", "#98FF98"
];

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
}