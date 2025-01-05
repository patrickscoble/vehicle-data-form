export interface ModelOptions {
  [make: string]: {
    models: { [model: string]: string[] }; // Model -> Badges
  };
}

export const vehicleData: ModelOptions = {
  Ford: {
    models: {
      Ranger: ["Raptor", "Raptor X", "Wildtrak"],
      Falcon: ["XR6", "XR6 Turbo", "XR8"],
      "Falcon Ute": ["XR6", "XR6 Turbo"],
    },
  },
  BMW: {
    models: {
      "130d": ["xDrive 26d", "xDrive 30d"],
      "240i": ["xDrive 30d", "xDrive 50d"],
      "320e": ["xDrive 75d", "xDrive 80d", "xDrive 85d"],
    },
  },
  Tesla: {
    models: {
      "Model 3": ["Standard", "Performance", "Long Range", "Dual Motor"],
    },
  },
};

export interface ServerResponse {
  make: string;
  model: string;
  badge: string;
  logbook?: string;
}
