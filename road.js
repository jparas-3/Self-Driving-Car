class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 10000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = {x: this.left, y: this.top};
        const topRight = {x: this.right, y: this.top};
        const bottomLeft = {x: this.left, y: this.bottom};
        const bottomRight = {x: this.right, y: this.bottom};
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneCenter(lane) {
        const laneWidth = this.width / this.laneCount;
        if (lane == undefined) {
            return this.left + laneWidth / 2 + Math.floor(this.laneCount / 2) * laneWidth;
        } else {
            return this.left + laneWidth / 2 + lane * laneWidth;
        }
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 1; i < this.laneCount; i++) {
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );
            ctx.setLineDash([35, 45]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}