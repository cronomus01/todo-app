export default interface Task {
  id: number,
  title: string,
  description: string,
  isCompleted: boolean,
  isWorking: boolean,
  isPending: boolean,
  date: Date
}