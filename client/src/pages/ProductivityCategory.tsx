import { useSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { CheckSquare2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function ProductivityCategory() {
  useSEO({
    title: "Productivity Tools - Free Online Task & Time Management | Pixocraft",
    description: "Boost your productivity with free online tools for task management, notes, timers, and expense tracking. Stay organized, focused, and productive—offline and completely private.",
    keywords: "productivity tools, todo list, notes app, task manager, time tracker, expense tracker, productivity app, free productivity tools, online task management, time management",
    canonicalUrl: "https://tools.pixocraft.in/tools/productivity",
  });

  const productivityTools = [
    {
      id: "todo-list",
      name: "Todo List",
      description: "Create, organize, and track your tasks with a simple and intuitive todo list application.",
      path: "/tools/todo-list",
    },
    {
      id: "notes-app",
      name: "Notes App",
      description: "Write, organize, and manage your notes quickly with a clean and distraction-free interface.",
      path: "/tools/notes-app",
    },
    {
      id: "expense-tracker",
      name: "Expense Tracker",
      description: "Monitor your spending and track expenses to understand and manage your finances better.",
      path: "/tools/expense-tracker",
    },
    {
      id: "timer-stopwatch",
      name: "Timer & Stopwatch",
      description: "Dual-mode timer and stopwatch for tracking time, Pomodoro intervals, and workout sessions.",
      path: "/tools/timer-stopwatch",
    },
    {
      id: "stopwatch",
      name: "Stopwatch",
      description: "Precise stopwatch with lap timing and split tracking for workouts and competitions.",
      path: "/tools/stopwatch",
    },
    {
      id: "countdown-timer",
      name: "Countdown Timer",
      description: "Set countdowns for events, cooking, work intervals, and time-based reminders.",
      path: "/tools/countdown-timer",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Productivity Tools" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <CheckSquare2 className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-productivity-category">
              Productivity Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Productivity Tools – <span className="text-primary">Free, Private & Offline</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay organized, focused, and productive with free offline tools for task management, note-taking, time tracking, and expense management—completely private, no signup required.
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Master Your Time and Tasks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Productivity tools help you organize work, manage time efficiently, and stay focused on what matters. Whether you're juggling multiple projects, tracking personal goals, or managing finances, productivity applications transform chaos into clarity. By centralizing tasks, notes, and timers in one place, you eliminate mental overhead and create systems that work for you.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Effective productivity tools reduce decision fatigue, prevent task loss, and create accountability through visible progress. They work best when they're simple, always accessible, and sync with your natural work rhythms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Uses Productivity Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Students use todo lists to manage assignments and deadlines, and timers for focused study sessions. Professionals rely on task management for project planning and time tracking. Freelancers track expenses and billable hours. Parents organize family schedules and shopping lists. Anyone with multiple responsibilities benefits from centralized task management and time awareness.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Remote workers depend on todo lists for accountability and focus timers for productivity. Small business owners track expenses and time investments. Creative professionals use notes for idea capture and timers for creative sprints. Whether personal or professional, productivity tools serve anyone managing time or tasks.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Essential Productivity Tasks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Task management is fundamental—capturing ideas, organizing priorities, and tracking completion prevents overwhelm and lost ideas. Note-taking captures fleeting thoughts and important information. Time tracking through timers builds awareness of how you spend time and enables better planning. Expense tracking reveals spending patterns and supports financial decision-making.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Focused work intervals using timers increase concentration and reduce burnout. Task completion creates momentum and satisfaction. Regular review of tasks and expenses enables continuous improvement. Together, these elements create productive systems that adapt to your needs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Offline & Private Productivity</h2>
            <p className="text-muted-foreground leading-relaxed">
              All productivity tools run entirely in your browser without uploading data to external servers. This offline-first approach ensures complete privacy—your tasks, notes, expense records, and time tracking data stay on your device. No tracking, no logging, no analytics of your productivity patterns.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Browser-based tools mean instant access without network delays, offline functionality after initial load, and zero security risks. Your personal goals, financial records, and work plans remain completely confidential. Whether managing sensitive projects or personal finances, local processing guarantees genuine privacy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Building Productive Habits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with one clear todo list—capture all tasks to achieve mental clarity. Review daily and prioritize top three items. Use timers for focused work sessions (Pomodoro technique: 25-minute intervals with breaks). Review notes regularly to reinforce learning. Track expenses weekly to maintain financial awareness.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Combine tools strategically: use notes for quick captures, process into organized todos, schedule time with timers, track related expenses. Review weekly to identify patterns and adjust. Celebrate task completion to build momentum. Most importantly, keep tools simple—complexity becomes procrastination.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Productivity tools work best as habitual companions in your workflow, supporting everything from professional projects to personal growth. Use them consistently, review regularly, and adjust as your needs evolve.
            </p>
          </section>
        </article>

        {/* All Productivity Tools Section */}
        <section className="space-y-6 border-t pt-12">
          <h2 className="text-2xl font-bold">All Productivity Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productivityTools.map((tool) => (
              <Card key={tool.id} className="hover-elevate flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <CheckSquare2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="mb-4 flex-1">{tool.description}</CardDescription>
                  <a href={tool.path}>
                    <Button variant="outline" className="w-full" data-testid={`button-productivity-tool-${tool.id}`}>
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
