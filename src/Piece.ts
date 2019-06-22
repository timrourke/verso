export default class Piece {
    private readonly bufferVal: number;
    private offsetVal: number;
    private sizeVal: number;

    constructor(buffer: number, offset: number, size: number) {
        this.bufferVal = buffer;
        this.setOffset(offset);
        this.setSize(size);
    }

    public buffer(): number {
        return this.bufferVal;
    }

    public size(): number {
        return this.sizeVal;
    }

    public offset(): number {
        return this.offsetVal;
    }

    private setOffset(offset: number): void {
        if (!Number.isInteger(offset) || offset < 0) {
            throw new Error('offset must be a non-negative integer');
        }

        this.offsetVal = offset;
    }

    private setSize(size: number): void {
        if (!Number.isInteger(size) || size < 0) {
            throw new Error('size must be a non-negative integer');
        }

        this.sizeVal = size;
    }
}
