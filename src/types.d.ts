// example declaration file - remove these and add your own custom typings

interface SimpleCreep {
  role: string;
}

// memory extension samples
interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
  sourceId: Id<Source>;
  targetId?: Id<AnyStructure>;
  building?: boolean;
  upgrading?: boolean;
  repairing?: boolean;
  harvesting?: boolean;
}

interface Memory {
  uuid: number;
  log: any;
  creepId: number;
  spawnList: SimpleCreep[];
  repairingStructureId?: Id<AnyStructure>;
  buildingStructureId?: Id<ConstructionSite<BuildableStructureConstant>>;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
