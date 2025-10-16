export type PointModel = {
  label: string;
  total: number;
};
export type SummaryModel = {
  avgOrderValue: number;
  count: number;
  total: number;
};
export type DataToChart = {
  name: string;
  uv: number;
};

export type StatisticsModel = {
  points: PointModel[];
  summary: SummaryModel;
  dataToChart: DataToChart[];
};
