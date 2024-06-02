import {z} from "zod";

export const validationSchemas = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    userId: z.number(),
    // subtasks: z.array(z.string()),
    description: z.string().max(255).optional(),
    // category: z.string().max(100),
    statusId: z.number().optional(),
    due_date: z.string().optional().refine(date => {
        if (date) {
            return !isNaN(Date.parse(date));
        }
        return true;
    }, 'Invalid date format'),
    // Collaborations: z.array(z.string()),
    // TaskCategories: z.array(z.string())
});