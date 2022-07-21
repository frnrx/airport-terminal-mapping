import { getCenterPoint, getTerminals, inputValidation } from "./functions";
import { geoJSONData } from "../mocks";

describe("Helper functions", () => {
  describe("getCenterPoint", () => {
    it("should return the center of an area determined by an array of coordinates", () => {
      const center = getCenterPoint([
        [1, 1],
        [3, 3],
      ]);
      expect(center).toStrictEqual([2, 2]);
    });
  });

  describe("getTerminals", () => {
    it("should return only features that has the property aeroway=terminal and a name", () => {
      const terminals = getTerminals(geoJSONData.features);

      expect(terminals).toHaveLength(1);
    });
  });

  describe("inputValidation", () => {
    it("should validate a string that has 2 coordinates", () => {
      expect(inputValidation("13.436046,52.347897,13.550201,52.389717")).toBe(
        true
      );
      expect(
        inputValidation("-13.436046, 52.347897, -13.550201, 52.389717")
      ).toBe(true);
      expect(inputValidation("+90,+180, +30,-40")).toBe(true);
    });

    it("should not validate a string that don't have 2 coordinates", () => {
      expect(inputValidation("13.436046,13.550201")).toBe(false);
      expect(inputValidation("13.436046, 13.550201")).toBe(false);
      expect(inputValidation("13.436046")).toBe(false);
    });
  });
});
