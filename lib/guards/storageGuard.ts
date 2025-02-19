export class StoragesGuard {
    static clearAuthStorage(): void {
        try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('auth-storage');
        }catch(err) {
            console.error('Error clearing auth storage:', err);
        }
    };
}