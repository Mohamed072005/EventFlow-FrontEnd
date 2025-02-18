export class StoragesGuard {
    static clearAuthStorage(): void {
        try {
            localStorage.removeItem('authToken');
        }catch(err) {
            console.error('Error clearing auth storage:', err);
        }
    };
}