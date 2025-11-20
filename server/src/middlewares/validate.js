import { z } from "zod";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const tree = z.treeifyError(error);

      const simplified = Object.entries(tree.properties || {}).map(
        ([field, info]) => ({
          field,
          message: info.errors?.[0] || "Invalid value",
        })
      );

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: simplified,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};