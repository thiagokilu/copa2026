export const FLAG_URL = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

export const formatDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-");
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  const fullMonths = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const date = new Date(+y, +m - 1, +d);
  return {
    day: String(+d).padStart(2, "0"),
    month: months[+m - 1],
    weekday: weekdays[date.getDay()],
    full: `${+d} de ${fullMonths[+m - 1]} de ${y}`,
  };
};
