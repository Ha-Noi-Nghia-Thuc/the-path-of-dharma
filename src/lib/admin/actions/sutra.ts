"use server";

import { db } from "@/database/drizzle";
import { sutras, sutraTags, tags } from "@/database/schemas";
import { sutraSchema } from "@/lib/validations";
import { eq, sql, and, or, ilike, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

type SutraInput = z.infer<typeof sutraSchema>;

interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface SutraParams extends z.infer<typeof sutraSchema> {
  tags?: string[];
}

/**
 * Creates a new sutra in the database
 * @param params - Sutra creation parameters
 * @returns Promise with success status and data or error
 */
export const createSutra = async (
  params: SutraParams
): Promise<ActionResult> => {
  try {
    console.log("Creating sutra with params:", JSON.stringify(params, null, 2));

    // Validate input data
    const validatedData = sutraSchema.parse(params);
    console.log("Validation passed:", JSON.stringify(validatedData, null, 2));

    // Prepare sutra data for insertion
    const sutraData = {
      title: validatedData.title,
      author: validatedData.author,
      scripture: validatedData.scripture,
      description: validatedData.description,
      summary: validatedData.summary,
      coverColor: validatedData.coverColor,
      coverUrl: validatedData.coverUrl,
      pdfUrl: validatedData.pdfUrl || null,
      linkUrl: validatedData.linkUrl || null,
      videoUrl: validatedData.videoUrl || null,
      totalView: validatedData.totalView || 0,
      isPublished: validatedData.isPublished ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Inserting sutra data:", JSON.stringify(sutraData, null, 2));

    // Insert new sutra
    const [newSutra] = await db.insert(sutras).values(sutraData).returning();
    console.log("Sutra created successfully:", newSutra.id);

    // Handle tags if provided (without transaction)
    if (params.tags && params.tags.length > 0) {
      console.log("Processing tags:", params.tags);

      try {
        for (const tagName of params.tags) {
          const trimmedTagName = tagName.trim();
          if (!trimmedTagName) continue;

          console.log("Processing tag:", trimmedTagName);

          // Find or create tag
          let [tag] = await db
            .select()
            .from(tags)
            .where(eq(tags.name, trimmedTagName))
            .limit(1);

          if (!tag) {
            console.log("Creating new tag:", trimmedTagName);
            try {
              [tag] = await db
                .insert(tags)
                .values({
                  name: trimmedTagName,
                  createdAt: new Date(),
                })
                .returning();
            } catch (tagError) {
              // Tag might have been created by another request
              console.log(
                "Tag creation failed, trying to find existing:",
                tagError
              );
              [tag] = await db
                .select()
                .from(tags)
                .where(eq(tags.name, trimmedTagName))
                .limit(1);

              if (!tag) {
                throw tagError; // Re-throw if we still can't find it
              }
            }
          } else {
            console.log("Using existing tag:", tag.id);
          }

          // Link sutra to tag
          console.log("Linking sutra to tag:", newSutra.id, tag.id);
          try {
            await db.insert(sutraTags).values({
              sutraId: newSutra.id,
              tagId: tag.id,
              createdAt: new Date(),
            });
          } catch (linkError: any) {
            // Ignore if link already exists (duplicate key error)
            if (!linkError.message?.includes("duplicate")) {
              throw linkError;
            }
            console.log("Tag link already exists, skipping");
          }
        }
      } catch (tagProcessingError) {
        console.warn(
          "Error processing tags, but sutra was created:",
          tagProcessingError
        );
        // We don't throw here because the main sutra was created successfully
      }
    }

    console.log("Sutra creation completed successfully");

    // Revalidate related pages
    revalidatePath("/admin/sutras");
    revalidatePath("/");

    return {
      success: true,
      data: newSutra,
    };
  } catch (error) {
    console.error("Error creating sutra:", error);

    // Handle validation errors
    if (error instanceof Error && error.name === "ZodError") {
      console.error("Validation error details:", error);
      return {
        success: false,
        error: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.",
      };
    }

    // Handle database errors
    if (error instanceof Error) {
      console.error("Database error:", error.message);
      console.error("Error stack:", error.stack);

      if (error.message.includes("duplicate")) {
        return {
          success: false,
          error: "Kinh điển này đã tồn tại trong hệ thống.",
        };
      }

      if (
        error.message.includes("relation") ||
        error.message.includes("table")
      ) {
        return {
          success: false,
          error: "Lỗi cơ sở dữ liệu. Vui lòng kiểm tra kết nối database.",
        };
      }
    }

    return {
      success: false,
      error: `Có lỗi xảy ra khi tạo kinh điển: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

/**
 * Updates an existing sutra
 * @param id - Sutra ID to update
 * @param params - Updated sutra parameters
 * @returns Promise with success status and data or error
 */
export const updateSutra = async (
  id: string,
  params: Partial<SutraParams>
): Promise<ActionResult> => {
  try {
    // Validate input data
    const validatedData = sutraSchema.partial().parse(params);

    // Check if sutra exists
    const [existingSutra] = await db
      .select()
      .from(sutras)
      .where(eq(sutras.id, id))
      .limit(1);

    if (!existingSutra) {
      return {
        success: false,
        error: "Không tìm thấy kinh điển cần cập nhật.",
      };
    }

    // Start transaction
    const result = await db.transaction(async (tx) => {
      // Update sutra
      const [updatedSutra] = await tx
        .update(sutras)
        .set({
          ...validatedData,
          updatedAt: new Date(),
        })
        .where(eq(sutras.id, id))
        .returning();

      // Handle tags if provided
      if (params.tags !== undefined) {
        // Remove existing tags
        await tx.delete(sutraTags).where(eq(sutraTags.sutraId, id));

        // Add new tags
        if (params.tags.length > 0) {
          for (const tagName of params.tags) {
            // Find or create tag
            let [tag] = await tx
              .select()
              .from(tags)
              .where(eq(tags.name, tagName.trim()))
              .limit(1);

            if (!tag) {
              [tag] = await tx
                .insert(tags)
                .values({
                  name: tagName.trim(),
                  createdAt: new Date(),
                })
                .returning();
            }

            // Link sutra to tag
            await tx.insert(sutraTags).values({
              sutraId: id,
              tagId: tag.id,
              createdAt: new Date(),
            });
          }
        }
      }

      return updatedSutra;
    });

    // Revalidate related pages
    revalidatePath("/admin/sutras");
    revalidatePath(`/sutra/${id}`);
    revalidatePath("/");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error updating sutra:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        error: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.",
      };
    }

    return {
      success: false,
      error: "Có lỗi xảy ra khi cập nhật kinh điển. Vui lòng thử lại.",
    };
  }
};

/**
 * Deletes a sutra from the database
 * @param id - Sutra ID to delete
 * @returns Promise with success status and error if any
 */
export const deleteSutra = async (id: string): Promise<ActionResult> => {
  try {
    // Check if sutra exists
    const [existingSutra] = await db
      .select()
      .from(sutras)
      .where(eq(sutras.id, id))
      .limit(1);

    if (!existingSutra) {
      return {
        success: false,
        error: "Không tìm thấy kinh điển cần xóa.",
      };
    }

    // Delete sutra (cascade will handle related records)
    await db.delete(sutras).where(eq(sutras.id, id));

    // Revalidate related pages
    revalidatePath("/admin/sutras");
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting sutra:", error);

    return {
      success: false,
      error: "Có lỗi xảy ra khi xóa kinh điển. Vui lòng thử lại.",
    };
  }
};

/**
 * Gets all sutras with pagination and search
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 * @param search - Search query
 * @param scripture - Filter by scripture type
 * @returns Promise with sutras data and pagination info
 */
export const getSutras = async (
  page = 1,
  limit = 10,
  search?: string,
  scripture?: string
): Promise<ActionResult> => {
  try {
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = [];

    if (search) {
      whereConditions.push(
        or(
          ilike(sutras.title, `%${search}%`),
          ilike(sutras.author, `%${search}%`),
          ilike(sutras.description, `%${search}%`)
        )
      );
    }

    if (scripture) {
      whereConditions.push(eq(sutras.scripture, scripture));
    }

    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Get sutras with pagination
    const sutrasData = await db
      .select()
      .from(sutras)
      .where(whereClause)
      .orderBy(desc(sutras.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(sutras)
      .where(whereClause);

    const totalPages = Math.ceil(count / limit);

    return {
      success: true,
      data: {
        sutras: sutrasData,
        pagination: {
          page,
          limit,
          total: count,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching sutras:", error);

    return {
      success: false,
      error: "Có lỗi xảy ra khi tải danh sách kinh điển.",
    };
  }
};

/**
 * Gets a single sutra by ID with tags
 * @param id - Sutra ID
 * @returns Promise with sutra data or error
 */
export const getSutraById = async (id: string): Promise<ActionResult> => {
  try {
    const [sutra] = await db
      .select()
      .from(sutras)
      .where(eq(sutras.id, id))
      .limit(1);

    if (!sutra) {
      return {
        success: false,
        error: "Không tìm thấy kinh điển.",
      };
    }

    // Get tags for this sutra
    const sutraTagsData = await db
      .select({ name: tags.name })
      .from(tags)
      .innerJoin(sutraTags, eq(tags.id, sutraTags.tagId))
      .where(eq(sutraTags.sutraId, id));

    return {
      success: true,
      data: {
        ...sutra,
        tags: sutraTagsData.map((tag) => tag.name),
      },
    };
  } catch (error) {
    console.error("Error fetching sutra:", error);

    return {
      success: false,
      error: "Có lỗi xảy ra khi tải thông tin kinh điển.",
    };
  }
};

/**
 * Increments view count for a sutra
 * @param id - Sutra ID
 * @returns Promise with success status
 */
export const incrementSutraViews = async (
  id: string
): Promise<ActionResult> => {
  try {
    await db
      .update(sutras)
      .set({
        totalView: sql`${sutras.totalView} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(sutras.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error incrementing sutra views:", error);

    return {
      success: false,
      error: "Có lỗi xảy ra khi cập nhật lượt xem.",
    };
  }
};

/**
 * Gets popular sutras based on view count
 * @param limit - Number of sutras to return
 * @returns Promise with popular sutras
 */
export const getPopularSutras = async (limit = 10): Promise<ActionResult> => {
  try {
    const popularSutras = await db
      .select()
      .from(sutras)
      .where(eq(sutras.isPublished, true))
      .orderBy(desc(sutras.totalView), desc(sutras.createdAt))
      .limit(limit);

    return {
      success: true,
      data: popularSutras,
    };
  } catch (error) {
    console.error("Error fetching popular sutras:", error);

    return {
      success: false,
      error: "Có lỗi xảy ra khi tải danh sách kinh điển phổ biến.",
    };
  }
};
