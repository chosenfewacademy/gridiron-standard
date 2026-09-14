export interface PositionMapping {
  exact_position: string | null;
  source_position: string | null;
  depth_chart_position: string | null;
  requires_role_resolution: boolean;
  reason?: string;
}

const EXACT = new Set([
  "QB","RB","WR","TE","LT","LG","C","RG","RT","DT","CB","FS","SS","K","P"
]);

export function mapToMaddenBucket(
  position?: string | null,
  depthChartPosition?: string | null
): PositionMapping {
  const p = (position ?? "").toUpperCase().trim() || null;
  const d = (depthChartPosition ?? "").toUpperCase().trim() || null;

  if (d && EXACT.has(d)) {
    return {
      exact_position: d,
      source_position: p,
      depth_chart_position: d,
      requires_role_resolution: false
    };
  }

  if (p && EXACT.has(p)) {
    return {
      exact_position: p,
      source_position: p,
      depth_chart_position: d,
      requires_role_resolution: false
    };
  }

  // Madden-specific buckets that cannot safely be inferred from generic NFL labels.
  if (["OLB","LB","EDGE","DE"].includes(d ?? "") ||
      ["OLB","LB","EDGE","DE"].includes(p ?? "")) {
    return {
      exact_position: null,
      source_position: p,
      depth_chart_position: d,
      requires_role_resolution: true,
      reason: "Must resolve exact REDGE/LEDGE/MIKE/WILL/SAM role from current usage and depth-chart evidence."
    };
  }

  if (["ILB","MLB"].includes(d ?? "") || ["ILB","MLB"].includes(p ?? "")) {
    return {
      exact_position: null,
      source_position: p,
      depth_chart_position: d,
      requires_role_resolution: true,
      reason: "Interior linebacker label is insufficient to distinguish MIKE/WILL/SAM under Gridiron Standard."
    };
  }

  if (["OL","T","G"].includes(d ?? "") || ["OL","T","G"].includes(p ?? "")) {
    return {
      exact_position: null,
      source_position: p,
      depth_chart_position: d,
      requires_role_resolution: true,
      reason: "Generic offensive-line designation does not identify exact LT/LG/C/RG/RT bucket."
    };
  }

  if (["S","DB"].includes(d ?? "") || ["S","DB"].includes(p ?? "")) {
    return {
      exact_position: null,
      source_position: p,
      depth_chart_position: d,
      requires_role_resolution: true,
      reason: "Generic safety/defensive-back designation does not identify exact FS/SS bucket."
    };
  }

  return {
    exact_position: null,
    source_position: p,
    depth_chart_position: d,
    requires_role_resolution: true,
    reason: "Source position cannot be mapped safely to an exact Gridiron Standard bucket."
  };
}
