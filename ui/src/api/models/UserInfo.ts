export interface UserInfo {
	id: string;
	assignedRoles: Role[];
	authType: AuthType;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	displayName: string;
	creationDate: string;
	enabled: boolean;
	accountNonExpired: boolean;
	accountNonLocked: boolean;
	credentialsNonExpired: boolean;
	authorities: { authority: string }[];
}

export enum AuthType {
	PLAIN = "PLAIN",
	GOOGLE = "GOOGLE",
	MICROSOFT = "MICROSOFT",
}

export enum Role {
	ADMIN = "ADMIN",
	ORGANIZER = "ORGANIZER",
	ATTENDEE = "ATTENDEE",
	GUEST = "GUEST",
}
