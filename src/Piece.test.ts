import Piece from './Piece';

describe('Piece', () => {
    it('should define a Piece', () => {
        const piece = new Piece(1, 2, 3);

        expect(piece.buffer()).toEqual(1);
        expect(piece.offset()).toEqual(2);
        expect(piece.size()).toEqual(3);
    });

    it('should prevent assigning an offset below zero', () => {
        expect(() => {
            // tslint:disable-next-line:no-unused-expression
            new Piece(1, -1, 2);
        }).toThrowError('offset must be a non-negative integer');
    });

    it('should prevent assigning a size below zero', () => {
       expect(() => {
           // tslint:disable-next-line:no-unused-expression
           new Piece(1, 1, -1);
       }).toThrowError('size must be a non-negative integer');
    });

    it('should prevent assigning a non-integer offset', () => {
       expect(() => {
           // tslint:disable-next-line:no-unused-expression
           new Piece(1, 1.2, 1);
       }).toThrowError('offset must be a non-negative integer');
    });

    it('should prevent assigning a non-integer size', () => {
        expect(() => {
            // tslint:disable-next-line:no-unused-expression
            new Piece(1, 1, 1.2);
        }).toThrowError('size must be a non-negative integer');
    });
});
