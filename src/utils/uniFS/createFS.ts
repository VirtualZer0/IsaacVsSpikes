import { FSAccessAPI } from "./FSAccess/FSAccessAPI";
import IBaseFS from "./IBaseFS";

export async function createFS(): Promise<IBaseFS> {
  return new FSAccessAPI();
}
