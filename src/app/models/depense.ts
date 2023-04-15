export class Depense {
    private name: string ='';
    private date: Date = new Date();
    private category: string = '';
    private rate: number = 0.5;
    private spent: number = 0;

    public getName(): string {
        return this.name;
    }
    public getDate(): Date {
        return this.date;
    }
    public getCategory(): string {
        return this.category;
    }
    public getRate(): number {
        return this.rate;
    }
    public getSpent(): number {
        return this.spent;
    }
    
    public setName(name: string): void {
        this.name = name;
    }
    public setDate(date: Date): void {
        this.date = date;
    }
    public setCategory(category: string): void {
        this.category = category;
    }
    public setRate(rate: number): void {
        this.rate = rate;
    }
    public setSpent(spent: number): void {
        this.spent = spent;
    }
    


}
