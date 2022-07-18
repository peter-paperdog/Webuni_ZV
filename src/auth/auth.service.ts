import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _currentUser = new BehaviorSubject<User>(undefined);
    private readonly loggedInUserKey = 'loggedInUser';
    private readonly serviceUsageKey = 'serviceUsage';

    constructor() {
    }

    initUser() {
        const userData = JSON.parse(localStorage.getItem(this.loggedInUserKey));
        if (userData !== null && userData.name && userData.email && userData.phone) {
            const user = new User(userData.name, userData.email, userData.phone);
            this._currentUser.next(user);
        }
    }

    register(name: string, email: string, phone: string) {
        const user = new User(name, email, phone);
        this._currentUser.next(user);
        this.storeUserAfterRegistration(user);
    }

    deregister() {
        this._currentUser.next(undefined);
        this.clearLocalStorage();
    }

    isRegistered(): boolean {
        return this._currentUser.getValue() !== undefined;
    }

    updateUsage(): void {
        if (this.isRegistered()) {
            return;
        }
        let usage = this.usage;
        usage++;
        console.log('Usage: ' + usage);
        localStorage.setItem(this.serviceUsageKey, usage.toString());
    }

    get usage(): number {
        return +localStorage.getItem(this.serviceUsageKey);
    }

    get currentUser() {
        return this._currentUser.asObservable();
    }

    private storeUserAfterRegistration(user: User) {
        localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
        localStorage.removeItem(this.serviceUsageKey);
    }

    private clearLocalStorage() {
        localStorage.removeItem(this.loggedInUserKey);
        localStorage.removeItem(this.serviceUsageKey);
    }
}
