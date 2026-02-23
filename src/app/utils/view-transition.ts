export const startViewTransition = (callback: () => void) => {
    if (!document.startViewTransition) {
        console.log('startViewTransition not supported in this browser');
        callback();
    } else {
        document.startViewTransition(callback);
    }
};