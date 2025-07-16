export enum EIngredientType {
	Bun = 'bun',
	Sauce = 'sauce',
	Main = 'main',
}

export enum EOrderStatus {
	Created = 'created',
	Pending = 'pending',
	Done = 'done',
}

export enum EWSConnectionStatus {
	Idle = 'idle',
	Connecting = 'connecting',
	Open = 'open',
	Receiving = 'receiving',
	Error = 'error',
	Closed = 'closed',
}
