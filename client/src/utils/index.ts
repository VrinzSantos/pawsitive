export function getCurrentYear(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const formattedYear = year.toString().padStart(4, "0"); // Ensuring 4-digit format

  return formattedYear;
}

export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
