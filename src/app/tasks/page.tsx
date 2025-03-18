import { AllTasks } from "../_components/all-tasks";
import { CreateTask } from "../_components/create-task";

export default async function Page() {
    return (
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 bg-gray-800 min-h-screen text-white w-full">
            <h1>Tasks</h1>
            <CreateTask />
            <AllTasks />
        </div>
    );
}