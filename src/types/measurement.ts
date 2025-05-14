// src/types/measurements.ts
export type BodyMeasurements = {
    height?: number;   // How tall
    chest?: number;    // Around the chest
    waist?: number;    // Around the waist
    hips?: number;     // Around the hips
    sleeve?: number;   // Arm length
  };
  
  export type MeasurementError = {
    message: string;   // Oops messages
  };