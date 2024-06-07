export interface IProduct {
	_id?: string;
	name: string;
	price: number;
	stock: number;
	published: string;
	suppliers: ISupplier;
	isbn: string;
}

export interface ISupplier {
	name: string;
	_id?: string;
}

export interface ICustomer {
	_id?: string;
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	phone: string;
	email: string;
	address: string;
}