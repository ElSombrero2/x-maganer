import { Card } from "@/ui/components/ui/card";
import { Task } from "../../../../../app/types/kanban";

export const Body = (task: Task) => (
    <Card variant="secondary">
        {task.title}
    </Card>
)
