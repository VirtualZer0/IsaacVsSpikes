import { Resource } from "@/core/classes/base/Resource";

export class HeartContainer extends Resource {
  heart: Heart | null = null
}

export class Heart extends Resource {
  needsContainer: boolean = true;
  golden: boolean = false;
  capacity: number = 2;
}