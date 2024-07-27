export const ERRORS = {
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: {
      error: 'Internal Server Error',
      error_description: 'Something went wrong',
    },
  },
  DIRECTORY_NOT_FOUND: {
    statusCode: 404,
    message: {
      error: 'Directory Not Found',
      error_description: 'The directory does not exist',
    },
  },
};

export const MESSAGES = {
  DIRECTORY_SUCCESS: 'Directory structure fetched successfully',
};
