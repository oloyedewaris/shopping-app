export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "NGN" }).format(
    value
  );
