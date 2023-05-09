import {
  paginateLeft,
  paginateRight,
  getGaussianBellCurvePosition,
  getdraggedIndex,
} from "./SodaCarousel";

describe("SodaCarousel utils", () => {
  describe("paginateLeft", () => {
    it("should paginate to the left", () => {
      expect(paginateLeft(1, 5)).toBe(0);
    });

    it("should wrap around to the end if at the beginning", () => {
      expect(paginateLeft(0, 5)).toBe(4);
    });
  });

  describe("paginateRight", () => {
    it("should paginate to the right", () => {
      expect(paginateRight(1, 5)).toBe(2);
    });

    it("should wrap around to the beginning if at the end", () => {
      expect(paginateRight(4, 5)).toBe(0);
    });
  });

  describe("getGaussianBellCurvePosition", () => {
    it("should return the correct bell curve position", () => {
      expect(getGaussianBellCurvePosition(1, 0, 1)).toBeCloseTo(1);
      expect(getGaussianBellCurvePosition(1, 1, 1)).toBeCloseTo(
        0.6065306597126334,
      );
    });
  });

  describe("getdraggedIndex", () => {
    it("should return the correct index when dragged", () => {
      expect(getdraggedIndex(10, 20, 1)).toBeCloseTo(2);
      expect(getdraggedIndex(-10, 20, 1)).toBeCloseTo(0);
      expect(getdraggedIndex(25, 20, 1)).toBeCloseTo(2);
      expect(getdraggedIndex(-25, 20, 1)).toBe(0);
    });
  });
});
