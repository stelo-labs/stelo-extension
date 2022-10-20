type LogRecord = {
  message: any[];
  timestamp: string;
};
class LogStore {
  logs: LogRecord[] = [];
  push(...message: {}[]) {
    this.logs.push({ message, timestamp: new Date().toISOString() });
  }
}
const logStore = new LogStore();
export default logStore;
