import { useState, useEffect } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { CheckSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useSEO({
    title: "To-Do List App | Offline Task Manager | Pixocraft Tools",
    description: "Create tasks, checklists & notes offline with local storage. Lightweight & fast.",
    keywords: "todo list offline, task manager, simple todo app",
    canonicalUrl: "https://tools.pixocraft.in/tools/todo-list",
  });

  useEffect(() => {
    const saved = localStorage.getItem("pixocraft-tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("pixocraft-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const howItWorks = [
    { step: 1, title: "Add Tasks", description: "Type and add tasks to your list" },
    { step: 2, title: "Mark Done", description: "Check off completed tasks" },
    { step: 3, title: "Delete Anytime", description: "Remove tasks when needed" },
  ];

  const benefits = [
    { icon: <CheckSquare className="h-5 w-5" />, title: "Local Storage", description: "Tasks saved automatically offline" },
    { icon: <CheckSquare className="h-5 w-5" />, title: "No Login", description: "Use instantly without signup" },
    { icon: <CheckSquare className="h-5 w-5" />, title: "Fast & Light", description: "Instant loading & response" },
    { icon: <CheckSquare className="h-5 w-5" />, title: "Perfect For", description: "Study, work & daily planning" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it save tasks?",
      answer: "Yes — local storage. All tasks are automatically saved to your browser's local storage. They persist even after closing the browser or refreshing the page."
    },
    {
      question: "Can I access tasks on other devices?",
      answer: "No, tasks are stored locally in your current browser only. This ensures complete privacy - your data never leaves your device."
    },
    {
      question: "What happens if I clear browser data?",
      answer: "Clearing browser data will delete your saved tasks since they're stored in local storage. Export important tasks elsewhere if you plan to clear browser data."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="To-Do List"
        description="Add tasks → mark done → delete anytime. Perfect for study, work & daily planning."
        icon={<CheckSquare className="h-8 w-8" />}
        toolId="todo-list"
        category="productivity"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">To-Do List</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  placeholder="Add a new task..."
                  data-testid="input-new-task"
                />
                <Button onClick={addTask} size="icon" data-testid="button-add-task">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {tasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No tasks yet. Add one above!
                  </p>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 hover-elevate"
                      data-testid={`task-${task.id}`}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        data-testid={`checkbox-${task.id}`}
                      />
                      <span
                        className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}
                        data-testid={`text-${task.id}`}
                      >
                        {task.text}
                      </span>
                      <Button
                        onClick={() => deleteTask(task.id)}
                        size="icon"
                        variant="ghost"
                        data-testid={`button-delete-${task.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {tasks.length > 0 && (
                <div className="pt-4 border-t text-center text-sm text-muted-foreground">
                  {tasks.filter(t => t.completed).length} of {tasks.length} completed
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
