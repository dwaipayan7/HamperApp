import { z } from "zod";



export const createCommentSchema = z.object({
  content: z
    .string({ required_error: "Comment content is required" })
    .trim()
    .min(1, "Comment cannot be empty")
    .max(280, "Comment must be 280 characters or fewer"),
});



export const createPostSchema = z
  .object({
    content: z.string().trim().max(280, "Post must be 280 characters or fewer").optional(),
  })
  .refine((data) => data.content || true, {
    // image presence is checked at the controller level (req.file)
    message: "Post must have content or an image",
  });

export const repostSchema = z.object({
  content: z
    .string()
    .trim()
    .max(280, "Quote content must be 280 characters or fewer")
    .optional(),
});



export const updateProfileSchema = z.object({
  bio: z.string().trim().max(160, "Bio must be 160 characters or fewer").optional(),
  location: z.string().trim().max(100).optional(),
  firstName: z.string().trim().min(1).max(50).optional(),
  lastName: z.string().trim().min(1).max(50).optional(),
});

export const saveFCMTokenSchema = z.object({
  fcmToken: z
    .string({ required_error: "fcmToken is required" })
    .min(1, "fcmToken cannot be empty"),
});


export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      success: false,
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      details: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data;
  next();
};
