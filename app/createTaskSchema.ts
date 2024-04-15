import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required'). max(100),
    subtask: z.boolean(),
    description: z.string().max(255),
    category: z.string().max(100),
    status: z.number()
});
/*
  id             Int              @id @default(autoincrement())
  title          String           @db.VarChar(100)
  creation_date  DateTime         @default(now())
  updatedAt      DateTime         @updatedAt
  parentTaskId   Int?
  parentTask     Task?            @relation("ParentChild", fields: [parentTaskId], references: [id], onDelete: SetNull)
  subtasks       Task[]           @relation("ParentChild")
  description    String?          @db.Text
  userId         Int?
  User           User?            @relation(fields: [userId], references: [id])
  categories     Category[]       @relation("TaskCategories")
  Status         TaskStatus       @relation(fields: [statusId], references: [id])
  statusId       Int
  Collaboration  Collaboration[]
  TaskCategories TaskCategories[]
 */