export function handleCliError(error: unknown) {
  if (error instanceof Error) {
    console.error(`✖ ${error.message}`);
  } else {
    console.error('✖ Unknown error');
  }
}
