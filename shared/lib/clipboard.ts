export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: intentional error surface for a failed clipboard write, not debug leftover
    console.error('Could not copy to clipboard:', error);
    return false;
  }
}
