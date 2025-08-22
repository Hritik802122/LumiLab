// Accessibility helpers can be placed here.
// For example, a utility for handling keyboard events consistently.

export const handleEnterOrSpace = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
    }
}