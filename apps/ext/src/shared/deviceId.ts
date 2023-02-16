import { v4 } from "uuid";
import { storage } from "@extend-chrome/storage";

const KEY_NAME = "DEVICE_ID";

export async function getDeviceId() {
  let { DEVICE_ID } = await storage.local.get(KEY_NAME);
  if (!DEVICE_ID) {
    DEVICE_ID = v4();
    storage.local.set({ [KEY_NAME]: DEVICE_ID });
  }
  return DEVICE_ID as string;
}

let deviceId = "";
const asyncGetter = async () => {
  deviceId = await getDeviceId();
};
asyncGetter();
export default deviceId;
