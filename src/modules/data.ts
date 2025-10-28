import type { HttpClient } from "../types.js";
import { createCoreModule, type CoreModule } from "./core/index.js";
import { createMiscModule, type MiscModule } from "./misc/index.js";

export type DataModule = {
  core: CoreModule;
  misc: MiscModule;
};

export const createDataModule = (http: HttpClient): DataModule =>
  Object.freeze({
    core: createCoreModule(http),
    misc: createMiscModule(http),
  });
