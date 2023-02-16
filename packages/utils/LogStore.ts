type LogRecord = {
  message: unknown[];
  timestamp: string;
};
class LogStore {
  logs: LogRecord[] = [];
  push(...message: unknown[]) {
    this.logs.push({ message, timestamp: new Date().toISOString() });
  }
}
const logStore = new LogStore();
export default logStore;
