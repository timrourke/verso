import Piece from './Piece';

export default class PieceTable {
    public static fromString(initialContent: string) {
        return new PieceTable(initialContent);
    }

    private bufferMap: Map<number, string> = new Map<number, string>();
    private bufferIndex: number = -1;
    private pieces: Piece[] = [];

    private constructor(initialContent: string) {
        this.addBuffer(initialContent);
        this.pieces = [new Piece(this.bufferIndex, 0, initialContent.length)];
    }

    public content(): string {
        return this.pieces
            .map((piece: Piece): string => {
                const buffer = this.bufferMap.get(piece.buffer());

                return buffer.substr(
                    piece.offset(),
                    piece.size(),
                );
            })
            .join('');
    }

    public insertText(atOffset: number, insertedText: string): void {
        this.addBuffer(insertedText);

        const newPiece = new Piece(this.bufferIndex, 0, insertedText.length);

        const newPieces = this.pieces.reduce((acc, piece: Piece) => {
            const newPieceSpliced = acc.offsetSoFar < atOffset &&
                atOffset < (acc.offsetSoFar + piece.size());

            return {
                afterInsert: (atOffset + newPiece.size()) < acc.offsetSoFar + piece.size() ?
                    [...acc.afterInsert, piece] :
                    acc.afterInsert,
                beforeInsert: atOffset >= acc.offsetSoFar + piece.size() ?
                    [...acc.beforeInsert, piece] :
                    acc.beforeInsert,
                middle: newPieceSpliced ?
                    this.spliceNewPieceIntoPiece(newPiece, piece, atOffset, acc.offsetSoFar) :
                    [newPiece],
                offsetSoFar: newPieceSpliced ?
                    acc.offsetSoFar + piece.size() :
                    acc.offsetSoFar + piece.size() + newPiece.size(),
            };
        }, {
            afterInsert: [],
            beforeInsert: [],
            middle: [],
            offsetSoFar: 0,
        });

        this.pieces = [
            ...newPieces.beforeInsert,
            ...newPieces.middle,
            ...newPieces.afterInsert,
        ].filter((piece: Piece | null) => null !== piece);
    }

    private spliceNewPieceIntoPiece(
        newPiece: Piece,
        oldPiece: Piece,
        fromOffset: number,
        startingOffset: number,
    ): Piece[] {
        return [
            new Piece(
                oldPiece.buffer(),
                oldPiece.offset(),
                fromOffset - startingOffset,
            ),
            newPiece,
            new Piece(
                oldPiece.buffer(),
                fromOffset - startingOffset,
                oldPiece.size() - (fromOffset - startingOffset),
            ),
        ];
    }

    private addBuffer(content: string): void {
        this.bufferIndex = this.bufferIndex + 1;
        this.bufferMap.set(this.bufferIndex, content);
    }
}
