import { useState } from "react"
import { format, isToday, isSameDay } from "date-fns"
import { Bell, CalendarIcon, Plus, X, Clock, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Reminder {
  id: string
  title: string
  description: string
  date: Date
  time: string
  priority: "low" | "medium" | "high"
  completed: boolean
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "info" | "warning" | "success" | "error"
}

export default function NotificationSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly team sync meeting",
      date: new Date(),
      time: "10:00",
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      title: "Project Deadline",
      description: "Submit final project deliverables",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "17:00",
      priority: "high",
      completed: false,
    },
    {
      id: "3",
      title: "Doctor Appointment",
      description: "Annual checkup",
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      time: "14:30",
      priority: "medium",
      completed: false,
    },
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Meeting Reminder",
      message: "Team meeting starts in 15 minutes",
      time: "5 min ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Task Completed",
      message: "Project review has been completed",
      time: "1 hour ago",
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "Deadline Alert",
      message: "Project deadline is approaching",
      time: "2 hours ago",
      read: true,
      type: "warning",
    },
  ])

  const [isAddingReminder, setIsAddingReminder] = useState(false)
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    date: selectedDate || new Date(),
    time: "",
    priority: "medium" as const,
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const todayReminders = reminders.filter((r) => isToday(r.date) && !r.completed)
  const selectedDateReminders = reminders.filter((r) => selectedDate && isSameDay(r.date, selectedDate))

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        title: newReminder.title,
        description: newReminder.description,
        date: newReminder.date,
        time: newReminder.time,
        priority: newReminder.priority,
        completed: false,
      }
      setReminders([...reminders, reminder])
      setNewReminder({
        title: "",
        description: "",
        date: selectedDate || new Date(),
        time: "",
        priority: "medium",
      })
      setIsAddingReminder(false)
    }
  }

  const toggleReminderComplete = (id: string) => {
    setReminders(reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)))
  }

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "success":
        return <AlertCircle className="h-4 w-4 text-green-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications & Calendar</h1>
          <p className="text-muted-foreground">Manage your notifications and reminders</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            {unreadCount} unread
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {todayReminders.length} today
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {"Today's Reminders"}
                </CardTitle>
                <CardDescription>{todayReminders.length} reminders for today</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {todayReminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-start gap-3 p-3 rounded-lg border">
                        <input
                          type="checkbox"
                          checked={reminder.completed}
                          onChange={() => toggleReminderComplete(reminder.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-medium ${reminder.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {reminder.title}
                            </h4>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(reminder.priority)}`} />
                          </div>
                          <p className="text-sm text-muted-foreground">{reminder.time}</p>
                          {reminder.description && (
                            <p className="text-sm text-muted-foreground mt-1">{reminder.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {todayReminders.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No reminders for today</p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Notifications
                </CardTitle>
                <CardDescription>{unreadCount} unread notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          !notification.read ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                        }`}
                        onClick={() => markNotificationRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Calendar
                  </span>
                  <Dialog open={isAddingReminder} onOpenChange={setIsAddingReminder}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Reminder
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Reminder</DialogTitle>
                        <DialogDescription>Create a new reminder for the selected date.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newReminder.title}
                            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                            placeholder="Enter reminder title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newReminder.description}
                            onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                            placeholder="Enter description (optional)"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="time">Time</Label>
                            <Input
                              id="time"
                              type="time"
                              value={newReminder.time}
                              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                              value={newReminder.priority}
                              onValueChange={(value: "low" | "medium" | "high") =>
                                setNewReminder({ ...newReminder, priority: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingReminder(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddReminder}>Add Reminder</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    hasReminder: reminders.map((r) => r.date),
                  }}
                  modifiersStyles={{
                    hasReminder: {
                      backgroundColor: "rgb(59 130 246 / 0.1)",
                      color: "rgb(59 130 246)",
                      fontWeight: "bold",
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Selected Date Reminders */}
            <Card>
              <CardHeader>
                <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}</CardTitle>
                <CardDescription>{selectedDateReminders.length} reminders for this date</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-3">
                    {selectedDateReminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-start gap-3 p-3 rounded-lg border">
                        <input
                          type="checkbox"
                          checked={reminder.completed}
                          onChange={() => toggleReminderComplete(reminder.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-medium ${reminder.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {reminder.title}
                            </h4>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(reminder.priority)}`} />
                          </div>
                          <p className="text-sm text-muted-foreground">{reminder.time}</p>
                          {reminder.description && (
                            <p className="text-sm text-muted-foreground mt-1">{reminder.description}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReminders(reminders.filter((r) => r.id !== reminder.id))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {selectedDateReminders.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No reminders for this date</p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  All Notifications
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
                >
                  Mark All Read
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => markNotificationRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setNotifications(notifications.filter((n) => n.id !== notification.id))
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
