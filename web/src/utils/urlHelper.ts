export const extractUrlId = (url: string): string | null => {
    const inputVal = url.trim();

    let finalId = inputVal;

    if (inputVal.includes("/rd/")) {
        finalId = inputVal.split("/rd/").pop() || "";
    }

    if (!finalId) {
        return null;
    }

    return finalId;
}