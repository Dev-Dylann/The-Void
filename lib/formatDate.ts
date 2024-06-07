export default function formatDate(dateStr: string) {
    try {
        // Create a Date object directly from the string (might throw an error)
        const dateObj = new Date(dateStr);

        // Format the date according to the desired format
        return dateObj.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    } catch (error) {
        // Handle potential errors during parsing
        console.error("Error parsing date:", error);
        return "Invalid date format";
    }
}