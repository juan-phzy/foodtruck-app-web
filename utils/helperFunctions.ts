export function formatDobInput(input: string): string {
    const digits = input.replace(/\D/g, "").slice(0, 8); // Max MMDDYYYY

    let formatted = "";
    
    if (digits.length <= 2) {
        formatted = digits;
    } else if (digits.length <= 4) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    }

    return formatted;
}
