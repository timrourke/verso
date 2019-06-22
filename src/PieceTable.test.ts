import PieceTable from './PieceTable';

describe('PieceTable', () => {
    it('should make a new PieceTable', () => {
        const pieceTable = PieceTable.fromString('some text');

        const content = pieceTable.content();

        expect(content).toEqual('some text');
    });

    it('should insert text', () => {
        const pieceTable = PieceTable.fromString('foobaz');

        pieceTable.insertText(3, 'bar');

        const content = pieceTable.content();

        expect(content).toEqual('foobarbaz');
    });

    it('should insert text at odd position', () => {
        const pieceTable = PieceTable.fromString('da Bulls');

        pieceTable.insertText(3, 'Chicago ');

        const content = pieceTable.content();

        expect(content).toEqual('da Chicago Bulls');
    });

    it('should insert text before words', () => {
        const pieceTable = PieceTable.fromString('something or other');

        pieceTable.insertText(0, 'a ');

        const content = pieceTable.content();

        expect(content).toEqual('a something or other');
    });

    it('should insert text after words', () => {
        const pieceTable = PieceTable.fromString('and another');

        pieceTable.insertText(11, ' thing');

        const content = pieceTable.content();

        expect(content).toEqual('and another thing');
    });

    it('should insert text multiple times', () => {
        const pieceTable = PieceTable.fromString('original text');

        pieceTable.insertText(9, 'English ');

        expect(pieceTable.content()).toEqual('original English text');

        pieceTable.insertText(0, 'The ');

        expect(pieceTable.content()).toEqual('The original English text');

        pieceTable.insertText(4, 'unedited ');

        expect(pieceTable.content()).toEqual('The unedited original English text');
    });

    it('should insert into empty text', () => {
        const pieceTable = PieceTable.fromString('');

        pieceTable.insertText(0, 'yo');

        expect(pieceTable.content()).toEqual('yo');
    });
});
