import { z } from "zod";

const tagsSchema = z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "")
        : []
    )

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  content: z.string().min(1, "Content is required"),
  tags: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "")
        : []
    ),
});

export const updateNoteSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(100, "Title too long"),
  content: z.string().min(1, "Content is required").optional(),
    tags: tagsSchema,
  })
  .refine(
    (data) => data.title !== undefined || data.content !== undefined || data.tags !== undefined,
    {
      message: "At least one of title, content, or tags must be provided",
    }
  );