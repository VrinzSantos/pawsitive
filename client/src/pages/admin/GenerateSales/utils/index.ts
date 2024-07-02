export function formatMoneytoLocaleString(amount: number): string {
  return amount.toLocaleString("en-PH", { style: "currency", currency: "PHP" });
}

// Option 2: Using toFixed() and String Manipulation (More Control)

export function formatMoneyCustom(amount: number, decimals = 2): string {
  const formattedAmount = amount
    .toFixed(decimals)
    .replace(/\d(?=(\d{3})+(?!\d))/g, ",");
  return `P ${formattedAmount}`;
}

export function formatMoney(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  amount: any,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}
