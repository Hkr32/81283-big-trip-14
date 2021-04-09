export const createSiteHeaderCostTemplate = (points) => {
  const cost = points.reduce((sum, point) => sum + point.basePrice, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};
