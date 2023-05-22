import { Prisma } from "@prisma/client";
import { Response } from "express";
import { statusCodes } from "../utils/status-codes";

// TODO: review statusCode errors
const customErrors: Record<
  string,
  { errorMessage: string; statusCode: number }
> = {
  P2002: {
    errorMessage: "Duplicado de datos",
    statusCode: statusCodes.serverErrors.INTERNAL_SERVER_ERROR,
  },
  P2025: {
    errorMessage: "Hay un dato que no es posible encontrar",
    statusCode: statusCodes.serverErrors.INTERNAL_SERVER_ERROR,
  },
};

export const handleErrors = (res: Response, error: unknown) => {
  console.error(error);

  // Determinar el código de estado y mensaje de error adecuados según el tipo de error
  let statusCode = statusCodes.serverErrors.INTERNAL_SERVER_ERROR;
  let errorMessage = "Unknown error";
  let cause: unknown | string = "";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // console.log("ERR", error.code);

    errorMessage = customErrors[error.code].errorMessage;
    statusCode = customErrors[error.code].statusCode;
    cause = error?.meta?.cause;
  }

  return res.status(statusCode).json({ error: errorMessage, cause });
};
