export default interface Task {
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
  isWorking: boolean,
  isPending: boolean,
  date: Date
}