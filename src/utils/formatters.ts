import type { Bandwidth } from "@/types";

export const formatBandwidth = (speed: number): Bandwidth => {
  const speedKb = speed / 1000;
  const speedMb = speedKb / 1000;
  const units = {
    mbs: "MB/s",
    kbs: "KB/s",
  };

  if (speedKb >= 1000) {
    const value = speedMb.toFixed(2);
    return {
      value,
      units: units.mbs,
    };
  } else {
    const value = speedKb.toFixed(2);
    return {
      value,
      units: units.kbs,
    };
  }
};

export const formatObjectKeysToCamelCase = <T>(obj: object): T => {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    const camelKey = key.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) =>
      chr.toUpperCase()
    );
    acc[camelKey] = value;
    return acc;
  }, {});
};
